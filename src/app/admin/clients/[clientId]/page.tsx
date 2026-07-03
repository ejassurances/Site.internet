import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { getClient360 } from "@/lib/actions/clients";
import { getClientProjects } from "@/lib/actions/projects";
import { ClientFile360Live } from "@/components/client-file-360-live";
import { ArrowLeft, FileText } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function generateMetadata({ params }: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await params;
  const user = await requireRole(["admin", "courtier"]).catch(() => null);
  if (!user) return { title: "Client — EJ Assurances Admin" };
  const data = await getClient360(clientId);
  return { title: `${data?.client?.full_name ?? "Client"} — EJ Assurances Admin` };
}

export default async function AdminClientPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const user = await requireRole(["admin", "courtier"]).catch(() => null);
  if (!user) redirect("/connexion");

  const data = await getClient360(clientId);
  if (!data) notFound();
  const projects = await getClientProjects(clientId);

  const supabase = await createSupabaseServerClient();
  let emprunteurDossierId: string | null = null;
  if (supabase) {
    const { data: dos } = await supabase
      .from("emprunteur_dossiers")
      .select("id")
      .eq("client_id", clientId)
      .maybeSingle();
    emprunteurDossierId = dos?.id ?? null;
  }

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <Link href="/admin/clients" className="back-link">
            <ArrowLeft size={16} aria-hidden /> Retour à la liste
          </Link>
          <h1>{data.client.full_name ?? "Client sans nom"}</h1>
          <p className="admin-page-subtitle">
            Fiche 360° — {data.contracts.length} contrat{data.contracts.length !== 1 ? "s" : ""},{" "}
            {data.interactions.length} interaction{data.interactions.length !== 1 ? "s" : ""},{" "}
            {data.related_persons.length} personne{data.related_persons.length !== 1 ? "s" : ""} liée{data.related_persons.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="admin-page-header-actions">
          <Link href={`/admin/clients/${clientId}/modifier`} className="secondary-action">
            Modifier la fiche
          </Link>
        </div>
      </div>

      {emprunteurDossierId && (
        <Link href="/admin/emprunteur" className="emprunteur-source-banner">
          <FileText size={15} aria-hidden />
          <span>Ce client provient du tunnel Assurance Emprunteur</span>
          <span className="emprunteur-source-link">Voir le dossier →</span>
        </Link>
      )}

      <ClientFile360Live
        clientId={clientId}
        initialData={{ ...data, projects }}
      />
    </AppShell>
  );
}
