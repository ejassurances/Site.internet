import { AppShell } from "@/components/app-shell";
import { AdminModulePage } from "@/components/admin-module-page";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Workflows" };

const subLinks = [
  {
    label: "Automatisations",
    href: "/admin/workflows/automatisations",
    emoji: "Auto",
    description: "Creez des automatisations pour vos processus recurrents.",
  },
  {
    label: "Assurance trottinette",
    href: "/admin/workflows/trottinette",
    emoji: "EDPM",
    description: "Recueil 25 km/h, utilisateurs du foyer fiscal et extension recommandee.",
  },
  {
    label: "Statuts de dossier",
    href: "/admin/workflows/statuts",
    emoji: "Statut",
    description: "Configurez les statuts et etapes de vos dossiers clients.",
  },
  {
    label: "Modeles de documents",
    href: "/admin/workflows/templates",
    emoji: "Doc",
    description: "Gerez vos modeles de courriers, emails et documents.",
  },
  {
    label: "Notifications",
    href: "/admin/workflows/notifications",
    emoji: "Notif",
    description: "Parametrez les alertes et notifications automatiques.",
  },
];

export default async function WorkflowsPage() {
  const user = await requireRole(["admin", "courtier"]);
  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <AdminModulePage
        emoji="Auto"
        title="Workflows"
        description="Automatisez vos processus metier, configurez les statuts de dossiers et gerez vos modeles de documents."
        subLinks={subLinks}
      />
    </AppShell>
  );
}
