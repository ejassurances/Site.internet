// Edge Function : ai-process-document
// Analyse les documents Google Drive avec Claude (Anthropic) et met à jour le CRM Supabase.
// Peut être déclenchée manuellement depuis l'admin ou via webhook Google Drive.
//
// Payload attendu :
// {
//   "document_id": "uuid-du-document-dans-documents_cabinet",
//   "drive_file_id": "id-google-drive",
//   "client_id": "uuid-client-optionnel",
//   "analysis_type": "kyc" | "contrat" | "offre_pret" | "tableau_amortissement" | "general"
// }

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ─── Types ────────────────────────────────────────────────────────────────────

type AnalysisType = 'kyc' | 'contrat' | 'offre_pret' | 'tableau_amortissement' | 'general';

interface ProcessPayload {
  document_id?: string;
  drive_file_id: string;
  client_id?: string;
  analysis_type?: AnalysisType;
}

interface AnalysisResult {
  summary: string;
  key_data: Record<string, string | number | boolean>;
  action_items: string[];
  compliance_flags: string[];
  risk_score: number; // 0-100
  anonymisation_required: boolean;
  detected_pii: string[];
}

// ─── Prompts par type d'analyse ───────────────────────────────────────────────

const ANALYSIS_PROMPTS: Record<AnalysisType, string> = {
  kyc: `Tu es un expert en conformité KYC pour un courtier en assurance français.
Analyse ce document et extrais :
1. Identité complète (nom, prénom, date de naissance, adresse)
2. Situation familiale (marié, pacsé, divorcé, coparentalité)
3. Situation professionnelle (salarié, TNS, fonctionnaire, retraité)
4. Revenus annuels bruts estimés
5. Alertes conformité (documents manquants, incohérences, risques AML)
6. Données personnelles détectées (pour anonymisation RGPD)
Réponds en JSON structuré.`,

  contrat: `Tu es un expert en assurance emprunteur français.
Analyse ce contrat d'assurance et extrais :
1. Compagnie assureur et produit
2. Garanties souscrites (DC, PTIA, ITT, IPT, IPP, PE)
3. Quotités assurées par emprunteur
4. Taux d'assurance (TAEA)
5. Exclusions notables
6. Date d'effet et durée
7. Possibilité de substitution (Loi Lemoine)
Réponds en JSON structuré.`,

  offre_pret: `Tu es un expert en assurance emprunteur et crédit immobilier français.
Analyse cette offre de prêt et extrais :
1. Établissement prêteur
2. Montant emprunté et durée
3. Taux nominal et TAEG
4. Mensualité hors assurance
5. Assurance groupe proposée : taux, coût total, garanties
6. Économie potentielle avec délégation d'assurance (estimation)
7. Données personnelles à anonymiser avant analyse IA
Réponds en JSON structuré.`,

  tableau_amortissement: `Tu es un expert en crédit immobilier français.
Analyse ce tableau d'amortissement et extrais :
1. Capital initial et durée totale
2. Taux d'intérêt
3. Coût total du crédit (intérêts + assurance)
4. Capital restant dû à différentes échéances (1 an, 5 ans, mi-parcours)
5. Opportunités de renégociation ou rachat
6. Données personnelles présentes (à anonymiser)
Réponds en JSON structuré.`,

  general: `Tu es un assistant expert pour un cabinet de courtage en assurance français (EJ Assurances).
Analyse ce document et fournis :
1. Type de document identifié
2. Résumé exécutif (3-5 phrases)
3. Données clés extraites
4. Actions recommandées pour le courtier
5. Niveau de risque/urgence (0-100)
6. Données personnelles détectées (RGPD)
Réponds en JSON structuré.`,
};

// ─── Helpers Google Drive ─────────────────────────────────────────────────────

async function getGoogleAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string,
): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('Impossible d\'obtenir le token Google');
  return data.access_token;
}

async function downloadDriveFile(
  accessToken: string,
  fileId: string,
): Promise<{ content: string; mimeType: string; name: string }> {
  // Récupérer les métadonnées
  const metaRes = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?fields=name,mimeType,size`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  const meta = await metaRes.json();

  // Télécharger le contenu (export en texte pour les Google Docs, download pour les autres)
  let content = '';
  if (meta.mimeType === 'application/vnd.google-apps.document') {
    const exportRes = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    content = await exportRes.text();
  } else if (
    meta.mimeType === 'application/pdf' ||
    meta.mimeType.includes('word') ||
    meta.mimeType === 'text/plain'
  ) {
    // Pour les PDF et Word, on télécharge et on extrait le texte
    // Note : en production, utiliser un service d'extraction PDF (ex: pdfjs)
    // Ici on télécharge en base64 pour transmission à Claude avec vision
    const dlRes = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    const buffer = await dlRes.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    content = btoa(binary);
  }

  return { content, mimeType: meta.mimeType, name: meta.name };
}

// ─── Analyse avec Claude ──────────────────────────────────────────────────────

async function analyzeWithClaude(
  apiKey: string,
  documentContent: string,
  mimeType: string,
  analysisType: AnalysisType,
): Promise<AnalysisResult> {
  const prompt = ANALYSIS_PROMPTS[analysisType];

  const isBase64 = mimeType === 'application/pdf' || mimeType.includes('word');

  const messageContent = isBase64
    ? [
        {
          type: 'document',
          source: {
            type: 'base64',
            media_type: mimeType === 'application/pdf' ? 'application/pdf' : 'application/octet-stream',
            data: documentContent,
          },
        },
        { type: 'text', text: prompt },
      ]
    : [{ type: 'text', text: `${prompt}\n\n---\n\nCONTENU DU DOCUMENT :\n${documentContent}` }];

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5',
      max_tokens: 2048,
      messages: [{ role: 'user', content: messageContent }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Erreur Claude API : ${err}`);
  }

  const data = await res.json();
  const rawText = data.content[0]?.text || '{}';

  // Extraire le JSON de la réponse
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    // Retourner une structure par défaut si pas de JSON
    return {
      summary: rawText.slice(0, 500),
      key_data: {},
      action_items: [],
      compliance_flags: [],
      risk_score: 0,
      anonymisation_required: false,
      detected_pii: [],
    };
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    return {
      summary: parsed.summary || parsed.résumé || rawText.slice(0, 500),
      key_data: parsed.key_data || parsed.données_clés || parsed,
      action_items: parsed.action_items || parsed.actions_recommandées || [],
      compliance_flags: parsed.compliance_flags || parsed.alertes_conformité || [],
      risk_score: parsed.risk_score || parsed.niveau_risque || 0,
      anonymisation_required: parsed.anonymisation_required || (parsed.detected_pii?.length > 0) || false,
      detected_pii: parsed.detected_pii || parsed.données_personnelles || [],
    };
  } catch {
    return {
      summary: rawText.slice(0, 500),
      key_data: {},
      action_items: [],
      compliance_flags: [],
      risk_score: 0,
      anonymisation_required: false,
      detected_pii: [],
    };
  }
}

// ─── Handler principal ────────────────────────────────────────────────────────

serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const payload: ProcessPayload = await req.json();
    const { drive_file_id, client_id, document_id } = payload;
    const analysisType: AnalysisType = payload.analysis_type || 'general';

    console.log(`[ai-process-document] Traitement fichier Drive : ${drive_file_id}, type : ${analysisType}`);

    // ── Variables d'environnement ───────────────────────────────────────────
    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');
    const googleClientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const googleClientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');
    const googleRefreshToken = Deno.env.get('GOOGLE_REFRESH_TOKEN');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!anthropicKey) throw new Error('ANTHROPIC_API_KEY manquant');
    if (!googleClientId || !googleClientSecret || !googleRefreshToken) {
      throw new Error('Variables Google OAuth manquantes');
    }
    if (!supabaseUrl || !supabaseServiceKey) throw new Error('Variables Supabase manquantes');

    // ── Initialiser Supabase ────────────────────────────────────────────────
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // ── Télécharger le fichier Drive ────────────────────────────────────────
    const accessToken = await getGoogleAccessToken(googleClientId, googleClientSecret, googleRefreshToken);
    const { content, mimeType, name } = await downloadDriveFile(accessToken, drive_file_id);
    console.log(`[ai-process-document] Fichier téléchargé : ${name} (${mimeType})`);

    // ── Analyser avec Claude ────────────────────────────────────────────────
    const analysis = await analyzeWithClaude(anthropicKey, content, mimeType, analysisType);
    console.log(`[ai-process-document] Analyse terminée, risk_score=${analysis.risk_score}`);

    // ── Sauvegarder le résultat dans Supabase ──────────────────────────────
    const analysisRecord = {
      drive_file_id,
      file_name: name,
      file_mime_type: mimeType,
      analysis_type: analysisType,
      summary: analysis.summary,
      key_data: analysis.key_data,
      action_items: analysis.action_items,
      compliance_flags: analysis.compliance_flags,
      risk_score: analysis.risk_score,
      anonymisation_required: analysis.anonymisation_required,
      detected_pii_categories: analysis.detected_pii,
      client_id: client_id || null,
      document_id: document_id || null,
      processed_at: new Date().toISOString(),
    };

    const { data: savedAnalysis, error: saveError } = await supabase
      .from('ia_document_analyses')
      .insert(analysisRecord)
      .select()
      .single();

    if (saveError) {
      // La table n'existe peut-être pas encore — on log mais on continue
      console.warn('[ai-process-document] Impossible de sauvegarder l\'analyse :', saveError.message);
    }

    // ── Si anonymisation requise, créer une alerte ─────────────────────────
    if (analysis.anonymisation_required && client_id) {
      await supabase.from('client_interactions').insert({
        client_id,
        type: 'note',
        contenu: `⚠️ Document "${name}" analysé par IaGO — Anonymisation RGPD recommandée. Données personnelles détectées : ${analysis.detected_pii.join(', ')}`,
        auteur_id: null,
      }).select().single();
    }

    return new Response(
      JSON.stringify({
        success: true,
        file_name: name,
        analysis_type: analysisType,
        analysis,
        saved_id: savedAnalysis?.id || null,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[ai-process-document] ❌ Erreur :', message);

    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});
