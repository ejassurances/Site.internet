"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth";
import type { ActionResult } from "./clients";

// ── Ajouter une interaction ────────────────────────────────────────────────────
export async function createInteraction(data: {
  client_id: string;
  contract_id?: string;
  type: "appel" | "email" | "rdv" | "visio" | "note" | "document" | "sms";
  titre: string;
  contenu?: string;
  duree_minutes?: number;
}): Promise<ActionResult> {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  const { data: interaction, error } = await supabase
    .from("interactions")
    .insert({ ...data, author_id: user.id })
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/clients/${data.client_id}`);
  return { success: true, id: interaction.id };
}

// ── Supprimer une interaction ──────────────────────────────────────────────────
export async function deleteInteraction(interactionId: string, clientId: string): Promise<ActionResult> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  const { error } = await supabase.from("interactions").delete().eq("id", interactionId);
  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/clients/${clientId}`);
  return { success: true };
}

// ── Ajouter une personne liée ──────────────────────────────────────────────────
export async function createRelatedPerson(data: {
  client_id: string;
  type_relation: "conjoint" | "enfant" | "parent_social" | "co_parent" | "autre";
  full_name: string;
  date_naissance?: string;
  email?: string;
  phone?: string;
  notes?: string;
}): Promise<ActionResult> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  const { data: person, error } = await supabase
    .from("related_persons")
    .insert(data)
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/clients/${data.client_id}`);
  return { success: true, id: person.id };
}

// ── Mettre à jour une personne liée ───────────────────────────────────────────
export async function updateRelatedPerson(
  personId: string,
  clientId: string,
  data: Partial<{
    type_relation: string;
    full_name: string;
    date_naissance: string;
    email: string;
    phone: string;
    notes: string;
  }>
): Promise<ActionResult> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  const { error } = await supabase
    .from("related_persons")
    .update(data)
    .eq("id", personId);

  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/clients/${clientId}`);
  return { success: true };
}

// ── Supprimer une personne liée ────────────────────────────────────────────────
export async function deleteRelatedPerson(personId: string, clientId: string): Promise<ActionResult> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  const { error } = await supabase.from("related_persons").delete().eq("id", personId);
  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/clients/${clientId}`);
  return { success: true };
}
