import { AppShell } from "@/components/app-shell";
import { AdminModulePage } from "@/components/admin-module-page";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Conformité" };

const subLinks = [
  { label: "Classeurs ACPR", href: "/admin/conformite/acpr", emoji: "📂", description: "Gérez les classeurs réglementaires ACPR de vos clients." },
  { label: "DDA & Devoir de conseil", href: "/admin/conformite/dda", emoji: "⚖️", description: "Suivi du devoir de conseil et des exigences DDA." },
  { label: "RGPD", href: "/admin/conformite/rgpd", emoji: "🔒", description: "Gestion des consentements et conformité RGPD." },
  { label: "Journal d'audit", href: "/admin/conformite/audit", emoji: "📜", description: "Traçabilité complète des actions et modifications." },
];

export default async function ConformitePage() {
  const user = await requireRole(["admin", "courtier"]);
  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <AdminModulePage
        emoji="⚖️"
        title="Conformité"
        description="Assurez la conformité réglementaire du cabinet : classeurs ACPR, devoir de conseil DDA, RGPD et journal d'audit."
        subLinks={subLinks}
      />
    </AppShell>
  );
}
