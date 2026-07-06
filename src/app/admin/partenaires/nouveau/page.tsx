import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, UserPlus } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { PartenaireForm } from "@/components/forms/partenaire-form";

export const metadata = { title: "Nouveau partenaire — EJ Assurances Admin" };

export default async function NouveauPartenairePage() {
  const user = await requireRole(["admin", "courtier"]).catch(() => null);
  if (!user) redirect("/connexion");

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <Link href="/admin/partenaires" className="back-link">
            <ArrowLeft size={16} aria-hidden /> Retour aux partenaires
          </Link>
          <h1>
            <UserPlus size={22} aria-hidden /> Nouveau partenaire
          </h1>
          <p className="admin-page-subtitle">
            Créez une fiche partenaire. Un dossier Google Drive dédié sera créé automatiquement
            (convention signée, contrats d&apos;assurance distribués, attestations…).
          </p>
        </div>
      </div>

      <div className="admin-form-container">
        <PartenaireForm />
      </div>
    </AppShell>
  );
}
