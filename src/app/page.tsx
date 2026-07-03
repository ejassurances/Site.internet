import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  CalendarDays,
  CheckCircle2,
  Euro,
  FileCheck2,
  HeartHandshake,
  Home,
  LockKeyhole,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData, organizationSchema } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "EJ Partners Assurances - Cabinet expert en protection familiale",
  description:
    "EJ Partners Assurances accompagne les familles en coparentalite, familles LGBT+, familles recomposees et emprunteurs dans la protection des personnes qui comptent vraiment.",
  alternates: { canonical: "https://www.ej-assurances.fr" },
};

const familyAxes = [
  {
    title: "Famille affective",
    text: "Les personnes que vous aimez, celles qui vivent réellement votre quotidien et que vous souhaitez protéger.",
    icon: HeartHandshake,
  },
  {
    title: "Famille juridique",
    text: "Les personnes reconnues par le droit : conjoint, partenaire, enfants, autorité parentale, héritiers réservataires.",
    icon: Scale,
  },
  {
    title: "Famille héritière",
    text: "Les personnes qui recevront effectivement votre patrimoine si rien n'est organisé.",
    icon: FileCheck2,
  },
];

const situations = [
  "Vous élevez un enfant avec un parent social non reconnu juridiquement.",
  "Vous vivez en couple sans mariage et vous achetez un logement ensemble.",
  "Vous avez des enfants d'une précédente union et un nouveau conjoint à protéger.",
  "Vous voulez que votre assurance emprunteur couvre le vrai risque familial.",
  "Vous souhaitez sécuriser la transmission sans laisser vos proches seuls face aux règles par défaut.",
];

const expertise = [
  {
    title: "Coparentalité et parentalité choisie",
    text: "Nous identifions les angles morts : parent social, autorité parentale, décès d'un coparent, financement des enfants, organisation du logement.",
    href: "/expertise-coparentalite",
    icon: Baby,
  },
  {
    title: "Familles LGBT+",
    text: "Nous accompagnons les couples et parents LGBT+ avec une lecture assurantielle, patrimoniale et documentaire adaptée aux situations réelles.",
    href: "/familles-lgbt",
    icon: Users,
  },
  {
    title: "Familles recomposées",
    text: "Nous aidons à protéger le conjoint, les enfants de chaque branche familiale et les équilibres patrimoniaux sensibles.",
    href: "/familles-recomposees",
    icon: HeartHandshake,
  },
  {
    title: "Assurance emprunteur",
    text: "Nous optimisons le coût et la qualité de couverture en tenant compte du crédit, du couple, des enfants et de la réalité familiale.",
    href: "/assurance-emprunteur",
    icon: Home,
  },
];

const method = [
  "Recueil des besoins et situation familiale réelle.",
  "Analyse des écarts entre affectif, juridique et héritier.",
  "Cartographie des risques : logement, revenus, enfants, décès, invalidité, transmission.",
  "Recommandations documentées, conformes DDA et validées humainement.",
];

export default function HomePage() {
  return (
    <>
      <StructuredData data={organizationSchema} />
      <SiteHeader />
      <main className="public-main">
        <section className="ej-hero">
          <div className="ej-hero__content">
            <p className="eyebrow">Cabinet expert en protection familiale</p>
            <h1>
              Protéger les personnes qui comptent vraiment.
            </h1>
            <p className="hero-copy">
              EJ Partners Assurances accompagne les familles en coparentalité, les familles LGBT+,
              les familles recomposées et les emprunteurs dans les situations où le droit, l'assurance
              et la vie réelle ne protègent pas toujours les mêmes personnes.
            </p>
            <div className="ej-hero__actions">
              <Link className="primary-action" href="/contact#rendez-vous">
                <CalendarDays size={17} aria-hidden />
                Demander un diagnostic
              </Link>
              <Link className="secondary-action" href="/expertise-coparentalite">
                Comprendre notre expertise
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
            <div className="ej-trust-row" aria-label="Engagements cabinet">
              <span><ShieldCheck size={14} aria-hidden /> Courtier inscrit ORIAS</span>
              <span><LockKeyhole size={14} aria-hidden /> Approche confidentielle</span>
              <span><FileCheck2 size={14} aria-hidden /> DDA, RGPD, LCB-FT</span>
            </div>
          </div>

          <aside className="ej-diagnostic-card" aria-label="Diagnostic familial EJ Assurances">
            <div className="ej-diagnostic-card__header">
              <Sparkles size={18} aria-hidden />
              <span>Diagnostic familial</span>
            </div>
            <h2>Les personnes que vous aimez sont-elles celles qui seront protégées ?</h2>
            <div className="ej-axis-list">
              {familyAxes.map((axis) => {
                const Icon = axis.icon;
                return (
                  <div key={axis.title} className="ej-axis-item">
                    <Icon size={18} aria-hidden />
                    <div>
                      <strong>{axis.title}</strong>
                      <p>{axis.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </section>

        <section className="ej-situation-band">
          <div className="section-heading">
            <p className="eyebrow">Pourquoi agir</p>
            <h2>Les règles par défaut ne connaissent pas toujours votre famille.</h2>
            <p>
              Notre rôle est de traduire votre réalité familiale en protections concrètes :
              assurance, prévoyance, clause bénéficiaire, documents, devoir de conseil et suivi.
            </p>
          </div>
          <div className="ej-situation-list">
            {situations.map((item) => (
              <div key={item} className="ej-situation-item">
                <CheckCircle2 size={18} aria-hidden />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="ej-expertise-section">
          <div className="section-heading">
            <p className="eyebrow">Expertises</p>
            <h2>Un cabinet spécialisé dans les familles que les modèles standards comprennent mal.</h2>
          </div>
          <div className="ej-expertise-grid">
            {expertise.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.title} href={card.href} className="ej-expertise-card">
                  <Icon size={22} aria-hidden />
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <span>Voir l'expertise <ArrowRight size={14} aria-hidden /></span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="ej-method-section">
          <div>
            <p className="eyebrow">Méthode cabinet</p>
            <h2>Une approche assurantielle, patrimoniale et conforme.</h2>
            <p>
              Nous ne partons pas d'un produit. Nous partons de votre famille, de vos volontés et
              des conséquences concrètes si un accident de vie survient demain.
            </p>
          </div>
          <ol className="ej-method-list">
            {method.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="ej-products-band">
          <div className="ej-product-card">
            <Euro size={22} aria-hidden />
            <h3>Assurance emprunteur</h3>
            <p>Comparer, améliorer les garanties, réduire le coût et sécuriser les co-emprunteurs.</p>
          </div>
          <div className="ej-product-card">
            <ShieldCheck size={22} aria-hidden />
            <h3>Prévoyance familiale</h3>
            <p>Protéger les revenus, le conjoint, les enfants, le parent social et le logement.</p>
          </div>
          <div className="ej-product-card">
            <Scale size={22} aria-hidden />
            <h3>Transmission</h3>
            <p>Préparer les clauses, bénéficiaires et solutions qui respectent votre volonté.</p>
          </div>
        </section>

        <section className="ej-final-cta">
          <p className="eyebrow">Premier échange confidentiel</p>
          <h2>Faisons le point sur votre famille, vos contrats et vos angles morts.</h2>
          <p>
            Le diagnostic permet de comprendre ce qui est déjà protégé, ce qui ne l'est pas encore,
            et les décisions à prioriser.
          </p>
          <Link className="primary-action" href="/contact#rendez-vous">
            <CalendarDays size={17} aria-hidden />
            Prendre rendez-vous
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
