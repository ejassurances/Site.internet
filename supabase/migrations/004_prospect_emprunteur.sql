-- Dossiers emprunteur (un par prospect, plusieurs crédits possibles)
create table if not exists emprunteur_dossiers (
  id uuid primary key default gen_random_uuid(),
  -- Identité
  full_name text not null,
  email text not null,
  phone text,
  date_naissance date,
  adresse text,
  code_postal text,
  ville text,
  -- Statut
  status text not null default 'draft' check (status in ('draft', 'documents_uploaded', 'completed')),
  notes_prospect text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Crédits à assurer (plusieurs par dossier)
create table if not exists emprunteur_credits (
  id uuid primary key default gen_random_uuid(),
  dossier_id uuid not null references emprunteur_dossiers(id) on delete cascade,
  -- Bien
  type_bien text, -- résidence principale, secondaire, investissement locatif
  adresse_bien text,
  -- Crédit
  banque text,
  montant_emprunte numeric(12,2),
  duree_mois integer,
  taux_actuel numeric(6,4),
  mensualite_actuelle numeric(10,2),
  date_debut_pret date,
  -- Assurance actuelle (si remplacement)
  assureur_actuel text,
  prime_actuelle_mensuelle numeric(10,2),
  -- Documents uploadés
  tableau_amortissement_url text,
  offre_pret_url text,
  sort_order integer default 0,
  created_at timestamptz not null default now()
);

-- Documents personnels du prospect
create table if not exists emprunteur_documents (
  id uuid primary key default gen_random_uuid(),
  dossier_id uuid not null references emprunteur_dossiers(id) on delete cascade,
  type_document text not null check (type_document in ('cni_recto', 'cni_verso', 'justif_domicile', 'autre')),
  file_name text not null,
  file_url text not null,
  uploaded_at timestamptz not null default now()
);

-- RLS
alter table emprunteur_dossiers enable row level security;
alter table emprunteur_credits enable row level security;
alter table emprunteur_documents enable row level security;

-- Dossiers : lecture/écriture libre (le prospect n'est pas encore authentifié)
create policy "lecture dossier" on emprunteur_dossiers for select using (true);
create policy "insert dossier" on emprunteur_dossiers for insert with check (true);
create policy "update dossier" on emprunteur_dossiers for update using (true);

-- Lecture admin (authentifié) - sélection complète
create policy "admin lecture dossiers" on emprunteur_dossiers for select using (auth.role() = 'authenticated');

-- Crédits
create policy "crud credits" on emprunteur_credits for all using (true);

-- Documents
create policy "crud documents" on emprunteur_documents for all using (true);
