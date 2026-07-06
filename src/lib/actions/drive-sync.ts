"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  driveConfigured,
  driveRootFolderId,
  getDriveToken,
  createFolderTree,
  findOrCreateFolder,
  createDriveFolder,
  CLIENT_SUBFOLDERS,
  PARTNER_SUBFOLDERS,
  PARTNER_PRODUCT_SUBFOLDERS,
} from "@/lib/google/drive";

// Nombre max d'éléments traités par exécution (évite les timeouts de la fonction serveur).
const BATCH = { clients: 15, partners: 15, products: 20 };

export type DriveSyncStatus = {
  configured: boolean;
  clientsMissing: number;
  partnersMissing: number;
  productsMissing: number;
};

export async function getDriveSyncStatus(): Promise<DriveSyncStatus> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { configured: false, clientsMissing: 0, partnersMissing: 0, productsMissing: 0 };
  }

  const count = async (table: string) => {
    const { count } = await supabase
      .from(table)
      .select("id", { count: "exact", head: true })
      .is("google_drive_folder_id", null);
    return count ?? 0;
  };

  const [clientsMissing, partnersMissing, productsMissing] = await Promise.all([
    count("clients"),
    count("partner_companies"),
    count("partner_distributed_contracts"),
  ]);

  return { configured: driveConfigured(), clientsMissing, partnersMissing, productsMissing };
}

export type DriveSyncActionState = {
  status: "idle" | "success" | "error";
  message: string;
  created?: { clients: number; partners: number; products: number };
  remaining?: { clients: number; partners: number; products: number };
};

export async function syncDriveAction(
  _previousState: DriveSyncActionState,
  _formData: FormData,
): Promise<DriveSyncActionState> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Supabase n'est pas configuré." };
  }
  if (!driveConfigured()) {
    return {
      status: "error",
      message:
        "Identifiants Google Drive absents. Configurez GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET et GOOGLE_REFRESH_TOKEN (et idéalement GOOGLE_DRIVE_ROOT_FOLDER_ID) dans les variables d'environnement Vercel.",
    };
  }

  const root = driveRootFolderId();
  let token: string;
  try {
    token = await getDriveToken();
  } catch (err) {
    return { status: "error", message: `Connexion Google échouée : ${String(err)}` };
  }

  const created = { clients: 0, partners: 0, products: 0 };
  const errors: string[] = [];

  // ── 1. Clients ────────────────────────────────────────────────────────────
  const { data: clients } = await supabase
    .from("clients")
    .select("id, full_name")
    .is("google_drive_folder_id", null)
    .limit(BATCH.clients);

  for (const client of clients ?? []) {
    try {
      const name = (client.full_name as string) || `Client ${String(client.id).slice(0, 8)}`;
      const { mainId } = await createFolderTree(token, name, root, CLIENT_SUBFOLDERS);
      await supabase.from("clients").update({ google_drive_folder_id: mainId }).eq("id", client.id);
      created.clients++;
    } catch (err) {
      errors.push(`Client ${client.id} : ${String(err)}`);
    }
  }

  // ── 2. Partenaires ────────────────────────────────────────────────────────
  const { data: partners } = await supabase
    .from("partner_companies")
    .select("id, name")
    .is("google_drive_folder_id", null)
    .limit(BATCH.partners);

  for (const partner of partners ?? []) {
    try {
      const name = (partner.name as string) || `Partenaire ${String(partner.id).slice(0, 8)}`;
      const { mainId, subIds } = await createFolderTree(token, name, root, PARTNER_SUBFOLDERS);
      await supabase
        .from("partner_companies")
        .update({ google_drive_folder_id: mainId, drive_products_folder_id: subIds["Produits"] ?? null })
        .eq("id", partner.id);
      created.partners++;
    } catch (err) {
      errors.push(`Partenaire ${partner.id} : ${String(err)}`);
    }
  }

  // ── 3. Produits distribués (contient le sous-dossier « CG ») ───────────────
  // Uniquement ceux dont le partenaire a déjà son dossier « Produits ».
  const { data: products } = await supabase
    .from("partner_distributed_contracts")
    .select("id, contract_name, partner_id, partner:partner_companies(drive_products_folder_id)")
    .is("google_drive_folder_id", null)
    .limit(BATCH.products);

  for (const product of (products as Array<{
    id: string;
    contract_name: string | null;
    partner_id: string;
    partner: { drive_products_folder_id: string | null }[] | null;
  }> | null) ?? []) {
    const produitsFolderId = product.partner?.[0]?.drive_products_folder_id;
    if (!produitsFolderId) continue; // le partenaire sera synchronisé d'abord
    try {
      const name = product.contract_name || `Produit ${product.id.slice(0, 8)}`;
      const mainId = await createDriveFolder(token, name, produitsFolderId);
      for (const sub of PARTNER_PRODUCT_SUBFOLDERS) {
        await findOrCreateFolder(token, sub, mainId);
      }
      await supabase
        .from("partner_distributed_contracts")
        .update({ google_drive_folder_id: mainId })
        .eq("id", product.id);
      created.products++;
    } catch (err) {
      errors.push(`Produit ${product.id} : ${String(err)}`);
    }
  }

  const status = await getDriveSyncStatus();
  const remaining = {
    clients: status.clientsMissing,
    partners: status.partnersMissing,
    products: status.productsMissing,
  };

  revalidatePath("/admin/vente/ged/sync");
  revalidatePath("/admin/partenaires");

  const total = created.clients + created.partners + created.products;
  const remainingTotal = remaining.clients + remaining.partners + remaining.products;

  if (total === 0 && errors.length > 0) {
    return { status: "error", message: `Aucun dossier créé. ${errors[0]}`, created, remaining };
  }

  const parts = [
    `${created.clients} client(s)`,
    `${created.partners} partenaire(s)`,
    `${created.products} produit(s)`,
  ];
  let message = `Synchronisation effectuée : ${parts.join(", ")} créés dans le Drive.`;
  if (remainingTotal > 0) {
    message += ` Il reste ${remainingTotal} élément(s) à synchroniser — relancez la synchronisation.`;
  }
  if (errors.length > 0) {
    message += ` (${errors.length} erreur(s), ex. : ${errors[0]})`;
  }

  return { status: "success", message, created, remaining };
}
