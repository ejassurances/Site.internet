"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth";

// ── Types ──────────────────────────────────────────────────────────────────────
export type ClientFormData = {
  full_name: string;
  email?: string;
  phone?: string;
  date_naissance?: string;
  adresse?: string;
  code_postal?: string;
  ville?: string;
  situation_familiale?: string;
  family_context?: string;
  statut_client?: "prospect" | "actif" | "en_cours" | "inactif";
  source_acquisition?: string;
  notes?: string;
  tags?: string[];
};

export type ActionResult = { success: boolean; error?: string; id?: string };

// ── Créer un client ────────────────────────────────────────────────────────────
export async function createClient(data: ClientFormData): Promise<ActionResult> {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  const { tags, ...clientData } = data;

  const { data: client, error } = await supabase
    .from("clients")
    .insert({
      ...clientData,
      assigned_courtier_id: user.id,
      statut_client: clientData.statut_client ?? "prospect",
    })
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };

  // Insérer les tags
  if (tags && tags.length > 0) {
    await supabase.from("client_tags").insert(
      tags.map((tag) => ({ client_id: client.id, tag }))
    );
  }

  revalidatePath("/admin/clients");
  return { success: true, id: client.id };
}

// ── Mettre à jour un client ────────────────────────────────────────────────────
export async function updateClient(clientId: string, data: ClientFormData): Promise<ActionResult> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  const { tags, ...clientData } = data;

  const { error } = await supabase
    .from("clients")
    .update(clientData)
    .eq("id", clientId);

  if (error) return { success: false, error: error.message };

  // Remplacer les tags
  if (tags !== undefined) {
    await supabase.from("client_tags").delete().eq("client_id", clientId);
    if (tags.length > 0) {
      await supabase.from("client_tags").insert(
        tags.map((tag) => ({ client_id: clientId, tag }))
      );
    }
  }

  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/admin/clients");
  return { success: true };
}

// ── Supprimer un client ────────────────────────────────────────────────────────
export async function deleteClient(clientId: string): Promise<ActionResult> {
  await requireRole(["admin"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  const { error } = await supabase.from("clients").delete().eq("id", clientId);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/clients");
  return { success: true };
}

// ── Récupérer un client avec toutes ses données 360° ─────────────────────────
export async function getClient360(clientId: string) {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const [clientRes, tagsRes, relatedRes, interactionsRes, contractsRes] = await Promise.all([
    supabase
      .from("clients")
      .select("*")
      .eq("id", clientId)
      .single(),
    supabase
      .from("client_tags")
      .select("tag")
      .eq("client_id", clientId),
    supabase
      .from("related_persons")
      .select("*")
      .eq("client_id", clientId)
      .order("type_relation"),
    supabase
      .from("interactions")
      .select("*, profiles(full_name)")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("contracts")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false }),
  ]);

  if (clientRes.error) return null;

  return {
    client: clientRes.data,
    tags: (tagsRes.data ?? []).map((t) => t.tag),
    related_persons: relatedRes.data ?? [],
    interactions: interactionsRes.data ?? [],
    contracts: contractsRes.data ?? [],
  };
}

// ── Liste clients avec filtres ────────────────────────────────────────────────
export async function getClientsList(opts?: {
  search?: string;
  statut?: string;
  tag?: string;
}) {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  let query = supabase
    .from("clients")
    .select(`
      id, full_name, email, phone, statut_client, family_context,
      created_at, score_protection,
      client_tags(tag),
      contracts(id, contract_type, status, insurer_name)
    `)
    .order("created_at", { ascending: false });

  if (opts?.search) {
    query = query.or(
      `full_name.ilike.%${opts.search}%,email.ilike.%${opts.search}%,phone.ilike.%${opts.search}%`
    );
  }
  if (opts?.statut && opts.statut !== "Tous") {
    query = query.eq("statut_client", opts.statut);
  }

  const { data, error } = await query;
  if (error) return [];
  return data ?? [];
}
