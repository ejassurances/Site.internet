# 86 - RGPD et sécurité des données

## Objectif

Définir la stratégie RGPD et sécurité des données EJ Assurances.

Cette stratégie doit couvrir les données du cabinet, des clients, prospects, collaborateurs, mandataires, prescripteurs et les données synchronisées depuis Google Workspace.

## Principes RGPD

- minimisation des données ;
- finalités déterminées ;
- consentements ;
- droits des personnes ;
- durée de conservation ;
- registre des traitements ;
- politique de confidentialité ;
- suppression ;
- export ;
- traçabilité.

## Données concernées

- données prospects ;
- données clients ;
- données mandataires ;
- données prescripteurs ;
- données collaborateurs ;
- données familiales ;
- données financières ;
- données de santé éventuelles ;
- documents ;
- emails ;
- rendez-vous ;
- tâches ;
- logs ;
- actions IA.

## Google Workspace mandataire

Lorsqu'un mandataire connecte son propre Google Workspace, le CRM doit respecter un périmètre strict.

Le traitement doit être limité :

- aux emails liés à EJ Assurances ;
- aux rendez-vous liés à EJ Assurances ;
- aux documents explicitement importés ;
- aux éléments rattachés à un client, prospect, contrat, projet ou sinistre EJ Assurances ;
- aux données nécessaires à la supervision métier et conformité.

Le cabinet admin ne doit pas accéder à l'ensemble de la boîte Gmail ou du Drive du mandataire.

## Consentement Workspace

Lors de la connexion Google Workspace du mandataire, prévoir :

- consentement explicite ;
- explication claire des données synchronisées ;
- périmètre limité à l'activité EJ Assurances ;
- possibilité de déconnexion ;
- historique des autorisations ;
- séparation entre données personnelles et données métier ;
- traçabilité conformité ;
- information sur les traitements IA éventuels.

## Séparation des données

Le système doit distinguer :

- données métier EJ Assurances ;
- données personnelles ;
- données professionnelles hors EJ Assurances ;
- données exclues ;
- données à qualifier ;
- données synchronisées ;
- données archivées.

## Droits d'accès

Prévoir une logique de permissions :

- le mandataire voit ses propres clients, prospects, tâches, emails et dossiers ;
- le cabinet admin voit l'ensemble des données métier EJ Assurances ;
- un collaborateur ne voit que les dossiers auxquels il est affecté ;
- un prescripteur ne voit que les prospects qu'il a transmis ;
- un client ne voit que son propre espace.

## Données sensibles

Les situations familiales, médicales ou patrimoniales peuvent être sensibles.

Mesures attendues :

- accès restreint ;
- justification métier ;
- journalisation ;
- minimisation ;
- pseudonymisation lorsque possible ;
- chiffrement ;
- conservation limitée ;
- revue périodique des accès.

## Sécurité

Prévoir :

- contrôle d'accès par rôle ;
- authentification ;
- séparation des environnements ;
- sauvegardes ;
- chiffrement ;
- logs ;
- surveillance ;
- procédure d'incident ;
- revue des accès ;
- suppression sécurisée ;
- déconnexion Workspace ;
- révocation des jetons OAuth.

## Journalisation

À historiser :

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
- changements de permissions ;
- retrait de consentement ;
- déconnexion Workspace.

## Droits des personnes

Le système doit permettre :

- accès ;
- rectification ;
- opposition ;
- effacement ;
- export ;
- limitation ;
- retrait du consentement ;
- déconnexion Workspace.

## Points ouverts

- durées de conservation ;
- registre complet ;
- procédure d'exercice des droits ;
- politique de sauvegarde ;
- classification des données ;
- règles de conservation des emails importés ;
- procédure de suppression des données Workspace.
