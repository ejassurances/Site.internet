"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DriveImportCandidate = {
  id: string;
  google_drive_folder_id: string;
  folder_name: string;
  folder_url: string | null;
  parsed_full_name: string | null;
  parsed_email: string | null;
  parsed_phone: string | null;
  proposed_contact_type: string;
  status: string;
  subfolders_status: string;
  detected_source: string;
  duplicate_client_id: string | null;
  linked_client_id: string | null;
  detected_at: string;
  notes: string | null;
};

export type DriveImportActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

function extractDriveFolderId(input: string) {
  const value = input.trim();
  const match = value.match(/folders\/([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? value;
}

function parseFolderName(folderName: string) {
  const parts = folderName
    .replace(/^client\s*[-_]\s*/i, "")
    .split(/\s+-\s+|\s+\|\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const email = parts.find((part) => /\S+@\S+\.\S+/.test(part));

  return {
    fullName: parts[0] ?? folderName.trim(),
    email: email?.toLowerCase() ?? null,
  };
}

export async function getDriveImportCandidates(): Promise<DriveImportCandidate[]> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("drive_import_candidates")
    .select("*")
    .order("detected_at", { ascending: false })
    .limit(50);

  return (data ?? []) as DriveImportCandidate[];
}

export async function createDriveImportCandidateAction(
  _previousState: DriveImportActionState,
  formData: FormData,
): Promise<DriveImportActionState> {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "error", message: "Connexion Supabase indisponible." };

  const folderName = String(formData.get("folderName") ?? "").trim();
  const folderInput = String(formData.get("folderIdOrUrl") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!folderName || !folderInput) {
    return { status: "error", message: "Nom du dossier et identifiant Drive obligatoires." };
  }

  const folderId = extractDriveFolderId(folderInput);
  const parsed = parseFolderName(folderName);

  const { data: duplicate } = parsed.email
    ? await supabase.from("clients").select("id").eq("email", parsed.email).maybeSingle()
    : { data: null };

  const { error } = await supabase.from("drive_import_candidates").upsert(
    {
      google_drive_folder_id: folderId,
      folder_name: folderName,
      parsed_full_name: parsed.fullName,
      parsed_email: parsed.email,
      detected_source: "manual",
      status: duplicate?.id ? "duplicate" : "pending",
      duplicate_client_id: duplicate?.id ?? null,
      notes: notes || null,
      raw_metadata: { created_from: "admin_form", actor_id: user.id },
    },
    { onConflict: "google_drive_folder_id" },
  );

  if (error) {
    return { status: "error", message: error.message };
  }

  await supabase.from("drive_sync_events").insert({
    event_type: "drive.folder_detected",
    google_drive_folder_id: folderId,
    status: "queued",
    created_by: user.id,
    payload: { folder_name: folderName, parsed },
  });

  revalidatePath("/admin/vente/ged/import-drive");
  return { status: "success", message: "Dossier Drive ajoute a la file de validation CRM." };
}

export async function approveDriveCandidateAction(formData: FormData) {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const candidateId = String(formData.get("candidateId") ?? "");
  if (!candidateId) return;

  const { data: candidate } = await supabase
    .from("drive_import_candidates")
    .select("*")
    .eq("id", candidateId)
    .maybeSingle();

  if (!candidate) return;

  let clientId = candidate.duplicate_client_id as string | null;

  if (!clientId) {
    const { data: client } = await supabase
      .from("clients")
      .insert({
        full_name: candidate.parsed_full_name || candidate.folder_name,
        email: candidate.parsed_email || null,
        phone: candidate.parsed_phone || null,
        contact_type: candidate.proposed_contact_type || "prospect",
        statut_client: "prospect",
        source_acquisition: "Import dossier Google Drive",
        assigned_courtier_id: user.id,
        google_drive_folder_id: candidate.google_drive_folder_id,
        notes: candidate.notes || "Fiche creee depuis un dossier Google Drive detecte.",
      })
      .select("id")
      .single();

    clientId = client?.id ?? null;
  } else {
    await supabase
      .from("clients")
      .update({ google_drive_folder_id: candidate.google_drive_folder_id })
      .eq("id", clientId);
  }

  await supabase
    .from("drive_import_candidates")
    .update({
      status: clientId ? "linked" : "needs_review",
      linked_client_id: clientId,
      subfolders_status: "requested",
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", candidateId);

  await supabase.from("drive_sync_events").insert({
    event_type: "drive.subfolders_requested",
    google_drive_folder_id: candidate.google_drive_folder_id,
    client_id: clientId,
    candidate_id: candidateId,
    status: "queued",
    created_by: user.id,
    payload: {
      subfolders: [
        "01 - Identite KYC",
        "02 - Recueil des besoins",
        "03 - Projets et devis",
        "04 - Contrats",
        "05 - Classeur ACPR",
        "06 - Echanges",
      ],
    },
  });

  await supabase.from("audit_logs").insert({
    actor_id: user.id,
    action: "drive_import_candidate.approved",
    target_table: "clients",
    target_id: clientId,
    metadata: { candidate_id: candidateId, drive_folder_id: candidate.google_drive_folder_id },
  });

  revalidatePath("/admin/vente/ged/import-drive");
  if (clientId) revalidatePath(`/admin/clients/${clientId}`);
}

export async function rejectDriveCandidateAction(formData: FormData) {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const candidateId = String(formData.get("candidateId") ?? "");
  if (!candidateId) return;

  await supabase
    .from("drive_import_candidates")
    .update({
      status: "rejected",
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", candidateId);

  await supabase.from("audit_logs").insert({
    actor_id: user.id,
    action: "drive_import_candidate.rejected",
    target_table: "drive_import_candidates",
    target_id: candidateId,
  });

  revalidatePath("/admin/vente/ged/import-drive");
}
