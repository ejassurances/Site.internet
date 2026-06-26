# 78 - Gestion intelligente des emails

## Objectif

Définir la gestion intelligente des emails dans le CRM EJ Assurances.

L'email doit être intégré au suivi client sans devenir une boîte de réception isolée.

## Fonctions attendues

- synchronisation Gmail ;
- rattachement email/client ;
- rattachement email/contrat ;
- rattachement email/sinistre ;
- recherche par nom ;
- recherche par email ;
- recherche par numéro de contrat ;
- recherche par compagnie ;
- résumé des fils ;
- détection des demandes importantes ;
- proposition de réponse ;
- brouillons ;
- validation humaine avant envoi ;
- archivage ;
- journalisation.

## Rattachement automatique

Critères possibles :

- adresse email ;
- nom ;
- numéro de contrat ;
- référence dossier ;
- compagnie ;
- sinistre ;
- projet ;
- pièce jointe.

## Traitement des demandes

Un email peut générer :

- une tâche ;
- une demande client ;
- une relance ;
- un commentaire interne ;
- un document ;
- une alerte ;
- une réclamation.

## Rôle de l'IA

L'IA peut :

- résumer un fil ;
- proposer une réponse ;
- détecter une urgence ;
- classer l'email ;
- identifier une pièce jointe ;
- signaler une incohérence.

Validation humaine obligatoire avant envoi.

## Sécurité

Principes :

- ne pas exposer les emails hors périmètre ;
- journaliser les actions ;
- respecter les droits client ;
- appliquer la minimisation des données ;
- prévoir une procédure d'archivage.

## Points ouverts

- périmètre OAuth Gmail ;
- fréquence de synchronisation ;
- règles d'archivage ;
- traitement des pièces jointes ;
- stratégie anti-doublons.
