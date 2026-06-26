import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import { CrossSellingModule } from "@/components/ia/cross-selling";
import Link from "next/link";

export const metadata = { title: "Analyse & Cross-Selling — IaGO | EJ Partners" };

export default async function CrossSellingPage() {
  const user = await requireRole(["admin", "courtier"]);

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="ia-module-page">
        <div className="ia-module-page-header">
          <Link href="/admin/ia" className="ia-back-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Retour aux modules IA
          </Link>
          <div className="ia-eyebrow">🎯 Analyse & Cross-Selling</div>
          <h1 className="ia-page-title">Scanner de portefeuille</h1>
          <p className="ia-page-subtitle">
            IaGO scanne votre portefeuille pour identifier les garanties manquantes et les opportunités de multi-équipement.
          </p>
        </div>
        <CrossSellingModule />
      </div>
    </AppShell>
  );
}
