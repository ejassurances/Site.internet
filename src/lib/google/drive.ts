// Helpers Google Drive côté application (server-only).
// Réutilise les identifiants OAuth déjà utilisés par /api/upload-drive
// et /api/drive-files : GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN.

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_DRIVE_API = "https://www.googleapis.com/drive/v3";

export function driveConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN,
  );
}

/** Dossier racine où créer les dossiers partenaires (fallback : racine du Drive). */
export function partenairesRootFolderId(): string | undefined {
  return (
    process.env.GOOGLE_DRIVE_PARTENAIRES_FOLDER_ID ||
    process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID ||
    undefined
  );
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

export async function createDriveFolder(
  token: string,
  name: string,
  parentId?: string,
): Promise<string> {
  const res = await fetch(`${GOOGLE_DRIVE_API}/files?fields=id`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      mimeType: "application/vnd.google-apps.folder",
      ...(parentId ? { parents: [parentId] } : {}),
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || `Échec création dossier "${name}"`);
  }
  return data.id as string;
}

/**
 * Crée le dossier partenaire et ses sous-dossiers.
 * Retourne l'ID du dossier principal.
 */
export const PARTENAIRE_SUBFOLDERS = [
  "Convention signée",
  "Contrats d'assurance distribués",
  "Attestation RCPro",
  "Attestation ORIAS",
  "Autres documents",
] as const;

export async function createPartenaireDriveTree(partnerName: string): Promise<string> {
  const token = await getDriveToken();
  const root = partenairesRootFolderId();
  const mainId = await createDriveFolder(token, `Partenaire — ${partnerName}`, root);

  for (const sub of PARTENAIRE_SUBFOLDERS) {
    await createDriveFolder(token, sub, mainId);
  }

  return mainId;
}
