-- EJ Assurances V1 schema for Supabase.
-- Apply from the Supabase SQL editor after project creation, then review policies with the RLS tester.

create extension if not exists pgcrypto;

create type public.app_role as enum ('admin', 'courtier', 'client', 'mandataire', 'prescripteur');
create type public.project_status as enum ('draft', 'qualification', 'in_progress', 'waiting_documents', 'proposal', 'signed', 'closed');
create type public.contract_status as enum ('draft', 'active', 'pending_signature', 'terminated', 'archived');
create type public.referral_status as enum ('received', 'qualified', 'proposal', 'converted', 'lost');

create schema if not exists app_private;

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'client',
  full_name text,
  phone text,
  compliance_status text default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.mandataires (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  company_name text,
  orias_number text,
  convention_status text default 'draft',
  commission_rate numeric(5, 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.prescripteurs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  organization_name text,
  convention_status text default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete set null,
  assigned_courtier_id uuid references public.profiles(id) on delete set null,
  mandataire_id uuid references public.mandataires(id) on delete set null,
  prescripteur_id uuid references public.prescripteurs(id) on delete set null,
  family_context text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  assigned_courtier_id uuid references public.profiles(id) on delete set null,
  mandataire_id uuid references public.mandataires(id) on delete set null,
  title text not null,
  project_type text not null,
  status public.project_status not null default 'qualification',
  sensitive_context text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contracts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  contract_number text,
  insurer_name text,
  contract_type text not null,
  status public.contract_status not null default 'draft',
  effective_date date,
  end_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  uploaded_by uuid references public.profiles(id) on delete set null,
  client_id uuid references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  contract_id uuid references public.contracts(id) on delete cascade,
  storage_bucket text not null default 'documents',
  storage_path text not null,
  document_type text not null,
  visibility text not null default 'private',
  created_at timestamptz not null default now()
);

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  prescripteur_id uuid not null references public.prescripteurs(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  prospect_full_name text not null,
  prospect_email text,
  need_type text,
  consent_collected boolean not null default false,
  status public.referral_status not null default 'received',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid references public.profiles(id) on delete set null,
  client_id uuid references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  subject text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_table text not null,
  target_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function app_private.current_user_role()
returns public.app_role
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function app_private.is_staff()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(app_private.current_user_role() in ('admin', 'courtier'), false)
$$;

create or replace function app_private.touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function app_private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_role public.app_role;
begin
  requested_role := coalesce((new.raw_app_meta_data ->> 'role')::public.app_role, 'client');

  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email;

  insert into public.profiles (id, role, full_name)
  values (new.id, requested_role, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function app_private.handle_new_user();

create trigger touch_profiles before update on public.profiles for each row execute function app_private.touch_updated_at();
create trigger touch_clients before update on public.clients for each row execute function app_private.touch_updated_at();
create trigger touch_projects before update on public.projects for each row execute function app_private.touch_updated_at();
create trigger touch_contracts before update on public.contracts for each row execute function app_private.touch_updated_at();
create trigger touch_mandataires before update on public.mandataires for each row execute function app_private.touch_updated_at();
create trigger touch_prescripteurs before update on public.prescripteurs for each row execute function app_private.touch_updated_at();
create trigger touch_referrals before update on public.referrals for each row execute function app_private.touch_updated_at();

grant usage on schema public to authenticated;
grant select, insert, update, delete on
  public.users,
  public.profiles,
  public.clients,
  public.projects,
  public.contracts,
  public.documents,
  public.mandataires,
  public.prescripteurs,
  public.referrals,
  public.messages,
  public.audit_logs
to authenticated;

grant usage on schema app_private to authenticated;
grant execute on function app_private.current_user_role() to authenticated;
grant execute on function app_private.is_staff() to authenticated;

alter table public.profiles enable row level security;
alter table public.users enable row level security;
alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.contracts enable row level security;
alter table public.documents enable row level security;
alter table public.mandataires enable row level security;
alter table public.prescripteurs enable row level security;
alter table public.referrals enable row level security;
alter table public.messages enable row level security;
alter table public.audit_logs enable row level security;

create policy "Users are visible to self and staff"
on public.users for select
to authenticated
using (auth.uid() is not null and (id = auth.uid() or app_private.is_staff()));

create policy "Users can update own last seen"
on public.users for update
to authenticated
using (auth.uid() is not null and id = auth.uid())
with check (auth.uid() is not null and id = auth.uid());

create policy "Staff can manage users"
on public.users for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

create policy "Profiles are visible to self and staff"
on public.profiles for select
to authenticated
using (auth.uid() is not null and (id = auth.uid() or app_private.is_staff()));

create policy "Profiles can update self"
on public.profiles for update
to authenticated
using (auth.uid() is not null and id = auth.uid())
with check (auth.uid() is not null and id = auth.uid());

create policy "Staff can manage profiles"
on public.profiles for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

create policy "Clients see their own client record"
on public.clients for select
to authenticated
using (auth.uid() is not null and (profile_id = auth.uid() or app_private.is_staff()));

create policy "Mandataires see attached clients"
on public.clients for select
to authenticated
using (
  exists (
    select 1 from public.mandataires m
    where m.id = clients.mandataire_id and m.profile_id = auth.uid()
  )
);

create policy "Prescripteurs see referred clients"
on public.clients for select
to authenticated
using (
  exists (
    select 1 from public.prescripteurs p
    where p.id = clients.prescripteur_id and p.profile_id = auth.uid()
  )
);

create policy "Staff manage clients"
on public.clients for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

create policy "Project access by relationship"
on public.projects for select
to authenticated
using (
  app_private.is_staff()
  or exists (select 1 from public.clients c where c.id = projects.client_id and c.profile_id = auth.uid())
  or exists (select 1 from public.mandataires m where m.id = projects.mandataire_id and m.profile_id = auth.uid())
);

create policy "Staff manage projects"
on public.projects for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

create policy "Contract access by client project relationship"
on public.contracts for select
to authenticated
using (
  app_private.is_staff()
  or exists (select 1 from public.clients c where c.id = contracts.client_id and c.profile_id = auth.uid())
  or exists (
    select 1
    from public.projects p
    join public.mandataires m on m.id = p.mandataire_id
    where p.id = contracts.project_id and m.profile_id = auth.uid()
  )
);

create policy "Staff manage contracts"
on public.contracts for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

create policy "Document access by owner or related dossier"
on public.documents for select
to authenticated
using (
  app_private.is_staff()
  or owner_id = auth.uid()
  or uploaded_by = auth.uid()
  or exists (select 1 from public.clients c where c.id = documents.client_id and c.profile_id = auth.uid())
);

create policy "Authenticated users can upload owned documents"
on public.documents for insert
to authenticated
with check (auth.uid() is not null and (uploaded_by = auth.uid() or app_private.is_staff()));

create policy "Staff manage documents"
on public.documents for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

create policy "Mandataire profile access"
on public.mandataires for select
to authenticated
using (app_private.is_staff() or profile_id = auth.uid());

create policy "Staff manage mandataires"
on public.mandataires for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

create policy "Prescripteur profile access"
on public.prescripteurs for select
to authenticated
using (app_private.is_staff() or profile_id = auth.uid());

create policy "Staff manage prescripteurs"
on public.prescripteurs for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

create policy "Prescripteurs manage own referrals"
on public.referrals for all
to authenticated
using (
  app_private.is_staff()
  or exists (
    select 1 from public.prescripteurs p
    where p.id = referrals.prescripteur_id and p.profile_id = auth.uid()
  )
)
with check (
  app_private.is_staff()
  or exists (
    select 1 from public.prescripteurs p
    where p.id = referrals.prescripteur_id and p.profile_id = auth.uid()
  )
);

create policy "Message access for participants and staff"
on public.messages for select
to authenticated
using (
  app_private.is_staff()
  or sender_id = auth.uid()
  or recipient_id = auth.uid()
  or exists (select 1 from public.clients c where c.id = messages.client_id and c.profile_id = auth.uid())
);

create policy "Authenticated users create own messages"
on public.messages for insert
to authenticated
with check (auth.uid() is not null and sender_id = auth.uid());

create policy "Audit logs visible to staff"
on public.audit_logs for select
to authenticated
using (app_private.is_staff());

create policy "Staff create audit logs"
on public.audit_logs for insert
to authenticated
with check (app_private.is_staff());
