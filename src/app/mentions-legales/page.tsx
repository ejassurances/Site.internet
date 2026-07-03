import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Mentions lÃ©gales â EJ Assurances",
  description: "Mentions lÃ©gales du site EJ Assurances, cabinet de courtage en assurances.",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main" style={{ padding: "56px 0 80px" }}>
        <div style={{ maxWidth: "760px" }}>
          <p className="eyebrow">Informations lÃ©gales</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", marginBottom: "40px" }}>Mentions lÃ©gales</h1>

          <section style={{ marginBottom: "40px" }}>
            <h2>Ãditeur du site</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--fg)" }}>EJ Assurances</strong><br />
              Cabinet de courtage en assurances â entreprise individuelle<br />
              Adresse : Paris, Ãle-de-France<br />
              TÃ©lÃ©phone : 01.89.31.40.29<br />
              Email :{" "}
              <a href="mailto:contact@ej-assurances.fr" style={{ color: "var(--accent)" }}>
                contact@ej-assurances.fr
              </a>
              <br />
              Directeur de la publication : Erwan Jaffrelot
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>ActivitÃ© rÃ©glementÃ©e</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              EJ Assurances exerce l&apos;activitÃ© de courtier en assurances, soumise Ã 
              l&apos;immatriculation obligatoire auprÃ¨s de l&apos;ORIAS (Organisme pour le
              Registre des IntermÃ©diaires en Assurance, Banque et Finance â{" "}
              <a
                href="https://www.orias.fr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)" }}
              >
                www.orias.fr
              </a>
              ).
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--fg)" }}>ORIAS nÂ° :</strong> en cours
              d&apos;immatriculation
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--fg)" }}>AutoritÃ© de contrÃ´le :</strong> AutoritÃ© de
              ContrÃ´le Prudentiel et de RÃ©solution (ACPR), 4 Place de Budapest, CS 92459, 75436
              Paris Cedex 09 â{" "}
              <a
                href="https://acpr.banque-france.fr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)" }}
              >
                acpr.banque-france.fr
              </a>
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              En tant qu&apos;intermÃ©diaire d&apos;assurance, EJ Assurances est soumis aux
              obligations de la Directive sur la Distribution d&apos;Assurances (DDA) ainsi
              qu&apos;aux obligations de Lutte contre le Blanchiment de Capitaux et le
              Financement du Terrorisme (LCB-FT).{" "}
              <a href="/conformite" style={{ color: "var(--accent)" }}>
                En savoir plus sur notre conformitÃ© â
              </a>
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>HÃ©bergement</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Le site est hÃ©bergÃ© par :<br />
              <strong style={{ color: "var(--fg)" }}>Vercel Inc.</strong><br />
              440 N Barranca Ave #4133, Covina, CA 91723, Ãtats-Unis<br />
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)" }}
              >
                www.vercel.com
              </a>
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Les donnÃ©es de base de donnÃ©es sont hÃ©bergÃ©es par{" "}
              <strong style={{ color: "var(--fg)" }}>Supabase</strong> sur des serveurs situÃ©s en
              Europe (rÃ©gion eu-central-1, Francfort, Allemagne), conformÃ©ment au RGPD.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>PropriÃ©tÃ© intellectuelle</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              L&apos;ensemble du contenu de ce site (textes, images, logo, structure) est la
              propriÃ©tÃ© exclusive d&apos;EJ Assurances. Toute reproduction, reprÃ©sentation,
              modification ou exploitation, totale ou partielle, sans autorisation Ã©crite
              prÃ©alable est interdite et constitue une contrefaÃ§on sanctionnÃ©e par le Code de la
              propriÃ©tÃ© intellectuelle.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Protection des donnÃ©es personnelles</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              ConformÃ©ment au RÃ¨glement GÃ©nÃ©ral sur la Protection des DonnÃ©es (RGPD â UE
              2016/679) et Ã  la loi Informatique et LibertÃ©s, vous disposez d&apos;un droit
              d&apos;accÃ¨s, de rectification, d&apos;effacement et de portabilitÃ© de vos donnÃ©es
              personnelles. Pour exercer ces droits :{" "}
              <a href="mailto:contact@ej-assurances.fr" style={{ color: "var(--accent)" }}>
                contact@ej-assurances.fr
              </a>
              .
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Pour en savoir plus :{" "}
              <a href="/confidentialite" style={{ color: "var(--accent)" }}>
                Politique de confidentialitÃ©
              </a>{" "}
              Â·{" "}
              <a href="/conformite" style={{ color: "var(--accent)" }}>
                Notre conformitÃ© rÃ©glementaire
              </a>
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>Limitation de responsabilitÃ©</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Les informations publiÃ©es sur ce site ont un caractÃ¨re gÃ©nÃ©ral et ne constituent pas
              un conseil personnalisÃ©. EJ Assurances ne saurait Ãªtre tenu responsable des dommages
              directs ou indirects rÃ©sultant de l&apos;utilisation de ces informations. Tout
              conseil personnalisÃ© est dÃ©livrÃ© dans le cadre d&apos;une relation contractuelle
              documentÃ©e selon les exigences DDA.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2>MÃ©diation</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              En cas de litige, vous pouvez recourir gratuitement au mÃ©diateur de
              l&apos;assurance :{" "}
              <a
                href="https://www.mediation-assurance.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)" }}
              >
                www.mediation-assurance.org
              </a>
              .
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Pour toute question relative aux prÃ©sentes mentions lÃ©gales :<br />
              <a href="mailto:contact@ej-assurances.fr" style={{ color: "var(--accent)" }}>
                contact@ej-assurances.fr
              </a>
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
