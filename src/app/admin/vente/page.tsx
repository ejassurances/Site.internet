import { AppShell } from "@/components/app-shell";
import { AdminModulePage } from "@/components/admin-module-page";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Vente, Leads & GED" };

const subLinks = [
  {
    label: "Pipeline commercial",
    href: "/admin/vente/pipeline",
    emoji: "Pipe",
    description: "Visualisez et gerez votre pipeline de vente par etapes.",
  },
  {
    label: "Leads entrants",
    href: "/admin/vente/leads",
    emoji: "Lead",
    description: "Traitez les demandes de contact et leads entrants.",
  },
  {
    label: "Devis & Propositions",
    href: "/admin/vente/devis",
    emoji: "Devis",
    description: "Creez et suivez vos devis et propositions commerciales.",
  },
  {
    label: "GED - Documents",
    href: "/admin/vente/ged",
    emoji: "GED",
    description: "Gestion electronique des documents clients et contrats.",
  },
  {
    label: "Import Drive vers CRM",
    href: "/admin/vente/ged/import-drive",
    emoji: "Drive",
    description: "Detectez un dossier Drive et creez une fiche client candidate.",
  },
  {
    label: "Methode cabinet (FPOS)",
    href: "/admin/family-protection-os",
    emoji: "FPOS",
    description: "Accedez a la methode Family Protection OS du cabinet.",
  },
];

export default async function VentePage() {
  const user = await requireRole(["admin", "courtier"]);
  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <AdminModulePage
        emoji="Vente"
        title="Vente, Leads & GED"
        description="Pilotez votre activite commerciale, traitez les leads entrants et gerez l'ensemble de vos documents."
        subLinks={subLinks}
      />
    </AppShell>
  );
}
