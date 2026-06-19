import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Heart, Shield, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "À propos — EJ Partners Assurances",
  description:
    "Découvrez EJ Partners Assurances, cabinet de courtage spécialisé dans l'accompagnement des familles modernes : LGBT+, coparentalité, familles recomposées.",
};

const valeurs = [
  {
    icon: Heart,
    title: "Bienveillance",
    text: "Chaque situation familiale est accueillie sans jugement. Votre réalité est notre point de départ.",
  },
  {
    icon: Shield,
    title: "Expertise",
    text: "Une connaissance approfondie des spécificités juridiques et assurantielles des familles non conventionnelles.",
  },
  {
    icon: Users,
    title: "Engagement",
    text: "Nous défendons vos intérêts face aux compagnies d'assurance et vous accompagnons dans la durée.",
  },
];

export default function AProposPage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main">
        {/* Hero */}
        <section className="page-hero compact-hero">
          <div>
            <p className="eyebrow">À propos du cabinet</p>
            <h1>Un cabinet né d'un constat : les familles modernes méritent mieux.</h1>
            <p className="hero-copy">
              EJ Partners Assurances est un cabinet de courtage indépendant spécialisé dans
              l'accompagnement des familles qui ne rentrent pas dans les cases standard :
              familles LGBT+, coparentalité choisie, familles recomposées, parents sociaux.
            </p>
            <div className="hero-actions">
              <Link className="primary-action" href="/contact#rendez-vous">
                Prendre rendez-vous <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </div>
          <aside className="trust-panel" aria-label="Nos engagements">
            {["Courtier indépendant", "Conseil personnalisé", "Confidentialité garantie", "Expertise familles modernes", "Partenaires sélectionnés", "Suivi dans la durée"].map((item) => (
              <div key={item} className="trust-row">
                <CheckCircle2 size={20} aria-hidden />
                <span>{item}</span>
              </div>
            ))}
          </aside>
        </section>

        {/* Notre histoire */}
        <section className="content-band">
          <div>
            <p className="eyebrow">Notre histoire</p>
            <h2>Pourquoi EJ Partners Assurances existe</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: "16px" }}>
              Le cabinet est né d'un constat simple : les familles LGBT+, les parents par
              coparentalité choisie et les familles recomposées se heurtent systématiquement
              aux mêmes obstacles — des formulaires inadaptés, des conseillers peu formés,
              des contrats qui ignorent leur réalité.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              EJ Partners Assurances a été créé pour combler ce vide : apporter une expertise
              réelle, un accompagnement humain et des solutions concrètes à ces familles qui
              ne demandent qu'à être protégées comme les autres.
            </p>
          </div>
          <div>
            <p className="eyebrow">Notre mission</p>
            <h2>Aligner votre famille affective, juridique et héritière</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: "16px" }}>
              Notre méthode — la Family Protection OS — part d'une lecture en trois dimensions :
              qui aimez-vous et souhaitez protéger, ce que la loi reconnaît aujourd'hui,
              et ce qui se transmettrait réellement en cas d'accident de vie.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              C'est cette analyse qui nous permet de construire une protection cohérente,
              sans angle mort, adaptée à votre situation réelle.
            </p>
          </div>
        </section>

        {/* Valeurs */}
        <section style={{ padding: "56px 0 72px", borderTop: "1px solid var(--line)" }}>
          <div className="section-heading" style={{ marginBottom: "32px" }}>
            <p className="eyebrow">Nos valeurs</p>
            <h2>Ce qui guide chaque conseil que nous donnons</h2>
          </div>
          <div className="values-grid">
            {valeurs.map((v) => {
              const Icon = v.icon;
              return (
                <article key={v.title} className="value-card">
                  <Icon size={28} aria-hidden />
                  <h2>{v.title}</h2>
                  <p>{v.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            margin: "0 0 80px",
            padding: "clamp(36px, 5vw, 64px) clamp(24px, 5vw, 64px)",
            borderRadius: "var(--radius)",
            background: "linear-gradient(135deg, var(--navy), var(--navy-soft))",
            color: "white",
            textAlign: "center",
          }}
        >
          <p className="eyebrow" style={{ color: "var(--gold)" }}>Rencontrons-nous</p>
          <h2 style={{ color: "white", maxWidth: "580px", margin: "8px auto 16px" }}>
            Prenez rendez-vous pour un premier échange gratuit.
          </h2>
          <p style={{ color: "rgba(247,245,240,.7)", maxWidth: "480px", margin: "0 auto 32px", lineHeight: 1.6 }}>
            En cabinet à Paris, par téléphone ou en visio. Nous prenons le temps de comprendre votre situation avant de proposer quoi que ce soit.
          </p>
          <Link
            className="primary-action"
            href="/contact#rendez-vous"
            style={{ background: "var(--gold)", color: "var(--navy)", display: "inline-flex" }}
          >
            Prendre rendez-vous <ArrowRight size={18} aria-hidden />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
