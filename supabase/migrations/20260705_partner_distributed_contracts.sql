-- Catalogue des contrats d'assurance distribues par les partenaires.
-- Ces produits servent ensuite aux devis, comparatifs et devoirs de conseil.

create table if not exists public.partner_distributed_contracts (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partner_companies(id) on delete cascade,
  contract_name text not null,
  product_category text not null
    check (product_category in ('assurance_emprunteur', 'prevoyance', 'assurance_vie', 'sante', 'protection_juridique', 'trottinette', 'autre')),
  product_code text,
  status text not null default 'active'
    check (status in ('draft', 'active', 'suspended', 'archived')),
  target_clients text[] not null default '{}'::text[],
  guarantees text[] not null default '{}'::text[],
  exclusions text,
  advice_positioning text,
  underwriting_rules text,
  pricing_notes text,
  commission_rate numeric(6,3),
  commission_notes text,
  subscription_link text,
  notice_document_id uuid,
  ipid_document_id uuid,
  general_conditions_document_id uuid,
  membership_form_document_id uuid,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_partner_distributed_contracts_partner
  on public.partner_distributed_contracts(partner_id, product_category, status);

create index if not exists idx_partner_distributed_contracts_category
  on public.partner_distributed_contracts(product_category, status);

alter table public.partner_distributed_contracts enable row level security;

drop policy if exists "Cabinet manages partner distributed contracts" on public.partner_distributed_contracts;
create policy "Cabinet manages partner distributed contracts"
on public.partner_distributed_contracts for all
to authenticated
using (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
))
with check (exists (
  select 1 from public.profiles p
  where p.id = (select auth.uid()) and p.role in ('admin', 'courtier')
));

grant select, insert, update, delete on public.partner_distributed_contracts to authenticated;
