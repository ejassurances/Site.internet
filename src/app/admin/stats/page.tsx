import { AppShell } from "@/components/app-shell";
import { AdminModulePage } from "@/components/admin-module-page";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Stats & Analyses" };

const subLinks = [
  { label: "Performance cabinet", href: "/admin/stats/performance", emoji: "📈", description: "KPIs globaux, taux de conversion et évolution du CA." },
  { label: "Rapports clients", href: "/admin/stats/clients", emoji: "👥", description: "Analyse du portefeuille clients et segmentation." },
  { label: "Rapports financiers", href: "/admin/stats/finance", emoji: "💹", description: "Analyse des commissions, revenus et projections." },
  { label: "Exports", href: "/admin/stats/exports", emoji: "📤", description: "Exportez vos données en CSV, Excel ou PDF." },
];

export default async function StatsPage() {
  const user = await requireRole(["admin", "courtier"]);
  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <AdminModulePage
        emoji="📊"
        title="Stats & Analyses"
        description="Analysez la performance du cabinet avec des KPIs détaillés, des rapports clients et financiers, et des exports de données."
        subLinks={subLinks}
      />
    </AppShell>
  );
}
