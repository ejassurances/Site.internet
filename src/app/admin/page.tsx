import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const user = await requireRole(["admin", "courtier"]);

  return <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user} />;
}
