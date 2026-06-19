import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileHeart,
  HandHeart,
  ShieldCheck,
  Heart,
  Home,
  Users,
  Star,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { valueCards } from "@/lib/content";

export const metadata: Metadata = {
  title: "EJ Partners Assurances — Cabinet expert des familles modernes",
  description:
    "Cabinet de courtage spécialisé familles LGBT+, coparentalité, familles recomposées. Assurance emprunteur, prévoyance, transmission. Conseil confidentiel et bienveillant à Paris.",
};

const expertises = [
  {
    icon: Users,
    title: "Coparentalité choisie",
    desc: "Protégez votre projet parental et les personnes qui comptent, quel que soit le cadre juridique.",
    href: "/expertise-coparentalite",
  },
  {
    icon: Heart,
    title: "Familles LGBT+",
    desc: "Assurance emprunteur, prévoyance et transmission adaptées aux familles homoparentales.",
    href: "/familles-lgbt",
  },
  {
    icon: Home,
    title: "Assurance emprunteur",
    desc: "Délégation d'assurance sur mesure pour votre crédit immobilier, même en situation atypique.",
    href: "/assurance-emprunteur",
  },
  {
    icon: ShieldCheck,
    title: "Prévoyance familiale",
    desc: "Garanties décès, invalidité et arrêt de travail pensées pour les familles non conventionnelles.",
    href: "/prevoyance-familiale",
  },
  {
    icon: Star,
    title: "Protection des enfants",
    desc: "Sécurisez l'avenir de vos enfants, qu'ils soient biologiques, adoptés ou sociaux.",
    href: "/protection-enfants",
  },
];

const highlights = [
  "Familles LGBT+ & homoparentales",
  "Coparentalité choisie",
  "Familles recomposées",
  "Assurance emprunteur",
  "Prévoyance & transmission",
  "Conseil confidentiel & bienveillant",
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main">
        {/* ── Hero ── */}
        <section className="home-hero">
          <div>
            <div className="hero-proof">
              <span>🏳️‍🌈 Familles LGBT+</span>
              <span>👨‍👩‍👧 Coparentalité</span>
              <span>🏠 Emprunteur</span>
            </div>
            <h1>Protéger votre vraie famille, pas seulement celle des formulaires.</h1>
            <p className="hero-copy">
              Famille LGBT+, coparentalité choisie, famille recomposée, parent social :
              les personnes qui comptent pour vous ne sont pas toujours celles que la loi protège
              spontanément. EJ Partners Assurances identifie ces écarts et sécurise votre foyer.
            </p>
            <div className="hero-actions">
              <Link className="primary-action" href="/contact#rendez-vous">
                Prendre rendez-vous <ArrowRight size={18} aria-hidden />
              </Link>
              <Link className="secondary-action" href="/expertise-coparentalite">
                Découvrir nos expertises
              </Link>
            </div>
          </div>

          {/* Visual card */}
          <div className="hero-visual premium-visual" aria-label="Méthode EJ Assurances">
            <div className="visual-header">
              <span>Méthode cabinet</span>
              <strong>3 familles à aligner</strong>
            </div>
            <div className="score-ring" aria-hidden>
              <span style={{ color: "var(--gold)", fontFamily: "var(--font-mono)" }}>3</span>
              <small style={{ color: "rgba(255,255,255,.55)" }}>lectures</small>
            </div>
            <div className="protection-map">
              <div>
                <ShieldCheck size={22} aria-hidden />
                <strong>Affective</strong>
                <span>Ceux que vous aimez et souhaitez protéger</span>
              </div>
              <div>
                <FileHeart size={22} aria-hidden />
                <strong>Juridique</strong>
                <span>Ce que la loi et les contrats reconnaissent</span>
              </div>
              <div>
                <HandHeart size={22} aria-hidden />
                <strong>Héritière</strong>
                <span>Ce qui se transmettrait réellement demain</span>
              </div>
            </div>
            <div className="visual-footer">
              <span>Objectif</span>
              <strong>Logement · Revenus · Enfants · Succession</strong>
            </div>
          </div>
        </section>

        {/* ── Trust strip ── */}
        <section className="trust-strip" aria-label="Positionnement cabinet">
          <span>Cabinet dédié aux familles LGBT+, recomposées et coparentales</span>
          <span>Assurance emprunteur, prévoyance, protection juridique, transmission</span>
          <span>Un accompagnement humain avant toute solution d'assurance</span>
        </section>

        {/* ── Valeurs ── */}
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

        {/* ── Expertises ── */}
        <section style={{ padding: "64px 0 80px", borderTop: "1px solid var(--line)" }}>
          <div className="section-heading" style={{ marginBottom: "32px" }}>
            <p className="eyebrow">Nos expertises</p>
            <h2>Des solutions pensées pour votre situation</h2>
            <p style={{ color: "var(--muted)", marginTop: "8px" }}>
              Chaque famille est unique. Nous adaptons nos conseils à votre réalité, pas l'inverse.
            </p>
          </div>
          <div className="values-grid">
            {expertises.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="value-card" style={{ textDecoration: "none" }}>
                  <Icon size={28} aria-hidden />
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "16px", color: "var(--accent-strong)", fontWeight: 700, fontSize: "14px" }}>
                    En savoir plus <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Approche ── */}
        <section className="split-section">
          <div>
            <p className="eyebrow">Notre approche</p>
            <h2>Nous partons de votre famille réelle, pas d'une case administrative.</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: "16px" }}>
              Notre rôle n'est pas de vous vendre un contrat au plus vite. Nous commençons par
              comprendre qui dépend de vous, qui vous souhaitez protéger, qui hériterait aujourd'hui,
              et ce qui se passerait si un accident de vie survenait demain.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Les solutions viennent ensuite : assurance emprunteur, prévoyance, assurance vie,
              protection juridique ou orientation vers un notaire.
            </p>
            <div className="hero-actions" style={{ marginTop: "28px" }}>
              <Link className="primary-action" href="/a-propos">
                Découvrir le cabinet <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </div>
          <aside className="trust-panel" aria-label="Ce que nous faisons">
            {highlights.map((item) => (
              <div key={item} className="trust-row">
                <CheckCircle2 size={20} aria-hidden />
                <span>{item}</span>
              </div>
            ))}
          </aside>
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
          <p className="eyebrow" style={{ color: "var(--gold)" }}>Prendre rendez-vous</p>
          <h2 style={{ color: "white", maxWidth: "640px", margin: "8px auto 16px" }}>
            Parlez-nous de votre famille. Nous trouverons la bonne protection.
          </h2>
          <p style={{ color: "rgba(247,245,240,.7)", maxWidth: "520px", margin: "0 auto 32px", lineHeight: 1.6 }}>
            Rendez-vous en cabinet à Paris, par téléphone ou en visio. Premier échange gratuit et sans engagement.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <Link
              className="primary-action"
              href="/contact#rendez-vous"
              style={{ background: "var(--gold)", color: "var(--navy)" }}
            >
              <CalendarDays size={18} aria-hidden />
              Prendre rendez-vous en ligne
            </Link>
            <Link
              className="secondary-action"
              href="/contact"
              style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "white" }}
            >
              Nous contacter
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
