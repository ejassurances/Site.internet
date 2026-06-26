import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ResumeClientModule } from "@/components/ia/resume-client";
import Link from "next/link";

export const metadata = { title: "Résumé de fiche client — IaGO | EJ Partners" };

export default async function ResumeClientPage() {
  const user = await requireRole(["admin", "courtier"]);
  const supabase = await createSupabaseServerClient();
    if (!supabase) return null;

  const { data: clients } = await supabase
    .from("clients")
    .select("id, first_name, last_name, email")
    .order("last_name", { ascending: true });

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="ia-module-page">
        <div className="ia-module-page-header">
          <Link href="/admin/ia" className="ia-back-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Retour aux modules IA
          </Link>
          <div className="ia-eyebrow">📋 Résumé de fiche client</div>
          <h1 className="ia-page-title">Synthèse avant rendez-vous</h1>
          <p className="ia-page-subtitle">
            IaGO synthétise tout l&apos;historique d&apos;un client en 5 points clés pour vous préparer en quelques secondes.
          </p>
        </div>
        <ResumeClientModule clients={clients || []} />
      </div>
    </AppShell>
  );
}
