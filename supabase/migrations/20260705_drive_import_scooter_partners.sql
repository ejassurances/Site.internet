-- V1 Drive inverse, assurance trottinette et partenaires distributeurs.
-- Objectif : permettre une synchronisation controlee Drive -> CRM,
-- un recueil trottinette conforme aux questions metier, et une base partenaires.

create table if not exists public.drive_import_candidates (
  id uuid primary key default gen_random_uuid(),
  google_drive_folder_id text not null unique,
  google_drive_parent_id text,
  folder_name text not null,
  folder_url text generated always as (
    'https://drive.google.com/drive/folders/' || google_drive_folder_id
  ) stored,
  detected_source text not null default 'manual'
    check (detected_source in ('manual', 'webhook', 'scheduled_sync')),
  parsed_full_name text,
  parsed_email text,
  parsed_phone text,
  proposed_contact_type text not null default 'prospect'
    check (proposed_contact_type in ('prospect', 'client', 'partenaire', 'prescripteur')),
  status text not null default 'pending'
    check (status in ('pending', 'needs_review', 'approved', 'rejected', 'duplicate', 'linked')),
  duplicate_client_id uuid references public.clients(id) on delete set null,
  linked_client_id uuid references public.clients(id) on delete set null,
  subfolders_status text not null default 'not_requested'
    check (subfolders_status in ('not_requested', 'requested', 'created', 'failed')),
  notes text,
  raw_metadata jsonb not null default '{}'::jsonb,
  detected_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_drive_import_candidates_status
  on public.drive_import_candidates(status, detected_at desc);

create index if not exists idx_drive_import_candidates_email
  on public.drive_import_candidates(lower(parsed_email));

create table if not exists public.drive_sync_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  google_drive_folder_id text,
  client_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  candidate_id uuid references public.drive_import_candidates(id) on delete set null,
  status text not null default 'queued'
    check (status in ('queued', 'processing', 'done', 'failed', 'ignored')),
  payload jsonb not null default '{}'::jsonb,
  error_message text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index if not exists idx_drive_sync_events_status
  on public.drive_sync_events(status, created_at desc);

create table if not exists public.partner_companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  partner_type text not null
    check (partner_type in ('assureur', 'grossiste', 'plateforme', 'autre')),
  status text not null default 'active'
    check (status in ('prospect', 'active', 'suspended', 'archived')),
  orias_number text,
  website text,
  distributed_products text[] not null default '{}'::text[],
  commercial_contact jsonb not null default '{}'::jsonb,
  claims_contact jsonb not null default '{}'::jsonb,
  complaints_contact jsonb not null default '{}'::jsonb,
  inspector_contact jsonb not null default '{}'::jsonb,
  commission_terms jsonb not null default '{}'::jsonb,
  convention_signed_at date,
  convention_document_id uuid,
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_partner_companies_type_status
  on public.partner_companies(partner_type, status);

create table if not exists public.partner_product_documents (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partner_companies(id) on delete cascade,
  product_name text not null,
  product_category text not null,
  document_type text not null
    check (document_type in ('notice', 'ipid', 'conditions_generales', 'bulletin_adhesion', 'convention', 'commission', 'autre')),
  document_id uuid,
  drive_file_id text,
  file_name text,
  valid_from date,
  valid_until date,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_partner_product_documents_partner
  on public.partner_product_documents(partner_id, product_category);

create table if not exists public.scooter_insurance_needs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  status text not null default 'draft'
    check (status in ('draft', 'needs_review', 'extension_recommended', 'ready_for_quote', 'sent_to_partner', 'closed')),
  owner_full_name text,
  owner_email text,
  vehicle_brand text,
  vehicle_model text,
  serial_number text,
  purchase_date date,
  purchase_price numeric(12,2),
  max_speed_limited_25 boolean,
  used_by_household_members boolean,
  household_users_details text,
  extension_recommended boolean not null default false,
  usage_type text
    check (usage_type is null or usage_type in ('loisir', 'trajet_travail', 'mixte', 'professionnel')),
  storage_location text,
  desired_effective_date date,
  advisor_notes text,
  collected_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_scooter_insurance_needs_status
  on public.scooter_insurance_needs(status, created_at desc);

alter table public.drive_import_candidates enable row level security;
alter table public.drive_sync_events enable row level security;
alter table public.partner_companies enable row level security;
alter table public.partner_product_documents enable row level security;
alter table public.scooter_insurance_needs enable row level security;

drop policy if exists "Cabinet manages drive import candidates" on public.drive_import_candidates;
create policy "Cabinet manages drive import candidates"
on public.drive_import_candidates for all
to authenticated
using (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
))
with check (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
));

drop policy if exists "Cabinet manages drive sync events" on public.drive_sync_events;
create policy "Cabinet manages drive sync events"
on public.drive_sync_events for all
to authenticated
using (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
))
with check (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
));

drop policy if exists "Cabinet manages partners" on public.partner_companies;
create policy "Cabinet manages partners"
on public.partner_companies for all
to authenticated
using (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
))
with check (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
));

drop policy if exists "Cabinet manages partner documents" on public.partner_product_documents;
create policy "Cabinet manages partner documents"
on public.partner_product_documents for all
to authenticated
using (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
))
with check (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
));

drop policy if exists "Cabinet manages scooter needs" on public.scooter_insurance_needs;
create policy "Cabinet manages scooter needs"
on public.scooter_insurance_needs for all
to authenticated
using (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
))
with check (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
));

grant select, insert, update, delete on public.drive_import_candidates to authenticated;
grant select, insert, update, delete on public.drive_sync_events to authenticated;
grant select, insert, update, delete on public.partner_companies to authenticated;
grant select, insert, update, delete on public.partner_product_documents to authenticated;
grant select, insert, update, delete on public.scooter_insurance_needs to authenticated;
