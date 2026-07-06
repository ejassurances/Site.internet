import Link from "next/link";
import { redirect } from "next/navigation";
import { Network, UserPlus, FolderCheck, FolderX } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = { title: "Partenaires — EJ Assurances Admin" };

const TYPE_LABEL: Record<string, string> = {
  mandataire: "Mandataire",
  courtier_partenaire: "Courtier partenaire",
  apporteur: "Apporteur d'affaires",
  prescripteur: "Prescripteur",
};

export default async function PartenairesPage() {
  const user = await requireRole(["admin", "courtier"]).catch(() => null);
  if (!user) redirect("/connexion");

  const supabase = await createSupabaseServerClient();
  let partenaires: Array<{
    id: string;
    company_name: string | null;
    contact_name: string | null;
    partner_type: string | null;
    google_drive_folder_id: string | null;
  }> = [];

  if (supabase) {
    const { data } = await supabase
      .from("mandataires")
      .select("id, company_name, contact_name, partner_type, google_drive_folder_id")
      .order("created_at", { ascending: false });
    partenaires = (data as typeof partenaires) ?? [];
  }

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h1>
            <Network size={22} aria-hidden /> Partenaires
          </h1>
          <p className="admin-page-subtitle">
            Fiches partenaires (mandataires, apporteurs, prescripteurs). Chaque nouvelle fiche crée
            automatiquement un dossier Google Drive dédié (convention signée, contrats distribués…).
          </p>
        </div>
        <Link href="/admin/partenaires/nouveau" className="primary-action">
          <UserPlus size={16} aria-hidden /> Nouveau partenaire
        </Link>
      </div>

      <div className="admin-form-container">
        {partenaires.length === 0 ? (
          <p className="field-hint">Aucun partenaire enregistré.</p>
        ) : (
          <table className="stats-table">
            <thead>
              <tr>
                <th>Partenaire</th>
                <th>Type</th>
                <th>Contact</th>
                <th>Dossier Drive</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {partenaires.map((p) => (
                <tr key={p.id}>
                  <td className="stats-td-bold">{p.company_name ?? "—"}</td>
                  <td>{TYPE_LABEL[p.partner_type ?? "mandataire"] ?? p.partner_type}</td>
                  <td>{p.contact_name ?? "—"}</td>
                  <td>
                    {p.google_drive_folder_id ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "#065f46" }}>
                        <FolderCheck size={15} aria-hidden /> Créé
                      </span>
                    ) : (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "#92400e" }}>
                        <FolderX size={15} aria-hidden /> Absent
                      </span>
                    )}
                  </td>
                  <td>
                    <Link className="back-link" href={`/admin/partenaires/${p.id}`}>
                      Ouvrir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppShell>
  );
}
