"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth";
import type { ActionResult } from "./clients";

// ── Commissions ────────────────────────────────────────────────────────────────

export async function getCommissions(opts?: {
  statut?: string;
  assureur?: string;
  search?: string;
}) {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  let query = supabase
    .from("commissions")
    .select("*")
    .order("date_bordereau", { ascending: false });

  if (opts?.statut && opts.statut !== "Tous") query = query.eq("statut", opts.statut);
  if (opts?.assureur && opts.assureur !== "Tous") query = query.eq("assureur", opts.assureur);
  if (opts?.search) {
    query = query.or(`client_nom.ilike.%${opts.search}%,contrat_ref.ilike.%${opts.search}%`);
  }

  const { data, error } = await query;
  if (error) return [];
  return data ?? [];
}

export async function createCommission(data: {
  assureur: string;
  contrat_ref?: string;
  client_nom?: string;
  client_id?: string;
  contract_id?: string;
  type_produit?: string;
  prime_annuelle?: number;
  taux_attendu?: number;
  taux_recu?: number;
  montant_attendu?: number;
  montant_recu?: number;
  statut: "match" | "impaye" | "taux_erreur" | "resilie" | "inconnu";
  date_bordereau: string;
  bordereau_source?: string;
}): Promise<ActionResult> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  const { data: commission, error } = await supabase
    .from("commissions")
    .insert(data)
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/finance/bordereaux");
  return { success: true, id: commission.id };
}

export async function updateCommissionStatus(
  commissionId: string,
  statut: "match" | "impaye" | "taux_erreur" | "resilie" | "inconnu"
): Promise<ActionResult> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  const { error } = await supabase
    .from("commissions")
    .update({ statut })
    .eq("id", commissionId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/finance/bordereaux");
  return { success: true };
}

// ── Factures honoraires ────────────────────────────────────────────────────────

export async function getInvoices(opts?: { statut?: string; search?: string }) {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  let query = supabase
    .from("invoices")
    .select("*, clients(id, full_name, email)")
    .order("date_emission", { ascending: false });

  if (opts?.statut && opts.statut !== "Tous") query = query.eq("statut", opts.statut);
  if (opts?.search) {
    query = query.or(`numero.ilike.%${opts.search}%,prestation.ilike.%${opts.search}%`);
  }

  const { data, error } = await query;
  if (error) return [];
  return data ?? [];
}

export async function createInvoice(data: {
  client_id?: string;
  prestation: string;
  montant_ht: number;
  tva_taux?: number;
  date_emission: string;
  date_echeance: string;
  notes?: string;
}): Promise<ActionResult> {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  // Générer le numéro de facture automatiquement
  const year = new Date().getFullYear();
  const { count } = await supabase
    .from("invoices")
    .select("id", { count: "exact", head: true })
    .gte("created_at", `${year}-01-01`);

  const numero = `FAC-${year}-${String((count ?? 0) + 1).padStart(4, "0")}`;

  const { data: invoice, error } = await supabase
    .from("invoices")
    .insert({
      ...data,
      numero,
      tva_taux: data.tva_taux ?? 0,
      statut: "brouillon",
      created_by: user.id,
    })
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/finance/facturation");
  return { success: true, id: invoice.id };
}

export async function updateInvoiceStatus(
  invoiceId: string,
  statut: "brouillon" | "envoyee" | "encaissee" | "en_retard" | "annulee",
  date_encaissement?: string
): Promise<ActionResult> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  const { error } = await supabase
    .from("invoices")
    .update({ statut, ...(date_encaissement ? { date_encaissement } : {}) })
    .eq("id", invoiceId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/finance/facturation");
  return { success: true };
}

// ── Apporteurs & reversements ──────────────────────────────────────────────────

export async function getApporteurs() {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("apporteurs")
    .select("*, reversements(id, montant, statut, periode_debut, periode_fin)")
    .order("nom");

  if (error) return [];
  return data ?? [];
}

export async function createApporteur(data: {
  nom: string;
  type_apporteur: "apporteur" | "mandataire";
  taux_retrocession: number;
  email?: string;
  phone?: string;
  iban?: string;
  notes?: string;
}): Promise<ActionResult> {
  await requireRole(["admin"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { success: false, error: "Connexion Supabase non disponible." };

  const { data: apporteur, error } = await supabase
    .from("apporteurs")
    .insert(data)
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/finance/reversements");
  return { success: true, id: apporteur.id };
}

// ── Dashboard Finance ──────────────────────────────────────────────────────────

export async function getFinanceDashboard() {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];

  const [commissionsRes, invoicesRes, alertesRes] = await Promise.all([
    supabase
      .from("commissions")
      .select("montant_recu, montant_attendu, statut")
      .gte("date_bordereau", startOfMonth),
    supabase
      .from("invoices")
      .select("montant_ht, statut, date_echeance"),
    supabase
      .from("commissions")
      .select("id, assureur, client_nom, contrat_ref, ecart, statut")
      .neq("statut", "match")
      .order("date_bordereau", { ascending: false })
      .limit(5),
  ]);

  const commissions = commissionsRes.data ?? [];
  const invoices = invoicesRes.data ?? [];

  const totalCommissionsRecues = commissions.reduce((s, c) => s + (c.montant_recu ?? 0), 0);
  const totalCommissionsAttendues = commissions.reduce((s, c) => s + (c.montant_attendu ?? 0), 0);
  const nbImpayesCommissions = commissions.filter((c) => c.statut !== "match").length;

  const totalHonorairesFactures = invoices
    .filter((i) => i.statut !== "annulee")
    .reduce((s, i) => s + (i.montant_ht ?? 0), 0);
  const totalHonorairesEncaisses = invoices
    .filter((i) => i.statut === "encaissee")
    .reduce((s, i) => s + (i.montant_ht ?? 0), 0);
  const nbFacturesEnRetard = invoices.filter((i) => i.statut === "en_retard").length;

  return {
    totalCommissionsRecues,
    totalCommissionsAttendues,
    ecartCommissions: totalCommissionsAttendues - totalCommissionsRecues,
    nbImpayesCommissions,
    totalHonorairesFactures,
    totalHonorairesEncaisses,
    nbFacturesEnRetard,
    alertes: alertesRes.data ?? [],
  };
}
