# 198_MODELE_METIER

## Objet

Ce document définit le modèle métier officiel de la plateforme EJ Assurances.

Il constitue la référence unique décrivant les objets métier, leurs relations, leurs responsabilités et leurs règles d'interaction.

Toutes les spécifications fonctionnelles, la base de données, les API, les Services IA, les Workflows et les interfaces utilisateur devront respecter ce modèle.

En cas de contradiction entre une spécification et ce document, le présent document fait foi.

Le modèle métier représente la réalité fonctionnelle du cabinet et non son implémentation technique.

# Partie 1 — Les objets métier

## Objectif

Définir les objets fondamentaux manipulés par la plateforme EJ Assurances.

Chaque objet possède une responsabilité clairement identifiée.

---

## Les objets métier principaux

La plateforme est construite autour des objets suivants.

### Utilisateur

Représente une personne disposant d'un accès à la plateforme.

Exemples :

- Administrateur
- Dirigeant
- Collaborateur
- Mandataire
- Client (espace dédié)
- Partenaire (espace dédié)

---

### Client

Représente une personne physique ou morale accompagnée par le cabinet.

Le Client constitue le point de départ de la relation commerciale.

Il peut être :

- Prospect
- Client actif
- Ancien client

Le Prospect n'est pas un objet différent.

Il s'agit d'un Client dont le statut est "Prospect".

---

### Projet

Représente un besoin exprimé par un Client.

Le Projet constitue l'objet central de la plateforme.

Il regroupe toutes les actions nécessaires à la réponse apportée au Client.

Exemples :

- Assurance emprunteur
- Mutuelle
- Prévoyance
- Retraite
- Assurance professionnelle

---

### Contrat

Représente la solution effectivement mise en place à l'issue d'un Projet.

Un Projet peut produire :

- aucun Contrat ;
- un Contrat ;
- plusieurs Contrats.

---

### Activité

Représente toute action réalisée dans le cadre du suivi d'un objet métier.

Les Activités alimentent la chronologie du dossier.

---

### Document

Représente un document métier produit ou géré par la plateforme.

Exemples :

- DER
- Recueil des besoins
- Devoir de conseil
- Bulletin d'adhésion

---

### Produit

Représente une solution commercialisable.

Exemple :

- Contrat emprunteur
- Mutuelle
- Assurance vie
- Prévoyance

---

### Partenaire

Représente un organisme externe.

Exemples :

- Assureur
- Grossiste
- Banque
- Plateforme

---

## Principe fondamental

Les objets métier représentent les concepts du cabinet.

Ils ne doivent jamais être créés uniquement pour répondre à une contrainte technique.

# Partie 2 — Relations entre les objets métier

## Objectif

Définir les relations officielles entre les objets métier de la plateforme EJ Assurances.

Ces relations constituent le modèle de référence utilisé par :

- la base de données ;
- les API ;
- les Workflows ;
- les Services IA ;
- les interfaces utilisateur.

---

# Client

Un Client peut :

- posséder 0 à N Projets ;
- posséder 0 à N Contrats ;
- posséder 0 à N Documents ;
- posséder 0 à N Activités ;
- être rattaché à 0 à N Contacts (future évolution).

Chaque Projet appartient obligatoirement à un seul Client.

---

# Projet

Le Projet constitue le centre du modèle métier.

Un Projet :

- appartient à un seul Client ;
- possède 0 à N Activités ;
- possède 0 à N Documents ;
- possède 0 à N Produits étudiés ;
- possède 0 à N Contrats ;
- possède 0 à N Commentaires ;
- possède 0 à N Pièces jointes.

Le Projet représente un besoin.

Il est possible qu'un Projet ne produise jamais de Contrat (abandon, refus, étude sans suite...).

---

# Contrat

Un Contrat :

- appartient obligatoirement à un Projet ;
- est rattaché à un Client via son Projet ;
- possède ses propres Documents ;
- possède ses propres Activités de suivi ;
- peut faire l'objet de renouvellements ou d'avenants.

Le Contrat ne peut jamais exister sans Projet.

---

# Activité

Une Activité :

- est liée à un objet métier principal ;
- peut être liée à plusieurs objets secondaires ;
- possède un responsable unique ;
- possède éventuellement plusieurs participants ;
- produit éventuellement un ou plusieurs livrables.

Une Activité ne peut jamais être orpheline.

---

# Document

Un Document :

- est toujours rattaché à un objet métier ;
- peut être généré automatiquement ;
- peut être signé ;
- possède un historique de versions.

Un Document métier est distinct d'une pièce jointe.

---

# Produit

Un Produit :

- peut être étudié dans plusieurs Projets ;
- peut donner lieu à plusieurs Contrats ;
- est proposé par un ou plusieurs Partenaires.

Le Produit est une offre commerciale.

Il ne représente jamais un contrat souscrit.

---

# Partenaire

Un Partenaire :

- distribue un ou plusieurs Produits ;
- intervient dans un ou plusieurs Projets ;
- peut être associé à plusieurs Contrats.

Exemples :

- Assureur
- Grossiste
- Banque
- Organisme partenaire

---

## Principe fondamental

Les relations entre les objets sont permanentes.

Elles ne doivent jamais dépendre d'une interface utilisateur ou d'une implémentation technique.

Le modèle métier est la source de vérité de la plateforme.


# Partie 3 — Cycle de vie des objets métier

## Objectif

Définir les règles générales d'évolution des objets métier au sein de la plateforme EJ Assurances.

Chaque objet possède un cycle de vie propre mais respecte des principes communs.

Ces règles garantissent la cohérence des Workflows, des Services IA et des traitements automatiques.

---

## Principes généraux

Tous les objets métier suivent un cycle de vie.

Un objet peut :

- être créé ;
- être enrichi ;
- évoluer ;
- être clôturé ;
- être archivé.

Selon le type d'objet, certaines étapes peuvent être absentes.

---

# Client

Cycle de vie :

Prospect

↓

Client actif

↓

Client inactif

↓

Client archivé

Le changement de statut ne modifie jamais l'identité du Client.

---

# Projet

Cycle de vie :

Création

↓

Analyse

↓

En cours

↓

Finalisé

↓

Clôturé

↓

Archivé

Un Projet peut être clôturé sans produire de Contrat.

---

# Contrat

Cycle de vie :

Création

↓

En attente de signature

↓

Actif

↓

Suspendu (si applicable)

↓

Résilié ou arrivé à échéance

↓

Archivé

Les avenants et renouvellements prolongent le cycle de vie sans créer un nouvel historique.

---

# Activité

Le cycle de vie des Activités est défini dans le document `202_SPEC_ACTIVITES.md`.

Le présent document ne fait que s'y référer.

---

# Document

Cycle de vie :

Brouillon

↓

En préparation

↓

À valider

↓

Validé

↓

Signé (si applicable)

↓

Archivé

Les versions successives sont conservées.

---

# Produit

Cycle de vie :

Disponible

↓

Suspendu

↓

Retiré

↓

Archivé

---

# Partenaire

Cycle de vie :

Prospect

↓

Actif

↓

Suspendu

↓

Inactif

↓

Archivé

---

## Transitions

Les changements de cycle de vie peuvent être déclenchés :

- par un utilisateur autorisé ;
- par un Workflow ;
- par une échéance ;
- par une validation.

Les Services IA peuvent proposer une transition mais ne l'exécutent jamais sans validation humaine, sauf règle métier explicitement définie.

---

## Historisation

Chaque changement de cycle de vie est historisé.

La plateforme enregistre :

- l'ancien état ;
- le nouvel état ;
- l'auteur ;
- la date ;
- le motif (si applicable).

---

## Critères de validation

Le modèle sera considéré comme conforme lorsque :

- chaque objet possède un cycle de vie clairement défini ;
- les transitions sont cohérentes ;
- les changements sont historisés ;
- les Workflows utilisent ces règles de manière uniforme.

# Partie 4 — Responsabilités des objets métier

## Objectif

Définir précisément les responsabilités de chaque objet métier afin d'éviter les doublons, les incohérences et les dépendances inutiles.

Chaque objet possède un domaine de responsabilité clairement identifié.

Une information ne doit avoir qu'un seul propriétaire métier.

---

# Client

Le Client est responsable de :

- son identité ;
- ses coordonnées ;
- ses informations administratives ;
- ses consentements ;
- ses préférences de communication ;
- son historique relationnel global.

Le Client n'est jamais responsable :

- des contrats ;
- des projets ;
- des activités.

Il les possède, mais ne les gère pas.

---

# Projet

Le Projet est responsable :

- du besoin du Client ;
- de son avancement ;
- des produits étudiés ;
- des décisions prises ;
- des activités associées ;
- des documents associés ;
- des contrats générés.

Le Projet est l'objet central de la relation de conseil.

---

# Contrat

Le Contrat est responsable :

- de la solution mise en place ;
- de son état ;
- de ses échéances ;
- de ses garanties ;
- de ses avenants ;
- de son suivi.

Le Contrat ne connaît jamais le besoin initial.

Cette information appartient au Projet.

---

# Activité

L'Activité est responsable :

- des actions réalisées ;
- des actions à venir ;
- des participants ;
- du résultat obtenu ;
- des livrables produits.

Elle ne modifie jamais directement les données métier des autres objets.

---

# Document

Le Document est responsable :

- de son contenu ;
- de ses versions ;
- de ses signatures ;
- de sa validité.

Le Document ne possède jamais d'informations métier qui devraient appartenir au Projet ou au Contrat.

---

# Produit

Le Produit est responsable :

- de son offre ;
- de ses caractéristiques ;
- de ses options ;
- de sa disponibilité.

Le Produit ne connaît jamais les Clients.

---

# Partenaire

Le Partenaire est responsable :

- de son identité ;
- de ses conventions ;
- de ses produits distribués ;
- de ses coordonnées ;
- de ses conditions commerciales.

---

## Principe fondamental

Chaque information possède un propriétaire unique.

Une donnée ne doit jamais être dupliquée dans plusieurs objets métier.

Les autres objets y font référence sans en devenir propriétaires.

---

## Critères de validation

Le modèle sera considéré comme conforme lorsque :

- chaque donnée possède un propriétaire métier unique ;
- les responsabilités sont clairement séparées ;
- les modules respectent ces responsabilités ;
- aucune duplication fonctionnelle n'est constatée.

# Partie 5 — Principes fondamentaux du modèle métier

## Objectif

Définir les principes directeurs qui gouvernent l'ensemble du modèle métier d'EJ Assurances.

Ces principes constituent les règles de conception de référence.

Toute évolution future de la plateforme devra les respecter.

En cas de contradiction avec une spécification fonctionnelle ou technique, ces principes prévalent.

---

# Principe 1 — Le Projet est l'objet central

Le cabinet accompagne un besoin.

Le Projet représente ce besoin.

Les Contrats, Documents, Activités et Produits gravitent autour du Projet.

Le Contrat est une conséquence du Projet.

Jamais l'inverse.

---

# Principe 2 — Une donnée possède un propriétaire unique

Chaque donnée appartient à un seul objet métier.

Les autres objets y font uniquement référence.

Aucune duplication fonctionnelle n'est autorisée.

---

# Principe 3 — Les objets évoluent, ils ne disparaissent pas

Les objets suivent un cycle de vie.

Ils peuvent être :

- actifs ;
- clôturés ;
- archivés.

La suppression définitive reste exceptionnelle.

---

# Principe 4 — Les activités racontent l'histoire du dossier

Toutes les actions importantes sont représentées par des Activités.

Les Activités constituent la mémoire opérationnelle du cabinet.

---

# Principe 5 — Les documents représentent les preuves

Les Documents métier matérialisent les décisions, les analyses et les obligations réglementaires.

Ils constituent les preuves du conseil apporté.

---

# Principe 6 — Les Workflows accompagnent le métier

Les Workflows automatisent les processus.

Ils ne définissent jamais les règles métier.

Le modèle métier reste la source de vérité.

---

# Principe 7 — Les Services IA assistent l'utilisateur

Les Services IA :

- analysent ;
- proposent ;
- recommandent ;
- expliquent.

Ils ne prennent jamais une décision métier à la place de l'utilisateur, sauf automatisation explicitement validée et paramétrée.

---

# Principe 8 — La conformité est native

La conformité réglementaire n'est pas un module.

Elle est intégrée dans chaque objet métier.

Chaque fonctionnalité doit pouvoir être auditée.

---

# Principe 9 — La traçabilité est permanente

Toute évolution importante est historisée.

La plateforme doit permettre de comprendre :

- qui ;
- quand ;
- quoi ;
- pourquoi.

---

# Principe 10 — La technologie est au service du métier

Le modèle métier est indépendant :

- de la base de données ;
- des API ;
- des frameworks ;
- des interfaces.

La technologie peut évoluer.

Le métier reste stable.

---

## Critères de validation

Le modèle métier sera considéré comme conforme lorsque :

- toutes les spécifications respectent ces principes ;
- aucune évolution ne les contredit sans décision d'architecture formelle ;
- les développements techniques restent alignés avec le modèle métier.
