# 69 - Intégration Google Workspace

## Objectif

Documenter l'intégration Google Workspace dans le CRM EJ Assurances.

Le CRM doit pouvoir s'appuyer sur Google Workspace tout en conservant une logique métier propre.

## Services concernés

- Gmail ;
- Google Drive ;
- Google Calendar ;
- Google Meet ;
- Google Docs ;
- gestion documentaire ;
- synchronisation avec le CRM.

## Gmail

Fonctions attendues :

- synchronisation des emails ;
- rattachement automatique aux clients ;
- rattachement aux contrats ;
- rattachement aux sinistres ;
- recherche par email ;
- recherche par nom ;
- recherche par numéro de contrat ;
- recherche par compagnie ;
- synthèse des fils ;
- classement des demandes.

## Google Drive

Fonctions attendues :

- classement des pièces ;
- rattachement aux fiches clients ;
- gestion documentaire ;
- permissions par rôle ;
- séparation des documents sensibles ;
- archivage.

## Google Calendar et Meet

Fonctions attendues :

- synchronisation des rendez-vous ;
- création d'événements ;
- lien avec client, prospect ou dossier ;
- réunions Google Meet ;
- historique dans le CRM.

## Google Docs

Usages envisagés :

- modèles de documents ;
- brouillons ;
- procédures ;
- documentation interne ;
- documents de travail avant validation.

## Sécurité et permissions

Principes :

- droits minimaux ;
- accès par rôle ;
- journalisation des synchronisations ;
- contrôle des partages ;
- séparation entre données cabinet et données personnelles ;
- conformité RGPD.

## Configuration technique de base

Le site dispose désormais d’un point d’entrée de configuration prêt à l’emploi :

- endpoint API : `/api/google/workspace`
- variables d’environnement à renseigner : `GOOGLE_WORKSPACE_CLIENT_ID`, `GOOGLE_WORKSPACE_CLIENT_SECRET`, `GOOGLE_WORKSPACE_REDIRECT_URI`, `GOOGLE_WORKSPACE_SCOPES`, `GOOGLE_WORKSPACE_DOMAIN`

## Procédure d’activation Google Workspace

1. Créer un projet dans Google Cloud Console.
2. Activer l’API Google People API et l’API Google OAuth2.
3. Créer des identifiants OAuth 2.0 Client ID.
4. Ajouter l’URI de redirection : `https://www.ej-assurances.fr/api/google/callback`.
5. Ajouter les scopes demandés : `openid`, `email`, `profile`, `https://www.googleapis.com/auth/gmail.readonly`, `https://www.googleapis.com/auth/drive.readonly`, `https://www.googleapis.com/auth/calendar.readonly`.
6. Ajouter les variables d’environnement dans l’environnement du site.
7. Vérifier l’accès depuis l’interface d’administration.

## Points ouverts

- mode d'authentification Google ;
- périmètre OAuth exact ;
- règles de synchronisation ;
- stratégie d'archivage ;
- mapping entre Drive et CRM.
