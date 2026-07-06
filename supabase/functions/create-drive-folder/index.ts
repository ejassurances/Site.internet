// Edge Function : create-drive-folder v12
// DÃ©clenchÃ©e par pg_net aprÃ¨s INSERT sur :
//   - public.clients   â†’ dossier client standard (KYC / Contrats / Correspondances / Analyse DDA)
//   - public.projects  â†’ sous-dossier projet dans le dossier client
//   - public.mandataires â†’ dossier conformitÃ© mandataire (Carte d'identitÃ© / RCPro / ORIAS â€¦)
// AppelÃ©e manuellement (POST { table: 'cabinet' }) pour initialiser le dossier conformitÃ© cabinet.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface ClientRecord {
  id: string;
  full_name?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
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

interface PartnerRecord {
  id: string;
  name?: string;
  partner_type?: string;
}

interface PartnerContractRecord {
  id: string;
  partner_id?: string;
  contract_name?: string;
  product_category?: string;
}

type TriggerPayload =
  | { table: 'clients';     record: ClientRecord }
  | { table: 'projects';    record: ProjectRecord }
  | { table: 'mandataires'; record: MandataireRecord }
  | { table: 'partner_companies'; record: PartnerRecord }
  | { table: 'partner_distributed_contracts'; record: PartnerContractRecord }
  | { table: 'cabinet';     record?: never };

// â”€â”€â”€ Constantes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const GOOGLE_TOKEN_URL   = 'https://oauth2.googleapis.com/token';
const GOOGLE_DRIVE_API   = 'https://www.googleapis.com/drive/v3';

const CLIENT_SUBFOLDERS    = ['KYC', 'Contrats', 'Correspondances', 'Analyse DDA'];
const PROJECT_SUBFOLDERS   = ['Offres', 'Documents signÃ©s', 'Correspondances'];
const MANDATAIRE_SUBFOLDERS = [
  "Carte d'identitÃ©",
  'Attestation RCPro',
  'Attestation ORIAS',
  'Convention de mandat',
  'Rapport DDA',
  'Autres',
];
const PARTNER_SUBFOLDERS = ['Produits', 'Conventions', 'Commissions', 'API', 'Contacts', 'Archives'];
const PARTNER_PRODUCT_SUBFOLDERS = ['CG', 'IPID', 'Fiche produit', 'Tarifs commissions', 'Souscription', 'Archives'];
const CABINET_SUBFOLDERS = [
  "Carte d'identitÃ© dirigeant",
  'Attestation RCPro',
  'Attestation ORIAS',
  'Extrait Kbis',
  'Rapport DDA',
  'Autres',
];

// â”€â”€â”€ Helpers OAuth Google â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
    throw new Error(`Ã‰chec refresh token Google OAuth : ${err}`);
  }
  const data = await res.json();
  return data.access_token as string;
}

// â”€â”€â”€ Helpers Google Drive API â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
    throw new Error(`Ã‰chec crÃ©ation dossier Drive "${name}" : ${err}`);
  }
  const data = await res.json();
  return data.id as string;
}

function sanitizeDriveName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s.-]/g, ' ')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 90);
}

function escapeDriveQueryString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function projectCode(projectType?: string): string {
  if (projectType === 'assurance_emprunteur') return 'ADP';
  if (projectType === 'assurance_trottinette') return 'TROT';
  if (projectType === 'prevoyance') return 'PREV';
  return 'PROJET';
}

function projectSubfolders(projectType?: string): string[] {
  if (projectType === 'assurance_emprunteur') {
    return [
      '01 - Identite KYC',
      '02 - Recueil des besoins',
      '03 - Offre de pret',
      '04 - Tableau amortissement',
      '05 - Devis',
      '06 - Feuille de mission',
      '07 - Fiche conseil',
      '08 - Souscription',
      '09 - Echanges',
    ];
  }

  if (projectType === 'assurance_trottinette') {
    return [
      '01 - Identite KYC',
      '02 - Recueil des besoins',
      '03 - Justificatifs trottinette',
      '04 - Devis',
      '05 - Fiche conseil',
      '06 - Contrat',
      '07 - Echanges',
    ];
  }

  return PROJECT_SUBFOLDERS;
}

/** Cherche un sous-dossier par nom dans un parent; le crÃ©e s'il n'existe pas. */
async function findOrCreateFolder(
  accessToken: string,
  name: string,
  parentId: string,
): Promise<string> {
  const q = encodeURIComponent(
    `name='${escapeDriveQueryString(name)}' and '${escapeDriveQueryString(parentId)}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
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
  // Erreurs ignorÃ©es (email invalide, etc.)
}

// â”€â”€â”€ Handler principal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const payload: TriggerPayload = await req.json();
    const { table } = payload;

    console.log(`[create-drive-folder] table=${table}`, payload.record ? `id=${payload.record.id}` : '(cabinet)');

    // â”€â”€ Variables d'environnement â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    if (table === 'clients') {
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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

      console.log(`[create-drive-folder] âœ… Client ${client.id} â†’ ${mainFolderId}`);

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    } else if (table === 'projects') {
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
      const project  = payload.record as ProjectRecord;
      const title    = project.title        || `Projet-${project.id.slice(0, 8)}`;
      const type     = project.project_type || 'Divers';
      const code      = projectCode(type);
      folderName      = `DOX_${code}_${sanitizeDriveName(title)}`;

      let parentFolderId = rootFolderId;
      if (project.client_id) {
        const { data: client } = await supabase
          .from('clients')
          .select('id, full_name, email, google_drive_folder_id')
          .eq('id', project.client_id)
          .single();

        if (client?.google_drive_folder_id) {
          parentFolderId = client.google_drive_folder_id;
        } else if (client) {
          const clientsRootId = await findOrCreateFolder(accessToken, 'Clients', rootFolderId);
          const clientName = client.full_name
            || client.email
            || `Client-${client.id.slice(0, 8)}`;

          parentFolderId = await findOrCreateFolder(accessToken, sanitizeDriveName(clientName), clientsRootId);

          for (const sub of CLIENT_SUBFOLDERS) {
            await findOrCreateFolder(accessToken, sub, parentFolderId);
          }

          await supabase
            .from('clients')
            .update({ google_drive_folder_id: parentFolderId })
            .eq('id', client.id);
        }
      }

      mainFolderId = await findOrCreateFolder(accessToken, folderName, parentFolderId);
      for (const sub of projectSubfolders(type)) {
        await findOrCreateFolder(accessToken, sub, mainFolderId);
      }

      const { error } = await supabase
        .from('projects')
        .update({ google_drive_folder_id: mainFolderId })
        .eq('id', project.id);

      if (error) throw new Error(`Erreur Supabase update projects : ${error.message}`);

      console.log(`[create-drive-folder] âœ… Projet ${project.id} â†’ ${mainFolderId}`);

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    } else if (table === 'mandataires') {
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
      const mandataire = payload.record as MandataireRecord;

      // RÃ©cupÃ©rer le nom depuis profiles
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

      // Trouver/crÃ©er l'arborescence ConformitÃ© > Mandataires
      const conformiteRootId   = await findOrCreateFolder(accessToken, 'ConformitÃ©', rootFolderId);
      const mandatairesRootId  = await findOrCreateFolder(accessToken, 'Mandataires', conformiteRootId);

      // CrÃ©er le dossier individuel du mandataire
      mainFolderId = await createFolder(accessToken, folderName, mandatairesRootId);

      // CrÃ©er les sous-dossiers conformitÃ©
      for (const sub of MANDATAIRE_SUBFOLDERS) {
        await createFolder(accessToken, sub, mainFolderId);
      }

      // Mettre Ã  jour Supabase
      const { error } = await supabase
        .from('mandataires')
        .update({ google_drive_folder_id: mainFolderId })
        .eq('id', mandataire.id);

      if (error) throw new Error(`Erreur Supabase update mandataires : ${error.message}`);

      console.log(`[create-drive-folder] âœ… Mandataire ${mandataire.id} â†’ ${mainFolderId}`);

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    } else if (table === 'partner_companies') {
      const partner = payload.record as PartnerRecord;
      folderName = `PART_${partner.name || `Partenaire-${partner.id.slice(0, 8)}`}`;

      const partnersRootId = await findOrCreateFolder(accessToken, 'Partenaires', rootFolderId);
      mainFolderId = await findOrCreateFolder(accessToken, folderName, partnersRootId);

      let productsFolderId = '';
      for (const sub of PARTNER_SUBFOLDERS) {
        const subFolderId = await findOrCreateFolder(accessToken, sub, mainFolderId);
        if (sub === 'Produits') productsFolderId = subFolderId;
      }

      const { error } = await supabase
        .from('partner_companies')
        .update({
          google_drive_folder_id: mainFolderId,
          drive_products_folder_id: productsFolderId || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', partner.id);

      if (error) throw new Error(`Erreur Supabase update partner_companies : ${error.message}`);

      console.log(`[create-drive-folder] Partner ${partner.id} -> ${mainFolderId}`);

    } else if (table === 'partner_distributed_contracts') {
      const contract = payload.record as PartnerContractRecord;
      const contractName = contract.contract_name || `Produit-${contract.id.slice(0, 8)}`;
      const category = contract.product_category || 'autre';
      folderName = `PROD_${category}_${contractName}`;

      let parentFolderId = rootFolderId;
      if (contract.partner_id) {
        const { data } = await supabase
          .from('partner_companies')
          .select('drive_products_folder_id, google_drive_folder_id')
          .eq('id', contract.partner_id)
          .single();

        if (data?.drive_products_folder_id) {
          parentFolderId = data.drive_products_folder_id;
        } else if (data?.google_drive_folder_id) {
          parentFolderId = await findOrCreateFolder(accessToken, 'Produits', data.google_drive_folder_id);
        }
      }

      mainFolderId = await findOrCreateFolder(accessToken, folderName, parentFolderId);
      for (const sub of PARTNER_PRODUCT_SUBFOLDERS) {
        await findOrCreateFolder(accessToken, sub, mainFolderId);
      }

      const { error } = await supabase
        .from('partner_distributed_contracts')
        .update({ google_drive_folder_id: mainFolderId, updated_at: new Date().toISOString() })
        .eq('id', contract.id);

      if (error) throw new Error(`Erreur Supabase update partner_distributed_contracts : ${error.message}`);

      console.log(`[create-drive-folder] Partner product ${contract.id} -> ${mainFolderId}`);

    } else if (table === 'cabinet') {
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
      // AppelÃ© manuellement une fois pour initialiser le dossier cabinet
      folderName = 'EJ Assurances';

      const conformiteRootId = await findOrCreateFolder(accessToken, 'ConformitÃ©', rootFolderId);
      const cabinetRootId    = await findOrCreateFolder(accessToken, 'Cabinet', conformiteRootId);

      // CrÃ©er (ou rÃ©utiliser) le dossier principal cabinet
      mainFolderId = await findOrCreateFolder(accessToken, folderName, cabinetRootId);

      for (const sub of CABINET_SUBFOLDERS) {
        await findOrCreateFolder(accessToken, sub, mainFolderId);
      }

      // Mettre Ã  jour cabinet_info
      const { error } = await supabase
        .from('cabinet_info')
        .update({ google_drive_folder_conformite_id: mainFolderId, updated_at: new Date().toISOString() })
        .neq('id', '00000000-0000-0000-0000-000000000000'); // update all rows (1 row)

      if (error) throw new Error(`Erreur Supabase update cabinet_info : ${error.message}`);

      console.log(`[create-drive-folder] âœ… Cabinet â†’ ${mainFolderId}`);

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    } else {
      return new Response(
        JSON.stringify({ error: `Table non supportÃ©e : ${(payload as any).table}` }),
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
    console.error('[create-drive-folder] âŒ', message);
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});

