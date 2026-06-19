import { FileText } from "lucide-react";

export type AcprDocument = {
  id: string;
  storage_path: string;
  document_type: string;
  created_at: string;
};

type ClientAcprFolderProps = {
  documents: AcprDocument[];
};

const documentLabels: Record<string, string> = {
  classeur_acpr_der: "Document d'entree en relation",
};

export function ClientAcprFolder({ documents }: ClientAcprFolderProps) {
  return (
    <section className="fpos-panel" id="classeur-acpr">
      <p className="eyebrow">Classeur ACPR</p>
      <h2>Documents reglementaires du cabinet</h2>
      <p>
        Retrouvez ici les documents d'information remis par le cabinet dans le cadre de l'entree en relation.
      </p>
      <div className="assessment-history">
        {documents.length === 0 && (
          <article className="empty-state">
            <FileText size={22} aria-hidden />
            <strong>Aucun document disponible</strong>
            <p>Votre DER apparaitra ici apres votre premier recueil des besoins.</p>
          </article>
        )}

        {documents.map((document) => (
          <article className="assessment-row" key={document.id}>
            <div>
              <strong>{documentLabels[document.document_type] ?? document.document_type}</strong>
              <p>Document ajoute au dossier client</p>
            </div>
            <a href={document.storage_path} download>
              Telecharger
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
