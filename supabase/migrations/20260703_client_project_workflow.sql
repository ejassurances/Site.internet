-- Workflow projet client EJ Assurances.
-- Objectif : rattacher a une fiche client un projet assurance emprunteur complet,
-- avec recueil, feuille de mission, devis, fiche conseil, souscription,
-- signatures, envois mail/espace client et imports Gmail.

alter table public.projects
  add column if not exists workflow_stage text not null default 'recueil_besoins',
  add column if not exists workflow_data jsonb not null default '{}'::jsonb,
  add column if not exists delivery_channels text[] not null default array['email', 'espace_client']::text[];

create table if not exists public.project_workflow_steps (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  step_key text not null,
  label text not null,
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'blocked', 'waiting_client', 'done')),
  position integer not null default 0,
  delivery_channels text[] not null default '{}'::text[],
  requirements jsonb not null default '{}'::jsonb,
  completed_at timestamptz,
  completed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id, step_key)
);

create table if not exists public.project_document_requirements (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  document_key text not null,
  label text not null,
  required_for_validation boolean not null default true,
  status text not null default 'missing' check (status in ('missing', 'received', 'validated', 'rejected')),
  position integer not null default 0,
  accepted_sources text[] not null default '{}'::text[],
  document_id uuid references public.documents(id) on delete set null,
  source text,
  source_metadata jsonb not null default '{}'::jsonb,
  validated_at timestamptz,
  validated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id, document_key)
);

create table if not exists public.project_borrower_needs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null unique references public.projects(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  completed_by uuid references public.profiles(id) on delete set null,
  completion_source text not null default 'courtier' check (completion_source in ('client', 'courtier', 'mandataire', 'mia', 'import_gmail')),
  status text not null default 'draft' check (status in ('draft', 'documents_missing', 'ready_for_validation', 'validated')),
  bank_name text,
  loan_amount numeric(14, 2),
  loan_duration_months integer,
  remaining_capital numeric(14, 2),
  loan_start_date date,
  loan_end_date date,
  current_insurer text,
  current_annual_premium numeric(14, 2),
  requested_quotities jsonb not null default '{}'::jsonb,
  requested_guarantees text[] not null default array['Deces', 'PTIA', 'ITT', 'IPT']::text[],
  delegation_or_substitution text,
  objective text,
  known_data jsonb not null default '{}'::jsonb,
  missing_data jsonb not null default '{}'::jsonb,
  validation_blockers text[] not null default array['offre_pret_manquante', 'tableau_amortissement_manquant']::text[],
  client_comment text,
  advisor_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_deliveries (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  document_id uuid references public.documents(id) on delete set null,
  delivery_type text not null check (delivery_type in ('feuille_mission', 'devis', 'fiche_conseil', 'lien_souscription', 'relance', 'autre')),
  channel text not null check (channel in ('email', 'espace_client')),
  status text not null default 'draft' check (status in ('draft', 'sent', 'opened', 'signed', 'commented', 'failed')),
  subject text,
  body text,
  sent_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.project_signatures (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  document_id uuid references public.documents(id) on delete set null,
  signature_type text not null check (signature_type in ('feuille_mission', 'fiche_conseil', 'autre')),
  status text not null default 'pending' check (status in ('pending', 'signed', 'refused', 'expired')),
  client_comment text,
  signature_provider text,
  signature_external_id text,
  requested_at timestamptz not null default now(),
  signed_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null
);

create table if not exists public.project_email_imports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  imported_by uuid references public.profiles(id) on delete set null,
  gmail_thread_id text,
  gmail_message_id text,
  from_email text,
  to_emails text[],
  subject text,
  received_at timestamptz,
  ai_summary text,
  attachment_count integer not null default 0,
  imported_documents jsonb not null default '[]'::jsonb,
  excluded boolean not null default false,
  exclusion_reason text,
  created_at timestamptz not null default now()
);

create index if not exists project_workflow_steps_project_idx on public.project_workflow_steps(project_id, position);
create index if not exists project_document_requirements_project_idx on public.project_document_requirements(project_id, position);
create index if not exists project_borrower_needs_client_idx on public.project_borrower_needs(client_id);
create index if not exists project_deliveries_project_idx on public.project_deliveries(project_id, created_at desc);
create index if not exists project_signatures_project_idx on public.project_signatures(project_id, requested_at desc);
create index if not exists project_email_imports_project_idx on public.project_email_imports(project_id, received_at desc);

alter table public.project_workflow_steps enable row level security;
alter table public.project_document_requirements enable row level security;
alter table public.project_borrower_needs enable row level security;
alter table public.project_deliveries enable row level security;
alter table public.project_signatures enable row level security;
alter table public.project_email_imports enable row level security;

create policy "Workflow records follow project access"
on public.project_workflow_steps for all
to authenticated
using (exists (select 1 from public.projects p where p.id = project_workflow_steps.project_id))
with check (exists (select 1 from public.projects p where p.id = project_workflow_steps.project_id));

create policy "Document gates follow project access"
on public.project_document_requirements for all
to authenticated
using (exists (select 1 from public.projects p where p.id = project_document_requirements.project_id))
with check (exists (select 1 from public.projects p where p.id = project_document_requirements.project_id));

create policy "Borrower needs follow project access"
on public.project_borrower_needs for all
to authenticated
using (exists (select 1 from public.projects p where p.id = project_borrower_needs.project_id))
with check (exists (select 1 from public.projects p where p.id = project_borrower_needs.project_id));

create policy "Project deliveries follow project access"
on public.project_deliveries for all
to authenticated
using (exists (select 1 from public.projects p where p.id = project_deliveries.project_id))
with check (exists (select 1 from public.projects p where p.id = project_deliveries.project_id));

create policy "Project signatures follow project access"
on public.project_signatures for all
to authenticated
using (exists (select 1 from public.projects p where p.id = project_signatures.project_id))
with check (exists (select 1 from public.projects p where p.id = project_signatures.project_id));

create policy "Gmail imports follow project access"
on public.project_email_imports for all
to authenticated
using (exists (select 1 from public.projects p where p.id = project_email_imports.project_id))
with check (exists (select 1 from public.projects p where p.id = project_email_imports.project_id));
