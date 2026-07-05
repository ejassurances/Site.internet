export type ProjectStepKey =
  | "needs"
  | "mission"
  | "quotes"
  | "advice"
  | "subscription"
  | "validation"
  | "activation";

export type ProjectStepStatus = "todo" | "in_progress" | "blocked" | "waiting_client" | "done";

export type BorrowerWorkflowStepRecord = {
  id: string;
  project_id: string;
  step_key: ProjectStepKey;
  label: string;
  status: ProjectStepStatus;
  position: number;
  delivery_channels: string[] | null;
  requirements: Record<string, unknown> | null;
  completed_at: string | null;
  completed_by: string | null;
};

export type BorrowerDocumentRequirementRecord = {
  id: string;
  project_id: string;
  document_key: string;
  label: string;
  required_for_validation: boolean;
  status: "missing" | "received" | "validated" | "rejected";
  position: number;
  accepted_sources: string[] | null;
  document_id: string | null;
  source: string | null;
  source_metadata: Record<string, unknown> | null;
  validated_at: string | null;
  validated_by: string | null;
};

export type BorrowerNeedsRecord = {
  id: string;
  project_id: string;
  client_id: string;
  completion_source: "client" | "courtier" | "mandataire" | "mia" | "import_gmail";
  status: "draft" | "documents_missing" | "ready_for_validation" | "validated";
  bank_name: string | null;
  loan_amount: number | null;
  loan_duration_months: number | null;
  remaining_capital: number | null;
  loan_start_date: string | null;
  loan_end_date: string | null;
  current_insurer: string | null;
  current_annual_premium: number | null;
  requested_quotities: Record<string, unknown> | null;
  requested_guarantees: string[] | null;
  delegation_or_substitution: string | null;
  objective: string | null;
  known_data: Record<string, unknown> | null;
  missing_data: Record<string, unknown> | null;
  validation_blockers: string[] | null;
  client_comment: string | null;
  advisor_notes: string | null;
};

export type BorrowerDeliveryRecord = {
  id: string;
  project_id: string;
  delivery_type: "feuille_mission" | "devis" | "fiche_conseil" | "lien_souscription" | "relance" | "autre";
  channel: "email" | "espace_client";
  status: "draft" | "sent" | "opened" | "signed" | "commented" | "failed";
  subject: string | null;
  body: string | null;
  sent_at: string | null;
  created_at: string;
};

export type BorrowerSignatureRecord = {
  id: string;
  project_id: string;
  signature_type: "feuille_mission" | "fiche_conseil" | "autre";
  status: "pending" | "signed" | "refused" | "expired";
  client_comment: string | null;
  requested_at: string;
  signed_at: string | null;
};

export type BorrowerEmailImportRecord = {
  id: string;
  project_id: string;
  gmail_thread_id: string | null;
  from_email: string | null;
  subject: string | null;
  received_at: string | null;
  ai_summary: string | null;
  attachment_count: number;
  excluded: boolean;
};

export type BorrowerProject = {
  id: string;
  client_id: string;
  title: string;
  project_type: string;
  status: string;
  workflow_stage?: string | null;
  workflow_data?: Record<string, unknown> | null;
  sensitive_context: string | null;
  created_at: string;
  updated_at: string;
  project_workflow_steps?: BorrowerWorkflowStepRecord[];
  project_document_requirements?: BorrowerDocumentRequirementRecord[];
  project_borrower_needs?: BorrowerNeedsRecord[];
  project_deliveries?: BorrowerDeliveryRecord[];
  project_signatures?: BorrowerSignatureRecord[];
  project_email_imports?: BorrowerEmailImportRecord[];
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
  {
    key: "bank_equivalence_requirements",
    label: "Exigences equivalence garanties banque",
    requiredForValidation: false,
    acceptedSources: ["Courtier", "Mandataire", "Import Gmail"],
  },
  {
    key: "subscription_confirmation",
    label: "Validation compagnie / certificat adhesion",
    requiredForValidation: false,
    acceptedSources: ["Compagnie", "Import Gmail", "Courtier"],
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
  {
    key: "activation",
    title: "Activation du dossier",
    status: "todo",
    description:
      "Activer le dossier apres validation compagnie, archiver les preuves et preparer la mise en vigueur du contrat.",
    deliverables: ["Contrat actif", "Archivage ACPR", "Notification client", "Suivi banque"],
    channels: ["CRM", "Espace client", "Email"],
  },
];

export function getBorrowerWorkflow(project?: BorrowerProject | null) {
  if (!project) {
    return borrowerWorkflowSteps;
  }

  const storedSteps = project.project_workflow_steps ?? [];

  return borrowerWorkflowSteps.map((step) => {
    const stored = storedSteps.find((item) => item.step_key === step.key);

    if (stored) {
      return {
        ...step,
        title: stored.label || step.title,
        status: stored.status,
        deliverables: Array.isArray(stored.requirements?.deliverables)
          ? (stored.requirements?.deliverables as string[])
          : step.deliverables,
        channels: stored.delivery_channels?.length ? stored.delivery_channels : step.channels,
      };
    }

    if (project.status === "waiting_documents" && step.key === "needs") {
      return { ...step, status: "blocked" as const };
    }

    if (project.status === "signed" || project.status === "closed") {
      return { ...step, status: "done" as const };
    }

    return step;
  });
}

export function getBorrowerDocumentRequirements(project?: BorrowerProject | null) {
  const storedDocuments = project?.project_document_requirements ?? [];

  return borrowerRequiredDocuments.map((document, index) => {
    const stored = storedDocuments.find((item) => item.document_key === document.key);

    return {
      ...document,
      id: stored?.id,
      status: stored?.status ?? "missing",
      position: stored?.position ?? index + 1,
      source: stored?.source ?? null,
      acceptedSources: stored?.accepted_sources?.length ? stored.accepted_sources : document.acceptedSources,
    };
  });
}

export function getBorrowerProjectProgress(project?: BorrowerProject | null) {
  const workflow = getBorrowerWorkflow(project);
  const done = workflow.filter((step) => step.status === "done").length;

  return {
    done,
    total: workflow.length,
    percent: Math.round((done / workflow.length) * 100),
  };
}
