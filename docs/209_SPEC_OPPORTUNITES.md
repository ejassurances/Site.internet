# 209_SPEC_OPPORTUNITES

## Objet

Le module Opportunités permet de gérer les opportunités commerciales du cabinet.

Une Opportunité représente une possibilité de développement commercial.

Lorsqu'une Opportunité est qualifiée, elle peut être transformée en Projet.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

# Écran 1 — Liste des Opportunités

## Objectif

Permettre de consulter, rechercher et gérer toutes les opportunités commerciales du cabinet.

---

## Dépendances

Ce module utilise :

- Statuts
- Priorités
- Recherche globale
- Vues / Filtres / Tris
- Permissions
- Actions standard
- Historique métier

---

## Informations affichées

Chaque ligne affiche :

- Numéro de l'opportunité
- Nom
- Prospect / Client
- Origine
- Responsable
- Statut
- Probabilité de réussite
- Date de création
- Prochaine action

---

## Actions disponibles

- Ouvrir
- Créer une opportunité
- Modifier
- Transformer en Projet
- Archiver
- Exporter
- Ajouter aux favoris

---

## Filtres

- Responsable
- Statut
- Origine
- Probabilité
- Date
- Tags

---

## Critères de validation

L'écran est conforme lorsque :

- les opportunités sont facilement recherchables ;
- les filtres fonctionnent ;
- les informations sont à jour ;
- les permissions sont respectées.



# Écran 2 — Fiche Opportunité

## Objectif

Permettre de consulter et de gérer toutes les informations relatives à une Opportunité.

La fiche Opportunité constitue le point central du suivi commercial avant la création d'un Projet.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

La fiche affiche :

- Numéro de l'opportunité
- Nom
- Prospect / Client
- Responsable
- Statut
- Priorité
- Probabilité de réussite
- Date de création
- Date de dernière modification

---

## Résumé

La fiche présente :

- Besoin identifié
- Produits envisagés
- Montant estimé (si applicable)
- Date de clôture estimée
- Dernière interaction
- Prochaine action prévue

---

## Accès rapide

Depuis la fiche, l'utilisateur accède directement à :

- Client
- Activités
- Documents
- Commentaires
- Historique

---

## Transformation

Lorsque l'opportunité est qualifiée, le conseiller peut :

- Transformer l'opportunité en Projet

La plateforme conserve automatiquement le lien entre l'Opportunité et le Projet créé.

---

## Actions disponibles

- Modifier
- Ajouter une activité
- Ajouter un document
- Transformer en Projet
- Archiver

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations sont centralisées ;
- la transformation en Projet est possible ;
- les liens avec les autres modules fonctionnent ;
- les modifications sont historisées.

# Écran 3 — Qualification de l'Opportunité

## Objectif

Qualifier l'Opportunité afin de déterminer si elle peut être transformée en Projet.

Cette étape permet au conseiller d'évaluer la maturité du besoin.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Qualification

Le conseiller peut renseigner :

- Niveau de qualification
- Besoin identifié
- Produits envisagés
- Budget estimé
- Échéance souhaitée
- Niveau d'intérêt du prospect

---

## Critères de qualification

La plateforme permet d'évaluer notamment :

- Besoin clairement identifié
- Décideur identifié
- Budget connu
- Échéance connue
- Faisabilité

Chaque critère peut être marqué :

- Oui
- Non
- À confirmer

---

## Résultat

À l'issue de la qualification, l'Opportunité peut être :

- À poursuivre
- À mettre en attente
- À abandonner
- Prête à être transformée en Projet

---

## Actions disponibles

- Modifier la qualification
- Ajouter un commentaire
- Ajouter une activité
- Transformer en Projet (si qualifiée)

---

## Critères de validation

L'écran est conforme lorsque :

- les critères de qualification sont renseignés ;
- le niveau de maturité est visible ;
- les décisions sont historisées ;
- les permissions sont respectées.

# Écran 4 — Pipeline commercial

## Objectif

Visualiser toutes les Opportunités selon leur étape commerciale afin de piloter efficacement l'activité du cabinet.

Le Pipeline offre une vue d'ensemble de l'avancement des opportunités.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Étapes du pipeline

Le pipeline est composé des étapes suivantes :

- Nouvelle opportunité
- Premier contact
- Qualification
- Étude en cours
- Proposition présentée
- Négociation
- Gagnée
- Perdue

Les étapes sont personnalisables.

---

## Affichage

Chaque Opportunité affiche :

- Nom
- Prospect / Client
- Responsable
- Priorité
- Date de création
- Prochaine action

---

## Déplacement

L'utilisateur peut déplacer une Opportunité d'une étape à une autre.

Chaque changement :

- est historisé ;
- enregistre la date ;
- enregistre l'auteur.

---

## Indicateurs

Le Pipeline affiche notamment :

- Nombre d'opportunités par étape
- Valeur estimée (si utilisée)
- Nombre d'opportunités gagnées
- Nombre d'opportunités perdues

---

## Actions disponibles

- Ouvrir une Opportunité
- Changer d'étape
- Créer une Opportunité
- Transformer en Projet
- Filtrer le Pipeline

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les opportunités sont visibles ;
- le déplacement entre les étapes fonctionne ;
- les changements sont historisés ;
- les permissions sont respectées.


# Écran 5 — Activités de l'Opportunité

## Objectif

Centraliser toutes les actions réalisées dans le cadre du suivi d'une Opportunité.

Le suivi des activités permet d'assurer une relance efficace et de conserver l'historique commercial.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 202_SPEC_ACTIVITES.md

---

## Activités affichées

L'Opportunité peut contenir :

- Appels
- Emails
- Rendez-vous
- Visioconférences
- Tâches
- Notes
- SMS (si disponible)

---

## Informations affichées

Pour chaque activité :

- Type
- Objet
- Date
- Responsable
- Statut
- Résultat

---

## Résultat de l'activité

Une activité peut se terminer par :

- Contact établi
- Sans réponse
- Rendez-vous obtenu
- À relancer
- Opportunité perdue
- Opportunité qualifiée

La liste est personnalisable.

---

## Prochaine action

Chaque activité peut générer automatiquement :

- Une nouvelle tâche
- Une relance
- Un rendez-vous
- Une notification

Selon les règles du cabinet.

---

## Actions disponibles

- Ajouter une activité
- Modifier
- Clôturer
- Ouvrir l'activité
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les activités sont centralisées ;
- les résultats sont enregistrés ;
- les relances sont planifiées ;
- les permissions sont respectées.

# Écran 6 — Documents de l'Opportunité

## Objectif

Centraliser tous les documents utilisés pendant la phase commerciale précédant la création d'un Projet.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 207_SPEC_DOCUMENTS.md

---

## Types de documents

Une Opportunité peut contenir :

- Proposition commerciale
- Devis
- Comparatif
- Présentation
- Compte-rendu
- Documents transmis par le prospect
- Autres documents

---

## Informations affichées

Pour chaque document :

- Nom
- Type
- Version
- Date
- Auteur
- Statut

---

## Gestion documentaire

Depuis cet écran, il est possible de :

- Prévisualiser
- Télécharger
- Envoyer
- Générer une nouvelle version
- Archiver
- Consulter l'historique

---

## Transformation

Lorsqu'une Opportunité devient un Projet :

- les documents sont conservés ;
- ils sont automatiquement rattachés au Projet ;
- aucun document n'est dupliqué.

---

## Actions disponibles

- Ajouter un document
- Générer un document
- Envoyer
- Archiver
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- tous les documents sont centralisés ;
- les documents suivent l'Opportunité lors de sa transformation en Projet ;
- aucune duplication n'est créée ;
- les permissions sont respectées.


# Écran 7 — Estimation commerciale

## Objectif

Permettre d'estimer le potentiel commercial d'une Opportunité afin d'aider le cabinet à prioriser son activité.

Cette estimation est indicative et ne constitue pas un engagement.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Estimation

Le conseiller peut renseigner :

- Chiffre d'affaires estimé (optionnel)
- Commission estimée (optionnelle)
- Date prévisionnelle de signature
- Niveau de priorité

Tous ces champs sont facultatifs.

---

## Probabilité

L'opportunité possède une probabilité de réussite :

- Très faible
- Faible
- Moyenne
- Élevée
- Très élevée

Cette probabilité peut être proposée par l'IA mais reste modifiable par le conseiller.

---

## Indicateurs

La plateforme affiche :

- Ancienneté de l'opportunité
- Temps passé dans l'étape actuelle
- Nombre d'interactions
- Date de la prochaine action

---

## Analyse

Le conseiller peut ajouter :

- Forces de l'opportunité
- Freins identifiés
- Concurrence connue
- Commentaires

---

## Actions disponibles

- Modifier l'estimation
- Recalculer la probabilité
- Ajouter un commentaire
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- les estimations sont enregistrées ;
- les probabilités sont visibles ;
- les analyses sont historisées ;
- les permissions sont respectées.


# Écran 8 — Décision commerciale

## Objectif

Enregistrer l'issue de l'Opportunité et préparer les actions suivantes.

Cette étape marque la fin du cycle commercial de l'Opportunité.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Décision

L'Opportunité peut être :

- Transformée en Projet
- Perdue
- Mise en attente
- Abandonnée
- Clôturée sans suite

---

## Informations enregistrées

Pour chaque décision :

- Date
- Responsable
- Motif
- Commentaire

---

## Motifs possibles

Exemples :

- Client intéressé
- Budget insuffisant
- Projet reporté
- Choix d'un concurrent
- Pas de besoin
- Impossible à assurer
- Autre

La liste est administrable.

---

## Actions proposées

Selon la décision, la plateforme peut proposer :

- Transformer en Projet
- Programmer une relance
- Archiver l'Opportunité
- Créer une nouvelle Opportunité
- Clôturer le dossier

---

## Historique

Toutes les décisions sont historisées.

La plateforme conserve :

- Date
- Auteur
- Décision
- Motif
- Commentaires

---

## Actions disponibles

- Enregistrer la décision
- Modifier (selon les droits)
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- une décision est enregistrée ;
- les motifs sont renseignés ;
- les actions proposées sont cohérentes ;
- les permissions sont respectées.



# Écran 9 — Statistiques des Opportunités

## Objectif

Permettre au cabinet d'analyser les performances commerciales liées aux Opportunités.

Ces indicateurs facilitent le pilotage de l'activité et l'amélioration du taux de transformation.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Indicateurs

La plateforme affiche notamment :

- Nombre d'Opportunités créées
- Nombre d'Opportunités en cours
- Nombre d'Opportunités transformées en Projet
- Nombre d'Opportunités perdues
- Nombre d'Opportunités en attente

---

## Analyse

La plateforme présente :

- Taux de transformation
- Durée moyenne avant transformation
- Durée moyenne avant abandon
- Répartition par conseiller
- Répartition par origine
- Répartition par type de besoin

---

## Comparaison

Les statistiques peuvent être filtrées par :

- Période
- Conseiller
- Origine
- Type d'Opportunité
- Statut

---

## Alertes

La plateforme peut signaler :

- Opportunités sans activité récente
- Opportunités bloquées
- Baisse du taux de transformation
- Trop d'opportunités perdues

---

## Actions disponibles

- Filtrer les statistiques
- Exporter les données
- Ouvrir les Opportunités concernées

---

## Critères de validation

L'écran est conforme lorsque :

- les statistiques sont fiables ;
- les filtres fonctionnent ;
- les indicateurs sont mis à jour ;
- les permissions sont respectées.

# Écran 10 — Vue 360° de l'Opportunité

## Objectif

Offrir une vision complète d'une Opportunité en regroupant toutes les informations utiles sur un seul écran.

Cette vue permet au conseiller de savoir immédiatement où en est l'Opportunité et quelles actions mener.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Résumé

La vue affiche :

- Numéro de l'Opportunité
- Nom
- Prospect / Client
- Responsable
- Statut
- Priorité
- Niveau de qualification
- Date de création
- Dernière interaction
- Prochaine action

---

## Pipeline

Affichage de :

- Étape actuelle
- Historique des étapes
- Temps passé dans chaque étape

---

## Activités

Résumé des activités :

- Dernier appel
- Dernier rendez-vous
- Dernier email
- Prochaine activité prévue
- Nombre total d'activités

---

## Documents

Résumé documentaire :

- Nombre de documents
- Dernier document généré
- Dernier document envoyé

---

## Analyse commerciale

Affichage de :

- Besoin identifié
- Produits envisagés
- Probabilité de réussite
- Date estimée de transformation
- Commentaires principaux

---

## Alertes

La plateforme peut afficher :

- Aucune activité planifiée
- Opportunité inactive depuis longtemps
- Qualification incomplète
- Relance en retard

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Ajouter une activité
- Planifier un rendez-vous
- Envoyer un email
- Ajouter un document
- Qualifier l'Opportunité
- Transformer en Projet
- Clôturer l'Opportunité

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations essentielles sont visibles sur un seul écran ;
- les alertes sont pertinentes ;
- les actions rapides sont accessibles ;
- les liens avec les autres modules fonctionnent.
