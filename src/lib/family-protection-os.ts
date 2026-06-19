import {
  Baby,
  Banknote,
  FileCheck2,
  HeartHandshake,
  Home,
  Landmark,
  Scale,
  ShieldAlert,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

export const fposModules = [
  {
    title: "Collecte DDA",
    description: "Recueil structure des exigences, besoins, objectifs, priorites et consentements.",
    status: "V1 active",
  },
  {
    title: "Arbre familial intelligent",
    description: "Cartographie de la famille affective, juridique et heritiere.",
    status: "Mode guide",
  },
  {
    title: "Cartographie patrimoniale",
    description: "Immobilier, credits, prevoyance, assurance vie, epargne, retraite et dettes.",
    status: "V1 active",
  },
  {
    title: "Moteur de risques",
    description: "Score 0 a 100 par risque : logement, revenus, deces, transmission, fiscalite.",
    status: "V1 active",
  },
  {
    title: "Recommandation DDA",
    description: "Preconisation motivee, alternatives, limites et validation humaine obligatoire.",
    status: "Preparation",
  },
  {
    title: "Rapport PDF",
    description: "Generation du rapport client et du dossier de preuve conformite.",
    status: "Preparation",
  },
];

export const riskDomains = [
  { label: "Logement", score: 42, icon: Home, detail: "Droits d'occupation, credit, quotites et liquidites." },
  { label: "Revenus", score: 58, icon: Banknote, detail: "Maintien de niveau de vie en cas d'arret, invalidite ou deces." },
  { label: "Couple", score: 46, icon: HeartHandshake, detail: "Protection du partenaire selon mariage, PACS ou concubinage." },
  { label: "Enfants", score: 54, icon: Baby, detail: "Enfants biologiques, adoptes, sociaux ou issus d'une recomposition." },
  { label: "Succession", score: 35, icon: Scale, detail: "Ecart entre volonte du client et heritiers legaux." },
  { label: "Fiscalite", score: 48, icon: Landmark, detail: "Fiscalite successorale, beneficiaires et structuration patrimoniale." },
];

export const ddaWorkflow = [
  "Brouillon conseiller",
  "Envoye au client",
  "A completer",
  "En analyse",
  "Preconisation prete",
  "Validation courtier admin",
  "Signe client",
  "Transforme en projet",
];

export const needSections = [
  {
    title: "Identite et contexte",
    fields: [
      "Nom et prenom",
      "Email",
      "Telephone",
      "Situation familiale",
      "Statut du couple",
      "Personnes a charge",
      "Personnes a proteger en priorite",
    ],
  },
  {
    title: "Famille affective, juridique et heritiere",
    fields: [
      "Qui compte reellement dans la vie du client ?",
      "Qui est reconnu juridiquement ?",
      "Qui heriterait aujourd'hui ?",
      "Qui serait exclu ou fragilise ?",
      "La situation correspond-elle a la volonte du client ?",
    ],
  },
  {
    title: "Assurance emprunteur",
    fields: [
      "Projet immobilier",
      "Montant et duree du pret",
      "Banque",
      "Emprunteurs et quotites",
      "Garanties exigees",
      "Echeance banque",
      "Risques professionnels, sportifs ou medicaux declaratifs",
    ],
  },
  {
    title: "Objectifs et recommandation",
    fields: [
      "Protection du logement",
      "Protection des revenus",
      "Protection du conjoint ou coparent",
      "Protection des enfants",
      "Transmission et succession",
      "Priorite : prix, garanties, rapidite, simplicite, acceptation",
    ],
  },
];

export const advisorQuestions = [
  "Si le client decede demain, qui conserve le logement ?",
  "Qui supporte les charges et les credits ?",
  "Qui recoit les capitaux d'assurance ?",
  "Un parent social ou un enfant social est-il exclu ?",
  "La clause beneficiaire correspond-elle a la famille reelle ?",
  "Une consultation notaire, avocat ou CGP est-elle necessaire ?",
];

export const complianceOutputs = [
  { label: "Recueil des besoins", icon: FileCheck2 },
  { label: "Analyse des ecarts", icon: ShieldAlert },
  { label: "Preconisation motivee", icon: ShieldCheck },
  { label: "Validation humaine", icon: UsersRound },
];
