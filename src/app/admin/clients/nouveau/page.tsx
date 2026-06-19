import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { ClientForm } from "@/components/forms/client-form";
import { UserPlus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Nouveau client — EJ Assurances Admin" };

export default async function NouveauClientPage() {
  const user = await requireRole(["admin", "courtier"]).catch(() => null);
  if (!user) redirect("/connexion");

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <Link href="/admin/clients" className="back-link">
            <ArrowLeft size={16} aria-hidden /> Retour à la liste
          </Link>
          <h1><UserPlus size={22} aria-hidden /> Nouveau client</h1>
          <p className="admin-page-subtitle">
            Créez une nouvelle fiche client 360°. Vous pourrez ensuite ajouter des contrats,
            des interactions et des personnes liées depuis la fiche.
          </p>
        </div>
      </div>

      <div className="admin-form-container">
        <ClientForm mode="create" />
      </div>
    </AppShell>
  );
}
