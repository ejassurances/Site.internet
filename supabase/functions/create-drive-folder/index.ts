// Edge Function : create-drive-folder
// Déclenchée par le trigger PostgreSQL via pg_net après INSERT sur public.clients ou public.projects
// Crée automatiquement un dossier Google Drive structuré (KYC / Contrats / Correspondances / Analyse DDA)
// et met à jour la colonne google_drive_folder_id dans Supabase.

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

interface TriggerPayload {
  table: 'clients' | 'projects';
  record: ClientRecord | ProjectRecord;
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_DRIVE_API = 'https://www.googleapis.com/drive/v3';

// Sous-dossiers créés pour chaque client
const CLIENT_SUBFOLDERS = ['KYC', 'Contrats', 'Correspondances', 'Analyse DDA'];

// Sous-dossiers créés pour chaque projet
const PROJECT_SUBFOLDERS = ['Offres', 'Documents signés', 'Correspondances'];

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
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
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
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Échec création dossier Drive "${name}" : ${err}`);
  }

  const data = await res.json();
  return data.id as string;
}

async function setFolderPermission(
  accessToken: string,
  folderId: string,
  email: string,
): Promise<void> {
  // Partage en lecture seule avec le client (optionnel)
  await fetch(`${GOOGLE_DRIVE_API}/files/${folderId}/permissions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role: 'reader',
      type: 'user',
      emailAddress: email,
    }),
  });
  // On ignore les erreurs de permission (email invalide, etc.)
}

// ─── Handler principal ────────────────────────────────────────────────────────

serve(async (req: Request) => {
  // Vérification méthode
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // ── Lecture du payload ──────────────────────────────────────────────────
    const payload: TriggerPayload = await req.json();
    const { table, record } = payload;

    console.log(`[create-drive-folder] Déclenchement pour table=${table}, id=${record.id}`);

    // ── Variables d'environnement ───────────────────────────────────────────
    const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');
    const refreshToken = Deno.env.get('GOOGLE_REFRESH_TOKEN');
    const rootFolderId = Deno.env.get('GOOGLE_DRIVE_ROOT_FOLDER_ID');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!clientId || !clientSecret || !refreshToken || !rootFolderId) {
      throw new Error('Variables Google OAuth manquantes (CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, ROOT_FOLDER_ID)');
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Variables Supabase manquantes (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)');
    }

    // ── Obtenir le token d'accès Google ────────────────────────────────────
    const accessToken = await getAccessToken(clientId, clientSecret, refreshToken);
    console.log('[create-drive-folder] Token Google obtenu');

    // ── Initialiser le client Supabase (service role) ──────────────────────
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let mainFolderId: string;
    let folderName: string;

    if (table === 'clients') {
      // ── Cas CLIENT ──────────────────────────────────────────────────────
      const client = record as ClientRecord;
      const clientName = client.full_name || `Client-${client.id.slice(0, 8)}`;
      folderName = `${clientName}`;

      // Créer le dossier principal sous Clients/
      // D'abord vérifier/créer le sous-dossier "Clients" dans le root
      let clientsRootId = rootFolderId;
      try {
        // Chercher si le dossier "Clients" existe déjà
        const searchRes = await fetch(
          `${GOOGLE_DRIVE_API}/files?q=name='Clients' and '${rootFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false&fields=files(id,name)`,
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        const searchData = await searchRes.json();
        if (searchData.files && searchData.files.length > 0) {
          clientsRootId = searchData.files[0].id;
        } else {
          clientsRootId = await createFolder(accessToken, 'Clients', rootFolderId);
        }
      } catch {
        // En cas d'erreur, créer directement sous le root
        clientsRootId = rootFolderId;
      }

      // Créer le dossier client
      mainFolderId = await createFolder(accessToken, folderName, clientsRootId);
      console.log(`[create-drive-folder] Dossier client créé : ${folderName} (${mainFolderId})`);

      // Créer les sous-dossiers
      for (const sub of CLIENT_SUBFOLDERS) {
        await createFolder(accessToken, sub, mainFolderId);
      }
      console.log(`[create-drive-folder] Sous-dossiers créés : ${CLIENT_SUBFOLDERS.join(', ')}`);

      // Partager avec le client si email disponible
      if (client.email) {
        await setFolderPermission(accessToken, mainFolderId, client.email);
      }

      // Mettre à jour Supabase
      const { error } = await supabase
        .from('clients')
        .update({ google_drive_folder_id: mainFolderId })
        .eq('id', client.id);

      if (error) {
        console.error('[create-drive-folder] Erreur update Supabase clients:', error.message);
        throw new Error(`Erreur Supabase update clients : ${error.message}`);
      }

      console.log(`[create-drive-folder] ✅ Client ${client.id} → Drive folder ${mainFolderId}`);

    } else if (table === 'projects') {
      // ── Cas PROJET ──────────────────────────────────────────────────────
      const project = record as ProjectRecord;
      const projectTitle = project.title || `Projet-${project.id.slice(0, 8)}`;
      const projectType = project.project_type || 'Divers';
      folderName = `${projectType} — ${projectTitle}`;

      // Récupérer le dossier Drive du client parent
      let parentFolderId = rootFolderId;
      if (project.client_id) {
        const { data: clientData } = await supabase
          .from('clients')
          .select('google_drive_folder_id, full_name')
          .eq('id', project.client_id)
          .single();

        if (clientData?.google_drive_folder_id) {
          parentFolderId = clientData.google_drive_folder_id;
        }
      }

      // Créer le dossier projet
      mainFolderId = await createFolder(accessToken, folderName, parentFolderId);
      console.log(`[create-drive-folder] Dossier projet créé : ${folderName} (${mainFolderId})`);

      // Créer les sous-dossiers
      for (const sub of PROJECT_SUBFOLDERS) {
        await createFolder(accessToken, sub, mainFolderId);
      }

      // Mettre à jour Supabase
      const { error } = await supabase
        .from('projects')
        .update({ google_drive_folder_id: mainFolderId })
        .eq('id', project.id);

      if (error) {
        throw new Error(`Erreur Supabase update projects : ${error.message}`);
      }

      console.log(`[create-drive-folder] ✅ Projet ${project.id} → Drive folder ${mainFolderId}`);

    } else {
      return new Response(
        JSON.stringify({ error: `Table non supportée : ${table}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        table,
        record_id: record.id,
        folder_id: mainFolderId,
        folder_name: folderName,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[create-drive-folder] ❌ Erreur :', message);

    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});
