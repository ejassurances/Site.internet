# 218_SPEC_TABLEAUX_BORD

## Objet

Le module Tableaux de Bord permet de visualiser, piloter et analyser l'activité du cabinet grâce à des tableaux de bord personnalisables.

Les tableaux de bord regroupent des indicateurs provenant de l'ensemble des modules d'EJ Partners.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

# Écran 1 — Accueil / Tableau de bord

## Objectif

Permettre à chaque utilisateur d'accéder à un tableau de bord adapté à son rôle, regroupant les informations essentielles à son activité.

Le tableau de bord constitue la page d'accueil d'EJ Partners.

---

## Dépendances

Ce module utilise :

- Tous les modules métier
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations affichées

Le tableau de bord peut afficher notamment :

- Activités à réaliser
- Agenda du jour
- Notifications importantes
- Messages à traiter
- Opportunités en cours
- Projets actifs
- Contrats à échéance
- Indicateurs personnalisés

Les informations affichées dépendent du profil utilisateur.

---

## Widgets

Le tableau de bord est composé de Widgets.

Chaque Widget représente une information ou un indicateur.

Exemples :

- Mon agenda
- Mes activités
- Derniers clients
- Dernières signatures
- Notifications
- Pipeline commercial
- Chiffre d'affaires
- Alertes conformité

---

## Navigation

L'utilisateur peut :

- Ouvrir un Widget
- Réorganiser les Widgets
- Masquer un Widget
- Ajouter un Widget (selon les droits)

---

## Actions disponibles

- Ouvrir un module
- Personnaliser le tableau de bord
- Actualiser les données
- Accéder aux paramètres

---

## Critères de validation

L'écran est conforme lorsque :

- les Widgets sont correctement affichés ;
- les données sont à jour ;
- la personnalisation est prise en compte ;
- les permissions sont respectées.


# Écran 2 — Gestion des Widgets

## Objectif

Permettre de gérer les Widgets disponibles dans les tableaux de bord et de personnaliser leur affichage selon les besoins de chaque utilisateur.

Les Widgets constituent les briques élémentaires des tableaux de bord.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations affichées

Pour chaque Widget, la plateforme affiche :

- Nom
- Description
- Catégorie
- Module d'origine
- Statut
- Taille par défaut
- Dernière mise à jour

---

## Catégories

Les Widgets peuvent appartenir notamment aux catégories suivantes :

- Commercial
- Clients
- Contrats
- Activités
- Agenda
- Messagerie
- Notifications
- Conformité
- Reporting
- Services IA

La liste est évolutive.

---

## Paramètres

Chaque Widget peut définir :

- Taille minimale
- Taille maximale
- Position par défaut
- Fréquence d'actualisation
- Paramètres de configuration

---

## Personnalisation

Selon les droits, l'utilisateur peut :

- Ajouter un Widget
- Retirer un Widget
- Déplacer un Widget
- Redimensionner un Widget
- Réinitialiser la disposition

---

## Actions disponibles

- Ajouter
- Modifier
- Masquer
- Déplacer
- Redimensionner
- Réinitialiser

---

## Critères de validation

L'écran est conforme lorsque :

- les Widgets sont correctement configurés ;
- la personnalisation est enregistrée ;
- les mises à jour sont prises en compte ;
- les permissions sont respectées.

# Écran 3 — Personnalisation des tableaux de bord

## Objectif

Permettre à chaque utilisateur de personnaliser son ou ses tableaux de bord afin d'adapter l'affichage à ses besoins et à son mode de travail.

La personnalisation est propre à chaque utilisateur, sauf lorsqu'un tableau de bord est partagé.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Éléments personnalisables

L'utilisateur peut personnaliser notamment :

- Les Widgets affichés
- Leur ordre
- Leur taille
- Leur position
- Leur fréquence d'actualisation
- Les filtres appliqués
- Les couleurs (si autorisées)

---

## Dispositions

Un utilisateur peut disposer de plusieurs tableaux de bord.

Exemples :

- Accueil
- Commercial
- Conformité
- Direction
- Personnel

Chaque disposition est enregistrée indépendamment.

---

## Modèles

Le cabinet peut proposer des tableaux de bord prédéfinis selon les rôles :

- Conseiller
- Gestionnaire
- Responsable
- Direction
- Administrateur

L'utilisateur peut partir d'un modèle puis le personnaliser selon ses droits.

---

## Sauvegarde

La plateforme enregistre automatiquement :

- Les modifications de disposition
- Les préférences d'affichage
- Les paramètres des Widgets

---

## Actions disponibles

- Créer un tableau de bord
- Renommer
- Dupliquer
- Définir comme tableau de bord par défaut
- Restaurer le modèle d'origine
- Supprimer (selon les droits)

---

## Critères de validation

L'écran est conforme lorsque :

- les personnalisations sont conservées ;
- les modèles sont disponibles ;
- les dispositions peuvent être restaurées ;
- les permissions sont respectées.


# Écran 4 — Création d'un tableau de bord

## Objectif

Permettre à un utilisateur autorisé de créer un nouveau tableau de bord adapté à un besoin spécifique.

Le tableau de bord est constitué d'un ensemble de Widgets configurables.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

Lors de la création, l'utilisateur renseigne :

- Nom
- Description
- Catégorie
- Type (Système, Cabinet ou Personnel)
- Icône (optionnelle)
- Couleur (optionnelle)

---

## Configuration

L'utilisateur peut définir :

- La disposition (layout)
- Les Widgets à afficher
- Les filtres par défaut
- Le comportement à l'ouverture
- Les règles d'actualisation

---

## Visibilité

Selon les droits, le tableau de bord peut être :

- Personnel
- Partagé avec une équipe
- Partagé avec un rôle
- Disponible pour tout le cabinet

---

## Modèle de départ

Le tableau de bord peut être créé :

- À partir d'un tableau vide
- À partir d'un modèle système
- À partir d'un tableau de bord existant
- Par duplication d'un tableau de bord personnel ou du cabinet

---

## Validation

Avant la création, la plateforme vérifie notamment :

- L'unicité du nom (dans le périmètre concerné)
- Les droits de création
- La disponibilité des Widgets sélectionnés

---

## Actions disponibles

- Créer
- Enregistrer comme brouillon
- Prévisualiser
- Dupliquer un modèle
- Annuler

---

## Critères de validation

L'écran est conforme lorsque :

- le tableau de bord est correctement créé ;
- les Widgets sont correctement associés ;
- les droits sont respectés ;
- les paramètres sont enregistrés.


# Écran 5 — Configuration des Widgets

## Objectif

Permettre de configurer individuellement chaque Widget afin d'adapter son contenu, son comportement et son affichage aux besoins de l'utilisateur.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Paramètres généraux

Chaque Widget peut définir notamment :

- Titre personnalisé
- Description (optionnelle)
- Taille
- Position
- Couleur (si autorisée)
- Icône (si applicable)

---

## Paramètres métier

Selon le Widget, l'utilisateur peut définir :

- Les filtres appliqués
- La période analysée
- Les utilisateurs concernés
- Les équipes concernées
- Les objets métier affichés
- Le nombre d'éléments à afficher

---

## Actualisation

Le Widget peut être configuré pour :

- Actualisation automatique
- Actualisation manuelle
- Actualisation à l'ouverture du tableau de bord
- Fréquence d'actualisation

---

## Affichage

Le Widget peut proposer différents modes :

- Liste
- Cartes
- Tableau
- Graphique
- Indicateur (KPI)
- Calendrier
- Chronologie

Selon ses capacités.

---

## Prévisualisation

Avant validation, l'utilisateur peut visualiser le rendu du Widget avec les paramètres sélectionnés.

---

## Actions disponibles

- Modifier les paramètres
- Prévisualiser
- Restaurer les paramètres par défaut
- Dupliquer la configuration
- Supprimer le Widget du tableau de bord

---

## Critères de validation

L'écran est conforme lorsque :

- les paramètres sont enregistrés ;
- la prévisualisation est fidèle ;
- les filtres sont correctement appliqués ;
- les permissions sont respectées.



# Écran 6 — Partage des tableaux de bord

## Objectif

Permettre de partager un tableau de bord avec d'autres utilisateurs tout en respectant les règles de sécurité et de confidentialité du cabinet.

Le partage facilite l'harmonisation des pratiques et la diffusion des indicateurs.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- Gestion des utilisateurs
- Gestion des équipes
- Gestion des rôles

---

## Destinataires

Un tableau de bord peut être partagé avec :

- Un utilisateur
- Une équipe
- Un rôle
- L'ensemble du cabinet

Selon les droits accordés.

---

## Droits de partage

Pour chaque destinataire, il est possible de définir :

- Consultation uniquement
- Personnalisation autorisée
- Duplication autorisée
- Modification autorisée
- Administration

---

## Comportement

Le propriétaire peut choisir :

- Partager une copie indépendante
- Partager un tableau de bord commun
- Publier une version de référence

---

## Synchronisation

Pour les tableaux de bord partagés, la plateforme peut définir :

- Mise à jour automatique
- Mise à jour manuelle
- Héritage des modifications
- Rupture de l'héritage

---

## Historique

Toutes les opérations de partage sont historisées :

- Date
- Auteur
- Destinataire
- Niveau de droits
- Modifications éventuelles

---

## Actions disponibles

- Partager
- Modifier les droits
- Retirer un partage
- Publier une nouvelle version
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- les droits sont correctement appliqués ;
- les partages sont historisés ;
- les mises à jour suivent les règles définies ;
- les permissions sont respectées.


# Écran 7 — Actualisation des tableaux de bord

## Objectif

Permettre de contrôler la mise à jour des données affichées dans les tableaux de bord afin de garantir des informations fiables tout en préservant les performances de la plateforme.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Modes d'actualisation

Chaque tableau de bord ou Widget peut être configuré pour :

- Actualisation manuelle
- Actualisation automatique
- Actualisation à l'ouverture
- Actualisation programmée
- Actualisation déclenchée par un événement

---

## Paramètres

L'utilisateur ou le cabinet peut définir :

- La fréquence d'actualisation
- Les Widgets concernés
- Les priorités d'actualisation
- Les heures autorisées (si applicable)

---

## Optimisation

La plateforme optimise automatiquement :

- Les requêtes identiques
- Les données déjà en cache
- Les actualisations simultanées
- Les Widgets non visibles

---

## Indicateurs

Chaque Widget peut afficher :

- La date de dernière actualisation
- Le statut de l'actualisation
- Les éventuelles erreurs
- Le temps de chargement

---

## Actions disponibles

- Actualiser un Widget
- Actualiser tout le tableau de bord
- Suspendre l'actualisation automatique
- Consulter l'historique des actualisations

---

## Critères de validation

L'écran est conforme lorsque :

- les données sont correctement mises à jour ;
- les performances restent satisfaisantes ;
- les erreurs sont signalées ;
- les permissions sont respectées.


# Écran 8 — Historique des tableaux de bord

## Objectif

Permettre de consulter l'historique des modifications apportées aux tableaux de bord et à leurs Widgets afin de garantir la traçabilité et de faciliter les restaurations.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations historisées

Pour chaque opération, la plateforme conserve notamment :

- Date et heure
- Auteur
- Tableau de bord concerné
- Widget concerné (si applicable)
- Nature de la modification
- Ancienne valeur
- Nouvelle valeur

---

## Opérations historisées

La plateforme historise notamment :

- Création d'un tableau de bord
- Modification
- Suppression
- Duplication
- Partage
- Changement de disposition
- Ajout d'un Widget
- Suppression d'un Widget
- Modification d'un Widget
- Publication d'une nouvelle version

---

## Consultation

L'utilisateur peut consulter :

- Les modifications d'un tableau de bord
- Les modifications d'un Widget
- Les modifications réalisées par un utilisateur
- Les modifications sur une période donnée

---

## Comparaison

La plateforme permet de comparer :

- Deux versions d'un tableau de bord
- Deux configurations de Widgets

Les différences sont clairement mises en évidence.

---

## Restauration

Selon les droits accordés, il est possible de :

- Restaurer une version précédente
- Restaurer uniquement un Widget
- Annuler une modification récente

Toutes les restaurations sont historisées.

---

## Actions disponibles

- Consulter l'historique
- Comparer deux versions
- Restaurer
- Exporter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les modifications sont historisées ;
- les comparaisons sont fiables ;
- les restaurations fonctionnent ;
- les permissions sont respectées.

# Écran 9 — Statistiques des Tableaux de Bord

## Objectif

Permettre d'analyser l'utilisation des tableaux de bord afin d'améliorer leur pertinence, leur ergonomie et leur efficacité.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Indicateurs

La plateforme affiche notamment :

- Nombre total de tableaux de bord
- Tableaux de bord système
- Tableaux de bord du cabinet
- Tableaux de bord personnels
- Nombre total de Widgets
- Nombre moyen de Widgets par tableau de bord
- Nombre de tableaux de bord partagés

---

## Analyse

Les statistiques peuvent être présentées par :

- Période
- Utilisateur (selon les droits)
- Équipe
- Rôle
- Type de tableau de bord

---

## Indicateurs de qualité

La plateforme peut identifier :

- Les tableaux de bord les plus consultés
- Les Widgets les plus utilisés
- Les Widgets jamais utilisés
- Les tableaux de bord obsolètes
- Les temps moyens de chargement

---

## Tableaux de bord

La plateforme peut afficher :

- Répartition des tableaux de bord par type
- Répartition des Widgets par catégorie
- Évolution du nombre de tableaux de bord
- Évolution de l'utilisation des Widgets
- Historique des publications

---

## Actions disponibles

- Filtrer les statistiques
- Exporter les données
- Ouvrir un tableau de bord
- Consulter le détail d'un Widget

---

## Critères de validation

L'écran est conforme lorsque :

- les statistiques sont fiables ;
- les indicateurs sont actualisés ;
- les filtres fonctionnent ;
- les permissions sont respectées.


# Écran 10 — Vue 360° des Tableaux de Bord

## Objectif

Offrir une vision complète de l'ensemble des tableaux de bord disponibles dans EJ Partners afin de faciliter leur administration, leur personnalisation et leur évolution.

Cette vue constitue le point de pilotage du moteur de Tableaux de Bord.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Résumé

La vue affiche notamment :

- Nombre total de tableaux de bord
- Tableaux de bord système
- Tableaux de bord du cabinet
- Tableaux de bord personnels
- Nombre total de Widgets
- Dernière publication
- Dernière modification

---

## Activité récente

Présentation des dernières opérations :

- Dernier tableau de bord créé
- Dernière modification
- Dernier partage
- Dernière publication
- Dernière restauration

---

## Alertes

La plateforme peut afficher :

- Tableaux de bord obsolètes
- Widgets indisponibles
- Widgets en erreur
- Tableaux de bord jamais consultés
- Temps de chargement anormal
- Erreurs d'actualisation

---

## Santé du moteur

Le tableau de bord présente notamment :

- Nombre de Widgets disponibles
- Nombre de Widgets actifs
- Temps moyen de chargement
- Dernière actualisation globale
- Nombre d'erreurs détectées

---

## Utilisation

La plateforme présente notamment :

- Les tableaux de bord les plus utilisés
- Les Widgets les plus utilisés
- Les Widgets les plus personnalisés
- Les tableaux de bord les plus partagés

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Créer un tableau de bord
- Ajouter un Widget
- Consulter les modèles
- Gérer les partages
- Accéder aux statistiques
- Restaurer une version précédente

---

## Critères de validation

L'écran est conforme lorsque :

- les informations essentielles sont disponibles sur un seul écran ;
- les alertes sont clairement identifiées ;
- les actions rapides sont accessibles ;
- les liens avec les autres modules fonctionnent.
