import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Home,
  Users,
  TrendingDown,
  CheckCircle,
  CheckCircle2,
  Star,
  Clock,
  Euro,
  HeartHandshake,
  Scale,
  Baby,
  CalendarDays,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData, organizationSchema } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "EJ Partners Assurances — Assurance Emprunteur & Protection Familles Modernes",
  description:
    "Cabinet expert en assurance emprunteur (objectif 100 000 € d'économies cumulées) et en protection des familles modernes : coparentalité, familles recomposées, couples LGBT+. Conseil indépendant, bienveillant et confidentiel.",
  alternates: { canonical: "https://www.ej-assurances.fr" },
};

const savingsStats = [
  { value: "100 000 €", label: "d'économies cumulées visées", icon: Euro },
  { value: "48 h", label: "délai moyen de réponse", icon: Clock },
  { value: "30+", label: "compagnies comparées", icon: Star },
  { value: "100 %", label: "indépendant & sans conflit", icon: CheckCircle },
];

const expertiseCards = [
  {
    icon: Home,
    color: "var(--navy)",
    tag: "Expertise N°1",
    title: "Assurance Emprunteur",
    pitch: "Objectif 100 000 € d'économies cumulées pour nos clients propriétaires.",
    points: [
      "Délégation d'assurance sur mesure",
      "Loi Lemoine : changement sans frais ni délai",
      "Situations médicales complexes acceptées",
      "Co-emprunteurs multiples & familles atypiques",
    ],
    cta: "Calculer mon économie",
    href: "/assurance-emprunteur",
    ctaHref: "/contact#rendez-vous",
  },
  {
    icon: Users,
    color: "var(--gold)",
    tag: "Expertise N°2",
    title: "Protection des Familles Modernes",
    pitch: "Coparentalité, familles recomposées, couples LGBT+ : vos proches méritent une vraie protection.",
    points: [
      "Coparentalité choisie & co-parentalité",
      "Familles homoparentales & couples LGBT+",
      "Familles recomposées & parents sociaux",
      "Prévoyance & transmission sur mesure",
    ],
    cta: "Analyser ma situation",
    href: "/coparentalite",
    ctaHref: "/contact#rendez-vous",
  },
];

const whyUs = [
  {
    icon: TrendingDown,
    title: "Moins cher, vraiment",
    text: "Nous comparons 30+ compagnies pour trouver la couverture optimale au meilleur tarif. Notre objectif affiché : 100 000 € d'économies cumulées pour nos clients.",
  },
  {
    icon: HeartHandshake,
    title: "Familles modernes, notre spécialité",
    text: "Coparentalité, LGBT+, familles recomposées : nous connaissons les subtilités juridiques et assurantielles que les généralistes ignorent.",
  },
  {
    icon: Scale,
    title: "Indépendant & transparent",
    text: "Courtier indépendant, nous n'avons aucun intérêt à vous orienter vers une compagnie plutôt qu'une autre. Seul votre intérêt guide notre conseil.",
  },
  {
    icon: ShieldCheck,
    title: "Conformité DDA garantie",
    text: "Recueil des besoins systématique, devoir de conseil documenté, suivi post-souscription. Votre protection est notre priorité légale et éthique.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Analyse gratuite",
    text: "En 30 minutes, nous analysons votre contrat actuel et identifions les économies possibles ou les lacunes de protection.",
  },
  {
    num: "02",
    title: "Comparaison sur mesure",
    text: "Nous interrogeons 30+ compagnies et construisons une sélection adaptée à votre profil, votre famille et votre projet.",
  },
  {
    num: "03",
    title: "Mise en place sans stress",
    text: "Nous gérons toutes les démarches administratives. Vous signez, nous nous occupons du reste — résiliation de l'ancien contrat incluse.",
  },
  {
    num: "04",
    title: "Suivi dans la durée",
    text: "Votre situation évolue (naissance, séparation, promotion) : nous réévaluons votre protection chaque année.",
  },
];

const checklistEmprunteur = [
  "Vous avez un crédit immobilier en cours",
  "Vous n'avez jamais renégocié votre assurance",
  "Votre banque vous a imposé son contrat groupe",
  "Vous êtes en famille recomposée ou coparentalité",
  "Vous avez un antécédent médical",
  "Vous êtes en couple non marié",
];

export default function HomePage() {
  return (
    <>
      <StructuredData data={organizationSchema} />
      <SiteHeader />
      <main className="public-main">

        {/* ── Hero double expertise ── */}
        <section className="home-hero reposition-hero">
          <div className="reposition-hero-content">
            <div className="hero-proof">
              <span>🏠 Assurance Emprunteur</span>
              <span>👨‍👩‍👧 Familles Modernes</span>
              <span>✦ Cabinet Indépendant</span>
            </div>
            <h1>
              Deux expertises.{" "}
              <span className="hero-h1-accent">Un seul cabinet.</span>
            </h1>
            <p className="hero-copy">
              EJ Partners Assurances est le cabinet de référence pour{" "}
              <strong>réduire le coût de votre assurance emprunteur</strong> et pour{" "}
              <strong>protéger les familles modernes</strong> — coparentalité, couples LGBT+,
              familles recomposées — avec des solutions vraiment adaptées à votre réalité.
            </p>
            <div className="hero-savings-badge">
              <Euro size={18} aria-hidden />
              <span>
                Objectif <strong>100 000 €</strong> d'économies cumulées pour nos clients
              </span>
            </div>
            <div className="hero-actions">
              <Link className="primary-action" href="/contact#rendez-vous">
                <CalendarDays size={17} aria-hidden />
                Prendre rendez-vous
              </Link>
              <Link className="secondary-action" href="/assurance-emprunteur">
                Calculer mon économie
              </Link>
            </div>
          </div>

          {/* Compteur d'économies visuel */}
          <div className="hero-savings-visual" aria-label="Objectif économies cabinet">
            <div className="savings-header">
              <TrendingDown size={18} aria-hidden />
              <span>Compteur d'économies cabinet</span>
            </div>
            <div className="savings-counter">
              <span className="savings-amount">100 000 €</span>
              <span className="savings-label">d'économies cumulées visées</span>
            </div>
            <div className="savings-breakdown">
              <div>
                <strong>Assurance emprunteur</strong>
                <span>Jusqu'à 70 % d'économie vs contrat bancaire</span>
              </div>
              <div>
                <strong>Loi Lemoine</strong>
                <span>Changement sans délai ni frais de résiliation</span>
              </div>
              <div>
                <strong>Familles modernes</strong>
                <span>Protection des proches non reconnus par défaut</span>
              </div>
            </div>
            <div className="savings-footer">
              <Baby size={14} aria-hidden />
              <span>Coparentalité · LGBT+ · Familles recomposées</span>
            </div>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section className="stats-strip" aria-label="Chiffres clés cabinet">
          {savingsStats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="stat-item">
                <Icon size={20} aria-hidden />
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            );
          })}
        </section>

        {/* ── Deux expertises maîtresses ── */}
        <section className="expertise-duo-section">
          <div className="section-heading">
            <p className="eyebrow">Nos deux expertises maîtresses</p>
            <h2>Spécialistes là où les généralistes s'arrêtent</h2>
            <p style={{ color: "var(--muted)", marginTop: "8px", maxWidth: "560px", margin: "8px auto 0" }}>
              Nous avons fait le choix de l'excellence dans deux domaines précis plutôt que la médiocrité dans dix.
            </p>
          </div>
          <div className="expertise-duo-grid">
            {expertiseCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="expertise-duo-card">
                  <div className="expertise-duo-header" style={{ background: card.color }}>
                    <div className="expertise-duo-tag">{card.tag}</div>
                    <Icon size={36} aria-hidden color="white" />
                    <h2>{card.title}</h2>
                    <p>{card.pitch}</p>
                  </div>
                  <div className="expertise-duo-body">
                    <ul>
                      {card.points.map((pt) => (
                        <li key={pt}>
                          <CheckCircle size={15} aria-hidden />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="expertise-duo-actions">
                      <Link href={card.ctaHref} className="primary-action" style={{ fontSize: "0.88rem", padding: "10px 18px" }}>
                        {card.cta} <ArrowRight size={14} aria-hidden />
                      </Link>
                      <Link href={card.href} className="secondary-action" style={{ fontSize: "0.85rem" }}>
                        En savoir plus
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Checklist emprunteur ── */}
        <section className="checklist-section">
          <div className="section-heading">
            <p className="eyebrow">Êtes-vous concerné ?</p>
            <h2>Vous devriez nous appeler si…</h2>
          </div>
          <div className="checklist-grid">
            {checklistEmprunteur.map((item) => (
              <div key={item} className="checklist-item">
                <CheckCircle2 size={20} aria-hidden />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Link className="primary-action" href="/contact#rendez-vous">
              Oui, je veux une analyse gratuite <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </section>

        {/* ── Pourquoi nous ── */}
        <section className="why-us-section">
          <div className="section-heading">
            <p className="eyebrow">Pourquoi nous choisir</p>
            <h2>Un cabinet qui s'engage sur des résultats</h2>
          </div>
          <div className="values-grid">
            {whyUs.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="value-card">
                  <Icon size={24} aria-hidden />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Notre processus ── */}
        <section className="process-section">
          <div className="section-heading">
            <p className="eyebrow">Notre méthode</p>
            <h2>De l'analyse à la protection en 4 étapes</h2>
          </div>
          <div className="process-grid">
            {processSteps.map((step) => (
              <div key={step.num} className="process-step">
                <div className="process-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA final ── */}
        <section
          style={{
            margin: "0 0 80px",
            padding: "clamp(36px, 5vw, 64px) clamp(24px, 5vw, 64px)",
            borderRadius: "var(--radius)",
            background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-soft) 100%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <p className="eyebrow" style={{ color: "var(--gold)" }}>Analyse gratuite</p>
          <h2 style={{ color: "white", maxWidth: "640px", margin: "8px auto 16px" }}>
            30 minutes pour identifier vos économies et protéger votre famille.
          </h2>
          <p style={{ color: "rgba(247,245,240,.7)", maxWidth: "520px", margin: "0 auto 32px", lineHeight: 1.6 }}>
            Rendez-vous en cabinet, par téléphone ou en visio. Premier échange gratuit et sans engagement.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <Link
              className="primary-action"
              href="/contact#rendez-vous"
              style={{ background: "var(--gold)", color: "var(--navy)" }}
            >
              <CalendarDays size={17} aria-hidden />
              Prendre rendez-vous en ligne
            </Link>
            <Link
              className="secondary-action"
              href="/a-propos"
              style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "white" }}
            >
              Découvrir le cabinet
            </Link>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
