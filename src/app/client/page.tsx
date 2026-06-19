import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";

export default async function ClientDashboardPage() {
  const user = await requireRole(["client"]);

  return <AppShell role="client" user={user} />;
}
