import { AppShell } from "@/components/app-shell";
import { AdminModulePage } from "@/components/admin-module-page";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "CRM & Productivité" };

const subLinks = [
  { label: "Clients", href: "/admin/clients", emoji: "👥", description: "Gérez vos dossiers clients, fiches et historiques." },
  { label: "Contacts & Prospects", href: "/admin/crm/contacts", emoji: "📋", description: "Suivez vos prospects et contacts entrants." },
  { label: "Agenda & RDV", href: "/admin/crm/agenda", emoji: "📅", description: "Planifiez et gérez vos rendez-vous cabinet." },
  { label: "Tâches", href: "/admin/crm/taches", emoji: "✅", description: "Organisez vos tâches et relances quotidiennes." },
];

export default async function CrmPage() {
  const user = await requireRole(["admin", "courtier"]);
  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <AdminModulePage
        emoji="🗂️"
        title="CRM & Productivité"
        description="Centralisez la gestion de vos clients, contacts, agenda et tâches pour un suivi optimal du cabinet."
        subLinks={subLinks}
      />
    </AppShell>
  );
}
