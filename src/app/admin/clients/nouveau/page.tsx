import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { ClientForm } from "@/components/forms/client-form";

export const metadata = { title: "Nouvelle fiche client - EJ Assurances Admin" };

export default async function NouveauClientPage() {
  const user = await requireRole(["admin", "courtier"]).catch(() => null);
  if (!user) redirect("/connexion");

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="admin-page-header admin-client-create-hero">
        <div className="admin-page-header-left">
          <Link href="/admin/clients" className="back-link">
            <ArrowLeft size={16} aria-hidden /> Retour a la liste
          </Link>
          <h1><UserPlus size={22} aria-hidden /> Nouvelle fiche client</h1>
          <p className="admin-page-subtitle">
            Creez une fiche 360 exploitable pour le conseil, la conformite, les projets
            assurance emprunteur et la protection familiale.
          </p>
        </div>
      </div>

      <div className="admin-client-create-layout">
        <aside className="admin-create-rail" aria-label="Qualite de la fiche">
          <article>
            <ShieldCheck size={18} aria-hidden />
            <h2>Fiche propre</h2>
            <p>Les champs vides sont enregistres proprement, sans bloquer Supabase.</p>
          </article>
          <article>
            <Sparkles size={18} aria-hidden />
            <h2>Vision famille</h2>
            <p>Le contexte familial alimente ensuite les projets, le recueil et le devoir de conseil.</p>
          </article>
          <article>
            <FileText size={18} aria-hidden />
            <h2>Suite logique</h2>
            <p>Une fois creee, la fiche peut recevoir un projet emprunteur ou protection familiale.</p>
          </article>
        </aside>

        <div className="admin-form-container admin-form-container--client">
          <ClientForm mode="create" />
        </div>
      </div>
    </AppShell>
  );
}
