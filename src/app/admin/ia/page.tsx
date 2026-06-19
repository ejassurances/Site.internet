import { AppShell } from "@/components/app-shell";
import { AdminModulePage } from "@/components/admin-module-page";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Pilotage IA" };

const subLinks = [
  { label: "Analyse familiale IA", href: "/admin/ia/analyse-familiale", emoji: "🧠", description: "Analyse assistée par IA de la situation familiale des clients." },
  { label: "Scoring clients", href: "/admin/ia/scoring", emoji: "📊", description: "Score de risque et de priorité calculé automatiquement." },
  { label: "Recommandations", href: "/admin/ia/recommandations", emoji: "💡", description: "Recommandations de solutions personnalisées par l'IA." },
  { label: "Recueil des besoins", href: "/admin/family-protection-os/recueil", emoji: "📋", description: "Formulaire de recueil des besoins assisté par IA." },
];

export default async function IaPage() {
  const user = await requireRole(["admin", "courtier"]);
  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <AdminModulePage
        emoji="🤖"
        title="Pilotage IA"
        description="Exploitez l'intelligence artificielle pour analyser les situations familiales, scorer vos clients et générer des recommandations personnalisées."
        subLinks={subLinks}
      />
    </AppShell>
  );
}
