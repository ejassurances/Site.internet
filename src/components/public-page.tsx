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
            <h2>Une approche sur mesure</h2>
            <p>
              EJ Assurances qualifie chaque situation avec une attention particuliere aux personnes
              protegees, aux liens familiaux reels, aux pieces contractuelles et aux decisions qui
              auront un impact durable sur le foyer.
            </p>
          </div>
          <div>
            <h2>Un suivi confidentiel</h2>
            <p>
              La plateforme prepare un espace documentaire, une messagerie et un journal d&apos;audit
              afin que les informations sensibles restent accessibles uniquement aux personnes
              autorisees.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
