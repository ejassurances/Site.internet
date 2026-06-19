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
            <div className="hero-proof" aria-label="Positionnement cabinet">
              <span>Confidentiel</span>
              <span>Inclusif</span>
              <span>Conforme DDA</span>
            </div>
            <div className="hero-actions">
              <Link className="primary-action" href="/contact">
                Faire mon diagnostic gratuit <ArrowRight size={18} aria-hidden />
              </Link>
              <Link className="secondary-action" href="/connexion">
                Se connecter
              </Link>
            </div>
          </div>
          <div className="hero-visual premium-visual" aria-label="Synthese EJ Assurances">
            <div className="visual-header">
              <span>Diagnostic familial</span>
              <strong>Family Protection Score</strong>
            </div>
            <div className="score-ring" aria-hidden>
              <span>72</span>
              <small>/100</small>
            </div>
            <div className="protection-map">
              <div>
                <ShieldCheck size={22} aria-hidden />
                <strong>Affective</strong>
                <span>Ceux que vous aimez</span>
              </div>
              <div>
                <FileHeart size={22} aria-hidden />
                <strong>Juridique</strong>
                <span>Ce que la loi reconnait</span>
              </div>
              <div>
                <HandHeart size={22} aria-hidden />
                <strong>Heritiere</strong>
                <span>Ce qui se transmettra</span>
              </div>
            </div>
            <div className="visual-footer">
              <span>Ecarts detectes</span>
              <strong>Logement · Revenus · Succession</strong>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Preuves de confiance">
          <span>Cabinet specialise familles LGBT+ et coparentalite</span>
          <span>Assurance emprunteur, prevoyance, transmission</span>
          <span>Accompagnement humain, confidentiel et documente</span>
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
