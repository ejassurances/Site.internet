import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { getAccessibleClients, toAssessmentClientOptions } from "@/lib/clients";
import { getLettresMission } from "@/lib/actions/lettres-mission";
import { PRODUCT_LABELS, productLabel } from "@/lib/lettre-mission";
import { LettreMissionForm } from "@/components/forms/lettre-mission-form";
import { FileSignature } from "lucide-react";

export const metadata = { title: "Lettres de mission — EJ Partners Assurances" };

const STATUS_LABEL: Record<string, string> = {
  a_signer: "À signer",
  signee: "Signée",
  annulee: "Annulée",
};

const PRODUCT_OPTIONS = Object.entries(PRODUCT_LABELS).map(([value, label]) => ({ value, label }));

export default async function LettresMissionPage() {
  const user = await requireRole(["admin", "courtier"]);
  const clients = await getAccessibleClients(user);
  const options = toAssessmentClientOptions(clients).map((o) => ({ id: o.id, label: o.label }));
  const lettres = await getLettresMission();

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="ops-page">
        <nav className="page-breadcrumb" aria-label="Fil d'Ariane">
          <Link href="/admin">Accueil</Link>
          <span>/</span>
          <span>Lettres de mission</span>
        </nav>

        <header className="ops-hero">
          <div>
            <p className="eyebrow">Conformité DDA</p>
            <h1>Lettres de mission</h1>
            <p>
              Générez une lettre de mission à partir du recueil des besoins, à faire signer par le client
              depuis son espace (signature électronique). Le document reste disponible dans l&apos;espace client.
            </p>
          </div>
          <div className="ops-hero-badge">
            <FileSignature size={18} aria-hidden />
            Signature
          </div>
        </header>

        <section className="ops-grid ops-grid--two">
          <LettreMissionForm clients={options} products={PRODUCT_OPTIONS} />

          <div className="ops-card">
            <div className="ops-card-title">
              <FileSignature size={18} aria-hidden />
              <h2>Comment ça marche</h2>
            </div>
            <ul className="ops-list">
              <li>Sélectionnez le client et le pôle / produit concerné.</li>
              <li>La lettre de mission conforme DDA est générée automatiquement.</li>
              <li>Le client la consulte et la signe depuis son espace (nom + consentement + horodatage).</li>
              <li>La lettre signée reste archivée dans l&apos;espace client.</li>
            </ul>
          </div>
        </section>

        <section className="ops-card">
          <div className="ops-section-header">
            <div>
              <p className="eyebrow">Référentiel cabinet</p>
              <h2>Lettres générées</h2>
            </div>
            <span className="ops-count">{lettres.length} lettre(s)</span>
          </div>
          <div className="ops-table">
            <div className="ops-table-row ops-table-head">
              <span>Référence</span>
              <span>Client</span>
              <span>Produit</span>
              <span>Statut</span>
            </div>
            {lettres.length === 0 ? (
              <div className="ops-empty">Aucune lettre de mission générée.</div>
            ) : (
              lettres.map((l) => (
                <Link
                  key={l.id}
                  href={`/client/lettre-mission/${l.id}`}
                  className="ops-table-row ops-table-row--link"
                  aria-label={`Ouvrir la lettre ${l.reference}`}
                >
                  <div>
                    <strong>{l.reference}</strong>
                  </div>
                  <span>{l.client_name ?? "—"}</span>
                  <span>{productLabel(l.product)}</span>
                  <span>{STATUS_LABEL[l.status] ?? l.status}</span>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
