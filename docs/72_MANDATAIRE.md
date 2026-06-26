# 72 - Espace mandataire

## Objectif

Définir l'espace mandataire EJ Assurances et son articulation avec le CRM métier, Google Workspace et la supervision cabinet.

Le mandataire doit pouvoir travailler avec ses propres outils tout en garantissant au cabinet une vision complète, conforme et supervisée de l'activité réalisée pour EJ Assurances.

## Principes généraux

- le mandataire dispose de son propre espace ;
- le mandataire peut connecter son propre Google Workspace ;
- la connexion Workspace sert uniquement l'activité EJ Assurances ;
- le cabinet admin supervise les données métier EJ Assurances ;
- les données personnelles ou professionnelles hors EJ Assurances restent hors périmètre ;
- chaque action importante est historisée.

## Fonctions attendues

- tableau de bord mandataire ;
- clients attribués ;
- prospects créés ;
- projets suivis ;
- contrats ;
- demandes clients ;
- sinistres ;
- tâches ;
- rendez-vous ;
- emails rattachés ;
- documents ;
- commissions ;
- conformité ;
- profil mandataire ;
- historique ;
- actions IA ;
- alertes.

## Connexion Google Workspace

Le mandataire peut connecter :

- Gmail ;
- Google Calendar ;
- Google Drive ;
- Google Meet ;
- Google Docs si nécessaire.

La connexion doit prévoir :

- consentement explicite ;
- explication claire du périmètre synchronisé ;
- possibilité de déconnexion ;
- historique des autorisations ;
- séparation entre données personnelles et données métier ;
- journalisation.

## Supervision cabinet admin

Le cabinet admin doit pouvoir visualiser l'activité EJ Assurances du mandataire :

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

## Limite de supervision

Le cabinet admin ne doit pas accéder à :

- l'ensemble de la boîte Gmail du mandataire ;
- les emails personnels ;
- les emails professionnels hors EJ Assurances ;
- les documents Drive non importés ;
- les rendez-vous privés ;
- les données non nécessaires au suivi métier EJ Assurances.

## Emails mandataire

Le système doit permettre :

- recherche d'emails par nom client ;
- recherche par adresse email ;
- recherche par numéro de contrat ;
- recherche par sinistre ;
- rattachement automatique ou manuel d'un email à un client ;
- exclusion d'un email non lié à EJ Assurances ;
- résumé IA des fils d'emails ;
- création de brouillons ;
- validation humaine avant envoi ;
- journalisation des actions.

## Agents IA mandataire

Les agents IA peuvent aider à :

- lire et résumer les emails liés à EJ Assurances ;
- préparer des réponses ;
- identifier les urgences ;
- suivre les demandes ;
- relancer le client ;
- relancer la compagnie ;
- relancer le cabinet ;
- préparer le devoir de conseil ;
- détecter les éléments manquants ;
- remonter les demandes sensibles.

## Garde-fous IA

L'IA ne doit jamais :

- envoyer un email sans validation humaine ;
- donner un conseil personnalisé directement au client ;
- modifier un contrat ;
- valider un devoir de conseil ;
- prendre une décision de souscription ;
- accéder à des emails non liés à EJ Assurances ;
- analyser des données sans finalité métier claire.

## Droits d'accès

Règles :

- le mandataire voit ses propres clients, prospects, tâches, emails et dossiers ;
- le cabinet admin voit l'ensemble des données métier EJ Assurances ;
- un collaborateur ne voit que les dossiers auxquels il est affecté ;
- un prescripteur ne voit que les prospects qu'il a transmis ;
- un client ne voit que son propre espace.

## Journalisation

Toutes les actions doivent être historisées :

- connexion Workspace ;
- emails importés ;
- emails exclus ;
- rattachements clients ;
- actions IA ;
- brouillons générés ;
- emails envoyés ;
- relances ;
- modifications ;
- accès aux données ;
- changements de permissions.

## Points ouverts

- matrice exacte des droits mandataire ;
- règles de commissionnement ;
- procédure de déconnexion Workspace ;
- périmètre OAuth ;
- modèle de consentement Workspace ;
- règles de supervision cabinet.
