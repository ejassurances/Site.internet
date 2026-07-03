export type LcbftRiskLevel = "faible" | "standard" | "renforce" | "critique";

export type LcbftInput = {
  isPpe?: boolean;
  sanctionsPotentialMatch?: boolean;
  sanctionsConfirmedMatch?: boolean;
  thirdPartyPayer?: boolean;
  highRiskCountry?: boolean;
  legalEntity?: boolean;
  opaqueOwnership?: boolean;
  sourceOfFundsMissing?: boolean;
  sourceOfFundsComplex?: boolean;
  amountAboveThreshold?: boolean;
  unusualTransaction?: boolean;
  inconsistentProfile?: boolean;
  missingIdentityDocument?: boolean;
  missingProofOfAddress?: boolean;
  missingBeneficialOwner?: boolean;
  digitalOnboarding?: boolean;
  lifeInsuranceOrCapitalization?: boolean;
  earlyRedemptionOrArbitrage?: boolean;
};

export type LcbftAutomation = {
  id: string;
  label: string;
  description: string;
  mandatory: boolean;
};

export type LcbftScoreResult = {
  score: number;
  level: LcbftRiskLevel;
  reviewFrequency: string;
  decision: "continuer" | "vigilance_renforcee" | "suspendre_operation" | "escalade_direction";
  reasons: string[];
  automations: LcbftAutomation[];
};

type WeightedRule = {
  key: keyof LcbftInput;
  weight: number;
  reason: string;
};

export const lcbftWeightedRules: WeightedRule[] = [
  { key: "sanctionsConfirmedMatch", weight: 100, reason: "Correspondance confirmee sur liste de sanctions ou gel des avoirs." },
  { key: "sanctionsPotentialMatch", weight: 45, reason: "Homonymie ou doute sur liste de sanctions a lever avant operation." },
  { key: "isPpe", weight: 35, reason: "Personne politiquement exposee ou entourage PPE : vigilance renforcee de plein droit." },
  { key: "thirdPartyPayer", weight: 25, reason: "Presence d'un tiers payeur ou d'un payeur distinct du souscripteur." },
  { key: "highRiskCountry", weight: 30, reason: "Lien avec un pays tiers a haut risque ou zone sensible." },
  { key: "legalEntity", weight: 10, reason: "Personne morale : identification du beneficiaire effectif requise." },
  { key: "opaqueOwnership", weight: 30, reason: "Structure de detention opaque ou montage juridique complexe." },
  { key: "sourceOfFundsMissing", weight: 25, reason: "Justificatif d'origine des fonds manquant." },
  { key: "sourceOfFundsComplex", weight: 25, reason: "Origine des fonds complexe, atypique ou difficile a justifier." },
  { key: "amountAboveThreshold", weight: 18, reason: "Montant superieur au seuil interne defini par la cartographie." },
  { key: "unusualTransaction", weight: 25, reason: "Operation atypique au regard du profil client." },
  { key: "inconsistentProfile", weight: 20, reason: "Incoherence entre situation declaree, objectif, revenus ou operation." },
  { key: "missingIdentityDocument", weight: 20, reason: "Piece d'identite absente ou non exploitable." },
  { key: "missingProofOfAddress", weight: 10, reason: "Justificatif de domicile absent ou trop ancien." },
  { key: "missingBeneficialOwner", weight: 25, reason: "Beneficiaire effectif non identifie ou non documente." },
  { key: "digitalOnboarding", weight: 8, reason: "Entree en relation a distance : controle documentaire renforce recommande." },
  { key: "lifeInsuranceOrCapitalization", weight: 12, reason: "Produit d'assurance-vie ou capitalisation : surveillance des flux et beneficiaires." },
  { key: "earlyRedemptionOrArbitrage", weight: 22, reason: "Rachat ou arbitrage precoce pouvant relever du KYT." },
];

export function computeLcbftScore(input: LcbftInput): LcbftScoreResult {
  const matched = lcbftWeightedRules.filter((rule) => input[rule.key]);
  const rawScore = matched.reduce((sum, rule) => sum + rule.weight, 0);
  const score = Math.min(100, rawScore);
  const reasons = matched.map((rule) => rule.reason);

  if (input.sanctionsConfirmedMatch) {
    return {
      score: 100,
      level: "critique",
      reviewFrequency: "Blocage immediat et revue avant toute operation",
      decision: "suspendre_operation",
      reasons,
      automations: buildAutomations("critique", input),
    };
  }

  const level: LcbftRiskLevel =
    score >= 75 ? "critique" :
    score >= 45 ? "renforce" :
    score >= 20 ? "standard" :
    "faible";

  const decision =
    level === "critique" ? "escalade_direction" :
    level === "renforce" ? "vigilance_renforcee" :
    "continuer";

  const reviewFrequency =
    level === "critique" ? "Revue immediate puis suivi continu" :
    level === "renforce" ? "Revue annuelle minimum et a chaque evenement significatif" :
    level === "standard" ? "Revue tous les 3 ans et a chaque changement significatif" :
    "Revue tous les 5 ans et a chaque changement significatif";

  return {
    score,
    level,
    reviewFrequency,
    decision,
    reasons,
    automations: buildAutomations(level, input),
  };
}

function buildAutomations(level: LcbftRiskLevel, input: LcbftInput): LcbftAutomation[] {
  const automations: LcbftAutomation[] = [
    {
      id: "audit-log",
      label: "Journaliser le score",
      description: "Creer une entree audit_logs avec score, criteres declencheurs, utilisateur et horodatage.",
      mandatory: true,
    },
    {
      id: "document-proof",
      label: "Verifier le dossier de preuve",
      description: "Controler la presence des pieces KYC et references documentaires dans le classeur ACPR.",
      mandatory: true,
    },
  ];

  if (input.sanctionsPotentialMatch || input.sanctionsConfirmedMatch) {
    automations.push({
      id: "sanctions-review",
      label: "Suspendre et analyser l'alerte sanctions",
      description: "Qualifier true match ou false positive, documenter l'analyse et bloquer l'operation tant que le doute n'est pas leve.",
      mandatory: true,
    });
  }

  if (input.isPpe || level === "renforce" || level === "critique") {
    automations.push({
      id: "enhanced-due-diligence",
      label: "Declencher vigilance renforcee",
      description: "Demander origine des fonds/patrimoine, validation direction et revue rapprochee.",
      mandatory: true,
    });
  }

  if (input.sourceOfFundsMissing || input.missingIdentityDocument || input.missingBeneficialOwner) {
    automations.push({
      id: "missing-documents-task",
      label: "Creer une tache pieces manquantes",
      description: "Bloquer la progression du dossier tant que les justificatifs requis ne sont pas collectes.",
      mandatory: true,
    });
  }

  if (input.unusualTransaction || input.earlyRedemptionOrArbitrage || input.inconsistentProfile) {
    automations.push({
      id: "kyt-alert",
      label: "Ouvrir une alerte KYT",
      description: "Analyser l'operation au regard du profil client et escalader si le doute n'est pas leve.",
      mandatory: true,
    });
  }

  if (level === "critique") {
    automations.push({
      id: "direction-escalation",
      label: "Escalade direction/conformite",
      description: "Soumettre le dossier au courtier responsable avant recommandation, souscription ou operation.",
      mandatory: true,
    });
  }

  return automations;
}
