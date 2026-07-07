# 207_SPEC_DOCUMENTS

## Objet

Le module Documents permet de gérer l'ensemble des documents métier de la plateforme.

Un document métier est un document généré, utilisé ou signé dans le cadre d'un Projet ou d'un Contrat.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

# Écran 1 — Bibliothèque des Documents

## Objectif

Permettre de consulter, rechercher et gérer l'ensemble des documents métier.

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

- Nom du document
- Type
- Client
- Projet
- Contrat
- Version
- Statut
- Date de création
- Dernière modification

---

## Actions disponibles

- Ouvrir
- Générer
- Télécharger
- Envoyer
- Archiver
- Exporter
- Ajouter aux favoris

---

## Filtres

- Type
- Statut
- Client
- Projet
- Contrat
- Conseiller
- Date
- Tags

---

## Critères de validation

L'écran est conforme lorsque :

- les documents sont facilement retrouvables ;
- les filtres fonctionnent ;
- les permissions sont respectées ;
- les informations sont à jour.

# Écran 2 — Fiche Document

## Objectif

Permettre de consulter toutes les informations relatives à un document métier.

La fiche Document constitue la référence unique du document.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

La fiche affiche :

- Nom du document
- Type de document
- Numéro de document (si applicable)
- Version
- Statut
- Date de création
- Date de dernière modification
- Auteur

---

## Liens métier

Le document peut être rattaché à :

- Un Client
- Un Projet
- Un Contrat
- Une Activité
- Un Produit

Chaque lien est accessible directement.

---

## Informations complémentaires

Le document comporte :

- Description
- Modèle utilisé (si généré)
- Langue
- Nombre de pages
- Taille du fichier

---

## Accès rapide

Depuis la fiche, l'utilisateur peut accéder directement à :

- L'objet métier associé
- Les versions précédentes
- Les signatures
- L'historique
- Les commentaires

---

## Actions disponibles

- Prévisualiser
- Télécharger
- Générer une nouvelle version
- Envoyer
- Demander une signature
- Archiver

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations du document sont centralisées ;
- les liens métier fonctionnent ;
- les versions sont accessibles ;
- les permissions sont respectées.

# Écran 3 — Types de documents

## Objectif

Définir et gérer les différents types de documents utilisés par le cabinet.

Chaque document appartient obligatoirement à un type.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Catégories de documents

Les documents peuvent appartenir notamment aux catégories suivantes :

### Documents réglementaires

- DER
- Recueil des besoins
- Devoir de conseil
- Lettre de mission
- Mandat

### Documents contractuels

- Bulletin d'adhésion
- Conditions particulières
- Conditions générales
- Attestation
- Certificat

### Documents commerciaux

- Proposition commerciale
- Comparatif
- Devis
- Simulation

### Documents administratifs

- Courrier
- Compte-rendu
- Formulaire
- Convention

La liste est administrable.

---

## Informations du type

Pour chaque type :

- Nom
- Catégorie
- Description
- Modèle associé (si applicable)
- Signature obligatoire (Oui / Non)
- Version obligatoire (Oui / Non)

---

## Actions disponibles

- Créer un type
- Modifier
- Désactiver
- Consulter les documents utilisant ce type

---

## Critères de validation

L'écran est conforme lorsque :

- chaque document possède un type ;
- les types sont administrables ;
- les catégories sont cohérentes ;
- les modifications sont historisées.


# Écran 4 — Génération de documents

## Objectif

Permettre de générer automatiquement des documents métier à partir des données de la plateforme.

La génération garantit des documents homogènes, complets et conformes.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Modèles disponibles

La plateforme peut générer notamment :

- DER
- Recueil des besoins
- Devoir de conseil
- Lettre de mission
- Proposition commerciale
- Comparatif
- Bulletin d'adhésion
- Attestation
- Courrier
- Compte-rendu

La liste est administrable.

---

## Source des données

Les informations sont récupérées automatiquement depuis :

- Le Client
- Le Projet
- Le Contrat
- Le Produit
- Les Activités
- Les Paramètres du cabinet

---

## Vérifications

Avant la génération, la plateforme vérifie :

- Les champs obligatoires
- Les informations manquantes
- Les incohérences éventuelles

Si des données sont absentes, un message est affiché.

---

## Résultat

Le document généré :

- reçoit un numéro (si applicable) ;
- est enregistré automatiquement ;
- est lié à son objet métier ;
- reçoit une version initiale.

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

- les documents sont générés automatiquement ;
- les données sont correctement intégrées ;
- les contrôles sont réalisés avant génération ;
- le document est enregistré dans la bibliothèque.

# Écran 5 — Signature électronique

## Objectif

Permettre de gérer la signature électronique des documents nécessitant une validation par le Client ou une autre partie.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations affichées

Pour chaque demande de signature :

- Document
- Signataire(s)
- Statut
- Date d'envoi
- Date de signature
- Date d'expiration (si applicable)

---

## Statuts

Une demande de signature peut être :

- À envoyer
- Envoyée
- Ouverte
- Signée
- Refusée
- Expirée
- Annulée

---

## Signataires

Un document peut être signé par :

- Le Client
- Le Co-client
- Le Représentant légal
- Le Conseiller (si applicable)
- Un tiers autorisé

L'ordre de signature peut être défini si nécessaire.

---

## Suivi

La plateforme conserve :

- Date d'envoi
- Date d'ouverture
- Date de signature
- Adresse IP (si disponible)
- Horodatage
- Certificat de signature (si fourni par le prestataire)

---

## Actions disponibles

- Envoyer en signature
- Relancer le signataire
- Annuler la demande
- Télécharger le document signé
- Consulter le certificat de signature

---

## Critères de validation

L'écran est conforme lorsque :

- le suivi des signatures est complet ;
- les statuts sont mis à jour automatiquement ;
- les preuves de signature sont conservées ;
- les permissions sont respectées.

# Écran 6 — Versions des documents

## Objectif

Permettre de suivre toutes les versions d'un document tout en garantissant la traçabilité.

Une nouvelle version ne remplace jamais définitivement une ancienne version.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Liste des versions

Pour chaque version :

- Numéro de version
- Date de création
- Auteur
- Statut
- Motif de création

---

## Comparaison

La plateforme permet de comparer deux versions afin d'identifier :

- Les informations ajoutées
- Les informations modifiées
- Les informations supprimées

---

## Version active

Une seule version peut être définie comme :

- Version active

Les anciennes versions restent consultables.

---

## Historique

Pour chaque version, la plateforme conserve :

- Date
- Auteur
- Motif
- Commentaires

---

## Actions disponibles

- Consulter une version
- Comparer deux versions
- Restaurer une ancienne version (selon les droits)
- Télécharger une version

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les versions sont conservées ;
- une seule version est active ;
- les comparaisons sont possibles ;
- les modifications sont historisées.

# Écran 7 — Diffusion des documents

## Objectif

Permettre d'envoyer et de partager les documents avec les destinataires autorisés tout en assurant leur traçabilité.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Destinataires

Un document peut être envoyé à :

- Client
- Co-client
- Partenaire
- Compagnie
- Collaborateur
- Apporteur d'affaires (si autorisé)
- Autre destinataire

---

## Modes d'envoi

La plateforme peut diffuser un document via :

- Email
- Espace Client
- Signature électronique
- Téléchargement
- API (si applicable)

La liste est évolutive.

---

## Informations enregistrées

Pour chaque envoi :

- Destinataire
- Mode d'envoi
- Date et heure
- Auteur
- Statut de l'envoi

---

## Suivi

La plateforme indique :

- Envoyé
- Distribué
- Consulté (si disponible)
- Téléchargé (si disponible)
- Échec de l'envoi

---

## Historique

Tous les envois sont historisés.

La plateforme conserve :

- Date
- Auteur
- Destinataire
- Canal utilisé
- Résultat

---

## Actions disponibles

- Envoyer
- Renvoyer
- Annuler un envoi (si possible)
- Consulter l'historique
- Télécharger le document

---

## Critères de validation

L'écran est conforme lorsque :

- tous les envois sont tracés ;
- le suivi est disponible ;
- les permissions sont respectées ;
- l'historique est conservé.


# Écran 8 — Archivage des documents

## Objectif

Permettre d'archiver les documents tout en garantissant leur conservation, leur intégrité et leur consultation.

L'archivage ne supprime jamais un document.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Archivage

Un document peut être :

- Actif
- Archivé

Un document archivé reste consultable selon les droits de l'utilisateur.

---

## Informations conservées

Pour chaque document archivé :

- Date d'archivage
- Auteur
- Motif
- Durée de conservation (si applicable)

---

## Conservation

Le document conserve :

- Toutes ses versions
- Son historique
- Ses signatures
- Ses liens avec les objets métier
- Ses preuves d'envoi

---

## Recherche

Les documents archivés restent accessibles via la recherche.

Ils sont clairement identifiés comme "Archivés".

---

## Actions disponibles

- Archiver
- Restaurer (si autorisé)
- Consulter
- Télécharger

---

## Critères de validation

L'écran est conforme lorsque :

- aucun document n'est supprimé lors de l'archivage ;
- toutes les informations sont conservées ;
- les documents archivés restent consultables ;
- les permissions sont respectées.


# Écran 9 — Conservation et conformité documentaire

## Objectif

Permettre de suivre la conformité des documents et de respecter les obligations légales de conservation.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations affichées

Pour chaque document :

- Durée de conservation
- Date de début de conservation
- Date de fin de conservation (si applicable)
- Statut de conformité
- Dernier contrôle
- Responsable

---

## Contrôles

La plateforme peut vérifier :

- Document obligatoire présent
- Document signé
- Version valide
- Durée de conservation respectée
- Document expiré (si applicable)

---

## Alertes

Des alertes peuvent être générées pour :

- Document manquant
- Signature manquante
- Document expiré
- Fin prochaine de la durée de conservation

---

## Rapports

La plateforme peut générer un rapport indiquant :

- Documents conformes
- Documents non conformes
- Documents à compléter
- Documents arrivant à échéance

---

## Actions disponibles

- Consulter le rapport
- Corriger une anomalie
- Générer un nouveau document
- Consulter l'historique

---

## Critères de validation

L'écran est conforme lorsque :

- les contrôles sont réalisés automatiquement ;
- les alertes sont pertinentes ;
- les rapports sont générés correctement ;
- les informations sont historisées.




# Écran 10 — Vue 360° du Document

## Objectif

Offrir une vision complète d'un document métier en regroupant toutes les informations utiles sur un seul écran.

Cette vue permet de comprendre rapidement le rôle du document, son état et son historique.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Résumé

La vue affiche :

- Nom du document
- Type
- Statut
- Version active
- Auteur
- Date de création
- Dernière modification

---

## Liens métier

Affichage des objets liés :

- Client
- Projet
- Contrat
- Produit
- Activité

Chaque lien est accessible directement.

---

## Signature

Affichage de :

- Signature requise (Oui / Non)
- Statut de signature
- Signataire(s)
- Date de signature
- Certificat (si disponible)

---

## Diffusion

Affichage de :

- Nombre d'envois
- Dernier destinataire
- Dernière consultation
- Dernier téléchargement

---

## Historique

Résumé des principaux événements :

- Création
- Génération
- Modification
- Envoi
- Signature
- Archivage

---

## Alertes

La plateforme peut afficher :

- Signature en attente
- Document expiré
- Nouvelle version disponible
- Document obligatoire manquant
- Anomalie de conformité

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Prévisualiser
- Télécharger
- Envoyer
- Demander une signature
- Générer une nouvelle version
- Consulter l'historique
- Archiver

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations essentielles sont visibles sur un seul écran ;
- les liens avec les autres modules fonctionnent ;
- les alertes sont pertinentes ;
- les actions rapides sont accessibles.




