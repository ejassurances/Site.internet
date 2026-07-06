-- ─────────────────────────────────────────────────────────────────────────────
-- 009_mandataire_drive.sql
-- Fiche partenaire (mandataire) enrichie + dossier Google Drive.
--   • profile_id devient optionnel : on peut créer une fiche partenaire
--     avant même d'ouvrir un compte utilisateur au partenaire.
--   • champs de contact / coordonnées de la fiche partenaire.
--   • google_drive_folder_id : dossier Drive dédié (convention signée,
--     contrats d'assurance distribués, attestations…).
-- La création du dossier Drive est déclenchée côté application
-- (route /api/partner-drive) après l'insertion de la fiche.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. profile_id optionnel ─────────────────────────────────────────────────────

alter table public.mandataires
  alter column profile_id drop not null;

-- ── 2. Nouveaux champs fiche partenaire ─────────────────────────────────────────

alter table public.mandataires
  add column if not exists contact_name          text,
  add column if not exists contact_email         text,
  add column if not exists phone                 text,
  add column if not exists partner_type          text default 'mandataire',
  add column if not exists notes                 text,
  add column if not exists google_drive_folder_id text;

-- ── 3. Un staff (admin/courtier) peut créer/gérer les fiches partenaires ─────────

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename  = 'mandataires'
      and policyname = 'Staff manage mandataires'
  ) then
    create policy "Staff manage mandataires"
    on public.mandataires for all
    to authenticated
    using (app_private.is_staff())
    with check (app_private.is_staff());
  end if;
end$$;

-- ── 4. Le mandataire voit sa propre fiche ───────────────────────────────────────

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename  = 'mandataires'
      and policyname = 'Mandataires see own record'
  ) then
    create policy "Mandataires see own record"
    on public.mandataires for select
    to authenticated
    using (profile_id is not null and profile_id = auth.uid());
  end if;
end$$;
