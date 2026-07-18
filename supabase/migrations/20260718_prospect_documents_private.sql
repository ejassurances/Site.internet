-- Sécurisation du bucket "prospect-documents" (tunnel emprunteur)
-- Objectif : bucket privé + URLs signées à courte durée de vie.
--   - Les pièces d'identité, tableaux d'amortissement et offres de prêt ne doivent
--     plus être accessibles via une URL publique permanente.
--   - L'upload reste anonyme (le prospect n'est pas authentifié dans le tunnel).
--   - La LECTURE est réservée au personnel du cabinet (admin / courtier).

-- 1. Le bucket doit exister et être PRIVÉ (public = false).
--    Idempotent : crée le bucket privé s'il n'existe pas, sinon le bascule en privé.
insert into storage.buckets (id, name, public)
values ('prospect-documents', 'prospect-documents', false)
on conflict (id) do update set public = false;

-- 2. Politiques RLS sur storage.objects, restreintes à ce bucket.
--    (RLS est déjà activée sur storage.objects par défaut dans Supabase.)

-- Nettoyage d'éventuelles policies antérieures homonymes (réexécution sûre).
drop policy if exists "prospect-documents anon upload" on storage.objects;
drop policy if exists "prospect-documents anon update" on storage.objects;
drop policy if exists "prospect-documents staff read" on storage.objects;
drop policy if exists "prospect-documents staff delete" on storage.objects;

-- 2a. Upload par le tunnel : le prospect n'a pas de session → rôles anon + authenticated.
--     Limité au seul bucket "prospect-documents".
create policy "prospect-documents anon upload"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'prospect-documents');

-- 2b. upsert:true côté client peut déclencher un UPDATE (ré-upload d'un même chemin).
create policy "prospect-documents anon update"
on storage.objects for update
to anon, authenticated
using (bucket_id = 'prospect-documents')
with check (bucket_id = 'prospect-documents');

-- 2c. LECTURE réservée au personnel (admin / courtier). C'est cette policy qui permet
--     à une Server Action authentifiée de générer une URL signée via createSignedUrl().
--     Un utilisateur anonyme ou non-staff ne peut jamais lire l'objet.
create policy "prospect-documents staff read"
on storage.objects for select
to authenticated
using (
  bucket_id = 'prospect-documents'
  and app_private.is_staff()
);

-- 2d. Suppression réservée au personnel (nettoyage / conservation).
create policy "prospect-documents staff delete"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'prospect-documents'
  and app_private.is_staff()
);
