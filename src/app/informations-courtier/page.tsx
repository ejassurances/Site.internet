import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Informations courtier — EJ Partners Assurances",
  description: "Informations réglementaires sur l'activité de courtage en assurances d'EJ Partners Assurances.",
  robots: { index: false, follow: false },
};

export default function InformationsCourtierPage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main" style={{ padding: "56px 0 80px" }}>
        <div style={{ maxWidth: "760px" }}>
          <p className="eyebrow">Réglementation</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", marginBottom: "40px" }}>Informations courtier</h1>

          <section style={{ marginBottom: "40px" }}>
            <h2>Statut et immatriculation</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              EJ Partners Assurances exerce en qualité de <strong>courtier en assurances</strong>,
              intermédiaire soumis à l'immatriculation obligatoire auprès de l'ORIAS.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              <strong>ORIAS n° :</strong> (en cours d'immatriculation)<br />
              Vérification possible sur <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-strong)" }}>www.orias.fr</a>
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Autorité de contrôle</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              <strong>Autorité de Contrôle Prudentiel et de Résolution (ACPR)</strong><br />
              4 Place de Budapest, CS 92459<br />
              75436 Paris Cedex 09<br />
              <a href="https://acpr.banque-france.fr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-strong)" }}>acpr.banque-france.fr</a>
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Nature de la rémunération</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              EJ Partners Assurances est rémunéré sous forme de commissions versées par les
              compagnies d'assurance partenaires, sur les contrats souscrits par ses clients.
              Cette rémunération n'entraîne aucun surcoût pour le client.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Le montant précis de la rémunération est communiqué au client avant toute
              souscription, conformément aux exigences de la Directive sur la Distribution
              d'Assurances (DDA).
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Devoir de conseil</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Conformément à la réglementation DDA, EJ Partners Assurances réalise une analyse
              des besoins et exigences du client avant toute recommandation. Un document
              d'analyse personnalisé est remis au client.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Traitement des réclamations</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Toute réclamation peut être adressée à :<br />
              <a href="mailto:contact@ej-assurances.fr" style={{ color: "var(--accent-strong)" }}>contact@ej-assurances.fr</a><br />
              Nous nous engageons à accuser réception sous 10 jours ouvrables et à apporter
              une réponse dans un délai de 2 mois maximum.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              En cas de désaccord persistant, vous pouvez saisir le médiateur de l'assurance :{" "}
              <a href="https://www.mediation-assurance.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-strong)" }}>www.mediation-assurance.org</a>
            </p>
          </section>

          <section>
            <h2>Garantie financière et assurance RC professionnelle</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              EJ Partners Assurances dispose d'une assurance de responsabilité civile
              professionnelle et, le cas échéant, d'une garantie financière conformes aux
              exigences réglementaires applicables aux courtiers en assurances.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
