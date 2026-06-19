import { AppShell } from "@/components/app-shell";
import { FamilyProtectionWorkspace } from "@/components/family-protection-workspace";
import { NeedsAssessmentForm } from "@/components/needs-assessment-form";
import { requireRole } from "@/lib/auth";

export default async function ClientDiagnosticFamilialPage() {
  const user = await requireRole(["client"]);

  return (
    <AppShell role="client" user={user}>
      <FamilyProtectionWorkspace mode="client" />
      <NeedsAssessmentForm />
    </AppShell>
  );
}
