import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { getClient360 } from "@/lib/actions/clients";
import { ClientForm } from "@/components/forms/client-form";
import { ArrowLeft, Edit } from "lucide-react";

export const metadata = { title: "Modifier le client — EJ Partners Assurances Admin" };

export default async function ModifierClientPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const user = await requireRole(["admin", "courtier"]).catch(() => null);
  if (!user) redirect("/connexion");

  const data = await getClient360(clientId);
  if (!data) notFound();

  const { client, tags } = data;

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <Link href={`/admin/clients/${clientId}`} className="back-link">
            <ArrowLeft size={16} aria-hidden /> Retour à la fiche
          </Link>
          <h1><Edit size={22} aria-hidden /> Modifier — {client.full_name ?? "Client"}</h1>
        </div>
      </div>

      <div className="admin-form-container">
        <ClientForm
          mode="edit"
          initialData={{
            id: clientId,
            full_name: client.full_name ?? "",
            email: client.email ?? "",
            phone: client.phone ?? "",
            date_naissance: (client as { date_naissance?: string }).date_naissance ?? "",
            adresse: (client as { adresse?: string }).adresse ?? "",
            code_postal: (client as { code_postal?: string }).code_postal ?? "",
            ville: (client as { ville?: string }).ville ?? "",
            situation_familiale: (client as { situation_familiale?: string }).situation_familiale ?? "",
            family_context: client.family_context ?? "",
            statut_client: ((client as { statut_client?: string }).statut_client ?? "prospect") as "prospect" | "actif" | "en_cours" | "inactif",
            source_acquisition: (client as { source_acquisition?: string }).source_acquisition ?? "",
            notes: client.notes ?? "",
            tags,
          }}
        />
      </div>
    </AppShell>
  );
}
