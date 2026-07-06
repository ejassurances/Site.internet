"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ScooterNeed = {
  id: string;
  client_id: string | null;
  status: string;
  owner_full_name: string | null;
  owner_email: string | null;
  vehicle_brand: string | null;
  vehicle_model: string | null;
  max_speed_limited_25: boolean | null;
  used_by_household_members: boolean | null;
  extension_recommended: boolean;
  usage_type: string | null;
  created_at: string;
};

export type ScooterActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function getScooterNeeds(): Promise<ScooterNeed[]> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("scooter_insurance_needs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  return (data ?? []) as ScooterNeed[];
}

export async function createScooterNeedAction(
  _previousState: ScooterActionState,
  formData: FormData,
): Promise<ScooterActionState> {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "error", message: "Connexion Supabase indisponible." };

  const maxSpeedValue = String(formData.get("maxSpeedLimited25") ?? "");
  const householdValue = String(formData.get("usedByHouseholdMembers") ?? "");
  const ownerFullName = String(formData.get("ownerFullName") ?? "").trim();
  const extensionRecommended = householdValue === "yes";
  const clientId = String(formData.get("clientId") ?? "") || null;

  if (!ownerFullName) {
    return { status: "error", message: "Le nom de l'assure est obligatoire." };
  }

  if (!maxSpeedValue || !householdValue) {
    return { status: "error", message: "Les questions vitesse 25 km/h et utilisateurs du foyer sont obligatoires." };
  }

  const status = maxSpeedValue === "no" ? "needs_review" : extensionRecommended ? "extension_recommended" : "ready_for_quote";

  const { data: project } = clientId
    ? await supabase
        .from("projects")
        .insert({
          client_id: clientId,
          assigned_courtier_id: user.id,
          title: `Assurance trottinette - ${ownerFullName}`,
          project_type: "assurance_trottinette",
          status: status === "ready_for_quote" ? "in_progress" : "waiting_documents",
          sensitive_context:
            "Recueil trottinette : verifier limitation 25 km/h et extension si utilisation par d'autres membres du foyer fiscal.",
          workflow_stage: "recueil_besoins",
          workflow_data: {
            max_speed_limited_25: maxSpeedValue === "yes",
            used_by_household_members: householdValue === "yes",
            extension_recommended: extensionRecommended,
          },
        })
        .select("id")
        .maybeSingle()
    : { data: null };

  const { error } = await supabase.from("scooter_insurance_needs").insert({
    client_id: clientId,
    project_id: project?.id ?? null,
    status,
    owner_full_name: ownerFullName,
    owner_email: String(formData.get("ownerEmail") ?? "").trim() || null,
    vehicle_brand: String(formData.get("vehicleBrand") ?? "").trim() || null,
    vehicle_model: String(formData.get("vehicleModel") ?? "").trim() || null,
    serial_number: String(formData.get("serialNumber") ?? "").trim() || null,
    purchase_date: String(formData.get("purchaseDate") ?? "") || null,
    purchase_price: Number(String(formData.get("purchasePrice") ?? "").replace(",", ".")) || null,
    max_speed_limited_25: maxSpeedValue === "yes",
    used_by_household_members: householdValue === "yes",
    household_users_details: String(formData.get("householdUsersDetails") ?? "").trim() || null,
    extension_recommended: extensionRecommended,
    usage_type: String(formData.get("usageType") ?? "") || null,
    storage_location: String(formData.get("storageLocation") ?? "").trim() || null,
    desired_effective_date: String(formData.get("desiredEffectiveDate") ?? "") || null,
    advisor_notes: String(formData.get("advisorNotes") ?? "").trim() || null,
    collected_by: user.id,
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  await supabase.from("audit_logs").insert({
    actor_id: user.id,
    action: "scooter_needs.created",
    target_table: "scooter_insurance_needs",
    metadata: { project_id: project?.id ?? null, extension_recommended: extensionRecommended, status },
  });

  revalidatePath("/admin/workflows/trottinette");
  return {
    status: "success",
    message: extensionRecommended
      ? "Recueil enregistre. Extension foyer fiscal recommandee."
      : "Recueil enregistre. Le dossier peut passer en devis.",
  };
}
