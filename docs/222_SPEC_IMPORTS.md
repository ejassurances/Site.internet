# 222_SPEC_IMPORTS

## Objet

Le module Imports permet d'intégrer des données provenant de sources externes dans EJ Partners de manière sécurisée, contrôlée et traçable.

Le moteur d'Imports est mutualisé et réutilisable par l'ensemble des modules de la plateforme.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

# Écran 1 — Bibliothèque des imports

## Objectif

Permettre de consulter, rechercher et administrer les modèles d'import disponibles dans EJ Partners.

La bibliothèque constitue le point d'entrée du moteur d'Imports.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations affichées

Pour chaque modèle d'import, la plateforme affiche :

- Nom
- Description
- Catégorie
- Source attendue
- Format accepté
- Auteur
- Statut
- Date de création
- Dernière exécution

---

## Catégories

Les imports peuvent concerner notamment :

- Clients
- Prospects
- Contrats
- Produits
- Activités
- Documents
- Utilisateurs
- Partenaires
- Comptabilité

La liste est évolutive.

---

## Formats acceptés

Le moteur peut accepter notamment :

- CSV
- Excel (.xlsx)
- JSON
- XML
- API
- Texte délimité

La liste est évolutive.

---

## Navigation

L'utilisateur peut :

- Rechercher un modèle
- Filtrer par catégorie
- Filtrer par format
- Trier les résultats
- Consulter les favoris

---

## Actions disponibles

- Lancer un import
- Modifier (selon les droits)
- Dupliquer
- Archiver
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- tous les modèles sont centralisés ;
- les recherches fonctionnent ;
- les catégories sont cohérentes ;
- les permissions sont respectées.



# Écran 2 — Fiche Import

## Objectif

Permettre de consulter, configurer et administrer un modèle d'import dans EJ Partners.

La fiche centralise toutes les informations nécessaires à l'exécution, au contrôle et à la maintenance d'un import.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

La fiche affiche :

- Nom
- Description
- Catégorie
- Format accepté
- Source attendue
- Statut
- Version
- Auteur
- Date de création
- Dernière modification

---

## Définition

Le modèle d'import précise notamment :

- Les objets métier concernés
- Les formats acceptés
- Les colonnes attendues
- Les champs obligatoires
- Les règles de validation
- Les règles de correspondance

---

## Paramètres

Le modèle peut définir :

- Encodage attendu
- Séparateur (pour les fichiers texte)
- Format des dates
- Gestion des doublons
- Stratégie de mise à jour
- Mode d'import

---

## Utilisation

La plateforme indique où ce modèle est utilisé :

- Imports manuels
- Imports planifiés
- Workflows
- API
- Connecteurs externes

---

## Documentation

La fiche contient :

- Objectif de l'import
- Public concerné
- Structure attendue
- Exemple de fichier
- Historique des évolutions

---

## Actions disponibles

- Modifier
- Prévisualiser
- Télécharger un modèle
- Dupliquer
- Archiver
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations sont disponibles ;
- les formats sont correctement documentés ;
- les dépendances sont identifiées ;
- les permissions sont respectées.


# Écran 3 — Analyse du fichier d'import

## Objectif

Permettre d'analyser automatiquement un fichier avant toute importation afin de vérifier sa conformité et d'identifier les éventuels problèmes.

Aucune donnée n'est intégrée dans EJ Partners à cette étape.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Contrôles réalisés

Lors de l'analyse, la plateforme vérifie notamment :

- Le format du fichier
- L'encodage
- La taille du fichier
- Le séparateur (si applicable)
- Les colonnes présentes
- Les champs obligatoires
- Le nombre d'enregistrements
- La cohérence générale

---

## Détection automatique

La plateforme peut détecter automatiquement :

- Le type de fichier
- Le séparateur
- L'encodage
- La présence d'un en-tête
- Le format des dates
- Les formats numériques

---

## Résultat de l'analyse

La plateforme affiche notamment :

- Nombre de lignes analysées
- Nombre de colonnes détectées
- Nombre d'avertissements
- Nombre d'erreurs
- Niveau de confiance de l'analyse

---

## Classification

Les anomalies sont classées selon leur gravité :

- Information
- Avertissement
- Erreur bloquante

---

## Actions disponibles

- Corriger les paramètres
- Relancer l'analyse
- Télécharger le rapport d'analyse
- Passer à l'étape suivante (si autorisé)
- Annuler l'import

---

## Critères de validation

L'écran est conforme lorsque :

- le fichier est correctement analysé ;
- les anomalies sont clairement identifiées ;
- aucune donnée n'est encore importée ;
- les permissions sont respectées.


# Écran 3 — Analyse du fichier d'import

## Objectif

Permettre d'analyser automatiquement un fichier avant toute importation afin de vérifier sa conformité et d'identifier les éventuels problèmes.

Aucune donnée n'est intégrée dans EJ Partners à cette étape.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Contrôles réalisés

Lors de l'analyse, la plateforme vérifie notamment :

- Le format du fichier
- L'encodage
- La taille du fichier
- Le séparateur (si applicable)
- Les colonnes présentes
- Les champs obligatoires
- Le nombre d'enregistrements
- La cohérence générale

---

## Détection automatique

La plateforme peut détecter automatiquement :

- Le type de fichier
- Le séparateur
- L'encodage
- La présence d'un en-tête
- Le format des dates
- Les formats numériques

---

## Résultat de l'analyse

La plateforme affiche notamment :

- Nombre de lignes analysées
- Nombre de colonnes détectées
- Nombre d'avertissements
- Nombre d'erreurs
- Niveau de confiance de l'analyse

---

## Classification

Les anomalies sont classées selon leur gravité :

- Information
- Avertissement
- Erreur bloquante

---

## Actions disponibles

- Corriger les paramètres
- Relancer l'analyse
- Télécharger le rapport d'analyse
- Passer à l'étape suivante (si autorisé)
- Annuler l'import

---

## Critères de validation

L'écran est conforme lorsque :

- le fichier est correctement analysé ;
- les anomalies sont clairement identifiées ;
- aucune donnée n'est encore importée ;
- les permissions sont respectées.


# Écran 4 — Correspondance des données (Mapping)

## Objectif

Permettre d'associer les colonnes du fichier importé aux objets et variables métier d'EJ Partners.

Le Mapping garantit que les données seront intégrées au bon endroit dans le Modèle Métier.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 216_SPEC_MOTEUR_VARIABLES.md

---

## Colonnes détectées

La plateforme affiche :

- Nom de la colonne du fichier
- Type de donnée détecté
- Nombre de valeurs
- Taux de remplissage
- Exemple de valeur

---

## Correspondance

Pour chaque colonne, l'utilisateur peut définir :

- L'objet métier cible
- La variable métier correspondante
- Le caractère obligatoire ou optionnel
- Une valeur par défaut (si autorisée)

---

## Correspondance automatique

La plateforme tente automatiquement de proposer un Mapping selon :

- Le nom de la colonne
- Les synonymes connus
- Les modèles d'import précédents
- Le type de données détecté

L'utilisateur peut accepter ou modifier les propositions.

---

## Validation

Avant de poursuivre, la plateforme vérifie :

- Les champs obligatoires
- Les doublons de correspondance
- Les incompatibilités de type
- Les variables inexistantes

---

## Sauvegarde

Le Mapping peut être :

- Sauvegardé comme modèle
- Réutilisé pour de futurs imports
- Partagé avec le cabinet (selon les droits)

---

## Actions disponibles

- Associer une colonne
- Modifier une correspondance
- Ignorer une colonne
- Sauvegarder le Mapping
- Charger un Mapping existant
- Passer à l'étape suivante

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les colonnes utiles sont associées ;
- les erreurs de Mapping sont détectées ;
- les modèles sont réutilisables ;
- les permissions sont respectées.


# Écran 5 — Validation avant import

## Objectif

Permettre à l'utilisateur de valider définitivement les données avant leur intégration dans EJ Partners.

Cette étape constitue le dernier contrôle avant l'écriture dans le Modèle Métier.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- Analyse du fichier
- Mapping des données

---

## Résumé de l'import

La plateforme affiche notamment :

- Nom du modèle d'import
- Nom du fichier
- Nombre total de lignes
- Nombre de lignes valides
- Nombre d'avertissements
- Nombre d'erreurs
- Nombre de lignes ignorées

---

## Contrôles

La plateforme vérifie notamment :

- Champs obligatoires
- Cohérence des types de données
- Respect des règles métier
- Correspondances obligatoires
- Droits d'import
- Risques de doublons

---

## Simulation

Avant validation, la plateforme présente une simulation indiquant :

- Nombre de créations
- Nombre de mises à jour
- Nombre de lignes ignorées
- Nombre de conflits
- Nombre de rejets

Aucune donnée n'est encore enregistrée.

---

## Confirmation

Avant l'import, l'utilisateur doit confirmer l'opération.

Selon les paramètres du cabinet, une confirmation renforcée peut être demandée pour les imports sensibles.

---

## Journal

La plateforme prépare automatiquement un journal d'import comprenant :

- Paramètres utilisés
- Résultat de la validation
- Utilisateur
- Date
- Version du modèle d'import

---

## Actions disponibles

- Retourner au Mapping
- Corriger les paramètres
- Télécharger le rapport de validation
- Lancer l'import
- Annuler

---

## Critères de validation

L'écran est conforme lorsque :

- la simulation est fidèle ;
- les contrôles sont terminés ;
- aucune donnée n'est encore modifiée ;
- les permissions sont respectées.


# Écran 6 — Exécution de l'import

## Objectif

Permettre d'exécuter un import validé tout en assurant la traçabilité, la sécurité et la robustesse du traitement.

L'exécution applique les règles définies par le modèle d'import et les contrôles validés lors des étapes précédentes.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Déclenchement

L'import peut être exécuté :

- Manuellement
- Via une planification
- Depuis un Workflow
- Depuis un connecteur
- Via une API (si autorisée)

---

## Étapes d'exécution

Lors de l'import, la plateforme :

1. Vérifie les droits d'accès.
2. Vérifie que la validation est toujours valable.
3. Charge le fichier.
4. Applique le Mapping.
5. Applique les règles métier.
6. Crée ou met à jour les données.
7. Génère le journal d'import.
8. Notifie le résultat.

---

## Suivi

Pendant l'exécution, la plateforme affiche :

- Statut
- Progression
- Nombre de lignes traitées
- Nombre de créations
- Nombre de mises à jour
- Nombre de rejets
- Temps estimé restant

---

## Gestion des erreurs

En cas d'erreur, la plateforme indique :

- L'étape concernée
- Les lignes en erreur
- Le motif
- Les actions correctives possibles

Selon la configuration, le traitement peut :

- Continuer malgré les erreurs
- S'arrêter immédiatement
- Suspendre uniquement les lignes concernées

---

## Résultat

À la fin de l'import, la plateforme affiche :

- Nombre total de lignes traitées
- Nombre de créations
- Nombre de mises à jour
- Nombre de rejets
- Durée totale
- Lien vers le journal complet

---

## Actions disponibles

- Suivre l'import
- Annuler (si possible)
- Télécharger le journal
- Consulter les données importées
- Relancer un import

---

## Critères de validation

L'écran est conforme lorsque :

- l'import respecte les règles métier ;
- le suivi est disponible en temps réel ;
- les erreurs sont correctement gérées ;
- toutes les opérations sont historisées.

# Écran 7 — Historique des imports

## Objectif

Permettre de consulter l'ensemble des imports réalisés afin d'assurer leur traçabilité, leur auditabilité et leur réutilisation.

Chaque import constitue une opération historisée indépendante.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations affichées

Pour chaque import, la plateforme affiche :

- Nom du modèle d'import
- Version du modèle
- Nom du fichier importé
- Date et heure d'exécution
- Auteur ou déclencheur
- Type d'import (manuel, planifié, Workflow, API)
- Statut
- Durée d'exécution

---

## Résultat

Pour chaque import, la plateforme conserve notamment :

- Nombre de lignes analysées
- Nombre de créations
- Nombre de mises à jour
- Nombre de lignes ignorées
- Nombre de rejets
- Nombre d'erreurs
- Nombre d'avertissements

---

## Consultation

L'utilisateur peut consulter :

- Le journal complet
- Les paramètres utilisés
- Le Mapping appliqué
- Les erreurs rencontrées
- Les lignes placées en quarantaine
- Les notifications générées

---

## Recherche

L'historique peut être filtré notamment par :

- Modèle d'import
- Période
- Auteur
- Statut
- Source
- Type d'import

---

## Actions disponibles

- Consulter le détail
- Télécharger le journal
- Télécharger le rapport d'erreurs
- Relancer l'import
- Réimporter uniquement les lignes rejetées
- Archiver

---

## Critères de validation

L'écran est conforme lorsque :

- tous les imports sont historisés ;
- les recherches fonctionnent ;
- les journaux sont disponibles ;
- les permissions sont respectées.

# Écran 8 — Statistiques des imports

## Objectif

Permettre d'analyser l'utilisation du moteur d'Imports afin d'améliorer la qualité des données, les performances et les modèles d'import.

Les statistiques portent sur les modèles, les exécutions et la qualité des données importées.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Indicateurs

La plateforme affiche notamment :

- Nombre total de modèles d'import
- Nombre total d'imports exécutés
- Nombre d'imports planifiés
- Temps moyen d'exécution
- Volume moyen de données importées
- Taux de réussite
- Taux de rejet

---

## Analyse

Les statistiques peuvent être présentées par :

- Période
- Utilisateur (selon les droits)
- Équipe
- Source de données
- Format du fichier
- Type d'import

---

## Qualité des données

La plateforme peut identifier :

- Les erreurs les plus fréquentes
- Les colonnes les plus problématiques
- Les champs souvent absents
- Les doublons détectés
- Les lignes mises en quarantaine
- Les modèles nécessitant le plus de corrections

---

## Performances

La plateforme affiche notamment :

- Temps moyen d'analyse
- Temps moyen de Mapping
- Temps moyen d'import
- Nombre moyen de lignes traitées
- Débit moyen (lignes/seconde)

---

## Actions disponibles

- Filtrer les statistiques
- Exporter les statistiques
- Ouvrir un modèle d'import
- Consulter un historique d'import
- Identifier les anomalies récurrentes

---

## Critères de validation

L'écran est conforme lorsque :

- les statistiques sont fiables ;
- les indicateurs sont à jour ;
- les filtres fonctionnent ;
- les permissions sont respectées.


# Écran 9 — Vue 360° des Imports

## Objectif

Offrir une vision globale du moteur d'Imports afin de superviser son utilisation, la qualité des données importées, les performances et les éventuelles anomalies.

Cette vue constitue le tableau de bord d'administration du moteur d'Imports.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Résumé

La vue affiche notamment :

- Nombre total de modèles d'import
- Modèles actifs
- Imports exécutés aujourd'hui
- Imports planifiés
- Dernier import exécuté
- Dernière modification
- Dernière analyse réalisée

---

## Activité récente

Présentation des dernières opérations :

- Dernier import lancé
- Dernier import terminé
- Dernière planification exécutée
- Dernier Mapping créé
- Dernière mise en quarantaine
- Dernière erreur détectée

---

## Alertes

La plateforme peut afficher :

- Imports en erreur
- Planifications échouées
- Modèles d'import obsolètes
- Sources externes indisponibles
- Augmentation du taux de rejet
- Volume anormal de lignes rejetées
- Mappings devenus incompatibles

---

## Santé du moteur

Le tableau de bord présente notamment :

- Nombre total d'imports
- Taux de réussite
- Temps moyen d'import
- Nombre de lignes importées
- Nombre de lignes rejetées
- Nombre de lignes en quarantaine
- Dernière exécution réussie

---

## Qualité des données

La plateforme présente notamment :

- Les sources les plus fiables
- Les sources les plus problématiques
- Les erreurs les plus fréquentes
- Les champs les plus souvent corrigés
- Les modèles nécessitant le plus d'interventions

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Lancer un import
- Consulter les imports en cours
- Ouvrir la zone de quarantaine
- Gérer les modèles
- Consulter les statistiques
- Accéder aux journaux d'import

---

## Critères de validation

L'écran est conforme lorsque :

- les informations essentielles sont disponibles sur un seul écran ;
- les alertes sont clairement identifiées ;
- les actions rapides sont accessibles ;
- les liens avec les autres modules fonctionnent.

