-- Synchronisation Drive des partenaires et produits distribues.
-- CRM -> Drive : creation des dossiers partenaires et produits.
-- Drive -> CRM : nomenclature produit exploitable par import manuel ou webhook planifie.

alter table public.partner_companies
  add column if not exists google_drive_folder_id text,
  add column if not exists google_drive_folder_url text generated always as (
    case
      when google_drive_folder_id is not null
      then 'https://drive.google.com/drive/folders/' || google_drive_folder_id
      else null
    end
  ) stored,
  add column if not exists drive_products_folder_id text;

alter table public.partner_distributed_contracts
  add column if not exists google_drive_folder_id text,
  add column if not exists google_drive_folder_url text generated always as (
    case
      when google_drive_folder_id is not null
      then 'https://drive.google.com/drive/folders/' || google_drive_folder_id
      else null
    end
  ) stored;

create index if not exists idx_partner_companies_drive
  on public.partner_companies(google_drive_folder_id)
  where google_drive_folder_id is not null;

create index if not exists idx_partner_contracts_drive
  on public.partner_distributed_contracts(google_drive_folder_id)
  where google_drive_folder_id is not null;

insert into public.drive_nomenclature_rules (rule_type, code, label, pattern, description, required, product_code, applies_to)
values
  ('folder', 'folder_partner_root', 'Dossier partenaire', 'PART_NomPartenaire', 'Dossier racine partenaire avec sous-dossiers Produits, Conventions, Commissions, API, Contacts et Archives.', true, null, array['partner']),
  ('folder', 'folder_partner_product', 'Dossier produit partenaire', 'PROD_CATEGORIE_NomProduit', 'Dossier produit dans le sous-dossier Produits du partenaire.', true, null, array['partner_product']),
  ('document', 'doc_partner_cg', 'Conditions generales partenaire', 'CG_NomProduit', 'Conditions generales rattachees a un produit distribue.', true, null, array['partner_product']),
  ('document', 'doc_partner_ipid', 'IPID / INPI partenaire', 'IPID_NomProduit', 'Document IPID/INPI rattache a un produit distribue.', true, null, array['partner_product']),
  ('document', 'doc_partner_fiche_produit', 'Fiche produit partenaire', 'FicheProduit_NomProduit', 'Fiche produit rattachee a un produit distribue si disponible.', false, null, array['partner_product'])
on conflict (code) do update set
  label = excluded.label,
  pattern = excluded.pattern,
  description = excluded.description,
  required = excluded.required,
  applies_to = excluded.applies_to;

create extension if not exists pg_net;

create or replace function public.on_partner_created_create_drive_folder()
returns trigger as $$
declare
  anon_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bmV1a2NtcWFmdHdoaWR5ZWdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MDE3MDQsImV4cCI6MjA5NzE3NzcwNH0.PSP_vEvqjJkBuQPNHHwLHNZz9jqKCTheSaiu5ebmUQM';
begin
  perform net.http_post(
    url := 'https://huneukcmqaftwhidyegi.supabase.co/functions/v1/create-drive-folder',
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || anon_key),
    body := jsonb_build_object(
      'table', 'partner_companies',
      'record', jsonb_build_object('id', new.id, 'name', new.name, 'partner_type', new.partner_type)
    )
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trigger_partner_drive_folder on public.partner_companies;
create trigger trigger_partner_drive_folder
  after insert on public.partner_companies
  for each row
  execute function public.on_partner_created_create_drive_folder();

create or replace function public.on_partner_contract_created_create_drive_folder()
returns trigger as $$
declare
  anon_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bmV1a2NtcWFmdHdoaWR5ZWdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MDE3MDQsImV4cCI6MjA5NzE3NzcwNH0.PSP_vEvqjJkBuQPNHHwLHNZz9jqKCTheSaiu5ebmUQM';
begin
  perform net.http_post(
    url := 'https://huneukcmqaftwhidyegi.supabase.co/functions/v1/create-drive-folder',
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || anon_key),
    body := jsonb_build_object(
      'table', 'partner_distributed_contracts',
      'record', jsonb_build_object(
        'id', new.id,
        'partner_id', new.partner_id,
        'contract_name', new.contract_name,
        'product_category', new.product_category
      )
    )
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trigger_partner_contract_drive_folder on public.partner_distributed_contracts;
create trigger trigger_partner_contract_drive_folder
  after insert on public.partner_distributed_contracts
  for each row
  execute function public.on_partner_contract_created_create_drive_folder();
