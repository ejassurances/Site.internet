import { AppShell } from "@/components/app-shell";
import { AdminModulePage } from "@/components/admin-module-page";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Finance & Coms" };

const subLinks = [
  { label: "Commissions", href: "/admin/finance/commissions", emoji: "💳", description: "Suivi des commissions par contrat, compagnie et période." },
  { label: "Mandataires", href: "/admin/mandataire", emoji: "🤝", description: "Gestion des mandataires et de leurs portefeuilles." },
  { label: "Prescripteurs", href: "/admin/prescripteur", emoji: "🌐", description: "Suivi des prescripteurs et partenaires apporteurs." },
  { label: "Facturation", href: "/admin/finance/facturation", emoji: "🧾", description: "Émission et suivi des factures et honoraires." },
];

export default async function FinancePage() {
  const user = await requireRole(["admin", "courtier"]);
  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <AdminModulePage
        emoji="💰"
        title="Finance & Coms"
        description="Pilotez vos commissions, gérez mandataires et prescripteurs, et suivez la facturation du cabinet."
        subLinks={subLinks}
      />
    </AppShell>
  );
}
