import { AppShell } from "@/components/app-shell";
import { AdminModulePage } from "@/components/admin-module-page";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Workflows" };

const subLinks = [
  { label: "Automatisations", href: "/admin/workflows/automatisations", emoji: "⚡", description: "Créez des automatisations pour vos processus récurrents." },
  { label: "Statuts de dossier", href: "/admin/workflows/statuts", emoji: "🏷️", description: "Configurez les statuts et étapes de vos dossiers clients." },
  { label: "Modèles de documents", href: "/admin/workflows/templates", emoji: "📝", description: "Gérez vos modèles de courriers, emails et documents." },
  { label: "Notifications", href: "/admin/workflows/notifications", emoji: "🔔", description: "Paramétrez les alertes et notifications automatiques." },
];

export default async function WorkflowsPage() {
  const user = await requireRole(["admin", "courtier"]);
  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <AdminModulePage
        emoji="⚙️"
        title="Workflows"
        description="Automatisez vos processus métier, configurez les statuts de dossiers et gérez vos modèles de documents."
        subLinks={subLinks}
      />
    </AppShell>
  );
}
