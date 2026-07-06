import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { LettreMissionView } from "@/components/lettre-mission-view";

type PageProps = { params: Promise<{ id: string }> };

export const metadata = { title: "Lettre de mission — EJ Assurances" };

export default async function LettreMissionPage({ params }: PageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion");

  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: lettre } = await supabase
    .from("lettres_mission")
    .select("id, reference, content_html, status, signed_by_name, signed_at, signer_ip, client_id")
    .eq("id", id)
    .maybeSingle();

  if (!lettre) notFound();

  let canSign = false;
  if (user.role === "client") {
    const { data: client } = await supabase
      .from("clients")
      .select("id")
      .eq("profile_id", user.id)
      .maybeSingle();
    canSign = Boolean(client && client.id === lettre.client_id);
  }

  const backHref = user.role === "client" ? "/client" : "/admin/lettres-mission";

  return (
    <main className="lm-page">
      <Link href={backHref} className="back-link">
        <ArrowLeft size={16} aria-hidden /> Retour
      </Link>
      <LettreMissionView
        lettre={{
          id: lettre.id,
          reference: lettre.reference,
          contentHtml: lettre.content_html,
          status: lettre.status,
          signedByName: lettre.signed_by_name,
          signedAt: lettre.signed_at,
          signerIp: lettre.signer_ip,
        }}
        canSign={canSign}
      />
    </main>
  );
}
