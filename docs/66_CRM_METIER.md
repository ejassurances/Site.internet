PARTIE 1 — Philosophie du CRM
1. Objet du document

Ce document décrit le fonctionnement métier du CRM EJ Assurances.

Il constitue la référence fonctionnelle de l'ensemble de la plateforme.

Son objectif est de définir précisément :

les objets métiers ;
les relations entre les objets ;
les parcours de traitement ;
les règles métier ;
les interactions entre les domaines.

Aucune fonctionnalité du CRM ne devra être développée sans respecter les règles définies dans ce document.

2. Philosophie générale

Le CRM EJ Assurances n'est pas un logiciel de gestion de contacts.

Il est le poste de pilotage de l'ensemble de l'activité du cabinet.

Il doit permettre de gérer :

la relation client ;
les projets ;
les obligations réglementaires ;
les partenaires ;
les produits ;
les contrats ;
les workflows ;
les documents ;
les Agents IA.

L'objectif principal est de supprimer les doubles saisies et de centraliser l'ensemble des informations dans un environnement unique.

3. Le Projet constitue le cœur du CRM

Le CRM est construit autour du Projet.

Le Projet représente un besoin exprimé par un Prospect ou un Client.

Exemples :

Changer une assurance emprunteur.
Préparer sa retraite.
Assurer une entreprise.
Mettre en place une prévoyance.
Protéger une famille.
Déclarer un sinistre.
Effectuer une réclamation.

Chaque Projet possède son propre cycle de vie.

Il conserve :

son historique ;
ses documents ;
ses échanges ;
ses tâches ;
ses signatures ;
ses produits étudiés ;
ses partenaires ;
ses décisions ;
ses contrats.
4. Les objets métiers du CRM

Le CRM est composé d'objets métiers.

Chaque objet possède une responsabilité précise.

Les principaux objets sont :

Prospect
Client
Projet
Produit
Partenaire
Contrat
Document
Interaction
Tâche
Rendez-vous
Email
Sinistre
Réclamation
Workflow
Agent IA

Chaque objet est indépendant.

Ils communiquent entre eux autour du Projet.

5. Le principe de la fiche unique

Chaque objet possède une fiche unique.

Exemples :

Une personne possède une seule fiche Client.

Un partenaire possède une seule fiche Partenaire.

Un produit possède une seule fiche Produit.

Un document possède une seule fiche Document.

Une interaction possède une seule fiche Interaction.

Aucune duplication n'est autorisée.

6. Le principe des vues

Les utilisateurs ne consultent pas les objets de la même manière.

Exemple :

Un Client voit :

son Projet ;
ses documents ;
ses contrats.

Le Conseiller voit :

les produits étudiés ;
les workflows ;
les tâches ;
le devoir de conseil.

Le Responsable conformité voit :

le DER ;
le recueil des besoins ;
les preuves ;
les journaux d'audit.

Le Projet reste identique.

Seule la vue change.

7. Les relations entre les objets

Les objets métiers sont liés.

Exemple :

Client
   │
   ▼
Projet
   │
   ├────────► Produits
   ├────────► Partenaires
   ├────────► Documents
   ├────────► Contrats
   ├────────► Interactions
   ├────────► Emails
   ├────────► Rendez-vous
   ├────────► Tâches
   ├────────► Sinistres
   ├────────► Réclamations
   ├────────► Agents IA
   └────────► Workflows

Le Projet reste toujours le point central.

8. Les règles métier fondamentales

Le CRM applique systématiquement les règles suivantes.

Une donnée est saisie une seule fois.
Un Projet possède un responsable.
Toute action est historisée.
Toute modification importante est traçable.
Tout document possède une version.
Toute communication est rattachée à un Projet.
Toute intervention d'un Agent IA est historisée.
Toute obligation réglementaire est contrôlable.
9. Les objectifs du CRM

Le CRM poursuit plusieurs objectifs.

Métier

Permettre au cabinet de gérer l'ensemble de ses activités.

Commercial

Développer et suivre les opportunités.

Réglementaire

Garantir la conformité ACPR, DDA et RGPD.

Organisationnel

Réduire les tâches répétitives.

Collaboratif

Permettre à tous les acteurs de travailler sur le même Projet.

Technologique

Permettre l'intégration :

Google Workspace ;
API partenaires ;
Signature électronique ;
Agents IA ;
futurs services externes.
10. Critères de validation

Le CRM sera considéré comme conforme lorsque :

le Projet est l'objet central ;
chaque objet métier possède une responsabilité claire ;
aucune donnée n'est dupliquée ;
les interactions entre objets sont cohérentes ;
les rôles utilisent des vues adaptées ;
toute action importante est historisée ;
les workflows et les Agents IA s'appuient sur les mêmes objets métiers.


PARTIE 2 — Les objets métiers du CRM
11. Philosophie des objets métiers

Le CRM est construit autour d'objets métiers.

Chaque objet représente une entité réelle de l'activité du cabinet.

Un objet possède :

une identité unique ;
un cycle de vie ;
des relations avec les autres objets ;
un historique ;
des règles métier.

Les objets ne dupliquent jamais les informations d'un autre objet.

Ils créent des liens entre eux.

12. Objet « Prospect »
Définition

Le Prospect représente une personne ou une entreprise ayant manifesté un intérêt pour les services du cabinet.

Un Prospect peut devenir Client.

Le Prospect conserve tout son historique après sa transformation.

Informations principales
Identifiant
Civilité
Nom
Prénom
Société
Coordonnées
Origine
Prescripteur
Mandataire
Responsable
Statut
Date de création
Relations

Un Prospect peut posséder :

plusieurs Projets ;
plusieurs Interactions ;
plusieurs Documents ;
plusieurs Rendez-vous ;
plusieurs Emails.
13. Objet « Client »
Définition

Le Client représente une personne ou une entreprise ayant établi une relation commerciale avec le cabinet.

Le Client hérite automatiquement des informations du Prospect.

Aucune nouvelle fiche n'est créée.

Le statut évolue simplement de Prospect vers Client.

Informations complémentaires
Situation familiale
Situation professionnelle
Situation patrimoniale
Coordonnées bancaires
Préférences de communication
Consentements
Historique réglementaire
Relations

Un Client peut posséder :

plusieurs Projets ;
plusieurs Contrats ;
plusieurs Sinistres ;
plusieurs Réclamations ;
plusieurs Documents.
14. Objet « Projet »
Définition

Le Projet constitue le cœur du CRM.

Chaque Projet correspond à un besoin exprimé par un Prospect ou un Client.

Informations principales
Numéro
Type
Statut
Responsable
Mandataire
Priorité
Date d'ouverture
Date estimée de clôture
Le Projet centralise
le recueil des besoins ;
le devoir de conseil ;
les devis ;
les produits étudiés ;
les partenaires ;
les documents ;
les échanges ;
les tâches ;
les signatures ;
les contrats.
15. Objet « Contrat »

Le Contrat représente le résultat d'un Projet.

Un Projet peut produire :

aucun Contrat ;
un Contrat ;
plusieurs Contrats.

Chaque Contrat possède notamment :

numéro ;
compagnie ;
produit ;
date d'effet ;
cotisation ;
commission ;
statut.

Le Contrat reste toujours relié à son Projet d'origine.

16. Objet « Produit »

Chaque Produit possède une fiche unique.

Il comprend notamment :

catégorie ;
partenaire ;
garanties ;
exclusions ;
conditions ;
API ;
documentation.

Le Produit est utilisé :

dans les comparatifs ;
dans les devis ;
dans le devoir de conseil ;
par les Agents IA.
17. Objet « Partenaire »

Le Partenaire représente une compagnie, un courtier grossiste ou un organisme avec lequel le cabinet travaille.

Chaque fiche comprend :

contacts ;
conventions ;
produits ;
API ;
procédures ;
documentation.

Les Produits sont toujours rattachés à un Partenaire.

18. Objet « Document »

Tous les documents de la plateforme utilisent le même objet.

Exemples :

CNI
RIB
Offre de prêt
DER
Lettre de mission
IPID
Conditions Générales
Devoir de conseil
Contrat
Courrier
Convention

Chaque document possède :

une catégorie ;
une version ;
un propriétaire ;
une date ;
des droits d'accès.
19. Objet « Interaction »

Une Interaction représente un échange.

Exemples :

appel ;
email ;
SMS ;
rendez-vous ;
note ;
courrier ;
notification.

Toutes les Interactions sont automatiquement reliées au Projet.

20. Objet « Tâche »

Une Tâche représente une action à réaliser.

Elle comprend notamment :

responsable ;
échéance ;
priorité ;
statut ;
Projet concerné ;
origine.

Une Tâche peut être créée :

par un utilisateur ;
par un Workflow ;
par un Agent IA.
21. Objet « Sinistre »

Le Sinistre est toujours rattaché à :

un Client ;
un Contrat ;
un Projet.

Il possède son propre cycle de vie.

Toutes les pièces sont historisées.

22. Objet « Réclamation »

Une Réclamation possède une gestion indépendante.

Elle comprend notamment :

motif ;
niveau de gravité ;
responsable ;
délais réglementaires ;
réponses ;
clôture.

Toutes les étapes sont historisées afin de répondre aux exigences ACPR.

23. Objet « Workflow »

Le Workflow décrit une suite d'actions automatiques.

Il ne contient aucune donnée métier.

Il agit sur les objets existants.

Exemple :

Projet créé

↓

Créer une Tâche

↓

Envoyer un Email

↓

Créer un Dossier Drive

↓

Demander une Signature

↓

Prévenir le Mandataire

24. Objet « Agent IA »

Chaque Agent IA est considéré comme un objet métier.

Il possède :

une identité ;
une mission ;
un responsable ;
un historique ;
un périmètre d'action.

Il intervient uniquement sur les objets autorisés.

25. Relations entre les objets
Prospect / Client
        │
        ▼
      Projet
        │
 ┌──────┼────────────────────────────────────┐
 │      │       │       │        │           │
 ▼      ▼       ▼       ▼        ▼           ▼
Contrat Produit Partenaire Document Interaction Tâche
 │                                              │
 ▼                                              ▼
Sinistre                                   Workflow
 │
 ▼
Réclamation

Tous les objets gravitent autour du Projet.

Le Projet constitue la référence fonctionnelle unique.

26. Critères de validation

Cette modélisation sera considérée comme conforme lorsque :

chaque objet possède une responsabilité claire ;
chaque objet possède une identité unique ;
les relations entre objets sont explicites ;
le Projet reste le centre des échanges ;
aucun objet ne duplique les informations d'un autre ;
les objets peuvent évoluer indépendamment sans remettre en cause l'architecture globale.


PARTIE 3 — La fiche Projet (l'écran central de la plateforme)
27. Philosophie de la fiche Projet

La fiche Projet constitue l'écran principal de la plateforme EJ Assurances.

L'ensemble des utilisateurs travaillent sur cette fiche selon leurs droits.

Le Projet devient le dossier numérique unique regroupant toutes les informations relatives à un besoin client.

Aucune information métier ne doit être recherchée dans un autre écran.

La fiche Projet doit permettre à un utilisateur de comprendre la situation en moins d'une minute.

28. Structure générale de la fiche Projet

La fiche Projet est organisée autour de plusieurs zones.

┌────────────────────────────────────────────────────────────┐
│ En-tête Projet                                             │
├────────────────────────────────────────────────────────────┤
│ Résumé intelligent                                         │
├────────────────────────────────────────────────────────────┤
│ Timeline / Activité                                        │
├────────────────────────────────────────────────────────────┤
│ Navigation par onglets                                     │
├────────────────────────────────────────────────────────────┤
│ Contenu de l'onglet sélectionné                            │
└────────────────────────────────────────────────────────────┘

Cette structure est identique pour tous les rôles.

Seul le contenu affiché évolue selon les droits.

29. En-tête du Projet

L'en-tête doit rester visible en permanence.

Il affiche notamment :

Numéro du Projet
Type de Projet
Statut
Priorité
Responsable
Mandataire
Client
Date de création
Dernière activité

Des indicateurs visuels permettent d'identifier immédiatement :

dossier urgent ;
dossier incomplet ;
signature en attente ;
conformité incomplète ;
devis en attente ;
sinistre ouvert.
30. Résumé intelligent

Sous l'en-tête, la plateforme affiche un résumé dynamique.

Ce résumé est généré automatiquement.

Il présente :

l'objectif du Projet ;
les prochaines actions ;
les pièces manquantes ;
les échéances ;
les derniers événements ;
les alertes importantes.

Ce résumé peut être enrichi par un Agent IA mais reste modifiable par un utilisateur habilité.

31. Timeline

Chaque Projet possède une timeline unique.

Elle regroupe chronologiquement :

créations ;
modifications ;
emails ;
appels ;
rendez-vous ;
signatures ;
devis ;
contrats ;
interventions IA ;
actions des utilisateurs ;
workflows.

La timeline constitue la mémoire complète du Projet.

Aucun événement ne peut être supprimé.

32. Les onglets de la fiche Projet

Chaque Projet est organisé autour des onglets suivants :

Aperçu

Vue synthétique du Projet.

Recueil des besoins

Questionnaires.

Analyse.

Situation client.

Produits étudiés

Produits retenus.

Comparatifs.

Motifs de sélection.

Motifs d'exclusion.

Devoir de conseil

Préparation.

Validation.

Version finale.

Historique.

Documents

Tous les documents liés au Projet.

Aucun doublon.

Versioning.

Interactions

Emails.

Téléphone.

SMS.

Notes.

Messagerie.

Tâches

Actions en cours.

Responsables.

Échéances.

Historique.

Rendez-vous

Agenda.

Historique.

Comptes rendus.

Sinistres

Le cas échéant.

Réclamations

Le cas échéant.

Conformité

DER.

Lettre de mission.

Documents remis.

Signatures.

Journal d'audit.

Score conformité.

IA

Historique des interventions.

Suggestions.

Analyses.

Demandes.

Escalades.

33. Actions rapides

Depuis chaque Projet, l'utilisateur autorisé peut notamment :

créer une tâche ;
envoyer un email ;
demander un document ;
générer un document ;
lancer une signature ;
demander un devis ;
préparer un devoir de conseil ;
ouvrir un sinistre ;
ouvrir une réclamation ;
créer un rendez-vous ;
dialoguer avec un Agent IA.

Toutes les actions sont contextualisées.

34. Les indicateurs du Projet

Chaque Projet affiche plusieurs indicateurs.

Exemples :

Avancement

0 à 100 %

Conformité

Score ACPR/DDA

Documents

Nombre reçus

Nombre attendus

Délais

Temps depuis la dernière activité

Temps moyen de traitement

IA

Nombre d'interventions

Temps gagné estimé

Demandes escaladées

35. Vision 360°

La fiche Projet doit permettre à un utilisateur autorisé d'accéder immédiatement à :

la fiche Client ;
les Contrats ;
les Produits ;
les Partenaires ;
les Documents ;
les Emails ;
les Sinistres ;
les Réclamations ;
les statistiques liées.

Sans quitter le Projet.

36. Personnalisation selon le rôle

Chaque rôle voit la même structure.

Seules les informations affichées évoluent.

Exemple :

Le Client ne voit pas :

les notes internes ;
les analyses IA internes ;
les statistiques commerciales.

Le Mandataire ne voit pas :

les paramètres du cabinet ;
les dossiers non autorisés.

L'Administrateur voit l'ensemble des informations.

37. Critères de validation

La fiche Projet sera considérée comme conforme lorsque :

elle constitue le point d'entrée principal de la plateforme ;
toutes les informations importantes sont accessibles sans changer d'écran ;
la navigation est identique pour tous les rôles ;
les droits d'accès sont respectés ;
chaque action est historisée ;
la fiche permet une véritable vision 360° du Projet.

PARTIE 4 — Le cycle de traitement d'un Projet
38. Philosophie

Chaque Projet suit un cycle de traitement unique.

Quel que soit son type (Assurance emprunteur, Coparentalité, Assurance professionnelle, Retraite, Assurance vie...), le fonctionnement de la plateforme reste identique.

Seules les étapes, les formulaires et les workflows évoluent.

L'objectif est que tous les utilisateurs retrouvent toujours la même logique de travail.

39. Les statuts du Projet

Un Projet possède un statut principal.

Les statuts standards sont :

Nouveau
À qualifier
Recueil des besoins en cours
En attente de documents
Étude en cours
Devis reçus
Devoir de conseil à préparer
En attente de validation client
Souscription en cours
Contrat actif
En suivi
Clôturé
Archivé
Abandonné

Ces statuts sont paramétrables.

Chaque changement de statut est historisé.

40. Les étapes du traitement

Le traitement d'un Projet suit le processus suivant :

Création
      │
      ▼
Qualification
      │
      ▼
Recueil des besoins
      │
      ▼
Collecte documentaire
      │
      ▼
Étude
      │
      ▼
Comparaison des solutions
      │
      ▼
Préparation du devoir de conseil
      │
      ▼
Validation interne
      │
      ▼
Présentation au client
      │
      ▼
Signature
      │
      ▼
Souscription
      │
      ▼
Suivi

Le système doit permettre d'adapter ce cycle selon le type de Projet.

41. Les tâches automatiques

À chaque changement d'étape, la plateforme peut générer automatiquement :

des tâches ;
des rappels ;
des notifications ;
des emails ;
des demandes de documents ;
des relances ;
des actions IA.

Toutes les tâches restent modifiables par un utilisateur autorisé.

42. Les délais de traitement

Chaque étape possède un délai cible.

Exemple :

Étape	Délai cible
Qualification	24 h
Première prise de contact	24 h
Analyse du dossier	48 h
Préparation des devis	72 h
Présentation au client	5 jours

Ces délais sont paramétrables.

Le système calcule automatiquement les retards.

43. Les alertes

Le CRM génère automatiquement des alertes lorsque :

un document est manquant ;
un client ne répond plus ;
un partenaire tarde à répondre ;
une signature est en attente ;
un délai est dépassé ;
une obligation réglementaire n'est pas respectée.

Les alertes sont visibles sur :

le tableau de bord ;
la fiche Projet ;
les tableaux de suivi.
44. Les relances automatiques

Les relances peuvent être déclenchées automatiquement.

Exemples :

Client
document manquant ;
signature en attente ;
rendez-vous oublié.
Mandataire
dossier sans activité ;
devoir de conseil à terminer.
Partenaire
devis attendu ;
contrat attendu ;
sinistre sans réponse.

Chaque relance est historisée.

45. Les points de contrôle

Certaines étapes nécessitent une validation avant de poursuivre.

Exemples :

recueil des besoins terminé ;
DER remis ;
lettre de mission signée ;
pièces obligatoires reçues ;
devoir de conseil validé.

Le système bloque automatiquement l'étape suivante si un point de contrôle obligatoire n'est pas validé.

Les règles de blocage sont paramétrables selon le type de Projet.

46. Les exceptions

Le traitement d'un Projet doit pouvoir sortir du parcours standard.

Exemples :

refus du client ;
abandon ;
dossier incomplet ;
impossibilité technique ;
refus d'un assureur ;
transfert vers un autre conseiller.

Ces situations possèdent leurs propres workflows.

47. La clôture

Un Projet peut être clôturé lorsque :

un contrat est souscrit ;
le client renonce ;
le besoin disparaît ;
le dossier est transféré.

La clôture ne supprime aucune donnée.

Le Projet passe simplement en lecture seule.

48. Réouverture

Un Projet clôturé peut être réouvert.

La réouverture est historisée.

Le système conserve :

les anciennes versions ;
les anciens documents ;
les anciennes décisions ;
les anciens échanges.

La continuité est préservée.

49. Historique complet

Le Projet conserve l'historique de :

chaque utilisateur ;
chaque Agent IA ;
chaque workflow ;
chaque document ;
chaque signature ;
chaque changement de statut ;
chaque communication.

Cet historique constitue la preuve de traitement du dossier.

50. Critères de validation

Le cycle de traitement sera considéré comme conforme lorsque :

tous les Projets suivent un cycle cohérent ;
chaque étape est identifiable ;
les délais sont mesurables ;
les alertes sont automatiques ;
les relances sont automatisables ;
les validations réglementaires sont contrôlées ;
l'historique est complet et inaltérable.


PARTIE 5 — La fiche Client (Vision 360°)
51. Philosophie de la fiche Client

La fiche Client constitue la porte d'entrée de la relation entre le cabinet et une personne.

Elle ne remplace pas le Projet.

Elle centralise toutes les informations permanentes concernant le client.

Les besoins du client sont gérés dans les Projets.

Les contrats sont gérés dans les Contrats.

La fiche Client permet d'obtenir une vision globale de la relation entretenue avec le cabinet.

52. Les informations d'identité

Chaque Client possède une identité unique.

La fiche comprend notamment :

Identité
Civilité
Nom
Nom de naissance
Prénom
Date de naissance
Lieu de naissance
Nationalité
Coordonnées
Adresse
Téléphone
Email
Situation
Situation familiale
Situation professionnelle
Situation patrimoniale (si nécessaire)
Préférences de communication

Ces informations sont partagées par tous les Projets du Client.

53. Les personnes liées

La plateforme permet de relier différentes personnes à un Client.

Exemples :

Conjoint
Ex-conjoint
Co-parent
Enfant
Parent
Représentant légal
Associé
Dirigeant
Personne de confiance

Chaque relation possède :

un type ;
une date de début ;
une date de fin (optionnelle) ;
des commentaires.

Une même personne peut être liée à plusieurs Clients.

54. Les Projets du Client

La fiche Client présente la liste de tous les Projets.

Pour chaque Projet sont affichés :

numéro ;
type ;
statut ;
responsable ;
date de création ;
dernière activité.

L'utilisateur peut accéder directement au Projet correspondant.

55. Les Contrats

La fiche Client regroupe tous les Contrats actifs et historiques.

Pour chaque Contrat sont affichés :

compagnie ;
produit ;
numéro ;
date d'effet ;
statut ;
cotisation ;
prochaine échéance.

Les Contrats restent rattachés à leur Projet d'origine.

56. Les Documents

La fiche Client permet d'accéder à l'ensemble des documents concernant le client.

Les documents sont classés par catégories.

Exemples :

Identité
Situation familiale
Situation professionnelle
Situation financière
Contrats
Documents réglementaires
Correspondances

Les documents sont stockés une seule fois dans la bibliothèque documentaire.

57. Les Interactions

Toutes les interactions avec le Client sont accessibles depuis la fiche.

Exemples :

appels ;
emails ;
SMS ;
rendez-vous ;
notes ;
messages sécurisés.

Chaque interaction reste également visible dans le Projet concerné.

58. Les Sinistres et Réclamations

La fiche Client permet de consulter :

Les Sinistres
ouverts ;
en cours ;
clôturés.
Les Réclamations
ouvertes ;
en cours ;
clôturées.

Chaque élément renvoie vers son Projet.

59. Vision réglementaire

La fiche Client présente une synthèse de la conformité.

Exemples :

DER remis ;
Lettre de mission signée ;
Consentement RGPD ;
Pièces d'identité valides ;
Documents expirés ;
Vérifications à effectuer.

Cette vue permet d'identifier immédiatement les éléments manquants.

60. Vue commerciale

Les conseillers disposent d'une vue commerciale comprenant notamment :

potentiel d'équipement ;
opportunités détectées ;
contrats manquants ;
renouvellements à venir ;
recommandations des Agents IA.

Ces informations sont réservées aux utilisateurs autorisés.

61. Vue chronologique

Une frise chronologique présente les événements majeurs de la relation avec le Client.

Exemples :

création de la fiche ;
ouverture d'un Projet ;
signature d'un contrat ;
déclaration d'un sinistre ;
réclamation ;
rendez-vous ;
changement de situation.

Cette vue permet de comprendre rapidement l'historique du Client.

62. Recherche globale

Depuis la fiche Client, il est possible de rechercher instantanément :

un Projet ;
un Contrat ;
un Document ;
une Interaction ;
un Email ;
un Sinistre ;
une Réclamation.

La recherche est limitée aux données accessibles selon les droits de l'utilisateur.

63. Critères de validation

La fiche Client sera considérée comme conforme lorsque :

chaque Client possède une fiche unique ;
les informations permanentes sont centralisées ;
les Projets restent indépendants mais accessibles ;
les Contrats sont rattachés à leur Projet d'origine ;
les documents sont référencés sans duplication ;
la conformité est visible en un coup d'œil ;
chaque utilisateur accède à une vue adaptée à son rôle.

PARTIE 6 — La fiche Partenaire (La base de connaissance du cabinet)
64. Philosophie de la fiche Partenaire

Le Domaine Partenaires constitue la mémoire métier du cabinet.

Il ne s'agit pas simplement d'un carnet d'adresses.

Chaque Partenaire représente une source de connaissances permettant aux conseillers, aux mandataires, aux collaborateurs et aux Agents IA de travailler avec les bonnes informations.

La fiche Partenaire doit permettre de retrouver en quelques secondes tout ce qui est nécessaire pour travailler avec ce partenaire.

65. Les catégories de partenaires

Chaque Partenaire appartient à une catégorie.

Exemples :

Compagnie d'assurance
Courtier grossiste
Mutuelle
Banque
Organisme de crédit
Société de gestion
Plateforme de souscription
Prestataire de services
Expert
Notaire
Avocat
Expert-comptable

La catégorie détermine les informations affichées dans la fiche.

66. Informations générales

Chaque fiche Partenaire comprend notamment :

Identification
Nom
Raison sociale
Type de partenaire
Numéro ORIAS (si applicable)
Numéro SIREN
Site internet
Coordonnées
Adresse
Téléphone
Email général
Site Extranet
Référents
Inspecteur commercial
Gestionnaire
Service production
Service sinistre
Service réclamation
Support informatique

Chaque contact possède sa propre fiche.

67. Produits distribués

La fiche Partenaire référence l'ensemble des produits distribués.

Pour chaque produit sont affichés :

Nom
Catégorie
Statut
Public concerné
API disponibles
Date de mise à jour

Le produit reste géré dans le Domaine Produits.

La fiche Partenaire ne fait que les référencer.

68. Documentation

Chaque Partenaire possède sa bibliothèque documentaire.

Exemples :

Convention de partenariat
Conditions Générales
IPID
Notices
Guides de souscription
Guides de gestion
Barèmes
Tarifs
Fiches commerciales
FAQ

Tous les documents sont versionnés.

Les anciennes versions restent consultables selon les droits.

69. Procédures

La fiche Partenaire décrit les procédures spécifiques.

Exemples :

Souscription
API
Extranet
Email
Papier
Gestion
Modification
Résiliation
Avenant
Sinistre
Déclaration
Délais
Pièces attendues
Réclamation
Procédure
Délais
Escalade

Ces procédures alimentent directement les Agents IA et les Workflows.

70. API et connecteurs

Chaque Partenaire indique les connecteurs disponibles.

Exemples :

API Devis
API Souscription
API Contrat
API Sinistre
API Authentification
Import automatique

Pour chaque API sont précisés :

disponibilité ;
documentation ;
responsable ;
fréquence de synchronisation.
71. Conditions commerciales

Lorsque cela est autorisé, la fiche peut contenir :

commissions ;
rémunérations ;
modalités de reversement ;
conventions spécifiques ;
campagnes commerciales ;
objectifs.

Ces informations sont accessibles uniquement aux utilisateurs autorisés.

72. Base de connaissance

La fiche Partenaire constitue une véritable base documentaire.

Elle peut contenir notamment :

bonnes pratiques ;
points de vigilance ;
retours d'expérience ;
questions fréquentes ;
particularités des produits ;
astuces de gestion.

Cette base de connaissance est utilisée par les Agents IA pour assister les utilisateurs.

73. Historique

Toutes les évolutions sont historisées.

Exemples :

nouveau produit ;
changement d'inspecteur ;
nouvelle convention ;
modification d'une procédure ;
mise à jour d'une API ;
ajout d'un document.

L'historique permet de comprendre l'évolution de la relation avec le Partenaire.

74. Vision 360°

Depuis la fiche Partenaire, un utilisateur autorisé peut consulter :

les Produits distribués ;
les Projets utilisant ces produits ;
les Contrats concernés ;
les Documents ;
les Procédures ;
les Contacts ;
les API ;
les statistiques d'utilisation ;
les performances commerciales ;
les délais de traitement ;
les échanges avec le cabinet.

Toutes ces informations sont accessibles sans quitter la fiche.

75. Critères de validation

La fiche Partenaire sera considérée comme conforme lorsque :

chaque Partenaire possède une fiche unique ;
les contacts sont centralisés ;
les Produits sont référencés sans duplication ;
la documentation est versionnée ;
les procédures sont documentées ;
les API sont identifiées ;
la base de connaissance est exploitable par les utilisateurs et les Agents IA ;
la fiche offre une véritable vision 360° du Partenaire.


PARTIE 7 — Le Domaine Produits (Le catalogue intelligent)
76. Philosophie du Domaine Produits

Le Domaine Produits constitue le référentiel unique de tous les produits distribués par le cabinet.

Il ne s'agit pas d'un simple catalogue.

Il constitue une base de connaissance métier utilisée par :

les conseillers ;
les mandataires ;
les collaborateurs ;
les Agents IA ;
les workflows ;
le devoir de conseil.

Chaque produit est créé une seule fois puis réutilisé dans toute la plateforme.

77. Une fiche Produit unique

Chaque produit possède une fiche unique.

Cette fiche est indépendante des Projets.

Les Projets référencent les Produits mais ne les dupliquent jamais.

Toute modification d'un Produit est immédiatement disponible pour l'ensemble de la plateforme.

78. Identification du Produit

Chaque Produit comprend notamment :

Informations générales
Nom commercial
Référence interne
Catégorie
Famille
Statut
Partenaire
Date de création
Dernière mise à jour
79. Classification

Chaque Produit est classé selon plusieurs critères.

Exemples :

Domaine
Assurance emprunteur
Protection familiale
Assurance professionnelle
Santé
Prévoyance
Retraite
Assurance vie
Épargne
Crédit
Public concerné
Particulier
Professionnel
Association
Entreprise
Indépendant
Niveau de complexité
Standard
Intermédiaire
Expert

Cette classification facilite les recherches et les recommandations.

80. Caractéristiques du Produit

Chaque fiche Produit comprend :

description ;
objectifs ;
garanties principales ;
garanties optionnelles ;
exclusions ;
franchises ;
limites ;
conditions d'éligibilité ;
délais de carence ;
conditions de résiliation.

Ces informations servent notamment au devoir de conseil.

81. Documentation

Chaque Produit possède une bibliothèque documentaire.

Exemples :

IPID
Conditions Générales
Conditions Particulières
Notice
Fiche Produit
Documentation commerciale
Guide de souscription

Tous les documents sont versionnés.

Les anciennes versions restent consultables.

82. Règles métier

Chaque Produit peut contenir des règles spécifiques.

Exemples :

âge minimum ;
âge maximum ;
professions exclues ;
sports exclus ;
capitaux minimum ;
capitaux maximum ;
conditions médicales ;
règles de souscription.

Ces règles sont utilisées :

par les formulaires ;
par les Agents IA ;
par les Workflows ;
par le devoir de conseil.
83. Connectivité

La fiche Produit indique les services disponibles.

Exemples :

API devis ;
API souscription ;
API contrat ;
API sinistre ;
API résiliation.

Pour chaque connecteur sont indiqués :

disponibilité ;
documentation ;
fréquence de synchronisation.
84. Utilisation dans les Projets

Depuis chaque Produit, il est possible de consulter :

les Projets concernés ;
les Contrats actifs ;
les statistiques de souscription ;
les performances commerciales ;
les sinistres associés ;
les réclamations.

Le Produit devient un véritable objet métier.

85. Comparaison des Produits

La plateforme doit permettre de comparer plusieurs Produits.

La comparaison porte notamment sur :

garanties ;
exclusions ;
franchises ;
délais ;
tarifs (lorsqu'ils sont disponibles) ;
conditions d'accès ;
services associés.

Les comparaisons peuvent être intégrées au devoir de conseil.

86. Recommandations intelligentes

Le catalogue Produits est utilisé par les Agents IA.

Ils peuvent notamment :

proposer des Produits adaptés au recueil des besoins ;
signaler des incompatibilités ;
détecter des garanties manquantes ;
suggérer des alternatives ;
préparer des comparatifs.

Les recommandations restent des propositions.

La décision appartient toujours au conseiller.

87. Cycle de vie d'un Produit

Chaque Produit possède son propre cycle de vie.

Exemple :

Création
    │
    ▼
Validation
    │
    ▼
Disponible
    │
    ▼
Mise à jour
    │
    ▼
Suspendu
    │
    ▼
Archivé

Les Produits archivés restent accessibles pour les anciens Projets et Contrats.

88. Critères de validation

Le Domaine Produits sera considéré comme conforme lorsque :

chaque Produit possède une fiche unique ;
les informations sont centralisées ;
les documents sont versionnés ;
les règles métier sont exploitables ;
les comparaisons sont possibles ;
les Agents IA peuvent exploiter les informations ;
les Produits restent liés aux Partenaires sans duplication ;
le catalogue constitue la référence unique des Produits distribués.

PARTIE 8 — Les Interactions, Communications et Timeline
89. Philosophie

Chaque échange entre le cabinet et son écosystème constitue une Interaction.

Une interaction n'est jamais isolée.

Elle est toujours rattachée à un Projet et, lorsque cela est pertinent, à un Client, un Partenaire ou un Contrat.

L'objectif est qu'un utilisateur puisse reconstituer l'intégralité de l'historique d'un Projet sans avoir à consulter plusieurs outils.

90. Définition d'une Interaction

Une Interaction représente tout événement impliquant une action humaine ou automatisée.

Elle peut être initiée par :

un Prospect ;
un Client ;
un Mandataire ;
un Collaborateur ;
un Administrateur ;
un Partenaire ;
un Agent IA ;
un Workflow automatique.

Chaque Interaction est enregistrée automatiquement.

91. Types d'Interactions

La plateforme distingue plusieurs catégories.

Communications
Email
Téléphone
SMS
Message sécurisé
Courrier
Activités
Rendez-vous
Visioconférence
Note interne
Compte-rendu
Tâche réalisée
Événements
Document ajouté
Document signé
Contrat créé
Projet modifié
Changement de statut
Validation
Intervention IA
Déclenchement d'un Workflow

La liste est extensible.

92. La Timeline

Chaque Projet possède une Timeline chronologique.

Elle présente l'ensemble des événements du plus récent au plus ancien.

Exemple :

08/07/2026 - Contrat souscrit
07/07/2026 - Signature électronique
06/07/2026 - Devoir de conseil validé
05/07/2026 - Devis partenaire reçu
04/07/2026 - Pièce d'identité déposée
03/07/2026 - Recueil des besoins complété
02/07/2026 - Projet créé

La Timeline constitue la mémoire officielle du Projet.

93. Les fiches d'Interaction

Chaque Interaction possède sa propre fiche.

Elle comprend notamment :

Identification
Numéro
Type
Date
Heure
Auteur
Contexte
Projet
Client
Partenaire
Contrat
Sinistre
Réclamation
Contenu
Objet
Description
Pièces jointes
Décisions prises
Historique
Création
Modifications
Validation
Clôture
94. Les Emails

Les emails sont gérés comme des Interactions.

Chaque email comprend notamment :

expéditeur ;
destinataire(s) ;
copie ;
objet ;
contenu ;
pièces jointes ;
date d'envoi ;
date de réception.

Les emails sont automatiquement rattachés au Projet correspondant lorsque cela est possible.

95. Les Appels

Chaque appel peut être enregistré.

Une fiche d'appel comprend notamment :

date ;
durée ;
interlocuteur ;
objet ;
résumé ;
actions décidées.

Le résumé peut être proposé par un Agent IA puis validé par l'utilisateur.

96. Les Rendez-vous

Les rendez-vous sont également des Interactions.

Ils comprennent notamment :

date ;
heure ;
durée ;
participants ;
lieu ;
lien Google Meet (si applicable) ;
ordre du jour ;
compte-rendu.

Ils sont synchronisés avec Google Calendar.

97. Les Notes internes

Les Notes permettent aux collaborateurs de partager des informations internes.

Une Note peut être :

privée ;
réservée à une équipe ;
visible par l'ensemble du cabinet.

Les Notes ne sont jamais visibles par le Client.

98. Les Interventions des Agents IA

Chaque intervention d'un Agent IA est enregistrée.

Exemples :

résumé généré ;
email préparé ;
comparaison de Produits ;
analyse réglementaire ;
détection d'une anomalie ;
suggestion commerciale.

La fiche précise :

l'Agent IA ;
la date ;
la demande initiale ;
la réponse ;
l'utilisateur ayant validé ou rejeté la proposition.
99. Les Workflows

Les Workflows génèrent également des Interactions.

Exemples :

email automatique envoyé ;
demande de signature ;
relance client ;
création d'une tâche ;
génération documentaire.

Chaque action est visible dans la Timeline.

100. Recherche et filtres

Les Interactions peuvent être recherchées selon différents critères.

Exemples :

type ;
utilisateur ;
Client ;
Projet ;
Partenaire ;
période ;
mots-clés ;
Agent IA ;
Workflow.

Les filtres permettent de retrouver rapidement un événement précis.

101. Critères de validation

Le Domaine Interactions sera considéré comme conforme lorsque :

chaque échange est enregistré comme une Interaction ;
toutes les Interactions sont rattachées à un Projet ;
la Timeline constitue la mémoire complète du Projet ;
les emails, appels, rendez-vous et notes suivent une structure commune ;
les interventions des Agents IA sont historisées ;
les actions automatiques apparaissent dans la Timeline ;
les recherches permettent de retrouver rapidement toute Interaction.

PARTIE 9 — Les tâches, les workflows et l'automatisation
102. Philosophie

La plateforme EJ Assurances doit permettre aux utilisateurs de se concentrer sur le conseil et la relation client.

Toutes les actions répétitives, administratives ou prévisibles doivent être automatisées autant que possible.

Le système assiste les utilisateurs.

Il ne prend jamais les décisions métier à leur place.

103. Les tâches

Une tâche représente une action à réaliser.

Elle peut être créée :

manuellement par un utilisateur ;
automatiquement par un Workflow ;
automatiquement par un Agent IA ;
automatiquement lors d'un changement de statut d'un Projet.

Chaque tâche possède son propre cycle de vie.

104. Informations d'une tâche

Chaque tâche comprend notamment :

Identification
Numéro
Titre
Description
Affectation
Responsable
Équipe
Projet
Client
Gestion
Priorité
Date de création
Échéance
Statut
Temps estimé
Temps réalisé
Historique
Création
Modifications
Clôture
105. Statuts d'une tâche

Chaque tâche possède un statut.

Exemples :

À faire
En cours
En attente
Bloquée
Terminée
Annulée

Les statuts sont paramétrables.

106. Priorités

Les tâches peuvent être classées selon leur priorité.

Exemples :

Critique
Haute
Normale
Faible

La priorité peut être définie :

manuellement ;
automatiquement selon les règles métier.
107. Les Workflows

Un Workflow représente une succession d'actions automatiques.

Un Workflow est déclenché par un événement.

Exemples :

création d'un Projet ;
signature d'un document ;
réception d'un devis ;
ajout d'un document ;
changement de statut ;
échéance atteinte.
108. Déclencheurs

Les principaux déclencheurs sont :

Événements utilisateur
création ;
modification ;
validation ;
suppression (si autorisée).
Événements système
date atteinte ;
délai dépassé ;
absence de réponse ;
document expiré.
Événements partenaires
devis reçu ;
contrat disponible ;
sinistre mis à jour.
109. Actions possibles

Un Workflow peut notamment :

créer une tâche ;
envoyer un email ;
envoyer une notification ;
demander un document ;
générer un document ;
créer un dossier Google Drive ;
compléter un Google Sheet ;
envoyer un document à signature ;
créer un rendez-vous ;
solliciter un Agent IA ;
changer le statut d'un Projet ;
affecter automatiquement un utilisateur.

Toutes les actions sont historisées.

110. Les modèles de Workflows

La plateforme propose des modèles selon le type de Projet.

Exemples :

Assurance emprunteur
Création du Projet
Recueil des besoins
Lettre de mission
Signature
Demande de devis
Comparaison
Devoir de conseil
Souscription
Protection de la famille
Création du Projet
Analyse de la situation familiale
Recueil des besoins
Étude des garanties
Présentation des solutions
Validation
Mise en place
Assurance professionnelle
Analyse de l'activité
Documents administratifs
Analyse des risques
Étude des contrats
Souscription
Suivi annuel

Chaque modèle reste personnalisable.

111. Intervention des Agents IA

Les Agents IA peuvent intervenir dans un Workflow.

Exemples :

vérifier la complétude d'un dossier ;
préparer un email ;
analyser les réponses d'un client ;
préparer un devoir de conseil ;
détecter une anomalie ;
proposer la prochaine action.

Les propositions de l'IA peuvent nécessiter une validation humaine selon leur nature.

112. Automatisations Google Workspace

Les Workflows peuvent interagir avec Google Workspace.

Exemples :

créer un dossier Google Drive ;
créer un document Google Docs ;
compléter un Google Sheet ;
créer un événement Google Calendar ;
envoyer un email Gmail ;
envoyer un document à signature.

Ces automatisations restent invisibles pour l'utilisateur final.

113. Supervision

Les administrateurs disposent d'une vue de supervision.

Ils peuvent consulter :

les Workflows actifs ;
les Workflows en erreur ;
les traitements en attente ;
les statistiques d'exécution ;
les journaux d'exécution.

Chaque erreur est historisée.

114. Historique

Chaque exécution d'un Workflow est enregistrée.

Le journal comprend notamment :

date ;
déclencheur ;
actions réalisées ;
durée ;
résultat ;
utilisateur concerné ;
Agent IA impliqué (le cas échéant).
115. Critères de validation

Le Domaine Workflows sera considéré comme conforme lorsque :

les tâches peuvent être créées manuellement ou automatiquement ;
les Workflows sont déclenchés par des événements ;
les automatisations sont historisées ;
les Agents IA peuvent intervenir dans les Workflows selon leurs autorisations ;
Google Workspace peut être utilisé comme moteur documentaire et collaboratif ;
les administrateurs disposent d'outils de supervision et d'audit des automatisations.


PARTIE 10 — Les principes directeurs du CRM EJ Assurances
116. Le CRM comme colonne vertébrale de la plateforme

Le CRM constitue le cœur fonctionnel de la plateforme EJ Assurances.

Tous les domaines gravitent autour de lui.

Il ne remplace pas les autres domaines.

Il les orchestre.

Chaque information importante passe par le CRM avant d'être exploitée par les autres domaines.

117. Une plateforme orientée Projet

Le Projet constitue l'objet métier principal.

Toutes les informations convergent vers lui.

Exemples :

le Client ;
les Documents ;
les Produits ;
les Partenaires ;
les Contrats ;
les Interactions ;
les Tâches ;
les Sinistres ;
les Réclamations ;
les Agents IA ;
les Workflows.

Le Projet devient le dossier numérique unique du cabinet.

118. Une plateforme collaborative

Tous les utilisateurs travaillent sur les mêmes données.

Chaque rôle dispose d'une vue adaptée.

Le Client, le Mandataire, le Collaborateur, le Responsable Conformité, le Directeur et les Agents IA interviennent sur le même Projet.

Les informations ne sont jamais dupliquées.

La collaboration repose sur une source unique de vérité.

119. Une plateforme documentaire

La plateforme ne stocke pas simplement des fichiers.

Elle gère des documents métiers.

Chaque document possède :

une catégorie ;
une version ;
un historique ;
des droits d'accès ;
des liens avec les objets métiers.

Les documents sont exploitables par :

les utilisateurs ;
les Workflows ;
les Agents IA.
120. Une plateforme réglementaire

La conformité n'est pas un domaine isolé.

Elle accompagne chaque étape du cycle de vie d'un Projet.

Chaque action importante doit pouvoir être justifiée.

Le CRM doit permettre de démontrer :

le recueil des besoins ;
le devoir de conseil ;
la remise des documents ;
les validations ;
les signatures ;
les contrôles effectués.

La conformité est native.

121. Une plateforme ouverte

Le CRM est conçu pour communiquer avec des services externes.

Exemples :

Google Workspace ;
Signature électronique ;
API des partenaires ;
Plateformes de souscription ;
Services de comparaison ;
Services d'intelligence artificielle.

Toutes les intégrations respectent les principes d'architecture définis dans la plateforme.

122. Une plateforme évolutive

L'architecture doit permettre d'ajouter :

de nouveaux domaines ;
de nouveaux partenaires ;
de nouveaux produits ;
de nouveaux rôles ;
de nouveaux Agents IA ;
de nouveaux Workflows.

Sans remettre en cause les fondations existantes.

123. Une plateforme pilotée par les données

Les décisions du cabinet doivent s'appuyer sur des données fiables.

Le CRM fournit notamment :

les indicateurs commerciaux ;
les indicateurs réglementaires ;
les indicateurs de qualité ;
les indicateurs de performance ;
les indicateurs financiers.

Les tableaux de bord sont construits à partir des données du CRM.

124. Une plateforme assistée par l'IA

Les Agents IA assistent les utilisateurs.

Ils permettent notamment :

d'automatiser les tâches répétitives ;
de préparer des analyses ;
de générer des documents ;
de contrôler la conformité ;
de détecter des opportunités ;
de proposer des améliorations.

Ils ne remplacent jamais la responsabilité du conseiller.

125. Les principes fondamentaux

Le CRM EJ Assurances respecte les principes suivants :

une seule plateforme ;
une seule source de vérité ;
un seul Projet comme objet central ;
une seule bibliothèque documentaire ;
une expérience utilisateur homogène ;
une conformité intégrée ;
une traçabilité complète ;
une collaboration entre tous les acteurs ;
une automatisation des tâches répétitives ;
une assistance intelligente au service de l'humain.

Ces principes constituent les fondations permanentes de la plateforme.

126. Critères de validation du CRM

Le CRM sera considéré comme conforme lorsque :

le Projet constitue le cœur du système ;
les objets métiers sont clairement définis ;
les rôles disposent de vues adaptées ;
les partenaires et les produits sont intégrés au fonctionnement du cabinet ;
les workflows automatisent les tâches répétitives ;
les Agents IA assistent les utilisateurs dans un cadre sécurisé ;
la conformité est présente à chaque étape ;
toutes les données sont historisées et traçables ;
la plateforme permet une collaboration fluide entre tous les acteurs.
127. Conclusion

Le CRM EJ Assurances n'est pas conçu comme un simple outil de gestion.

Il constitue le système opérationnel du cabinet.

Son objectif est de centraliser les informations, de simplifier les processus, d'assurer la conformité réglementaire et de permettre aux équipes de se concentrer sur leur véritable valeur ajoutée : le conseil, l'accompagnement et la protection des clients.

Chaque évolution future devra respecter les principes définis dans ce document afin de garantir la cohérence, la pérennité et l'évolutivité de la plateforme.
