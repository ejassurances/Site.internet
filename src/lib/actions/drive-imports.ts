"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DriveImportCandidate = {
  id: string;
  google_drive_folder_id: string;
  folder_name: string;
  folder_url: string | null;
  folder_kind: string | null;
  product_code: string | null;
  expected_folder_name: string | null;
  contract_folder_name: string | null;
  parsed_full_name: string | null;
  parsed_email: string | null;
  parsed_phone: string | null;
  first_name: string | null;
  last_name: string | null;
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

export type DriveSyncedDocument = {
  id: string;
  google_drive_file_id: string;
  google_drive_folder_id: string | null;
  file_name: string;
  file_url: string | null;
  client_id: string | null;
  project_id: string | null;
  contract_id: string | null;
  document_rule_code: string | null;
  document_type: string;
  nomenclature_status: string;
  sync_direction: string;
  status: string;
  detected_at: string;
};

export type DriveNomenclatureRule = {
  id: string;
  rule_type: "folder" | "document";
  code: string;
  label: string;
  pattern: string;
  description: string | null;
  required: boolean;
  product_code: string | null;
  applies_to: string[];
};

const productByFolderPrefix: Record<string, string> = {
  ADP: "assurance_emprunteur",
  PREV: "prevoyance",
  TROT: "assurance_trottinette",
};

function extractDriveFolderId(input: string) {
  const value = input.trim();
  const match = value.match(/folders\/([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? value;
}

function extractDriveFileId(input: string) {
  const value = input.trim();
  const match = value.match(/\/d\/([a-zA-Z0-9_-]+)/) ?? value.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? value;
}

function parseFolderName(folderName: string) {
  const normalized = folderName.trim();
  const structured = normalized.match(/^(DOX|CTT)_(ADP|PREV|TROT)_([^_]+)_([^_]+)$/i);

  if (structured) {
    const [, prefix, productCode, firstName, lastName] = structured;
    return {
      fullName: `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
      email: null,
      folderKind: prefix.toUpperCase() === "CTT" ? "contract_folder" : "project_folder",
      productCode: productCode.toUpperCase(),
      expectedFolderName: `DOX_${productCode.toUpperCase()}_${firstName}_${lastName}`,
      contractFolderName: `CTT_${productCode.toUpperCase()}_${firstName}_${lastName}`,
    };
  }

  const parts = folderName
    .replace(/^client\s*[-_]\s*/i, "")
    .split(/\s+-\s+|\s+\|\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const email = parts.find((part) => /\S+@\S+\.\S+/.test(part));

  return {
    fullName: parts[0] ?? folderName.trim(),
    firstName: null,
    lastName: null,
    email: email?.toLowerCase() ?? null,
    folderKind: "client_root",
    productCode: null,
    expectedFolderName: null,
    contractFolderName: null,
  };
}

function parseDocumentName(fileName: string) {
  const baseName = fileName.replace(/\.[^.]+$/, "");
  const cni = baseName.match(/^CNI_([^_]+)_([^_]+)$/i);
  if (cni) {
    return {
      ruleCode: "doc_cni",
      documentType: "piece_identite",
      nomenclatureStatus: "valid",
      firstName: cni[1],
      lastName: cni[2],
    };
  }

  const domicile = baseName.match(/^Domicile_([^_]+)_([^_]+)$/i);
  if (domicile) {
    return {
      ruleCode: "doc_domicile",
      documentType: "justificatif_domicile",
      nomenclatureStatus: "valid",
      firstName: domicile[2],
      lastName: domicile[1],
    };
  }

  return {
    ruleCode: null,
    documentType: "autre",
    nomenclatureStatus: "needs_review",
    firstName: null,
    lastName: null,
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

export async function getDriveNomenclatureRules(): Promise<DriveNomenclatureRule[]> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("drive_nomenclature_rules")
    .select("*")
    .order("rule_type")
    .order("code");

  return (data ?? []) as DriveNomenclatureRule[];
}

export async function getDriveSyncedDocuments(): Promise<DriveSyncedDocument[]> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("drive_synced_documents")
    .select("*")
    .order("detected_at", { ascending: false })
    .limit(80);

  return (data ?? []) as DriveSyncedDocument[];
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
  const productCodeOverride = String(formData.get("productCode") ?? "").trim() || null;

  if (!folderName || !folderInput) {
    return { status: "error", message: "Nom du dossier et identifiant Drive obligatoires." };
  }

  const folderId = extractDriveFolderId(folderInput);
  const parsed = parseFolderName(folderName);
  const productCode = productCodeOverride ?? parsed.productCode;

  const { data: duplicate } = parsed.email
    ? await supabase.from("clients").select("id").eq("email", parsed.email).maybeSingle()
    : { data: null };

  const { error } = await supabase.from("drive_import_candidates").upsert(
    {
      google_drive_folder_id: folderId,
      folder_name: folderName,
      parsed_full_name: parsed.fullName,
      parsed_email: parsed.email,
      first_name: parsed.firstName,
      last_name: parsed.lastName,
      folder_kind: parsed.folderKind,
      product_code: productCode,
      expected_folder_name: parsed.expectedFolderName,
      contract_folder_name: parsed.contractFolderName,
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
    payload: { folder_name: folderName, parsed, product_code: productCode },
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

  let projectId: string | null = null;
  if (clientId && candidate.folder_kind === "project_folder" && candidate.product_code) {
    const { data: project } = await supabase
      .from("projects")
      .insert({
        client_id: clientId,
        assigned_courtier_id: user.id,
        title: candidate.folder_name,
        project_type: productByFolderPrefix[String(candidate.product_code)] ?? "autre",
        status: "waiting_documents",
        workflow_stage: "dossier_drive",
        workflow_data: {
          drive_origin: "drive_to_crm",
          source_folder_name: candidate.folder_name,
          expected_contract_folder_name: candidate.contract_folder_name,
        },
        google_drive_folder_id: candidate.google_drive_folder_id,
      })
      .select("id")
      .maybeSingle();

    projectId = project?.id ?? null;
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
    project_id: projectId,
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
      folder_kind: candidate.folder_kind,
      expected_folder_name: candidate.expected_folder_name,
      contract_folder_name: candidate.contract_folder_name,
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

export async function createDriveDocumentSyncAction(
  _previousState: DriveImportActionState,
  formData: FormData,
): Promise<DriveImportActionState> {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "error", message: "Connexion Supabase indisponible." };

  const fileName = String(formData.get("fileName") ?? "").trim();
  const fileInput = String(formData.get("fileIdOrUrl") ?? "").trim();
  const folderInput = String(formData.get("folderIdOrUrl") ?? "").trim();
  const clientId = String(formData.get("clientId") ?? "").trim() || null;
  const projectId = String(formData.get("projectId") ?? "").trim() || null;

  if (!fileName || !fileInput) {
    return { status: "error", message: "Nom de fichier et ID/URL Drive obligatoires." };
  }

  const parsed = parseDocumentName(fileName);
  const fileId = extractDriveFileId(fileInput);
  const folderId = folderInput ? extractDriveFolderId(folderInput) : null;

  const { error } = await supabase.from("drive_synced_documents").upsert(
    {
      google_drive_file_id: fileId,
      google_drive_folder_id: folderId,
      file_name: fileName,
      client_id: clientId,
      project_id: projectId,
      document_rule_code: parsed.ruleCode,
      document_type: parsed.documentType,
      nomenclature_status: parsed.nomenclatureStatus,
      sync_direction: "drive_to_crm",
      status: parsed.nomenclatureStatus === "valid" ? "linked" : "needs_review",
      linked_at: parsed.nomenclatureStatus === "valid" ? new Date().toISOString() : null,
      raw_metadata: { created_from: "admin_form", actor_id: user.id, parsed },
    },
    { onConflict: "google_drive_file_id" },
  );

  if (error) return { status: "error", message: error.message };

  await supabase.from("drive_sync_events").insert({
    event_type: "drive.file_detected",
    google_drive_folder_id: folderId,
    client_id: clientId,
    project_id: projectId,
    status: "done",
    created_by: user.id,
    payload: { file_name: fileName, file_id: fileId, parsed },
    processed_at: new Date().toISOString(),
  });

  await supabase.from("audit_logs").insert({
    actor_id: user.id,
    action: "drive_document.synced_to_crm",
    target_table: "drive_synced_documents",
    metadata: { file_id: fileId, file_name: fileName, client_id: clientId, project_id: projectId },
  });

  revalidatePath("/admin/vente/ged/import-drive");
  if (clientId) revalidatePath(`/admin/clients/${clientId}`);
  return { status: "success", message: "Document Drive synchronise avec le CRM." };
}

export async function requestContractFolderRenameAction(formData: FormData) {
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

  if (!candidate?.contract_folder_name) return;

  await supabase
    .from("drive_import_candidates")
    .update({
      folder_kind: "contract_folder",
      folder_name: candidate.contract_folder_name,
      expected_folder_name: candidate.contract_folder_name,
      updated_at: new Date().toISOString(),
    })
    .eq("id", candidateId);

  await supabase.from("drive_sync_events").insert({
    event_type: "drive.folder_rename_requested",
    google_drive_folder_id: candidate.google_drive_folder_id,
    client_id: candidate.linked_client_id,
    candidate_id: candidateId,
    status: "queued",
    created_by: user.id,
    payload: {
      from: candidate.folder_name,
      to: candidate.contract_folder_name,
      reason: "project_converted_to_contract",
    },
  });

  revalidatePath("/admin/vente/ged/import-drive");
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
