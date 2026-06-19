import { AppShell } from "@/components/app-shell";
import { ClientDirectory } from "@/components/client-directory";
import { requireRole } from "@/lib/auth";
import { getAccessibleClients } from "@/lib/clients";

export default async function AdminDashboardPage() {
  const user = await requireRole(["admin", "courtier"]);
  const clients = await getAccessibleClients(user);

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <ClientDirectory clients={clients} basePath="/admin/clients" />
    </AppShell>
  );
}
