import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Mentions légales — EJ Partners Assurances",
  description: "Mentions légales du site EJ Partners Assurances, cabinet de courtage en assurances.",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main" style={{ padding: "56px 0 80px" }}>
        <div style={{ maxWidth: "760px" }}>
          <p className="eyebrow">Informations légales</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", marginBottom: "40px" }}>Mentions légales</h1>

          <section style={{ marginBottom: "40px" }}>
            <h2>Éditeur du site</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              <strong>EJ Partners Assurances</strong><br />
              Cabinet de courtage en assurances<br />
              Adresse : Paris, Île-de-France<br />
              Téléphone : 01.89.31.40.29<br />
              Email : contact@ej-assurances.fr<br />
              Forme juridique : (à compléter)<br />
              SIRET : (à compléter)<br />
              ORIAS n° : (en cours d'immatriculation)
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Activité réglementée</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              EJ Partners Assurances exerce l'activité de courtier en assurances, soumise à
              l'immatriculation auprès de l'ORIAS (Organisme pour le Registre des Intermédiaires
              en Assurance, Banque et Finance — <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-strong)" }}>www.orias.fr</a>).
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Autorité de contrôle : Autorité de Contrôle Prudentiel et de Résolution (ACPR),
              4 Place de Budapest, CS 92459, 75436 Paris Cedex 09.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Hébergement</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Le site est hébergé par :<br />
              <strong>Vercel Inc.</strong><br />
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-strong)" }}>www.vercel.com</a>
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Propriété intellectuelle</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              L'ensemble du contenu de ce site (textes, images, logo, structure) est la propriété
              exclusive d'EJ Partners Assurances. Toute reproduction, représentation, modification
              ou exploitation, totale ou partielle, sans autorisation écrite préalable est interdite.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Limitation de responsabilité</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Les informations publiées sur ce site ont un caractère général et ne constituent pas
              un conseil personnalisé. EJ Partners Assurances ne saurait être tenu responsable des
              dommages directs ou indirects résultant de l'utilisation de ces informations.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Pour toute question relative aux présentes mentions légales :<br />
              <a href="mailto:contact@ej-assurances.fr" style={{ color: "var(--accent-strong)" }}>contact@ej-assurances.fr</a>
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
