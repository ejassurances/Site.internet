# EJ Assurances

V1 Next.js de la plateforme EJ Assurances avec site public, espaces connectes par role et socle Supabase.

## Stack

- Next.js App Router
- Supabase Auth, Database et RLS
- Vercel
- GitHub

## Demarrage local

```bash
npm install
npm run dev
```

Copier `.env.example` vers `.env.local` puis renseigner les variables Supabase.

Sans variables Supabase locales, la connexion sécurisée est désactivée : l'application ne crée plus de compte de démonstration.

Variables attendues en production Vercel :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` : requise pour creer automatiquement la fiche client, inviter l'utilisateur Supabase et rattacher le DER au Classeur ACPR.
- `NEXT_PUBLIC_SITE_URL` : URL publique du site, par exemple `https://www.ej-assurances.fr`.

## Routes principales

- `/` site public
- `/expertise-coparentalite`
- `/familles-lgbt`
- `/assurance-emprunteur`
- `/prevoyance-familiale`
- `/protection-enfants`
- `/contact`
- `/connexion`
- `/client`
- `/admin`
- `/mandataire`
- `/prescripteur`

## Supabase

Le fichier `supabase/schema.sql` contient le schema V1 :

- `users`
- `profiles`
- `clients`
- `projects`
- `contracts`
- `documents`
- `mandataires`
- `prescripteurs`
- `referrals`
- `messages`
- `audit_logs`

Il inclut les roles `admin`, `courtier`, `client`, `mandataire`, `prescripteur`, les `GRANT` explicites pour l'API Data et les politiques RLS de base.

Appliquer le SQL dans un projet Supabase, puis creer les utilisateurs dans Supabase Auth avec le role dans `app_metadata.role`.
