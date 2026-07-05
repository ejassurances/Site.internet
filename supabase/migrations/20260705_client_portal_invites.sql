-- Invitation espace client depuis la fiche CRM.

alter table public.clients
  add column if not exists supabase_user_id uuid references auth.users(id) on delete set null,
  add column if not exists invite_sent_at timestamptz;

create index if not exists idx_clients_supabase_user_id on public.clients(supabase_user_id);

grant select, update on public.clients to authenticated;
