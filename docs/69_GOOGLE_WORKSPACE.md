# 69 - Intégration Google Workspace

## Objectif

Documenter l'intégration Google Workspace dans le CRM EJ Assurances.

Le CRM doit pouvoir s'appuyer sur Google Workspace tout en gardant une logique métier propre, supervisable et conforme. Cette intégration concerne le cabinet, mais aussi les mandataires qui utilisent leur propre environnement Google Workspace pour l'activité réalisée au nom ou pour le compte d'EJ Assurances.

## Principe général

Un mandataire peut connecter son propre compte Google Workspace à son espace mandataire afin de synchroniser :

- Gmail ;
- Google Calendar ;
- Google Drive ;
- Google Meet ;
- Google Docs si nécessaire.

Cette connexion doit servir uniquement à l'activité professionnelle liée à EJ Assurances.

## Périmètre autorisé

La synchronisation doit être limitée aux éléments :

- rattachés à EJ Assurances ;
- associés à un client EJ Assurances ;
- associés à un prospect EJ Assurances ;
- associés à un contrat EJ Assurances ;
- associés à un sinistre EJ Assurances ;
- associés à un projet EJ Assurances ;
- explicitement importés ou synchronisés dans le CRM ;
- nécessaires au suivi métier, à la conformité ou à la supervision cabinet.

## Limite importante

Le cabinet admin ne doit pas accéder à l'ensemble de la boîte Gmail personnelle ou professionnelle du mandataire.

Le cabinet admin ne doit voir que les éléments métier importés, rattachés ou qualifiés comme liés à EJ Assurances.

## Services concernés

- Gmail ;
- Google Drive ;
- Google Calendar ;
- Google Meet ;
- Google Docs ;
- gestion documentaire ;
- synchronisation avec le CRM ;
- journalisation des accès et imports.

## Gmail

Fonctions attendues :

- synchronisation des emails liés à EJ Assurances ;
- recherche d'emails par nom client ;
- recherche par adresse email ;
- recherche par numéro de contrat ;
- recherche par sinistre ;
- rattachement automatique ou manuel à un client ;
- rattachement à un prospect ;
- rattachement à un contrat ;
- rattachement à un sinistre ;
- exclusion d'un email non lié à EJ Assurances ;
- résumé IA des fils d'emails ;
- création de brouillons ;
- validation humaine avant envoi ;
- journalisation des actions.

## Google Calendar et Google Meet

Fonctions attendues :

- synchronisation des rendez-vous liés à EJ Assurances ;
- rattachement à un prospect, client, contrat, projet ou sinistre ;
- historique des rendez-vous dans le CRM ;
- création ou conservation des liens Google Meet ;
- supervision cabinet des rendez-vous métier ;
- exclusion des rendez-vous privés ou hors périmètre EJ Assurances.

## Google Drive

Fonctions attendues :

- import des pièces liées à EJ Assurances ;
- classement documentaire ;
- rattachement aux fiches clients ;
- rattachement aux contrats ou sinistres ;
- séparation entre documents métier et documents personnels ;
- respect des permissions ;
- journalisation des imports et accès.

## Google Docs

Usages possibles :

- brouillons ;
- modèles de documents ;
- comptes rendus ;
- procédures ;
- documents de travail avant validation ;
- pièces préparatoires au devoir de conseil.

Les documents réglementaires définitifs doivent être archivés dans le CRM avec une preuve de version, de validation et de remise lorsque nécessaire.

## Supervision cabinet admin

Le cabinet admin doit pouvoir visualiser l'ensemble des éléments liés à l'activité EJ Assurances :

- prospects créés par le mandataire ;
- clients attribués au mandataire ;
- projets suivis ;
- contrats ;
- demandes clients ;
- sinistres ;
- tâches ;
- rendez-vous ;
- emails rattachés à un client, prospect, contrat, sinistre ou projet EJ Assurances ;
- actions réalisées par les agents IA ;
- brouillons générés par l'IA ;
- relances ;
- historiques ;
- alertes conformité ;
- journaux d'audit.

## Consentement mandataire

Lors de la connexion Workspace du mandataire, prévoir :

- consentement explicite ;
- explication claire des données synchronisées ;
- périmètre limité à l'activité EJ Assurances ;
- possibilité de déconnexion ;
- historique des autorisations ;
- séparation entre données personnelles et données métier ;
- respect RGPD ;
- traçabilité conformité.

## Permissions

Principes :

- le mandataire voit ses propres clients, prospects, tâches, emails et dossiers ;
- le cabinet admin voit l'ensemble des données métier EJ Assurances ;
- un collaborateur ne voit que les dossiers auxquels il est affecté ;
- un prescripteur ne voit que les prospects qu'il a transmis ;
- un client ne voit que son propre espace.

## Journalisation

Toutes les actions doivent être historisées :

- connexion Workspace ;
- autorisations accordées ;
- emails importés ;
- emails exclus ;
- rattachements clients ;
- actions IA ;
- brouillons générés ;
- emails envoyés ;
- relances ;
- modifications ;
- accès aux données ;
- changements de permissions ;
- déconnexion Workspace.

## Points ouverts

- mode d'authentification Google ;
- périmètre OAuth exact ;
- fréquence de synchronisation ;
- règles de filtrage EJ Assurances ;
- stratégie d'exclusion des emails non liés ;
- mapping entre Drive et CRM ;
- politique de conservation des emails importés.
