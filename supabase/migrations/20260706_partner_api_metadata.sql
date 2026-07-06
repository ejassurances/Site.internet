-- Metadonnees API des partenaires assureurs/grossistes.
-- Les secrets ne doivent pas etre stockes ici : utiliser Vercel/Supabase secrets.

alter table public.partner_companies
  add column if not exists api_enabled boolean not null default false,
  add column if not exists api_provider_name text,
  add column if not exists api_base_url text,
  add column if not exists api_environment text not null default 'sandbox'
    check (api_environment in ('sandbox', 'production', 'unknown')),
  add column if not exists api_auth_mode text not null default 'none'
    check (api_auth_mode in ('none', 'api_key', 'oauth2', 'basic', 'mtls', 'other')),
  add column if not exists api_status text not null default 'not_configured'
    check (api_status in ('not_configured', 'requested', 'sandbox_ready', 'production_ready', 'disabled', 'error')),
  add column if not exists api_scopes text[] not null default '{}'::text[],
  add column if not exists api_config jsonb not null default '{}'::jsonb,
  add column if not exists api_notes text;

create index if not exists idx_partner_companies_api_status
  on public.partner_companies(api_enabled, api_status);
