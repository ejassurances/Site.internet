import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import { RedactionModule } from "@/components/ia/redaction";
import Link from "next/link";

export const metadata = { title: "Assistance à la rédaction — IaGO | EJ Partners" };

export default async function RedactionPage() {
  const user = await requireRole(["admin", "courtier"]);

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="ia-module-page">
        <div className="ia-module-page-header">
          <Link href="/admin/ia" className="ia-back-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Retour aux modules IA
          </Link>
          <div className="ia-eyebrow">✍️ Assistance à la rédaction</div>
          <h1 className="ia-page-title">Génération de documents</h1>
          <p className="ia-page-subtitle">
            Emails commerciaux, réponses aux objections, courriers de résiliation — rédigés avec le ton juste, zéro faute.
          </p>
        </div>
        <RedactionModule />
      </div>
    </AppShell>
  );
}
