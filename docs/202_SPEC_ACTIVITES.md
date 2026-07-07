# 202_SPEC_ACTIVITES

## Objet

Le module Activités constitue le système central de suivi des interactions réalisées dans la plateforme EJ Assurances.

Une activité représente toute action réalisée, programmée ou historisée dans le cadre du suivi d'un Client, d'un Projet ou d'un Contrat.

Le module permet de :

- planifier les actions à réaliser ;
- historiser les interactions ;
- suivre l'avancement des dossiers ;
- alimenter les tableaux de bord ;
- déclencher des Workflows ;
- fournir des informations aux Services IA.

Toutes les activités sont historisées et peuvent être liées à un ou plusieurs objets métier.

# Écran 1 — Centre des activités

## Objectif

Permettre à l'utilisateur de consulter, rechercher, filtrer et gérer l'ensemble de ses activités depuis une interface unique.

Le Centre des activités constitue le point d'entrée principal de toutes les interactions métier.

---

## Utilisateurs concernés

- Dirigeant
- Responsable
- Collaborateur
- Mandataire

Les Clients et Partenaires disposent uniquement d'une vue limitée aux activités qui les concernent.

---

## Structure de l'écran

Le Centre des activités est composé de quatre zones.

### Barre supérieure

- Recherche globale
- Créer une activité
- Filtres rapides
- Exporter
- Actualiser

---

### Colonne de filtres

Filtres disponibles :

- Toutes
- À faire
- Terminées
- En retard
- Aujourd'hui
- Cette semaine
- Ce mois

Filtres complémentaires :

- Type d'activité
- Client
- Projet
- Responsable
- Priorité
- Statut

---

### Zone centrale

Affichage des activités.

L'utilisateur peut choisir :

- Liste
- Timeline
- Calendrier

---

### Panneau latéral

Affiche les détails de l'activité sélectionnée sans quitter la liste.

---

## Types d'activités

Le module gère notamment :

- Tâche
- Rendez-vous
- Appel téléphonique
- Email
- SMS
- Note
- Réunion
- Visioconférence
- Courrier
- Action automatique
- Intervention d'un Service IA

La liste pourra être enrichie sans modifier l'architecture.

---

## Actions disponibles

Depuis cet écran, l'utilisateur peut :

- créer une activité ;
- modifier une activité ;
- clôturer une activité ;
- dupliquer une activité ;
- affecter une activité ;
- ouvrir le Client associé ;
- ouvrir le Projet associé ;
- ouvrir le Contrat associé.

---

## Automatisations

Le module reçoit automatiquement des activités provenant :

- des Workflows ;
- des Services IA ;
- du calendrier ;
- des modules métier.

Toutes les activités sont immédiatement visibles.

---

## Services IA concernés

Service CRM

Service Pilotage

Service Développement Commercial

Service Formation

Les Services IA peuvent proposer des activités mais ne peuvent jamais les clôturer sans validation humaine.

---

## Critères de validation

Le Centre des activités sera considéré comme conforme lorsque :

- toutes les activités sont centralisées ;
- les filtres fonctionnent correctement ;
- les différents modes d'affichage sont disponibles ;
- les liens vers les objets métier sont opérationnels ;
- les activités sont historisées.

# Écran 2 — Fiche Activité

## Objectif

Permettre de consulter, créer, modifier et suivre une activité.

La fiche Activité constitue l'écran de référence de toutes les activités de la plateforme.

Toutes les activités utilisent cette même structure, quel que soit leur type.

---

## Utilisateurs concernés

- Dirigeant
- Responsable
- Collaborateur
- Mandataire

Les droits de modification dépendent des permissions de l'utilisateur.

---

## Informations générales

Chaque activité possède au minimum :

- Identifiant unique
- Type d'activité
- Titre
- Description
- Statut
- Priorité
- Date de création
- Date prévue
- Date de début
- Date de fin
- Responsable
- Créateur

---

## Liaison métier

Une activité peut être liée à :

- un Client
- un Projet
- un Contrat
- un Document
- un Partenaire

Plusieurs liaisons sont possibles si nécessaire.

---

## Cycle de vie

Une activité peut prendre les états suivants :

🟦 À planifier

⬜ Planifiée

🟢 En cours

🟡 En attente

✅ Terminée

❌ Annulée

Le changement d'état est historisé.

---

## Priorité

Chaque activité possède une priorité.

- Critique
- Haute
- Normale
- Faible

La priorité peut être proposée automatiquement par les Workflows ou les Services IA.

L'utilisateur conserve la possibilité de la modifier selon ses droits.

---

## Actions disponibles

Depuis la fiche Activité, l'utilisateur peut :

- Modifier
- Réaffecter
- Reporter
- Changer le statut
- Ajouter une note
- Ajouter une pièce jointe
- Consulter l'historique
- Ouvrir les éléments liés

---

## Historique

Toutes les modifications sont historisées :

- création
- modification
- changement de responsable
- changement de priorité
- changement de statut
- clôture

L'historique est consultable mais non modifiable.

---

## Services IA concernés

Le Service CRM peut :

- proposer une priorité ;
- suggérer une échéance ;
- détecter une activité oubliée.

Le Service Pilotage exploite les activités à des fins statistiques.

Les Services IA ne peuvent jamais clôturer une activité sans validation humaine.

---

## Critères de validation

La fiche Activité sera considérée comme conforme lorsque :

- toutes les informations sont accessibles ;
- le cycle de vie est respecté ;
- les liaisons métier fonctionnent ;
- l'historique est complet ;
- les droits sont appliqués correctement.

# Écran 3 — Participants et responsables

## Objectif

Permettre d'identifier clairement les personnes concernées par une activité ainsi que leurs rôles.

Une activité peut impliquer plusieurs intervenants ayant chacun une responsabilité différente.

---

## Utilisateurs concernés

- Dirigeant
- Responsable
- Collaborateur
- Mandataire

Selon leurs droits, les utilisateurs peuvent consulter ou modifier les participants.

---

## Responsabilités

Une activité distingue plusieurs rôles.

### Responsable

Personne en charge de la réalisation de l'activité.

Une seule personne peut être responsable.

---

### Créateur

Utilisateur ayant créé l'activité.

Le créateur reste historisé même si l'activité est réaffectée.

---

### Participants

Liste des personnes participant à l'activité.

Exemples :

- Collaborateur
- Mandataire
- Assistant
- Responsable

Une activité peut comporter plusieurs participants.

---

### Personnes concernées

L'activité peut être liée à :

- un Client ;
- un Prospect ;
- un Partenaire ;
- un Contact externe.

Ces personnes ne sont pas responsables de l'activité mais sont concernées par son exécution.

---

## Affectation

Le responsable peut être modifié selon les droits de l'utilisateur.

Chaque changement est enregistré dans l'historique.

L'ancien responsable reste consultable.

---

## Notifications

Lorsqu'une activité est :

- créée ;
- réaffectée ;
- reportée ;
- annulée ;
- terminée ;

les personnes concernées peuvent être notifiées selon leurs préférences.

---

## Services IA concernés

Le Service CRM peut proposer une affectation.

Le Service Pilotage peut détecter une surcharge d'un collaborateur et suggérer une réaffectation.

Les Services IA ne réaffectent jamais automatiquement une activité.

---

## Historique

Chaque changement de responsable ou de participant est historisé :

- auteur ;
- date ;
- ancienne valeur ;
- nouvelle valeur ;
- motif (si renseigné).

---

## Critères de validation

L'écran sera considéré comme conforme lorsque :

- un responsable est identifié ;
- les participants sont correctement gérés ;
- les changements sont historisés ;
- les notifications sont envoyées selon les règles définies ;
- les droits d'affectation sont respectés.


# Écran 4 — Origine de l'activité

## Objectif

Permettre d'identifier précisément comment une activité a été créée.

L'origine d'une activité constitue une information essentielle pour comprendre son contexte, assurer sa traçabilité et alimenter les statistiques de pilotage.

---

## Utilisateurs concernés

- Dirigeant
- Responsable
- Collaborateur
- Mandataire

L'origine est consultable par tous les utilisateurs autorisés.

Elle ne peut être modifiée après la création de l'activité.

---

## Origines possibles

Une activité peut provenir notamment de :

### Création manuelle

Activité créée volontairement par un utilisateur.

---

### Workflow

Activité générée automatiquement par un processus métier.

Exemple :

- DER envoyé
- Génération du devoir de conseil
- Signature du contrat

---

### Service IA

Activité proposée ou créée par un Service IA après validation utilisateur.

Exemple :

- Proposition de relance
- Préparation d'un rendez-vous
- Contrôle documentaire

---

### Système

Activité générée automatiquement par la plateforme.

Exemple :

- Sauvegarde automatique
- Échéance atteinte
- Renouvellement annuel

---

### Synchronisation externe

Activité importée depuis un outil connecté.

Exemple :

- Google Calendar
- Outlook
- Microsoft 365

---

## Informations affichées

Pour chaque activité, la plateforme affiche :

- Origine
- Date de création
- Auteur
- Méthode de création
- Workflow associé (si applicable)
- Service IA concerné (si applicable)

---

## Exploitation

L'origine permet notamment :

- d'améliorer les statistiques ;
- d'analyser les Workflows ;
- de mesurer l'apport des Services IA ;
- d'identifier les créations manuelles.

---

## Services IA concernés

Le Service Pilotage exploite cette information afin d'analyser :

- le taux d'automatisation ;
- le nombre d'activités créées manuellement ;
- l'efficacité des Workflows ;
- la pertinence des recommandations IA.

---

## Historique

L'origine est figée dès la création.

Elle ne peut jamais être modifiée.

Toute correction nécessite la création d'une nouvelle activité.

---

## Critères de validation

L'écran sera considéré comme conforme lorsque :

- chaque activité possède une origine ;
- l'origine est fiable ;
- elle est consultable ;
- elle ne peut pas être modifiée ;
- elle est exploitée dans les statistiques.

# Écran 5 — Résultat de l'activité

## Objectif

Permettre de renseigner l'issue d'une activité afin d'assurer un suivi précis des actions réalisées.

Le résultat est distinct du statut de l'activité.

Le statut indique où en est l'activité.

Le résultat indique ce qu'elle a produit.

---

## Utilisateurs concernés

- Dirigeant
- Responsable
- Collaborateur
- Mandataire

Le résultat peut être renseigné par le responsable de l'activité ou par un utilisateur autorisé.

---

## Différence entre Statut et Résultat

### Statut

Exemples :

- À planifier
- Planifiée
- En cours
- En attente
- Terminée
- Annulée

Le statut décrit l'avancement.

---

### Résultat

Exemples :

- Succès
- Sans réponse
- Reporté
- Refus du client
- Accepté
- Information transmise
- Pièce reçue
- Pièce manquante
- Devis accepté
- Devis refusé
- Contrat signé
- Contrat abandonné

Le résultat décrit l'issue de l'activité.

---

## Commentaire de clôture

Lorsqu'une activité est terminée, l'utilisateur peut ajouter :

- un commentaire ;
- une conclusion ;
- une prochaine action recommandée.

Ce commentaire est historisé.

---

## Déclenchement de Workflows

Le résultat peut déclencher automatiquement un Workflow.

Exemples :

Résultat :

**Client injoignable**

↓

Créer une nouvelle activité de relance dans 7 jours.

---

Résultat :

**Contrat signé**

↓

Créer automatiquement les activités de suivi.

---

Résultat :

**Document manquant**

↓

Créer une demande de pièce justificative.

---

## Services IA concernés

Le Service CRM exploite les résultats afin :

- d'améliorer les recommandations ;
- d'éviter les relances inutiles ;
- de détecter les blocages.

Le Service Pilotage utilise les résultats pour produire des statistiques fiables.

---

## Historique

Chaque modification du résultat est historisée avec :

- utilisateur ;
- date ;
- ancienne valeur ;
- nouvelle valeur.

---

## Critères de validation

L'écran sera considéré comme conforme lorsque :

- le résultat est indépendant du statut ;
- les Workflows utilisent le résultat lorsque nécessaire ;
- les commentaires sont historisés ;
- les statistiques exploitent correctement les résultats.

# Écran 6 — Temps et suivi d'exécution

## Objectif

Permettre de mesurer le temps consacré à chaque activité afin d'améliorer le pilotage du cabinet et l'analyse des processus.

Le suivi du temps reste facultatif selon le type d'activité et les paramètres du cabinet.

---

## Utilisateurs concernés

- Dirigeant
- Responsable
- Collaborateur
- Mandataire

---

## Informations affichées

Chaque activité peut comporter :

- Date de création
- Date prévue
- Date de début
- Date de fin
- Durée estimée
- Durée réelle
- Temps cumulé
- Dernière modification

---

## Saisie du temps

Le temps peut être :

### Manuel

L'utilisateur renseigne la durée.

---

### Automatique

La plateforme calcule :

- heure de début ;
- heure de fin ;
- durée totale.

---

### Chronomètre

L'utilisateur peut démarrer un chronomètre directement depuis l'activité.

Fonctions disponibles :

- Démarrer
- Pause
- Reprendre
- Arrêter

---

## Exploitation

Le suivi du temps permet notamment de :

- mesurer le temps moyen par type d'activité ;
- identifier les activités les plus chronophages ;
- améliorer les Workflows ;
- optimiser la répartition des tâches.

---

## Services IA concernés

### Service Pilotage

Analyse les temps moyens.

Détecte :

- les écarts importants ;
- les activités anormalement longues ;
- les gains de productivité.

---

### Service CRM

Peut proposer une meilleure organisation des activités.

---

## Historique

Toute modification d'une durée est historisée.

Le système conserve :

- ancienne valeur ;
- nouvelle valeur ;
- utilisateur ;
- date de modification.

---

## Critères de validation

L'écran sera considéré comme conforme lorsque :

- les durées sont correctement calculées ;
- le chronomètre fonctionne ;
- les statistiques utilisent les données de temps ;
- toutes les modifications sont historisées.

# Écran 7 — Contexte métier

## Objectif

Permettre d'associer chaque activité à son contexte métier afin d'en comprendre immédiatement la finalité.

Le contexte métier précise pourquoi l'activité existe et dans quel processus elle s'inscrit.

---

## Utilisateurs concernés

- Dirigeant
- Responsable
- Collaborateur
- Mandataire

---

## Contexte principal

Chaque activité possède un contexte principal.

Exemples :

- Prospection
- Entrée en relation
- Analyse des besoins
- Étude
- Souscription
- Gestion du contrat
- Sinistre
- Réclamation
- Suivi annuel
- Fidélisation
- Administration interne

Le contexte principal est obligatoire.

---

## Phase métier

L'activité peut également être rattachée à une étape du parcours client.

Exemple :

Prospection

↓

Premier contact

↓

Découverte

↓

Recueil des besoins

↓

Étude

↓

Présentation

↓

Signature

↓

Mise en place

↓

Suivi

Cette information permet de situer immédiatement l'activité dans le cycle de vie du dossier.

---

## Affichage

Le contexte métier est visible :

- sur la fiche Activité ;
- dans la Timeline ;
- dans les recherches ;
- dans les statistiques ;
- dans les tableaux de bord.

---

## Filtres

Les utilisateurs peuvent filtrer les activités par :

- contexte métier ;
- phase métier ;
- type d'activité ;
- responsable ;
- période.

---

## Automatisations

Les Workflows renseignent automatiquement le contexte lorsque l'activité est créée.

L'utilisateur peut le modifier uniquement si ses droits le permettent.

---

## Services IA concernés

### Service CRM

Analyse le contexte métier afin d'adapter ses recommandations.

---

### Service Pilotage

Produit des statistiques par phase du parcours client.

---

### Service Formation

Peut proposer des bonnes pratiques adaptées au contexte.

---

## Historique

Toute modification du contexte est historisée.

La plateforme conserve :

- ancienne valeur ;
- nouvelle valeur ;
- auteur ;
- date de modification.

---

## Critères de validation

Le contexte métier sera considéré comme conforme lorsque :

- chaque activité possède un contexte principal ;
- les phases métier sont correctement renseignées ;
- les filtres fonctionnent ;
- les statistiques exploitent cette information ;
- les modifications sont historisées.

# Écran 8 — Livrables et éléments produits

## Objectif

Permettre d'associer à une activité tous les éléments qu'elle a permis de produire.

Une activité peut générer un ou plusieurs livrables qui enrichissent le dossier du Client ou du Projet.

---

## Utilisateurs concernés

- Dirigeant
- Responsable
- Collaborateur
- Mandataire

---

## Livrables possibles

Une activité peut produire notamment :

- Un document
- Une note
- Une pièce justificative
- Un compte-rendu
- Un devis
- Un contrat
- Une signature
- Une décision
- Une recommandation
- Une activité suivante

La liste est extensible.

---

## Présentation

La fiche Activité affiche une section :

### Livrables associés

Pour chaque livrable :

- Type
- Nom
- Date de création
- Auteur
- Statut
- Lien vers le livrable

---

## Création

Les livrables peuvent être :

### Créés manuellement

Par un utilisateur.

---

### Générés automatiquement

Par :

- un Workflow ;
- un Service IA ;
- un modèle documentaire.

---

## Relations

Chaque livrable reste lié à l'activité ayant permis sa création.

Cette relation est permanente.

---

## Historique

Le système conserve :

- la date de création ;
- l'auteur ;
- le mode de création ;
- les éventuelles modifications.

---

## Services IA concernés

### Service Documentation

Peut générer automatiquement certains livrables.

---

### Service CRM

Peut suggérer la création d'un compte-rendu ou d'une activité de suivi.

---

### Service Pilotage

Analyse les livrables produits afin de mesurer la qualité des processus.

---

## Critères de validation

Le module sera considéré comme conforme lorsque :

- chaque livrable reste lié à son activité d'origine ;
- les liens sont consultables ;
- les créations automatiques sont identifiées ;
- les informations sont historisées.

# Écran 9 — Objectif de l'activité

## Objectif

Permettre d'identifier clairement le but recherché par une activité.

L'objectif métier guide le collaborateur dans la réalisation de l'activité et permet d'évaluer si celle-ci a atteint son résultat attendu.

---

## Utilisateurs concernés

- Dirigeant
- Responsable
- Collaborateur
- Mandataire

---

## Objectif métier

Chaque activité possède un objectif principal.

Exemples :

- Obtenir une pièce justificative
- Découvrir les besoins du client
- Présenter une solution
- Faire signer un document
- Répondre à une demande
- Informer un client
- Organiser un rendez-vous
- Finaliser une souscription
- Assurer le suivi annuel
- Clôturer un dossier

L'objectif est sélectionné dans une liste standardisée.

---

## Résultat attendu

Chaque objectif peut être associé à un résultat attendu.

Exemple :

Objectif :

Obtenir une pièce justificative

↓

Résultat attendu :

Pièce reçue

---

Objectif :

Présenter une offre

↓

Résultat attendu :

Décision du client

---

## Évaluation

À la clôture de l'activité, l'utilisateur indique si l'objectif est :

- Atteint
- Partiellement atteint
- Non atteint
- Sans objet

Cette information est utilisée pour le pilotage et l'amélioration continue.

---

## Automatisations

Les Workflows peuvent proposer automatiquement un objectif selon le contexte de création de l'activité.

Les Services IA peuvent suggérer un objectif mais ne peuvent jamais le modifier sans validation.

---

## Services IA concernés

### Service CRM

Analyse les objectifs les plus fréquemment atteints ou non atteints.

---

### Service Pilotage

Produit des statistiques sur les objectifs réalisés.

---

### Service Formation

Peut identifier les activités pour lesquelles les objectifs sont rarement atteints et proposer des actions de formation.

---

## Historique

Toute modification de l'objectif est historisée :

- auteur ;
- date ;
- ancienne valeur ;
- nouvelle valeur.

---

## Critères de validation

Le module sera considéré comme conforme lorsque :

- chaque activité possède un objectif métier ;
- les objectifs sont standardisés ;
- leur atteinte peut être évaluée ;
- les statistiques exploitent cette information ;
- les modifications sont historisées.


# Écran 10 — Relations et dépendances entre activités

## Objectif

Permettre de gérer les relations entre plusieurs activités afin de représenter fidèlement le déroulement d'un processus métier.

Une activité peut dépendre d'une ou plusieurs autres activités avant de pouvoir être réalisée.

---

## Utilisateurs concernés

- Dirigeant
- Responsable
- Collaborateur
- Mandataire

---

## Types de relations

Une activité peut être :

### Activité précédente

L'activité actuelle ne peut débuter qu'après sa réalisation.

Exemple :

Recueil des besoins

↓

Présentation de la solution

---

### Activité suivante

L'activité actuelle déclenche automatiquement une autre activité.

Exemple :

Signature du contrat

↓

Programmation du suivi annuel

---

### Activité liée

Deux activités sont indépendantes mais concernent le même contexte.

Exemple :

Préparation du rendez-vous

↔

Collecte des pièces justificatives

---

## Présentation

La fiche Activité affiche une section :

### Relations

Pour chaque activité liée :

- Type de relation
- Statut
- Responsable
- Date prévue
- Lien direct

---

## Dépendances

Une activité peut être marquée comme :

- Bloquée
- En attente d'une autre activité
- Libre
- Terminée

Le système indique clairement la raison d'un blocage.

---

## Automatisations

Les Workflows peuvent :

- créer automatiquement des activités liées ;
- clôturer une chaîne d'activités ;
- empêcher le démarrage d'une activité tant que la précédente n'est pas terminée.

Les règles sont entièrement configurables.

---

## Services IA concernés

### Service CRM

Détecte les activités bloquées.

Propose des actions pour débloquer un processus.

---

### Service Pilotage

Analyse les points de blocage récurrents.

Identifie les étapes ralentissant les processus.

---

## Historique

Chaque création, modification ou suppression d'une relation est historisée.

Les changements comprennent :

- auteur ;
- date ;
- ancienne relation ;
- nouvelle relation.

---

## Critères de validation

Le module sera considéré comme conforme lorsque :

- les relations entre activités sont correctement représentées ;
- les dépendances sont respectées ;
- les blocages sont clairement identifiés ;
- les Workflows exploitent ces relations ;
- toutes les modifications sont historisées.
