# 02 - Architecture globale

## Objectif

Décrire l'architecture cible de la plateforme EJ Assurances.

La plateforme ne doit pas être pensée comme un simple site vitrine. Elle repose sur trois piliers complémentaires :

1. Site public et centre de connaissances ;
2. CRM métier réglementé ;
3. Agents IA assistifs encadrés.

## Pilier 1 - Site public et centre de connaissances

Le site public présente le positionnement du cabinet, ses expertises et ses contenus pédagogiques.

Périmètre :

- pages publiques ;
- pages d'expertise ;
- contenus SEO/GEO ;
- formulaires de contact et de préqualification ;
- ressources pédagogiques ;
- prise de rendez-vous ;
- accès aux espaces connectés.

Objectif :

- faire comprendre les risques propres aux familles atypiques ;
- générer des demandes qualifiées ;
- rassurer sur l'expertise, la confidentialité et la conformité du cabinet.

## Pilier 2 - CRM métier réglementé

Le CRM est l'outil central du cabinet.

Périmètre :

- prospects ;
- clients ;
- contrats ;
- projets ;
- demandes ;
- sinistres ;
- documents ;
- emails ;
- rendez-vous ;
- tâches ;
- mandataires ;
- prescripteurs ;
- collaborateurs ;
- conformité ;
- audit logs.

Objectif :

- centraliser la relation client ;
- sécuriser le suivi commercial et réglementaire ;
- tracer les actions ;
- faciliter le pilotage du cabinet.

## Pilier 3 - Agents IA assistifs encadrés

Les agents IA peuvent assister les équipes dans les tâches de lecture, synthèse, préparation et qualification.

Ils ne doivent jamais remplacer la validation humaine.

Périmètre :

- assistant commercial ;
- assistant relation client ;
- assistant email ;
- assistant sinistre ;
- assistant conformité ;
- aide à la rédaction de brouillons.

Principes :

- l'IA assiste ;
- l'humain décide ;
- chaque action sensible est validée ;
- chaque action IA est historisée ;
- les données sont minimisées.

## Principes d'architecture

- séparation claire entre espace public et espaces connectés ;
- gestion stricte des rôles et droits d'accès ;
- traçabilité des actions sensibles ;
- conformité ACPR/DDA intégrée au parcours ;
- conservation des preuves ;
- sécurité et RGPD dès la conception ;
- évolutivité des modules métier.

## Rôles principaux

- prospect ;
- client ;
- courtier admin ;
- collaborateur ;
- mandataire ;
- prescripteur ;
- partenaire ;
- administrateur technique.

## Données structurantes

- profils utilisateurs ;
- fiches prospects ;
- fiches clients ;
- contrats ;
- projets ;
- demandes ;
- sinistres ;
- documents ;
- emails ;
- rendez-vous ;
- tâches ;
- consentements ;
- devoirs de conseil ;
- recommandations ;
- journaux d'audit.

## Points ouverts

- choix définitif des intégrations email et calendrier ;
- niveau d'automatisation autorisé pour les agents IA ;
- format final des documents réglementaires ;
- règles de conservation documentaire ;
- matrice détaillée des droits par rôle.
