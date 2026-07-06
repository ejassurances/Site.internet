-- ─────────────────────────────────────────────────────────────────────────────
-- 008_souscription_workbook.sql
-- Workbook de souscription (assurance emprunteur + assurance trottinette) :
--   • souscriptions   : recueil des besoins structuré par produit (jsonb)
--   • lettres_mission : lettre de mission générée depuis le recueil,
--                       signée par le client (click-to-sign) et disponible
--                       dans l'espace client.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Table souscriptions ─────────────────────────────────────────────────────

create table if not exists public.souscriptions (
  id             uuid primary key default gen_random_uuid(),
  client_id      uuid not null references public.clients(id) on delete cascade,
  mandataire_id  uuid references public.mandataires(id) on delete set null,
  created_by     uuid references public.profiles(id) on delete set null,
  product        text not null check (product in ('emprunteur', 'trottinette')),
  status         text not null default 'draft'
                 check (status in ('draft', 'submitted', 'lettre_generee', 'signee')),
  recueil        jsonb not null default '{}'::jsonb,
  summary        text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists souscriptions_client_idx     on public.souscriptions (client_id);
create index if not exists souscriptions_mandataire_idx on public.souscriptions (mandataire_id);
create index if not exists souscriptions_product_idx    on public.souscriptions (product);

-- ── 2. Table lettres_mission ───────────────────────────────────────────────────

create table if not exists public.lettres_mission (
  id              uuid primary key default gen_random_uuid(),
  souscription_id uuid references public.souscriptions(id) on delete cascade,
  client_id       uuid not null references public.clients(id) on delete cascade,
  product         text not null check (product in ('emprunteur', 'trottinette')),
  reference       text not null,
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

create index if not exists lettres_mission_client_idx       on public.lettres_mission (client_id);
create index if not exists lettres_mission_souscription_idx on public.lettres_mission (souscription_id);
create unique index if not exists lettres_mission_reference_idx on public.lettres_mission (reference);

-- ── 3. Triggers updated_at ──────────────────────────────────────────────────────

create trigger touch_souscriptions
  before update on public.souscriptions
  for each row execute function app_private.touch_updated_at();

create trigger touch_lettres_mission
  before update on public.lettres_mission
  for each row execute function app_private.touch_updated_at();

-- ── 4. Droits & RLS ─────────────────────────────────────────────────────────────

grant select, insert, update, delete on
  public.souscriptions,
  public.lettres_mission
to authenticated;

alter table public.souscriptions   enable row level security;
alter table public.lettres_mission enable row level security;

-- souscriptions : staff (admin/courtier) plein accès ; client & mandataire en lecture
create policy "Staff manage souscriptions"
on public.souscriptions for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

create policy "Clients see their souscriptions"
on public.souscriptions for select
to authenticated
using (
  exists (
    select 1 from public.clients c
    where c.id = souscriptions.client_id and c.profile_id = auth.uid()
  )
);

create policy "Mandataires see attached souscriptions"
on public.souscriptions for select
to authenticated
using (
  exists (
    select 1 from public.mandataires m
    where m.id = souscriptions.mandataire_id and m.profile_id = auth.uid()
  )
);

create policy "Mandataires create souscriptions for their clients"
on public.souscriptions for insert
to authenticated
with check (
  exists (
    select 1 from public.mandataires m
    where m.id = souscriptions.mandataire_id and m.profile_id = auth.uid()
  )
);

-- lettres_mission : staff plein accès ; mandataire lecture ; client lecture + signature
create policy "Staff manage lettres_mission"
on public.lettres_mission for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

create policy "Mandataires see attached lettres_mission"
on public.lettres_mission for select
to authenticated
using (
  exists (
    select 1 from public.souscriptions s
    join public.mandataires m on m.id = s.mandataire_id
    where s.id = lettres_mission.souscription_id and m.profile_id = auth.uid()
  )
);

create policy "Clients see their lettres_mission"
on public.lettres_mission for select
to authenticated
using (
  exists (
    select 1 from public.clients c
    where c.id = lettres_mission.client_id and c.profile_id = auth.uid()
  )
);

-- Le client peut signer sa propre lettre (mise à jour restreinte côté applicatif :
-- l'action serveur ne modifie que les champs de signature).
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
