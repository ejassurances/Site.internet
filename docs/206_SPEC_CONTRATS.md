# 206_SPEC_CONTRATS

## Objet

Le module Contrats permet de gérer l'ensemble des contrats souscrits par les Clients.

Un Contrat est toujours issu d'un Projet.

Il représente la solution retenue et mise en place pour répondre au besoin du Client.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

# Écran 1 — Liste des Contrats

## Objectif

Permettre de consulter, rechercher et gérer l'ensemble des Contrats du cabinet.

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

- Numéro du Contrat
- Client
- Produit
- Partenaire
- Projet d'origine
- Statut
- Date d'effet
- Date d'échéance
- Conseiller référent

---

## Actions disponibles

- Ouvrir le Contrat
- Modifier
- Archiver
- Exporter
- Ajouter aux favoris

---

## Filtres

- Client
- Produit
- Partenaire
- Statut
- Conseiller
- Date d'effet
- Date d'échéance
- Tags

---

## Critères de validation

L'écran est conforme lorsque :

- les Contrats sont facilement recherchables ;
- les filtres fonctionnent ;
- les actions respectent les permissions ;
- les informations sont à jour.

Ecran 1 
# Écran 2 — Fiche Contrat

## Objectif

Permettre de consulter et de gérer toutes les informations relatives à un Contrat.

La fiche Contrat constitue la référence de la solution mise en place pour le Client.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

La fiche affiche :

- Numéro du Contrat
- Référence du partenaire
- Produit
- Partenaire
- Client
- Projet d'origine
- Conseiller référent
- Statut
- Date d'effet
- Date d'échéance
- Date de création

---

## Vue d'ensemble

La fiche présente un résumé comprenant :

- Garanties principales
- Prochaine échéance
- Dernière action réalisée
- Dernier document signé
- Dernière modification
- Alertes en cours

---

## Accès rapide

Depuis la fiche Contrat, l'utilisateur accède directement à :

- Projet d'origine
- Client
- Documents
- Activités
- Échéances
- Sinistres (si applicable)
- Avenants
- Historique

---

## Actions disponibles

- Modifier
- Ajouter un avenant
- Ajouter une activité
- Générer un document
- Déclarer un sinistre (si applicable)
- Résilier
- Archiver

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations du Contrat sont centralisées ;
- les liens vers les autres modules fonctionnent ;
- les composants transverses sont utilisés ;
- les permissions sont respectées.


# Écran 3 — Informations générales du Contrat

## Objectif

Centraliser les informations administratives et contractuelles du Contrat.

Ces informations permettent d'identifier précisément le contrat souscrit.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Identification

Le Contrat comporte les informations suivantes :

- Numéro interne
- Numéro du partenaire
- Produit
- Version du produit
- Partenaire
- Client
- Projet d'origine

---

## Dates

Le Contrat comporte :

- Date de création
- Date de souscription
- Date d'effet
- Date d'échéance
- Date de renouvellement (si applicable)
- Date de résiliation (si applicable)

---

## Situation du contrat

Le Contrat possède :

- Statut
- Motif du statut (si applicable)
- Mode de paiement
- Fractionnement (mensuel, trimestriel, annuel...)

---

## Responsable

Le Contrat affiche :

- Conseiller référent
- Gestionnaire (si différent)
- Cabinet

---

## Informations complémentaires

Le conseiller peut renseigner :

- Référence interne
- Commentaires
- Observations

---

## Actions disponibles

- Modifier les informations
- Consulter le Projet d'origine
- Consulter le Client
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations administratives sont présentes ;
- les dates sont cohérentes ;
- les liens vers le Client et le Projet fonctionnent ;
- les modifications sont historisées.

# Écran 4 — Garanties du Contrat

## Objectif

Permettre de consulter l'ensemble des garanties couvertes par le Contrat.

Cet écran donne une vision claire de ce qui est réellement assuré.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Garanties principales

Pour chaque garantie :

- Nom
- Niveau de couverture
- Capital garanti (si applicable)
- Plafond
- Franchise
- Statut (Active / Suspendue)

---

## Garanties optionnelles

Affichage des garanties souscrites en option.

Pour chaque option :

- Nom
- Date d'effet
- Statut

---

## Exclusions

Liste des principales exclusions prévues au contrat.

---

## Conditions particulières

Affichage des conditions spécifiques :

- Clauses particulières
- Restrictions
- Conditions négociées
- Observations

---

## Évolution des garanties

Historique des modifications :

- Ajout d'une garantie
- Suppression
- Modification
- Changement de niveau de couverture

---

## Actions disponibles

- Consulter le détail d'une garantie
- Ajouter une garantie (si autorisé)
- Modifier
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les garanties sont clairement identifiées ;
- les garanties optionnelles sont distinguées ;
- les exclusions sont consultables ;
- les modifications sont historisées.

# Écran 5 — Échéances du Contrat

## Objectif

Permettre de suivre toutes les échéances importantes du Contrat afin d'assurer un suivi proactif du Client.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Échéances affichées

Le Contrat peut comporter les échéances suivantes :

- Date d'effet
- Première échéance
- Échéance annuelle
- Date anniversaire
- Date de renouvellement
- Date limite de résiliation
- Fin de contrat

La liste est adaptable selon le type de Produit.

---

## Alertes

La plateforme peut générer des alertes avant une échéance.

Exemples :

- 90 jours avant
- 60 jours avant
- 30 jours avant
- 15 jours avant
- 7 jours avant
- Jour J

Les délais sont paramétrables.

---

## Actions automatiques

Selon les règles du cabinet, une échéance peut déclencher :

- Création d'une activité
- Notification au conseiller
- Email au Client
- Proposition de revue annuelle
- Ouverture d'un nouveau Projet

---

## Historique

Chaque échéance conserve :

- Date de création
- Dernière modification
- Dernière notification envoyée
- Historique des actions réalisées

---

## Actions disponibles

- Ajouter une échéance
- Modifier
- Désactiver
- Marquer comme traitée
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les échéances sont visibles ;
- les alertes sont générées correctement ;
- les actions automatiques fonctionnent ;
- les modifications sont historisées.

# Écran 6 — Avenants

## Objectif

Permettre de gérer toutes les modifications apportées à un Contrat après sa mise en place.

Un avenant modifie un Contrat existant sans créer un nouveau Contrat.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Liste des avenants

Pour chaque avenant :

- Numéro
- Type d'avenant
- Date de demande
- Date d'effet
- Statut
- Conseiller

---

## Types d'avenants

Exemples :

- Modification des garanties
- Ajout d'une option
- Suppression d'une option
- Changement de bénéficiaire
- Modification des coordonnées
- Changement de cotisation
- Autre

La liste est personnalisable.

---

## Détail des modifications

Pour chaque avenant, la plateforme affiche :

- Les éléments modifiés
- Ancienne valeur
- Nouvelle valeur
- Motif de la modification

---

## Documents associés

Chaque avenant peut être lié à :

- Demande d'avenant
- Avenant signé
- Courriers
- Pièces justificatives

---

## Historique

Tous les avenants sont conservés.

Il est possible de consulter l'historique complet des modifications du Contrat.

---

## Actions disponibles

- Créer un avenant
- Modifier
- Générer les documents
- Consulter l'historique
- Annuler (selon les droits)

---

## Critères de validation

L'écran est conforme lorsque :

- tous les avenants sont historisés ;
- les modifications sont clairement identifiées ;
- les documents sont liés à l'avenant ;
- les permissions sont respectées.

# Écran 7 — Documents du Contrat

## Objectif

Centraliser tous les documents liés au Contrat tout au long de son cycle de vie.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Types de documents

Le Contrat peut contenir :

- Bulletin d'adhésion
- Conditions particulières
- Conditions générales
- Certificat d'adhésion
- Attestation d'assurance
- Avenants
- Courriers
- Pièces justificatives
- Autres documents

---

## Informations affichées

Pour chaque document :

- Nom
- Type
- Version
- Date
- Statut
- Signé (Oui / Non)

---

## Gestion documentaire

Pour chaque document, il est possible de :

- Prévisualiser
- Télécharger
- Envoyer au Client
- Demander une signature
- Archiver

---

## Vérifications

La plateforme contrôle :

- Documents obligatoires présents
- Documents expirés
- Documents en attente de signature

---

## Historique

Toutes les actions sont historisées :

- Création
- Modification
- Signature
- Téléchargement
- Archivage

---

## Actions disponibles

- Ajouter un document
- Générer un document
- Envoyer
- Demander une signature
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- tous les documents sont centralisés ;
- les signatures sont suivies ;
- les documents obligatoires sont contrôlés ;
- les modifications sont historisées.

# Écran 8 — Sinistres liés au Contrat

## Objectif

Permettre de consulter et de suivre les sinistres liés à un Contrat.

Le module ne remplace pas le système de gestion des sinistres du partenaire, mais permet au cabinet d'assurer le suivi du Client.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Liste des sinistres

Pour chaque sinistre :

- Numéro du sinistre
- Type
- Date de survenance
- Date de déclaration
- Statut
- Gestionnaire
- Partenaire

---

## Informations

Chaque sinistre comporte :

- Description
- Garanties concernées
- Montant estimé (si connu)
- Montant indemnisé (si connu)
- Date de clôture
- Motif de clôture

---

## Documents associés

Chaque sinistre peut contenir :

- Déclaration
- Photos
- Rapports
- Courriers
- Expertises
- Justificatifs

---

## Activités

Le conseiller peut créer des activités de suivi :

- Relance
- Appel
- Rendez-vous
- Demande de pièces
- Suivi d'indemnisation

---

## Historique

Toutes les étapes du suivi sont historisées.

---

## Actions disponibles

- Déclarer un sinistre
- Ouvrir le dossier
- Ajouter une activité
- Ajouter un document
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- tous les sinistres sont consultables ;
- les documents sont accessibles ;
- le suivi est historisé ;
- les permissions sont respectées.

# Écran 9 — Vie du Contrat

## Objectif

Suivre tous les événements importants intervenant pendant la durée de vie du Contrat.

Cet écran permet d'avoir une vision chronologique de l'évolution du Contrat.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Événements

Le Contrat peut enregistrer notamment :

- Souscription
- Mise en effet
- Renouvellement
- Modification
- Avenant
- Changement de cotisation
- Changement de garanties
- Suspension
- Réactivation
- Résiliation
- Échéance

---

## Chronologie

Les événements sont affichés dans l'ordre chronologique.

Pour chaque événement :

- Date
- Type
- Description
- Auteur
- Commentaires
- Documents associés

---

## Alertes

La plateforme peut signaler :

- Contrat proche de son échéance
- Contrat suspendu
- Contrat résilié
- Contrat sans suivi depuis longtemps

---

## Suivi

Chaque événement peut donner lieu à :

- Une activité
- Une notification
- Un document
- Un rappel

Selon les règles définies par le cabinet.

---

## Actions disponibles

- Ajouter un événement
- Consulter un événement
- Ouvrir les documents liés
- Ouvrir les activités liées
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- tous les événements sont historisés ;
- la chronologie est cohérente ;
- les liens avec les autres modules fonctionnent ;
- les permissions sont respectées.

# Écran 10 — Clôture et fin du Contrat

## Objectif

Permettre d'enregistrer la fin de vie d'un Contrat tout en conservant son historique et sa traçabilité.

Le Contrat reste consultable même après sa clôture.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Motif de fin

Le Contrat peut prendre fin pour les raisons suivantes :

- Résiliation à l'initiative du Client
- Résiliation par le partenaire
- Arrivée à échéance
- Remplacement par un nouveau Contrat
- Décès de l'assuré
- Défaut de paiement
- Autre

La liste est personnalisable.

---

## Informations enregistrées

Pour chaque fin de Contrat :

- Date de fin
- Motif
- Commentaire
- Auteur
- Documents associés

---

## Vérifications

Avant de clôturer le Contrat, la plateforme vérifie :

- Les activités en cours
- Les sinistres ouverts
- Les documents en attente
- Les échéances non traitées

En cas d'anomalie, un avertissement est affiché.

---

## Actions proposées

Selon le contexte, la plateforme peut proposer :

- Créer un nouveau Projet
- Proposer un nouveau Produit
- Programmer une relance
- Planifier un rendez-vous
- Archiver le Contrat

Ces actions restent soumises aux droits et aux Workflows.

---

## Archivage

Une fois clôturé :

- Le Contrat devient non modifiable (sauf autorisation particulière)
- Il reste consultable
- Son historique est conservé
- Tous les documents restent accessibles

---

## Critères de validation

L'écran est conforme lorsque :

- le motif de fin est enregistré ;
- les contrôles sont effectués avant la clôture ;
- le Contrat reste consultable ;
- toutes les actions sont historisées.
