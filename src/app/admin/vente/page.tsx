import { AppShell } from "@/components/app-shell";
import { AdminModulePage } from "@/components/admin-module-page";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Vente, Leads & GED" };

const subLinks = [
  { label: "Pipeline commercial", href: "/admin/vente/pipeline", emoji: "🔄", description: "Visualisez et gérez votre pipeline de vente par étapes." },
  { label: "Leads entrants", href: "/admin/vente/leads", emoji: "📥", description: "Traitez les demandes de contact et leads entrants." },
  { label: "Devis & Propositions", href: "/admin/vente/devis", emoji: "📄", description: "Créez et suivez vos devis et propositions commerciales." },
  { label: "GED — Documents", href: "/admin/vente/ged", emoji: "📁", description: "Gestion électronique des documents clients et contrats." },
  { label: "Méthode cabinet (FPOS)", href: "/admin/family-protection-os", emoji: "🛡️", description: "Accédez à la méthode Family Protection OS du cabinet." },
];

export default async function VentePage() {
  const user = await requireRole(["admin", "courtier"]);
  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <AdminModulePage
        emoji="💼"
        title="Vente, Leads & GED"
        description="Pilotez votre activité commerciale, traitez les leads entrants et gérez l'ensemble de vos documents."
        subLinks={subLinks}
      />
    </AppShell>
  );
}
