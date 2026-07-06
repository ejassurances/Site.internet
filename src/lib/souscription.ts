// Configuration déclarative du workbook de souscription.
// Cette configuration est partagée par le formulaire de recueil des besoins
// (src/components/souscription-recueil-form.tsx) et par le générateur de
// lettre de mission (src/lib/lettre-mission.ts), afin que les deux restent
// toujours synchronisés.

export type SouscriptionProduct = "emprunteur" | "trottinette";

export type FieldType =
  | "text"
  | "number"
  | "select"
  | "textarea"
  | "checkbox"
  | "date";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  placeholder?: string;
  hint?: string;
  suffix?: string;
  /** Occupe la moitié de la largeur dans la grille (par défaut : pleine largeur). */
  half?: boolean;
};

export type SectionDef = {
  title: string;
  description?: string;
  fields: FieldDef[];
};

export type ProductDef = {
  key: SouscriptionProduct;
  label: string;
  tagline: string;
  icon: string;
  intro: string;
  /** Garanties proposées par défaut dans la lettre de mission. */
  defaultGuarantees: string[];
  sections: SectionDef[];
};

const CIVILITE = ["Madame", "Monsieur"];
const OUI_NON = ["Non", "Oui"];

export const EMPRUNTEUR: ProductDef = {
  key: "emprunteur",
  label: "Assurance emprunteur",
  tagline: "Protéger le crédit immobilier et le projet de vie",
  icon: "🏡",
  intro:
    "Ce recueil permet d'analyser votre projet immobilier et votre situation afin de vous proposer une assurance emprunteur adaptée (délégation ou substitution) et conforme au devoir de conseil.",
  defaultGuarantees: [
    "Décès",
    "PTIA (Perte Totale et Irréversible d'Autonomie)",
    "ITT (Incapacité Temporaire Totale)",
    "IPT (Invalidité Permanente Totale)",
  ],
  sections: [
    {
      title: "Le projet immobilier",
      description: "Les caractéristiques du crédit à assurer.",
      fields: [
        {
          name: "type_projet",
          label: "Type de projet",
          type: "select",
          options: [
            "Résidence principale",
            "Résidence secondaire",
            "Investissement locatif",
            "SCI / patrimonial",
            "Rachat de crédit",
          ],
          required: true,
          half: true,
        },
        {
          name: "operation",
          label: "Nature de l'opération",
          type: "select",
          options: [
            "Nouveau prêt (délégation)",
            "Substitution d'assurance existante",
          ],
          required: true,
          half: true,
        },
        { name: "banque", label: "Banque prêteuse", type: "text", placeholder: "Ex. Crédit Agricole", half: true },
        {
          name: "montant",
          label: "Montant emprunté",
          type: "number",
          suffix: "€",
          placeholder: "250000",
          required: true,
          half: true,
        },
        { name: "duree", label: "Durée du prêt", type: "number", suffix: "ans", placeholder: "20", half: true },
        { name: "taux", label: "Taux du crédit", type: "number", suffix: "%", placeholder: "3.5", half: true },
        { name: "date_deblocage", label: "Date de déblocage prévue", type: "date", half: true },
        {
          name: "nb_emprunteurs",
          label: "Nombre d'emprunteurs",
          type: "select",
          options: ["1", "2"],
          half: true,
        },
      ],
    },
    {
      title: "Le ou les assuré(s)",
      description: "Informations sur la personne à assurer (assuré principal).",
      fields: [
        { name: "civilite", label: "Civilité", type: "select", options: CIVILITE, half: true },
        { name: "profession", label: "Profession", type: "text", placeholder: "Ex. Ingénieur", half: true },
        { name: "date_naissance", label: "Date de naissance", type: "date", required: true, half: true },
        {
          name: "statut_pro",
          label: "Statut professionnel",
          type: "select",
          options: ["CDI", "CDD", "Fonctionnaire", "Indépendant / TNS", "Chef d'entreprise", "Retraité", "Autre"],
          half: true,
        },
        { name: "fumeur", label: "Fumeur (12 derniers mois)", type: "select", options: OUI_NON, half: true },
        {
          name: "sport_risque",
          label: "Sport ou loisir à risque",
          type: "select",
          options: OUI_NON,
          half: true,
        },
        {
          name: "deplacements_pro",
          label: "Déplacements professionnels fréquents",
          type: "select",
          options: OUI_NON,
          half: true,
        },
        {
          name: "travail_hauteur",
          label: "Travail en hauteur / port de charges",
          type: "select",
          options: OUI_NON,
          half: true,
        },
      ],
    },
    {
      title: "Quotités & garanties souhaitées",
      fields: [
        { name: "quotite_1", label: "Quotité assuré 1", type: "number", suffix: "%", placeholder: "100", half: true },
        { name: "quotite_2", label: "Quotité assuré 2", type: "number", suffix: "%", placeholder: "0", half: true },
        {
          name: "g_deces",
          label: "Décès",
          type: "checkbox",
        },
        { name: "g_ptia", label: "PTIA (Perte Totale et Irréversible d'Autonomie)", type: "checkbox" },
        { name: "g_itt", label: "ITT (Incapacité Temporaire Totale)", type: "checkbox" },
        { name: "g_ipt", label: "IPT (Invalidité Permanente Totale)", type: "checkbox" },
        { name: "g_ipp", label: "IPP (Invalidité Permanente Partielle)", type: "checkbox" },
        {
          name: "assureur_actuel",
          label: "Assureur actuel (si substitution)",
          type: "text",
          placeholder: "Ex. contrat bancaire groupe",
        },
      ],
    },
    {
      title: "Vos attentes",
      fields: [
        {
          name: "priorite",
          label: "Priorité principale",
          type: "select",
          options: ["Meilleur prix", "Meilleures garanties", "Simplicité et rapidité", "Équilibre prix / garanties"],
          half: true,
        },
        { name: "budget_mensuel", label: "Budget mensuel visé", type: "number", suffix: "€", half: true },
        {
          name: "remarques",
          label: "Remarques / éléments à signaler",
          type: "textarea",
          placeholder: "Antécédents médicaux, contexte particulier, échéances…",
        },
      ],
    },
  ],
};

export const TROTTINETTE: ProductDef = {
  key: "trottinette",
  label: "Assurance trottinette / EDPM",
  tagline: "Assurer un engin de déplacement personnel motorisé",
  icon: "🛴",
  intro:
    "Ce recueil permet d'analyser l'usage de votre engin de déplacement personnel motorisé (trottinette, vélo électrique, gyroroue…) afin de vous proposer une couverture adaptée et conforme à l'obligation de responsabilité civile.",
  defaultGuarantees: [
    "Responsabilité civile (obligatoire)",
    "Vol et tentative de vol",
    "Dommages tous accidents",
    "Assistance / dépannage",
  ],
  sections: [
    {
      title: "L'engin à assurer",
      fields: [
        {
          name: "type_engin",
          label: "Type d'engin",
          type: "select",
          options: [
            "Trottinette électrique",
            "Vélo à assistance électrique",
            "Gyroroue / monoroue",
            "Hoverboard",
            "Autre EDPM",
          ],
          required: true,
          half: true,
        },
        { name: "marque", label: "Marque", type: "text", placeholder: "Ex. Xiaomi", half: true },
        { name: "modele", label: "Modèle", type: "text", placeholder: "Ex. Pro 2", half: true },
        {
          name: "valeur",
          label: "Valeur d'achat",
          type: "number",
          suffix: "€",
          placeholder: "600",
          required: true,
          half: true,
        },
        { name: "date_achat", label: "Date d'achat", type: "date", half: true },
        { name: "vitesse_max", label: "Vitesse maximale", type: "number", suffix: "km/h", placeholder: "25", half: true },
        { name: "numero_serie", label: "Numéro de série", type: "text", half: true },
        {
          name: "debride",
          label: "Engin débridé (> 25 km/h)",
          type: "select",
          options: OUI_NON,
          hint: "Un engin débridé peut relever d'une réglementation différente.",
          half: true,
        },
      ],
    },
    {
      title: "L'usage",
      fields: [
        {
          name: "usage",
          label: "Usage principal",
          type: "select",
          options: ["Personnel / loisir", "Trajets domicile-travail", "Professionnel", "Mixte"],
          required: true,
          half: true,
        },
        {
          name: "frequence",
          label: "Fréquence d'utilisation",
          type: "select",
          options: ["Quotidienne", "Plusieurs fois / semaine", "Occasionnelle"],
          half: true,
        },
        {
          name: "zone",
          label: "Zone de circulation",
          type: "select",
          options: ["Ville", "Périurbain", "Campagne", "Mixte"],
          half: true,
        },
        {
          name: "stationnement",
          label: "Lieu de stationnement habituel",
          type: "select",
          options: [
            "Domicile (local fermé)",
            "Domicile (extérieur / cave commune)",
            "Lieu de travail",
            "Voie publique",
          ],
          half: true,
        },
        { name: "km_an", label: "Kilométrage annuel estimé", type: "number", suffix: "km", half: true },
      ],
    },
    {
      title: "Le conducteur",
      fields: [
        { name: "civilite", label: "Civilité", type: "select", options: CIVILITE, half: true },
        { name: "date_naissance", label: "Date de naissance", type: "date", required: true, half: true },
        {
          name: "antecedents",
          label: "Sinistres au cours des 36 derniers mois",
          type: "select",
          options: OUI_NON,
          half: true,
        },
        {
          name: "autres_conducteurs",
          label: "Autres conducteurs réguliers",
          type: "select",
          options: OUI_NON,
          half: true,
        },
      ],
    },
    {
      title: "Garanties & attentes",
      fields: [
        { name: "g_rc", label: "Responsabilité civile (obligatoire)", type: "checkbox" },
        { name: "g_vol", label: "Vol et tentative de vol", type: "checkbox" },
        { name: "g_dommages", label: "Dommages tous accidents", type: "checkbox" },
        { name: "g_assistance", label: "Assistance / dépannage", type: "checkbox" },
        { name: "g_individuelle", label: "Individuelle conducteur (corporel)", type: "checkbox" },
        { name: "g_juridique", label: "Protection juridique", type: "checkbox" },
        {
          name: "franchise",
          label: "Franchise souhaitée",
          type: "select",
          options: ["La plus basse possible", "Franchise modérée (budget maîtrisé)", "Sans préférence"],
          half: true,
        },
        { name: "budget_mensuel", label: "Budget mensuel visé", type: "number", suffix: "€", half: true },
        {
          name: "remarques",
          label: "Remarques / éléments à signaler",
          type: "textarea",
          placeholder: "Contexte particulier, accessoires à assurer…",
        },
      ],
    },
  ],
};

export const PRODUCTS: Record<SouscriptionProduct, ProductDef> = {
  emprunteur: EMPRUNTEUR,
  trottinette: TROTTINETTE,
};

export function getProduct(key: string): ProductDef | null {
  if (key === "emprunteur" || key === "trottinette") {
    return PRODUCTS[key];
  }
  return null;
}

export function isSouscriptionProduct(key: string): key is SouscriptionProduct {
  return key === "emprunteur" || key === "trottinette";
}

/** Libellé lisible d'une valeur de champ (checkbox → Oui/Non, etc.). */
export function formatFieldValue(field: FieldDef, value: unknown): string {
  if (field.type === "checkbox") {
    return value ? "Oui" : "Non";
  }
  if (value === undefined || value === null || value === "") {
    return "—";
  }
  const suffix = field.suffix ? ` ${field.suffix}` : "";
  return `${String(value)}${suffix}`;
}
