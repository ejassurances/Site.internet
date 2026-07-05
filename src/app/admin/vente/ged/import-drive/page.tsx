import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import {
  approveDriveCandidateAction,
  createDriveImportCandidateAction,
  getDriveImportCandidates,
  rejectDriveCandidateAction,
} from "@/lib/actions/drive-imports";
import { CheckCircle2, FolderSync, Plus, ShieldAlert, XCircle } from "lucide-react";

export const metadata = { title: "Import Drive vers CRM - EJ Assurances" };

const statusLabels: Record<string, string> = {
  pending: "A valider",
  needs_review: "A verifier",
  approved: "Approuve",
  rejected: "Rejete",
  duplicate: "Doublon possible",
  linked: "Lie au CRM",
};

export default async function DriveImportPage() {
  const user = await requireRole(["admin", "courtier"]);
  const candidates = await getDriveImportCandidates();

  async function addCandidate(formData: FormData) {
    "use server";
    await createDriveImportCandidateAction({ status: "idle", message: "" }, formData);
  }

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="ops-page">
        <nav className="page-breadcrumb" aria-label="Fil d'Ariane">
          <Link href="/admin">Accueil</Link>
          <span>/</span>
          <Link href="/admin/vente/ged">GED</Link>
          <span>/</span>
          <span>Import Drive</span>
        </nav>

        <header className="ops-hero">
          <div>
            <p className="eyebrow">Google Drive vers CRM</p>
            <h1>Creer une fiche client depuis un dossier Drive</h1>
            <p>
              Un dossier cree ou duplique dans Drive peut devenir une fiche CRM candidate. Le cabinet valide, puis le CRM
              rattache le dossier et demande la creation des sous-dossiers standards.
            </p>
          </div>
          <div className="ops-hero-badge">
            <FolderSync size={18} aria-hidden />
            Synchronisation controlee
          </div>
        </header>

        <section className="ops-grid ops-grid--two">
          <form action={addCandidate} className="ops-card ops-form">
            <div className="ops-card-title">
              <Plus size={18} aria-hidden />
              <h2>Ajouter un dossier Drive</h2>
            </div>
            <label>
              Nom du dossier
              <input name="folderName" placeholder="Client - Marie Martin - marie@email.fr" required />
            </label>
            <label>
              ID ou URL du dossier Drive
              <input name="folderIdOrUrl" placeholder="https://drive.google.com/drive/folders/..." required />
            </label>
            <label>
              Note interne
              <textarea name="notes" placeholder="Contexte, source, vigilance..." />
            </label>
            <button className="btn-primary" type="submit">Ajouter a la file CRM</button>
          </form>

          <div className="ops-card">
            <div className="ops-card-title">
              <ShieldAlert size={18} aria-hidden />
              <h2>Regle de securite</h2>
            </div>
            <ul className="ops-list">
              <li>Le CRM reste la source de verite.</li>
              <li>Drive cree seulement un candidat a valider.</li>
              <li>Un email deja connu marque le dossier comme doublon possible.</li>
              <li>Les sous-dossiers sont demandes apres validation cabinet.</li>
            </ul>
          </div>
        </section>

        <section className="ops-card">
          <div className="ops-section-header">
            <div>
              <p className="eyebrow">File de validation</p>
              <h2>Dossiers Drive detectes</h2>
            </div>
            <span className="ops-count">{candidates.length} element(s)</span>
          </div>

          <div className="ops-table">
            <div className="ops-table-row ops-table-head">
              <span>Dossier</span>
              <span>Client propose</span>
              <span>Statut</span>
              <span>Actions</span>
            </div>
            {candidates.length === 0 ? (
              <div className="ops-empty">Aucun dossier Drive en attente pour le moment.</div>
            ) : (
              candidates.map((candidate) => (
                <div key={candidate.id} className="ops-table-row">
                  <div>
                    <strong>{candidate.folder_name}</strong>
                    <small>{candidate.google_drive_folder_id}</small>
                    {candidate.folder_url && (
                      <a href={candidate.folder_url} target="_blank" rel="noreferrer">Ouvrir dans Drive</a>
                    )}
                  </div>
                  <div>
                    <strong>{candidate.parsed_full_name ?? "A qualifier"}</strong>
                    <small>{candidate.parsed_email ?? "Email non detecte"}</small>
                  </div>
                  <div>
                    <span className={`ops-status ops-status--${candidate.status}`}>
                      {statusLabels[candidate.status] ?? candidate.status}
                    </span>
                    <small>Sous-dossiers : {candidate.subfolders_status}</small>
                  </div>
                  <div className="ops-actions">
                    <form action={approveDriveCandidateAction}>
                      <input type="hidden" name="candidateId" value={candidate.id} />
                      <button type="submit" className="ops-icon-action" title="Valider et lier au CRM">
                        <CheckCircle2 size={16} aria-hidden />
                      </button>
                    </form>
                    <form action={rejectDriveCandidateAction}>
                      <input type="hidden" name="candidateId" value={candidate.id} />
                      <button type="submit" className="ops-icon-action ops-icon-action--danger" title="Rejeter">
                        <XCircle size={16} aria-hidden />
                      </button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
