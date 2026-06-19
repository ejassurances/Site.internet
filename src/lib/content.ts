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
    title: "Coparentalite choisie : proteger chaque parent et chaque enfant",
    eyebrow: "Familles coparentales",
    description:
      "Quand plusieurs adultes construisent un projet parental, les liens affectifs, financiers et juridiques ne se superposent pas toujours. Nous vous aidons a clarifier les protections utiles avant qu'un accident de vie ne revele les angles morts.",
    highlights: [
      "Identifier qui assume quoi pour l'enfant au quotidien",
      "Proteger le logement, les revenus et les adultes referents",
      "Coordonner assurance, clauses beneficiaires et conseils juridiques",
    ],
    examples: [
      {
        title: "Deux foyers, un meme enfant",
        text: "Deux coparents organisent la vie de l'enfant entre deux logements. L'un finance davantage le quotidien, l'autre porte le credit immobilier. Nous verifions ce qui se passerait si l'un des deux decedait ou ne pouvait plus travailler.",
      },
      {
        title: "Un adulte referent sans statut clair",
        text: "Un proche participe a l'education et aux depenses, sans etre reconnu comme parent. Nous identifions les limites juridiques et les solutions d'assurance permettant d'eviter une rupture de protection.",
      },
      {
        title: "Projet parental avant achat immobilier",
        text: "Avant d'acheter ou d'emprunter, nous aidons a choisir les quotites, les garanties et les beneficiaires pour que le logement ne devienne pas un point de tension.",
      },
    ],
    checks: [
      "Qui depend financierement de chaque adulte ?",
      "Qui doit pouvoir rester dans le logement ?",
      "Les clauses beneficiaires correspondent-elles au projet familial ?",
      "Les enfants seraient-ils proteges en cas de deces, invalidite ou separation ?",
    ],
    outcome:
      "Vous repartez avec une lecture claire des protections a mettre en place : assurance emprunteur, prevoyance, clause beneficiaire, documents utiles ou orientation vers un professionnel du droit.",
  },
  "/familles-lgbt": {
    title: "Familles LGBT+ : faire reconnaitre et proteger la famille reelle",
    eyebrow: "Parcours inclusifs",
    description:
      "Couple marie, PACS, concubinage, parent social, adoption, PMA ou famille homoparentale : chaque parcours merite une lecture precise. Le cabinet verifie que les personnes que vous aimez seront bien protegees par vos contrats.",
    highlights: [
      "Confidentialite totale sur les situations personnelles",
      "Analyse des beneficiaires, capitaux et droits successoraux",
      "Solutions d'assurance adaptees aux personnes a proteger",
    ],
    examples: [
      {
        title: "Parent social tres implique",
        text: "Un enfant est eleve par deux adultes, mais un seul est reconnu juridiquement. Nous verifions comment proteger l'enfant et l'adulte qui compte dans sa vie, notamment via prevoyance, assurance vie et beneficiaires.",
      },
      {
        title: "Couple non marie proprietaire du logement",
        text: "Deux partenaires vivent ensemble et remboursent un credit. En cas de deces, le survivant peut se retrouver fragilise. Nous analysons les quotites, le capital deces et les consequences successorales.",
      },
      {
        title: "Famille homoparentale et transmission",
        text: "Quand la famille affective ne correspond pas parfaitement a la famille heritiere, nous aidons a reperer les ecarts et a preparer les bonnes questions pour le notaire.",
      },
    ],
    checks: [
      "Les personnes que vous voulez proteger sont-elles bien designees ?",
      "Le parent social ou partenaire dispose-t-il d'une securite financiere ?",
      "La fiscalite successorale cree-t-elle un risque particulier ?",
      "Vos contrats actuels parlent-ils vraiment de votre famille reelle ?",
    ],
    outcome:
      "L'objectif est d'obtenir une protection lisible, respectueuse de votre parcours, avec des contrats coherents avec les personnes qui comptent reellement.",
  },
  "/assurance-emprunteur": {
    title: "Assurance emprunteur : proteger le logement familial",
    eyebrow: "Credit immobilier",
    description:
      "L'assurance de pret ne sert pas seulement a rassurer la banque. Pour une famille recomposee, LGBT+ ou en concubinage, elle peut devenir une piece centrale de protection du logement et du survivant.",
    highlights: [
      "Verifier les quotites selon les revenus et la realite du foyer",
      "Comparer delegation, substitution et garanties exigees",
      "Anticiper l'impact d'un deces ou d'une invalidite sur le logement",
    ],
    examples: [
      {
        title: "Couple en concubinage avec revenus differents",
        text: "La banque demande une assurance, mais la repartition 50/50 ne protege pas toujours le survivant. Nous regardons les revenus, les charges, la propriete et la capacite a garder le logement.",
      },
      {
        title: "Famille recomposee et achat commun",
        text: "Chaque adulte a des enfants d'une precedente union. Nous verifions si l'assurance emprunteur, la prevoyance et la succession racontent la meme histoire.",
      },
      {
        title: "Substitution d'assurance trop rapide",
        text: "Changer d'assurance peut reduire le cout, mais pas au prix d'une garantie moins adaptee. Nous comparons exclusions, quotites, garanties et situation familiale.",
      },
    ],
    checks: [
      "Qui doit pouvoir conserver le logement en cas de coup dur ?",
      "Les quotites tiennent-elles compte des revenus et des charges ?",
      "Les exclusions ou surprimes creent-elles une fragilite ?",
      "Le contrat protege-t-il seulement la banque ou aussi la famille ?",
    ],
    outcome:
      "Nous recherchons une assurance emprunteur qui securise le credit, mais aussi le projet de vie : logement, partenaire, enfants et equilibre financier.",
  },
  "/prevoyance-familiale": {
    title: "Prevoyance familiale : maintenir la vie du foyer",
    eyebrow: "Revenus et accidents de vie",
    description:
      "La prevoyance doit repondre a une question simple : si vos revenus disparaissent demain, qui est fragilise ? Nous construisons les garanties autour des personnes qui dependent reellement de vous.",
    highlights: [
      "Capital deces, invalidite, arret de travail",
      "Protection du conjoint, partenaire, coparent ou parent social",
      "Priorite aux enfants et aux personnes dependantes",
    ],
    examples: [
      {
        title: "Un revenu principal dans le foyer",
        text: "Si une personne porte l'essentiel des charges, un arret de travail ou une invalidite peut tout destabiliser. Nous chiffrons le besoin reel : revenus, credit, enfants, frais courants.",
      },
      {
        title: "Partenaire non protege par le statut familial",
        text: "Le couple fonctionne comme une famille, mais le droit ne protege pas toujours le partenaire. Nous analysons les garanties deces, rente, capital et designation beneficiaire.",
      },
      {
        title: "Enfants encore jeunes",
        text: "Le besoin ne se limite pas aux frais immediats. Il faut penser logement, etudes, garde, accompagnement et maintien du niveau de vie.",
      },
    ],
    checks: [
      "Combien faudrait-il pour maintenir le foyer pendant 1, 3 ou 10 ans ?",
      "Qui recevrait le capital aujourd'hui ?",
      "Les enfants ou personnes dependantes sont-ils prioritaires ?",
      "Les garanties employeur suffisent-elles vraiment ?",
    ],
    outcome:
      "Le cabinet vous aide a construire une prevoyance comprehensible : ni trop faible, ni inutilement excessive, mais adaptee aux personnes qui dependent de vous.",
  },
  "/protection-enfants": {
    title: "Protection des enfants : securiser leur avenir concret",
    eyebrow: "Enfants et parentalite",
    description:
      "Dans les familles recomposees, homoparentales ou coparentales, tous les enfants ne sont pas proteges de la meme maniere par defaut. Nous aidons a organiser les garanties, les beneficiaires et les documents utiles.",
    highlights: [
      "Verifier la coherence entre enfants biologiques, adoptes et sociaux",
      "Designer les bons beneficiaires et les bons representants",
      "Preparer une protection lisible pour les adultes de confiance",
    ],
    examples: [
      {
        title: "Enfants d'une precedente union",
        text: "Dans une famille recomposee, proteger le conjoint et les enfants peut demander un equilibre fin. Nous aidons a identifier les tensions possibles entre protection immediate et transmission.",
      },
      {
        title: "Enfant social non heritier",
        text: "Un enfant peut etre aime, eleve et soutenu sans etre heritier legal. Nous reperons les limites et les pistes possibles : assurance vie, prevoyance, testament ou conseil notarial.",
      },
      {
        title: "Adultes de confiance autour de l'enfant",
        text: "Certaines familles veulent que plusieurs adultes restent presents si un accident survient. Nous aidons a documenter les intentions et les protections financieres utiles.",
      },
    ],
    checks: [
      "Tous les enfants a proteger sont-ils identifies dans les contrats ?",
      "Les beneficiaires sont-ils a jour ?",
      "Le capital serait-il disponible au bon moment et pour la bonne personne ?",
      "Faut-il coordonner assurance, testament ou conseil juridique ?",
    ],
    outcome:
      "L'objectif est que les enfants ne soient pas seulement nommes dans les intentions, mais reellement proteges par les contrats, les capitaux et les documents utiles.",
  },
};

export const valueCards = [
  {
    title: "Confidentialite",
    text: "Vos choix familiaux, patrimoniaux et personnels sont traites avec discretion et sans jugement.",
    icon: LockKeyhole,
  },
  {
    title: "Expertise familiale",
    text: "Nous savons lire les ecarts entre famille affective, famille juridique et famille heritiere.",
    icon: UsersRound,
  },
  {
    title: "Conseil responsable",
    text: "Chaque recommandation part d'un besoin reel : logement, revenus, enfants, succession ou protection du couple.",
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
      { label: "Classeur ACPR", href: "/client#classeur-acpr", icon: FileHeart },
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
      { label: "Methode cabinet", href: "/admin/family-protection-os", icon: ClipboardCheck },
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
        title: "Methode cabinet",
        description: "Recueil des besoins, analyse familiale et preparation des recommandations conformes.",
        items: ["Recueil des besoins", "Assurance emprunteur", "Risques familiaux", "Validation conformite"],
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
      { label: "Recueil besoins", href: "/mandataire/recueil-besoins", icon: ClipboardCheck },
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
        description: "Creation des demandes clients autour de la famille, du logement, des revenus et des enfants.",
        items: ["Situation familiale", "Assurance emprunteur", "Documents", "Validation cabinet"],
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
