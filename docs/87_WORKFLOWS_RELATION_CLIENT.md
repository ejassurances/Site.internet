# 87 - Workflows relation client

## Objectif

Définir les workflows métier de la relation client EJ Assurances.

Chaque workflow doit préciser :

- déclencheur ;
- acteur responsable ;
- actions ;
- documents nécessaires ;
- délais ;
- relances ;
- escalades ;
- journalisation ;
- rôle éventuel de l'IA ;
- validation humaine obligatoire.

## Workflows à documenter

1. Nouveau prospect
2. Transformation prospect en client
3. Demande client simple
4. Demande complexe
5. Demande nécessitant un conseil personnalisé
6. Création d'un projet
7. Recueil des besoins
8. Devoir de conseil
9. Souscription
10. Gestion d'un contrat
11. Modification contrat
12. Déclaration sinistre
13. Suivi sinistre
14. Relance client
15. Relance compagnie
16. Relance cabinet
17. Réclamation
18. Clôture dossier
19. Archivage
20. Contrôle conformité

## Modèle de workflow

Pour chaque workflow :

### Déclencheur

Événement qui lance le workflow.

### Responsable

Rôle responsable du traitement.

### Actions

Étapes attendues.

### Documents

Documents à collecter, produire ou archiver.

### Délais

Délais internes ou réglementaires.

### Relances

Relances automatiques ou manuelles.

### Escalades

Conditions de remontée à un humain ou à un responsable.

### IA

Rôle éventuel de l'IA, toujours assistif.

### Validation humaine

Étapes nécessitant validation obligatoire.

### Journalisation

Actions à historiser.

## Exemple - Nouveau prospect

Déclencheur :

- formulaire public ;
- email entrant ;
- recommandation prescripteur ;
- saisie manuelle.

Actions :

- créer fiche prospect ;
- enregistrer consentement ;
- qualifier le besoin ;
- proposer rendez-vous ;
- créer tâche cabinet.

IA possible :

- résumé de la demande ;
- classification ;
- brouillon de réponse.

Validation humaine :

- qualification finale ;
- réponse sensible ;
- transformation en client.

## Points ouverts

- délais cibles par workflow ;
- matrice de responsabilité ;
- modèles de relance ;
- règles d'escalade ;
- indicateurs de performance.
