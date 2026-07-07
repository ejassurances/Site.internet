PARTIE 1 — Philosophie de la donnée
1. Objet du document

Ce document définit l'architecture logique des données de la plateforme EJ Assurances.

Il décrit :

les objets métier ;
leurs relations ;
leurs règles de fonctionnement ;
leurs principes de stockage ;
leurs interactions.

Il ne décrit pas encore les tables SQL.

Il décrit la logique métier qui guidera ensuite la conception de la base PostgreSQL.

2. Philosophie générale

La donnée constitue le patrimoine le plus important du cabinet.

La plateforme est construite autour d'un principe simple :

Une donnée est créée une seule fois.

Puis :

enrichie ;
réutilisée ;
historisée ;
sécurisée.

Aucune duplication n'est autorisée.

3. La donnée comme actif stratégique

Les données ne servent pas uniquement à faire fonctionner le logiciel.

Elles permettent :

d'améliorer le conseil ;
d'automatiser les tâches ;
d'alimenter les Agents IA ;
d'améliorer les statistiques ;
de renforcer la conformité.

Chaque donnée possède donc une valeur métier.

4. Une source unique de vérité

Chaque information possède un propriétaire unique.

Exemple :

Le nom d'un Client n'existe qu'à un seul endroit.

Le numéro d'un Contrat n'existe qu'à un seul endroit.

Le nom d'un Produit n'existe qu'à un seul endroit.

Tous les autres domaines utilisent cette donnée.

Ils ne la copient jamais.

5. Les objets métier

La plateforme est organisée autour d'objets métier.

Les principaux sont :

Client
Projet
Contrat
Produit
Partenaire
Document
Interaction
Tâche
Workflow
Agent IA
Utilisateur
Sinistre
Réclamation

Tous les futurs développements devront s'appuyer sur ces objets.

6. Les relations

Les objets ne vivent jamais isolément.

Ils sont reliés entre eux.

Exemple :

Client
   │
   ├──── Projet
   │         │
   │         ├──── Contrats
   │         ├──── Documents
   │         ├──── Interactions
   │         ├──── Tâches
   │         ├──── Workflow
   │         └──── Devoir de conseil
   │
   └──── Historique

La plateforme repose sur un réseau de relations et non sur des fichiers indépendants.

7. Le Projet comme objet central

Nous confirmons ici une règle fondamentale.

Le Projet est le centre de la plateforme.

Tous les autres objets gravitent autour de lui.

Le Projet relie :

le Client ;
les Produits ;
les Partenaires ;
les Documents ;
les Interactions ;
les Contrats ;
les Agents IA ;
les Workflows ;
la Conformité.

Aucun autre objet ne possède ce rôle.

8. Le cycle de vie des données

Chaque donnée suit un cycle de vie.

Création

↓

Validation

↓

Utilisation

↓

Modification

↓

Archivage

↓

Suppression (exceptionnelle)

La suppression doit rester exceptionnelle.

La plateforme privilégie toujours l'archivage.

9. Historisation

Toute modification importante est historisée.

La plateforme conserve notamment :

la valeur précédente ;
la nouvelle valeur ;
la date ;
l'utilisateur ;
le motif (si disponible).

L'objectif est de pouvoir reconstruire l'historique complet d'un objet.

10. Critères de validation

L'architecture des données sera considérée comme conforme lorsque :

chaque donnée possède un propriétaire unique ;
les objets métier sont clairement définis ;
les relations entre objets sont explicites ;
le Projet constitue le centre du modèle ;
aucune duplication n'est autorisée ;
toutes les modifications importantes sont historisées ;
l'archivage est privilégié à la suppression.


PARTIE 2 — Les objets métier fondamentaux
11. Philosophie

La base de données de la plateforme est organisée autour d'objets métier.

Chaque objet représente une entité réelle du cabinet.

Les objets ne sont pas créés pour répondre à une contrainte technique.

Ils existent parce qu'ils représentent un élément du métier.

La structure technique devra toujours respecter cette logique.

12. Les objets fondamentaux

Les objets suivants constituent le socle de la plateforme.

Ils sont présents dans l'ensemble des domaines.

Utilisateur

Représente une personne pouvant se connecter à la plateforme.

Exemples :

Administrateur
Collaborateur
Mandataire
Responsable conformité
Responsable commercial
Client
Prospect
Partenaire
Client

Le Client représente la personne physique ou morale accompagnée par le cabinet.

La fiche Client est unique.

Elle centralise les informations permanentes.

Un Client peut posséder :

plusieurs Projets ;
plusieurs Contrats ;
plusieurs Documents ;
plusieurs Interactions ;
plusieurs Personnes liées.
Projet

Le Projet constitue l'objet central de la plateforme.

Chaque Projet possède :

un type ;
un statut ;
un responsable ;
un Client ;
un recueil des besoins ;
un devoir de conseil ;
des Produits ;
des Partenaires ;
des Documents ;
des Contrats ;
des Tâches ;
des Interactions.

Le Projet accompagne le Client de son premier contact jusqu'au suivi du contrat.

Contrat

Le Contrat représente une solution effectivement mise en place.

Il est toujours issu d'un Projet.

Un Projet peut donner naissance à plusieurs Contrats.

Chaque Contrat reste relié au Projet d'origine.

Produit

Le Produit représente une solution distribuée par le cabinet.

Il est indépendant :

du Client ;
du Projet ;
du Partenaire.

Il constitue une référence métier unique.

Partenaire

Le Partenaire représente l'organisme distribuant un ou plusieurs Produits.

Il possède :

ses procédures ;
ses contacts ;
ses API ;
sa documentation ;
ses indicateurs.
Document

Le Document représente un élément documentaire.

Exemples :

DER ;
Lettre de mission ;
Devoir de conseil ;
Contrat ;
Pièce d'identité ;
Offre de prêt.

Le Document est toujours relié à un ou plusieurs objets métier.

Interaction

Toute communication constitue une Interaction.

Exemples :

appel ;
email ;
SMS ;
rendez-vous ;
note ;
notification.

Les Interactions alimentent la Timeline.

Tâche

Une Tâche représente une action à réaliser.

Elle peut être :

créée par un utilisateur ;
créée par un Workflow ;
proposée par un Agent IA.
Workflow

Le Workflow décrit une suite d'actions automatiques.

Il pilote l'automatisation du cabinet.

Agent IA

Un Agent IA constitue un collaborateur numérique.

Chaque Agent possède :

une mission ;
des connaissances ;
des autorisations ;
un historique.
13. Les objets secondaires

Autour des objets fondamentaux gravitent des objets spécialisés.

Exemples :

Personne liée
Réclamation
Sinistre
Signature
Notification
Consentement RGPD
Audit
Version documentaire
Commission
Facture
Reversement
Agenda
Rendez-vous
Base de connaissances
Modèle documentaire

Ces objets enrichissent progressivement la plateforme.

14. Les objets techniques

Certains objets n'ont pas de rôle métier direct.

Ils permettent le fonctionnement de la plateforme.

Exemples :

Paramètres
Journal
Historique
Permissions
Authentification
Sessions
API
Synchronisations
Files d'attente
Logs IA

Ces objets restent invisibles pour les utilisateurs.

15. Les relations entre objets

Chaque objet possède des relations clairement définies.

Exemple :

Client
   │
   ├── Projets
   │      ├── Produits
   │      ├── Partenaires
   │      ├── Documents
   │      ├── Interactions
   │      ├── Tâches
   │      ├── Contrats
   │      └── Devoir de conseil
   │
   ├── Contrats
   ├── Personnes liées
   └── Historique

Aucune relation implicite n'est autorisée.

Toutes les relations doivent être documentées.

16. L'identifiant unique

Chaque objet possède un identifiant unique.

Cet identifiant :

ne change jamais ;
est utilisé dans toute la plateforme ;
permet la traçabilité ;
permet les synchronisations.

Les identifiants visibles par les utilisateurs peuvent être différents des identifiants techniques.

17. Les règles de nommage

Tous les objets respectent une nomenclature homogène.

Exemples :

Client
Projet
Contrat
Produit
Partenaire
Document
Interaction
Tâche

Les noms techniques utilisés dans la base devront rester cohérents avec le vocabulaire métier afin de faciliter la maintenance.

18. Critères de validation

Le modèle des objets métier sera considéré comme conforme lorsque :

chaque objet représente une réalité métier ;
les objets fondamentaux sont clairement identifiés ;
les objets secondaires enrichissent le modèle sans le complexifier inutilement ;
les objets techniques restent séparés des objets métier ;
toutes les relations sont documentées ;
chaque objet possède un identifiant unique et pérenne ;
la nomenclature est homogène dans toute la plateforme.

PARTIE 3 — Les relations entre les objets métier
19. Philosophie

La valeur de la plateforme ne réside pas uniquement dans les objets métier.

Elle réside surtout dans les relations qui les unissent.

Une donnée isolée a peu de valeur.

Une donnée reliée aux autres objets permet de comprendre le contexte, d'automatiser les traitements et d'assister le conseiller.

Toutes les relations doivent donc être explicites, documentées et pérennes.

20. Le Projet comme nœud central

Le Projet constitue le point de convergence de la plateforme.

Autour de lui gravitent l'ensemble des objets métier.

                   Client
                      │
                      │
        ┌──────────── Projet ─────────────┐
        │                                 │
    Produits                        Partenaires
        │                                 │
        ├────────── Contrats ─────────────┤
        │                                 │
   Documents                     Interactions
        │                                 │
      Tâches                    Workflows
        │                                 │
    Devoir de conseil            Conformité
        │                                 │
                  Agents IA

Aucun objet métier ne doit contourner le Projet lorsqu'il concerne une mission du cabinet.

21. Relation Client → Projet

Un Client peut posséder plusieurs Projets.

Exemples :

Assurance emprunteur
Protection de la famille
Assurance professionnelle
Assurance vie
Retraite

Chaque Projet conserve son autonomie.

L'historique du Client permet néanmoins de retrouver l'ensemble de son parcours.

22. Relation Projet → Contrats

Un Projet peut donner naissance à :

aucun contrat ;
un contrat ;
plusieurs contrats.

Exemple :

Projet Protection de la famille

↓

Garantie décès
Prévoyance
Protection juridique

Tous ces contrats restent reliés au Projet d'origine.

23. Relation Projet → Documents

Tous les documents sont liés à un Projet.

Un même document peut également être relié à :

un Client ;
un Contrat ;
un Partenaire ;
un Sinistre.

Le Projet reste néanmoins le point d'entrée principal.

24. Relation Projet → Produits

Un Projet peut étudier plusieurs Produits.

Chaque Produit peut être :

étudié ;
comparé ;
retenu ;
écarté.

La plateforme conserve l'ensemble de ces informations.

Le Produit n'est jamais dupliqué.

25. Relation Produit → Partenaire

Un Produit appartient à un ou plusieurs Partenaires.

Inversement, un Partenaire peut distribuer plusieurs Produits.

Il s'agit donc d'une relation plusieurs-à-plusieurs.

Cette relation doit permettre de stocker des informations spécifiques :

référence commerciale ;
conditions ;
commissions ;
disponibilité ;
API ;
documentation.
26. Relation Projet → Partenaires

Le Projet peut solliciter plusieurs Partenaires.

Exemple :

Projet Assurance emprunteur

↓

Kereis
UGIP
Néoliane

La plateforme conserve :

les demandes envoyées ;
les devis reçus ;
les refus ;
les délais ;
les observations.
27. Relation Projet → Interactions

Toutes les communications sont reliées au Projet.

Exemples :

Email
Téléphone
SMS
Rendez-vous
Message interne
Notification

La Timeline du Projet est construite à partir de ces relations.

28. Relation Projet → Tâches

Chaque Projet possède sa propre liste de tâches.

Les tâches peuvent être :

manuelles ;
automatiques ;
proposées par un Agent IA.

La suppression d'un Projet entraîne l'archivage de ses tâches.

29. Relation Projet → Agents IA

Les Agents IA n'interviennent jamais directement sur un Client.

Ils interviennent toujours dans le contexte d'un Projet.

Cela garantit que leurs analyses tiennent compte :

du besoin ;
des documents ;
du recueil des besoins ;
du devoir de conseil ;
de l'état d'avancement.

Cette règle limite les erreurs de contexte.

30. Les relations transversales

Certains objets peuvent être reliés simultanément à plusieurs domaines.

Exemples :

Un Document peut être relié à :

un Projet ;
un Contrat ;
un Partenaire.

Une Interaction peut être reliée à :

un Projet ;
un Sinistre ;
une Réclamation.

Ces relations enrichissent la navigation sans créer de doublons.

31. Navigation relationnelle

Depuis n'importe quel objet, l'utilisateur doit pouvoir naviguer vers les objets liés.

Exemple :

Depuis un Contrat :

↓

Projet

↓

Client

↓

Partenaire

↓

Produit

↓

Documents

↓

Devoir de conseil

↓

Interactions

L'utilisateur ne doit jamais avoir à effectuer une recherche manuelle pour retrouver une information liée.

32. Critères de validation

Le modèle relationnel sera considéré comme conforme lorsque :

le Projet constitue le point de convergence des objets métier ;
toutes les relations sont explicites ;
les relations plusieurs-à-plusieurs sont correctement identifiées ;
les objets peuvent être reliés sans duplication de données ;
les Agents IA interviennent toujours dans un contexte métier défini ;
la navigation entre objets est fluide et cohérente.

PARTIE 4 — Les principes de stockage des données
33. Philosophie

La base de données est conçue pour conserver une information fiable, cohérente et exploitable.

Elle ne constitue pas uniquement un espace de stockage.

Elle représente la mémoire du cabinet.

Chaque donnée doit pouvoir être retrouvée, comprise, reliée à son contexte et exploitée plusieurs années après sa création.

34. Source unique de vérité

Une information ne doit exister qu'à un seul endroit.

Exemples :

un Client possède une seule fiche Client ;
un Produit possède une seule fiche Produit ;
un Partenaire possède une seule fiche Partenaire ;
un Projet possède une seule fiche Projet.

Tous les autres objets utilisent des références vers cette donnée.

Aucune duplication n'est autorisée.

35. Séparation entre données permanentes et données contextuelles

La plateforme distingue deux types de données.

Données permanentes

Informations propres à l'objet.

Exemples :

nom du Client ;
date de naissance ;
SIREN ;
coordonnées.

Ces données évoluent peu.

Données contextuelles

Informations propres à un Projet.

Exemples :

montant du prêt ;
profession au moment du Projet ;
besoin exprimé ;
devis étudiés.

Elles restent attachées au Projet concerné.

Cette séparation garantit la cohérence des informations dans le temps.

36. Versionnement

Les objets sensibles sont versionnés.

Exemples :

Documents ;
Devoirs de conseil ;
Recueils des besoins ;
Modèles ;
Procédures ;
Base de connaissances.

Les anciennes versions restent consultables.

Aucune version n'est supprimée automatiquement.

37. Archivage

Lorsqu'un objet n'est plus actif, il est archivé.

L'archivage conserve :

les relations ;
les historiques ;
les documents ;
les journaux.

Les données archivées restent consultables selon les droits.

38. Suppression

La suppression est exceptionnelle.

Elle n'est autorisée que lorsque :

la réglementation l'impose ;
le RGPD le permet ;
aucune obligation légale de conservation ne s'applique.

Dans tous les autres cas, la plateforme privilégie l'archivage.

39. Traçabilité

Toute modification importante génère automatiquement un journal.

Le journal comprend :

la date ;
l'heure ;
l'utilisateur ;
l'objet concerné ;
la modification réalisée ;
l'ancienne valeur ;
la nouvelle valeur.

Cette traçabilité est obligatoire pour les objets réglementaires.

40. Intégrité des données

La plateforme contrôle automatiquement :

les doublons ;
les incohérences ;
les références invalides ;
les données orphelines ;
les informations incomplètes.

Les anomalies sont signalées avant validation.

41. Critères de validation

Le stockage des données sera considéré comme conforme lorsque :

chaque donnée possède une source unique ;
les données permanentes sont séparées des données contextuelles ;
les objets sensibles sont versionnés ;
l'archivage est privilégié à la suppression ;
toutes les modifications importantes sont historisées ;
des contrôles garantissent l'intégrité des données.

PARTIE 5 — L'historisation, les journaux et l'audit
42. Philosophie

La plateforme EJ Assurances est conçue selon un principe fondamental :

Une donnée importante ne disparaît jamais sans laisser de trace.

L'historisation ne répond pas uniquement à une exigence réglementaire.

Elle constitue la mémoire du cabinet.

Elle permet de comprendre :

ce qui a été fait ;
par qui ;
quand ;
pourquoi ;
dans quel contexte.
43. Les objets historisés

Tous les objets critiques sont historisés.

Notamment :

Client
Projet
Contrat
Produit
Partenaire
Document
Devoir de conseil
Recueil des besoins
Workflow
Tâche
Interaction
Agent IA

L'historisation est native.

Elle ne dépend jamais de l'utilisateur.

44. Les événements enregistrés

Chaque objet conserve son historique.

Exemples :

Création
auteur ;
date ;
origine.
Modification
ancienne valeur ;
nouvelle valeur ;
utilisateur ;
motif (si renseigné).
Validation
validateur ;
date ;
commentaire éventuel.
Archivage
date ;
utilisateur ;
raison.
45. Le journal d'audit

La plateforme dispose d'un journal d'audit global.

Il enregistre notamment :

connexions ;
déconnexions ;
consultations sensibles ;
modifications ;
téléchargements ;
exports ;
signatures ;
déclenchements de Workflows ;
interventions des Agents IA.

Ce journal est protégé contre toute modification.

46. Historique métier

Au-delà du journal technique, chaque objet possède un historique métier.

Exemple pour un Projet :

02/07 : Projet créé

03/07 : DER envoyé

03/07 : Lettre de mission générée

04/07 : Signature reçue

05/07 : Documents validés

06/07 : Devoir de conseil généré

07/07 : Contrat signé

Cet historique est compréhensible par les utilisateurs.

Il ne contient pas d'informations techniques.

47. Journal technique

En parallèle, un journal technique est conservé.

Il comprend notamment :

API appelées ;
synchronisations Google Workspace ;
traitements IA ;
erreurs système ;
temps d'exécution ;
identifiants techniques.

Ce journal est destiné aux administrateurs et aux développeurs.

48. Historique des Agents IA

Chaque intervention d'un Agent IA est historisée.

La plateforme conserve :

l'Agent concerné ;
le Projet concerné ;
la demande reçue ;
les documents consultés ;
les règles métier utilisées ;
la réponse produite ;
la validation ou le refus de l'utilisateur.

Cette traçabilité garantit l'explicabilité des actions de l'IA.

49. Comparaison des versions

Pour les objets versionnés, la plateforme permet de comparer deux versions.

Exemples :

deux devoirs de conseil ;
deux recueils des besoins ;
deux procédures ;
deux documents.

Les différences sont mises en évidence afin de faciliter les contrôles et les audits.

50. Conservation des journaux

Les journaux sont conservés conformément :

aux obligations légales ;
aux exigences réglementaires ;
à la politique interne du cabinet.

La durée de conservation est paramétrable selon la nature des données.

51. Recherche dans l'historique

Les utilisateurs autorisés peuvent effectuer des recherches selon :

l'objet ;
l'utilisateur ;
la période ;
le type d'événement ;
le Projet ;
le Client.

Cette recherche permet de retrouver rapidement un événement précis.

52. Critères de validation

Le système d'historisation sera considéré comme conforme lorsque :

tous les objets critiques sont historisés ;
les modifications sont traçables ;
un journal d'audit global est disponible ;
chaque Projet possède un historique métier lisible ;
les traitements techniques sont consignés séparément ;
les interventions des Agents IA sont explicables ;
les versions peuvent être comparées ;
les journaux respectent les règles de conservation applicables.

PARTIE 6 — Gouvernance de la donnée et évolutivité
53. Philosophie

La base de données d'EJ Assurances est conçue pour accompagner le développement du cabinet pendant de nombreuses années.

Elle ne doit jamais être reconstruite à chaque évolution fonctionnelle.

L'objectif est de disposer d'un modèle métier stable, extensible et documenté.

Toute évolution doit préserver les données existantes et respecter les principes définis dans ce document.

54. Gouvernance de la donnée

Chaque donnée possède un responsable métier.

Le responsable métier est garant :

de la qualité des données ;
de leur cohérence ;
de leur évolution ;
de leur conformité.

La gouvernance de la donnée est indépendante de son implémentation technique.

55. Classification des données

Les données sont classées selon leur nature.

Données métier

Exemples :

Client
Projet
Contrat
Produit
Partenaire
Données réglementaires

Exemples :

DER
Lettre de mission
Devoir de conseil
Recueil des besoins
Consentements
Données documentaires

Exemples :

PDF
Images
Pièces justificatives
Contrats
Courriers
Données techniques

Exemples :

Logs
Sessions
Synchronisations
Paramètres
Files d'attente

Cette classification facilite la gouvernance et la sécurité.

56. Cycle de création d'un nouvel objet métier

Tout nouvel objet intégré à la plateforme devra respecter les étapes suivantes :

Définition de son objectif métier.
Identification de son propriétaire.
Définition de ses relations avec les autres objets.
Définition de son cycle de vie.
Définition des droits d'accès.
Définition des règles d'historisation.
Documentation dans le référentiel.

Aucun objet ne pourra être ajouté sans suivre ce processus.

57. Principe d'évolutivité

L'ajout d'une nouvelle fonctionnalité ne doit jamais nécessiter la remise en cause des objets fondamentaux.

Les évolutions doivent s'appuyer sur les objets existants ou créer de nouveaux objets clairement identifiés.

L'architecture privilégie l'extension plutôt que la modification des fondations.

58. Compatibilité avec les Agents IA

La structure des données est conçue pour être exploitable par les Agents IA.

Chaque objet doit pouvoir fournir :

son contexte métier ;
ses relations ;
son historique ;
ses documents associés ;
ses règles métier.

Les Agents IA accèdent aux données selon leurs autorisations et toujours dans le contexte d'un Projet.

59. Compatibilité avec Google Workspace

La base de données reste la source de vérité.

Google Workspace constitue une infrastructure documentaire complémentaire.

Les synchronisations sont réalisées automatiquement.

Aucune donnée métier ne doit dépendre exclusivement d'un service externe.

En cas de perte ou d'indisponibilité d'un service tiers, la plateforme conserve l'intégralité des informations essentielles.

60. Compatibilité avec les API partenaires

Les échanges avec les partenaires reposent sur des connecteurs.

Chaque connecteur doit être indépendant des objets métier.

Ainsi :

un changement d'API ne remet pas en cause le modèle de données ;
un nouveau partenaire peut être intégré sans modifier les objets fondamentaux ;
plusieurs partenaires peuvent utiliser des technologies différentes.
61. Documentation permanente

Le référentiel documentaire constitue la documentation officielle de la plateforme.

Toute évolution de la base de données devra entraîner une mise à jour des documents concernés.

Le référentiel devient la source unique de vérité pour les développeurs, les administrateurs et les Agents IA.

62. Principes fondateurs de la donnée

La plateforme respecte les principes suivants :

une donnée est créée une seule fois ;
une donnée possède un propriétaire ;
une donnée est historisée ;
une donnée est contextualisée ;
une donnée est reliée aux autres objets ;
une donnée est exploitable par les Workflows ;
une donnée est exploitable par les Agents IA ;
une donnée reste indépendante des outils externes.

Ces principes guident l'ensemble des développements.

63. Critères de validation

Le modèle de gouvernance des données sera considéré comme conforme lorsque :

chaque donnée possède un responsable métier ;
les objets sont correctement classifiés ;
toute évolution suit un processus documenté ;
l'architecture reste extensible ;
les Agents IA exploitent les données sans remettre en cause leur intégrité ;
Google Workspace reste une infrastructure et non la source de vérité ;
les API partenaires sont découplées du modèle métier ;
le référentiel documentaire est systématiquement mis à jour.
64. Conclusion

La base de données constitue le socle technique de la plateforme EJ Assurances.

Elle ne représente pas une simple structure informatique.

Elle formalise le modèle métier du cabinet et garantit la cohérence de l'ensemble des fonctionnalités.

Sa conception privilégie la stabilité, l'évolutivité, la traçabilité et la réutilisation des données afin d'accompagner durablement le développement d'EJ Assurances.
