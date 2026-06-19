import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ClientFile360 } from "@/components/client-file-360";
import { requireRole } from "@/lib/auth";
import { getClientWithAssessments } from "@/lib/clients";
import type { ClientFull } from "@/components/client-file-360";

type AdminClientPageProps = {
  params: Promise<{
    clientId: string;
  }>;
};

export default async function AdminClientPage({ params }: AdminClientPageProps) {
  const user = await requireRole(["admin", "courtier"]);
  const { clientId } = await params;
  const client = await getClientWithAssessments(user, clientId);

  if (!client) {
    notFound();
  }

  // Données enrichies 360° — à connecter à Supabase ultérieurement
  const client360: ClientFull = {
    ...client,
    status: "actif",
    family_type: client.family_context ?? null,
    tags: [],
    interactions: [],
    contracts: [],
    linked_persons: [],
  };

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <ClientFile360
        client={client360}
        recueilHref={`/admin/family-protection-os/recueil?client=${client.id}`}
      />
    </AppShell>
  );
}
