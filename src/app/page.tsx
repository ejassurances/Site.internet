import Link from "next/link";
import { ArrowRight, FileHeart, HandHeart, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { valueCards } from "@/lib/content";

const services = [
  "Diagnostic famille affective / juridique / heritiere",
  "Assurance emprunteur",
  "Prevoyance et protection des revenus",
  "Protection des enfants",
  "Transmission et succession",
  "Family Protection OS interne",
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="public-main">
        <section className="home-hero">
          <div className="hero-content">
            <p className="eyebrow">Protection des familles atypiques</p>
            <h1>Proteger celles et ceux qui comptent vraiment.</h1>
            <p className="hero-copy">
              Les personnes que vous aimez ne sont pas toujours celles que la loi protege.
              EJ Assurances identifie les ecarts entre votre famille affective, votre famille
              juridique et votre famille heritiere, puis construit les solutions de protection.
            </p>
            <div className="hero-actions">
              <Link className="primary-action" href="/contact">
                Faire mon diagnostic gratuit <ArrowRight size={18} aria-hidden />
              </Link>
              <Link className="secondary-action" href="/connexion">
                Se connecter
              </Link>
            </div>
          </div>
          <div className="hero-visual" aria-label="Synthese EJ Assurances">
            <div className="visual-card">
              <ShieldCheck size={28} aria-hidden />
              <strong>Famille affective</strong>
              <span>Les personnes qui comptent vraiment dans votre vie</span>
            </div>
            <div className="visual-card">
              <FileHeart size={28} aria-hidden />
              <strong>Famille juridique</strong>
              <span>Les personnes reconnues par les textes et les contrats</span>
            </div>
            <div className="visual-card">
              <HandHeart size={28} aria-hidden />
              <strong>Famille heritiere</strong>
              <span>Les personnes qui recevront ou seront protegees demain</span>
            </div>
          </div>
        </section>

        <section className="values-grid" aria-label="Engagements">
          {valueCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="value-card">
                <Icon size={24} aria-hidden />
                <h2>{card.title}</h2>
                <p>{card.text}</p>
              </article>
            );
          })}
        </section>

        <section className="split-section">
          <div>
            <p className="eyebrow">Logiciel interne</p>
            <h2>Family Protection OS structure le diagnostic et le devoir de conseil.</h2>
            <p>
              Chaque demande passe par un recueil des besoins DDA, une cartographie familiale,
              un score de risque et une recommandation validee par le conseiller. L'objectif n'est
              pas de vendre un contrat, mais d'identifier les protections manquantes.
            </p>
          </div>
          <ul className="service-list">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
