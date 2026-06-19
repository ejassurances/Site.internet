import { AppShell } from "@/components/app-shell";
import { ClientDirectory } from "@/components/client-directory";
import { requireRole } from "@/lib/auth";
import { getAccessibleClients } from "@/lib/clients";

export default async function MandataireDashboardPage() {
  const user = await requireRole(["mandataire"]);
  const clients = await getAccessibleClients(user);

  return (
    <AppShell role="mandataire" user={user}>
      <ClientDirectory clients={clients} basePath="/mandataire/clients" />
    </AppShell>
  );
}
