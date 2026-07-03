"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { borrowerRequiredDocuments, borrowerWorkflowSteps, type BorrowerProject } from "@/lib/project-workflow";

export type ProjectActionState = {
  status: "idle" | "success" | "error";
  message: string;
  projectId?: string;
};

export async function getClientProjects(clientId: string): Promise<BorrowerProject[]> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("id, client_id, title, project_type, status, sensitive_context, created_at, updated_at")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return (data ?? []) as BorrowerProject[];
}

export async function createBorrowerProjectAction(
  _previousState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { status: "error", message: "Supabase n'est pas configure pour creer le projet." };
  }

  const clientId = String(formData.get("clientId") ?? "");
  const projectTitle = String(formData.get("projectTitle") ?? "Assurance emprunteur").trim();

  if (!clientId) {
    return { status: "error", message: "Fiche client manquante." };
  }

  const { data: client } = await supabase
    .from("clients")
    .select("id, full_name, email")
    .eq("id", clientId)
    .maybeSingle();

  if (!client) {
    return { status: "error", message: "Client introuvable ou inaccessible." };
  }

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      client_id: clientId,
      assigned_courtier_id: user.id,
      title: projectTitle || `Assurance emprunteur - ${client.full_name ?? client.email ?? "client"}`,
      project_type: "assurance_emprunteur",
      status: "waiting_documents",
      sensitive_context:
        "Recueil emprunteur a completer. Validation bloquee tant que l'offre de pret et le tableau d'amortissement ne sont pas rattaches au projet.",
    })
    .select("id")
    .single();

  if (error || !project) {
    return { status: "error", message: error?.message ?? "Impossible de creer le projet." };
  }

  await supabase.from("project_workflow_steps").insert(
    borrowerWorkflowSteps.map((step, index) => ({
      project_id: project.id,
      step_key: step.key,
      label: step.title,
      status: step.status,
      position: index + 1,
      delivery_channels: step.channels,
      requirements: { deliverables: step.deliverables, description: step.description },
    })),
  );

  await supabase.from("project_document_requirements").insert(
    borrowerRequiredDocuments.map((document, index) => ({
      project_id: project.id,
      document_key: document.key,
      label: document.label,
      required_for_validation: document.requiredForValidation,
      status: "missing",
      position: index + 1,
      accepted_sources: document.acceptedSources,
    })),
  );

  await supabase.from("audit_logs").insert({
    actor_id: user.id,
    action: "project.created_from_client_file",
    target_table: "projects",
    target_id: project.id,
    metadata: {
      client_id: clientId,
      project_type: "assurance_emprunteur",
      initial_status: "waiting_documents",
    },
  });

  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/admin/clients");
  revalidatePath("/admin/emprunteur");

  return {
    status: "success",
    message: "Projet assurance emprunteur cree et rattache a la fiche client.",
    projectId: project.id,
  };
}
