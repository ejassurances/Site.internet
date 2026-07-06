"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { requireRole } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { buildLettreMissionHtml, generateReference, PRODUCT_LABELS } from "@/lib/lettre-mission";

export type LettreMissionActionState = {
  status: "idle" | "success" | "error";
  message: string;
  lettreId?: string;
};

export type LettreMissionRow = {
  id: string;
  client_id: string;
  product: string;
  reference: string;
  objet: string | null;
  status: string;
  signed_by_name: string | null;
  signed_at: string | null;
  signer_ip: string | null;
  created_at: string;
  content_html?: string;
};

export async function getLettresMission(): Promise<Array<LettreMissionRow & { client_name: string | null }>> {
  await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("lettres_mission")
    .select("id, client_id, product, reference, objet, status, signed_by_name, signed_at, signer_ip, created_at, client:clients(full_name)")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    (data as Array<LettreMissionRow & { client: { full_name: string | null }[] | null }> | null)?.map((row) => ({
      ...row,
      client_name: row.client?.[0]?.full_name ?? null,
    })) ?? []
  );
}

export async function createLettreMissionAction(
  _previousState: LettreMissionActionState,
  formData: FormData,
): Promise<LettreMissionActionState> {
  await requireRole(["admin", "courtier", "mandataire"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Supabase n'est pas encore configuré." };
  }

  const clientId = String(formData.get("clientId") ?? "");
  const product = String(formData.get("product") ?? "");
  const objet = String(formData.get("objet") ?? "").trim();
  const besoins = String(formData.get("besoins") ?? "").trim();
  const guaranteesRaw = String(formData.get("guarantees") ?? "").trim();

  if (!clientId) {
    return { status: "error", message: "Sélectionne la fiche client concernée." };
  }
  if (!PRODUCT_LABELS[product]) {
    return { status: "error", message: "Produit inconnu." };
  }

  const { data: client } = await supabase
    .from("clients")
    .select("id, full_name, email")
    .eq("id", clientId)
    .maybeSingle();

  if (!client) {
    return { status: "error", message: "Fiche client introuvable ou inaccessible." };
  }

  const guarantees = guaranteesRaw
    ? guaranteesRaw.split("\n").map((g) => g.trim()).filter(Boolean)
    : undefined;

  const reference = generateReference(product);
  const contentHtml = buildLettreMissionHtml({
    reference,
    product,
    objet: objet || null,
    besoins: besoins || null,
    guarantees,
    clientName: client.full_name ?? "Client",
    clientEmail: client.email,
  });

  const { data: lettre, error } = await supabase
    .from("lettres_mission")
    .insert({
      client_id: clientId,
      product,
      reference,
      objet: objet || null,
      content_html: contentHtml,
      status: "a_signer",
    })
    .select("id")
    .single();

  if (error || !lettre) {
    return { status: "error", message: error?.message ?? "Impossible de générer la lettre de mission." };
  }

  revalidatePath("/admin/lettres-mission");
  revalidatePath("/client");

  return {
    status: "success",
    message: "Lettre de mission générée. Le client peut la signer depuis son espace.",
    lettreId: lettre.id,
  };
}

export type SignatureActionState = { status: "idle" | "success" | "error"; message: string };

export async function signLettreMissionAction(
  _previousState: SignatureActionState,
  formData: FormData,
): Promise<SignatureActionState> {
  await requireRole(["client", "admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Supabase n'est pas encore configuré." };
  }

  const lettreId = String(formData.get("lettreId") ?? "");
  const signerName = String(formData.get("signerName") ?? "").trim();
  const consent = formData.get("consent") === "on";

  if (!lettreId) return { status: "error", message: "Lettre de mission introuvable." };
  if (!signerName) return { status: "error", message: "Merci de saisir votre nom et prénom pour signer." };
  if (!consent) return { status: "error", message: "Vous devez cocher la case de consentement pour signer." };

  const { data: lettre } = await supabase
    .from("lettres_mission")
    .select("id, status")
    .eq("id", lettreId)
    .maybeSingle();

  if (!lettre) return { status: "error", message: "Lettre de mission introuvable ou inaccessible." };
  if (lettre.status === "signee") return { status: "error", message: "Cette lettre de mission est déjà signée." };

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || headerList.get("x-real-ip") || null;

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

  revalidatePath("/client");
  revalidatePath(`/client/lettre-mission/${lettreId}`);
  revalidatePath("/admin/lettres-mission");

  return { status: "success", message: "Lettre de mission signée. Merci !" };
}
