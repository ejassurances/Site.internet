# 227_REFERENTIEL_ARCHITECTURE

# Référentiel d'Architecture d'EJ Partners

Version : 1.0

Statut : Référentiel Fondateur

---

# Objet

Le présent document constitue le référentiel d'architecture officiel d'EJ Partners.

Il définit les principes fondamentaux qui gouvernent la conception, le développement, l'évolution et l'exploitation de la plateforme.

Toutes les spécifications fonctionnelles, techniques et les développements doivent respecter ce référentiel.

En cas de contradiction entre une spécification et ce document, le présent référentiel fait autorité jusqu'à décision de gouvernance.

---

# Objectifs

Garantir :

- la cohérence globale de la plateforme ;
- l'évolutivité ;
- la maintenabilité ;
- la réutilisabilité ;
- la sécurité ;
- la conformité réglementaire ;
- la pérennité de l'architecture.

---

# Périmètre

Ce référentiel s'applique à :

- tous les modules métier ;
- tous les moteurs transverses ;
- tous les orchestrateurs ;
- toutes les interfaces ;
- toutes les API ;
- tous les développements futurs.


# Vision d'Architecture

## Principe fondateur

EJ Partners est une plateforme métier modulaire construite autour de capacités métier réutilisables.

Les interfaces consomment des capacités.

Les capacités utilisent des moteurs.

Les moteurs manipulent des objets métier.

Les objets métier sont stockés dans l'infrastructure.

---

## Vision

La plateforme doit pouvoir évoluer pendant plusieurs années sans remise en cause de son architecture.

Chaque nouvelle fonctionnalité doit pouvoir être intégrée sans casser les fonctionnalités existantes.

---

## Objectifs

L'architecture doit favoriser :

- la modularité ;
- la réutilisation ;
- la séparation des responsabilités ;
- la sécurité par conception ;
- la traçabilité ;
- l'interopérabilité ;
- la gouvernance.

---

## Principes

L'architecture repose notamment sur :

- API First
- Security by Design
- Audit by Design
- Configuration over Code
- Event Driven lorsque pertinent
- Capabilities First
- Domain Driven Design (DDD)

---

## Critères de validation

La vision est respectée lorsque :

- chaque évolution s'intègre dans cette architecture ;
- aucun développement ne contourne les principes fondateurs ;
- la plateforme reste cohérente dans le temps.


# Chapitre 2 — Principes fondateurs

Les principes ci-dessous sont les règles d'architecture qui s'imposent à l'ensemble de la plateforme EJ Partners.

Ils guident toutes les décisions fonctionnelles, techniques et organisationnelles.

---

# Principe n°1 — Le métier avant la technique

EJ Partners est conçu autour des besoins métier.

Les choix techniques servent le métier.

Ils ne le dictent jamais.

---

# Principe n°2 — Tout est une capacité métier

Une fonctionnalité est toujours décrite comme une capacité.

Exemples :

• Souscrire un contrat
• Générer un document
• Déclarer un sinistre
• Envoyer une notification

Jamais :

• updateContract()
• insertClient()

---

# Principe n°3 — Les interfaces ne contiennent aucune logique métier

Les interfaces :

• affichent
• collectent
• pilotent

Elles ne décident jamais.

Toute règle métier appartient :

• au Domaine Métier ;
• aux Moteurs ;
• aux Orchestrateurs.

---

# Principe n°4 — Une responsabilité par composant

Chaque composant possède une responsabilité unique.

Exemples :

Le moteur Recherche recherche.

Le moteur API expose.

Le moteur Sécurité protège.

Le moteur Audit trace.

Aucun moteur ne remplit plusieurs responsabilités.

---

# Principe n°5 — Les moteurs sont réutilisables

Un moteur ne dépend jamais d'une interface.

Il peut être utilisé :

• par le Web
• par le Mobile
• par les API
• par les Workflows
• par les Services IA

---

# Principe n°6 — API First

Toute capacité peut être exposée via le Moteur API.

Les interfaces utilisent les mêmes capacités que les partenaires.

Il n'existe pas de logique métier spécifique aux écrans.

---

# Principe n°7 — Security by Design

Toute capacité est protégée.

Avant chaque exécution :

• authentification
• autorisation
• classification
• contrôles

---

# Principe n°8 — Audit by Design

Toute capacité significative produit un événement d'audit.

La traçabilité fait partie de la conception.

Elle n'est jamais ajoutée après.

---

# Principe n°9 — Configuration over Code

Les comportements configurables appartiennent au Moteur de Paramétrage.

Les constantes codées en dur sont interdites lorsqu'une configuration est possible.

---

# Principe n°10 — Évolutivité

Chaque évolution doit pouvoir être intégrée :

• sans casser les moteurs existants ;
• sans dupliquer les responsabilités ;
• sans créer de dépendances circulaires.

---

# Critères de validation

Les principes sont respectés lorsque :

• chaque nouveau développement peut être rattaché à un principe ;
• aucune fonctionnalité ne contourne ces règles ;
• les revues d'architecture vérifient systématiquement leur application.

# Chapitre 3 — Les couches d'architecture

## Objet

L'architecture d'EJ Partners repose sur une organisation en couches.

Chaque couche possède une responsabilité clairement définie et ne peut communiquer qu'avec les couches autorisées.

Cette séparation garantit la modularité, la maintenabilité et l'évolutivité de la plateforme.

---

# Couche 1 — Interfaces

Les interfaces constituent le point d'entrée des utilisateurs et des systèmes externes.

Elles comprennent notamment :

- Application Web
- Application Mobile
- Portail Client
- Portail Partenaire
- Services IA
- API publiques

Les interfaces :

- affichent les informations ;
- collectent les actions des utilisateurs ;
- appellent les capacités métier.

Elles ne contiennent aucune logique métier.

---

# Couche 2 — Orchestrateurs

Les orchestrateurs coordonnent plusieurs capacités métier afin de réaliser un processus complet.

Ils comprennent notamment :

- Workflows
- IA
- Pipelines
- Diffusion
- Automatisations

Ils orchestrent les traitements mais ne portent pas les règles métier.

---

# Couche 3 — Moteurs transverses

Les moteurs fournissent des capacités réutilisables à toute la plateforme.

Ils comprennent notamment :

- API
- Recherche
- Variables
- Templates
- KPI
- Reporting
- Notifications
- Agenda
- Messagerie
- Paramétrage
- Imports
- Exports

Les moteurs sont indépendants des interfaces.

---

# Couche 4 — Gouvernance

Cette couche garantit le contrôle et la conformité de la plateforme.

Elle comprend notamment :

- Sécurité
- Journal d'Audit

Ces moteurs sont sollicités avant, pendant ou après chaque capacité métier selon les besoins.

---

# Couche 5 — Domaine Métier

Le Domaine Métier contient les objets et les règles métier.

Exemples :

- Clients
- Prospects
- Contrats
- Projets
- Produits
- Documents
- Activités

Le Domaine Métier ne dépend d'aucune interface.

---

# Couche 6 — Infrastructure Applicative

Cette couche fournit les services techniques nécessaires au fonctionnement de la plateforme.

Elle comprend notamment :

- Authentification technique
- Gestion des fichiers
- Stockage documentaire
- Cache
- Files de traitement
- Planificateur de tâches

---

# Couche 7 — Infrastructure Technique

Cette couche regroupe les composants techniques sur lesquels repose la plateforme.

Exemples :

- PostgreSQL
- Supabase
- Vercel
- Stockage objet
- CDN
- Sauvegardes
- Monitoring

---

# Règles de communication

Les couches communiquent uniquement selon les règles suivantes :

- une couche supérieure peut utiliser une couche inférieure ;
- une couche inférieure ne dépend jamais d'une couche supérieure ;
- les dépendances circulaires sont interdites ;
- toute communication externe passe par le Moteur API.

---

# Critères de validation

L'architecture est conforme lorsque :

- chaque composant appartient à une couche clairement identifiée ;
- les responsabilités sont respectées ;
- les dépendances sont unidirectionnelles ;
- aucune logique métier ne remonte dans les interfaces.

# Chapitre 4 — Règles de conception

## Objet

Les règles de conception définissent les principes à respecter lors de l'ajout ou de la modification d'une fonctionnalité.

Elles garantissent que chaque évolution reste cohérente avec l'architecture d'EJ Partners.

---

# Règle n°1 — Concevoir une capacité avant de concevoir un écran

Toute nouvelle fonctionnalité doit être définie comme une capacité métier.

Exemple :

✓ Souscrire un contrat

Avant de réfléchir :

- au bouton ;
- au formulaire ;
- à l'écran.

---

# Règle n°2 — Identifier la bonne couche

Avant tout développement, il convient d'identifier :

- la couche concernée ;
- le moteur concerné ;
- le domaine métier concerné ;
- les dépendances.

Aucune implémentation ne doit commencer sans cette étape.

---

# Règle n°3 — Réutiliser avant de créer

Avant de créer un nouveau composant, il convient de vérifier si une capacité équivalente existe déjà.

Les duplications sont interdites lorsqu'une capacité existante peut être réutilisée.

---

# Règle n°4 — Les responsabilités sont uniques

Un composant ne possède qu'une seule responsabilité.

Si une fonctionnalité nécessite plusieurs responsabilités, elle doit être répartie entre plusieurs composants.

---

# Règle n°5 — Les dépendances sont explicites

Chaque composant déclare :

- les moteurs utilisés ;
- les capacités consommées ;
- les objets métier manipulés.

Les dépendances implicites sont interdites.

---

# Règle n°6 — Les interfaces restent passives

Les interfaces :

- affichent ;
- collectent les informations ;
- appellent les capacités.

Elles ne contiennent jamais :

- de règles métier ;
- de calculs fonctionnels ;
- de logique de sécurité.

---

# Règle n°7 — Les évolutions sont extensibles

Toute nouvelle capacité doit pouvoir :

- être exposée via l'API ;
- être utilisée dans un Workflow ;
- être auditée ;
- être sécurisée ;
- être paramétrable si nécessaire.

---

# Règle n°8 — La traçabilité est native

Toute capacité significative doit produire un événement d'audit.

La traçabilité est pensée dès la conception.

---

# Règle n°9 — La sécurité est systématique

Toute capacité doit prévoir :

- son authentification ;
- son autorisation ;
- sa classification des données ;
- sa politique d'accès.

---

# Règle n°10 — La simplicité prévaut

À fonctionnalités équivalentes, la solution la plus simple est privilégiée.

La complexité doit toujours être justifiée par un besoin métier.

---

# Critères de validation

Les règles sont respectées lorsque :

- chaque nouvelle fonctionnalité suit ce processus de conception ;
- les revues d'architecture vérifient systématiquement ces règles ;
- aucune implémentation ne contourne les responsabilités définies.



# Chapitre 5 — Conventions de développement

## Objet

Les conventions de développement garantissent une base de code homogène, lisible et maintenable.

Elles s'appliquent à tous les développements réalisés sur EJ Partners.

---

# Convention n°1 — Le métier avant la technique

Les composants sont nommés selon le métier.

Exemple :

✓ CreateClientCapability

✓ ContractRenewalService

Jamais :

✗ client_utils

✗ data_manager

---

# Convention n°2 — Les noms sont explicites

Les noms doivent permettre de comprendre immédiatement :

- leur rôle ;
- leur responsabilité ;
- leur domaine métier.

Les abréviations sont évitées sauf lorsqu'elles sont normalisées.

---

# Convention n°3 — Une responsabilité par classe

Chaque classe, service ou composant possède une responsabilité unique.

Si plusieurs responsabilités apparaissent, le composant doit être découpé.

---

# Convention n°4 — Les dépendances sont injectées

Les composants ne créent pas directement leurs dépendances.

Ils utilisent les mécanismes d'injection prévus par l'architecture.

---

# Convention n°5 — Les interfaces précèdent les implémentations

Chaque capacité importante est décrite par un contrat (interface) avant son implémentation.

Les consommateurs dépendent du contrat, jamais de l'implémentation.

---

# Convention n°6 — Les erreurs sont explicites

Les erreurs doivent être :

- compréhensibles ;
- contextualisées ;
- exploitables.

Les messages techniques ne sont jamais exposés directement aux utilisateurs.

---

# Convention n°7 — Les événements sont systématiques

Toute capacité importante :

- produit un événement d'audit ;
- peut produire des notifications ;
- peut être supervisée.

---

# Convention n°8 — Les tests accompagnent le développement

Toute capacité importante dispose au minimum de :

- tests unitaires ;
- tests d'intégration ;
- validation fonctionnelle.

---

# Convention n°9 — La documentation évolue avec le code

Toute évolution fonctionnelle importante entraîne :

- la mise à jour des spécifications ;
- la mise à jour du Référentiel ;
- la mise à jour de la documentation développeur.

La documentation n'est jamais laissée en retard par rapport au code.

---

# Convention n°10 — Les revues de code sont des revues d'architecture

Une revue de code ne vérifie pas seulement :

- la syntaxe ;
- les performances.

Elle vérifie également :

- le respect des principes fondateurs ;
- la bonne couche ;
- les responsabilités ;
- les dépendances ;
- la sécurité ;
- l'audit.

---

# Critères de validation

Les conventions sont respectées lorsque :

- la base de code reste homogène ;
- les nouveaux développements respectent ces règles ;
- les revues de code contrôlent leur application.


# Chapitre 6 — Dépendances et règles de communication

## Objet

Les dépendances définissent les relations autorisées entre les composants d'EJ Partners.

Elles garantissent une architecture découplée, cohérente et évolutive.

Aucune dépendance ne peut être créée en dehors des règles définies dans ce référentiel.

---

# Principe général

Les dépendances suivent un sens unique.

Un composant peut utiliser un service fourni par une couche inférieure.

Une couche inférieure ne dépend jamais d'une couche supérieure.

Les dépendances circulaires sont interdites.

---

# Dépendances autorisées

## Les Interfaces

Peuvent utiliser :

- les Orchestrateurs ;
- le Moteur API.

Ne peuvent jamais appeler directement :

- le Domaine Métier ;
- les Repositories ;
- la Base de données.

---

## Les Orchestrateurs

Peuvent utiliser :

- le Domaine Métier ;
- les Moteurs transverses.

Ne doivent jamais contenir de logique métier permanente.

---

## Les Moteurs transverses

Peuvent utiliser :

- le Domaine Métier ;
- les Services Techniques.

Ils ne dépendent jamais :

- des Interfaces ;
- d'un autre moteur lorsque cela peut être évité.

Les dépendances entre moteurs doivent rester exceptionnelles et explicites.

---

## Le Domaine Métier

Peut utiliser :

- ses propres composants ;
- les Services Techniques indispensables.

Il ne dépend jamais :

- des Interfaces ;
- des Orchestrateurs ;
- des API.

---

## Les Services Techniques

Fournissent des services.

Ils ne connaissent jamais le métier.

---

# Dépendances interdites

Les exemples suivants sont interdits :

Interface

↓

SQL

---

Workflow

↓

Base de données

---

API

↓

Repository

---

Notification

↓

UI

---

Audit

↓

Écran

---

# Communication

Toute communication entre composants importants repose sur :

- une capacité métier ;
- un contrat (interface) ;
- un événement ;
- ou une API interne.

Les appels directs vers les implémentations sont à éviter.

---

# Dépendances externes

Toute communication avec un système externe passe exclusivement par le Moteur API ou par un connecteur officiellement référencé.

Aucun module métier ne dialogue directement avec un partenaire externe.

---

# Contrôle des dépendances

Toute nouvelle dépendance doit être :

- justifiée ;
- documentée ;
- validée lors de la revue d'architecture.

---

# Critères de validation

Les dépendances sont conformes lorsque :

- aucune dépendance circulaire n'existe ;
- chaque dépendance est justifiée ;
- les couches restent indépendantes ;
- les responsabilités sont respectées.

# Chapitre 7 — Règles d'évolutivité

## Objet

Les règles d'évolutivité définissent les principes permettant à EJ Partners de s'enrichir de nouvelles fonctionnalités sans remettre en cause son architecture.

Toute évolution doit préserver la cohérence, la stabilité et la réutilisabilité de la plateforme.

---

# Principe n°1 — Ouvert à l'extension, fermé à la modification

Les composants existants doivent pouvoir être complétés par de nouvelles capacités sans nécessiter de modifications importantes de leur comportement.

Les extensions sont privilégiées aux modifications profondes.

---

# Principe n°2 — Ajouter avant de remplacer

Lorsqu'une nouvelle capacité est nécessaire, il convient de déterminer si elle peut être ajoutée :

- par configuration ;
- par extension ;
- par un nouveau moteur ;
- par un nouvel orchestrateur.

Le remplacement d'un composant existant reste exceptionnel.

---

# Principe n°3 — Les moteurs sont extensibles

Chaque moteur doit permettre l'ajout de nouvelles fonctionnalités sans impacter les moteurs existants.

Exemples :

- nouveau type de notification ;
- nouveau connecteur API ;
- nouveau type d'import ;
- nouveau format d'export.

---

# Principe n°4 — Les objets métier évoluent sans rupture

Les objets métier peuvent évoluer :

- par ajout de propriétés ;
- par ajout de comportements ;
- par ajout de capacités.

Les suppressions ou modifications incompatibles doivent être évitées.

---

# Principe n°5 — Le paramétrage est privilégié

Lorsqu'un comportement peut être rendu configurable, cette solution est privilégiée à la duplication du code.

---

# Principe n°6 — Les interfaces sont indépendantes

Une nouvelle interface (Web, Mobile, IA, API...) ne doit nécessiter aucune modification du Domaine Métier.

Elle consomme les capacités existantes.

---

# Principe n°7 — Les intégrations sont découplées

Toute nouvelle intégration externe :

- compagnie ;
- banque ;
- partenaire ;
- fournisseur ;

est réalisée via un connecteur ou le Moteur API.

Le Domaine Métier ne dépend jamais directement d'un partenaire.

---

# Principe n°8 — Les événements restent compatibles

L'ajout de nouveaux événements d'audit ne doit jamais casser les événements existants.

Les référentiels d'événements restent versionnés.

---

# Principe n°9 — Les versions coexistent

Lorsque cela est nécessaire, plusieurs versions d'une capacité peuvent coexister pendant une période de transition.

Les migrations sont planifiées.

---

# Principe n°10 — L'évolution est documentée

Toute évolution significative entraîne :

- une mise à jour des spécifications ;
- une mise à jour du Référentiel d'Architecture ;
- une mise à jour de la documentation technique ;
- une mise à jour des ADR (Architecture Decision Records) si la décision est structurante.

---

# Critères de validation

Les règles d'évolutivité sont respectées lorsque :

- les nouvelles fonctionnalités s'intègrent sans rupture ;
- les composants restent découplés ;
- les évolutions sont documentées ;
- les capacités existantes continuent de fonctionner.

# Chapitre 8 — Gouvernance de l'architecture

## Objet

La gouvernance de l'architecture définit les règles permettant de faire évoluer EJ Partners de manière cohérente, maîtrisée et durable.

Elle garantit que les décisions d'architecture sont documentées, comprises et appliquées par l'ensemble des équipes.

---

# Principe n°1 — Une architecture pilotée

L'architecture n'est pas la somme des développements réalisés.

Elle constitue un patrimoine commun piloté dans le temps.

Toute évolution significative est analysée sous l'angle de son impact sur l'architecture globale.

---

# Principe n°2 — Les décisions sont explicites

Les décisions structurantes sont formalisées dans un ADR (Architecture Decision Record).

Chaque ADR précise notamment :

- le contexte ;
- le problème rencontré ;
- les solutions étudiées ;
- la décision retenue ;
- les conséquences attendues.

Les ADR constituent la mémoire des choix d'architecture.

---

# Principe n°3 — Les revues d'architecture

Les évolutions majeures font l'objet d'une revue d'architecture avant leur implémentation.

Cette revue vérifie notamment :

- le respect des principes fondateurs ;
- la bonne répartition des responsabilités ;
- les dépendances créées ;
- les impacts sur les moteurs existants ;
- les risques techniques et fonctionnels.

---

# Principe n°4 — Les exceptions sont documentées

Toute exception aux règles du présent référentiel doit être :

- justifiée ;
- documentée ;
- validée ;
- limitée dans le temps lorsque cela est possible.

Une exception ne devient jamais une nouvelle règle par défaut.

---

# Principe n°5 — L'amélioration continue

L'architecture fait l'objet d'une amélioration continue.

Les retours d'expérience issus :

- des développements ;
- des incidents ;
- des audits ;
- des utilisateurs ;

peuvent conduire à faire évoluer le référentiel.

---

# Principe n°6 — Les responsabilités

La gouvernance distingue notamment :

- les responsables métier ;
- les responsables techniques ;
- les responsables sécurité ;
- les responsables conformité ;
- les responsables architecture.

Chaque décision est prise au bon niveau de responsabilité.

---

# Principe n°7 — Les indicateurs d'architecture

La gouvernance s'appuie sur des indicateurs tels que :

- dette technique ;
- couverture des tests ;
- stabilité des moteurs ;
- conformité au référentiel ;
- nombre d'exceptions ouvertes ;
- qualité des dépendances.

Ces indicateurs permettent de piloter l'évolution de la plateforme.

---

# Critères de validation

La gouvernance est respectée lorsque :

- les décisions importantes sont tracées ;
- les évolutions suivent un processus maîtrisé ;
- les exceptions restent exceptionnelles ;
- le référentiel demeure vivant et à jour.

# Chapitre 9 — Critères de qualité architecturale

## Objet

Les critères de qualité permettent d'évaluer en permanence si l'architecture d'EJ Partners reste conforme aux principes définis par le présent référentiel.

Ils servent de référence lors des développements, des revues de code, des audits d'architecture et des évolutions majeures.

---

# Qualité n°1 — Cohérence

Chaque composant possède :

- une responsabilité clairement identifiée ;
- une place dans l'architecture ;
- des dépendances maîtrisées.

Aucun composant ne remplit plusieurs rôles incompatibles.

---

# Qualité n°2 — Modularité

Les modules, moteurs et orchestrateurs peuvent évoluer indépendamment.

L'ajout d'une nouvelle capacité ne nécessite pas de modifier plusieurs composants sans justification.

---

# Qualité n°3 — Réutilisabilité

Une capacité développée peut être utilisée :

- par l'interface Web ;
- par l'application Mobile ;
- par les API ;
- par les Workflows ;
- par les Services IA.

La duplication est évitée.

---

# Qualité n°4 — Maintenabilité

Le code, les spécifications et la documentation restent synchronisés.

Les responsabilités sont simples à comprendre.

Les dépendances restent limitées.

---

# Qualité n°5 — Sécurité

Toute capacité :

- est authentifiée ;
- est autorisée ;
- respecte les politiques de sécurité ;
- applique la classification des données.

---

# Qualité n°6 — Traçabilité

Toute opération significative :

- produit un événement d'audit ;
- peut être retrouvée ;
- peut être expliquée ;
- peut être corrélée.

---

# Qualité n°7 — Performance

Les performances sont prises en compte dès la conception.

Les optimisations ne doivent jamais remettre en cause les principes architecturaux.

---

# Qualité n°8 — Évolutivité

Les nouvelles fonctionnalités peuvent être ajoutées :

- sans rupture ;
- sans duplication ;
- sans dépendance circulaire.

---

# Qualité n°9 — Conformité

La plateforme respecte les exigences applicables :

- réglementaires ;
- contractuelles ;
- internes.

Les évolutions réglementaires sont intégrées sans remettre en cause le Domaine Métier.

---

# Qualité n°10 — Lisibilité

L'architecture, le code et la documentation utilisent un vocabulaire métier homogène.

Les décisions sont compréhensibles par les équipes métier comme par les équipes techniques.

---

# Évaluation

Les critères de qualité sont évalués :

- lors des revues d'architecture ;
- lors des revues de code ;
- avant les mises en production ;
- lors des audits internes.

---

# Critères de validation

Le référentiel est respecté lorsque :

- les critères de qualité sont satisfaits ;
- les écarts sont identifiés ;
- les plans d'amélioration sont suivis ;
- les décisions d'architecture restent cohérentes.
