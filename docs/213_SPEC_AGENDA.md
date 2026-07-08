# 213_SPEC_AGENDA

## Objet

Le module Agenda permet de planifier, organiser et suivre l'ensemble des événements du cabinet.

L'Agenda centralise les rendez-vous, tâches planifiées, échéances et événements issus des différents modules de la plateforme.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

# Écran 1 — Agenda

## Objectif

Permettre à l'utilisateur de visualiser l'ensemble de son planning et des événements auxquels il a accès.

L'agenda constitue le point d'entrée de l'organisation quotidienne.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 202_SPEC_ACTIVITES.md
- 211_SPEC_WORKFLOWS.md

---

## Modes d'affichage

L'utilisateur peut consulter son agenda sous différents formats :

- Jour
- Semaine
- Mois
- Planning
- Liste

---

## Informations affichées

Chaque événement affiche notamment :

- Titre
- Type
- Date
- Heure de début
- Heure de fin
- Responsable
- Statut
- Couleur (selon le type)

---

## Navigation

L'utilisateur peut :

- Changer de période
- Aller à aujourd'hui
- Rechercher une date
- Filtrer les événements

---

## Actions disponibles

- Ouvrir un événement
- Créer un événement
- Modifier
- Déplacer un événement
- Changer de vue

---

## Critères de validation

L'écran est conforme lorsque :

- les événements sont correctement affichés ;
- les différents modes de vue fonctionnent ;
- les filtres sont opérationnels ;
- les permissions sont respectées.



# Écran 2 — Fiche Événement

## Objectif

Permettre de consulter et de gérer un événement planifié dans l'Agenda.

Chaque événement est lié à un objet métier ou à une activité.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 202_SPEC_ACTIVITES.md

---

## Informations générales

La fiche affiche :

- Titre
- Type d'événement
- Date
- Heure de début
- Heure de fin
- Durée
- Statut
- Responsable

---

## Participants

L'événement peut comporter :

- Organisateur
- Participants internes
- Participants externes
- Client(s)
- Partenaire(s)

---

## Localisation

Selon le type d'événement :

- Adresse
- Salle
- Visioconférence
- Téléphone
- Lien de connexion

---

## Objet lié

Un événement peut être lié à :

- Client
- Opportunité
- Projet
- Contrat
- Activité
- Partenaire
- Autre objet métier

---

## Informations complémentaires

Selon le type d'événement :

- Description
- Notes
- Pièces jointes
- Commentaires

---

## Actions disponibles

- Modifier
- Déplacer
- Annuler
- Clôturer
- Ouvrir l'objet lié

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations sont accessibles ;
- les liens vers les objets métier fonctionnent ;
- les modifications sont historisées ;
- les permissions sont respectées.


# Écran 3 — Types d'événements

## Objectif

Définir les différents types d'événements pouvant être planifiés dans l'Agenda.

Chaque événement appartient obligatoirement à un type.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Types d'événements

La plateforme peut gérer notamment :

### Événements commerciaux

- Rendez-vous client
- Rendez-vous prospect
- Appel téléphonique
- Visioconférence
- Présentation commerciale

### Événements métier

- Étude de dossier
- Analyse
- Signature
- Livraison de documents
- Réunion partenaire

### Événements internes

- Réunion d'équipe
- Formation
- Entretien interne
- Point de pilotage
- CODIR

### Événements personnels

- Congés
- Absence
- Déplacement
- Indisponibilité

La liste est administrable.

---

## Informations du type

Pour chaque type :

- Nom
- Catégorie
- Description
- Couleur d'affichage
- Durée par défaut (optionnelle)

---

## Paramètres

Le type peut définir :

- Si l'événement bloque le planning
- Si une notification est envoyée
- Si un rappel est proposé
- Si une visioconférence peut être associée

---

## Actions disponibles

- Créer un type
- Modifier
- Désactiver
- Consulter les événements associés

---

## Critères de validation

L'écran est conforme lorsque :

- chaque événement possède un type ;
- les types sont administrables ;
- les catégories sont cohérentes ;
- les modifications sont historisées.



# Écran 4 — Création d'un événement

## Objectif

Permettre de créer un nouvel événement dans l'Agenda.

Selon son origine, l'événement peut être créé manuellement ou automatiquement.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 202_SPEC_ACTIVITES.md
- 211_SPEC_WORKFLOWS.md

---

## Informations à renseigner

Lors de la création, l'utilisateur peut définir :

- Type d'événement
- Titre
- Date
- Heure de début
- Heure de fin
- Responsable
- Participants
- Localisation
- Description

---

## Association

L'événement peut être lié à :

- Un Client
- Une Opportunité
- Un Projet
- Un Contrat
- Une Activité
- Un Partenaire
- Un autre objet métier

---

## Création automatique

Un événement peut être créé automatiquement par :

- Un Workflow
- Une échéance
- Une relance planifiée
- Une action d'un Service IA

---

## Vérifications

Avant l'enregistrement, la plateforme contrôle notamment :

- Les champs obligatoires
- Les conflits d'agenda
- Les droits de création
- La cohérence des dates et horaires

---

## Actions disponibles

- Créer
- Enregistrer comme brouillon
- Annuler
- Planifier
- Créer et ouvrir

---

## Critères de validation

L'écran est conforme lorsque :

- l'événement est correctement créé ;
- les contrôles sont effectués ;
- les liens avec les objets métier sont établis ;
- les permissions sont respectées.


# Écran 5 — Participants

## Objectif

Permettre de gérer les participants associés à un événement de l'Agenda.

Les participants peuvent être internes ou externes au cabinet.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 203_SPEC_CLIENTS.md
- 208_SPEC_PARTENAIRES.md

---

## Types de participants

Un événement peut comporter :

### Participants internes

- Utilisateur
- Collaborateur
- Équipe

### Participants externes

- Client
- Prospect
- Partenaire
- Apporteur
- Autre contact

---

## Informations affichées

Pour chaque participant :

- Nom
- Type
- Rôle
- Statut de participation
- Coordonnées (si disponibles)

---

## Statuts de participation

Un participant peut être :

- Invité
- En attente de réponse
- Accepté
- Refusé
- Absent
- Présent

La liste est administrable.

---

## Invitations

Selon les paramètres du cabinet, la plateforme peut :

- Envoyer une invitation
- Envoyer un rappel
- Enregistrer la réponse du participant
- Mettre à jour automatiquement son statut

---

## Actions disponibles

- Ajouter un participant
- Modifier
- Retirer
- Renvoyer une invitation
- Consulter les réponses

---

## Critères de validation

L'écran est conforme lorsque :

- les participants sont correctement associés à l'événement ;
- les statuts sont correctement suivis ;
- les invitations fonctionnent ;
- les permissions sont respectées.

# Écran 6 — Disponibilités et conflits

## Objectif

Permettre de visualiser les disponibilités des participants et de détecter les conflits de planification avant la validation d'un événement.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 202_SPEC_ACTIVITES.md

---

## Disponibilités

Pour chaque participant interne, la plateforme peut afficher :

- Disponible
- Occupé
- Indisponible
- En congé
- Hors horaires de travail

Les informations affichées respectent les droits d'accès de l'utilisateur.

---

## Détection des conflits

La plateforme peut détecter notamment :

- Chevauchement d'événements
- Participant indisponible
- Salle déjà réservée
- Ressource déjà utilisée
- Événement en dehors des horaires définis

---

## Affichage

Les conflits sont présentés avec :

- Le participant ou la ressource concernée
- La nature du conflit
- L'horaire concerné
- Le niveau de gravité

---

## Résolution

L'utilisateur peut :

- Modifier la date
- Modifier les horaires
- Changer les participants
- Continuer malgré le conflit (si autorisé)

---

## Actions disponibles

- Vérifier les disponibilités
- Rechercher un créneau disponible
- Modifier l'événement
- Confirmer malgré le conflit (selon les droits)

---

## Critères de validation

L'écran est conforme lorsque :

- les disponibilités sont correctement affichées ;
- les conflits sont détectés ;
- les propositions de résolution sont disponibles ;
- les permissions sont respectées.


# Écran 7 — Synchronisation des agendas

## Objectif

Permettre la synchronisation de l'Agenda d'EJ Partners avec des agendas externes afin d'éviter les doubles saisies et les conflits de planification.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Agendas compatibles

Selon les connecteurs disponibles, la plateforme peut synchroniser avec :

- Google Calendar
- Microsoft Outlook / Exchange
- Apple Calendar (iCloud)
- Calendriers CalDAV
- Autres services compatibles

La liste est évolutive.

---

## Types de synchronisation

La synchronisation peut être :

- Unidirectionnelle (lecture seule)
- Bidirectionnelle
- Manuelle
- Automatique

---

## Paramètres

L'utilisateur peut définir :

- L'agenda à synchroniser
- Le sens de synchronisation
- La fréquence
- Les types d'événements à synchroniser
- Les calendriers concernés

---

## Gestion des conflits

En cas de conflit, la plateforme peut :

- Signaler le conflit
- Conserver la version EJ Partners
- Conserver la version externe
- Demander une confirmation à l'utilisateur

Selon les règles définies.

---

## Historique

Toutes les synchronisations sont historisées :

- Date
- Utilisateur
- Agenda concerné
- Nombre d'événements synchronisés
- Résultat
- Erreurs éventuelles

---

## Actions disponibles

- Configurer une synchronisation
- Lancer une synchronisation
- Suspendre
- Réactiver
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- les agendas externes sont correctement synchronisés ;
- les conflits sont gérés ;
- les synchronisations sont historisées ;
- les permissions sont respectées.

# Écran 8 — Rappels et échéances

## Objectif

Permettre à EJ Partners de rappeler automatiquement les événements à venir et les échéances importantes.

Les rappels contribuent à améliorer l'organisation quotidienne du cabinet.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 211_SPEC_WORKFLOWS.md
- 212_SPEC_NOTIFICATIONS.md

---

## Types de rappels

Un rappel peut concerner notamment :

- Un rendez-vous
- Une réunion
- Une échéance de contrat
- Une relance client
- Une tâche planifiée
- Une signature attendue
- Toute autre échéance métier

---

## Paramètres

Chaque rappel peut être configuré avec :

- Date et heure du rappel
- Nombre de rappels
- Canal de notification
- Priorité
- Destinataire(s)

---

## Déclenchement

Le rappel peut être déclenché :

- À une heure précise
- X minutes avant
- X heures avant
- X jours avant
- Selon un Workflow

---

## Gestion

L'utilisateur peut :

- Reporter un rappel
- Marquer comme traité
- Désactiver un rappel (si autorisé)
- Ouvrir l'événement concerné

---

## Historique

La plateforme conserve :

- Date de création
- Date d'envoi
- Destinataire
- Canal utilisé
- Résultat

---

## Actions disponibles

- Créer un rappel
- Modifier
- Reporter
- Désactiver
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- les rappels sont générés aux bonnes dates ;
- les notifications sont envoyées selon les paramètres définis ;
- les rappels sont historisés ;
- les permissions sont respectées.



# Écran 9 — Statistiques de l'Agenda

## Objectif

Permettre d'analyser l'activité liée à l'Agenda afin d'améliorer l'organisation du cabinet et le pilotage des ressources.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Indicateurs

La plateforme affiche notamment :

- Nombre total d'événements
- Nombre de rendez-vous
- Nombre de réunions
- Nombre d'événements annulés
- Nombre d'événements reportés
- Temps moyen passé en rendez-vous
- Taux d'occupation des agendas

---

## Analyse

Les statistiques peuvent être présentées par :

- Période
- Utilisateur
- Équipe
- Type d'événement
- Origine de l'événement

---

## Alertes

La plateforme peut signaler :

- Agenda surchargé
- Journées sans disponibilité
- Nombre important d'événements annulés
- Événements sans participants
- Conflits de planning fréquents

---

## Tableaux de bord

La plateforme peut afficher :

- Répartition des événements par type
- Temps consacré aux rendez-vous clients
- Temps consacré aux réunions internes
- Évolution de l'activité dans le temps

---

## Actions disponibles

- Filtrer les statistiques
- Exporter les données
- Ouvrir les événements concernés

---

## Critères de validation

L'écran est conforme lorsque :

- les statistiques sont fiables ;
- les indicateurs sont mis à jour ;
- les filtres fonctionnent ;
- les permissions sont respectées.



# Écran 9 — Statistiques de l'Agenda

## Objectif

Permettre d'analyser l'activité liée à l'Agenda afin d'améliorer l'organisation du cabinet et le pilotage des ressources.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Indicateurs

La plateforme affiche notamment :

- Nombre total d'événements
- Nombre de rendez-vous
- Nombre de réunions
- Nombre d'événements annulés
- Nombre d'événements reportés
- Temps moyen passé en rendez-vous
- Taux d'occupation des agendas

---

## Analyse

Les statistiques peuvent être présentées par :

- Période
- Utilisateur
- Équipe
- Type d'événement
- Origine de l'événement

---

## Alertes

La plateforme peut signaler :

- Agenda surchargé
- Journées sans disponibilité
- Nombre important d'événements annulés
- Événements sans participants
- Conflits de planning fréquents

---

## Tableaux de bord

La plateforme peut afficher :

- Répartition des événements par type
- Temps consacré aux rendez-vous clients
- Temps consacré aux réunions internes
- Évolution de l'activité dans le temps

---

## Actions disponibles

- Filtrer les statistiques
- Exporter les données
- Ouvrir les événements concernés

---

## Critères de validation

L'écran est conforme lorsque :

- les statistiques sont fiables ;
- les indicateurs sont mis à jour ;
- les filtres fonctionnent ;
- les permissions sont respectées.

# Écran 10 — Vue 360° de l'Agenda

## Objectif

Offrir une vision complète de l'activité de l'Agenda en regroupant les informations essentielles sur un seul écran.

Cette vue permet à l'utilisateur d'organiser efficacement son planning et d'identifier rapidement les événements nécessitant une action.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Résumé

La vue affiche :

- Nombre d'événements aujourd'hui
- Nombre d'événements cette semaine
- Prochain rendez-vous
- Prochaine échéance
- Nombre de rappels en attente
- Nombre de conflits détectés

---

## Planning

Affichage synthétique :

- Journée en cours
- Semaine en cours
- Créneaux disponibles
- Créneaux occupés

---

## Événements à venir

Présentation des prochains événements avec :

- Titre
- Type
- Date
- Heure
- Participants
- Statut

---

## Alertes

La plateforme peut afficher :

- Conflit d'agenda
- Rendez-vous imminent
- Rappel en attente
- Événement sans participant
- Synchronisation en erreur

---

## Historique

Résumé des dernières actions :

- Dernier événement créé
- Dernière modification
- Dernière synchronisation
- Dernier rappel envoyé

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Créer un événement
- Rechercher un créneau
- Consulter son planning
- Accéder aux rappels
- Ouvrir un événement
- Synchroniser les agendas

---

## Critères de validation

L'écran est conforme lorsque :

- les informations essentielles sont accessibles depuis un seul écran ;
- les alertes sont clairement identifiées ;
- les actions rapides sont disponibles ;
- les liens avec les autres modules fonctionnent.
