// Edge Function : check-conformite-expiry
// Appelée quotidiennement (via pg_cron ou scheduler externe)
// Vérifie les alertes_conformite dont date_alerte = aujourd'hui et envoyee = false
// Envoie les emails de rappel via la fonction send-email et marque les alertes comme envoyées.
//
// AUCUNE IA utilisée — envoi direct via send-email.
// Appel manuel : POST /functions/v1/check-conformite-expiry
// En production : appeler depuis pg_cron ou un scheduler externe (ex. GitHub Actions cron).

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AlerteConformite {
  id: string;
  type_alerte: '90_jours' | '30_jours' | '7_jours' | 'expire';
  date_alerte: string;
  document_id: string;
  documents_conformite: {
    entity_type: 'cabinet' | 'mandataire';
    entity_id:   string | null;
    document_type: string;
    libelle:       string | null;
    date_expiration: string;
    statut:        string;
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function labelAlerte(type: string, jours?: number): string {
  switch (type) {
    case '90_jours': return 'expire dans 90 jours';
    case '30_jours': return 'expire dans 30 jours';
    case '7_jours':  return 'expire dans 7 jours ⚠️';
    case 'expire':   return 'est expiré ❌';
    default:         return `expire bientôt`;
  }
}

function labelDocumentType(type: string): string {
  const labels: Record<string, string> = {
    carte_identite:        "Carte d'identité",
    attestation_rcpro:     'Attestation RCPro',
    attestation_orias:     'Attestation ORIAS',
    extrait_kbis:          'Extrait Kbis',
    convention_mandat:     'Convention de mandat',
    rapport_formation_dda: 'Rapport de formation DDA',
    autre:                 'Document',
  };
  return labels[type] || type;
}

// ─── Handler principal ────────────────────────────────────────────────────────

serve(async (req: Request) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const supabaseUrl  = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const adminEmail   = Deno.env.get('ADMIN_EMAIL') || 'erwan.jaffrelot@icloud.com';

  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify({ error: 'Variables Supabase manquantes' }), { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const today    = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  console.log(`[check-conformite-expiry] Date vérification : ${today}`);

  try {
    // ── 1. Récupérer les alertes dues aujourd'hui (non encore envoyées) ─────
    const { data: alertes, error: fetchError } = await supabase
      .from('alertes_conformite')
      .select(`
        id,
        type_alerte,
        date_alerte,
        document_id,
        documents_conformite (
          entity_type,
          entity_id,
          document_type,
          libelle,
          date_expiration,
          statut
        )
      `)
      .eq('date_alerte', today)
      .eq('envoyee', false);

    if (fetchError) throw new Error(`Erreur lecture alertes : ${fetchError.message}`);

    console.log(`[check-conformite-expiry] ${alertes?.length ?? 0} alerte(s) à traiter`);

    if (!alertes || alertes.length === 0) {
      return new Response(
        JSON.stringify({ success: true, processed: 0, message: 'Aucune alerte à envoyer aujourd\'hui.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // ── 2. Traiter chaque alerte ─────────────────────────────────────────────
    const results: { alerte_id: string; sent: boolean; error?: string }[] = [];

    for (const alerte of alertes as AlerteConformite[]) {
      const doc = alerte.documents_conformite;
      if (!doc) {
        results.push({ alerte_id: alerte.id, sent: false, error: 'Document introuvable' });
        continue;
      }

      // Déterminer le nom de l'entité
      let entityLabel = 'Cabinet EJ Assurances';
      if (doc.entity_type === 'mandataire' && doc.entity_id) {
        // Récupérer le nom du mandataire via profiles
        const { data: mandataire } = await supabase
          .from('mandataires')
          .select('company_name, profile_id, profiles(first_name, last_name)')
          .eq('id', doc.entity_id)
          .single();

        if (mandataire) {
          if (mandataire.company_name) {
            entityLabel = `Mandataire : ${mandataire.company_name}`;
          } else if ((mandataire as any).profiles) {
            const p = (mandataire as any).profiles;
            entityLabel = `Mandataire : ${p.first_name || ''} ${p.last_name || ''}`.trim();
          }
        }
      }

      const docLabel   = doc.libelle || labelDocumentType(doc.document_type);
      const alerteLabel = labelAlerte(alerte.type_alerte);
      const expDate    = new Date(doc.date_expiration).toLocaleDateString('fr-FR');

      // ── Composer l'email ─────────────────────────────────────────────────
      const subject = `⚠️ Conformité — ${docLabel} ${alerteLabel} (${entityLabel})`;

      const body = `
Bonjour,

Un document de conformité requiert votre attention :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Entité        : ${entityLabel}
  Document      : ${docLabel}
  Expiration    : ${expDate}
  Statut        : ${doc.statut === 'expire' ? '❌ Expiré' : doc.statut === 'a_renouveler' ? '⚠️ À renouveler' : '🟢 Valide'}
  Alerte        : ${alerteLabel}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Veuillez procéder au renouvellement du document dans les meilleurs délais
et mettre à jour le dossier Drive correspondant.

Accéder au CRM : https://ejassurances.fr/admin/conformite

---
EJ Assurances — Système de gestion conformité
(Message automatique — ne pas répondre)
`.trim();

      // ── Appeler send-email ───────────────────────────────────────────────
      try {
        const sendEmailUrl = `${supabaseUrl}/functions/v1/send-email`;
        const emailRes = await fetch(sendEmailUrl, {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            to:      adminEmail,
            subject,
            text:    body,
          }),
        });

        if (!emailRes.ok) {
          const errText = await emailRes.text();
          throw new Error(`send-email a retourné ${emailRes.status} : ${errText}`);
        }

        // ── Marquer l'alerte comme envoyée ───────────────────────────────
        await supabase
          .from('alertes_conformite')
          .update({ envoyee: true, envoyee_at: new Date().toISOString() })
          .eq('id', alerte.id);

        // ── Mettre à jour le statut du document si expiré ────────────────
        if (alerte.type_alerte === 'expire') {
          await supabase
            .from('documents_conformite')
            .update({ statut: 'expire', updated_at: new Date().toISOString() })
            .eq('id', alerte.document_id);
        }

        results.push({ alerte_id: alerte.id, sent: true });
        console.log(`[check-conformite-expiry] ✅ Alerte ${alerte.id} envoyée`);

      } catch (emailErr) {
        const msg = emailErr instanceof Error ? emailErr.message : String(emailErr);
        results.push({ alerte_id: alerte.id, sent: false, error: msg });
        console.error(`[check-conformite-expiry] ❌ Alerte ${alerte.id} :`, msg);
      }
    }

    const sent   = results.filter(r => r.sent).length;
    const failed = results.filter(r => !r.sent).length;

    return new Response(
      JSON.stringify({
        success:   true,
        date:      today,
        processed: alertes.length,
        sent,
        failed,
        results,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[check-conformite-expiry] ❌ Erreur fatale :', message);
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});
