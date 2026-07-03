// Edge Function : create-drive-folder v12
// Déclenchée par pg_net après INSERT sur :
//   - public.clients   → dossier client standard (KYC / Contrats / Correspondances / Analyse DDA)
//   - public.projects  → sous-dossier projet dans le dossier client
//   - public.mandataires → dossier conformité mandataire (Carte d'identité / RCPro / ORIAS …)
// Appelée manuellement (POST { table: 'cabinet' }) pour initialiser le dossier conformité cabinet.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ClientRecord {
  id: string;
  full_name?: string;
  email?: string;
}

interface ProjectRecord {
  id: string;
  client_id?: string;
  title?: string;
  project_type?: string;
}

interface MandataireRecord {
  id: string;
  profile_id?: string;
  company_name?: string;
}

type TriggerPayload =
  | { table: 'clients';     record: ClientRecord }
  | { table: 'projects';    record: ProjectRecord }
  | { table: 'mandataires'; record: MandataireRecord }
  | { table: 'cabinet';     record?: never };

// ─── Constantes ───────────────────────────────────────────────────────────────

const GOOGLE_TOKEN_URL   = 'https://oauth2.googleapis.com/token';
const GOOGLE_DRIVE_API   = 'https://www.googleapis.com/drive/v3';

const CLIENT_SUBFOLDERS    = ['KYC', 'Contrats', 'Correspondances', 'Analyse DDA'];
const PROJECT_SUBFOLDERS   = ['Offres', 'Documents signés', 'Correspondances'];
const MANDATAIRE_SUBFOLDERS = [
  "Carte d'identité",
  'Attestation RCPro',
  'Attestation ORIAS',
  'Convention de mandat',
  'Rapport DDA',
  'Autres',
];
const CABINET_SUBFOLDERS = [
  "Carte d'identité dirigeant",
  'Attestation RCPro',
  'Attestation ORIAS',
  'Extrait Kbis',
  'Rapport DDA',
  'Autres',
];

// ─── Helpers OAuth Google ─────────────────────────────────────────────────────

async function getAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string,
): Promise<string> {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id:     clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type:    'refresh_token',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Échec refresh token Google OAuth : ${err}`);
  }
  const data = await res.json();
  return data.access_token as string;
}

// ─── Helpers Google Drive API ─────────────────────────────────────────────────

async function createFolder(
  accessToken: string,
  name: string,
  parentId: string,
): Promise<string> {
  const res = await fetch(`${GOOGLE_DRIVE_API}/files`, {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents:  [parentId],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Échec création dossier Drive "${name}" : ${err}`);
  }
  const data = await res.json();
  return data.id as string;
}

/** Cherche un sous-dossier par nom dans un parent; le crée s'il n'existe pas. */
async function findOrCreateFolder(
  accessToken: string,
  name: string,
  parentId: string,
): Promise<string> {
  const q = encodeURIComponent(
    `name='${name}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
  );
  const res = await fetch(`${GOOGLE_DRIVE_API}/files?q=${q}&fields=files(id,name)`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.ok) {
    const data = await res.json();
    if (data.files?.length > 0) return data.files[0].id as string;
  }
  return createFolder(accessToken, name, parentId);
}

async function setFolderPermission(
  accessToken: string,
  folderId: string,
  email: string,
): Promise<void> {
  await fetch(`${GOOGLE_DRIVE_API}/files/${folderId}/permissions`, {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role: 'reader', type: 'user', emailAddress: email }),
  });
  // Erreurs ignorées (email invalide, etc.)
}

// ─── Handler principal ────────────────────────────────────────────────────────

serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const payload: TriggerPayload = await req.json();
    const { table } = payload;

    console.log(`[create-drive-folder] table=${table}`, payload.record ? `id=${payload.record.id}` : '(cabinet)');

    // ── Variables d'environnement ───────────────────────────────────────────
    const clientId       = Deno.env.get('GOOGLE_CLIENT_ID')!;
    const clientSecret   = Deno.env.get('GOOGLE_CLIENT_SECRET')!;
    const refreshToken   = Deno.env.get('GOOGLE_REFRESH_TOKEN')!;
    const rootFolderId   = Deno.env.get('GOOGLE_DRIVE_ROOT_FOLDER_ID')!;
    const supabaseUrl    = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey    = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!clientId || !clientSecret || !refreshToken || !rootFolderId) {
      throw new Error('Variables Google OAuth manquantes');
    }
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Variables Supabase manquantes');
    }

    const accessToken = await getAccessToken(clientId, clientSecret, refreshToken);
    const supabase    = createClient(supabaseUrl, supabaseKey);

    let mainFolderId: string;
    let folderName:   string;

    // ══════════════════════════════════════════════════════════════════════════
    if (table === 'clients') {
    // ══════════════════════════════════════════════════════════════════════════
      const client = payload.record as ClientRecord;
      folderName   = client.full_name || `Client-${client.id.slice(0, 8)}`;

      const clientsRootId = await findOrCreateFolder(accessToken, 'Clients', rootFolderId);
      mainFolderId = await createFolder(accessToken, folderName, clientsRootId);

      for (const sub of CLIENT_SUBFOLDERS) {
        await createFolder(accessToken, sub, mainFolderId);
      }

      if (client.email) {
        await setFolderPermission(accessToken, mainFolderId, client.email);
      }

      const { error } = await supabase
        .from('clients')
        .update({ google_drive_folder_id: mainFolderId })
        .eq('id', client.id);

      if (error) throw new Error(`Erreur Supabase update clients : ${error.message}`);

      console.log(`[create-drive-folder] ✅ Client ${client.id} → ${mainFolderId}`);

    // ══════════════════════════════════════════════════════════════════════════
    } else if (table === 'projects') {
    // ══════════════════════════════════════════════════════════════════════════
      const project  = payload.record as ProjectRecord;
      const title    = project.title        || `Projet-${project.id.slice(0, 8)}`;
      const type     = project.project_type || 'Divers';
      folderName     = `${type} — ${title}`;

      let parentFolderId = rootFolderId;
      if (project.client_id) {
        const { data } = await supabase
          .from('clients')
          .select('google_drive_folder_id')
          .eq('id', project.client_id)
          .single();
        if (data?.google_drive_folder_id) {
          parentFolderId = data.google_drive_folder_id;
        }
      }

      mainFolderId = await createFolder(accessToken, folderName, parentFolderId);
      for (const sub of PROJECT_SUBFOLDERS) {
        await createFolder(accessToken, sub, mainFolderId);
      }

      const { error } = await supabase
        .from*'projects')
        .update({ google_drive_folder_id: mainFolderId })
        .eq('id', project.id);

      if (error) throw new Error(`Erreur Supabase update projects : ${error.message}`);

      console.log(`[create-drive-folder] ✅ Projet ${project.id} → ${mainFolderId}`);

    // ══════════════════════════════════════════════════════════════════════════
    } else if (table === 'mandataires') {
    // ══════════════════════════════════════════════════════════════════════════
      const mandataire = payload.record as MandataireRecord;

      // Récupérer le nom depuis profiles
      let mandataireName = mandataire.company_name;
      if (!mandataireName && mandataire.profile_id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', mandataire.profile_id)
          .single();
        if (profile) {
          mandataireName = [profile.first_name, profile.last_name].filter(Boolean).join(' ').trim();
        }
      }
      folderName = mandataireName || `Mandataire-${mandataire.id.slice(0, 8)}`;

      // Trouver/créer l'arborescence Conformité > Mandataires
      const conformiteRootId   = await findOrCreateFolder(accessToken, 'Conformité', rootFolderId);
      const mandatairesRootId  = await findOrCreateFolder(accessToken, 'Mandataires', conformiteRootId);

      // Créer le dossier individuel du mandataire
      mainFolderId = await createFolder(accessToken, folderName, mandatairesRootId);

      // Créer les sous-dossiers conformité
      for (const sub of MANDATAIRE_SUBFOLDERS) {
        await createFolder(accessToken, sub, mainFolderId);
      }

      // Mettre à jour Supabase
      const { error } = await supabase
        .from('mandataires')
        .update({ google_drive_folder_id: mainFolderId })
        .eq('id', mandataire.id);

      if (error) throw new Error(`Erreur Supabase update mandataires : ${error.message}`);

      console.log(`[create-drive-folder] ✅ Mandataire ${mandataire.id} → ${mainFolderId}`);

    // ══════════════════════════════════════════════════════════════════════════
    } else if (table === 'cabinet') {
    // ══════════════════════════════════════════════════════════════════════════
      // Appelé manuellement une fois pour initialiser le dossier cabinet
      folderName = 'EJ Assurances';

      const conformiteRootId = await findOrCreateFolder(accessToken, 'Conformité', rootFolderId);
      const cabinetRootId    = await findOrCreateFolder(accessToken, 'Cabinet', conformiteRootId);

      // Créer (ou réutiliser) le dossier principal cabinet
      mainFolderId = await findOrCreateFolder(accessToken, folderName, cabinetRootId);

      for (const sub of CABINET_SUBFOLDERS) {
        await findOrCreateFolder(accessToken, sub, mainFolderId);
      }

      // Mettre à jour cabinet_info
      const { error } = await supabase
        .from('cabinet_info')
        .update({ google_drive_folder_conformite_id: mainFolderId, updated_at: new Date().toISOString() })
        .neq('id', '00000000-0000-0000-0000-000000000000'); // update all rows (1 row)

      if (error) throw new Error(`Erreur Supabase update cabinet_info : ${error.message}`);

      console.log(`[create-drive-folder] ✅ Cabinet → ${mainFolderId}`);

    // ══════════════════════════════════════════════════════════════════════════
    } else {
      return new Response(
        JSON.stringify({ error: `Table non supportée : ${(payload as any).table}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({
        success:     true,
        table,
        record_id:   (payload.record as any)?.id,
        folder_id:   mainFolderId,
        folder_name: folderName,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[create-drive-folder] ❌', message);
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});
