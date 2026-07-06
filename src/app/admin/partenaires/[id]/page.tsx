import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Network, Mail, Phone, IdCard, FolderOpen, ExternalLink } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PartenaireDrive } from "@/components/partenaire-drive";
import { PartenaireEnsureDrive } from "@/components/partenaire-ensure-drive";

type PageProps = { params: Promise<{ id: string }> };

const TYPE_LABEL: Record<string, string> = {
  mandataire: "Mandataire",
  courtier_partenaire: "Courtier partenaire",
  apporteur: "Apporteur d'affaires",
  prescripteur: "Prescripteur",
};

export default async function PartenaireDetailPage({ params }: PageProps) {
  const user = await requireRole(["admin", "courtier"]).catch(() => null);
  if (!user) redirect("/connexion");

  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: partenaire } = await supabase
    .from("mandataires")
    .select("id, company_name, contact_name, contact_email, phone, orias_number, partner_type, notes, google_drive_folder_id")
    .eq("id", id)
    .maybeSingle();

  if (!partenaire) notFound();

  const driveUrl = partenaire.google_drive_folder_id
    ? `https://drive.google.com/drive/folders/${partenaire.google_drive_folder_id}`
    : null;

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <Link href="/admin/partenaires" className="back-link">
            <ArrowLeft size={16} aria-hidden /> Retour aux partenaires
          </Link>
          <h1>
            <Network size={22} aria-hidden /> {partenaire.company_name ?? "Partenaire"}
          </h1>
          <p className="admin-page-subtitle">{TYPE_LABEL[partenaire.partner_type ?? "mandataire"]}</p>
        </div>
      </div>

      <div className="admin-form-container">
        <section className="souscription-card">
          <h3>Coordonnées</h3>
          <ul className="partenaire-info">
            {partenaire.contact_name && (
              <li>
                <IdCard size={15} aria-hidden /> {partenaire.contact_name}
              </li>
            )}
            {partenaire.contact_email && (
              <li>
                <Mail size={15} aria-hidden />{" "}
                <a href={`mailto:${partenaire.contact_email}`}>{partenaire.contact_email}</a>
              </li>
            )}
            {partenaire.phone && (
              <li>
                <Phone size={15} aria-hidden /> {partenaire.phone}
              </li>
            )}
            {partenaire.orias_number && (
              <li>
                <IdCard size={15} aria-hidden /> ORIAS : {partenaire.orias_number}
              </li>
            )}
          </ul>
          {partenaire.notes && <p className="field-hint">{partenaire.notes}</p>}
        </section>

        <section className="souscription-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
              <FolderOpen size={18} aria-hidden /> Dossier Drive
            </h3>
            {driveUrl && (
              <a className="back-link" href={driveUrl} target="_blank" rel="noopener noreferrer">
                Ouvrir dans Drive <ExternalLink size={13} aria-hidden />
              </a>
            )}
          </div>

          {partenaire.google_drive_folder_id ? (
            <div style={{ marginTop: 16 }}>
              <PartenaireDrive folderId={partenaire.google_drive_folder_id} />
            </div>
          ) : (
            <div style={{ marginTop: 12 }}>
              <p className="field-hint">
                Aucun dossier Drive n&apos;est associé à ce partenaire.
              </p>
              <PartenaireEnsureDrive mandataireId={partenaire.id} />
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
