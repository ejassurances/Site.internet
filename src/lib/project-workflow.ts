export type ProjectStepKey =
  | "needs"
  | "mission"
  | "quotes"
  | "advice"
  | "subscription"
  | "validation";

export type ProjectStepStatus = "todo" | "in_progress" | "blocked" | "waiting_client" | "done";

export type BorrowerProject = {
  id: string;
  client_id: string;
  title: string;
  project_type: string;
  status: string;
  sensitive_context: string | null;
  created_at: string;
  updated_at: string;
};

export type WorkflowStep = {
  key: ProjectStepKey;
  title: string;
  status: ProjectStepStatus;
  description: string;
  deliverables: string[];
  channels: string[];
};

export const borrowerRequiredDocuments = [
  {
    key: "loan_offer",
    label: "Offre de pret",
    requiredForValidation: true,
    acceptedSources: ["Espace client", "Courtier", "Mandataire", "Import Gmail"],
  },
  {
    key: "amortization_schedule",
    label: "Tableau d'amortissement",
    requiredForValidation: true,
    acceptedSources: ["Espace client", "Courtier", "Mandataire", "Import Gmail"],
  },
  {
    key: "current_insurance_certificate",
    label: "Contrat ou notice assurance actuelle",
    requiredForValidation: false,
    acceptedSources: ["Espace client", "Courtier", "Mandataire", "Import Gmail"],
  },
  {
    key: "identity",
    label: "Piece d'identite",
    requiredForValidation: true,
    acceptedSources: ["Espace client", "Courtier", "Mandataire"],
  },
];

export const borrowerWorkflowSteps: WorkflowStep[] = [
  {
    key: "needs",
    title: "Recueil des besoins",
    status: "in_progress",
    description:
      "Collecter les informations credit, emprunteurs, garanties, quotites, objectif de delegation ou substitution.",
    deliverables: ["Recueil pre-rempli", "Offre de pret", "Tableau d'amortissement"],
    channels: ["Espace client", "Saisie courtier", "Saisie MIA", "Import Gmail"],
  },
  {
    key: "mission",
    title: "Feuille de mission",
    status: "todo",
    description: "Generer la feuille de mission, l'envoyer au client et attendre sa signature.",
    deliverables: ["Feuille de mission", "Signature client", "Archivage classeur projet"],
    channels: ["Email", "Espace client"],
  },
  {
    key: "quotes",
    title: "Creation des devis",
    status: "todo",
    description: "Construire les devis a partir des donnees credit et des pieces justificatives valides.",
    deliverables: ["Comparatif devis", "Hypotheses de garanties", "Economies estimees"],
    channels: ["Courtier", "MIA"],
  },
  {
    key: "advice",
    title: "Fiche conseil",
    status: "todo",
    description:
      "Rediger la fiche conseil DDA, l'envoyer au client, recueillir sa signature et ses commentaires eventuels.",
    deliverables: ["Fiche conseil", "Signature client", "Commentaire client"],
    channels: ["Email", "Espace client"],
  },
  {
    key: "subscription",
    title: "Lien de souscription",
    status: "todo",
    description: "Envoyer le lien de souscription apres validation du conseil et des documents.",
    deliverables: ["Lien de souscription", "Suivi compagnie", "Accuse client"],
    channels: ["Email", "Espace client"],
  },
  {
    key: "validation",
    title: "Validation compagnie",
    status: "todo",
    description: "Attendre la validation, rattacher les documents recus et transformer en contrat si accepte.",
    deliverables: ["Decision compagnie", "Conditions particulieres", "Contrat"],
    channels: ["Compagnie", "Gmail", "Espace client"],
  },
];

export function getBorrowerWorkflow(project?: BorrowerProject | null) {
  if (!project) {
    return borrowerWorkflowSteps;
  }

  return borrowerWorkflowSteps.map((step, index) => {
    if (project.status === "waiting_documents" && step.key === "needs") {
      return { ...step, status: "blocked" as const };
    }

    if (project.status === "signed" && index < 4) {
      return { ...step, status: "done" as const };
    }

    return step;
  });
}
