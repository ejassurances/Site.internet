-- Documents par contrat distribue et analyse IA produit.
-- Les documents restent rattaches au partenaire, avec un lien optionnel vers le contrat catalogue.

alter table public.partner_product_documents
  add column if not exists contract_id uuid references public.partner_distributed_contracts(id) on delete cascade;

alter table public.partner_product_documents
  drop constraint if exists partner_product_documents_document_type_check;

alter table public.partner_product_documents
  add constraint partner_product_documents_document_type_check
  check (document_type in (
    'notice',
    'ipid',
    'conditions_generales',
    'bulletin_adhesion',
    'fiche_produit',
    'convention',
    'commission',
    'autre'
  ));

create index if not exists idx_partner_product_documents_contract
  on public.partner_product_documents(contract_id, document_type);

alter table public.partner_distributed_contracts
  add column if not exists ai_analysis_status text not null default 'not_generated'
    check (ai_analysis_status in ('not_generated', 'ready', 'needs_refresh', 'error')),
  add column if not exists ai_guarantee_summary text,
  add column if not exists ai_comparison_points jsonb not null default '{}'::jsonb,
  add column if not exists ai_needs_questions text[] not null default '{}'::text[],
  add column if not exists ai_advice_notes text,
  add column if not exists ai_analyzed_at timestamptz,
  add column if not exists ai_analyzed_by uuid references auth.users(id) on delete set null;

create index if not exists idx_partner_contracts_ai_status
  on public.partner_distributed_contracts(ai_analysis_status, updated_at desc);
