-- Archivage logique des fiches clients.
-- Les fiches archivees restent en base mais disparaissent de la liste active.

alter table public.clients
  add column if not exists archived_at timestamptz,
  add column if not exists archived_by uuid references auth.users(id) on delete set null,
  add column if not exists archive_reason text;

create index if not exists idx_clients_archived_at
  on public.clients(archived_at);
