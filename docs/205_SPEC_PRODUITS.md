# 205_SPEC_PRODUITS

## Objet

Le module Produits permet de gérer l'ensemble des solutions commercialisées ou étudiées par le cabinet.

Un Produit représente une offre commerciale.

Il peut être proposé dans plusieurs Projets et distribué par un ou plusieurs Partenaires.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

# Écran 1 — Catalogue des Produits

## Objectif

Permettre de consulter, rechercher et gérer l'ensemble des Produits disponibles.

---

## Dépendances

Ce module utilise :

- Statuts
- Recherche globale
- Vues / Filtres / Tris
- Permissions
- Actions standard
- Historique métier

---

## Informations affichées

Chaque ligne affiche :

- Nom du Produit
- Catégorie
- Partenaire
- Statut
- Version
- Date de création
- Dernière mise à jour

---

## Actions disponibles

- Ouvrir le Produit
- Créer un Produit
- Modifier
- Archiver
- Exporter
- Ajouter aux favoris

---

## Filtres

- Catégorie
- Partenaire
- Statut
- Compagnie
- Tags

---

## Critères de validation

L'écran est conforme lorsque :

- les Produits sont facilement recherchables ;
- les filtres fonctionnent ;
- les permissions sont respectées ;
- les informations sont à jour.

# Écran 2 — Fiche Produit

## Objectif

Permettre de consulter et de gérer toutes les informations d'un Produit.

La fiche Produit constitue la référence unique de l'offre commerciale.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

La fiche affiche :

- Nom du Produit
- Référence interne
- Catégorie
- Sous-catégorie
- Statut
- Version
- Partenaire principal
- Date de création
- Dernière mise à jour

---

## Description

Le Produit comporte :

- Description courte
- Description détaillée
- Public cible
- Objectifs du Produit

---

## Liens

Depuis la fiche Produit, l'utilisateur accède directement à :

- Partenaires
- Projets utilisant ce Produit
- Contrats issus de ce Produit
- Documents associés
- Historique

---

## Actions disponibles

- Modifier
- Archiver
- Dupliquer
- Ajouter aux favoris
- Exporter

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations sont centralisées ;
- les liens vers les autres modules fonctionnent ;
- les modifications sont historisées ;
- les permissions sont respectées.


# Écran 3 — Caractéristiques du Produit

## Objectif

Décrire les caractéristiques techniques et commerciales du Produit.

Ces informations permettent au conseiller de comparer les différentes offres.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Caractéristiques générales

Le Produit peut comporter :

- Type de Produit
- Domaine d'assurance
- Public concerné
- Niveau de gamme
- Date de commercialisation
- Date de fin de commercialisation (si applicable)

---

## Garanties

Le Produit permet de renseigner :

- Garanties principales
- Garanties optionnelles
- Exclusions principales
- Franchises
- Plafonds
- Délais de carence (si applicable)

---

## Conditions

Le Produit peut préciser :

- Conditions d'éligibilité
- Limites d'âge
- Conditions médicales (si applicable)
- Conditions professionnelles
- Conditions géographiques

---

## Informations commerciales

Le Produit peut comporter :

- Mode de tarification
- Commission (si autorisé)
- Documents commerciaux associés
- Arguments commerciaux

---

## Actions disponibles

- Modifier
- Ajouter une garantie
- Ajouter une exclusion
- Ajouter une condition
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- les caractéristiques sont complètes ;
- les garanties sont clairement identifiées ;
- les conditions sont renseignées ;
- les modifications sont historisées.


# Écran 4 — Partenaires distributeurs

## Objectif

Associer un ou plusieurs partenaires à un Produit.

Un même Produit peut être distribué par plusieurs partenaires selon les accords du cabinet.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Liste des partenaires

Pour chaque partenaire :

- Nom
- Type (Compagnie, Grossiste, Banque, etc.)
- Statut
- Date de début de partenariat
- Date de fin (si applicable)

---

## Informations spécifiques

Pour chaque partenaire, il est possible de renseigner :

- Référence produit chez le partenaire
- Code produit
- Convention applicable
- Conditions particulières
- Contact commercial
- Documents associés

---

## Disponibilité

Le produit peut être marqué :

- Disponible
- Temporairement indisponible
- Retiré du catalogue

Cette information est propre à chaque partenaire.

---

## Actions disponibles

- Associer un partenaire
- Modifier les informations
- Désactiver un partenaire
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- plusieurs partenaires peuvent être associés au même Produit ;
- chaque partenaire possède ses propres informations ;
- les modifications sont historisées ;
- les permissions sont respectées.


# Écran 5 — Documents du Produit

## Objectif

Centraliser tous les documents liés à un Produit afin que le conseiller dispose des informations nécessaires lors de l'étude et de la commercialisation.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Types de documents

Le Produit peut comporter :

- Notice d'information
- Conditions générales
- Conditions particulières
- Fiche produit
- Fiche IPID
- DIPA (si applicable)
- Documents commerciaux
- Guide de souscription
- Barèmes
- FAQ
- Autres documents

---

## Informations affichées

Pour chaque document :

- Nom
- Type
- Version
- Partenaire
- Date de publication
- Statut (Actif / Archivé)

---

## Gestion des versions

La plateforme conserve :

- La version en vigueur
- Les anciennes versions
- La date de mise en application
- La date de fin de validité (si applicable)

---

## Actions disponibles

- Ajouter un document
- Modifier
- Télécharger
- Prévisualiser
- Archiver
- Consulter l'historique

---

## Vérifications

La plateforme peut signaler :

- Document obligatoire manquant
- Document expiré
- Nouvelle version disponible

---

## Critères de validation

L'écran est conforme lorsque :

- les documents sont classés par type ;
- les versions sont conservées ;
- les documents sont accessibles rapidement ;
- les modifications sont historisées.

# Écran 6 — Critères d'éligibilité

## Objectif

Définir les conditions permettant de déterminer si un Client est éligible à un Produit.

Ces critères assistent le conseiller dans son analyse avant toute préconisation.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Critères d'éligibilité

Le Produit peut définir un ou plusieurs critères :

- Âge minimum
- Âge maximum
- Profession
- Statut professionnel
- Revenu minimum (si applicable)
- Situation familiale
- Pays de résidence
- Conditions médicales (si applicable)
- Conditions financières
- Autres critères spécifiques

---

## Critères obligatoires

Chaque critère peut être marqué comme :

- Obligatoire
- Recommandé
- Facultatif

---

## Vérification automatique

Lorsqu'un Produit est ajouté à un Projet, la plateforme compare automatiquement les critères du Produit avec les informations du Client.

Le résultat peut être :

- ✅ Conforme
- 🟡 À vérifier
- ❌ Non conforme

---

## Justification

Le conseiller peut ajouter un commentaire lorsqu'il décide de proposer un Produit malgré une alerte.

Toutes les décisions sont historisées.

---

## Actions disponibles

- Ajouter un critère
- Modifier
- Désactiver
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- les critères sont configurables ;
- la vérification automatique fonctionne ;
- les alertes sont visibles ;
- les décisions sont historisées.

# Écran 6 — Critères d'éligibilité

## Objectif

Définir les conditions permettant de déterminer si un Client est éligible à un Produit.

Ces critères assistent le conseiller dans son analyse avant toute préconisation.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Critères d'éligibilité

Le Produit peut définir un ou plusieurs critères :

- Âge minimum
- Âge maximum
- Profession
- Statut professionnel
- Revenu minimum (si applicable)
- Situation familiale
- Pays de résidence
- Conditions médicales (si applicable)
- Conditions financières
- Autres critères spécifiques

---

## Critères obligatoires

Chaque critère peut être marqué comme :

- Obligatoire
- Recommandé
- Facultatif

---

## Vérification automatique

Lorsqu'un Produit est ajouté à un Projet, la plateforme compare automatiquement les critères du Produit avec les informations du Client.

Le résultat peut être :

- ✅ Conforme
- 🟡 À vérifier
- ❌ Non conforme

---

## Justification

Le conseiller peut ajouter un commentaire lorsqu'il décide de proposer un Produit malgré une alerte.

Toutes les décisions sont historisées.

---

## Actions disponibles

- Ajouter un critère
- Modifier
- Désactiver
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- les critères sont configurables ;
- la vérification automatique fonctionne ;
- les alertes sont visibles ;
- les décisions sont historisées.

# Écran 7 — Comparaison des Produits

## Objectif

Permettre au conseiller de comparer plusieurs Produits afin de sélectionner la solution la plus adaptée aux besoins du Client.

La comparaison constitue une aide au devoir de conseil.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Sélection des Produits

Le conseiller peut comparer plusieurs Produits simultanément.

Chaque Produit affiche :

- Nom
- Partenaire
- Version
- Statut

---

## Critères de comparaison

La comparaison peut porter sur :

- Garanties
- Options
- Exclusions
- Franchises
- Conditions d'éligibilité
- Délais de carence
- Public concerné
- Niveau de couverture
- Documents disponibles

Les critères sont adaptables selon la catégorie du Produit.

---

## Résultat de la comparaison

Pour chaque critère, la plateforme indique :

- Les points communs
- Les différences
- Les avantages
- Les limites

---

## Sélection

À l'issue de la comparaison, le conseiller peut :

- Sélectionner un Produit
- Écarter un Produit
- Ajouter un commentaire

Ces informations pourront être réutilisées dans la préconisation.

---

## Actions disponibles

- Ajouter un Produit à la comparaison
- Retirer un Produit
- Exporter le comparatif
- Générer un document de comparaison

---

## Critères de validation

L'écran est conforme lorsque :

- plusieurs Produits peuvent être comparés ;
- les différences sont clairement visibles ;
- le comparatif est exportable ;
- les décisions sont historisées.

# Écran 8 — Cycle de vie du Produit

## Objectif

Suivre l'évolution d'un Produit tout au long de son existence dans la plateforme.

Le cycle de vie permet de savoir si un Produit peut encore être proposé aux Clients.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## États possibles

Le Produit peut être dans l'un des états suivants :

- En préparation
- Disponible
- Temporairement suspendu
- Retiré de la commercialisation
- Archivé

---

## Informations affichées

Pour chaque changement d'état :

- Ancien état
- Nouvel état
- Date
- Auteur
- Motif
- Commentaire (optionnel)

---

## Vérifications

Avant de retirer un Produit, la plateforme vérifie :

- S'il est utilisé dans des Projets en cours
- S'il est utilisé dans des Contrats actifs
- S'il existe une version plus récente

Des alertes sont affichées si nécessaire.

---

## Historique

Tous les changements d'état sont historisés.

La plateforme conserve :

- Date
- Auteur
- Motif
- Ancien état
- Nouvel état

---

## Actions disponibles

- Changer l'état
- Archiver
- Restaurer
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- le cycle de vie est respecté ;
- les changements sont historisés ;
- les contrôles sont réalisés avant chaque changement ;
- les permissions sont respectées.

# Écran 9 — Statistiques du Produit

## Objectif

Permettre d'analyser les performances d'un Produit afin d'aider le cabinet dans ses décisions commerciales.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Indicateurs

La plateforme affiche notamment :

- Nombre de Projets utilisant le Produit
- Nombre de Contrats issus du Produit
- Taux de transformation
- Nombre de refus
- Nombre d'abandons
- Nombre de résiliations (si applicable)

---

## Analyse

La plateforme présente :

- Évolution dans le temps
- Répartition par conseiller
- Répartition par partenaire
- Répartition par type de Client

---

## Comparaison

Le Produit peut être comparé avec les autres Produits de la même catégorie.

Exemples :

- Nombre de ventes
- Taux de transformation
- Taux d'abandon
- Utilisation par les conseillers

---

## Alertes

La plateforme peut signaler :

- Produit peu utilisé
- Produit sans contrat depuis longtemps
- Forte augmentation des refus
- Forte augmentation des résiliations

---

## Actions disponibles

- Filtrer les statistiques
- Exporter les données
- Ouvrir les Projets concernés
- Ouvrir les Contrats concernés

---

## Critères de validation

L'écran est conforme lorsque :

- les statistiques sont fiables ;
- les données sont filtrables ;
- les indicateurs sont actualisés ;
- les permissions sont respectées.


# Écran 10 — Utilisation du Produit

## Objectif

Permettre de visualiser où et comment un Produit est utilisé dans la plateforme.

Cet écran offre une vision complète de l'utilisation du Produit.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Projets

Liste des Projets utilisant ce Produit.

Pour chaque Projet :

- Numéro
- Client
- Statut
- Conseiller
- Date de création

Accès direct à la fiche Projet.

---

## Contrats

Liste des Contrats issus de ce Produit.

Pour chaque Contrat :

- Numéro
- Client
- Partenaire
- Statut
- Date d'effet
- Date d'échéance

Accès direct à la fiche Contrat.

---

## Conseillers

La plateforme affiche :

- Les conseillers utilisant le Produit
- Le nombre de Projets par conseiller
- Le nombre de Contrats par conseiller

---

## Historique d'utilisation

Affichage de :

- Première utilisation
- Dernière utilisation
- Nombre total d'utilisations
- Dernière mise à jour

---

## Actions disponibles

- Ouvrir un Projet
- Ouvrir un Contrat
- Exporter la liste
- Filtrer les résultats

---

## Critères de validation

L'écran est conforme lorsque :

- tous les Projets utilisant le Produit sont accessibles ;
- tous les Contrats associés sont consultables ;
- les statistiques sont cohérentes ;
- les permissions sont respectées.
