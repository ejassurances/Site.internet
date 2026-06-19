import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

type PublicPageProps = {
  title: string;
  eyebrow: string;
  description: string;
  highlights: string[];
};

export function PublicPage({ title, eyebrow, description, highlights }: PublicPageProps) {
  return (
    <>
      <SiteHeader />
      <main className="public-main">
        <section className="page-hero compact-hero">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="hero-copy">{description}</p>
            <div className="hero-actions">
              <Link className="primary-action" href="/contact">
                Prendre rendez-vous <ArrowRight size={18} aria-hidden />
              </Link>
              <Link className="secondary-action" href="/connexion">
                Acceder a mon espace
              </Link>
            </div>
          </div>
          <aside className="trust-panel" aria-label="Points d'accompagnement">
            {highlights.map((item) => (
              <div key={item} className="trust-row">
                <CheckCircle2 size={20} aria-hidden />
                <span>{item}</span>
              </div>
            ))}
          </aside>
        </section>

        <section className="content-band">
          <div>
            <h2>Une approche familiale avant assurantielle</h2>
            <p>
              Avant de parler contrat, nous clarifions les personnes a proteger, les liens qui
              existent vraiment dans votre foyer, les droits deja acquis et les zones de fragilite.
              C'est cette lecture qui permet ensuite de choisir des garanties utiles.
            </p>
          </div>
          <div>
            <h2>Un cadre confidentiel et bienveillant</h2>
            <p>
              Les sujets abordes sont parfois intimes : couple, filiation, succession, argent,
              sante ou separation. Le cabinet vous accueille sans jugement et documente les choix
              pour que chaque decision reste claire.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
