# 77 - Gestion des sinistres

## Objectif

Définir le module de gestion des sinistres.

Le module doit permettre de déclarer, suivre, relancer, documenter et clôturer un sinistre.

## Informations du sinistre

Le dossier sinistre doit contenir :

- déclaration de sinistre ;
- statut du sinistre ;
- pièces demandées ;
- pièces reçues ;
- compagnie concernée ;
- interlocuteur compagnie ;
- échéances ;
- relances ;
- historique ;
- commentaires internes ;
- messages client ;
- alertes ;
- clôture ;
- satisfaction client.

## Acteurs possibles

Le système doit savoir qui doit agir :

- client ;
- cabinet ;
- mandataire ;
- compagnie ;
- partenaire.

## Statuts indicatifs

- déclaré ;
- en attente de pièces ;
- pièces reçues ;
- transmis compagnie ;
- en instruction ;
- relance nécessaire ;
- accord ;
- refus ;
- indemnisé ;
- clôturé ;
- réclamation.

## Relances

Relances à prévoir :

- client ;
- compagnie ;
- cabinet ;
- mandataire ;
- partenaire.

Chaque relance doit conserver :

- date ;
- canal ;
- responsable ;
- contenu ;
- statut ;
- prochaine échéance.

## Rôle de l'IA

L'IA peut :

- résumer l'état du sinistre ;
- identifier les pièces manquantes ;
- préparer une relance ;
- détecter un blocage ;
- proposer une synthèse interne.

L'IA ne doit pas :

- accepter ou refuser un sinistre ;
- transmettre une position contractuelle sans validation humaine ;
- envoyer une réponse sensible sans contrôle.

## Points ouverts

- liste des compagnies ;
- modèles de statuts ;
- modèles de relances ;
- règles d'escalade ;
- mesure de satisfaction.
