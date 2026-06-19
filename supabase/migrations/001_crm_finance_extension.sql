-- ============================================================
-- EJ Assurances — Migration 001 : Extension CRM & Finance
-- À appliquer dans l'éditeur SQL Supabase après le schema.sql
-- ============================================================

-- ── 1. Extension de la table clients ─────────────────────────────────────────
alter table public.clients
  add column if not exists date_naissance date,
  add column if not exists adresse text,
  add column if not exists code_postal text,
  add column if not exists ville text,
  add column if not exists situation_familiale text,
  add column if not exists statut_client text not null default 'prospect'
    check (statut_client in ('prospect', 'actif', 'en_cours', 'inactif')),
  add column if not exists source_acquisition text,
  add column if not exists score_protection integer default 0;

-- ── 2. Extension de la table contracts ───────────────────────────────────────
alter table public.contracts
  add column if not exists prime_annuelle numeric(12, 2),
  add column if not exists prime_mensuelle numeric(12, 2),
  add column if not exists taux_commission numeric(5, 2),
  add column if not exists montant_commission_annuel numeric(12, 2),
  add column if not exists beneficiaires text,
  add column if not exists notes text,
  add column if not exists date_resiliation date,
  add column if not exists motif_resiliation text;

-- ── 3. Tags clients ───────────────────────────────────────────────────────────
create table if not exists public.client_tags (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  tag text not null,
  created_at timestamptz not null default now(),
  unique(client_id, tag)
);

-- ── 4. Personnes liées ────────────────────────────────────────────────────────
create table if not exists public.related_persons (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  type_relation text not null
    check (type_relation in ('conjoint', 'enfant', 'parent_social', 'co_parent', 'autre')),
  full_name text not null,
  date_naissance date,
  email text,
  phone text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 5. Interactions (historique) ─────────────────────────────────────────────
create type if not exists public.interaction_type as enum (
  'appel', 'email', 'rdv', 'visio', 'note', 'document', 'sms'
);

create table if not exists public.interactions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  contract_id uuid references public.contracts(id) on delete set null,
  author_id uuid not null references public.profiles(id) on delete cascade,
  type public.interaction_type not null default 'note',
  titre text not null,
  contenu text,
  duree_minutes integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 6. Commissions (bordereaux) ───────────────────────────────────────────────
create type if not exists public.commission_status as enum (
  'match', 'impaye', 'taux_erreur', 'resilie', 'inconnu'
);

create table if not exists public.commissions (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid references public.contracts(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  assureur text not null,
  contrat_ref text,
  client_nom text,
  type_produit text,
  prime_annuelle numeric(12, 2) default 0,
  taux_attendu numeric(5, 2) default 0,
  taux_recu numeric(5, 2) default 0,
  montant_attendu numeric(12, 2) default 0,
  montant_recu numeric(12, 2) default 0,
  ecart numeric(12, 2) generated always as (montant_recu - montant_attendu) stored,
  statut public.commission_status not null default 'inconnu',
  date_bordereau date not null default current_date,
  bordereau_source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 7. Factures honoraires ────────────────────────────────────────────────────
create type if not exists public.invoice_status as enum (
  'brouillon', 'envoyee', 'encaissee', 'en_retard', 'annulee'
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  numero text not null unique,
  prestation text not null,
  montant_ht numeric(12, 2) not null default 0,
  tva_taux numeric(5, 2) not null default 0,
  montant_ttc numeric(12, 2) generated always as (montant_ht * (1 + tva_taux / 100)) stored,
  statut public.invoice_status not null default 'brouillon',
  date_emission date not null default current_date,
  date_echeance date not null,
  date_encaissement date,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 8. Apporteurs / reversements ─────────────────────────────────────────────
create table if not exists public.apporteurs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete set null,
  nom text not null,
  type_apporteur text not null default 'apporteur'
    check (type_apporteur in ('apporteur', 'mandataire')),
  statut text not null default 'actif'
    check (statut in ('actif', 'inactif')),
  taux_retrocession numeric(5, 2) not null default 0,
  email text,
  phone text,
  iban text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reversements (
  id uuid primary key default gen_random_uuid(),
  apporteur_id uuid not null references public.apporteurs(id) on delete cascade,
  periode_debut date not null,
  periode_fin date not null,
  nb_contrats integer not null default 0,
  base_calcul numeric(12, 2) not null default 0,
  taux numeric(5, 2) not null default 0,
  montant numeric(12, 2) generated always as (base_calcul * taux / 100) stored,
  statut text not null default 'calcule'
    check (statut in ('calcule', 'valide', 'paye', 'en_attente')),
  date_generation date not null default current_date,
  date_paiement date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 9. RLS pour les nouvelles tables ─────────────────────────────────────────
alter table public.client_tags enable row level security;
alter table public.related_persons enable row level security;
alter table public.interactions enable row level security;
alter table public.commissions enable row level security;
alter table public.invoices enable row level security;
alter table public.apporteurs enable row level security;
alter table public.reversements enable row level security;

-- client_tags : staff uniquement
create policy "Staff manage client_tags" on public.client_tags for all to authenticated
  using (app_private.is_staff()) with check (app_private.is_staff());
create policy "Clients see own tags" on public.client_tags for select to authenticated
  using (exists (select 1 from public.clients c where c.id = client_tags.client_id and c.profile_id = auth.uid()));

-- related_persons : staff + client propriétaire
create policy "Staff manage related_persons" on public.related_persons for all to authenticated
  using (app_private.is_staff()) with check (app_private.is_staff());
create policy "Clients see own related persons" on public.related_persons for select to authenticated
  using (exists (select 1 from public.clients c where c.id = related_persons.client_id and c.profile_id = auth.uid()));

-- interactions : staff + auteur
create policy "Staff manage interactions" on public.interactions for all to authenticated
  using (app_private.is_staff()) with check (app_private.is_staff());
create policy "Author see own interactions" on public.interactions for select to authenticated
  using (author_id = auth.uid());

-- commissions : staff uniquement
create policy "Staff manage commissions" on public.commissions for all to authenticated
  using (app_private.is_staff()) with check (app_private.is_staff());

-- invoices : staff uniquement
create policy "Staff manage invoices" on public.invoices for all to authenticated
  using (app_private.is_staff()) with check (app_private.is_staff());

-- apporteurs : staff uniquement
create policy "Staff manage apporteurs" on public.apporteurs for all to authenticated
  using (app_private.is_staff()) with check (app_private.is_staff());

-- reversements : staff uniquement
create policy "Staff manage reversements" on public.reversements for all to authenticated
  using (app_private.is_staff()) with check (app_private.is_staff());

-- ── 10. Indexes pour les performances ────────────────────────────────────────
create index if not exists idx_client_tags_client_id on public.client_tags(client_id);
create index if not exists idx_related_persons_client_id on public.related_persons(client_id);
create index if not exists idx_interactions_client_id on public.interactions(client_id);
create index if not exists idx_interactions_created_at on public.interactions(created_at desc);
create index if not exists idx_commissions_statut on public.commissions(statut);
create index if not exists idx_commissions_assureur on public.commissions(assureur);
create index if not exists idx_commissions_date on public.commissions(date_bordereau desc);
create index if not exists idx_invoices_statut on public.invoices(statut);
create index if not exists idx_invoices_client_id on public.invoices(client_id);
create index if not exists idx_reversements_apporteur on public.reversements(apporteur_id);

-- ── 11. Fonction updated_at automatique ──────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array[
    'clients', 'contracts', 'related_persons', 'interactions',
    'commissions', 'invoices', 'apporteurs', 'reversements'
  ] loop
    execute format(
      'create trigger trg_%I_updated_at before update on public.%I
       for each row execute function public.set_updated_at()',
      t, t
    );
  end loop;
exception when duplicate_object then null;
end;
$$;
