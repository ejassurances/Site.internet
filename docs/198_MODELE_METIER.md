# 198 — Modèle métier d'EJ Assurances

## Objet

Ce document définit les objets métier de la plateforme EJ Assurances, leurs relations, leur cycle de vie et leurs responsabilités. C'est la référence : base de données, API, Services IA, Workflows et interfaces doivent s'y conformer. En cas de contradiction avec une autre spécification, ce document fait foi.

## 1. Les objets métier

| Objet | Rôle |
|---|---|
| **Utilisateur** | Personne ayant accès à la plateforme : administrateur, dirigeant, collaborateur, mandataire, client, partenaire |
| **Client** | Personne physique ou morale accompagnée par le cabinet. Le "Prospect" n'est pas un objet distinct — c'est un Client au statut "Prospect" |
| **Projet** | Objet central : représente un besoin exprimé par un Client (emprunteur, prévoyance, patrimoine, retraite, professionnel...). Regroupe tout ce qui répond à ce besoin |
| **Contrat** | La solution effectivement mise en place à l'issue d'un Projet. Un Projet peut produire 0, 1 ou plusieurs Contrats |
| **Activité** | Toute action réalisée dans le cadre du suivi d'un objet — alimente la chronologie du dossier |
| **Document** | Pièce rattachée à un objet métier, éventuellement générée automatiquement ou signée, avec historique de versions |
| **Produit** | Offre commerciale distribuée par un ou plusieurs Partenaires — jamais un contrat souscrit |
| **Partenaire** | Assureur, grossiste, banque, organisme financier — distribue des Produits, intervient dans des Projets |

## 2. Relations entre objets

- Un **Client** possède 0 à N Projets, Contrats, Documents, Activités.
- Un **Projet** appartient à un seul Client ; possède 0 à N Activités, Documents, Produits étudiés, Contrats. Il représente un besoin et peut ne jamais produire de Contrat (étude sans suite, refus, abandon).
- Un **Contrat** appartient obligatoirement à un Projet (jamais d'existence autonome), a ses propres documents et activités de suivi, peut faire l'objet d'avenants et de renouvellements.
- Une **Activité** est toujours liée à un objet métier (jamais orpheline), a un responsable unique et éventuellement plusieurs participants.
- Un **Document** est toujours rattaché à un objet métier ; distinct d'une simple pièce jointe.
- Un **Produit** peut être étudié dans plusieurs Projets et donner lieu à plusieurs Contrats ; proposé par un ou plusieurs Partenaires.
- Un **Partenaire** distribue des Produits et intervient dans des Projets et Contrats.

Ces relations sont permanentes : elles ne dépendent d'aucune interface ni implémentation technique.

## 3. Cycle de vie

Tout objet suit globalement : création → enrichissement → évolution → clôture → archivage (certaines étapes peuvent être absentes selon l'objet).

| Objet | Cycle de vie |
|---|---|
| Client | Prospect → Client actif → Client inactif → Archivé |
| Projet | Création → Analyse → En cours → Finalisé → Clôturé → Archivé (un Projet peut se clôturer sans Contrat) |
| Contrat | Création → En attente de signature → Actif → Suspendu (si applicable) → Résilié/échu → Archivé. Avenants et renouvellements prolongent le cycle sans créer un nouvel historique |
| Document | Brouillon → En préparation → À valider → Validé → Signé (si applicable) → Archivé |
| Produit | Disponible → Suspendu → Retiré → Archivé |
| Partenaire | Prospect → Actif → Suspendu → Inactif → Archivé |

Les transitions sont déclenchées par un utilisateur autorisé, un Workflow, une échéance ou une validation. Les Services IA peuvent proposer une transition mais ne l'exécutent jamais sans validation humaine, sauf règle métier explicitement définie. Chaque changement d'état est historisé (ancien état, nouvel état, auteur, date, motif).

## 4. Responsabilités — une donnée, un propriétaire

Chaque objet est propriétaire de certaines informations ; les autres objets s'y réfèrent sans les dupliquer :

- **Client** : identité, coordonnées, informations administratives, consentements, préférences — pas des projets/contrats/activités qu'il possède.
- **Projet** : le besoin, son avancement, les produits étudiés, les décisions, activités et documents associés, les contrats générés.
- **Contrat** : la solution mise en place, son état, ses échéances, garanties, avenants, suivi — il ne connaît jamais le besoin initial (ça appartient au Projet).
- **Activité** : les actions réalisées et à venir, les participants, le résultat, les livrables.
- **Document** : son contenu, ses versions, ses signatures, sa validité.
- **Produit** : son offre, ses caractéristiques, ses options, sa disponibilité — jamais les clients qui l'ont souscrit.
- **Partenaire** : son identité, ses conventions, ses produits distribués, ses conditions commerciales.

## 5. Principes fondamentaux

1. **Le Projet est l'objet central** — les Contrats, Documents, Activités et Produits gravitent autour de lui. Le Contrat est une conséquence du Projet, jamais l'inverse.
2. **Une donnée, un propriétaire unique** — aucune duplication fonctionnelle.
3. **Les objets évoluent, ils ne disparaissent pas** — actifs, clôturés ou archivés ; la suppression définitive reste exceptionnelle.
4. **Les activités racontent l'histoire du dossier** — mémoire opérationnelle du cabinet.
5. **Les documents sont les preuves** du conseil apporté et des obligations réglementaires.
6. **Les Workflows automatisent, ils ne décident pas** — le modèle métier reste la source de vérité.
7. **Les Services IA assistent** (analysent, proposent, recommandent, expliquent) — ils ne décident jamais à la place de l'utilisateur, sauf automatisation explicitement validée.
8. **La conformité est native**, intégrée à chaque objet, jamais un module à part.
9. **La traçabilité est permanente** — qui, quand, quoi, pourquoi, pour toute évolution importante.
10. **La technologie est au service du métier** — le modèle métier est indépendant de la base de données, des API et des frameworks ; la technologie change, le métier reste stable.

## 6. Validation

Le modèle est respecté quand : chaque donnée a un propriétaire métier unique, les responsabilités des objets sont respectées sans duplication, chaque changement de cycle de vie est historisé, et toute évolution technique reste alignée avec les principes ci-dessus.
