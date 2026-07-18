import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Conseils et actualités - EJ Partners Assurances",
  description:
    "Conseils, articles et actualités sur l'assurance emprunteur, le parent social, l'enfant, l'assurance-vie et la protection patrimoniale des familles.",
};

const articles = [
  {
    category: "Assurance emprunteur",
    title: "Pourquoi simuler son assurance emprunteur avant d'accepter le contrat bancaire ?",
    text: "La délégation peut réduire le coût, mais elle doit rester cohérente avec les quotités, les garanties et la situation familiale.",
    href: "/assurance-emprunteur",
  },
  {
    category: "Parent social",
    title: "Parent social et enfant : que se passe-t-il si rien n'est organisé ?",
    text: "Le lien affectif ne suffit pas toujours. Assurance, prévoyance et documents doivent être pensés ensemble.",
    href: "/parent-social-enfant",
  },
  {
    category: "Assurance-vie",
    title: "Assurance-vie : la clause bénéficiaire est-elle adaptée à votre vraie famille ?",
    text: "Couple non marié, famille recomposée, enfant social : la clause doit traduire une volonté claire.",
    href: "/assurance-vie-patrimoine",
  },
];

export default function ConseilsActusPage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main">
        <section className="compact-hero">
          <p className="eyebrow">Conseils & actus</p>
          <h1>Comprendre avant de décider.</h1>
          <p className="hero-copy">
            Cette rubrique accueillera les articles, décryptages et actualités du cabinet sur les
            trois sujets centraux : assurance emprunteur, protection du lien parent social/enfant,
            et création d'un patrimoine financier grâce à l'assurance-vie.
          </p>
          <div className="hero-actions">
            <Link className="primary-action" href="/contact#rendez-vous">
              <CalendarDays size={17} aria-hidden />
              Poser une question
            </Link>
          </div>
        </section>

        <section className="ej-expertise-section">
          <div className="section-heading">
            <p className="eyebrow">À publier</p>
            <h2>Premiers thèmes éditoriaux.</h2>
          </div>
          <div className="ej-expertise-grid">
            {articles.map((article) => (
              <Link key={article.title} href={article.href} className="ej-expertise-card">
                <BookOpen size={22} aria-hidden />
                <span>{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.text}</p>
                <span>Lire le thème <ArrowRight size={14} aria-hidden /></span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
