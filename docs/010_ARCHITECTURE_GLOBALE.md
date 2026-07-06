PARTIE 1 — Vision architecturale
1. Objet du document

Ce document décrit l'architecture globale de la plateforme EJ Assurances.

Il ne décrit pas les technologies utilisées.

Il décrit la manière dont l'ensemble des composants de la plateforme s'articulent afin de répondre à la mission du cabinet.

Ce document constitue le référentiel principal de conception.

Tous les autres documents devront être compatibles avec cette architecture.

2. Notre philosophie

La plateforme EJ Assurances n'est ni un site internet, ni un CRM, ni un ensemble d'agents IA.

Elle constitue un système d'exploitation métier (Business Operating System) dédié aux cabinets de courtage en assurances.

Sa vocation est de permettre à un cabinet de gérer l'ensemble de son activité depuis une plateforme unique.

Cette plateforme doit permettre de gérer :

la relation client ;
les projets ;
les contrats ;
la conformité ;
les partenaires ;
les produits ;
les documents ;
les échanges ;
les workflows ;
les agents IA.

L'objectif n'est pas de multiplier les outils.

L'objectif est de supprimer les ruptures entre eux.

3. Les grands principes

Toute décision d'architecture doit respecter les principes suivants.

Principe n°1

Une seule plateforme.

L'utilisateur ne doit jamais avoir besoin de changer d'outil pour poursuivre son travail.

Principe n°2

Une seule donnée.

Une information n'est enregistrée qu'une seule fois.

Les autres modules viennent la consulter.

Principe n°3

Un seul projet.

Le projet constitue l'unité centrale de travail.

Toutes les informations relatives à un besoin client sont regroupées dans ce projet.

Principe n°4

Une seule bibliothèque documentaire.

Les documents ne sont jamais dupliqués.

Ils sont simplement liés aux différents modules qui en ont besoin.

Principe n°5

Une seule expérience utilisateur.

Qu'il soit client, mandataire, collaborateur ou administrateur, l'utilisateur retrouve toujours les mêmes codes visuels et les mêmes habitudes de navigation.

4. Les cinq piliers de la plateforme

L'ensemble de la plateforme repose sur cinq piliers.

Pilier 1 — La Relation

Il regroupe tous les acteurs.

Prospect
Client
Mandataire
Collaborateur
Prescripteur
Partenaire
Compagnie
Administrateur

Chaque acteur possède un rôle, des droits et une vue adaptée.

Pilier 2 — Le Projet

Le projet constitue le cœur de la plateforme.

Chaque besoin exprimé par un client devient un projet.

Exemples :

Assurance emprunteur
Protection familiale
Assurance professionnelle
Retraite
Assurance vie
Prévoyance

Un client peut posséder plusieurs projets.

Chaque projet suit son propre cycle de vie.

Pilier 3 — La Connaissance

La plateforme centralise toutes les connaissances nécessaires au cabinet.

Elle comprend notamment :

les partenaires ;
les produits ;
les documents ;
les procédures ;
les guides ;
les modèles ;
les obligations réglementaires.

Cette connaissance alimente :

les conseillers ;
les mandataires ;
les collaborateurs ;
les agents IA.
Pilier 4 — Les Processus

Ce pilier orchestre l'ensemble des traitements.

Il comprend notamment :

les workflows ;
les tâches ;
les validations ;
les signatures ;
les relances ;
les notifications ;
les synchronisations.

L'utilisateur ne pilote pas les processus.

Il pilote ses projets.

Les processus travaillent en arrière-plan.

Pilier 5 — L'Intelligence

Ce pilier regroupe les agents IA.

Ils assistent les utilisateurs dans leurs missions.

Ils peuvent :

préparer ;
contrôler ;
organiser ;
résumer ;
rédiger ;
analyser.

Ils ne remplacent jamais la responsabilité humaine.

5. Le cœur de la plateforme

Le cœur fonctionnel est constitué du Projet.

Le projet relie :

les personnes ;
les documents ;
les produits ;
les partenaires ;
les tâches ;
les emails ;
les rendez-vous ;
les contrats ;
les recommandations ;
les workflows ;
les agents IA.

Le projet devient ainsi le point d'entrée unique de toute l'activité métier.

6. Ce que nous refusons

L'architecture EJ Assurances refuse :

les données dupliquées ;
les modules isolés ;
les ressaisies ;
les documents multiples ;
les logiciels qui ne communiquent pas entre eux ;
les IA travaillant sans contexte métier ;
les développements sans documentation préalable.

Chaque évolution devra renforcer la cohérence globale de la plateforme.

7. Vision à long terme

À terme, la plateforme devra permettre à un cabinet de gérer l'intégralité de son activité depuis un environnement unique.

Le site internet, le CRM, la GED, les espaces utilisateurs, les partenaires, les workflows, Google Workspace et les agents IA ne devront plus être perçus comme des outils distincts.

Ils devront fonctionner comme les différentes composantes d'un même système.

Le succès de la plateforme ne sera pas mesuré au nombre de fonctionnalités.

Il sera mesuré à la simplicité avec laquelle un utilisateur pourra accomplir son travail.

8. Critères de validation

Cette architecture sera considérée comme respectée lorsque :

chaque nouvelle fonctionnalité s'intègre naturellement aux cinq piliers ;
aucune donnée n'est dupliquée ;
chaque projet devient la référence de travail ;
les modules communiquent entre eux ;
les utilisateurs bénéficient d'une expérience cohérente ;
les automatisations restent invisibles pour l'utilisateur final.
🏛️ Décision d'architecture n°001

Le Projet est l'objet métier central d'EJ Assurances.

Toutes les évolutions futures devront respecter le cycle suivant :

Prospect
        │
        ▼
Client
        │
        ▼
Projet
        │
 ┌──────┼────────────────────────────────────────────┐
 │      │         │          │          │            │
 ▼      ▼         ▼          ▼          ▼            ▼
GED   Partenaires Produits  IA   Conformité   Google Workspace
        │
        ▼
Recueil des besoins
        ▼
Étude
        ▼
Comparaison
        ▼
Devoir de conseil
        ▼
Contrat(s)
        ▼
Suivi



PARTIE 2 — Les domaines fonctionnels de la plateforme
9. Une plateforme organisée par domaines métier

La plateforme EJ Assurances est organisée autour de domaines fonctionnels.

Chaque domaine répond à une mission précise.

Les domaines ne sont jamais indépendants.

Ils communiquent tous entre eux autour d'un élément central : le Projet.

L'objectif est de construire une plateforme modulaire, évolutive et cohérente.

Chaque nouveau module devra naturellement trouver sa place dans l'un de ces domaines.

10. Domaine « Relation »
Mission

Gérer toutes les relations entre le cabinet et son écosystème.

Il regroupe notamment :

les prospects ;
les clients ;
les mandataires (MIA) ;
les collaborateurs ;
les prescripteurs ;
les partenaires ;
les compagnies d'assurance ;
les fournisseurs.

Chaque personne ou organisation possède une fiche unique.

Aucune information n'est dupliquée.

11. Domaine « Projet »

Le Projet constitue le cœur opérationnel de la plateforme.

Chaque projet représente un besoin réel exprimé par un client.

Exemples :

Changer son assurance emprunteur.
Préparer sa retraite.
Protéger sa famille.
Mettre en place une prévoyance.
Assurer une entreprise.
Ouvrir une assurance vie.

Chaque projet possède :

son responsable ;
son historique ;
ses documents ;
ses tâches ;
ses échanges ;
ses produits étudiés ;
son devoir de conseil ;
son niveau de conformité ;
ses signatures ;
son ou ses contrats.

Le projet vit indépendamment des contrats.

Il peut évoluer pendant plusieurs années.

12. Domaine « Produits »

Ce domaine centralise l'ensemble des produits distribués par le cabinet.

Chaque produit possède une fiche unique.

Cette fiche contient notamment :

Informations générales
Nom du produit
Famille
Catégorie
Partenaire
Statut
Conditions
Public concerné
Conditions d'éligibilité
Garanties principales
Exclusions principales
Limites
Documents associés
IPID
Conditions Générales
Notice
Fiche produit
Documents commerciaux
Connectivité
API devis
API souscription
API suivi

Les produits ne sont jamais saisis directement dans les projets.

Les projets référencent les produits.

13. Domaine « Partenaires »

Ce domaine constitue la base de connaissance des partenaires.

Il regroupe notamment :

compagnies ;
courtiers grossistes ;
banques ;
mutuelles ;
plateformes ;
organismes de financement ;
prestataires.

Chaque partenaire possède :

ses contacts ;
ses conventions ;
ses produits ;
ses procédures ;
ses documents ;
ses API ;
ses historiques.

Le partenaire devient la référence officielle de toutes les informations le concernant.

14. Domaine « Bibliothèque documentaire »

Tous les documents de la plateforme sont centralisés dans une bibliothèque documentaire unique.

Cette bibliothèque contient notamment :

Documents clients
CNI
Justificatifs
Contrats
Courriers
Pièces administratives
Documents partenaires
Conventions
Conditions Générales
IPID
Notices
Guides
Documents internes
Procédures
Modèles
Check-lists
Documents conformité

Chaque document possède :

une version ;
une date de création ;
une date de mise à jour ;
un propriétaire ;
des droits d'accès ;
des liens avec les projets concernés.

Un document est stocké une seule fois.

Il peut être affiché dans plusieurs modules.

15. Domaine « Conformité »

La conformité est intégrée dans toute la plateforme.

Elle ne constitue pas un module indépendant.

Elle intervient dans tous les domaines.

Elle couvre notamment :

ACPR ;
DDA ;
RGPD ;
devoir de conseil ;
recueil des besoins ;
remise documentaire ;
journal d'audit ;
gestion des réclamations ;
contrôle des mandataires.

Chaque action importante laisse une preuve.

16. Domaine « Communication »

La plateforme centralise tous les échanges.

Elle gère notamment :

emails ;
appels ;
SMS ;
notifications ;
messages internes ;
rendez-vous ;
signatures.

Chaque échange est automatiquement rattaché au projet concerné.

Aucun échange ne doit rester isolé.

17. Domaine « Intelligence Artificielle »

Les agents IA interviennent comme des assistants spécialisés.

Ils ne possèdent pas leurs propres données.

Ils exploitent les informations déjà présentes dans la plateforme.

Ils peuvent :

analyser ;
préparer ;
résumer ;
relancer ;
contrôler ;
rédiger.

Toutes leurs actions sont historisées.

Le conseiller conserve toujours la responsabilité des décisions.

18. Domaine « Pilotage »

Ce domaine permet de piloter l'activité du cabinet.

Il comprend notamment :

tableaux de bord ;
indicateurs ;
objectifs ;
statistiques ;
qualité ;
conformité ;
rentabilité.

L'objectif est d'aider les dirigeants à prendre des décisions.

19. Domaine « Automatisation »

Ce domaine orchestre les traitements automatiques.

Il comprend notamment :

workflows ;
tâches automatiques ;
synchronisations ;
Google Workspace ;
notifications ;
relances ;
génération documentaire ;
signatures électroniques.

L'utilisateur pilote les projets.

Le système pilote les processus.

20. Relations entre les domaines

Aucun domaine ne fonctionne seul.

Exemple :

Client
   │
   ▼
Projet
   │
   ├──────────► Produits
   │
   ├──────────► Partenaires
   │
   ├──────────► Bibliothèque documentaire
   │
   ├──────────► Communication
   │
   ├──────────► Conformité
   │
   ├──────────► Automatisations
   │
   ├──────────► Google Workspace
   │
   ├──────────► IA
   │
   └──────────► Pilotage

Le Projet reste le point central.

Les autres domaines viennent enrichir le projet.

21. Critères de validation

L'architecture fonctionnelle sera considérée comme respectée lorsque :

chaque fonctionnalité appartient clairement à un domaine ;
aucun domaine ne duplique les responsabilités d'un autre ;
le Projet reste le centre des échanges ;
tous les domaines peuvent communiquer entre eux ;
les utilisateurs bénéficient d'une expérience cohérente quel que soit leur rôle.

PARTIE 3 — Le cycle de vie d'un Projet
22. Philosophie du Projet

Le Projet constitue l'unité de travail principale de la plateforme EJ Assurances.

Il représente un besoin exprimé par un client ou un prospect.

Le Projet est indépendant du contrat.

Un Projet peut aboutir :

à aucun contrat ;
à un contrat ;
à plusieurs contrats ;
à une révision d'un contrat existant.

Le Projet conserve l'intégralité de son historique afin de garantir la traçabilité des échanges, des décisions et des obligations réglementaires.

23. Les états du Projet

Chaque Projet évolue selon un cycle de vie unique.

Prospect identifié
        │
        ▼
Projet créé
        │
        ▼
Recueil des besoins
        │
        ▼
Analyse
        │
        ▼
Étude des solutions
        │
        ▼
Comparaison
        │
        ▼
Devoir de conseil
        │
        ▼
Validation client
        │
        ▼
Souscription
        │
        ▼
Contrat actif
        │
        ▼
Suivi
        │
        ▼
Évolution
        │
        ▼
Archivage

Chaque changement d'état est historisé.

24. Création d'un Projet

Un Projet peut être créé depuis :

le site internet ;
l'espace client ;
un conseiller ;
un mandataire ;
un collaborateur ;
un prescripteur ;
une API partenaire ;
une importation.

La création d'un Projet génère automatiquement :

un identifiant unique ;
une date de création ;
un responsable ;
un type de projet ;
un historique.
25. Qualification

Lors de la qualification, le système détermine notamment :

le type de besoin ;
le niveau de priorité ;
le niveau de complexité ;
les produits susceptibles de répondre au besoin ;
les partenaires concernés.

Les agents IA peuvent assister cette qualification.

Le conseiller conserve la validation.

26. Recueil des besoins

Le recueil des besoins constitue une étape obligatoire.

Le formulaire est intégré à la plateforme.

Il adopte le Design System EJ Assurances.

Il ne s'agit jamais d'un Google Form visible par le client.

Les informations recueillies alimentent automatiquement :

le Projet ;
le CRM ;
la conformité ;
les workflows ;
Google Workspace.

Le client ne saisit jamais deux fois la même information.

27. Génération documentaire

Une fois le recueil des besoins terminé, la plateforme génère automatiquement les documents nécessaires.

Selon le type de Projet, cela peut comprendre :

Lettre de mission
DER
Documents réglementaires
Demandes de pièces
Check-list documentaire

Ces documents sont générés à partir des modèles officiels.

Ils sont automatiquement enregistrés dans la bibliothèque documentaire.

28. Signature électronique

Lorsque des documents nécessitent une signature :

la plateforme prépare automatiquement la demande.

Le client signe depuis son espace sécurisé.

Une fois la signature réalisée :

le document signé est récupéré ;
le Projet est mis à jour ;
les workflows suivants sont déclenchés.
29. Étude des solutions

Une fois les éléments nécessaires réunis :

le conseiller lance l'étude.

La plateforme peut utiliser :

les API partenaires ;
les extranets ;
les simulateurs ;
les outils internes.

Les devis obtenus sont automatiquement rattachés au Projet.

30. Sélection des produits

Les produits étudiés proviennent exclusivement du catalogue Produits.

Chaque produit reste relié à :

son partenaire ;
ses documents ;
son IPID ;
ses Conditions Générales ;
ses fiches techniques.

Le Projet ne stocke jamais une copie des documents.

Il référence la bibliothèque documentaire.

31. Préparation du devoir de conseil

La plateforme prépare automatiquement le devoir de conseil en utilisant :

le recueil des besoins ;
les informations du Projet ;
les produits retenus ;
les documents partenaires ;
les observations du conseiller.

Le conseiller peut modifier le document avant validation.

La validation finale reste toujours humaine.

32. Validation client

Le client consulte :

les recommandations ;
les documents ;
le devoir de conseil.

Il peut :

poser des questions ;
demander des précisions ;
accepter ;
refuser.

Toutes les actions sont historisées.

33. Souscription

Une fois la validation obtenue :

la plateforme prépare la souscription.

Selon les partenaires :

via API ;
via extranet ;
via génération documentaire.

Les informations déjà connues sont réutilisées.

Aucune ressaisie inutile.

34. Vie du contrat

Une fois le contrat actif :

le Projet reste vivant.

Il continue de centraliser :

les avenants ;
les sinistres ;
les réclamations ;
les renouvellements ;
les nouvelles opportunités ;
les échanges.

Le Projet devient le dossier permanent de la relation client.

35. Clôture et archivage

Un Projet peut être clôturé lorsque :

le besoin est satisfait ;
le client abandonne ;
le dossier est refusé ;
le Projet est remplacé.

Même archivé :

le Projet reste consultable selon les droits.

Aucune donnée n'est supprimée sans respecter les obligations légales.

36. Les événements du Projet

Chaque événement est automatiquement historisé.

Exemples :

création ;
modification ;
document ajouté ;
document signé ;
email envoyé ;
appel ;
rendez-vous ;
devis reçu ;
contrat souscrit ;
intervention IA ;
validation humaine.

Cet historique constitue la mémoire du Projet.

37. Les IA dans le cycle de vie

Les agents IA interviennent à différents moments.

Ils peuvent :

préparer un email ;
vérifier la conformité ;
proposer des produits ;
contrôler les pièces manquantes ;
préparer un devoir de conseil ;
générer un résumé.

Ils n'interviennent jamais sans laisser de trace.

Toutes leurs actions sont historisées.

38. Critères de validation

Le cycle de vie d'un Projet est considéré comme conforme lorsque :

chaque étape est identifiable ;
chaque changement est historisé ;
les documents sont automatiquement rattachés au Projet ;
les données ne sont jamais ressaisies inutilement ;
les workflows sont déclenchés automatiquement ;
les interventions humaines et IA sont distinguées ;
le Projet reste la référence unique tout au long de son existence.


PARTIE 4 — Les Domaines de la Plateforme et leurs interactions
39. Principe général

La plateforme EJ Assurances est composée de plusieurs domaines fonctionnels.

Chaque domaine possède une responsabilité métier clairement définie.

Un domaine ne travaille jamais seul.

Il échange en permanence avec les autres domaines afin d'offrir une vision unique du Projet.

Aucun domaine ne possède sa propre base métier indépendante.

Toutes les informations sont partagées autour du Projet.

40. Domaine Relation

Le Domaine Relation gère l'ensemble des personnes physiques et morales.

Il comprend notamment :

Prospects
Clients
Mandataires
Collaborateurs
Prescripteurs
Partenaires
Compagnies
Fournisseurs

Une personne ou une organisation n'existe qu'une seule fois dans la plateforme.

Les autres domaines viennent simplement s'y rattacher.

41. Domaine Projet

Le Domaine Projet constitue le cœur de la plateforme.

Chaque Projet possède :

un responsable ;
un statut ;
un niveau de priorité ;
un historique ;
des documents ;
des tâches ;
des événements ;
un niveau de conformité ;
des produits étudiés ;
un ou plusieurs contrats.

Tous les autres domaines gravitent autour du Projet.

42. Domaine Partenaires

Le Domaine Partenaires centralise l'ensemble des partenaires du cabinet.

Il comprend notamment :

Compagnies d'assurances
Courtiers grossistes
Mutuelles
Banques
Organismes financiers
Prestataires
Fournisseurs de services

Chaque partenaire possède une fiche unique.

Cette fiche contient :

Informations générales
Coordonnées
Contacts
Inspecteurs
Gestionnaires
Services sinistres
Documents
Convention
Conditions Générales
IPID
Fiches produits
Notices
Guides
API
API Devis
API Souscription
API Sinistre
API Contrat
Produits distribués

Chaque produit est directement rattaché à son partenaire.

43. Domaine Produits

Le Domaine Produits constitue la base de connaissance métier du cabinet.

Chaque produit possède une fiche complète.

Cette fiche comprend notamment :

Identification
Nom
Famille
Catégorie
Partenaire
Commercial
Public cible
Garanties
Exclusions
Conditions
Documentation
IPID
Conditions Générales
Fiche Produit
Notices
Technique
API disponibles
Version
Statut

Les produits servent notamment :

aux conseillers ;
aux mandataires ;
aux IA ;
au devoir de conseil ;
aux comparatifs.
44. Domaine Bibliothèque documentaire

Tous les documents de la plateforme sont centralisés.

Ils sont ensuite liés aux différents objets métiers.

Un document peut être utilisé simultanément dans :

un Projet ;
un Produit ;
un Partenaire ;
un Contrat ;
un Client ;
un Devoir de conseil ;
un Espace Client ;
un Workflow.

Le document reste unique.

45. Domaine Communication

Le Domaine Communication centralise tous les échanges.

Il comprend :

Emails
SMS
Téléphone
Courriers
Notifications
Rendez-vous
Messagerie interne

Chaque échange est automatiquement relié au Projet concerné.

L'objectif est qu'un utilisateur retrouve l'intégralité des échanges depuis le Projet.

46. Domaine Conformité

La conformité traverse toute la plateforme.

Elle intervient dans chacun des domaines.

Elle contrôle notamment :

Recueil des besoins
DER
Lettre de mission
Devoir de conseil
Documents remis
Signature
Réclamations
Pièces obligatoires
Formation des mandataires
Classeur ACPR

Le Domaine Conformité ne produit pas les documents.

Il vérifie qu'ils existent et qu'ils respectent les exigences réglementaires.

47. Domaine IA

Les agents IA exploitent les informations disponibles dans les autres domaines.

Ils ne créent jamais leur propre base de données.

Ils utilisent :

les Projets ;
les Produits ;
les Partenaires ;
les Documents ;
les Emails ;
les Événements ;
les Workflows.

Chaque intervention est historisée.

48. Domaine Workflows

Le Domaine Workflows pilote les automatismes.

Il décide :

quand envoyer un email ;
quand créer une tâche ;
quand demander une signature ;
quand relancer un client ;
quand relancer un partenaire ;
quand solliciter un agent IA.

Les Workflows pilotent les actions.

Ils ne prennent jamais les décisions métier.

49. Domaine Google Workspace

Google Workspace constitue le moteur documentaire de la plateforme.

Il comprend notamment :

Gmail
Google Calendar
Google Drive
Google Docs
Google Sheets
Google Meet
Google Contacts
Google Tasks
Google Signature

L'utilisateur ne travaille jamais directement dans Google.

Il travaille depuis EJ Assurances.

La plateforme échange automatiquement avec Google Workspace lorsque cela est nécessaire.

50. Domaine Pilotage

Le Domaine Pilotage permet aux dirigeants de suivre l'activité du cabinet.

Il centralise notamment :

tableaux de bord ;
indicateurs ;
statistiques ;
rentabilité ;
conformité ;
délais de traitement ;
qualité de service ;
activité des mandataires ;
activité des agents IA.
51. Les interactions entre les domaines

Chaque domaine communique avec les autres.

Exemple :

Prospect

↓

Projet

↓

Recueil des besoins

↓

Produits proposés

↓

Partenaires concernés

↓

Documents associés

↓

Google Workspace

↓

Signature

↓

Devoir de conseil

↓

Souscription

↓

Contrat

↓

Suivi

↓

Pilotage

Le Projet reste le fil conducteur.

52. Une architecture orientée services

Chaque domaine est conçu comme un service spécialisé.

Les domaines collaborent.

Ils ne se remplacent jamais.

Cette approche permet :

une meilleure évolutivité ;
une meilleure maintenance ;
une meilleure réutilisation ;
une meilleure sécurité ;
une meilleure compréhension fonctionnelle.
53. Critères de validation

Cette architecture sera considérée comme conforme lorsque :

chaque domaine possède une responsabilité clairement définie ;
chaque donnée possède une source unique ;
chaque domaine communique avec les autres ;
le Projet reste le centre de la plateforme ;
aucun domaine ne fonctionne de manière isolée ;
toute évolution future peut être intégrée sans remettre en cause l'architecture existante.


PARTIE 5 — Les principes d'architecture transverses
54. Une seule source de vérité

Chaque information de la plateforme possède une source de vérité unique.

Elle est créée une seule fois puis réutilisée dans tous les domaines concernés.

Exemples :

Un client est créé une seule fois.
Un partenaire est créé une seule fois.
Un produit est créé une seule fois.
Un document est stocké une seule fois.
Un Projet est créé une seule fois.

Tous les autres domaines consultent ces informations sans les dupliquer.

55. Le principe des vues

Les utilisateurs ne consultent pas tous les mêmes informations.

Ils consultent une vue adaptée à leur rôle.

Exemple :

Le même Projet pourra être visualisé par :

le Client ;
le Mandataire ;
le Collaborateur ;
le Gestionnaire ;
l'Administrateur ;
un Agent IA.

Le Projet reste identique.

Seule la présentation des informations évolue selon les droits accordés.

56. Une architecture orientée événements

La plateforme fonctionne selon le principe des événements.

Chaque action importante génère un événement.

Exemples :

Création d'un Projet.
Ajout d'un document.
Signature d'un document.
Réception d'un devis.
Création d'un sinistre.
Réponse d'un partenaire.
Validation du devoir de conseil.

Ces événements peuvent déclencher automatiquement des workflows.

57. Les workflows

Les workflows orchestrent les traitements automatiques.

Ils peuvent notamment :

créer une tâche ;
envoyer un email ;
créer un document ;
demander une signature ;
prévenir un utilisateur ;
relancer un client ;
relancer un partenaire ;
solliciter un Agent IA.

Les workflows ne prennent jamais une décision métier.

Ils exécutent des règles définies par le cabinet.

58. Google Workspace

Google Workspace constitue l'environnement documentaire de la plateforme.

Il intervient notamment pour :

les emails ;
les agendas ;
les documents ;
les feuilles de calcul ;
les signatures électroniques ;
les espaces Drive.

L'utilisateur travaille toujours depuis EJ Assurances.

Google Workspace fonctionne en arrière-plan.

59. Bibliothèque documentaire

La plateforme possède une bibliothèque documentaire unique.

Chaque document dispose notamment :

d'un identifiant unique ;
d'une catégorie ;
d'un propriétaire ;
d'une version ;
d'un historique ;
de droits d'accès ;
de liens avec les domaines concernés.

Le document n'est jamais copié.

Il est simplement référencé.

60. Les API

Les API permettent de communiquer avec les partenaires.

Exemples :

devis ;
souscription ;
suivi des contrats ;
suivi des sinistres ;
authentification ;
récupération documentaire.

Les API sont toujours rattachées au partenaire concerné.

61. Les Agents IA

Les Agents IA constituent des assistants spécialisés.

Ils interviennent uniquement dans le cadre de leur mission.

Ils travaillent toujours sur le contexte d'un Projet.

Ils ne disposent jamais d'un accès illimité à l'ensemble de la plateforme.

Chaque Agent IA possède :

un rôle ;
un périmètre d'action ;
des autorisations ;
des limites ;
une traçabilité.
62. Sécurité

Chaque action est contrôlée.

Les accès sont déterminés par :

le rôle ;
les autorisations ;
le contexte ;
le Projet concerné.

Les données sont cloisonnées lorsque cela est nécessaire.

Toutes les opérations sensibles sont historisées.

63. Évolutivité

L'architecture doit permettre l'ajout de nouveaux domaines sans remettre en cause les domaines existants.

Chaque évolution devra respecter les principes définis dans ce document.

Aucun développement ne devra créer de dépendance forte avec une technologie particulière.

La plateforme doit pouvoir évoluer sur plusieurs années.

64. Performance

La plateforme doit privilégier :

la rapidité d'affichage ;
la simplicité d'utilisation ;
la réduction des ressaisies ;
l'automatisation des tâches répétitives ;
la centralisation des informations.

Les traitements lourds seront réalisés en arrière-plan dès que possible.

65. Critères de validation

L'architecture globale sera considérée comme validée lorsque :

chaque domaine respecte une responsabilité claire ;
chaque donnée possède une source unique ;
chaque Projet constitue le point central des échanges ;
les workflows orchestrent les traitements automatiques ;
Google Workspace fonctionne en arrière-plan ;
les Agents IA interviennent uniquement dans leur périmètre ;
les utilisateurs disposent d'une vue adaptée à leurs droits ;
l'architecture permet d'ajouter de nouveaux domaines sans remettre en cause les fondations existantes.

