-- Lien entre dossiers emprunteur et fiches clients CRM
alter table emprunteur_dossiers
  add column if not exists client_id uuid references public.clients(id) on delete set null,
  add column if not exists converted_at timestamptz;

-- Index pour retrouver rapidement les dossiers non convertis
create index if not exists idx_emprunteur_dossiers_client_id on emprunteur_dossiers(client_id);

-- Permettre aux courtiers authentifiés de mettre à jour le lien client
create policy "admin update dossiers" on emprunteur_dossiers for update using (auth.role() = 'authenticated');
