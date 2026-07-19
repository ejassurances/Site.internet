# 010 — Architecture globale d'EJ Assurances

## 1. Objet du document

Ce document décrit le système utilisé par EJ Assurances pour gérer son activité de courtage en assurances et de conseil en gestion de patrimoine (CGP).

C'est le référentiel de conception : toute nouvelle fonctionnalité doit s'y rattacher clairement. Si une évolution proposée ne trouve pas sa place ici, elle est probablement hors périmètre et doit être discutée avant d'être développée.

## 2. Ce que c'est — et ce que ce n'est pas

EJ Assurances est un CRM métier complet pour un cabinet de courtage en assurances et de conseil en gestion de patrimoine : un seul système pour gérer la relation client, les projets, les contrats, les produits, les partenaires, les documents, la conformité et les agents IA qui assistent le courtier.

Ce n'est pas un produit générique destiné à être vendu à d'autres cabinets. C'est l'outil d'EJ Assurances, dimensionné pour un cabinet piloté par un courtier, avec un petit réseau de collaborateurs, mandataires et prescripteurs.

## 3. Principes directeurs

- **Une seule plateforme** : pas de bascule vers un autre outil pour continuer un travail.
- **Une seule source par donnée** : un client, un partenaire, un produit ou un document n'existe qu'à un seul endroit ; le reste du système le référence.
- **Le Projet comme unité de travail** : chaque besoin client (emprunteur, prévoyance, patrimoine, retraite, professionnel...) devient un Projet, qui centralise tout ce qui s'y rapporte, indépendamment du contrat final.
- **Traçabilité** : les actions importantes — notamment celles des agents IA — sont historisées, avec responsabilité humaine toujours conservée sur les décisions.

## 4. Les acteurs

Prospect, Client, Mandataire, Collaborateur, Prescripteur, Partenaire, Compagnie, Administrateur. Chaque acteur a un rôle et une vue adaptée à ce rôle — même Projet, présentation différente selon qui le consulte.

## 5. Les domaines fonctionnels

Le système est organisé autour de ces domaines, qui communiquent tous entre eux via le Projet :

| Domaine | Rôle |
|---|---|
| **Relation** | Fiches uniques des prospects, clients, mandataires, partenaires, compagnies |
| **Projet** | Cœur opérationnel — cycle de vie d'un besoin client jusqu'au contrat et son suivi |
| **Produits** | Catalogue des produits distribués (assurance, prévoyance, patrimoine, retraite), rattachés à leur partenaire |
| **Partenaires** | Compagnies, courtiers grossistes, banques, organismes financiers — contacts, conventions, documents |
| **Bibliothèque documentaire** | Tous les documents (clients, partenaires, internes), stockés une fois, référencés partout où nécessaire |
| **Conformité** | ACPR, DDA, RGPD, devoir de conseil, journal d'audit — intégrée dans les autres domaines, pas un module à part |
| **Communication** | Emails, appels, SMS, rendez-vous, signatures — rattachés automatiquement au Projet concerné |
| **IA** | Agents assistants (résumé, rédaction, cross-selling, contrôle) qui exploitent les données existantes sans en créer de nouvelles, toujours sous supervision humaine |
| **Pilotage** | Tableaux de bord et indicateurs pour suivre l'activité du cabinet |
| **Automatisation** | Workflows, tâches automatiques, synchronisation Google Workspace, relances |

## 6. Cycle de vie d'un Projet (simplifié)

```
Prospect → Projet créé → Recueil des besoins → Étude & comparaison
   → Devoir de conseil → Validation client → Souscription
   → Contrat actif → Suivi (avenants, renouvellements, nouvelles opportunités)
```

Le Projet reste vivant après la souscription : c'est le dossier permanent de la relation client, y compris pour les avenants et le suivi patrimonial dans la durée.

## 7. Ce qu'on refuse

Les données dupliquées, les modules isolés qui ne parlent pas au Projet, les ressaisies, les IA qui agissent sans laisser de trace, les développements qui ne se rattachent à aucun domaine listé ci-dessus.

## 8. Validation

Une évolution respecte cette architecture si : elle se rattache à un domaine existant, elle ne duplique aucune donnée, le Projet reste le point d'entrée, et l'action reste tracée si elle implique de l'IA ou touche à la conformité.
