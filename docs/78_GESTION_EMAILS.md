# 78 - Gestion intelligente des emails

## Objectif

Définir la gestion intelligente des emails dans le CRM EJ Assurances.

L'email doit être intégré au suivi client sans devenir une boîte de réception isolée. Le système doit notamment permettre aux mandataires de connecter leur propre Gmail, tout en limitant la supervision cabinet aux emails liés à l'activité EJ Assurances.

## Principes

- un email doit être rattaché à un objet métier lorsque c'est pertinent ;
- les emails hors périmètre EJ Assurances ne doivent pas être exposés au cabinet ;
- l'utilisateur doit pouvoir exclure un email non lié ;
- l'envoi d'un email sensible nécessite une validation humaine ;
- chaque action doit être historisée.

## Fonctions attendues

- synchronisation Gmail ;
- rattachement email/client ;
- rattachement email/prospect ;
- rattachement email/contrat ;
- rattachement email/sinistre ;
- rattachement email/projet ;
- recherche par nom ;
- recherche par adresse email ;
- recherche par numéro de contrat ;
- recherche par compagnie ;
- recherche par sinistre ;
- résumé des fils ;
- détection des demandes importantes ;
- proposition de réponse ;
- brouillons ;
- validation humaine avant envoi ;
- exclusion d'un email non lié à EJ Assurances ;
- archivage ;
- journalisation.

## Rattachement automatique ou manuel

Critères possibles :

- adresse email ;
- nom ;
- numéro de contrat ;
- référence dossier ;
- compagnie ;
- sinistre ;
- projet ;
- pièce jointe ;
- mots-clés métier ;
- sélection manuelle par l'utilisateur.

## Emails mandataires

Un mandataire peut synchroniser son propre Gmail.

Le système doit distinguer :

- emails liés à EJ Assurances ;
- emails professionnels hors EJ Assurances ;
- emails personnels ;
- emails exclus ;
- emails à qualifier.

Le cabinet admin ne doit accéder qu'aux emails rattachés ou explicitement importés dans le périmètre EJ Assurances.

## Traitement des demandes

Un email peut générer :

- une tâche ;
- une demande client ;
- une relance ;
- un commentaire interne ;
- un document ;
- une alerte ;
- une réclamation ;
- une mise à jour de sinistre ;
- une action de conformité.

## Rôle de l'IA Mistral

L'IA peut :

- lire et résumer les emails liés à EJ Assurances ;
- proposer une réponse ;
- détecter une urgence ;
- classer l'email ;
- identifier une pièce jointe ;
- signaler une incohérence ;
- préparer une relance client ;
- préparer une relance compagnie ;
- préparer une relance cabinet ;
- remonter une demande sensible.

Validation humaine obligatoire avant envoi.

## Garde-fous

L'IA ne doit jamais :

- envoyer un email sans validation humaine ;
- donner un conseil personnalisé directement au client ;
- modifier un contrat ;
- valider un devoir de conseil ;
- prendre une décision de souscription ;
- accéder à des emails non liés à EJ Assurances ;
- analyser des données sans finalité métier claire.

## Journalisation

À historiser :

- emails importés ;
- emails exclus ;
- rattachements clients ;
- rattachements contrats ;
- rattachements sinistres ;
- actions IA ;
- brouillons générés ;
- emails envoyés ;
- relances ;
- modifications ;
- accès aux données.

## Sécurité

Principes :

- ne pas exposer les emails hors périmètre ;
- respecter les droits par rôle ;
- appliquer la minimisation des données ;
- tracer les accès ;
- prévoir une procédure d'archivage ;
- permettre la déconnexion Workspace ;
- respecter le consentement mandataire.

## Points ouverts

- périmètre OAuth Gmail ;
- fréquence de synchronisation ;
- règles d'archivage ;
- traitement des pièces jointes ;
- stratégie anti-doublons ;
- règle de qualification automatique des emails EJ Assurances.
