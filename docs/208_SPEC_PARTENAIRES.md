# 208_SPEC_PARTENAIRES

## Objet

Le module Partenaires permet de gérer l'ensemble des organismes et personnes avec lesquels le cabinet collabore.

Un Partenaire peut être associé à un ou plusieurs Produits, Projets ou Contrats.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

# Écran 1 — Liste des Partenaires

## Objectif

Permettre de consulter, rechercher et gérer l'ensemble des partenaires du cabinet.

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

- Nom
- Type de partenaire
- Statut
- Contact principal
- Nombre de Produits
- Nombre de Contrats
- Date de création

---

## Actions disponibles

- Ouvrir la fiche
- Créer un partenaire
- Modifier
- Archiver
- Exporter
- Ajouter aux favoris

---

## Filtres

- Type
- Statut
- Pays
- Conseiller référent
- Tags

---

## Critères de validation

L'écran est conforme lorsque :

- les partenaires sont facilement recherchables ;
- les filtres fonctionnent ;
- les informations sont à jour ;
- les permissions sont respectées.


# Écran 2 — Fiche Partenaire

## Objectif

Permettre de consulter et de gérer toutes les informations relatives à un Partenaire.

La fiche Partenaire constitue la référence unique de la relation entre le cabinet et ce partenaire.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

La fiche affiche :

- Nom du partenaire
- Type de partenaire
- Statut
- Référence interne
- Date de création
- Dernière mise à jour

---

## Coordonnées

Le partenaire comporte notamment :

- Adresse
- Téléphone
- Email
- Site internet

---

## Contact principal

Affichage du contact principal :

- Nom
- Fonction
- Téléphone
- Email

Le partenaire peut posséder plusieurs contacts.

---

## Vue d'ensemble

La fiche présente un résumé comprenant :

- Nombre de Produits
- Nombre de Projets
- Nombre de Contrats
- Dernière interaction
- Dernière activité

---

## Accès rapide

Depuis la fiche, l'utilisateur accède directement à :

- Produits
- Contrats
- Projets
- Contacts
- Documents
- Activités
- Historique

---

## Actions disponibles

- Modifier
- Ajouter un contact
- Ajouter une activité
- Ajouter un document
- Archiver
- Ajouter aux favoris

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations sont centralisées ;
- les liens vers les autres modules fonctionnent ;
- les informations sont historisées ;
- les permissions sont respectées.

# Écran 3 — Informations générales du Partenaire

## Objectif

Centraliser toutes les informations administratives et juridiques du Partenaire.

Ces informations permettent d'identifier précisément chaque partenaire du cabinet.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Identification

Le partenaire comporte les informations suivantes :

- Type de partenaire
- Raison sociale
- Nom commercial (si différent)
- Référence interne
- Statut

---

## Informations administratives

Selon le type de partenaire :

- SIREN
- SIRET
- Code APE / NAF
- Forme juridique
- Numéro ORIAS (si applicable)
- Numéro TVA intracommunautaire (si applicable)

---

## Coordonnées

- Adresse principale
- Téléphone
- Email
- Site internet

Le partenaire peut posséder plusieurs adresses.

---

## Responsable interne

Le cabinet peut désigner :

- Conseiller référent
- Gestionnaire référent
- Responsable du partenariat

---

## Informations complémentaires

Le conseiller peut renseigner :

- Description
- Observations
- Notes internes

---

## Actions disponibles

- Modifier les informations
- Consulter l'historique
- Archiver

---

## Critères de validation

L'écran est conforme lorsque :

- les informations administratives sont complètes ;
- les coordonnées sont à jour ;
- un responsable interne est défini ;
- les modifications sont historisées.

# Écran 4 — Contacts du Partenaire

## Objectif

Permettre de gérer toutes les personnes de contact d'un Partenaire.

Un Partenaire peut posséder plusieurs contacts ayant des rôles différents.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Liste des contacts

Pour chaque contact :

- Nom
- Prénom
- Fonction
- Service
- Téléphone
- Email
- Statut

---

## Rôles possibles

Exemples :

- Inspecteur commercial
- Gestionnaire
- Support
- Responsable régional
- Responsable conformité
- Responsable technique
- Comptabilité
- Direction
- Autre

La liste est personnalisable.

---

## Informations complémentaires

Pour chaque contact, il est possible de renseigner :

- Date de début de relation
- Date de fin (si applicable)
- Préférences de contact
- Commentaires

---

## Contact principal

Un seul contact peut être défini comme :

- Contact principal

Il sera utilisé par défaut dans les échanges.

---

## Actions disponibles

- Ajouter un contact
- Modifier
- Désactiver
- Définir comme contact principal
- Envoyer un email
- Appeler

---

## Critères de validation

L'écran est conforme lorsque :

- plusieurs contacts peuvent être enregistrés ;
- un seul contact principal est défini ;
- les rôles sont clairement identifiés ;
- les modifications sont historisées.


# Écran 5 — Produits distribués

## Objectif

Permettre de visualiser tous les Produits proposés par un Partenaire.

Cet écran facilite le pilotage de l'offre commerciale du cabinet.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 205_SPEC_PRODUITS.md

---

## Liste des Produits

Pour chaque Produit :

- Nom
- Catégorie
- Version
- Statut
- Date de mise à disposition
- Référence partenaire

---

## Informations spécifiques

Pour chaque Produit, il est possible de consulter :

- Code produit partenaire
- Convention applicable
- Documents associés
- Conditions particulières
- Contact référent

---

## Disponibilité

Le Produit peut être :

- Disponible
- Suspendu
- Retiré

Cette disponibilité est propre au Partenaire.

---

## Actions disponibles

- Associer un Produit
- Retirer un Produit
- Ouvrir la fiche Produit
- Consulter les documents
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- tous les Produits du Partenaire sont visibles ;
- les informations sont à jour ;
- les liens vers les Produits fonctionnent ;
- les modifications sont historisées.


# Écran 6 — Conventions et accords

## Objectif

Permettre de gérer les conventions, accords commerciaux et conditions de collaboration avec chaque Partenaire.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

Pour chaque convention :

- Nom
- Référence
- Partenaire
- Type de convention
- Statut

---

## Dates

La convention comporte :

- Date de signature
- Date d'effet
- Date d'échéance
- Date de renouvellement (si applicable)

---

## Conditions

Le cabinet peut renseigner :

- Produits concernés
- Conditions particulières
- Conditions commerciales
- Modalités de collaboration
- Observations

---

## Documents associés

Chaque convention peut contenir :

- Convention signée
- Annexes
- Conditions commerciales
- Avenants
- Courriers

---

## Alertes

La plateforme peut générer des alertes pour :

- Convention arrivant à échéance
- Convention expirée
- Document manquant
- Renouvellement à prévoir

---

## Actions disponibles

- Ajouter une convention
- Modifier
- Renouveler
- Archiver
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les conventions sont centralisées ;
- les échéances sont suivies ;
- les documents sont accessibles ;
- les modifications sont historisées.

# Écran 7 — Performance du Partenaire

## Objectif

Permettre au cabinet d'évaluer la qualité et les performances de chaque Partenaire.

Ces indicateurs facilitent le pilotage des relations partenaires.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Indicateurs

La plateforme affiche notamment :

- Nombre de Produits
- Nombre de Projets
- Nombre de Contrats
- Nombre de Contrats actifs
- Nombre de Contrats résiliés
- Taux de transformation
- Ancienneté du partenariat

---

## Qualité de service

Le cabinet peut suivre :

- Délai moyen de réponse
- Délai moyen de traitement
- Nombre de réclamations
- Nombre de dossiers en attente
- Niveau de satisfaction (si utilisé)

---

## Activité

La plateforme présente :

- Dernière interaction
- Dernier Projet
- Dernier Contrat
- Dernière activité

---

## Alertes

La plateforme peut signaler :

- Aucun dossier récent
- Convention arrivant à échéance
- Délai de traitement élevé
- Nombre important de dossiers en attente

---

## Actions disponibles

- Consulter les statistiques
- Ouvrir les Projets
- Ouvrir les Contrats
- Exporter les données

---

## Critères de validation

L'écran est conforme lorsque :

- les indicateurs sont fiables ;
- les statistiques sont actualisées ;
- les alertes sont pertinentes ;
- les permissions sont respectées.


# Écran 8 — Activités et échanges

## Objectif

Centraliser tous les échanges entre le cabinet et le Partenaire afin d'assurer un suivi complet de la relation.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 202_SPEC_ACTIVITES.md

---

## Historique des échanges

La plateforme affiche notamment :

- Appels
- Emails
- Rendez-vous
- Visioconférences
- Courriers
- Notes
- Tâches

---

## Informations affichées

Pour chaque activité :

- Type
- Objet
- Date
- Auteur
- Responsable
- Statut

---

## Compte-rendu

Chaque activité peut comporter :

- Résumé
- Décisions prises
- Actions à réaliser
- Documents associés

---

## Suivi

Depuis cet écran, il est possible de :

- Planifier un rendez-vous
- Programmer une relance
- Affecter une tâche
- Ajouter un commentaire

---

## Historique

Toutes les activités sont conservées.

Les modifications sont historisées.

---

## Actions disponibles

- Créer une activité
- Modifier
- Clôturer
- Ouvrir l'activité
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- tous les échanges sont centralisés ;
- les activités sont accessibles ;
- les liens avec les autres modules fonctionnent ;
- les permissions sont respectées.


# Écran 9 — Documents du Partenaire

## Objectif

Centraliser tous les documents liés à un Partenaire afin de faciliter leur consultation et leur suivi.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 207_SPEC_DOCUMENTS.md

---

## Types de documents

Le Partenaire peut être associé notamment à :

- Convention
- Annexe
- Conditions commerciales
- Guide de souscription
- Procédure
- Grille tarifaire (si applicable)
- Documentation commerciale
- Courriers
- Notes internes
- Autres documents

---

## Informations affichées

Pour chaque document :

- Nom
- Type
- Version
- Date
- Statut
- Auteur

---

## Gestion documentaire

Depuis cet écran, il est possible de :

- Prévisualiser
- Télécharger
- Envoyer
- Archiver
- Consulter les versions
- Consulter l'historique

---

## Vérifications

La plateforme peut signaler :

- Document obligatoire manquant
- Nouvelle version disponible
- Document expiré
- Convention arrivée à échéance

---

## Actions disponibles

- Ajouter un document
- Modifier
- Ouvrir
- Télécharger
- Archiver
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- tous les documents sont centralisés ;
- les versions sont conservées ;
- les documents sont facilement retrouvables ;
- les permissions sont respectées.

# Écran 10 — Vue 360° du Partenaire

## Objectif

Offrir une vision complète d'un Partenaire en regroupant sur un seul écran toutes les informations utiles à son suivi.

Cette vue permet au cabinet de piloter efficacement la relation avec chaque Partenaire.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Résumé

La vue affiche :

- Nom
- Type de partenaire
- Statut
- Responsable interne
- Contact principal
- Date de début du partenariat
- Dernière interaction

---

## Activité

Résumé de l'activité du partenaire :

- Nombre de Produits
- Nombre de Projets
- Nombre de Contrats
- Dernier dossier créé
- Dernière activité

---

## Conventions

Affichage des informations principales :

- Convention active
- Date d'échéance
- Renouvellement à prévoir
- Alertes éventuelles

---

## Documents

Résumé documentaire :

- Nombre de documents
- Dernière version publiée
- Documents obligatoires manquants
- Documents arrivant à échéance

---

## Alertes

La plateforme peut afficher :

- Convention expirée
- Aucun contact principal
- Produit retiré
- Document manquant
- Activité à relancer

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Créer une activité
- Ajouter un contact
- Ouvrir les Produits
- Ouvrir les Contrats
- Consulter les Documents
- Envoyer un email
- Planifier un rendez-vous

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations essentielles sont visibles sur un seul écran ;
- les alertes sont clairement identifiées ;
- les actions rapides sont accessibles ;
- les liens avec les autres modules fonctionnent.
