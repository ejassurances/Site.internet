# 211_SPEC_WORKFLOWS

## Objet

Le module Workflows permet d'automatiser les processus métier de la plateforme.

Un Workflow est une suite d'actions déclenchées automatiquement ou manuellement selon des règles définies par le cabinet.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

# Écran 1 — Liste des Workflows

## Objectif

Permettre de consulter, rechercher et gérer l'ensemble des Workflows de la plateforme.

---

## Dépendances

Ce module utilise :

- Statuts
- Recherche globale
- Vues / Filtres / Tris
- Permissions
- Historique métier

---

## Informations affichées

Chaque ligne affiche :

- Nom du Workflow
- Catégorie
- Déclencheur
- Statut
- Version
- Date de création
- Dernière modification

---

## Actions disponibles

- Ouvrir
- Créer
- Modifier
- Activer
- Désactiver
- Dupliquer
- Archiver

---

## Filtres

- Catégorie
- Statut
- Déclencheur
- Auteur
- Version

---

## Critères de validation

L'écran est conforme lorsque :

- les Workflows sont facilement retrouvables ;
- les filtres fonctionnent ;
- les permissions sont respectées ;
- les informations sont à jour.



# Écran 2 — Fiche Workflow

## Objectif

Permettre de consulter et de configurer un Workflow.

La fiche Workflow centralise toutes les informations nécessaires à son fonctionnement.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

La fiche affiche :

- Nom du Workflow
- Description
- Catégorie
- Statut
- Version
- Auteur
- Date de création
- Dernière modification

---

## Résumé

La fiche présente :

- Déclencheur
- Nombre de conditions
- Nombre d'actions
- Nombre d'exécutions
- Dernière exécution
- Dernière erreur (si applicable)

---

## Accès rapide

Depuis la fiche, l'utilisateur accède directement à :

- Déclencheurs
- Conditions
- Actions
- Historique des exécutions
- Journal des erreurs

---

## Actions disponibles

- Modifier
- Activer
- Désactiver
- Dupliquer
- Tester
- Archiver

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations sont centralisées ;
- les liens vers les différents éléments fonctionnent ;
- les modifications sont historisées ;
- les permissions sont respectées.


# Écran 3 — Déclencheurs (Triggers)

## Objectif

Définir l'événement qui déclenche automatiquement l'exécution d'un Workflow.

Un Workflow possède au minimum un déclencheur.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Types de déclencheurs

Un Workflow peut être déclenché par :

- Création d'un objet
- Modification d'un objet
- Changement de statut
- Changement d'étape
- Date ou échéance
- Action utilisateur
- Réception d'un document
- Signature d'un document
- Exécution planifiée
- Appel API
- Événement provenant d'un service externe

La liste est administrable.

---

## Objet concerné

Le déclencheur peut être lié à :

- Client
- Opportunité
- Projet
- Recueil des besoins
- Produit
- Contrat
- Document
- Partenaire
- Activité
- Tout autre objet métier

---

## Paramètres

Le déclencheur peut être configuré avec :

- Date
- Heure
- Fréquence
- Délai
- Utilisateur
- Cabinet
- Autres paramètres spécifiques

---

## Vérifications

La plateforme vérifie :

- que le déclencheur est valide ;
- qu'il est compatible avec le Workflow ;
- qu'il ne crée pas de conflit connu.

---

## Actions disponibles

- Ajouter un déclencheur
- Modifier
- Désactiver
- Tester
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- un déclencheur est défini ;
- les paramètres sont correctement configurés ;
- les tests sont possibles ;
- les modifications sont historisées.

# Écran 4 — Conditions du Workflow

## Objectif

Définir les conditions qui doivent être remplies pour qu'un Workflow puisse s'exécuter.

Les conditions permettent de limiter l'exécution aux cas souhaités.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Types de conditions

Le Workflow peut utiliser des conditions sur :

- Le type d'objet
- Le statut
- L'étape
- Une valeur d'un champ
- Une date
- Un utilisateur
- Un rôle
- Un cabinet
- Une réponse du recueil des besoins
- Un résultat d'un contrôle

La liste est évolutive.

---

## Opérateurs

Les conditions peuvent utiliser :

- Est égal à
- Est différent de
- Contient
- Ne contient pas
- Est vide
- N'est pas vide
- Supérieur à
- Inférieur à
- Entre deux valeurs

---

## Combinaison

Les conditions peuvent être combinées avec :

- ET
- OU

Des groupes de conditions peuvent être créés.

---

## Résultat

Le Workflow s'exécute uniquement si les conditions sont remplies.

Sinon, il s'arrête sans effectuer d'action.

---

## Vérifications

La plateforme vérifie :

- la validité des conditions ;
- les conflits éventuels ;
- les références aux champs existants.

---

## Actions disponibles

- Ajouter une condition
- Modifier
- Supprimer
- Tester
- Consulter le résultat

---

## Critères de validation

L'écran est conforme lorsque :

- les conditions sont configurables ;
- les opérateurs fonctionnent correctement ;
- les groupes de conditions sont pris en charge ;
- les tests sont possibles.



# Écran 5 — Actions du Workflow

## Objectif

Définir les actions exécutées automatiquement lorsque les conditions du Workflow sont remplies.

Un Workflow peut contenir une ou plusieurs actions exécutées dans un ordre défini.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Types d'actions

Le Workflow peut notamment :

- Créer un objet
- Modifier un objet
- Changer un statut
- Changer une étape
- Créer une activité
- Envoyer un email
- Envoyer une notification
- Générer un document
- Demander une signature
- Affecter un utilisateur
- Ajouter un commentaire
- Lancer un autre Workflow
- Appeler une API

La liste est évolutive.

---

## Paramètres

Chaque action peut être configurée avec :

- Objet concerné
- Valeurs à appliquer
- Destinataire
- Date d'exécution
- Priorité
- Commentaires

---

## Ordre d'exécution

Les actions sont exécutées dans l'ordre défini par le Workflow.

En cas d'erreur, le comportement (arrêt ou poursuite) est défini dans les paramètres du Workflow.

---

## Vérifications

Avant l'exécution, la plateforme vérifie :

- que les données nécessaires sont disponibles ;
- que l'utilisateur possède les droits requis ;
- que les paramètres sont valides.

---

## Actions disponibles

- Ajouter une action
- Modifier
- Déplacer dans l'ordre
- Désactiver une action
- Tester
- Supprimer

---

## Critères de validation

L'écran est conforme lorsque :

- plusieurs actions peuvent être configurées ;
- l'ordre d'exécution est respecté ;
- les paramètres sont correctement appliqués ;
- les tests sont possibles.


# Écran 6 — Tests et simulation

## Objectif

Permettre de tester un Workflow avant sa mise en production.

Les tests permettent de vérifier le comportement du Workflow sans modifier les données réelles.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Modes de test

Le Workflow peut être exécuté :

- En simulation
- Sur un jeu de données de test
- Sur un objet existant (sans enregistrer les modifications)

---

## Résultat de la simulation

À la fin du test, la plateforme affiche :

- Déclencheur utilisé
- Conditions évaluées
- Actions exécutées
- Actions ignorées
- Durée d'exécution
- Résultat global

---

## Erreurs

En cas d'erreur, la plateforme indique :

- L'action concernée
- La cause de l'erreur
- La règle concernée
- Une proposition de correction (si disponible)

---

## Journal d'exécution

Chaque simulation conserve :

- Date
- Utilisateur
- Workflow testé
- Résultat
- Durée

---

## Actions disponibles

- Lancer une simulation
- Consulter les résultats
- Corriger le Workflow
- Relancer un test
- Exporter le rapport

---

## Critères de validation

L'écran est conforme lorsque :

- les tests n'impactent jamais les données réelles ;
- les erreurs sont clairement expliquées ;
- les résultats sont détaillés ;
- les simulations sont historisées.

# Écran 7 — Historique des exécutions

## Objectif

Conserver la trace de toutes les exécutions des Workflows afin de garantir leur suivi, leur traçabilité et leur audit.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Exécutions

Pour chaque exécution, la plateforme affiche :

- Date et heure
- Workflow exécuté
- Déclencheur
- Objet concerné
- Utilisateur (si applicable)
- Durée d'exécution
- Résultat

---

## Résultat

Une exécution peut être :

- Réussie
- Réussie avec avertissements
- Échouée
- Annulée

---

## Détail

Pour chaque exécution, il est possible de consulter :

- Les conditions évaluées
- Les actions exécutées
- Les actions ignorées
- Les erreurs rencontrées
- Les journaux techniques

---

## Recherche

L'historique peut être filtré par :

- Workflow
- Date
- Résultat
- Utilisateur
- Objet métier

---

## Actions disponibles

- Consulter une exécution
- Relancer une simulation
- Exporter les journaux
- Consulter les erreurs

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les exécutions sont historisées ;
- les erreurs sont consultables ;
- les filtres fonctionnent ;
- les permissions sont respectées.

# Écran 8 — Gestion des erreurs

## Objectif

Permettre d'identifier, comprendre et traiter les erreurs rencontrées lors de l'exécution d'un Workflow.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Liste des erreurs

Pour chaque erreur, la plateforme affiche :

- Date et heure
- Workflow concerné
- Étape du Workflow
- Niveau de gravité
- Statut
- Objet métier concerné

---

## Niveaux de gravité

Une erreur peut être :

- Information
- Avertissement
- Erreur
- Critique

---

## Détail

Pour chaque erreur :

- Description
- Cause identifiée (si connue)
- Action concernée
- Message technique
- Proposition de résolution (si disponible)

---

## Traitement

L'utilisateur peut :

- Marquer l'erreur comme traitée
- Ajouter un commentaire
- Relancer une simulation
- Relancer le Workflow (si autorisé)

---

## Historique

Chaque erreur conserve :

- Date
- Auteur
- Statut
- Commentaires
- Historique des traitements

---

## Actions disponibles

- Consulter
- Marquer comme traitée
- Ajouter un commentaire
- Relancer une simulation
- Exporter le journal

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les erreurs sont enregistrées ;
- leur niveau est identifié ;
- leur traitement est historisé ;
- les permissions sont respectées.



# Écran 9 — Statistiques des Workflows

## Objectif

Permettre d'analyser l'utilisation et les performances des Workflows afin d'améliorer leur efficacité.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Indicateurs

La plateforme affiche notamment :

- Nombre total de Workflows
- Workflows actifs
- Workflows désactivés
- Nombre d'exécutions
- Nombre d'exécutions réussies
- Nombre d'exécutions en erreur
- Temps moyen d'exécution

---

## Analyse

Les statistiques peuvent être présentées par :

- Workflow
- Catégorie
- Déclencheur
- Cabinet
- Période

---

## Alertes

La plateforme peut signaler :

- Workflow jamais exécuté
- Workflow en erreur fréquente
- Temps d'exécution anormalement élevé
- Workflow désactivé depuis longtemps

---

## Tableaux de bord

La plateforme peut afficher :

- Les Workflows les plus utilisés
- Les Workflows les plus lents
- Les Workflows générant le plus d'erreurs
- Les Workflows les moins utilisés

---

## Actions disponibles

- Filtrer les statistiques
- Exporter les données
- Ouvrir un Workflow
- Consulter les exécutions

---

## Critères de validation

L'écran est conforme lorsque :

- les statistiques sont fiables ;
- les indicateurs sont mis à jour ;
- les filtres fonctionnent ;
- les permissions sont respectées.


# Écran 10 — Vue 360° du Workflow

## Objectif

Offrir une vision complète d'un Workflow en regroupant toutes les informations essentielles sur un seul écran.

Cette vue permet de comprendre rapidement son fonctionnement, son état et ses performances.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Résumé

La vue affiche :

- Nom du Workflow
- Description
- Catégorie
- Statut
- Version
- Auteur
- Date de création
- Dernière modification

---

## Déclencheur

Affichage de :

- Type de déclencheur
- Objet concerné
- Paramètres
- Fréquence (si applicable)

---

## Conditions

Résumé des conditions :

- Nombre de conditions
- Nombre de groupes
- Dernière modification
- État de validation

---

## Actions

Résumé des actions :

- Nombre d'actions
- Ordre d'exécution
- Actions actives
- Actions désactivées

---

## Exécutions

Affichage de :

- Nombre total d'exécutions
- Dernière exécution
- Dernière réussite
- Dernière erreur
- Temps moyen d'exécution

---

## Alertes

La plateforme peut afficher :

- Workflow désactivé
- Erreurs récurrentes
- Action invalide
- Déclencheur inactif
- Workflow jamais exécuté

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Activer / Désactiver
- Modifier
- Tester
- Simuler
- Consulter les exécutions
- Consulter les erreurs
- Dupliquer
- Archiver

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations essentielles sont visibles sur un seul écran ;
- les alertes sont clairement identifiées ;
- les actions rapides sont accessibles ;
- les liens avec les autres modules fonctionnent.
