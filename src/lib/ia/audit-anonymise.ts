// Glue de sécurité pour les routes IA (resume-client, cross-selling, copilot).
// - Réutilise le module d'anonymisation regex existant (anonymiserTexte),
//   JAMAIS anonymiserTexteIA qui, lui, enverrait le texte à OpenAI.
// - Fournit un calcul d'âge (donnée de raisonnement non identifiante, en
//   remplacement de la date de naissance complète qui est masquée).
// - Journalise l'usage IA dans audit_logs, une ligne par client concerné.

import { anonymiserTexte } from "@/lib/anonymisation/service";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ServerSupabase = NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>;

// Passe un texte libre (notes, résumés d'interactions, message du courtier) dans
// le module d'anonymisation existant et renvoie la version nettoyée.
export function anonymiserPourIA(texte: string | null | undefined): string {
  if (!texte) return "";
  return anonymiserTexte(texte).texteAnonymise;
}

// Étiquette neutre et stable pour un client dans un prompt : "Client A", "Client B"…
export function labelClient(index: number): string {
  if (index < 26) return `Client ${String.fromCharCode(65 + index)}`;
  return `Client ${index + 1}`;
}

// Âge en années révolues depuis une date de naissance ISO. On envoie l'âge (non
// identifiant direct) plutôt que la date complète lorsque le raisonnement en dépend.
export function ageDepuisNaissance(dateNaissance: string | null | undefined): number | null {
  if (!dateNaissance) return null;
  const d = new Date(dateNaissance);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age -= 1;
  return age >= 0 && age < 130 ? age : null;
}

// Journalise l'usage d'un service IA. Une ligne audit_logs par client concerné
// (même en batch) afin de pouvoir répondre à « qu'a fait l'IA avec les données de
// CE client ». Best-effort : un échec d'audit ne casse pas la réponse IA produite.
export async function logIaUsage(
  supabase: ServerSupabase,
  params: {
    actorId: string | null;
    action: string;
    clientIds: (string | null)[];
    metadata: Record<string, unknown>;
  },
): Promise<void> {
  try {
    const ids = params.clientIds.length > 0 ? params.clientIds : [null];
    const rows = ids.map((cid) => ({
      actor_id: params.actorId,
      action: params.action,
      target_table: "clients",
      target_id: cid,
      metadata: params.metadata,
    }));
    await supabase.from("audit_logs").insert(rows);
  } catch (e) {
    console.error("audit_logs (IA) insert failed:", e);
  }
}
