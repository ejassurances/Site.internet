# 219_SPEC_INDICATEURS_KPI

## Objet

Le module Indicateurs & KPI permet de définir, calculer, centraliser et exploiter l'ensemble des indicateurs utilisés dans EJ Partners.

Les indicateurs alimentent les tableaux de bord, les reportings, les alertes, les Workflows et les Services IA.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

# Écran 1 — Bibliothèque des Indicateurs

## Objectif

Permettre de consulter et d'administrer l'ensemble des indicateurs disponibles dans EJ Partners.

La bibliothèque constitue le référentiel unique des KPI utilisés par la plateforme.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations affichées

Pour chaque indicateur, la plateforme affiche :

- Nom
- Description
- Catégorie
- Type
- Source de données
- Fréquence de calcul
- Statut
- Dernière mise à jour

---

## Catégories

Les indicateurs peuvent appartenir notamment aux catégories suivantes :

- Commercial
- Clients
- Contrats
- Activités
- Agenda
- Conformité
- Financier
- Productivité
- Qualité
- IA

La liste est évolutive.

---

## Navigation

L'utilisateur peut :

- Rechercher un indicateur
- Filtrer par catégorie
- Filtrer par module
- Trier les résultats

---

## Actions disponibles

- Consulter
- Créer (selon les droits)
- Modifier
- Désactiver
- Prévisualiser

---

## Critères de validation

L'écran est conforme lorsque :

- tous les indicateurs sont centralisés ;
- les recherches fonctionnent ;
- les informations sont à jour ;
- les permissions sont respectées.

# Écran 2 — Fiche Indicateur

## Objectif

Permettre de consulter, configurer et administrer un indicateur utilisé dans EJ Partners.

La fiche centralise toutes les informations nécessaires à son calcul, son interprétation et son exploitation.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

La fiche affiche :

- Nom
- Code (si utilisé)
- Description
- Catégorie
- Type d'indicateur
- Statut
- Auteur
- Date de création
- Dernière modification

---

## Définition

Pour chaque indicateur, la plateforme précise :

- Objectif métier
- Définition officielle
- Source(s) de données
- Méthode de calcul
- Unité de mesure
- Fréquence de mise à jour

---

## Paramètres

L'indicateur peut définir :

- Période d'analyse
- Mode d'agrégation
- Arrondi
- Format d'affichage
- Couleur par défaut (si applicable)

---

## Utilisation

La plateforme indique où l'indicateur est utilisé :

- Tableaux de bord
- Reporting
- Alertes
- Workflows
- Services IA
- Objectifs

---

## Documentation

La fiche contient :

- Description fonctionnelle
- Exemple de calcul
- Cas particuliers
- Historique des évolutions

---

## Actions disponibles

- Modifier
- Prévisualiser
- Consulter les utilisations
- Désactiver
- Dupliquer
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations sont disponibles ;
- la méthode de calcul est documentée ;
- les dépendances sont identifiées ;
- les permissions sont respectées.

# Écran 3 — Sources de données des KPI

## Objectif

Permettre de définir les sources de données utilisées pour calculer un indicateur.

Chaque KPI repose sur une ou plusieurs sources de données clairement identifiées afin de garantir la cohérence des calculs.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Sources disponibles

Un indicateur peut exploiter des données provenant notamment de :

- Clients
- Prospects
- Opportunités
- Projets
- Contrats
- Produits
- Documents
- Activités
- Agenda
- Partenaires
- Messagerie
- Notifications
- Utilisateurs
- Journal d'audit

La liste est évolutive.

---

## Type de source

Une source peut être :

- Une entité métier
- Une vue métier
- Un calcul intermédiaire
- Un autre KPI
- Une source externe (si autorisée)

---

## Paramètres

Pour chaque source, il est possible de définir :

- Les filtres
- Les conditions
- La période d'analyse
- Les exclusions
- Les règles d'agrégation

---

## Validation

Avant l'activation d'un KPI, la plateforme vérifie :

- L'existence des sources
- Les droits d'accès
- La compatibilité des données
- La cohérence des filtres

---

## Actions disponibles

- Ajouter une source
- Modifier
- Supprimer
- Tester
- Prévisualiser les données

---

## Critères de validation

L'écran est conforme lorsque :

- les sources sont clairement identifiées ;
- les contrôles sont effectués ;
- les dépendances sont documentées ;
- les permissions sont respectées.


# Écran 4 — Formules de calcul

## Objectif

Permettre de définir la méthode de calcul des indicateurs de manière standardisée, transparente et réutilisable.

Chaque KPI possède une formule de calcul unique faisant référence aux objets métier d'EJ Partners.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- Sources de données des KPI

---

## Méthodes de calcul

Le moteur prend notamment en charge :

- Comptage
- Somme
- Moyenne
- Minimum
- Maximum
- Pourcentage
- Ratio
- Écart
- Évolution
- Durée

La liste est évolutive.

---

## Paramètres

Une formule peut définir :

- Les données utilisées
- Les filtres
- La période
- Les exclusions
- Les regroupements
- Les arrondis

---

## Dépendances

Une formule peut utiliser :

- Des objets métier
- Des vues métier
- D'autres KPI validés

Les dépendances sont automatiquement documentées.

---

## Validation

Avant l'activation, la plateforme vérifie :

- La cohérence de la formule
- Les dépendances
- Les risques de calcul circulaire
- Les performances estimées

---

## Prévisualisation

L'utilisateur peut :

- Tester la formule
- Simuler un calcul
- Visualiser le détail du résultat

---

## Actions disponibles

- Modifier
- Tester
- Prévisualiser
- Dupliquer
- Consulter les dépendances

---

## Critères de validation

L'écran est conforme lorsque :

- les formules sont cohérentes ;
- les calculs sont reproductibles ;
- les dépendances sont connues ;
- les permissions sont respectées.


# Écran 5 — Seuils et objectifs

## Objectif

Permettre de définir des seuils, des objectifs et des niveaux d'alerte pour chaque indicateur afin de faciliter le pilotage du cabinet.

Les seuils permettent d'interpréter automatiquement les résultats des KPI.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Types de seuils

Un KPI peut définir notamment :

- Valeur minimale
- Valeur maximale
- Valeur cible
- Zone d'alerte
- Zone critique
- Objectif annuel
- Objectif mensuel
- Objectif hebdomadaire

La liste est évolutive.

---

## Paramètres

Pour chaque seuil, la plateforme permet de définir :

- Valeur
- Type de comparaison
- Période concernée
- Niveau de priorité
- Couleur d'affichage
- Icône (optionnelle)

---

## Évaluation

Le moteur compare automatiquement la valeur calculée avec :

- Les objectifs
- Les seuils
- Les tendances historiques

---

## Résultat

Le KPI peut être qualifié automatiquement comme :

- Excellent
- Conforme
- À surveiller
- En alerte
- Critique

Les libellés sont personnalisables.

---

## Actions disponibles

- Définir un objectif
- Modifier un seuil
- Désactiver un seuil
- Tester les seuils
- Prévisualiser le résultat

---

## Critères de validation

L'écran est conforme lorsque :

- les seuils sont correctement appliqués ;
- les objectifs sont pris en compte ;
- les niveaux d'alerte sont cohérents ;
- les permissions sont respectées.



# Écran 6 — Visualisation des KPI

## Objectif

Permettre de représenter les indicateurs sous différentes formes afin de faciliter leur compréhension et leur analyse.

La visualisation est indépendante du calcul des KPI. Un même indicateur peut être affiché de plusieurs manières selon le contexte.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Modes de visualisation

Selon la nature de l'indicateur, la plateforme peut proposer :

- Valeur simple
- Carte KPI
- Jauge
- Barre de progression
- Histogramme
- Courbe
- Camembert
- Tableau
- Chronologie
- Carte thermique (Heatmap)

La liste est évolutive.

---

## Informations affichées

Selon le mode choisi, le KPI peut afficher :

- Valeur actuelle
- Objectif
- Écart
- Tendance
- Variation
- Date de calcul
- Statut
- Niveau d'alerte

---

## Personnalisation

Le cabinet peut définir :

- Les couleurs
- Les icônes
- Les unités
- Les décimales
- Les seuils visuels
- Les légendes

---

## Interaction

L'utilisateur peut :

- Modifier la période
- Changer le mode de visualisation
- Afficher le détail du calcul
- Ouvrir les données sources
- Exporter la visualisation

---

## Actions disponibles

- Changer de vue
- Actualiser
- Exporter
- Consulter le détail
- Ajouter à un tableau de bord

---

## Critères de validation

L'écran est conforme lorsque :

- les visualisations sont cohérentes avec le type de KPI ;
- les données sont fidèles aux calculs ;
- les interactions sont fluides ;
- les permissions sont respectées.


# Écran 7 — Utilisation des KPI

## Objectif

Permettre de visualiser où et comment un indicateur est utilisé dans EJ Partners afin d'assurer sa cohérence, sa maintenance et son évolution.

Cette vue facilite l'analyse d'impact avant toute modification.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations affichées

Pour chaque KPI, la plateforme affiche :

- Nombre total d'utilisations
- Première utilisation
- Dernière utilisation
- Statut
- Version

---

## Modules utilisateurs

Un KPI peut être utilisé notamment par :

- Tableaux de bord
- Reporting
- Alertes
- Workflows
- Objectifs
- Services IA
- API
- Tout autre module compatible

La liste est évolutive.

---

## Analyse d'impact

Avant toute modification, la plateforme indique :

- Les tableaux de bord concernés
- Les rapports concernés
- Les Workflows concernés
- Les alertes concernées
- Les Services IA concernés
- Les API concernées

---

## Historique d'utilisation

La plateforme conserve notamment :

- Date d'utilisation
- Module appelant
- Utilisateur (selon les droits)
- Version utilisée
- Résultat du calcul

---

## Actions disponibles

- Consulter les utilisations
- Ouvrir le module concerné
- Filtrer l'historique
- Exporter les informations

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les utilisations sont recensées ;
- l'analyse d'impact est fiable ;
- les liens vers les modules fonctionnent ;
- les permissions sont respectées.


# Écran 8 — Historique et versionnement des KPI

## Objectif

Permettre de suivre les évolutions des indicateurs et de garantir une traçabilité complète de leurs modifications.

L'historique permet de comprendre l'évolution des KPI dans le temps et de sécuriser leur utilisation.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations historisées

Pour chaque modification, la plateforme conserve notamment :

- Date et heure
- Auteur
- KPI concerné
- Nature de la modification
- Ancienne valeur
- Nouvelle valeur
- Commentaire de modification (optionnel)

---

## Éléments historisés

Le moteur historise notamment :

- Création d'un KPI
- Modification de la définition
- Modification de la formule
- Changement de seuil
- Changement d'objectif
- Activation
- Désactivation
- Publication d'une nouvelle version

---

## Versionnement

Chaque évolution importante peut entraîner la création d'une nouvelle version.

La plateforme conserve :

- Version active
- Historique des versions
- Date de mise en service
- Motif du changement

---

## Comparaison

L'utilisateur peut comparer deux versions afin de visualiser :

- Les modifications de définition
- Les changements de formule
- Les seuils modifiés
- Les impacts potentiels

---

## Restauration

Selon les droits accordés, il est possible de :

- Restaurer une ancienne version
- Créer une nouvelle version à partir d'une ancienne
- Désigner une version comme version active

Toutes les opérations sont historisées.

---

## Actions disponibles

- Consulter l'historique
- Comparer deux versions
- Restaurer une version
- Publier une nouvelle version
- Exporter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les modifications sont historisées ;
- les versions sont correctement gérées ;
- les comparaisons sont fiables ;
- les permissions sont respectées.


# Écran 9 — Vue 360° des Indicateurs & KPI

## Objectif

Offrir une vision globale de l'ensemble des indicateurs utilisés dans EJ Partners afin de faciliter leur administration, leur gouvernance et leur exploitation.

Cette vue constitue le tableau de bord du moteur des KPI.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Résumé

La vue affiche notamment :

- Nombre total de KPI
- KPI système
- KPI du cabinet
- KPI actifs
- KPI désactivés
- Dernier KPI créé
- Dernière modification

---

## Activité récente

Présentation des dernières opérations :

- Dernier KPI créé
- Dernière modification
- Dernière publication
- Dernière désactivation
- Dernière restauration

---

## Alertes

La plateforme peut afficher :

- KPI en erreur
- KPI jamais utilisés
- KPI obsolètes
- KPI utilisés avec une ancienne version
- KPI dont le calcul a échoué

---

## Santé du moteur

Le tableau de bord présente notamment :

- Nombre de calculs réalisés
- Temps moyen de calcul
- Taux de réussite
- Dernier calcul exécuté
- Nombre d'erreurs détectées

---

## Utilisation

La plateforme présente notamment :

- Les KPI les plus utilisés
- Les Dashboards les plus consommateurs
- Les Reportings les plus consommateurs
- Les KPI les plus partagés
- Les KPI les plus personnalisés

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Créer un KPI
- Rechercher un KPI
- Consulter la bibliothèque
- Accéder aux statistiques
- Consulter les dépendances
- Gérer les versions

---

## Critères de validation

L'écran est conforme lorsque :

- les informations essentielles sont disponibles sur un seul écran ;
- les alertes sont pertinentes ;
- les actions rapides sont accessibles ;
- les liens avec les autres modules fonctionnent.


