import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import { CopilotChat } from "@/components/ia/copilot-chat";
import Link from "next/link";

export const metadata = { title: "Copilot IaGO | EJ Partners" };

export default async function CopilotPage() {
  const user = await requireRole(["admin", "courtier"]);
  const userName = user.fullName || user.email?.split("@")[0] || "Courtier";

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="ia-copilot-page">
        <div className="ia-copilot-page-header">
          <Link href="/admin/ia" className="ia-back-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Retour aux modules IA
          </Link>
          <div className="ia-copilot-page-title-row">
            <div>
              <div className="ia-eyebrow">🤖 Copilot IA</div>
              <h1 className="ia-page-title">IaGO — Agent Copilot Omniscient</h1>
              <p className="ia-page-subtitle">
                IaGO analyse vos données CRM en temps réel pour répondre à vos questions et préparer des actions concrètes.
              </p>
            </div>
            <div className="ia-copilot-model-badge">
              <span className="ia-model-dot" />
              GPT-4o • Actif
            </div>
          </div>
        </div>
        <CopilotChat userName={userName} />
      </div>
    </AppShell>
  );
}
