import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ClientFile } from "@/components/client-file";
import { requireRole } from "@/lib/auth";
import { getClientWithAssessments } from "@/lib/clients";

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

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <ClientFile client={client} recueilHref={`/admin/family-protection-os/recueil?client=${client.id}`} />
    </AppShell>
  );
}
