import Link from "next/link";
import { ChevronRight, CreditCard, Plus, Download } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Encaissements & SEPA — Finance EJ Partners" };

export default async function EncaissementsPage() {
  const user = await requireRole(["admin", "courtier"]);
  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="finance-module">
        <nav className="page-breadcrumb">
          <Link href="/admin">Accueil</Link><ChevronRight size={12} />
          <Link href="/admin/finance">Finance</Link><ChevronRight size={12} />
          <span>Encaissements & SEPA</span>
        </nav>
        <div className="finance-header">
          <div>
            <p className="eyebrow">Finance & Commissions</p>
            <h1>Encaissements & SEPA</h1>
            <p style={{ color: "var(--muted)", marginTop: "4px" }}>Suivi fin des encaissements, prélèvements SEPA clients et génération des quittances.</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="primary-action"><Plus size={18} aria-hidden /> Nouveau prélèvement</button>
            <button className="secondary-action"><Download size={16} aria-hidden /> Export SEPA XML</button>
          </div>
        </div>
        <div className="empty-state" style={{ marginTop: "40px" }}>
          <CreditCard size={40} aria-hidden />
          <strong>Module en cours de déploiement</strong>
          <p>La gestion des prélèvements SEPA, quittances et encaissements sera disponible prochainement.</p>
        </div>
      </div>
    </AppShell>
  );
}
