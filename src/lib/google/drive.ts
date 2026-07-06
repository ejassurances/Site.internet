// Helpers Google Drive côté application (server-only).
// Réutilise les identifiants OAuth déjà utilisés par /api/upload-drive et
// /api/drive-files : GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN.

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_DRIVE_API = "https://www.googleapis.com/drive/v3";
const FOLDER_MIME = "application/vnd.google-apps.folder";

export function driveConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN,
  );
}

/** Dossier racine où sont créés les dossiers (fallback : racine du Drive). */
export function driveRootFolderId(): string | undefined {
  return process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID || undefined;
}

export async function getDriveToken(): Promise<string> {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(`OAuth Google : ${data.error_description || data.error || res.status}`);
  }
  return data.access_token as string;
}

export async function createDriveFolder(token: string, name: string, parentId?: string): Promise<string> {
  const res = await fetch(`${GOOGLE_DRIVE_API}/files?fields=id`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      mimeType: FOLDER_MIME,
      ...(parentId ? { parents: [parentId] } : {}),
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || `Échec création dossier "${name}"`);
  return data.id as string;
}

/** Cherche un sous-dossier par nom dans un parent ; le crée s'il n'existe pas. */
export async function findOrCreateFolder(token: string, name: string, parentId: string): Promise<string> {
  const escaped = name.replace(/'/g, "\\'");
  const q = encodeURIComponent(
    `name = '${escaped}' and mimeType = '${FOLDER_MIME}' and '${parentId}' in parents and trashed = false`,
  );
  const res = await fetch(`${GOOGLE_DRIVE_API}/files?q=${q}&fields=files(id,name)`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (res.ok && data.files && data.files.length > 0) {
    return data.files[0].id as string;
  }
  return createDriveFolder(token, name, parentId);
}

/** Crée un dossier + ses sous-dossiers. Retourne l'ID du dossier principal et de chaque sous-dossier. */
export async function createFolderTree(
  token: string,
  name: string,
  parentId: string | undefined,
  subfolders: readonly string[],
): Promise<{ mainId: string; subIds: Record<string, string> }> {
  const mainId = await createDriveFolder(token, name, parentId);
  const subIds: Record<string, string> = {};
  for (const sub of subfolders) {
    subIds[sub] = await createDriveFolder(token, sub, mainId);
  }
  return { mainId, subIds };
}

// Structures de dossiers (alignées sur l'edge function create-drive-folder v12).
export const CLIENT_SUBFOLDERS = ["KYC", "Contrats", "Correspondances", "Analyse DDA"] as const;
export const PARTNER_SUBFOLDERS = ["Produits", "Conventions", "Commissions", "API", "Contacts", "Archives"] as const;
export const PARTNER_PRODUCT_SUBFOLDERS = [
  "CG",
  "IPID",
  "Fiche produit",
  "Tarifs commissions",
  "Souscription",
  "Archives",
] as const;
