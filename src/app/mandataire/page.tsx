import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";

export default async function MandataireDashboardPage() {
  const user = await requireRole(["mandataire"]);

  return <AppShell role="mandataire" user={user} />;
}
