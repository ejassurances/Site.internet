import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { getClient360 } from "@/lib/actions/clients";
import { ClientFile360Live } from "@/components/client-file-360-live";
import { ArrowLeft } from "lucide-react";

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

      <ClientFile360Live
        clientId={clientId}
        initialData={data}
      />
    </AppShell>
  );
}
