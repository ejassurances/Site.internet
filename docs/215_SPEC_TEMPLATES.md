# 215_SPEC_TEMPLATES

## Objet

Le module Templates permet de créer, gérer et réutiliser des modèles de contenu dans l'ensemble de la plateforme EJ Partners.

Un Template est un modèle réutilisable pouvant être utilisé par différents modules afin d'assurer la cohérence, le gain de temps et la standardisation des communications et des documents.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md


# Écran 1 — Bibliothèque des Templates

## Objectif

Permettre de consulter, rechercher et gérer l'ensemble des modèles disponibles dans EJ Partners.

La bibliothèque constitue le point d'entrée unique de tous les Templates.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations affichées

Chaque Template affiche :

- Nom
- Type
- Catégorie
- Statut
- Version
- Auteur
- Date de création
- Dernière modification

---

## Types de Templates

La plateforme peut gérer notamment :

- Email
- SMS
- Notification
- Document
- Courrier
- Prompt IA
- Check-list
- Message interne

La liste est administrable.

---

## Navigation

L'utilisateur peut :

- Rechercher un Template
- Filtrer par type
- Filtrer par catégorie
- Trier les résultats

---

## Actions disponibles

- Ouvrir
- Créer
- Modifier
- Dupliquer
- Archiver

---

## Critères de validation

L'écran est conforme lorsque :

- tous les Templates sont centralisés ;
- les filtres fonctionnent ;
- les permissions sont respectées ;
- les informations sont à jour.


# Écran 2 — Fiche Template

## Objectif

Permettre de consulter, créer et modifier un Template utilisé dans la plateforme.

La fiche Template centralise toutes les informations nécessaires à son utilisation.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

La fiche affiche :

- Nom
- Type
- Catégorie
- Description
- Statut
- Version
- Auteur
- Date de création
- Dernière modification

---

## Contenu

Selon le type de Template, la fiche peut contenir :

- Objet (pour les emails, notifications, courriers...)
- Corps du contenu
- Mise en forme
- Variables dynamiques
- Pièces jointes par défaut (si autorisées)

---

## Utilisation

Le Template peut être utilisé par :

- Messagerie
- Documents
- Notifications
- Workflows
- Services IA
- Tout autre module compatible

La liste est évolutive.

---

## Versionnement

Chaque modification importante peut entraîner la création d'une nouvelle version.

La plateforme conserve :

- Version active
- Historique des versions
- Date de mise en service

---

## Actions disponibles

- Modifier
- Dupliquer
- Activer
- Désactiver
- Prévisualiser
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations sont centralisées ;
- le contenu est modifiable ;
- le versionnement est disponible ;
- les permissions sont respectées.


# Écran 3 — Variables dynamiques

## Objectif

Permettre d'utiliser des variables dynamiques dans les Templates afin de personnaliser automatiquement le contenu selon le contexte métier.

Les variables sont remplacées lors de la génération du document, du message ou de la notification.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Sources de données

Les variables peuvent provenir notamment de :

- Cabinet
- Utilisateur
- Client
- Prospect
- Opportunité
- Projet
- Contrat
- Produit
- Partenaire
- Activité
- Agenda
- Document
- Workflow

La liste est évolutive.

---

## Types de variables

Le moteur prend en charge notamment :

- Texte
- Nombre
- Date
- Heure
- Devise
- Booléen
- Liste
- Adresse
- Téléphone
- Email

---

## Insertion

L'utilisateur peut :

- Rechercher une variable
- Insérer une variable
- Consulter sa description
- Prévisualiser son résultat

---

## Validation

Avant l'utilisation, la plateforme vérifie :

- L'existence de la variable
- Les droits d'accès
- La compatibilité avec le contexte
- Le format attendu

---

## Actions disponibles

- Rechercher une variable
- Insérer
- Prévisualiser
- Copier le nom de la variable
- Consulter la documentation

---

## Critères de validation

L'écran est conforme lorsque :

- les variables sont correctement insérées ;
- les contrôles sont réalisés ;
- les prévisualisations fonctionnent ;
- les permissions sont respectées.
Les variables disponibles sont définies et administrées dans le module dédié « Moteur de Variables Dynamiques ».

# Écran 4 — Catégories de Templates

## Objectif

Permettre de classer les Templates afin d'en faciliter l'organisation, la recherche et la maintenance.

Les catégories sont communes à l'ensemble de la plateforme.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Catégories

Le cabinet peut créer des catégories telles que :

- Commercial
- Assurance
- Crédit
- Patrimoine
- Conformité
- Administratif
- RH
- Marketing
- IA
- Interne

La liste est entièrement administrable.

---

## Informations affichées

Pour chaque catégorie :

- Nom
- Description
- Nombre de Templates
- Statut
- Responsable (optionnel)

---

## Organisation

Une catégorie peut contenir :

- Des sous-catégories
- Des règles d'utilisation
- Des modèles par défaut

---

## Actions disponibles

- Créer une catégorie
- Modifier
- Désactiver
- Fusionner deux catégories
- Consulter les Templates associés

---

## Critères de validation

L'écran est conforme lorsque :

- les catégories sont correctement organisées ;
- les recherches fonctionnent ;
- les Templates sont correctement rattachés ;
- les permissions sont respectées.

# Écran 5 — Versionnement des Templates

## Objectif

Permettre de suivre les différentes versions d'un Template tout en garantissant la traçabilité des modifications.

Le versionnement permet de conserver l'historique sans perdre les anciennes versions.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations affichées

Pour chaque version :

- Numéro de version
- Nom du Template
- Auteur de la modification
- Date de création
- Statut
- Commentaire de version

---

## Statuts

Une version peut être :

- Brouillon
- En validation
- Active
- Archivée
- Obsolète

---

## Historique

Pour chaque version, la plateforme conserve :

- Le contenu complet
- Les variables utilisées
- Les modifications réalisées
- Le motif de la modification
- L'auteur

---

## Comparaison

L'utilisateur peut :

- Comparer deux versions
- Identifier les différences
- Consulter les modifications

---

## Restauration

Selon les droits accordés, l'utilisateur peut :

- Restaurer une ancienne version
- Créer une nouvelle version à partir d'une ancienne
- Désigner une version comme version active

Les anciennes versions restent historisées.

---

## Actions disponibles

- Créer une nouvelle version
- Consulter une version
- Comparer deux versions
- Restaurer une version
- Archiver une version

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les versions sont historisées ;
- les comparaisons fonctionnent ;
- la version active est clairement identifiable ;
- les permissions sont respectées.
- 



# Écran 6 — Prévisualisation des Templates

## Objectif

Permettre à l'utilisateur de visualiser le rendu final d'un Template avant son utilisation.

La prévisualisation remplace les variables dynamiques par des données de test ou des données réelles selon le contexte.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 216_SPEC_MOTEUR_VARIABLES.md

---

## Modes de prévisualisation

La plateforme permet :

- Prévisualisation avec des données fictives
- Prévisualisation avec un Client existant
- Prévisualisation avec un Projet existant
- Prévisualisation avec un Contrat existant
- Prévisualisation avec tout autre objet compatible

---

## Contenu affiché

La prévisualisation présente :

- Le rendu final
- Les variables remplacées
- Les variables non résolues (si présentes)
- Les éventuels avertissements

---

## Contrôles

Avant validation, la plateforme vérifie :

- Les variables obligatoires
- Les erreurs de syntaxe
- Les droits d'accès aux données
- Les éventuelles incompatibilités

---

## Export

Selon le type de Template, l'utilisateur peut :

- Télécharger un aperçu
- Imprimer
- Envoyer un email de test
- Générer un document de test

---

## Actions disponibles

- Prévisualiser
- Changer le contexte de test
- Actualiser
- Corriger le Template
- Générer un aperçu

---

## Critères de validation

L'écran est conforme lorsque :

- le rendu est fidèle au résultat final ;
- les variables sont correctement remplacées ;
- les erreurs sont clairement signalées ;
- les permissions sont respectées.


# Écran 7 — Utilisation des Templates

## Objectif

Permettre de visualiser où et comment un Template est utilisé dans EJ Partners.

Cette vue facilite la maintenance, l'analyse d'impact et la réutilisation des Templates.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations affichées

Pour chaque Template, la plateforme affiche :

- Nombre total d'utilisations
- Première utilisation
- Dernière utilisation
- Version utilisée
- Statut

---

## Modules utilisateurs

Un Template peut être utilisé par :

- Messagerie
- Documents
- Notifications
- Workflows
- Services IA
- Rapports
- Tout autre module compatible

---

## Analyse d'impact

Avant toute modification, la plateforme indique :

- Les modules concernés
- Les Workflows concernés
- Les automatisations concernées
- Les utilisateurs concernés (si applicable)

---

## Historique d'utilisation

La plateforme conserve :

- Date d'utilisation
- Module appelant
- Objet métier concerné
- Version utilisée
- Résultat de la génération

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


# Écran 8 — Validation et publication des Templates

## Objectif

Permettre de contrôler le cycle de vie des Templates avant leur mise à disposition des utilisateurs.

La validation garantit que seuls des Templates conformes et approuvés sont utilisés dans la plateforme.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Cycle de vie

Un Template peut passer par les états suivants :

- Brouillon
- En cours de validation
- Validé
- Publié
- Archivé
- Obsolète

---

## Validation

Selon les règles du cabinet, un Template peut nécessiter :

- Une validation fonctionnelle
- Une validation métier
- Une validation conformité
- Une validation de la Direction

Le processus est entièrement paramétrable.

---

## Contrôles avant publication

Avant de publier un Template, la plateforme vérifie notamment :

- La validité des variables
- Les erreurs de syntaxe
- La présence des champs obligatoires
- La compatibilité avec le type de Template
- L'absence d'erreurs bloquantes

---

## Publication

Lors de la publication, la plateforme :

- Active la nouvelle version
- Archive l'ancienne version si nécessaire
- Historise l'opération
- Informe les modules utilisant le Template

---

## Historique

La plateforme conserve :

- Date de validation
- Validateur
- Date de publication
- Auteur de la publication
- Commentaires éventuels

---

## Actions disponibles

- Soumettre à validation
- Valider
- Refuser
- Publier
- Dépublier
- Archiver

---

## Critères de validation

L'écran est conforme lorsque :

- le cycle de validation est respecté ;
- seuls les Templates publiés sont utilisables ;
- toutes les actions sont historisées ;
- les permissions sont respectées.


# Écran 9 — Statistiques des Templates

## Objectif

Permettre d'analyser l'utilisation des Templates afin d'améliorer leur qualité, leur pertinence et leur réutilisation dans EJ Partners.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Indicateurs

La plateforme affiche notamment :

- Nombre total de Templates
- Nombre de Templates actifs
- Nombre de Templates archivés
- Nombre de Versions
- Nombre d'utilisations
- Dernière utilisation
- Dernière modification

---

## Analyse

Les statistiques peuvent être présentées par :

- Période
- Type de Template
- Catégorie
- Module utilisateur
- Auteur
- Statut

---

## Indicateurs de qualité

La plateforme peut identifier notamment :

- Les Templates les plus utilisés
- Les Templates jamais utilisés
- Les Templates obsolètes
- Les Templates en attente de validation
- Les Variables non résolues les plus fréquentes

---

## Tableaux de bord

La plateforme peut afficher :

- Répartition des Templates par type
- Répartition par catégorie
- Évolution du nombre de Templates
- Utilisation par module
- Historique des publications

---

## Actions disponibles

- Filtrer les statistiques
- Exporter les données
- Ouvrir un Template
- Consulter les détails d'utilisation

---

## Critères de validation

L'écran est conforme lorsque :

- les statistiques sont fiables ;
- les indicateurs sont mis à jour ;
- les filtres fonctionnent ;
- les permissions sont respectées.


# Écran 10 — Vue 360° des Templates

## Objectif

Offrir une vision complète de la bibliothèque de Templates afin de faciliter leur gestion, leur maintenance et leur utilisation dans l'ensemble de la plateforme.

Cette vue constitue le tableau de bord du moteur de Templates.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Résumé

La vue affiche notamment :

- Nombre total de Templates
- Nombre de Templates actifs
- Nombre de Brouillons
- Nombre de Templates en validation
- Nombre de Versions publiées
- Dernière publication

---

## Activité récente

Présentation des dernières opérations :

- Dernier Template créé
- Dernière modification
- Dernière publication
- Dernière validation

---

## Alertes

La plateforme peut afficher :

- Templates en attente de validation
- Variables non reconnues
- Templates jamais utilisés
- Templates obsolètes
- Erreurs de génération

---

## Utilisation

La plateforme présente notamment :

- Les Templates les plus utilisés
- Les Modules les plus consommateurs
- Les dernières générations réalisées
- Les impacts des dernières modifications

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Créer un Template
- Rechercher un Template
- Prévisualiser un Template
- Consulter les versions
- Accéder aux Variables Dynamiques
- Consulter les statistiques

---

## Critères de validation

L'écran est conforme lorsque :

- les informations essentielles sont accessibles depuis un seul écran ;
- les alertes sont clairement identifiées ;
- les actions rapides sont disponibles ;
- les liens avec les autres modules fonctionnent.
