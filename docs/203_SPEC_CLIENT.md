# 203_SPEC_CLIENT

## Objet

Le module Client permet de gérer l'ensemble des informations relatives aux clients du cabinet.

Le Client constitue le point d'entrée de la relation commerciale.

Il regroupe les informations administratives, les coordonnées, les consentements et l'historique global.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
# Écran 1 — Liste des Clients

## Objectif

Permettre de rechercher, consulter et gérer l'ensemble des Clients du cabinet.

---

## Dépendances

Ce module utilise les composants transverses :

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

- Nom / Raison sociale
- Type (Particulier / Professionnel)
- Statut
- Conseiller référent
- Nombre de Projets
- Nombre de Contrats
- Dernière interaction
- Tags

---

## Actions disponibles

- Ouvrir la fiche Client
- Créer un Client
- Modifier
- Archiver
- Exporter
- Ajouter aux favoris

---

## Filtres

- Statut
- Conseiller
- Type de client
- Tags
- Date de création
- Dernière activité

---

## Critères de validation

L'écran est conforme lorsque :

- les Clients sont recherchables ;
- les filtres fonctionnent ;
- les actions respectent les permissions ;
- les informations sont à jour.

# Écran 3 — Identité du Client

## Objectif

Centraliser toutes les informations d'identification du Client.

Ces informations sont utilisées dans l'ensemble de la plateforme.

---

## Personne physique

Informations disponibles :

- Civilité
- Nom
- Nom de naissance (si applicable)
- Prénom
- Date de naissance
- Lieu de naissance
- Nationalité
- Situation familiale
- Régime matrimonial (si applicable)
- Profession
- Employeur
- Date d'entrée dans l'entreprise (optionnelle)

---

## Personne morale

Informations disponibles :

- Raison sociale
- Forme juridique
- SIREN
- SIRET
- Code APE / NAF
- Date de création
- Capital social (optionnel)
- Représentant légal
- Effectif (optionnel)

---

## Identification fiscale

Selon le type de Client :

- Numéro fiscal (si nécessaire)
- Pays de résidence fiscale
- Autres informations réglementaires si applicables

---

## Contrôles automatiques

La plateforme vérifie notamment :

- les doublons ;
- les champs obligatoires ;
- la cohérence des formats (email, téléphone, SIREN…).

---

## Actions disponibles

- Modifier les informations
- Consulter l'historique des modifications
- Ajouter des justificatifs (via les Pièces jointes)

---

## Critères de validation

L'écran est conforme lorsque :

- les informations sont complètes ;
- les contrôles de cohérence fonctionnent ;
- les modifications sont historisées.

# Écran 4 — Coordonnées et moyens de communication

## Objectif

Centraliser tous les moyens de communication du Client.

Ces informations sont utilisées par l'ensemble de la plateforme pour contacter le Client et tracer les échanges.

---

## Adresse principale

- Numéro
- Voie
- Complément d'adresse
- Code postal
- Ville
- Département
- Pays

---

## Adresses complémentaires

Le Client peut posséder plusieurs adresses :

- Domicile
- Correspondance
- Facturation
- Siège social (professionnel)
- Établissement secondaire

Une seule adresse peut être définie comme adresse principale.

---

## Téléphones

Le Client peut enregistrer plusieurs numéros :

- Mobile principal
- Mobile secondaire
- Téléphone fixe
- Téléphone professionnel

Pour chaque numéro :

- Libellé
- Numéro
- Préférence de contact (Oui / Non)

---

## Adresses e-mail

Le Client peut enregistrer plusieurs adresses e-mail.

Pour chaque adresse :

- Adresse e-mail
- Libellé
- Adresse principale (Oui / Non)

---

## Préférences de communication

Le Client peut indiquer ses préférences :

- Téléphone
- E-mail
- SMS
- Courrier postal
- Espace Client

Plusieurs préférences peuvent être sélectionnées.

---

## Vérifications automatiques

La plateforme contrôle :

- le format des e-mails ;
- le format des numéros de téléphone ;
- les adresses principales uniques.

---

## Actions disponibles

- Ajouter une coordonnée
- Modifier
- Désactiver
- Définir comme principale

---

## Critères de validation

L'écran est conforme lorsque :

- plusieurs coordonnées peuvent être enregistrées ;
- une seule coordonnée principale existe par catégorie ;
- les contrôles automatiques fonctionnent ;
- les modifications sont historisées.

# Écran 5 — Situation personnelle et familiale

## Objectif

Centraliser les informations personnelles et familiales utiles au devoir de conseil, à l'analyse des besoins et aux futures recommandations.

---

## Situation personnelle

Le Client peut renseigner :

- Situation familiale
- Régime matrimonial
- Nombre d'enfants
- Personnes à charge
- Date d'union (si applicable)
- Date de séparation ou divorce (si applicable)

---

## Conjoint / Partenaire

Le Client peut être lié à un autre Client de la plateforme.

Informations :

- Nom
- Prénom
- Type de lien :
  - Marié
  - PACS
  - Concubin
  - Divorcé
  - Séparé
  - Veuf

Le lien est bidirectionnel.

---

## Enfants

Le Client peut être lié à un ou plusieurs enfants.

Pour chaque enfant :

- Nom
- Prénom
- Date de naissance
- Lien de parenté

Les enfants peuvent être :

- de simples informations ;
- ou devenir eux-mêmes des Clients plus tard.

---

## Personnes de confiance

Possibilité d'enregistrer :

- Contact d'urgence
- Personne de confiance
- Représentant légal
- Tuteur / Curateur (si applicable)

---

## Événements de vie

Le Client peut enregistrer des événements importants :

- Mariage
- PACS
- Divorce
- Naissance
- Adoption
- Décès
- Départ à la retraite

Ces événements pourront alimenter les rappels et les recommandations.

---

## Actions disponibles

- Ajouter
- Modifier
- Désactiver
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- plusieurs liens familiaux peuvent être enregistrés ;
- les liens entre Clients sont cohérents ;
- les événements de vie sont historisés ;
- les informations sont réutilisables par les autres modules.

# Écran 6 — Consentements et conformité

## Objectif

Centraliser l'ensemble des consentements du Client ainsi que les informations réglementaires nécessaires à la conformité du cabinet.

Cet écran permet de démontrer que le cabinet respecte les obligations légales et réglementaires.

---

## Consentements

Le Client peut donner ou retirer son consentement pour :

- Communications commerciales
- Email
- SMS
- Téléphone
- Courrier postal
- Espace Client

Pour chaque consentement :

- Statut (Accepté / Refusé)
- Date de recueil
- Mode de recueil
- Date de retrait (si applicable)

---

## Conformité RGPD

Suivi des éléments suivants :

- Date de création de la fiche
- Base légale du traitement
- Date de dernière mise à jour
- Demande d'accès aux données
- Demande de rectification
- Demande d'effacement
- Demande de portabilité

Toutes les demandes sont historisées.

---

## Conformité DDA / ACPR

La plateforme indique notamment :

- DER remis
- DER accepté
- Date de remise
- Date d'acceptation
- Version du DER

Les autres éléments réglementaires (Recueil des besoins, Devoir de conseil...) sont suivis dans les modules concernés.

---

## Vérifications

La plateforme contrôle automatiquement :

- les consentements obligatoires ;
- les documents réglementaires manquants ;
- les échéances de mise à jour.

---

## Actions disponibles

- Modifier un consentement
- Ajouter une preuve
- Consulter l'historique
- Générer un rapport de conformité

---

## Critères de validation

L'écran est conforme lorsque :

- tous les consentements sont historisés ;
- les obligations réglementaires sont suivies ;
- les modifications sont tracées ;
- les alertes de conformité fonctionnent.

# Écran 7 — Relations Client

## Objectif

Permettre de visualiser toutes les relations du Client avec les autres objets métier de la plateforme.

Cet écran offre une vision globale de l'écosystème du Client.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Relations affichées

### Projets

Liste de tous les Projets du Client.

Pour chaque Projet :

- Nom
- Statut
- Date de création
- Responsable
- Accès direct

---

### Contrats

Liste des Contrats du Client.

Pour chaque Contrat :

- Produit
- Compagnie / Partenaire
- Statut
- Date d'effet
- Date d'échéance
- Accès direct

---

### Activités

Historique des Activités liées au Client.

Exemples :

- Rendez-vous
- Appels
- Emails
- Tâches
- Notes

---

### Documents

Tous les Documents métier liés au Client.

Exemples :

- DER
- Recueil des besoins
- Devoir de conseil
- Courriers

---

### Partenaires

Liste des partenaires intervenant sur les dossiers du Client.

Exemples :

- Assureurs
- Grossistes
- Banques

---

## Vue synthétique

L'écran affiche également des indicateurs :

- Nombre de Projets
- Nombre de Contrats
- Nombre d'Activités
- Nombre de Documents
- Dernière interaction
- Dernière mise à jour

---

## Actions disponibles

- Ouvrir un Projet
- Ouvrir un Contrat
- Ouvrir un Document
- Ouvrir une Activité
- Créer un nouveau Projet

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les relations sont visibles ;
- les liens ouvrent le bon module ;
- les informations sont actualisées en temps réel ;
- les permissions sont respectées.


# Écran 8 — Synthèse Client (Vue 360°)

## Objectif

Offrir au conseiller une vision complète du Client en une seule page.

Cette vue permet de comprendre rapidement la situation du Client sans parcourir plusieurs écrans.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Résumé général

Affichage de :

- Nom du Client
- Statut
- Conseiller référent
- Ancienneté
- Dernière interaction
- Score de conformité
- Nombre de Projets en cours

---

## Résumé des Projets

Affiche :

- Projets actifs
- Projets en attente
- Projets clôturés

Accès direct à chaque Projet.

---

## Résumé des Contrats

Affiche :

- Nombre de Contrats
- Contrats actifs
- Contrats arrivant à échéance
- Contrats résiliés

---

## Résumé des Activités

Affiche :

- Dernière activité
- Prochain rendez-vous
- Activités en retard
- Activités prévues aujourd'hui

---

## Résumé documentaire

Affiche :

- Documents obligatoires présents
- Documents manquants
- Dernier document généré
- Dernière signature

---

## Alertes

Mise en avant des points nécessitant une attention immédiate.

Exemples :

- Pièce justificative manquante
- DER non signé
- Contrat arrivant à échéance
- Projet bloqué

---

## Recommandations IA

Le Service IA peut proposer :

- une relance ;
- une revue annuelle ;
- une opportunité commerciale ;
- une mise à jour réglementaire.

Les recommandations restent consultatives.

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Créer un Projet
- Ajouter une Activité
- Contacter le Client
- Générer un document
- Planifier un rendez-vous

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations clés sont visibles en moins de 30 secondes ;
- les alertes sont pertinentes ;
- les recommandations IA sont explicables ;
- les actions rapides fonctionnent correctement.

# Écran 9 — Contacts liés au Client

## Objectif

Permettre de gérer toutes les personnes en lien avec le Client.

Un Client peut avoir plusieurs contacts selon sa situation.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Contacts possibles

Le Client peut être lié à :

- Conjoint
- Enfant
- Représentant légal
- Comptable
- Avocat
- Notaire
- Expert-comptable
- RH
- Assistant
- Personne de confiance
- Contact d'urgence
- Toute autre personne utile

---

## Informations affichées

Pour chaque contact :

- Nom
- Prénom
- Fonction / Rôle
- Téléphone
- Email
- Type de relation
- Autorisation de contact
- Autorisation de recevoir des documents (si applicable)

---

## Lien avec la plateforme

Un contact peut être :

- une simple fiche de contact ;
- ou un Client existant.

Si le contact devient Client, la plateforme relie automatiquement les deux fiches sans créer de doublon.

---

## Actions disponibles

- Ajouter un contact
- Modifier
- Désactiver
- Ouvrir la fiche du contact (si c'est un Client)
- Envoyer un email
- Appeler

---

## Critères de validation

L'écran est conforme lorsque :

- plusieurs contacts peuvent être associés ;
- les rôles sont clairement identifiés ;
- les liens entre Clients fonctionnent ;
- les permissions sont respectées.

# Écran 10 — Espace Client

## Objectif

Permettre de gérer les accès du Client à son espace sécurisé et de suivre ses interactions avec la plateforme.

Cet écran centralise tout ce qui concerne le portail Client.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Compte Client

Informations affichées :

- Compte créé (Oui / Non)
- Statut du compte
- Date de création
- Dernière connexion
- Dernière activité
- Langue
- Fuseau horaire (si applicable)

---

## Accès

Le conseiller peut :

- Créer un accès
- Désactiver un accès
- Réactiver un accès
- Réinitialiser le mot de passe
- Envoyer une invitation

Le mot de passe n'est jamais visible.

---

## Droits du Client

Le cabinet peut autoriser ou non l'accès aux modules suivants :

- Mes Projets
- Mes Contrats
- Mes Documents
- Mes Rendez-vous
- Messagerie sécurisée
- Dépôt de documents
- Signature électronique
- Téléchargement de documents

Les droits sont configurables.

---

## Activité du Client

Affichage de :

- Dernière connexion
- Dernier document déposé
- Dernier document téléchargé
- Dernière signature
- Dernier message envoyé

---

## Sécurité

Affichage des informations suivantes :

- Authentification multifacteur activée (Oui / Non)
- Compte verrouillé (Oui / Non)
- Tentatives de connexion récentes
- Sessions actives (si applicable)

---

## Actions disponibles

- Ouvrir l'espace Client
- Envoyer une invitation
- Désactiver le compte
- Réinitialiser le mot de passe
- Consulter l'historique des connexions

---

## Critères de validation

L'écran est conforme lorsque :

- les droits d'accès sont correctement appliqués ;
- les connexions sont historisées ;
- les actions de sécurité fonctionnent ;
- les informations sont mises à jour en temps réel.
