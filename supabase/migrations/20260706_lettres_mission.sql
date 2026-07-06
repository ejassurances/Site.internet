-- ─────────────────────────────────────────────────────────────────────────────
-- 20260706_lettres_mission.sql
-- Lettre de mission générée pour un client, signée électroniquement
-- (« click-to-sign ») et disponible dans l'espace client.
-- Indépendante des workflows existants : elle se rattache simplement à un client.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.lettres_mission (
  id              uuid primary key default gen_random_uuid(),
  client_id       uuid not null references public.clients(id) on delete cascade,
  product         text not null,
  reference       text not null,
  objet           text,
  content_html    text not null,
  status          text not null default 'a_signer'
                  check (status in ('a_signer', 'signee', 'annulee')),
  signed_by_name  text,
  signed_at       timestamptz,
  signer_ip       text,
  consent         boolean not null default false,
  created_by      uuid references public.profiles(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists lettres_mission_client_idx on public.lettres_mission (client_id);
create unique index if not exists lettres_mission_reference_idx on public.lettres_mission (reference);

create trigger touch_lettres_mission
  before update on public.lettres_mission
  for each row execute function app_private.touch_updated_at();

grant select, insert, update, delete on public.lettres_mission to authenticated;

alter table public.lettres_mission enable row level security;

-- Staff (admin/courtier) : plein accès
create policy "Staff manage lettres_mission"
on public.lettres_mission for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

-- Mandataire : lecture des lettres de ses clients rattachés
create policy "Mandataires see attached lettres_mission"
on public.lettres_mission for select
to authenticated
using (
  exists (
    select 1
    from public.clients c
    join public.mandataires m on m.id = c.mandataire_id
    where c.id = lettres_mission.client_id and m.profile_id = auth.uid()
  )
);

-- Client : lecture de ses propres lettres
create policy "Clients see their lettres_mission"
on public.lettres_mission for select
to authenticated
using (
  exists (
    select 1 from public.clients c
    where c.id = lettres_mission.client_id and c.profile_id = auth.uid()
  )
);

-- Client : signature de sa propre lettre (l'action serveur ne modifie que
-- les champs de signature)
create policy "Clients sign their lettres_mission"
on public.lettres_mission for update
to authenticated
using (
  exists (
    select 1 from public.clients c
    where c.id = lettres_mission.client_id and c.profile_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.clients c
    where c.id = lettres_mission.client_id and c.profile_id = auth.uid()
  )
);
