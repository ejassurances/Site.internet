import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import {
  approveDriveCandidateAction,
  createDriveDocumentSyncAction,
  createDriveImportCandidateAction,
  getDriveImportCandidates,
  getDriveNomenclatureRules,
  getDriveSyncedDocuments,
  rejectDriveCandidateAction,
  requestContractFolderRenameAction,
} from "@/lib/actions/drive-imports";
import { CheckCircle2, FileCheck2, FolderSync, Plus, ShieldAlert, XCircle } from "lucide-react";

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
  const [candidates, documents, rules] = await Promise.all([
    getDriveImportCandidates(),
    getDriveSyncedDocuments(),
    getDriveNomenclatureRules(),
  ]);

  async function addCandidate(formData: FormData) {
    "use server";
    await createDriveImportCandidateAction({ status: "idle", message: "" }, formData);
  }

  async function addDocument(formData: FormData) {
    "use server";
    await createDriveDocumentSyncAction({ status: "idle", message: "" }, formData);
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
              Les dossiers et documents crees dans Drive remontent dans le CRM avec une nomenclature controlee. Le CRM
              peut aussi demander la creation des sous-dossiers et le renommage DOX vers CTT lors du passage en contrat.
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
              <input name="folderName" placeholder="DOX_ADP_Marie_MARTIN" required />
            </label>
            <label>
              Type de produit
              <select name="productCode" defaultValue="">
                <option value="">Detecter depuis le nom</option>
                <option value="ADP">ADP - Assurance de pret</option>
                <option value="PREV">PREV - Prevoyance</option>
                <option value="TROT">TROT - Trottinette</option>
              </select>
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
              <li>Dossier projet : DOX_ADP_Prenom_NOM, DOX_PREV_Prenom_NOM ou DOX_TROT_Prenom_NOM.</li>
              <li>Contrat actif : le dossier doit devenir CTT_ADP/PREV/TROT_Prenom_NOM.</li>
              <li>Piece d'identite : CNI_Prenom_NOM.</li>
              <li>Justificatif de domicile : Domicile_Nom_Prenom.</li>
            </ul>
          </div>
        </section>

        <section className="ops-grid ops-grid--two">
          <form action={addDocument} className="ops-card ops-form">
            <div className="ops-card-title">
              <FileCheck2 size={18} aria-hidden />
              <h2>Synchroniser un document Drive</h2>
            </div>
            <label>
              Nom du fichier
              <input name="fileName" placeholder="CNI_Marie_MARTIN.pdf" required />
            </label>
            <label>
              ID ou URL du fichier Drive
              <input name="fileIdOrUrl" placeholder="https://drive.google.com/file/d/..." required />
            </label>
            <label>
              ID ou URL du dossier parent
              <input name="folderIdOrUrl" placeholder="Optionnel" />
            </label>
            <button className="btn-primary" type="submit">Synchroniser le document</button>
          </form>

          <div className="ops-card">
            <div className="ops-card-title">
              <ShieldAlert size={18} aria-hidden />
              <h2>Nomenclature active</h2>
            </div>
            <ul className="ops-list">
              {rules.map((rule) => (
                <li key={rule.code}>
                  <strong>{rule.pattern}</strong> - {rule.label}
                </li>
              ))}
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
                    {candidate.contract_folder_name && <small>Contrat : {candidate.contract_folder_name}</small>}
                  </div>
                  <div className="ops-actions">
                    <form action={approveDriveCandidateAction}>
                      <input type="hidden" name="candidateId" value={candidate.id} />
                      <button type="submit" className="ops-icon-action" title="Valider et lier au CRM">
                        <CheckCircle2 size={16} aria-hidden />
                      </button>
                    </form>
                    {candidate.status === "linked" && candidate.contract_folder_name && (
                      <form action={requestContractFolderRenameAction}>
                        <input type="hidden" name="candidateId" value={candidate.id} />
                        <button type="submit" className="ops-icon-action" title="Transformer DOX en CTT">
                          CTT
                        </button>
                      </form>
                    )}
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

        <section className="ops-card">
          <div className="ops-section-header">
            <div>
              <p className="eyebrow">Documents synchronises</p>
              <h2>Pieces detectees dans Drive</h2>
            </div>
            <span className="ops-count">{documents.length} fichier(s)</span>
          </div>

          <div className="ops-table">
            <div className="ops-table-row ops-table-head">
              <span>Document</span>
              <span>Type</span>
              <span>Nomenclature</span>
              <span>Statut</span>
            </div>
            {documents.length === 0 ? (
              <div className="ops-empty">Aucun document Drive synchronise pour le moment.</div>
            ) : (
              documents.map((document) => (
                <div key={document.id} className="ops-table-row">
                  <div>
                    <strong>{document.file_name}</strong>
                    <small>{document.google_drive_file_id}</small>
                    {document.file_url && (
                      <a href={document.file_url} target="_blank" rel="noreferrer">Ouvrir dans Drive</a>
                    )}
                  </div>
                  <div>
                    <strong>{document.document_type}</strong>
                    <small>{document.document_rule_code ?? "Regle non reconnue"}</small>
                  </div>
                  <div>
                    <span className={`ops-status ops-status--${document.nomenclature_status}`}>
                      {document.nomenclature_status}
                    </span>
                    <small>{document.sync_direction}</small>
                  </div>
                  <div>
                    <span className={`ops-status ops-status--${document.status}`}>{document.status}</span>
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
