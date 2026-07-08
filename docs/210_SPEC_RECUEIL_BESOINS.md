# 210_SPEC_RECUEIL_BESOINS

## Objet

Le module Recueil des besoins permet de collecter, structurer et conserver toutes les informations nécessaires au devoir de conseil.

Le recueil des besoins est toujours rattaché à un Projet.

Il constitue la base de l'analyse, de la préconisation et du devoir de conseil.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md


# Écran 1 — Liste des recueils des besoins

## Objectif

Permettre de consulter, rechercher et gérer l'ensemble des recueils des besoins du cabinet.

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

- Numéro
- Client
- Projet
- Type de recueil
- Version
- Statut
- Conseiller
- Date de création
- Dernière modification

---

## Actions disponibles

- Ouvrir
- Créer
- Modifier
- Finaliser
- Générer le document
- Archiver

---

## Filtres

- Client
- Projet
- Type
- Conseiller
- Statut
- Date

---

## Critères de validation

L'écran est conforme lorsque :

- les recueils sont facilement retrouvables ;
- les filtres fonctionnent ;
- les permissions sont respectées ;
- les informations sont à jour.


# Écran 2 — Fiche du recueil des besoins

## Objectif

Permettre de consulter, compléter et piloter un recueil des besoins depuis une fiche unique.

Cette fiche constitue le point central du devoir de conseil.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

La fiche affiche :

- Numéro du recueil
- Client
- Projet
- Type de recueil
- Version
- Statut
- Conseiller
- Date de création
- Dernière modification

---

## Vue d'ensemble

La fiche présente un résumé comprenant :

- Niveau d'avancement
- Nombre de questions répondues
- Nombre de questions restantes
- Alertes
- Dernière mise à jour

---

## Accès rapide

Depuis la fiche, l'utilisateur accède directement à :

- Les sections du questionnaire
- Les documents associés
- Les commentaires
- L'historique
- Le Projet

---

## Actions disponibles

- Modifier
- Reprendre le questionnaire
- Finaliser le recueil
- Générer le document
- Créer une nouvelle version
- Archiver

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations sont centralisées ;
- la progression est visible ;
- les liens avec les autres modules fonctionnent ;
- les modifications sont historisées.


# Écran 3 — Structure du questionnaire

## Objectif

Organiser le recueil des besoins en plusieurs sections afin de rendre le questionnaire plus simple à compléter.

Les sections affichées dépendent du type de Projet.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Sections

Le questionnaire peut contenir notamment :

- Situation personnelle
- Situation familiale
- Situation professionnelle
- Situation financière
- Patrimoine
- Contrats existants
- Objectifs
- Besoins exprimés
- Contraintes
- Informations réglementaires

Les sections sont administrables.

---

## Navigation

Le conseiller peut :

- Ouvrir une section
- Passer à la suivante
- Revenir à la précédente
- Enregistrer à tout moment

---

## Progression

Pour chaque section, la plateforme indique :

- Non commencée
- En cours
- Terminée

---

## Adaptation

Les sections affichées varient selon le type de Projet.

Exemples :

- Assurance emprunteur
- Santé
- Prévoyance
- Assurance vie
- Retraite
- Crédit
- Patrimoine

Chaque type de Projet possède son propre parcours.

---

## Actions disponibles

- Ouvrir une section
- Modifier les réponses
- Passer à la section suivante
- Enregistrer

---

## Critères de validation

L'écran est conforme lorsque :

- les sections sont clairement organisées ;
- la progression est visible ;
- le questionnaire s'adapte au type de Projet ;
- les réponses sont enregistrées.


# Écran 4 — Questions et réponses

## Objectif

Permettre au conseiller de répondre aux questions composant le recueil des besoins.

Les questions s'adaptent automatiquement au contexte du Projet.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Types de questions

La plateforme peut proposer :

- Texte libre
- Réponse courte
- Réponse longue
- Oui / Non
- Choix unique
- Choix multiple
- Date
- Nombre
- Montant
- Pourcentage
- Liste déroulante
- Téléversement de document

La liste est évolutive.

---

## Informations affichées

Pour chaque question :

- Intitulé
- Description (si nécessaire)
- Réponse
- Caractère obligatoire ou facultatif
- Aide contextuelle

---

## Règles d'affichage

Les questions peuvent être :

- Toujours affichées
- Affichées selon une réponse précédente
- Affichées selon le type de Projet
- Affichées selon le profil du Client

---

## Vérifications

La plateforme contrôle :

- Les réponses obligatoires
- Le format des réponses
- Les incohérences éventuelles

Les anomalies sont signalées au conseiller.

---

## Actions disponibles

- Répondre
- Modifier une réponse
- Ajouter un commentaire
- Enregistrer
- Passer à la question suivante

---

## Critères de validation

L'écran est conforme lorsque :

- les questions s'affichent correctement ;
- les règles conditionnelles fonctionnent ;
- les réponses sont enregistrées ;
- les contrôles sont réalisés automatiquement.



# Écran 5 — Contrôles de cohérence

## Objectif

Vérifier automatiquement la qualité et la cohérence des informations saisies dans le recueil des besoins.

Ces contrôles assistent le conseiller mais ne remplacent jamais son jugement.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Contrôles réalisés

La plateforme peut détecter notamment :

- Réponse obligatoire manquante
- Valeur incohérente
- Contradiction entre deux réponses
- Information incomplète
- Document obligatoire manquant

---

## Types d'alertes

Les alertes sont classées en trois niveaux :

### Information

Simple conseil.

Le conseiller peut continuer.

### Avertissement

Une vérification est recommandée.

Le conseiller peut continuer.

### Bloquante

Une information indispensable manque.

Le conseiller doit corriger avant de finaliser le recueil.

---

## Détail des anomalies

Pour chaque anomalie :

- Question concernée
- Description
- Niveau
- Proposition de correction (si disponible)

---

## Validation

Le conseiller peut :

- Corriger la réponse
- Justifier le maintien de la réponse (si autorisé)
- Refaire le contrôle

---

## Actions disponibles

- Lancer les contrôles
- Corriger les anomalies
- Ajouter une justification
- Valider le recueil

---

## Critères de validation

L'écran est conforme lorsque :

- les incohérences sont détectées ;
- les alertes sont classées par niveau ;
- les corrections sont historisées ;
- les justifications sont conservées.


# Écran 6 — Recommandations des Services IA

## Objectif

Permettre aux Services IA d'assister le conseiller pendant le recueil des besoins.

Les Services IA proposent des recommandations mais ne prennent jamais de décision à la place du conseiller.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Recommandations

Les Services IA peuvent proposer :

- Questions complémentaires
- Informations manquantes
- Réponses potentiellement incohérentes
- Points de vigilance
- Risques identifiés

---

## Suggestions

Les Services IA peuvent également suggérer :

- Des objectifs complémentaires
- Des produits à étudier
- Des documents à demander
- Des activités à programmer

Ces suggestions restent facultatives.

---

## Explication

Chaque recommandation indique :

- La raison de la recommandation
- Les informations utilisées
- Le niveau de confiance

---

## Validation

Le conseiller peut :

- Accepter une recommandation
- La refuser
- La reporter
- Ajouter un commentaire

Toutes les décisions sont historisées.

---

## Actions disponibles

- Consulter les recommandations
- Appliquer une recommandation
- Ignorer une recommandation
- Ajouter un commentaire

---

## Critères de validation

L'écran est conforme lorsque :

- les recommandations sont clairement identifiées ;
- aucune décision n'est prise automatiquement ;
- les actions du conseiller sont historisées ;
- les permissions sont respectées.


# Écran 7 — Validation du recueil des besoins

## Objectif

Permettre au conseiller de vérifier que le recueil des besoins est complet avant de le finaliser.

La validation garantit que les informations nécessaires au devoir de conseil sont bien présentes.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Vérifications

Avant validation, la plateforme contrôle notamment :

- Toutes les questions obligatoires sont renseignées
- Les anomalies bloquantes sont corrigées
- Les documents obligatoires sont présents
- Les réponses sont cohérentes
- Les informations réglementaires sont complètes

---

## Résumé

Avant validation, le conseiller visualise :

- Nombre de questions répondues
- Nombre de questions obligatoires
- Nombre d'anomalies
- Nombre d'avertissements
- Niveau de complétude

---

## Validation

Le conseiller peut :

- Valider le recueil
- Revenir au questionnaire
- Ajouter un commentaire
- Reporter la validation

Une fois validé, le recueil passe au statut **Validé**.

---

## Conséquences

Après validation, la plateforme peut autoriser :

- La génération du document
- Le lancement du devoir de conseil
- Le passage à l'étape suivante du Projet

Selon les Workflows définis par le cabinet.

---

## Actions disponibles

- Valider
- Corriger
- Générer le document
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- les contrôles sont effectués ;
- le conseiller peut valider ou revenir en arrière ;
- la validation est historisée ;
- les permissions sont respectées.



# Écran 8 — Génération du document de recueil des besoins

## Objectif

Permettre de générer automatiquement le document officiel du recueil des besoins à partir des réponses enregistrées.

Ce document constitue une preuve du devoir de conseil.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 207_SPEC_DOCUMENTS.md

---

## Vérifications

Avant la génération, la plateforme contrôle :

- Le recueil est validé
- Les informations obligatoires sont présentes
- Les anomalies bloquantes sont corrigées
- Le modèle de document est disponible

---

## Génération

Le document généré :

- reçoit un numéro unique (si applicable) ;
- est lié au Projet ;
- est lié au Client ;
- est enregistré dans la bibliothèque documentaire ;
- reçoit sa version initiale.

---

## Prévisualisation

Avant validation définitive, le conseiller peut :

- Prévisualiser le document
- Vérifier son contenu
- Régénérer le document si des données ont changé

---

## Signature

Selon les règles du cabinet, le document peut être :

- Conservé sans signature
- Envoyé en signature électronique
- Imprimé pour signature manuscrite

---

## Actions disponibles

- Générer
- Prévisualiser
- Télécharger
- Envoyer
- Demander une signature
- Régénérer

---

## Critères de validation

L'écran est conforme lorsque :

- le document est généré automatiquement ;
- les données sont correctement intégrées ;
- le document est enregistré ;
- les liens avec le Projet et le Client sont créés.

# Écran 9 — Historique du recueil des besoins

## Objectif

Conserver la trace de toutes les modifications apportées au recueil des besoins afin de garantir la traçabilité du devoir de conseil.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Événements historisés

La plateforme enregistre notamment :

- Création du recueil
- Modification d'une réponse
- Ajout ou suppression d'une réponse
- Validation
- Génération du document
- Création d'une nouvelle version
- Signature (si applicable)

---

## Informations affichées

Pour chaque événement :

- Date et heure
- Auteur
- Type d'action
- Élément concerné
- Commentaire (si disponible)

---

## Comparaison

La plateforme permet de comparer deux versions afin de visualiser :

- Les réponses ajoutées
- Les réponses modifiées
- Les réponses supprimées

---

## Recherche

L'historique peut être filtré par :

- Date
- Utilisateur
- Type d'action

---

## Actions disponibles

- Consulter un événement
- Comparer deux versions
- Exporter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les modifications sont historisées ;
- les versions sont comparables ;
- les filtres fonctionnent ;
- les permissions sont respectées.

# Écran 10 — Vue 360° du recueil des besoins

## Objectif

Offrir une vision complète du recueil des besoins en regroupant toutes les informations essentielles sur un seul écran.

Cette vue permet au conseiller de vérifier rapidement que le devoir de conseil est correctement préparé.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Résumé

La vue affiche :

- Numéro du recueil
- Client
- Projet
- Type de recueil
- Version
- Statut
- Conseiller
- Date de création
- Dernière modification
- Niveau de complétude

---

## Questionnaire

Résumé du questionnaire :

- Nombre de sections
- Sections terminées
- Questions répondues
- Questions obligatoires restantes

---

## Contrôles

Affichage de :

- Nombre d'informations
- Nombre d'avertissements
- Nombre d'anomalies bloquantes
- Dernier contrôle effectué

---

## Documents

Résumé documentaire :

- Document généré
- Version active
- Signature requise
- Statut de signature

---

## Historique

Résumé des principaux événements :

- Création
- Dernière modification
- Validation
- Génération
- Signature
- Nouvelle version

---

## Alertes

La plateforme peut afficher :

- Questions obligatoires manquantes
- Contrôles à effectuer
- Validation en attente
- Signature en attente
- Nouvelle version disponible

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Reprendre le questionnaire
- Corriger une réponse
- Lancer les contrôles
- Valider le recueil
- Générer le document
- Envoyer en signature
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations essentielles sont visibles sur un seul écran ;
- les alertes sont clairement identifiées ;
- les actions rapides sont accessibles ;
- les liens avec les autres modules fonctionnent.
