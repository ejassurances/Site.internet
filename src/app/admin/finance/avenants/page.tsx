import Link from "next/link";
import { ChevronRight, FileText, Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Avenants sur contrat — Finance EJ Partners" };

export default async function AvenantsPage() {
  const user = await requireRole(["admin", "courtier"]);
  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="finance-module">
        <nav className="page-breadcrumb">
          <Link href="/admin">Accueil</Link><ChevronRight size={12} />
          <Link href="/admin/finance">Finance</Link><ChevronRight size={12} />
          <span>Avenants sur contrat</span>
        </nav>
        <div className="finance-header">
          <div>
            <p className="eyebrow">Finance & Commissions</p>
            <h1>Avenants sur contrat</h1>
            <p style={{ color: "var(--muted)", marginTop: "4px" }}>Gestion des avenants et impact sur les commissions et reversements.</p>
          </div>
          <button className="primary-action"><Plus size={18} aria-hidden /> Nouvel avenant</button>
        </div>
        <div className="empty-state" style={{ marginTop: "40px" }}>
          <FileText size={40} aria-hidden />
          <strong>Module en cours de déploiement</strong>
          <p>La gestion des avenants sur contrat et leur impact financier sera disponible prochainement.</p>
        </div>
      </div>
    </AppShell>
  );
}
