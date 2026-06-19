import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ClientFile } from "@/components/client-file";
import { requireRole } from "@/lib/auth";
import { getClientWithAssessments } from "@/lib/clients";

type MandataireClientPageProps = {
  params: Promise<{
    clientId: string;
  }>;
};

export default async function MandataireClientPage({ params }: MandataireClientPageProps) {
  const user = await requireRole(["mandataire"]);
  const { clientId } = await params;
  const client = await getClientWithAssessments(user, clientId);

  if (!client) {
    notFound();
  }

  return (
    <AppShell role="mandataire" user={user}>
      <ClientFile client={client} recueilHref={`/mandataire/recueil-besoins?client=${client.id}`} />
    </AppShell>
  );
}
