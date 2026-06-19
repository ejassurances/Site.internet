import { AppShell } from "@/components/app-shell";
import { NeedsAssessmentForm } from "@/components/needs-assessment-form";
import { requireRole } from "@/lib/auth";
import { getAccessibleClients, toAssessmentClientOptions } from "@/lib/clients";

type AdminNeedsAssessmentPageProps = {
  searchParams: Promise<{
    client?: string;
  }>;
};

export default async function AdminNeedsAssessmentPage({ searchParams }: AdminNeedsAssessmentPageProps) {
  const user = await requireRole(["admin", "courtier"]);
  const { client } = await searchParams;
  const clients = await getAccessibleClients(user);
  const options = toAssessmentClientOptions(clients);
  const lockedClientId = client && options.some((option) => option.id === client) ? client : undefined;

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <NeedsAssessmentForm clients={options} lockedClientId={lockedClientId} />
    </AppShell>
  );
}
