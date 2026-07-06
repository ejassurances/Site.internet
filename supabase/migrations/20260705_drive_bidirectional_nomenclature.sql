-- Synchronisation bidirectionnelle Drive <-> CRM et nomenclature documentaire.

alter table public.drive_import_candidates
  add column if not exists folder_kind text not null default 'client_root'
    check (folder_kind in ('client_root', 'project_folder', 'contract_folder')),
  add column if not exists product_code text
    check (product_code is null or product_code in ('ADP', 'PREV', 'TROT')),
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists expected_folder_name text,
  add column if not exists contract_folder_name text;

create table if not exists public.drive_nomenclature_rules (
  id uuid primary key default gen_random_uuid(),
  rule_type text not null check (rule_type in ('folder', 'document')),
  code text not null unique,
  label text not null,
  pattern text not null,
  description text,
  required boolean not null default false,
  product_code text check (product_code is null or product_code in ('ADP', 'PREV', 'TROT')),
  applies_to text[] not null default '{}'::text[],
  created_at timestamptz not null default now()
);

insert into public.drive_nomenclature_rules (rule_type, code, label, pattern, description, required, product_code, applies_to)
values
  ('folder', 'folder_adp_dox', 'Dossier assurance de pret', 'DOX_ADP_Prenom_NOM', 'Dossier projet assurance de pret avant passage en contrat.', true, 'ADP', array['project']),
  ('folder', 'folder_prev_dox', 'Dossier prevoyance', 'DOX_PREV_Prenom_NOM', 'Dossier projet prevoyance avant passage en contrat.', true, 'PREV', array['project']),
  ('folder', 'folder_trot_dox', 'Dossier trottinette', 'DOX_TROT_Prenom_NOM', 'Dossier projet assurance trottinette avant passage en contrat.', true, 'TROT', array['project']),
  ('folder', 'folder_adp_ctt', 'Contrat assurance de pret', 'CTT_ADP_Prenom_NOM', 'Dossier contrat assurance de pret apres souscription.', true, 'ADP', array['contract']),
  ('folder', 'folder_prev_ctt', 'Contrat prevoyance', 'CTT_PREV_Prenom_NOM', 'Dossier contrat prevoyance apres souscription.', true, 'PREV', array['contract']),
  ('folder', 'folder_trot_ctt', 'Contrat trottinette', 'CTT_TROT_Prenom_NOM', 'Dossier contrat trottinette apres souscription.', true, 'TROT', array['contract']),
  ('document', 'doc_cni', 'Piece d''identite', 'CNI_Prenom_NOM', 'Carte nationale d''identite ou piece d''identite rattachee au client.', true, null, array['client', 'project']),
  ('document', 'doc_domicile', 'Justificatif de domicile', 'Domicile_Nom_Prenom', 'Justificatif de domicile rattache au client.', true, null, array['client', 'project'])
on conflict (code) do update set
  label = excluded.label,
  pattern = excluded.pattern,
  description = excluded.description,
  required = excluded.required,
  product_code = excluded.product_code,
  applies_to = excluded.applies_to;

create table if not exists public.drive_synced_documents (
  id uuid primary key default gen_random_uuid(),
  google_drive_file_id text not null unique,
  google_drive_folder_id text,
  file_name text not null,
  file_url text generated always as (
    'https://drive.google.com/file/d/' || google_drive_file_id || '/view'
  ) stored,
  client_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  contract_id uuid references public.contracts(id) on delete set null,
  document_rule_code text references public.drive_nomenclature_rules(code) on delete set null,
  document_type text not null default 'autre',
  nomenclature_status text not null default 'unknown'
    check (nomenclature_status in ('valid', 'invalid', 'unknown', 'ignored', 'needs_review')),
  sync_direction text not null default 'drive_to_crm'
    check (sync_direction in ('drive_to_crm', 'crm_to_drive')),
  status text not null default 'detected'
    check (status in ('detected', 'linked', 'excluded', 'needs_review', 'archived')),
  detected_at timestamptz not null default now(),
  linked_at timestamptz,
  raw_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_drive_synced_documents_client
  on public.drive_synced_documents(client_id, detected_at desc);

create index if not exists idx_drive_synced_documents_project
  on public.drive_synced_documents(project_id, detected_at desc);

create index if not exists idx_drive_synced_documents_status
  on public.drive_synced_documents(status, nomenclature_status);

alter table public.drive_nomenclature_rules enable row level security;
alter table public.drive_synced_documents enable row level security;

drop policy if exists "Cabinet reads drive nomenclature rules" on public.drive_nomenclature_rules;
create policy "Cabinet reads drive nomenclature rules"
on public.drive_nomenclature_rules for select
to authenticated
using (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
));

drop policy if exists "Cabinet manages drive synced documents" on public.drive_synced_documents;
create policy "Cabinet manages drive synced documents"
on public.drive_synced_documents for all
to authenticated
using (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
))
with check (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
));

grant select on public.drive_nomenclature_rules to authenticated;
grant select, insert, update, delete on public.drive_synced_documents to authenticated;
