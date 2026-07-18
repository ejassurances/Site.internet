"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth";

export type EmprunteurDossier = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  date_naissance: string | null;
  adresse: string | null;
  code_postal: string | null;
  ville: string | null;
  status: "draft" | "documents_uploaded" | "completed";
  notes_prospect: string | null;
  created_at: string;
  client_id: string | null;
  converted_at: string | null;
  credits_count?: number;
};

export type EmprunteurStats = {
  total: number;
  non_convertis: number;
  convertis: number;
  cette_semaine: number;
};

// Bucket privé du tunnel emprunteur (pièces d'identité, tableaux d'amortissement, offres de prêt).
const PROSPECT_BUCKET = "prospect-documents";
// Durée de vie courte des URLs signées : l'accès expire après quelques minutes.
const SIGNED_URL_TTL_SECONDS = 600; // 10 minutes

// Normalise une valeur stockée en chemin de stockage.
// Les nouvelles écritures stockent déjà le chemin ; on gère aussi les anciennes
// valeurs qui pourraient contenir une URL publique/signée complète.
function toStoragePath(pathOrUrl: string): string {
  const value = pathOrUrl.trim();
  const markers = [
    `/object/public/${PROSPECT_BUCKET}/`,
    `/object/sign/${PROSPECT_BUCKET}/`,
    `/${PROSPECT_BUCKET}/`,
  ];
  for (const marker of markers) {
    const idx = value.indexOf(marker);
    if (idx !== -1) {
      // Retire un éventuel query string (?token=... des anciennes URLs signées).
      return value.slice(idx + marker.length).split("?")[0];
    }
  }
  return value;
}

// Génère à la demande une URL signée à courte durée de vie pour un document du
// tunnel emprunteur. Réservé au personnel (admin / courtier). L'URL n'est jamais
// stockée en base : elle est produite au moment de l'affichage puis expire.
export async function getEmprunteurDocumentUrl(
  pathOrUrl: string,
): Promise<{ url: string | null; error?: string }> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { url: null, error: "Connexion Supabase non disponible." };
  if (!pathOrUrl?.trim()) return { url: null, error: "Chemin de document manquant." };

  const path = toStoragePath(pathOrUrl);
  const { data, error } = await supabase.storage
    .from(PROSPECT_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);

  if (error || !data) return { url: null, error: error?.message ?? "Document introuvable." };
  return { url: data.signedUrl };
}

export async function getEmprunteurDossiers(): Promise<EmprunteurDossier[]> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("emprunteur_dossiers")
    .select(`
      id, full_name, email, phone, date_naissance,
      adresse, code_postal, ville, status, notes_prospect,
      created_at, client_id, converted_at,
      emprunteur_credits(id)
    `)
    .order("created_at", { ascending: false });

  if (error) return [];

  return (data ?? []).map((d) => ({
    ...d,
    credits_count: Array.isArray(d.emprunteur_credits) ? d.emprunteur_credits.length : 0,
    emprunteur_credits: undefined,
  }));
}

export async function getEmprunteurStats(): Promise<EmprunteurStats> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { total: 0, non_convertis: 0, convertis: 0, cette_semaine: 0 };

  const { data } = await supabase
    .from("emprunteur_dossiers")
    .select("id, client_id, created_at");

  if (!data) return { total: 0, non_convertis: 0, convertis: 0, cette_semaine: 0 };

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return {
    total: data.length,
    non_convertis: data.filter((d) => !d.client_id).length,
    convertis: data.filter((d) => !!d.client_id).length,
    cette_semaine: data.filter((d) => new Date(d.created_at) >= weekAgo).length,
  };
}

export async function convertDossierToClient(dossierId: string): Promise<{ success: boolean; error?: string; clientId?: string }> {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  // Récupérer le dossier
  const { data: dossier, error: fetchError } = await supabase
    .from("emprunteur_dossiers")
    .select("*")
    .eq("id", dossierId)
    .single();

  if (fetchError || !dossier) return { success: false, error: "Dossier introuvable." };

  // Vérifier si déjà converti
  if (dossier.client_id) return { success: false, error: "Ce dossier a déjà été converti en client." };

  // Vérifier doublon par email
  if (dossier.email) {
    const { data: existing } = await supabase
      .from("clients")
      .select("id")
      .eq("email", dossier.email)
      .maybeSingle();

    if (existing) {
      // Lier au client existant sans créer de doublon
      await supabase
        .from("emprunteur_dossiers")
        .update({ client_id: existing.id, converted_at: new Date().toISOString() })
        .eq("id", dossierId);

      revalidatePath("/admin/emprunteur");
      revalidatePath("/admin/clients");
      return { success: true, clientId: existing.id };
    }
  }

  // Vérifier doublon par téléphone
  if (dossier.phone) {
    const { data: existingByPhone } = await supabase
      .from("clients")
      .select("id")
      .eq("phone", dossier.phone)
      .maybeSingle();

    if (existingByPhone) {
      await supabase
        .from("emprunteur_dossiers")
        .update({ client_id: existingByPhone.id, converted_at: new Date().toISOString() })
        .eq("id", dossierId);

      revalidatePath("/admin/emprunteur");
      revalidatePath("/admin/clients");
      return { success: true, clientId: existingByPhone.id };
    }
  }

  // Créer le client
  const { data: newClient, error: createError } = await supabase
    .from("clients")
    .insert({
      full_name: dossier.full_name,
      email: dossier.email,
      phone: dossier.phone,
      date_naissance: dossier.date_naissance,
      adresse: dossier.adresse,
      code_postal: dossier.code_postal,
      ville: dossier.ville,
      statut_client: "prospect",
      contact_type: "prospect",
      source_acquisition: "Tunnel emprunteur",
      notes: dossier.notes_prospect,
      assigned_courtier_id: user.id,
    })
    .select("id")
    .single();

  if (createError || !newClient) return { success: false, error: createError?.message ?? "Erreur création client." };

  // Tag "Assurance emprunteur"
  await supabase.from("client_tags").insert({
    client_id: newClient.id,
    tag: "Assurance emprunteur",
  });

  // Lier le dossier au client
  await supabase
    .from("emprunteur_dossiers")
    .update({ client_id: newClient.id, converted_at: new Date().toISOString() })
    .eq("id", dossierId);

  revalidatePath("/admin/emprunteur");
  revalidatePath("/admin/clients");
  return { success: true, clientId: newClient.id };
}
