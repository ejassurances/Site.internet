import Link from "next/link";
import { ClipboardCheck, FileText } from "lucide-react";
import { ClientRecord, formatClientName } from "@/lib/client-records";

type ClientFileProps = {
  client: ClientRecord;
  recueilHref: string;
};

export function ClientFile({ client, recueilHref }: ClientFileProps) {
  const assessments = [...(client.needs_assessments ?? [])].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <div className="client-file">
      <section className="client-file-hero">
        <div>
          <p className="eyebrow">Fiche client</p>
          <h2>{formatClientName(client)}</h2>
          <p>{[client.email, client.phone, client.family_context].filter(Boolean).join(" · ") || "Dossier client EJ"}</p>
        </div>
        <Link className="primary-action" href={recueilHref}>
          <ClipboardCheck size={18} aria-hidden />
          Nouveau recueil rattaché
        </Link>
      </section>

      <section className="fpos-panel">
        <h3>Recueils des besoins</h3>
        <div className="assessment-history">
          {assessments.length === 0 && (
            <article className="empty-state">
              <FileText size={22} aria-hidden />
              <strong>Aucun recueil pour ce client</strong>
              <p>Le prochain recueil sera automatiquement relié à cette fiche client.</p>
            </article>
          )}

          {assessments.map((assessment) => (
            <article className="assessment-row" key={assessment.id}>
              <div>
                <strong>{assessment.protection_goal || "Recueil des besoins"}</strong>
                <p>
                  {assessment.family_situation || "Situation à compléter"} · {assessment.legal_status || "Statut à compléter"}
                </p>
              </div>
              <span>{assessment.family_protection_score ?? "-"} / 100</span>
              <small>{assessment.status}</small>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
