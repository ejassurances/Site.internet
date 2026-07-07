# 204_SPEC_PROJET

## Objet

Le module Projet constitue le cœur métier de la plateforme EJ Assurances.

Un Projet représente un besoin exprimé par un Client.

Il regroupe toutes les informations, activités, documents, produits étudiés et contrats liés à ce besoin.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

# Écran 1 — Liste des Projets

## Objectif

Permettre de consulter, rechercher et gérer tous les Projets du cabinet.

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

- Numéro du Projet
- Nom du Projet
- Client
- Type de Projet
- Statut
- Conseiller référent
- Date de création
- Dernière activité
- Niveau d'avancement

---

## Actions disponibles

- Ouvrir le Projet
- Créer un Projet
- Modifier
- Archiver
- Exporter
- Ajouter aux favoris

---

## Filtres

- Client
- Type de Projet
- Statut
- Conseiller
- Date de création
- Priorité
- Tags

---

## Critères de validation

L'écran est conforme lorsque :

- les Projets sont facilement recherchables ;
- les filtres fonctionnent correctement ;
- les actions respectent les permissions ;
- les données sont actualisées.

# Écran 2 — Fiche Projet

## Objectif

Permettre de consulter et de piloter un Projet depuis une fiche unique.

La fiche Projet constitue le centre de travail du conseiller.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

La fiche affiche :

- Numéro du Projet
- Nom du Projet
- Type de Projet
- Statut
- Priorité
- Client
- Conseiller référent
- Date de création
- Dernière modification
- Date de clôture (si applicable)

---

## Accès rapide

Depuis la fiche Projet, l'utilisateur accède directement à :

- Recueil des besoins
- Produits étudiés
- Activités
- Documents
- Contrats
- Commentaires
- Historique

---

## Vue d'ensemble

La fiche présente un résumé du Projet :

- Niveau d'avancement
- Nombre d'activités en cours
- Nombre de documents
- Nombre de contrats
- Alertes en cours
- Score de conformité
- Dernière interaction

---

## Actions disponibles

- Modifier le Projet
- Ajouter une Activité
- Ajouter un Document
- Ajouter un Produit
- Générer un document métier
- Clôturer le Projet
- Archiver

---

## Critères de validation

La fiche est conforme lorsque :

- toutes les informations sont accessibles depuis un seul écran ;
- les liens vers les autres modules fonctionnent ;
- les composants transverses sont utilisés ;
- les permissions sont respectées.

# Écran 3 — Informations générales du Projet

## Objectif

Définir les caractéristiques principales du Projet.

Ces informations permettent d'identifier immédiatement le besoin du Client et son état d'avancement.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

Le Projet comporte les informations suivantes :

- Numéro du Projet
- Nom du Projet
- Type de Projet
- Description
- Client
- Conseiller référent
- Cabinet (multi-cabinet)
- Date de création
- Date d'ouverture
- Date prévisionnelle de clôture
- Date de clôture
- Statut
- Priorité
- Tags

---

## Type de Projet

Exemples :

- Assurance emprunteur
- Complémentaire santé
- Prévoyance
- Assurance vie
- Retraite
- Assurance habitation
- Assurance automobile
- Assurance professionnelle
- Assurance RC
- Épargne
- Crédit
- Autre

La liste est administrable.

---

## Description

Le conseiller peut renseigner un résumé du besoin exprimé par le Client.

Cette description reste libre.

---

## Responsable

Le Projet possède :

- Un conseiller référent
- Éventuellement un co-responsable
- Des collaborateurs participants

Un seul conseiller est responsable du Projet.

---

## Actions disponibles

- Modifier les informations
- Changer le responsable
- Changer le statut
- Archiver le Projet

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations d'identification sont présentes ;
- un responsable est défini ;
- le type de Projet est correctement renseigné ;
- les modifications sont historisées.

# Écran 4 — Objectifs du Projet

## Objectif

Définir précisément ce que le Client souhaite obtenir grâce au Projet.

Les objectifs servent de référence tout au long du parcours de conseil.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Objectif principal

Chaque Projet possède un objectif principal.

Exemples :

- Protéger la famille
- Réduire le coût des assurances
- Obtenir un financement
- Préparer la retraite
- Constituer un patrimoine
- Optimiser la fiscalité
- Protéger l'entreprise

---

## Objectifs secondaires

Le conseiller peut ajouter plusieurs objectifs complémentaires.

Exemples :

- Améliorer les garanties
- Simplifier les contrats
- Regrouper les assurances
- Préparer une transmission
- Couvrir un nouveau risque

---

## Priorité des objectifs

Chaque objectif peut être qualifié :

- Essentiel
- Important
- Souhaitable

---

## Niveau d'atteinte

À la clôture du Projet, chaque objectif est évalué :

- Atteint
- Partiellement atteint
- Non atteint

---

## Commentaires

Le conseiller peut expliquer :

- pourquoi un objectif est prioritaire ;
- pourquoi il n'a pas été atteint ;
- les actions prévues.

---

## Services IA

Les Services IA peuvent :

- proposer des objectifs complémentaires ;
- détecter des incohérences ;
- rappeler un objectif oublié.

Ils ne modifient jamais les objectifs sans validation humaine.

---

## Actions disponibles

- Ajouter un objectif
- Modifier
- Changer la priorité
- Évaluer le résultat
- Archiver un objectif

---

## Critères de validation

L'écran est conforme lorsque :

- chaque Projet possède un objectif principal ;
- plusieurs objectifs secondaires sont possibles ;
- les objectifs sont évaluables ;
- les modifications sont historisées.

# Écran 5 — Parcours du Projet

## Objectif

Visualiser l'avancement du Projet à travers les différentes étapes du parcours de conseil.

Le parcours permet au conseiller de savoir immédiatement où en est le Projet et quelle est la prochaine étape.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 202_SPEC_ACTIVITES.md

---

## Étapes du parcours

Le parcours standard est composé des étapes suivantes :

1. Création du Projet
2. Entrée en relation
3. Recueil des besoins
4. Analyse de la situation
5. Étude des solutions
6. Présentation des préconisations
7. Choix du Client
8. Constitution du dossier
9. Signature
10. Mise en place
11. Suivi

Le cabinet peut adapter ce parcours selon le type de Projet.

---

## Affichage

Chaque étape affiche :

- Nom de l'étape
- Statut
- Date de début
- Date de fin
- Responsable
- Progression

Les étapes sont représentées sous forme de frise chronologique.

---

## Changement d'étape

Le passage à une nouvelle étape peut être :

- Manuel
- Automatique via un Workflow
- Proposé par un Service IA

Le changement est toujours historisé.

---

## Blocages

Une étape peut être bloquée.

La plateforme affiche alors :

- Le motif du blocage
- Les actions à réaliser
- Les éléments manquants

---

## Actions disponibles

- Ouvrir une étape
- Revenir à une étape précédente (selon droits)
- Passer à l'étape suivante
- Consulter l'historique du parcours

---

## Critères de validation

L'écran est conforme lorsque :

- le parcours est clairement visible ;
- les étapes sont historisées ;
- les blocages sont identifiés ;
- la progression est fiable.

# Écran 6 — Analyse des besoins

## Objectif

Recueillir et formaliser les besoins du Client afin de proposer une solution adaptée.

Cette étape est indispensable avant toute préconisation.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

Le contenu détaillé du recueil des besoins est défini dans son module spécifique.

---

## Informations affichées

- Date du recueil
- Conseiller
- Version du recueil
- Statut
- Niveau de complétude

---

## Éléments analysés

Selon le type de Projet :

- Situation actuelle
- Besoins exprimés
- Objectifs
- Contraintes
- Budget
- Niveau de risque accepté (si applicable)
- Informations réglementaires

---

## Vérifications

La plateforme contrôle :

- les informations obligatoires ;
- les incohérences ;
- les éléments manquants.

---

## Actions disponibles

- Commencer le recueil
- Modifier
- Finaliser
- Générer le document
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- le recueil est complet ;
- les contrôles sont effectués ;
- les modifications sont historisées ;
- le document peut être généré.

# Écran 7 — Solutions étudiées

## Objectif

Permettre au conseiller de comparer les différentes solutions étudiées avant de formuler sa recommandation.

Le but est de démontrer que plusieurs options ont été analysées dans le cadre du devoir de conseil.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Liste des solutions

Pour chaque solution étudiée :

- Produit
- Partenaire
- Catégorie
- Statut (À l'étude, Retenue, Écartée)
- Date d'ajout

---

## Comparaison

Chaque solution peut être comparée selon :

- Garanties
- Cotisation / Tarif
- Franchise
- Exclusions
- Options
- Avantages
- Inconvénients
- Adéquation avec les besoins

---

## Motif de décision

Pour chaque solution écartée ou retenue, le conseiller peut renseigner :

- Motif de la décision
- Commentaires

Ces informations alimentent le devoir de conseil.

---

## Recommandation

Le conseiller peut désigner une solution comme :

- Recommandée

Une seule solution peut être recommandée.

---

## Actions disponibles

- Ajouter une solution
- Modifier
- Comparer
- Écarter
- Recommander
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- plusieurs solutions peuvent être étudiées ;
- une seule solution est recommandée ;
- les décisions sont justifiées ;
- les modifications sont historisées.


# Écran 8 — Préconisation du conseiller

## Objectif

Formaliser la recommandation du conseiller à l'issue de l'analyse des besoins et de l'étude des solutions.

Cette préconisation constitue le cœur du devoir de conseil.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Recommandation

Le conseiller renseigne :

- Solution recommandée
- Date de la préconisation
- Conseiller
- Version de la préconisation

---

## Justification

Le conseiller explique notamment :

- Pourquoi cette solution est recommandée
- En quoi elle répond aux besoins du Client
- Les avantages
- Les éventuelles limites
- Les points de vigilance

---

## Solutions non retenues

Pour chaque solution écartée :

- Motif du refus
- Raisons de la non-recommandation

---

## Validation par le Client

La plateforme permet d'indiquer :

- Préconisation présentée
- Préconisation acceptée
- Préconisation refusée
- Date de présentation
- Date de décision

---

## Documents associés

Accès direct aux documents liés :

- Devoir de conseil
- Comparatif
- Compte-rendu de rendez-vous
- Tout autre document généré

---

## Actions disponibles

- Modifier la préconisation
- Générer le devoir de conseil
- Présenter au Client
- Historiser la décision

---

## Critères de validation

L'écran est conforme lorsque :

- une seule préconisation est active ;
- la recommandation est justifiée ;
- les solutions écartées sont documentées ;
- les décisions sont historisées.

# Écran 9 — Décision du Client

## Objectif

Enregistrer la décision prise par le Client à la suite de la préconisation du conseiller.

Cette étape marque la fin de la phase de conseil et le début éventuel de la mise en œuvre.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Décision

Le Client peut prendre l'une des décisions suivantes :

- Accepte la préconisation
- Refuse la préconisation
- Demande un délai de réflexion
- Demande une nouvelle étude
- Annule son projet

---

## Informations enregistrées

Pour chaque décision :

- Décision
- Date
- Mode de recueil (Rendez-vous, Téléphone, Email, Signature électronique...)
- Conseiller
- Commentaires

---

## Motif

Selon la décision, le conseiller peut renseigner un motif.

Exemples :

- Tarif trop élevé
- Garanties insuffisantes
- Changement de situation
- Projet reporté
- Choix d'un concurrent
- Autre

La liste est personnalisable.

---

## Conséquences

Selon la décision, la plateforme peut proposer :

- Créer le Contrat
- Générer les documents
- Programmer une relance
- Clôturer le Projet
- Revenir à l'étude des solutions

Les actions restent soumises aux droits et aux Workflows.

---

## Historique

Toutes les décisions sont historisées.

La plateforme conserve :

- les décisions successives ;
- les dates ;
- les motifs ;
- les commentaires.

---

## Actions disponibles

- Enregistrer la décision
- Modifier (selon les droits)
- Ajouter un commentaire
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- une décision est enregistrée ;
- les conséquences sont proposées automatiquement ;
- les décisions sont historisées ;
- les permissions sont respectées.

# Écran 10 — Clôture du Projet

## Objectif

Finaliser le Projet et enregistrer son résultat.

La clôture marque la fin du processus de conseil, qu'il ait abouti ou non à un Contrat.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations de clôture

Le conseiller renseigne :

- Date de clôture
- Motif de clôture
- Résultat du Projet
- Commentaire de clôture

---

## Résultat du Projet

Le résultat peut être :

- Contrat mis en place
- Plusieurs contrats mis en place
- Projet abandonné par le Client
- Projet refusé
- Projet reporté
- Aucun besoin identifié
- Sans suite
- Autre

La liste est administrable.

---

## Vérifications avant clôture

La plateforme contrôle notamment :

- Les activités obligatoires terminées
- Les documents obligatoires générés
- Les signatures obtenues (si nécessaires)
- Les éléments réglementaires complétés
- Les blocages éventuels

En cas d'anomalie, un avertissement est affiché.

---

## Synthèse du Projet

Avant validation, un résumé est présenté :

- Objectifs
- Solution retenue
- Décision du Client
- Contrats créés
- Documents générés
- Nombre d'activités réalisées
- Durée du Projet

---

## Actions disponibles

- Clôturer le Projet
- Revenir au Projet
- Générer le rapport de clôture
- Archiver le Projet

---

## Critères de validation

L'écran est conforme lorsque :

- le résultat du Projet est enregistré ;
- les contrôles de cohérence sont réalisés ;
- la clôture est historisée ;
- le Projet peut être archivé.
