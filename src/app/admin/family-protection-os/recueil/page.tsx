import { AppShell } from "@/components/app-shell";
import { NeedsAssessmentForm } from "@/components/needs-assessment-form";
import { requireRole } from "@/lib/auth";

export default async function AdminNeedsAssessmentPage() {
  const user = await requireRole(["admin", "courtier"]);

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <NeedsAssessmentForm />
    </AppShell>
  );
}
