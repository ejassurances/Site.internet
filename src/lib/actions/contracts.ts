"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth";
import type { ActionResult } from "./clients";

// ── Types ──────────────────────────────────────────────────────────────────────
export type ContractFormData = {
  client_id: string;
  project_id?: string;
  contract_number?: string;
  insurer_name: string;
  contract_type: string;
  status?: "draft" | "active" | "pending_signature" | "terminated" | "archived";
  effective_date?: string;
  end_date?: string;
  prime_annuelle?: number;
  prime_mensuelle?: number;
  taux_commission?: number;
  beneficiaires?: string;
  notes?: string;
};

// ── Créer un contrat ───────────────────────────────────────────────────────────
export async function createContract(data: ContractFormData): Promise<ActionResult> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  // Calcul automatique de la commission annuelle
  const montant_commission_annuel =
    data.prime_annuelle && data.taux_commission
      ? (data.prime_annuelle * data.taux_commission) / 100
      : undefined;

  const { data: contract, error } = await supabase
    .from("contracts")
    .insert({
      ...data,
      montant_commission_annuel,
      status: data.status ?? "draft",
    })
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/clients/${data.client_id}`);
  revalidatePath("/admin/clients");
  return { success: true, id: contract.id };
}

// ── Mettre à jour un contrat ───────────────────────────────────────────────────
export async function updateContract(contractId: string, data: Partial<ContractFormData>): Promise<ActionResult> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  const montant_commission_annuel =
    data.prime_annuelle && data.taux_commission
      ? (data.prime_annuelle * data.taux_commission) / 100
      : undefined;

  const { error } = await supabase
    .from("contracts")
    .update({ ...data, ...(montant_commission_annuel ? { montant_commission_annuel } : {}) })
    .eq("id", contractId);

  if (error) return { success: false, error: error.message };

  if (data.client_id) revalidatePath(`/admin/clients/${data.client_id}`);
  return { success: true };
}

// ── Supprimer un contrat ───────────────────────────────────────────────────────
export async function deleteContract(contractId: string, clientId: string): Promise<ActionResult> {
  await requireRole(["admin"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  const { error } = await supabase.from("contracts").delete().eq("id", contractId);
  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/clients/${clientId}`);
  return { success: true };
}

// ── Liste des contrats ─────────────────────────────────────────────────────────
export async function getContractsList(opts?: { clientId?: string; status?: string }) {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  let query = supabase
    .from("contracts")
    .select(`
      id, contract_number, insurer_name, contract_type, status,
      effective_date, end_date, prime_annuelle, taux_commission,
      montant_commission_annuel, beneficiaires, notes, created_at,
      clients(id, full_name, email)
    `)
    .order("created_at", { ascending: false });

  if (opts?.clientId) query = query.eq("client_id", opts.clientId);
  if (opts?.status && opts.status !== "Tous") query = query.eq("status", opts.status);

  const { data, error } = await query;
  if (error) return [];
  return data ?? [];
}
