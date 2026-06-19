import { AppShell } from "@/components/app-shell";
import { NeedsAssessmentForm } from "@/components/needs-assessment-form";
import { requireRole } from "@/lib/auth";

export default async function MandataireNeedsAssessmentPage() {
  const user = await requireRole(["mandataire"]);

  return (
    <AppShell role="mandataire" user={user}>
      <NeedsAssessmentForm />
    </AppShell>
  );
}
