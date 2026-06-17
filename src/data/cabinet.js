// Coordonnées et informations légales du cabinet, centralisées pour être
// réutilisées dans le header, le footer, la page contact et les mentions légales.
export const cabinet = {
  nom: 'EJ Partners Assurances',
  adresse: '71 Rue du Docteur Roux, 95600 Eaubonne',
  telephone: '06.69.42.11.57',
  telephoneHref: 'tel:+33669421157',
  emails: {
    cabinet: 'contact@ej-assurances.fr',
    serviceClient: 'service.client@ej-assurances.fr',
    sinistre: 'sinistre@ej-assurances.fr',
    conformite: 'conformite@ej-assurances.fr',
    prescripteur: 'prescripteur@ej-assurances.fr',
    recrutement: 'recrutement@ej-assurances.fr',
  },
  espaceClientUrl: '/connexion',
  horaires: 'Du lundi au vendredi, 9h00-13h00 et 14h00-19h00, sur rendez-vous uniquement',
  orias: '25 005 812',
  oriasUrl: 'https://www.orias.fr',
  siret: '500 256 904 00060',
  autoriteControle: {
    nom: 'ACPR (Autorité de Contrôle Prudentiel et de Résolution)',
    adresse: '4 Place de Budapest, CS 92459, 75436 Paris Cedex 09',
  },
  mediateur: {
    nom: "La Médiation de l'Assurance",
    url: 'https://www.mediation-assurance.org',
  },
  // Placeholder à remplacer par le vrai endpoint Formspree ou par le data-netlify
  // form sur la balise <form> de la page contact.
  formspreeEndpoint: 'https://formspree.io/f/REMPLACER_PAR_VOTRE_ID',
};
