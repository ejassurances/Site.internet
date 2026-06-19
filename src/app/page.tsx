import Link from "next/link";
import { ArrowRight, FileHeart, HandHeart, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { valueCards } from "@/lib/content";

const services = [
  "Diagnostic famille affective, juridique et heritiere",
  "Assurance emprunteur",
  "Prevoyance et protection des revenus",
  "Protection des enfants",
  "Transmission et succession",
  "Coordination avec notaire, avocat ou conseil patrimonial",
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="public-main">
        <section className="home-hero">
          <div className="hero-content">
            <p className="eyebrow">Cabinet expert des familles modernes</p>
            <h1>Proteger votre vraie famille, pas seulement celle des formulaires.</h1>
            <p className="hero-copy">
              Famille LGBT+, coparentalite choisie, famille recomposee, parent social,
              concubinage, enfants d'une precedente union : les personnes qui comptent pour vous
              ne sont pas toujours celles que la loi ou les contrats protegent spontanement.
              EJ Assurances vous aide a identifier ces ecarts et a securiser votre foyer.
            </p>
            <div className="hero-proof" aria-label="Positionnement cabinet">
              <span>Approche confidentielle</span>
              <span>Expertise familles atypiques</span>
              <span>Conseil documente</span>
            </div>
            <div className="hero-actions">
              <Link className="primary-action" href="/contact">
                Parler de ma situation <ArrowRight size={18} aria-hidden />
              </Link>
              <Link className="secondary-action" href="/connexion">
                Se connecter
              </Link>
            </div>
          </div>
          <div className="hero-visual premium-visual" aria-label="Methode EJ Assurances">
            <div className="visual-header">
              <span>Methode cabinet</span>
              <strong>3 familles a aligner</strong>
            </div>
            <div className="score-ring" aria-hidden>
              <span>3</span>
              <small>lectures</small>
            </div>
            <div className="protection-map">
              <div>
                <ShieldCheck size={22} aria-hidden />
                <strong>Affective</strong>
                <span>Ceux que vous aimez et souhaitez proteger</span>
              </div>
              <div>
                <FileHeart size={22} aria-hidden />
                <strong>Juridique</strong>
                <span>Ce que la loi, le couple et les contrats reconnaissent</span>
              </div>
              <div>
                <HandHeart size={22} aria-hidden />
                <strong>Heritiere</strong>
                <span>Ce qui se transmettrait reellement demain</span>
              </div>
            </div>
            <div className="visual-footer">
              <span>Objectif</span>
              <strong>Logement · Revenus · Enfants · Succession</strong>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Preuves de confiance">
          <span>Cabinet dedie aux familles LGBT+, recomposees et coparentales</span>
          <span>Assurance emprunteur, prevoyance, protection juridique, transmission</span>
          <span>Un accompagnement humain avant toute solution d'assurance</span>
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
            <p className="eyebrow">Notre approche</p>
            <h2>Nous partons de votre famille reelle, pas d'une case administrative.</h2>
            <p>
              Notre role n'est pas de vous vendre un contrat au plus vite. Nous commencons par
              comprendre qui depend de vous, qui vous souhaitez proteger, qui heriterait aujourd'hui,
              et ce qui se passerait si un accident de vie survenait demain. Les solutions viennent
              ensuite : assurance emprunteur, prevoyance, assurance vie, protection juridique ou
              orientation vers un notaire.
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
