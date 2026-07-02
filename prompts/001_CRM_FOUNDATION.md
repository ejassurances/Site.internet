# PROMPT 001 — Socle CRM EJ Assurances

Tu es Claude Code, développeur principal du projet EJ Assurances.

## Objectif

Créer le socle navigable du CRM EJ Assurances.

Ne pas développer encore la logique métier.
Ne pas créer de base de données.
Ne pas connecter Supabase.
Ne pas créer d'IA.
Ne pas créer de conformité avancée.

Le but est uniquement de créer une architecture propre, des routes, un layout CRM et des pages vides navigables.

## Stack supposée

- Next.js
- TypeScript
- Tailwind CSS
- App Router

## Routes à créer

Créer les routes suivantes :

- /crm
- /crm/prospects
- /crm/clients
- /crm/projets
- /crm/documents
- /crm/taches
- /crm/agenda
- /crm/conformite
- /crm/partenaires
- /crm/produits
- /crm/sinistres
- /crm/reclamations
- /crm/ia
- /crm/admin

## Layout CRM

Créer un layout spécifique pour /crm avec :

- sidebar gauche
- topbar
- zone de contenu principale
- navigation vers tous les modules CRM

## Pages

Chaque page doit afficher uniquement :

- titre du module
- courte description
- état : "Module en construction"

## Modules de navigation

La sidebar doit contenir :

- Tableau de bord
- Prospects
- Clients
- Projets
- Documents
- Tâches
- Agenda
- Conformité
- Partenaires
- Produits
- Sinistres
- Réclamations
- Agents IA
- Administration

## Contraintes

- Utiliser des composants réutilisables.
- Ne pas dupliquer le code inutilement.
- Garder une structure claire.
- Ne pas modifier les pages publiques existantes sauf nécessité technique.
- Ne pas casser le build.
- Faire simple, propre et maintenable.

## Livrable attendu

À la fin, je dois pouvoir lancer le projet, aller sur /crm et naviguer entre les pages CRM.
