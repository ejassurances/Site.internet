import { AppShell } from "@/components/app-shell";
import { AdminModulePage } from "@/components/admin-module-page";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "CRM & Productivité — EJ Partners Admin" };

const subLinks = [
  {
    label: "Fiches Clients 360°",
    href: "/admin/clients",
    emoji: "👥",
    description: "Historique, contrats, personnes liées, tags — tout centralisé sur une seule fiche.",
  },
  {
    label: "Contacts & Prospects",
    href: "/admin/crm/contacts",
    emoji: "📋",
    description: "Suivez vos prospects et contacts entrants.",
  },
  {
    label: "Agenda & RDV",
    href: "/admin/crm/agenda",
    emoji: "📅",
    description: "Planifiez et gérez vos rendez-vous cabinet.",
  },
  {
    label: "Tâches & Relances",
    href: "/admin/crm/taches",
    emoji: "✅",
    description: "Organisez vos tâches et relances quotidiennes.",
  },
];

export default async function CrmPage() {
  const user = await requireRole(["admin", "courtier"]);
  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <AdminModulePage
        emoji="🗂️"
        title="CRM & Productivité"
        description="Centralisez la gestion de vos clients 360°, contacts, agenda et tâches pour un suivi optimal du cabinet."
        subLinks={subLinks}
      />
    </AppShell>
  );
}
