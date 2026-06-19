import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité — EJ Partners Assurances",
  description: "Politique de confidentialité et protection des données personnelles d'EJ Partners Assurances.",
  robots: { index: false, follow: false },
};

export default function ConfidentialitePage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main" style={{ padding: "56px 0 80px" }}>
        <div style={{ maxWidth: "760px" }}>
          <p className="eyebrow">RGPD & Protection des données</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", marginBottom: "40px" }}>Politique de confidentialité</h1>

          <section style={{ marginBottom: "40px" }}>
            <h2>Responsable du traitement</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              EJ Partners Assurances, cabinet de courtage en assurances, est responsable du
              traitement de vos données personnelles collectées via ce site.
              Contact : <a href="mailto:contact@ej-assurances.fr" style={{ color: "var(--accent-strong)" }}>contact@ej-assurances.fr</a>
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Données collectées</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Dans le cadre de nos services, nous collectons les données suivantes :
            </p>
            <ul style={{ color: "var(--muted)", lineHeight: 1.9, paddingLeft: "20px" }}>
              <li>Données d'identification : nom, prénom, adresse email, numéro de téléphone</li>
              <li>Données relatives à votre situation familiale (uniquement avec votre consentement explicite)</li>
              <li>Données de navigation : cookies techniques, adresse IP</li>
              <li>Données de communication : messages échangés via le formulaire de contact</li>
            </ul>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Finalités du traitement</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Vos données sont utilisées pour :
            </p>
            <ul style={{ color: "var(--muted)", lineHeight: 1.9, paddingLeft: "20px" }}>
              <li>Répondre à vos demandes de contact et de rendez-vous</li>
              <li>Réaliser l'analyse de votre situation et vous proposer des solutions adaptées</li>
              <li>Gérer la relation client et assurer le suivi de vos dossiers</li>
              <li>Respecter nos obligations légales et réglementaires (DDA, ACPR)</li>
            </ul>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Base légale</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Le traitement de vos données repose sur :
            </p>
            <ul style={{ color: "var(--muted)", lineHeight: 1.9, paddingLeft: "20px" }}>
              <li><strong>Votre consentement</strong> pour les données sensibles relatives à votre situation familiale</li>
              <li><strong>L'exécution d'un contrat</strong> pour la gestion de vos dossiers d'assurance</li>
              <li><strong>L'obligation légale</strong> pour les exigences réglementaires (ACPR, DDA)</li>
              <li><strong>L'intérêt légitime</strong> pour l'amélioration de nos services</li>
            </ul>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Durée de conservation</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Vos données sont conservées pendant la durée nécessaire à la réalisation des finalités
              pour lesquelles elles ont été collectées, et au minimum pendant les durées légales
              applicables aux activités d'intermédiation en assurance (5 ans après la fin de la
              relation contractuelle).
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Vos droits</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul style={{ color: "var(--muted)", lineHeight: 1.9, paddingLeft: "20px" }}>
              <li><strong>Droit d'accès</strong> à vos données personnelles</li>
              <li><strong>Droit de rectification</strong> des données inexactes</li>
              <li><strong>Droit à l'effacement</strong> (« droit à l'oubli »)</li>
              <li><strong>Droit à la portabilité</strong> de vos données</li>
              <li><strong>Droit d'opposition</strong> au traitement</li>
              <li><strong>Droit de retirer votre consentement</strong> à tout moment</li>
            </ul>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: "16px" }}>
              Pour exercer ces droits, contactez-nous à :{" "}
              <a href="mailto:contact@ej-assurances.fr" style={{ color: "var(--accent-strong)" }}>contact@ej-assurances.fr</a>.
              En cas de réclamation, vous pouvez saisir la CNIL :{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-strong)" }}>www.cnil.fr</a>.
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Ce site utilise uniquement des cookies techniques nécessaires au fonctionnement
              (authentification sécurisée via Supabase). Aucun cookie publicitaire ou de tracking
              tiers n'est utilisé.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
