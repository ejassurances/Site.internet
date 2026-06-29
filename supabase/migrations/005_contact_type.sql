-- Ajout du type de contact sur la table clients
alter table public.clients
  add column if not exists contact_type text not null default 'prospect'
    check (contact_type in ('prospect', 'client', 'partenaire', 'prescripteur'));

-- Migrer les données existantes : si statut_client = 'actif', c'est un client
update public.clients
  set contact_type = 'client'
  where statut_client in ('actif', 'en_cours') and contact_type = 'prospect';
