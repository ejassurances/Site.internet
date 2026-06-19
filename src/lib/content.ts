import {
  BadgeCheck,
  BriefcaseBusiness,
  FileHeart,
  HandHeart,
  Home,
  Landmark,
  LockKeyhole,
  MessageSquareText,
  Network,
  ClipboardCheck,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

export type Role = "admin" | "courtier" | "client" | "mandataire" | "prescripteur";

export const publicNav = [
  { label: "Coparentalite", href: "/expertise-coparentalite" },
  { label: "Familles LGBT+", href: "/familles-lgbt" },
  { label: "Emprunteur", href: "/assurance-emprunteur" },
  { label: "Prevoyance", href: "/prevoyance-familiale" },
  { label: "Enfants", href: "/protection-enfants" },
  { label: "Contact", href: "/contact" },
];

export const expertisePages = {
  "/expertise-coparentalite": {
    title: "Expertise coparentalite",
    eyebrow: "Organisation familiale",
    description:
      "Un accompagnement assureur pour clarifier les protections, les beneficiaires et les engagements dans les familles organisees autour de plusieurs parents.",
    highlights: [
      "Analyse des responsabilites parentales et financieres",
      "Protection des enfants dans les accords de vie",
      "Coordination avec notaire, avocat ou conseil patrimonial",
    ],
  },
  "/familles-lgbt": {
    title: "Expertise familles LGBT+",
    eyebrow: "Parcours inclusifs",
    description:
      "Des solutions d'assurance pensees pour les couples LGBT+, les parents sociaux, les familles homoparentales et les parcours de parentalite non standards.",
    highlights: [
      "Lecture attentive des liens familiaux et patrimoniaux",
      "Confidentialite des situations personnelles",
      "Contrats adaptes aux beneficiaires reels",
    ],
  },
  "/assurance-emprunteur": {
    title: "Assurance emprunteur",
    eyebrow: "Credit immobilier",
    description:
      "Comparer, securiser et negocier une assurance emprunteur adaptee a votre projet, votre sante, votre budget et votre configuration familiale.",
    highlights: [
      "Etude des garanties exigees par la banque",
      "Delegation ou substitution d'assurance",
      "Suivi des exclusions, quotites et beneficiaires",
    ],
  },
  "/prevoyance-familiale": {
    title: "Prevoyance familiale",
    eyebrow: "Proteger les proches",
    description:
      "Anticiper les accidents de vie avec des garanties lisibles pour maintenir l'equilibre financier du foyer.",
    highlights: [
      "Capital deces, invalidite, arret de travail",
      "Protection du conjoint, coparent ou partenaire",
      "Priorite aux enfants et personnes dependantes",
    ],
  },
  "/protection-enfants": {
    title: "Protection des enfants",
    eyebrow: "Priorite familiale",
    description:
      "Construire une couverture coherente autour des enfants, de leur quotidien, de leur avenir et des adultes qui les protegent.",
    highlights: [
      "Designation et suivi des beneficiaires",
      "Documents utiles centralises",
      "Approche coordonnee avec les projets de famille",
    ],
  },
};

export const valueCards = [
  {
    title: "Confidentialite",
    text: "Des informations sensibles traitees avec discretion, tracabilite et acces limite.",
    icon: LockKeyhole,
  },
  {
    title: "Expertise familiale",
    text: "Une lecture fine des familles coparentales, recomposees, LGBT+ et situations complexes.",
    icon: UsersRound,
  },
  {
    title: "Conseil utile",
    text: "Des garanties expliquees simplement, avec des choix documentes et assumables.",
    icon: BadgeCheck,
  },
];

export const dashboardConfig: Record<
  Role,
  {
    home: string;
    title: string;
    nav: { label: string; href: string; icon: typeof Home }[];
    stats: { label: string; value: string; detail: string }[];
    sections: { title: string; description: string; items: string[] }[];
  }
> = {
  client: {
    home: "/client",
    title: "Espace client",
    nav: [
      { label: "Tableau de bord", href: "/client", icon: Home },
      { label: "Diagnostic familial", href: "/client/diagnostic-familial", icon: ClipboardCheck },
      { label: "Mes informations", href: "/client#informations", icon: UsersRound },
      { label: "Mes projets", href: "/client#projets", icon: BriefcaseBusiness },
      { label: "Mes contrats", href: "/client#contrats", icon: FileHeart },
      { label: "Mes documents", href: "/client#documents", icon: ShieldCheck },
      { label: "Messages", href: "/client#messages", icon: MessageSquareText },
    ],
    stats: [
      { label: "Projets", value: "2", detail: "emprunteur et prevoyance" },
      { label: "Contrats", value: "1", detail: "actif a suivre" },
      { label: "Documents", value: "4", detail: "dont 1 attendu" },
    ],
    sections: [
      {
        title: "Mes informations",
        description: "Identite, foyer, situation familiale, beneficiaires et preferences de contact.",
        items: ["Profil personnel", "Composition familiale", "Coordonnees", "Consentements"],
      },
      {
        title: "Mes projets",
        description: "Dossiers d'assurance en cours avec etapes, pieces attendues et messages relies.",
        items: ["Assurance emprunteur", "Prevoyance familiale"],
      },
      {
        title: "Depot de documents",
        description: "Zone de depot securisee reliee a Supabase Storage dans la prochaine iteration.",
        items: ["Pieces d'identite", "Offre de pret", "Questionnaire de sante", "Mandat"],
      },
    ],
  },
  admin: {
    home: "/admin",
    title: "Espace courtier admin",
    nav: [
      { label: "Tableau de bord", href: "/admin", icon: Home },
      { label: "Family Protection OS", href: "/admin/family-protection-os", icon: ClipboardCheck },
      { label: "Clients", href: "/admin#clients", icon: UsersRound },
      { label: "Projets", href: "/admin#projets", icon: BriefcaseBusiness },
      { label: "Contrats", href: "/admin#contrats", icon: FileHeart },
      { label: "Mandataires", href: "/admin#mandataires", icon: Network },
      { label: "Parametres", href: "/admin#parametres", icon: ShieldCheck },
    ],
    stats: [
      { label: "Cabinet", value: "EJ", detail: "Partners Assurances" },
      { label: "Contact", value: "01.89", detail: "31.40.29" },
      { label: "Conformite", value: "OK", detail: "compte admin verifie" },
    ],
    sections: [
      {
        title: "Family Protection OS",
        description: "Logiciel interne de recueil DDA, scoring familial et production des recommandations.",
        items: ["Recueil des besoins", "Assurance emprunteur", "Scores de risques", "Validation conformité"],
      },
      {
        title: "Gestion des clients",
        description: "Vue cabinet pour retrouver un client, son role, ses projets et les droits associes.",
        items: ["Fiches clients", "Projets relies", "Messages", "Audit d'acces"],
      },
      {
        title: "Gestion reseau",
        description: "Suivi des mandataires, prescripteurs, conventions et commissions.",
        items: ["Mandataires", "Prescripteurs", "Referrals", "Commissions"],
      },
      {
        title: "Parametres cabinet",
        description: "Preparation des workflows, statuts, modeles de documents et notifications.",
        items: ["Roles", "Statuts de dossier", "Templates", "Journal d'audit"],
      },
    ],
  },
  courtier: {
    home: "/admin",
    title: "Espace courtier",
    nav: [
      { label: "Tableau de bord", href: "/admin", icon: Home },
      { label: "Clients", href: "/admin#clients", icon: UsersRound },
      { label: "Projets", href: "/admin#projets", icon: BriefcaseBusiness },
      { label: "Contrats", href: "/admin#contrats", icon: FileHeart },
      { label: "Demandes", href: "/admin#demandes", icon: MessageSquareText },
    ],
    stats: [
      { label: "Dossiers", value: "11", detail: "en traitement" },
      { label: "Relances", value: "5", detail: "cette semaine" },
      { label: "Contrats", value: "7", detail: "a surveiller" },
    ],
    sections: [
      {
        title: "Portefeuille courtier",
        description: "Dossiers assignes, priorites, documents et messages clients.",
        items: ["Clients assignes", "Etapes projet", "Contrats", "Demandes"],
      },
    ],
  },
  mandataire: {
    home: "/mandataire",
    title: "Espace mandataire",
    nav: [
      { label: "Tableau de bord", href: "/mandataire", icon: Home },
      { label: "Recueil DDA", href: "/mandataire/recueil-besoins", icon: ClipboardCheck },
      { label: "Mes clients", href: "/mandataire#clients", icon: UsersRound },
      { label: "Mes projets", href: "/mandataire#projets", icon: BriefcaseBusiness },
      { label: "Commissions", href: "/mandataire#commissions", icon: Landmark },
      { label: "Conformite", href: "/mandataire#conformite", icon: ShieldCheck },
    ],
    stats: [
      { label: "Clients", value: "9", detail: "suivis" },
      { label: "Projets", value: "6", detail: "ouverts" },
      { label: "Commissions", value: "3", detail: "a valider" },
    ],
    sections: [
      {
        title: "Recueil des besoins",
        description: "Creation des demandes clients avec collecte DDA et soumission au courtier admin.",
        items: ["Diagnostic familial", "Assurance emprunteur", "Documents", "Validation cabinet"],
      },
      {
        title: "Mes clients",
        description: "Clients rattaches au mandataire avec une visibilite limitee aux dossiers autorises.",
        items: ["Nouveaux contacts", "Dossiers actifs", "Pieces attendues", "Historique"],
      },
      {
        title: "Mon profil conformite",
        description: "Documents reglementaires, convention, attestations et controles internes.",
        items: ["Convention", "ORIAS", "Formations", "Documents"],
      },
    ],
  },
  prescripteur: {
    home: "/prescripteur",
    title: "Espace prescripteur",
    nav: [
      { label: "Tableau de bord", href: "/prescripteur", icon: Home },
      { label: "Deposer un prospect", href: "/prescripteur#depot", icon: HandHeart },
      { label: "Suivi prospects", href: "/prescripteur#prospects", icon: BriefcaseBusiness },
      { label: "Historique", href: "/prescripteur#historique", icon: MessageSquareText },
      { label: "Convention", href: "/prescripteur#documents", icon: FileHeart },
    ],
    stats: [
      { label: "Prospects", value: "12", detail: "transmis" },
      { label: "En cours", value: "4", detail: "qualifies" },
      { label: "Transformes", value: "2", detail: "ce trimestre" },
    ],
    sections: [
      {
        title: "Deposer un prospect",
        description: "Formulaire de transmission avec consentement, besoin identifie et suivi du statut.",
        items: ["Coordonnees", "Besoin assurance", "Consentement", "Piece optionnelle"],
      },
      {
        title: "Suivi des prospects transmis",
        description: "Statuts visibles sans exposer les donnees confidentielles du dossier client.",
        items: ["Recu", "Qualifie", "En proposition", "Converti"],
      },
    ],
  },
};
