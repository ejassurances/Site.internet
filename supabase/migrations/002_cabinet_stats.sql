-- Table de statistiques publiques du cabinet
-- Alimente le compteur d'économies affiché sur le site public

create table if not exists cabinet_stats (
  id text primary key default 'singleton',
  economies_emprunteur_euros integer not null default 0,
  updated_at timestamptz not null default now()
);

-- Ligne unique initialisée à 0
insert into cabinet_stats (id, economies_emprunteur_euros)
values ('singleton', 0)
on conflict (id) do nothing;

-- Lecture publique (affiché sur le site)
alter table cabinet_stats enable row level security;

create policy "lecture publique cabinet_stats"
  on cabinet_stats for select
  using (true);

-- Mise à jour réservée aux utilisateurs authentifiés (courtier admin)
create policy "update authentifié cabinet_stats"
  on cabinet_stats for update
  using (auth.role() = 'authenticated');
