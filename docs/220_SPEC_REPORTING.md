# 220_SPEC_REPORTING

## Objet

Le module Reporting permet de concevoir, générer, consulter et diffuser des rapports à partir des données disponibles dans EJ Partners.

Les Reportings s'appuient sur le Modèle Métier, les KPI et les droits d'accès afin de garantir des analyses fiables, cohérentes et sécurisées.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 219_SPEC_INDICATEURS_KPI.md

# Écran 1 — Bibliothèque des rapports

## Objectif

Permettre de consulter, rechercher et gérer l'ensemble des rapports disponibles dans EJ Partners.

La bibliothèque constitue le point d'entrée unique des Reportings.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 219_SPEC_INDICATEURS_KPI.md

---

## Informations affichées

Pour chaque rapport, la plateforme affiche :

- Nom
- Description
- Catégorie
- Auteur
- Statut
- Date de création
- Dernière génération
- Dernière modification

---

## Catégories

Les rapports peuvent notamment être classés par :

- Commercial
- Clients
- Contrats
- Activités
- Agenda
- Conformité
- Financier
- Productivité
- Direction

La liste est évolutive.

---

## Navigation

L'utilisateur peut :

- Rechercher un rapport
- Filtrer par catégorie
- Filtrer par auteur
- Trier les résultats
- Consulter les favoris

---

## Actions disponibles

- Ouvrir
- Générer
- Modifier (selon les droits)
- Dupliquer
- Archiver

---

## Critères de validation

L'écran est conforme lorsque :

- tous les rapports sont centralisés ;
- les recherches fonctionnent ;
- les catégories sont correctement utilisées ;
- les permissions sont respectées.



# Écran 2 — Fiche Rapport

## Objectif

Permettre de consulter, configurer et administrer un rapport dans EJ Partners.

La fiche centralise toutes les informations nécessaires à la génération, au partage et à l'exploitation d'un rapport.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 219_SPEC_INDICATEURS_KPI.md

---

## Informations générales

La fiche affiche :

- Nom
- Description
- Catégorie
- Statut
- Auteur
- Version
- Date de création
- Dernière modification

---

## Contenu

Le rapport peut contenir :

- Des KPI
- Des tableaux
- Des graphiques
- Des indicateurs de tendance
- Des commentaires
- Des sections de texte
- Des annexes

Les éléments sont organisés en sections configurables.

---

## Paramètres

Le rapport peut définir :

- La période d'analyse
- Les filtres par défaut
- Les sources de données utilisées
- Les options d'affichage
- Les formats de sortie compatibles

---

## Utilisation

La plateforme indique où le rapport est utilisé :

- Reporting manuel
- Reporting planifié
- Tableau de bord
- Workflow
- Service IA
- API
- Export

---

## Documentation

La fiche contient notamment :

- Objectif du rapport
- Public concerné
- Description des KPI utilisés
- Historique des évolutions

---

## Actions disponibles

- Générer
- Modifier
- Dupliquer
- Prévisualiser
- Archiver
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations sont disponibles ;
- les dépendances sont identifiées ;
- la documentation est accessible ;
- les permissions sont respectées.


# Écran 3 — Conception d'un rapport

## Objectif

Permettre de créer un rapport en assemblant des sections, des KPI, des visualisations et des éléments de mise en forme.

Le rapport est construit à partir de composants réutilisables afin de faciliter sa maintenance et son évolution.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 219_SPEC_INDICATEURS_KPI.md

---

## Composition

Un rapport peut contenir notamment :

- Titre
- Sous-titre
- Sections
- Paragraphes
- KPI
- Tableaux
- Graphiques
- Images
- Commentaires
- Annexes

---

## Organisation

Les éléments sont organisés selon une structure hiérarchique.

Exemple :

- Rapport
  - Section
    - Sous-section
      - Élément

---

## Paramètres

Chaque élément peut définir :

- Titre
- Ordre d'affichage
- Visibilité
- Conditions d'affichage
- Style
- Source des données

---

## Mise en page

Le rapport peut être présenté selon différents formats :

- Portrait
- Paysage
- Une ou plusieurs colonnes
- Pagination automatique
- En-tête
- Pied de page

---

## Prévisualisation

L'utilisateur peut consulter le rendu complet du rapport avant sa génération.

---

## Actions disponibles

- Ajouter une section
- Déplacer une section
- Supprimer une section
- Prévisualiser
- Enregistrer comme modèle

---

## Critères de validation

L'écran est conforme lorsque :

- la structure du rapport est cohérente ;
- les sections sont correctement organisées ;
- la prévisualisation est fidèle ;
- les permissions sont respectées.


# Écran 4 — Sources de données du rapport

## Objectif

Permettre de définir les sources de données utilisées par un rapport afin de garantir la cohérence, la traçabilité et la fiabilité des informations présentées.

Les rapports s'appuient exclusivement sur le Modèle Métier d'EJ Partners.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 219_SPEC_INDICATEURS_KPI.md

---

## Sources disponibles

Un rapport peut utiliser notamment :

- Clients
- Prospects
- Opportunités
- Projets
- Contrats
- Produits
- Activités
- Agenda
- Documents
- Partenaires
- Utilisateurs
- KPI
- Journal d'audit

La liste est évolutive.

---

## Paramètres

Pour chaque source, il est possible de définir :

- Les filtres
- Les périodes
- Les exclusions
- Les regroupements
- Les critères de tri

---

## Dépendances

Le rapport peut utiliser :

- Une ou plusieurs sources
- Un ou plusieurs KPI
- Des sections réutilisables
- Des vues métier

Toutes les dépendances sont documentées automatiquement.

---

## Validation

Avant la génération, la plateforme vérifie :

- L'existence des sources
- Les droits d'accès
- La cohérence des filtres
- La disponibilité des KPI

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
- les contrôles sont réalisés ;
- les dépendances sont documentées ;
- les permissions sont respectées.

# Écran 5 — Paramètres de génération

## Objectif

Permettre de définir les paramètres appliqués lors de la génération d'un rapport afin d'adapter son contenu au contexte demandé.

Les paramètres sont appliqués au moment de la génération sans modifier la définition du rapport.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 219_SPEC_INDICATEURS_KPI.md

---

## Paramètres disponibles

Selon le rapport, l'utilisateur peut définir notamment :

- Période d'analyse
- Cabinet
- Équipe
- Utilisateur
- Responsable
- Client
- Prospect
- Projet
- Contrat
- Produit
- Compagnie
- Statut
- Tags

La liste est évolutive.

---

## Valeurs par défaut

Le rapport peut proposer :

- Des valeurs par défaut
- Les derniers paramètres utilisés
- Des paramètres imposés
- Des paramètres obligatoires

---

## Validation

Avant la génération, la plateforme vérifie :

- Les paramètres obligatoires
- La cohérence des valeurs
- Les droits d'accès
- Les éventuelles incompatibilités

---

## Prévisualisation

L'utilisateur peut :

- Visualiser les paramètres sélectionnés
- Modifier les critères
- Estimer le volume de données à traiter

---

## Mémorisation

Selon les préférences de l'utilisateur, la plateforme peut :

- Mémoriser les derniers paramètres utilisés
- Enregistrer des jeux de paramètres favoris
- Réinitialiser les paramètres par défaut

---

## Actions disponibles

- Modifier les paramètres
- Enregistrer un jeu de paramètres
- Charger un jeu de paramètres
- Réinitialiser
- Générer le rapport

---

## Critères de validation

L'écran est conforme lorsque :

- les paramètres sont correctement appliqués ;
- les contrôles sont effectués ;
- les favoris fonctionnent ;
- les permissions sont respectées.


# Écran 5 — Paramètres de génération

## Objectif

Permettre de définir les paramètres appliqués lors de la génération d'un rapport afin d'adapter son contenu au contexte demandé.

Les paramètres sont appliqués au moment de la génération sans modifier la définition du rapport.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 219_SPEC_INDICATEURS_KPI.md

---

## Paramètres disponibles

Selon le rapport, l'utilisateur peut définir notamment :

- Période d'analyse
- Cabinet
- Équipe
- Utilisateur
- Responsable
- Client
- Prospect
- Projet
- Contrat
- Produit
- Compagnie
- Statut
- Tags

La liste est évolutive.

---

## Valeurs par défaut

Le rapport peut proposer :

- Des valeurs par défaut
- Les derniers paramètres utilisés
- Des paramètres imposés
- Des paramètres obligatoires

---

## Validation

Avant la génération, la plateforme vérifie :

- Les paramètres obligatoires
- La cohérence des valeurs
- Les droits d'accès
- Les éventuelles incompatibilités

---

## Prévisualisation

L'utilisateur peut :

- Visualiser les paramètres sélectionnés
- Modifier les critères
- Estimer le volume de données à traiter

---

## Mémorisation

Selon les préférences de l'utilisateur, la plateforme peut :

- Mémoriser les derniers paramètres utilisés
- Enregistrer des jeux de paramètres favoris
- Réinitialiser les paramètres par défaut

---

## Actions disponibles

- Modifier les paramètres
- Enregistrer un jeu de paramètres
- Charger un jeu de paramètres
- Réinitialiser
- Générer le rapport

---

## Critères de validation

L'écran est conforme lorsque :

- les paramètres sont correctement appliqués ;
- les contrôles sont effectués ;
- les favoris fonctionnent ;
- les permissions sont respectées.


# Écran 6 — Génération des rapports

## Objectif

Permettre de générer un rapport à partir de sa définition et des paramètres sélectionnés.

La génération produit un instantané des données disponibles au moment de l'exécution.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 219_SPEC_INDICATEURS_KPI.md

---

## Déclenchement

Un rapport peut être généré :

- Manuellement
- Selon une planification
- Depuis un Workflow
- Suite à un événement
- Via l'API (si autorisée)

---

## Étapes de génération

Lors de la génération, la plateforme :

1. Vérifie les droits d'accès.
2. Valide les paramètres.
3. Charge les sources de données.
4. Récupère les KPI nécessaires.
5. Génère les visualisations.
6. Assemble le rapport.
7. Produit le résultat final.

---

## Suivi

Pendant la génération, la plateforme indique :

- Statut
- Progression
- Temps estimé
- Éventuelles erreurs
- Date de génération

---

## Résultat

À l'issue de la génération, le rapport peut être :

- Consulté dans EJ Partners
- Enregistré dans l'historique
- Mis à disposition pour export
- Transmis à un autre module

---

## Gestion des erreurs

En cas d'échec, la plateforme précise notamment :

- L'étape concernée
- Le motif de l'erreur
- Les actions correctives possibles

---

## Actions disponibles

- Générer
- Annuler
- Relancer
- Consulter l'historique
- Ouvrir le rapport généré

---

## Critères de validation

L'écran est conforme lorsque :

- la génération respecte les paramètres sélectionnés ;
- les erreurs sont clairement identifiées ;
- les rapports générés sont historisés ;
- les permissions sont respectées.


# Écran 6 — Génération des rapports

## Objectif

Permettre de générer un rapport à partir de sa définition et des paramètres sélectionnés.

La génération produit un instantané des données disponibles au moment de l'exécution.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 219_SPEC_INDICATEURS_KPI.md

---

## Déclenchement

Un rapport peut être généré :

- Manuellement
- Selon une planification
- Depuis un Workflow
- Suite à un événement
- Via l'API (si autorisée)

---

## Étapes de génération

Lors de la génération, la plateforme :

1. Vérifie les droits d'accès.
2. Valide les paramètres.
3. Charge les sources de données.
4. Récupère les KPI nécessaires.
5. Génère les visualisations.
6. Assemble le rapport.
7. Produit le résultat final.

---

## Suivi

Pendant la génération, la plateforme indique :

- Statut
- Progression
- Temps estimé
- Éventuelles erreurs
- Date de génération

---

## Résultat

À l'issue de la génération, le rapport peut être :

- Consulté dans EJ Partners
- Enregistré dans l'historique
- Mis à disposition pour export
- Transmis à un autre module

---

## Gestion des erreurs

En cas d'échec, la plateforme précise notamment :

- L'étape concernée
- Le motif de l'erreur
- Les actions correctives possibles

---

## Actions disponibles

- Générer
- Annuler
- Relancer
- Consulter l'historique
- Ouvrir le rapport généré

---

## Critères de validation

L'écran est conforme lorsque :

- la génération respecte les paramètres sélectionnés ;
- les erreurs sont clairement identifiées ;
- les rapports générés sont historisés ;
- les permissions sont respectées.


# Écran 7 — Planification des rapports

## Objectif

Permettre de planifier la génération automatique des rapports afin de diffuser les bonnes informations aux bonnes personnes, au bon moment.

La planification automatise la production des reportings récurrents.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 219_SPEC_INDICATEURS_KPI.md

---

## Types de planification

Un rapport peut être généré selon :

- Une date précise
- Une heure précise
- Une fréquence récurrente
- Un événement métier
- Un Workflow
- Une demande externe (API)

---

## Fréquences disponibles

La plateforme prend notamment en charge :

- Toutes les heures
- Quotidien
- Hebdomadaire
- Mensuel
- Trimestriel
- Annuel
- Planning personnalisé

---

## Paramètres

Chaque planification peut définir :

- Les paramètres du rapport
- Le fuseau horaire
- Les destinataires
- Le mode de diffusion
- La durée de conservation des générations

---

## Gestion

Pour chaque planification, la plateforme affiche :

- Statut
- Dernière exécution
- Prochaine exécution
- Dernier résultat
- Historique des exécutions

---

## Contrôles

Avant chaque génération automatique, la plateforme vérifie :

- Les droits d'accès
- La disponibilité des sources
- Les paramètres obligatoires
- Les éventuelles erreurs bloquantes

---

## Actions disponibles

- Créer une planification
- Modifier
- Suspendre
- Réactiver
- Supprimer
- Exécuter immédiatement
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- les planifications sont correctement exécutées ;
- les historiques sont conservés ;
- les erreurs sont signalées ;
- les permissions sont respectées.


# Écran 8 — Historique des rapports générés

## Objectif

Permettre de consulter l'ensemble des rapports déjà générés afin d'assurer leur traçabilité, leur consultation et leur réutilisation.

Chaque génération constitue un instantané indépendant des données au moment de son exécution.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 219_SPEC_INDICATEURS_KPI.md

---

## Informations affichées

Pour chaque rapport généré, la plateforme affiche :

- Nom du rapport
- Version du rapport
- Date et heure de génération
- Auteur ou déclencheur
- Type de génération (manuelle, planifiée, Workflow, API)
- Statut
- Durée de génération

---

## Conservation

Selon les règles du cabinet, chaque génération peut être :

- Conservée
- Archivée
- Supprimée automatiquement après une durée définie
- Conservée définitivement (si obligatoire)

Les règles de conservation sont paramétrables.

---

## Consultation

L'utilisateur peut :

- Ouvrir un rapport généré
- Consulter ses paramètres
- Voir les données utilisées
- Télécharger le rapport (selon les droits)
- Consulter les journaux d'exécution

---

## Recherche

L'historique peut être filtré notamment par :

- Rapport
- Période
- Auteur
- Statut
- Mode de génération
- Version du rapport

---

## Actions disponibles

- Ouvrir
- Télécharger
- Régénérer avec les mêmes paramètres
- Comparer deux générations
- Archiver
- Supprimer (selon les droits)

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les générations sont historisées ;
- les recherches fonctionnent ;
- les règles de conservation sont respectées ;
- les permissions sont appliquées.


# Écran 9 — Vue 360° des Reportings

## Objectif

Offrir une vision globale de l'ensemble des rapports disponibles, générés et planifiés dans EJ Partners afin de faciliter leur administration, leur supervision et leur évolution.

Cette vue constitue le tableau de bord du moteur de Reporting.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 219_SPEC_INDICATEURS_KPI.md

---

## Résumé

La vue affiche notamment :

- Nombre total de rapports
- Rapports actifs
- Rapports archivés
- Rapports planifiés
- Dernier rapport créé
- Dernière génération réalisée
- Dernière modification

---

## Activité récente

Présentation des dernières opérations :

- Dernier rapport créé
- Dernière génération
- Dernière planification créée
- Dernière modification
- Dernière erreur de génération

---

## Alertes

La plateforme peut afficher :

- Rapport en erreur
- Planification échouée
- Rapport jamais généré
- Rapport obsolète
- Rapport utilisant un KPI obsolète
- Rapport utilisant une ancienne version d'un KPI

---

## Santé du moteur

Le tableau de bord présente notamment :

- Nombre total de générations
- Temps moyen de génération
- Taux de réussite
- Dernière génération exécutée
- Nombre d'erreurs détectées

---

## Utilisation

La plateforme présente notamment :

- Les rapports les plus générés
- Les rapports les plus consultés
- Les rapports les plus partagés
- Les KPI les plus utilisés dans les rapports

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Créer un rapport
- Générer un rapport
- Accéder aux planifications
- Consulter l'historique
- Gérer les modèles
- Consulter les statistiques

---

## Critères de validation

L'écran est conforme lorsque :

- les informations essentielles sont disponibles sur un seul écran ;
- les alertes sont pertinentes ;
- les actions rapides sont accessibles ;
- les liens avec les autres modules fonctionnent.


