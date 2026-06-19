import { AppShell } from "@/components/app-shell";
import { FamilyProtectionWorkspace } from "@/components/family-protection-workspace";
import { NeedsAssessmentForm } from "@/components/needs-assessment-form";
import { requireRole } from "@/lib/auth";
import { getAccessibleClients, toAssessmentClientOptions } from "@/lib/clients";

export default async function ClientDiagnosticFamilialPage() {
  const user = await requireRole(["client"]);
  const clients = await getAccessibleClients(user);
  const options = toAssessmentClientOptions(clients);

  return (
    <AppShell role="client" user={user}>
      <FamilyProtectionWorkspace mode="client" />
      <NeedsAssessmentForm clients={options} lockedClientId={options[0]?.id} />
    </AppShell>
  );
}
