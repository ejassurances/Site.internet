"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { requireRole } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getProduct, isSouscriptionProduct } from "@/lib/souscription";
import { buildLettreMissionHtml, generateReference } from "@/lib/lettre-mission";

export type SouscriptionActionState = {
  status: "idle" | "success" | "error";
  message: string;
  souscriptionId?: string;
  lettreId?: string;
};

/** Reconstruit l'objet recueil depuis le FormData selon la config produit. */
function extractRecueil(product: string, formData: FormData): Record<string, unknown> {
  const def = getProduct(product);
  if (!def) return {};

  const recueil: Record<string, unknown> = {};
  for (const section of def.sections) {
    for (const field of section.fields) {
      if (field.type === "checkbox") {
        recueil[field.name] = formData.get(field.name) === "on";
      } else if (field.type === "number") {
        const raw = String(formData.get(field.name) ?? "").trim();
        recueil[field.name] = raw === "" ? "" : raw;
      } else {
        recueil[field.name] = String(formData.get(field.name) ?? "").trim();
      }
    }
  }
  return recueil;
}

export async function createSouscriptionAction(
  _previousState: SouscriptionActionState,
  formData: FormData,
): Promise<SouscriptionActionState> {
  const user = await requireRole(["admin", "courtier", "mandataire"]);
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { status: "error", message: "Supabase n'est pas encore configuré." };
  }

  const product = String(formData.get("product") ?? "");
  if (!isSouscriptionProduct(product)) {
    return { status: "error", message: "Produit de souscription inconnu." };
  }

  const clientId = String(formData.get("clientId") ?? "");
  if (!clientId) {
    return { status: "error", message: "Sélectionne la fiche client concernée." };
  }

  const { data: client } = await supabase
    .from("clients")
    .select("id, full_name, email, mandataire_id")
    .eq("id", clientId)
    .maybeSingle();

  if (!client) {
    return { status: "error", message: "Fiche client introuvable ou inaccessible." };
  }

  const mandataireId =
    user.role === "mandataire"
      ? (await supabase.from("mandataires").select("id").eq("profile_id", user.id).maybeSingle()).data?.id
      : client.mandataire_id;

  const recueil = extractRecueil(product, formData);
  const def = getProduct(product);
  const summary = `Recueil ${def?.label ?? product} — ${client.full_name ?? "client"}.`;

  const { data: souscription, error: souscriptionError } = await supabase
    .from("souscriptions")
    .insert({
      client_id: clientId,
      mandataire_id: mandataireId ?? null,
      created_by: user.id,
      product,
      status: "lettre_generee",
      recueil,
      summary,
    })
    .select("id")
    .single();

  if (souscriptionError || !souscription) {
    return {
      status: "error",
      message: souscriptionError?.message ?? "Impossible d'enregistrer le recueil.",
    };
  }

  const reference = generateReference(product);
  const contentHtml = buildLettreMissionHtml({
    reference,
    product,
    recueil,
    clientName: client.full_name ?? "Client",
    clientEmail: client.email,
  });

  const { data: lettre, error: lettreError } = await supabase
    .from("lettres_mission")
    .insert({
      souscription_id: souscription.id,
      client_id: clientId,
      product,
      reference,
      content_html: contentHtml,
      status: "a_signer",
      created_by: user.id,
    })
    .select("id")
    .single();

  if (lettreError || !lettre) {
    return {
      status: "error",
      message: `Recueil enregistré, mais la lettre de mission n'a pas pu être générée : ${
        lettreError?.message ?? "erreur inconnue"
      }`,
      souscriptionId: souscription.id,
    };
  }

  revalidatePath("/admin/souscription");
  revalidatePath("/mandataire");
  revalidatePath("/client");

  return {
    status: "success",
    message: "Recueil enregistré et lettre de mission générée. Le client peut la signer depuis son espace.",
    souscriptionId: souscription.id,
    lettreId: lettre.id,
  };
}

export type SignatureActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function signLettreMissionAction(
  _previousState: SignatureActionState,
  formData: FormData,
): Promise<SignatureActionState> {
  const user = await requireRole(["client", "admin", "courtier"]);
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { status: "error", message: "Supabase n'est pas encore configuré." };
  }

  const lettreId = String(formData.get("lettreId") ?? "");
  const signerName = String(formData.get("signerName") ?? "").trim();
  const consent = formData.get("consent") === "on";

  if (!lettreId) {
    return { status: "error", message: "Lettre de mission introuvable." };
  }
  if (!signerName) {
    return { status: "error", message: "Merci de saisir votre nom et prénom pour signer." };
  }
  if (!consent) {
    return { status: "error", message: "Vous devez cocher la case de consentement pour signer." };
  }

  const { data: lettre } = await supabase
    .from("lettres_mission")
    .select("id, status, client_id, souscription_id")
    .eq("id", lettreId)
    .maybeSingle();

  if (!lettre) {
    return { status: "error", message: "Lettre de mission introuvable ou inaccessible." };
  }
  if (lettre.status === "signee") {
    return { status: "error", message: "Cette lettre de mission est déjà signée." };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    null;

  const { error } = await supabase
    .from("lettres_mission")
    .update({
      status: "signee",
      signed_by_name: signerName,
      signed_at: new Date().toISOString(),
      signer_ip: ip,
      consent: true,
    })
    .eq("id", lettreId);

  if (error) {
    return { status: "error", message: `La signature n'a pas pu être enregistrée : ${error.message}` };
  }

  // Met à jour la souscription rattachée.
  if (lettre.souscription_id) {
    await supabase.from("souscriptions").update({ status: "signee" }).eq("id", lettre.souscription_id);
  }

  revalidatePath("/client");
  revalidatePath(`/client/lettre-mission/${lettreId}`);
  revalidatePath("/admin/souscription");

  return { status: "success", message: "Lettre de mission signée. Merci !" };
}
