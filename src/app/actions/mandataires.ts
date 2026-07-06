"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createPartenaireDriveTree, driveConfigured } from "@/lib/google/drive";

export type MandataireActionState = {
  status: "idle" | "success" | "error";
  message: string;
  mandataireId?: string;
};

export async function createMandataireAction(
  _previousState: MandataireActionState,
  formData: FormData,
): Promise<MandataireActionState> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { status: "error", message: "Supabase n'est pas encore configuré." };
  }

  const companyName = String(formData.get("company_name") ?? "").trim();
  if (!companyName) {
    return { status: "error", message: "Le nom du partenaire est obligatoire." };
  }

  const { data: mandataire, error } = await supabase
    .from("mandataires")
    .insert({
      company_name: companyName,
      contact_name: String(formData.get("contact_name") ?? "").trim() || null,
      contact_email: String(formData.get("contact_email") ?? "").trim() || null,
      phone: String(formData.get("phone") ?? "").trim() || null,
      orias_number: String(formData.get("orias_number") ?? "").trim() || null,
      partner_type: String(formData.get("partner_type") ?? "mandataire").trim() || "mandataire",
      notes: String(formData.get("notes") ?? "").trim() || null,
      convention_status: "draft",
    })
    .select("id")
    .single();

  if (error || !mandataire) {
    return { status: "error", message: error?.message ?? "Impossible de créer la fiche partenaire." };
  }

  // Création du dossier Drive dédié (best-effort : n'empêche pas la création de la fiche).
  let driveMessage = "";
  if (driveConfigured()) {
    try {
      const folderId = await createPartenaireDriveTree(companyName);
      await supabase.from("mandataires").update({ google_drive_folder_id: folderId }).eq("id", mandataire.id);
      driveMessage = " Dossier Drive créé (convention signée, contrats distribués…).";
    } catch (err) {
      driveMessage = ` Fiche créée, mais le dossier Drive n'a pas pu être créé : ${String(err)}`;
    }
  } else {
    driveMessage = " (Dossier Drive non créé : identifiants Google non configurés.)";
  }

  revalidatePath("/admin/partenaires");
  revalidatePath(`/admin/partenaires/${mandataire.id}`);

  return {
    status: "success",
    message: `Fiche partenaire créée.${driveMessage}`,
    mandataireId: mandataire.id,
  };
}

/** Recrée le dossier Drive d'un partenaire existant (si absent). */
export async function ensureMandataireDriveAction(
  _previousState: MandataireActionState,
  formData: FormData,
): Promise<MandataireActionState> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Supabase n'est pas encore configuré." };
  }

  const mandataireId = String(formData.get("mandataireId") ?? "");
  if (!mandataireId) {
    return { status: "error", message: "Partenaire introuvable." };
  }

  const { data: mandataire } = await supabase
    .from("mandataires")
    .select("id, company_name, google_drive_folder_id")
    .eq("id", mandataireId)
    .maybeSingle();

  if (!mandataire) {
    return { status: "error", message: "Partenaire introuvable." };
  }
  if (mandataire.google_drive_folder_id) {
    return { status: "success", message: "Le dossier Drive existe déjà.", mandataireId };
  }
  if (!driveConfigured()) {
    return { status: "error", message: "Identifiants Google Drive non configurés." };
  }

  try {
    const folderId = await createPartenaireDriveTree(mandataire.company_name ?? "Partenaire");
    await supabase.from("mandataires").update({ google_drive_folder_id: folderId }).eq("id", mandataireId);
    revalidatePath(`/admin/partenaires/${mandataireId}`);
    return { status: "success", message: "Dossier Drive créé.", mandataireId };
  } catch (err) {
    return { status: "error", message: `Échec de création du dossier Drive : ${String(err)}` };
  }
}
