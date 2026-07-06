"use server";

import { revalidatePath } from "next/cache";
import OpenAI from "openai";
import { requireRole } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PartnerCompany = {
  id: string;
  name: string;
  partner_type: string;
  status: string;
  orias_number: string | null;
  website: string | null;
  distributed_products: string[];
  commercial_contact: Record<string, string> | null;
  claims_contact: Record<string, string> | null;
  complaints_contact: Record<string, string> | null;
  inspector_contact: Record<string, string> | null;
  commission_terms: Record<string, string> | null;
  convention_signed_at: string | null;
  api_enabled?: boolean;
  api_provider_name?: string | null;
  api_base_url?: string | null;
  api_environment?: string | null;
  api_auth_mode?: string | null;
  api_status?: string | null;
  api_scopes?: string[];
  api_config?: Record<string, unknown> | null;
  api_notes?: string | null;
  notes: string | null;
  created_at: string;
  partner_distributed_contracts?: PartnerDistributedContract[];
  partner_product_documents?: PartnerProductDocument[];
};

export type PartnerDistributedContract = {
  id: string;
  partner_id: string;
  contract_name: string;
  product_category: string;
  product_code: string | null;
  status: string;
  target_clients: string[];
  guarantees: string[];
  exclusions: string | null;
  advice_positioning: string | null;
  underwriting_rules: string | null;
  pricing_notes: string | null;
  commission_rate: number | null;
  commission_notes: string | null;
  subscription_link: string | null;
  ai_analysis_status?: string | null;
  ai_guarantee_summary?: string | null;
  ai_comparison_points?: Record<string, unknown> | null;
  ai_needs_questions?: string[];
  ai_advice_notes?: string | null;
  ai_analyzed_at?: string | null;
  created_at: string;
  partner_product_documents?: PartnerProductDocument[];
};

export type PartnerProductDocument = {
  id: string;
  partner_id: string;
  contract_id?: string | null;
  product_name: string;
  product_category: string;
  document_type: string;
  document_id: string | null;
  drive_file_id: string | null;
  file_name: string | null;
  valid_from: string | null;
  valid_until: string | null;
  notes: string | null;
  created_at: string;
};

export type PartnerActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

function contactFromForm(formData: FormData, prefix: string) {
  return {
    name: String(formData.get(`${prefix}Name`) ?? "").trim(),
    email: String(formData.get(`${prefix}Email`) ?? "").trim(),
    phone: String(formData.get(`${prefix}Phone`) ?? "").trim(),
  };
}

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY manquant pour lancer l'analyse IA.");
  }
  return new OpenAI({ apiKey });
}

export async function getPartnerCompanies(): Promise<PartnerCompany[]> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("partner_companies")
    .select("*, partner_distributed_contracts(*)")
    .order("created_at", { ascending: false });

  return (data ?? []) as PartnerCompany[];
}

export async function getPartnerCompany(partnerId: string): Promise<PartnerCompany | null> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("partner_companies")
    .select("*, partner_distributed_contracts(*, partner_product_documents(*)), partner_product_documents(*)")
    .eq("id", partnerId)
    .maybeSingle();

  return (data ?? null) as PartnerCompany | null;
}

export async function createPartnerDistributedContractAction(
  _previousState: PartnerActionState,
  formData: FormData,
): Promise<PartnerActionState> {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "error", message: "Connexion Supabase indisponible." };

  const partnerId = String(formData.get("partnerId") ?? "");
  const contractName = String(formData.get("contractName") ?? "").trim();
  const productCategory = String(formData.get("productCategory") ?? "autre");

  if (!partnerId || !contractName) {
    return { status: "error", message: "Selectionnez un partenaire et renseignez le nom du contrat." };
  }

  const commissionRateRaw = String(formData.get("commissionRate") ?? "").replace(",", ".");
  const commissionRate = Number(commissionRateRaw);

  const { error } = await supabase.from("partner_distributed_contracts").insert({
    partner_id: partnerId,
    contract_name: contractName,
    product_category: productCategory,
    product_code: String(formData.get("productCode") ?? "").trim() || null,
    status: String(formData.get("status") ?? "active"),
    target_clients: formData.getAll("targetClients").map(String).filter(Boolean),
    guarantees: String(formData.get("guarantees") ?? "")
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter(Boolean),
    exclusions: String(formData.get("exclusions") ?? "").trim() || null,
    advice_positioning: String(formData.get("advicePositioning") ?? "").trim() || null,
    underwriting_rules: String(formData.get("underwritingRules") ?? "").trim() || null,
    pricing_notes: String(formData.get("pricingNotes") ?? "").trim() || null,
    commission_rate: Number.isFinite(commissionRate) ? commissionRate : null,
    commission_notes: String(formData.get("commissionNotes") ?? "").trim() || null,
    subscription_link: String(formData.get("subscriptionLink") ?? "").trim() || null,
    created_by: user.id,
  });

  if (error) return { status: "error", message: error.message };

  await supabase.from("audit_logs").insert({
    actor_id: user.id,
    action: "partner_distributed_contract.created",
    target_table: "partner_distributed_contracts",
    metadata: { partner_id: partnerId, contract_name: contractName, product_category: productCategory },
  });

  revalidatePath("/admin/partenaires");
  revalidatePath(`/admin/partenaires/${partnerId}`);
  return { status: "success", message: "Contrat distribue ajoute au referentiel partenaire." };
}

export async function createPartnerProductDocumentAction(
  _previousState: PartnerActionState,
  formData: FormData,
): Promise<PartnerActionState> {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "error", message: "Connexion Supabase indisponible." };

  const partnerId = String(formData.get("partnerId") ?? "");
  const contractId = String(formData.get("contractId") ?? "") || null;
  const productName = String(formData.get("productName") ?? "").trim();
  const productCategory = String(formData.get("productCategory") ?? "autre");
  const documentType = String(formData.get("documentType") ?? "autre");
  const driveFileId = String(formData.get("driveFileId") ?? "").trim();
  const fileName = String(formData.get("fileName") ?? "").trim();

  if (!partnerId || !productName || !documentType) {
    return { status: "error", message: "Partenaire, produit et type de document sont obligatoires." };
  }

  const { error } = await supabase.from("partner_product_documents").insert({
    partner_id: partnerId,
    contract_id: contractId,
    product_name: productName,
    product_category: productCategory,
    document_type: documentType,
    drive_file_id: driveFileId || null,
    file_name: fileName || null,
    valid_from: String(formData.get("validFrom") ?? "") || null,
    valid_until: String(formData.get("validUntil") ?? "") || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
  });

  if (error) return { status: "error", message: error.message };

  await supabase.from("audit_logs").insert({
    actor_id: user.id,
    action: "partner_product_document.created",
    target_table: "partner_product_documents",
    metadata: { partner_id: partnerId, product_name: productName, document_type: documentType },
  });

  revalidatePath("/admin/partenaires");
  revalidatePath(`/admin/partenaires/${partnerId}`);
  return { status: "success", message: "Document contractuel rattache a la fiche partenaire." };
}

export async function generatePartnerContractAiSummaryAction(formData: FormData): Promise<void> {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Connexion Supabase indisponible.");

  const partnerId = String(formData.get("partnerId") ?? "");
  const contractId = String(formData.get("contractId") ?? "");
  if (!partnerId || !contractId) throw new Error("Partenaire ou contrat manquant.");

  const [{ data: partner }, { data: contract }, { data: documents }] = await Promise.all([
    supabase.from("partner_companies").select("name, partner_type").eq("id", partnerId).maybeSingle(),
    supabase.from("partner_distributed_contracts").select("*").eq("id", contractId).maybeSingle(),
    supabase
      .from("partner_product_documents")
      .select("document_type, file_name, product_name, notes, valid_from, valid_until")
      .eq("contract_id", contractId)
      .order("created_at", { ascending: false }),
  ]);

  if (!contract) throw new Error("Contrat distribue introuvable.");

  const contractContext = {
    partner,
    contract,
    documents: documents ?? [],
  };

  const prompt = `Tu es l'agent IA conformité-produit du cabinet EJ Assurances.
Analyse un contrat d'assurance distribué par un partenaire pour aider le courtier à préparer :
- un devis comparatif ;
- un recueil des besoins ;
- une fiche conseil DDA.

Tu ne dois pas vendre le contrat ni donner une décision de souscription.
Tu dois résumer les garanties, points de comparaison, limites, questions à poser au client et points de vigilance.

Réponds uniquement en JSON valide avec cette structure :
{
  "resume_garanties": "Résumé synthétique en français, 8 à 12 lignes maximum.",
  "points_comparaison": {
    "forces": ["..."],
    "limites": ["..."],
    "documents_a_verifier": ["..."],
    "criteres_devis": ["..."]
  },
  "questions_recueil_besoins": ["Question utile pour qualifier le besoin client"],
  "notes_devoir_conseil": "Points à reprendre dans l'analyse et la justification du conseil."
}

Données disponibles :
${JSON.stringify(contractContext, null, 2)}`;

  const completion = await getOpenAIClient().chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "Tu produis une analyse assurantielle structurée, prudente, conforme DDA, sans conseil direct au client." },
      { role: "user", content: prompt },
    ],
    temperature: 0.3,
    max_tokens: 1400,
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("Réponse IA vide.");

  const parsed = JSON.parse(content) as {
    resume_garanties?: string;
    points_comparaison?: Record<string, unknown>;
    questions_recueil_besoins?: string[];
    notes_devoir_conseil?: string;
  };

  const { error } = await supabase
    .from("partner_distributed_contracts")
    .update({
      ai_analysis_status: "ready",
      ai_guarantee_summary: parsed.resume_garanties ?? null,
      ai_comparison_points: parsed.points_comparaison ?? {},
      ai_needs_questions: parsed.questions_recueil_besoins ?? [],
      ai_advice_notes: parsed.notes_devoir_conseil ?? null,
      ai_analyzed_at: new Date().toISOString(),
      ai_analyzed_by: user.id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", contractId);

  if (error) throw new Error(error.message);

  await supabase.from("audit_logs").insert({
    actor_id: user.id,
    action: "partner_contract_ai_summary.generated",
    target_table: "partner_distributed_contracts",
    target_id: contractId,
    metadata: { partner_id: partnerId, contract_name: contract.contract_name },
  });

  revalidatePath("/admin/partenaires");
  revalidatePath(`/admin/partenaires/${partnerId}`);
}

export async function updatePartnerApiConfigurationAction(
  _previousState: PartnerActionState,
  formData: FormData,
): Promise<PartnerActionState> {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "error", message: "Connexion Supabase indisponible." };

  const partnerId = String(formData.get("partnerId") ?? "");
  if (!partnerId) return { status: "error", message: "Partenaire manquant." };

  const apiScopes = String(formData.get("apiScopes") ?? "")
    .split(/\n|,/)
    .map((scope) => scope.trim())
    .filter(Boolean);

  const apiConfig = {
    quote_endpoint: String(formData.get("quoteEndpoint") ?? "").trim(),
    subscription_endpoint: String(formData.get("subscriptionEndpoint") ?? "").trim(),
    webhook_endpoint: String(formData.get("webhookEndpoint") ?? "").trim(),
    secret_storage: String(formData.get("secretStorage") ?? "").trim(),
  };

  const { error } = await supabase
    .from("partner_companies")
    .update({
      api_enabled: formData.get("apiEnabled") === "on",
      api_provider_name: String(formData.get("apiProviderName") ?? "").trim() || null,
      api_base_url: String(formData.get("apiBaseUrl") ?? "").trim() || null,
      api_environment: String(formData.get("apiEnvironment") ?? "sandbox"),
      api_auth_mode: String(formData.get("apiAuthMode") ?? "none"),
      api_status: String(formData.get("apiStatus") ?? "not_configured"),
      api_scopes: apiScopes,
      api_config: apiConfig,
      api_notes: String(formData.get("apiNotes") ?? "").trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", partnerId);

  if (error) return { status: "error", message: error.message };

  await supabase.from("audit_logs").insert({
    actor_id: user.id,
    action: "partner_api_configuration.updated",
    target_table: "partner_companies",
    target_id: partnerId,
    metadata: { api_status: String(formData.get("apiStatus") ?? "not_configured") },
  });

  revalidatePath("/admin/partenaires");
  revalidatePath(`/admin/partenaires/${partnerId}`);
  return { status: "success", message: "Configuration API partenaire enregistree." };
}

export async function createPartnerCompanyAction(
  _previousState: PartnerActionState,
  formData: FormData,
): Promise<PartnerActionState> {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "error", message: "Connexion Supabase indisponible." };

  const name = String(formData.get("name") ?? "").trim();
  const partnerType = String(formData.get("partnerType") ?? "assureur");
  const products = formData.getAll("products").map(String).filter(Boolean);

  if (!name) {
    return { status: "error", message: "Le nom du partenaire est obligatoire." };
  }

  const { error } = await supabase.from("partner_companies").insert({
    name,
    partner_type: partnerType,
    status: String(formData.get("status") ?? "active"),
    orias_number: String(formData.get("oriasNumber") ?? "").trim() || null,
    website: String(formData.get("website") ?? "").trim() || null,
    distributed_products: products,
    commercial_contact: contactFromForm(formData, "commercial"),
    claims_contact: contactFromForm(formData, "claims"),
    complaints_contact: contactFromForm(formData, "complaints"),
    inspector_contact: contactFromForm(formData, "inspector"),
    commission_terms: {
      bulletin: String(formData.get("commissionBulletin") ?? "").trim(),
      notes: String(formData.get("commissionNotes") ?? "").trim(),
    },
    convention_signed_at: String(formData.get("conventionSignedAt") ?? "") || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
    created_by: user.id,
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  await supabase.from("audit_logs").insert({
    actor_id: user.id,
    action: "partner_company.created",
    target_table: "partner_companies",
    metadata: { name, partner_type: partnerType, products },
  });

  revalidatePath("/admin/partenaires");
  return { status: "success", message: "Fiche partenaire creee." };
}
