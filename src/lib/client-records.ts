export type AssessmentClientOption = {
  id: string;
  label: string;
  detail: string;
};

export type NeedsAssessmentSummary = {
  id: string;
  status: string;
  family_situation: string | null;
  legal_status: string | null;
  protection_goal: string | null;
  family_protection_score: number | null;
  created_at: string;
};

export type ClientRecord = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  family_context: string | null;
  notes: string | null;
  created_at: string;
  needs_assessments?: NeedsAssessmentSummary[];
};

export function formatClientName(client: Pick<ClientRecord, "id" | "full_name" | "family_context" | "email">) {
  return client.full_name || client.family_context || client.email || `Client ${client.id.slice(0, 8)}`;
}

export function toClientOption(client: Pick<ClientRecord, "id" | "full_name" | "family_context" | "email" | "phone">) {
  return {
    id: client.id,
    label: formatClientName(client),
    detail: [client.email, client.phone, client.family_context].filter(Boolean).join(" · ") || "Fiche client EJ",
  };
}
