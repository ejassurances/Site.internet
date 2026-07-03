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
  PiggyBank,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData, organizationSchema } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "EJ Partners Assurances - Assurance emprunteur, parent social, assurance-vie",
  description:
    "Cabinet specialise en assurance emprunteur, protection du lien parent social/enfant et creation de patrimoine financier via l'assurance-vie.",
  alternates: { canonical: "https://www.ej-assurances.fr" },
};

const familyAxes = [
  {
    title: "Famille affective",
    text: "Les personnes que vous aimez, celles qui vivent votre quotidien et que vous souhaitez proteger.",
    icon: HeartHandshake,
  },
  {
    title: "Famille juridique",
    text: "Les personnes reconnues par le droit : conjoint, partenaire, enfants, autorite parentale, heritiers.",
    icon: Scale,
  },
  {
    title: "Famille heritiere",
    text: "Les personnes qui recevront vraiment votre patrimoine si rien n'est organise.",
    icon: FileCheck2,
  },
];

const pillars = [
  {
    title: "Assurance emprunteur avec simulateur",
    text: "Comparer les garanties, reduire le cout du contrat, ajuster les quotites et securiser les co-emprunteurs avec une lecture familiale du risque.",
    href: "/devis/emprunteur",
    cta: "Lancer le simulateur",
    icon: Home,
  },
  {
    title: "Parent social et enfant",
    text: "Proteger le lien affectif, financier et familial lorsque le droit ne reconnait pas automatiquement le role du parent social.",
    href: "/parent-social-enfant",
    cta: "Comprendre les risques",
    icon: Baby,
  },
  {
    title: "Assurance-vie et patrimoine",
    text: "Construire un patrimoine financier, preparer la transmission et aligner la clause beneficiaire avec la famille reelle.",
    href: "/assurance-vie-patrimoine",
    cta: "Construire mon patrimoine",
    icon: PiggyBank,
  },
];

const situations = [
  "Vous avez un credit immobilier ou un projet d'achat.",
  "Vous voulez savoir si votre assurance emprunteur est trop chere ou mal calibree.",
  "Vous elevez un enfant avec un parent social non reconnu juridiquement.",
  "Vous voulez proteger un enfant, un conjoint, un coparent ou un proche choisi.",
  "Vous souhaitez creer un capital financier et organiser votre transmission avec l'assurance-vie.",
];

const method = [
  "Recueillir les besoins et la situation familiale reelle.",
  "Identifier les ecarts entre famille affective, juridique et heritiere.",
  "Mesurer les risques : logement, revenus, enfant, deces, invalidite, transmission.",
  "Proposer des solutions documentees, conformes DDA et validees humainement.",
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
            <h1>Assurer le pret, proteger l'enfant, construire le patrimoine.</h1>
            <p className="hero-copy">
              EJ Partners Assurances traite trois sujets prioritaires : l'assurance emprunteur avec
              simulation, la protection du lien entre le parent social et l'enfant, et la creation
              d'un patrimoine financier notamment grace a l'assurance-vie.
            </p>
            <div className="ej-hero__actions">
              <Link className="primary-action" href="/devis/emprunteur">
                <Euro size={17} aria-hidden />
                Lancer le simulateur emprunteur
              </Link>
              <Link className="secondary-action" href="/contact#rendez-vous">
                <CalendarDays size={17} aria-hidden />
                Demander un diagnostic
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
            <h2>Les personnes que vous aimez sont-elles celles qui seront protegees ?</h2>
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
            <h2>Les contrats standards ne connaissent pas toujours votre famille.</h2>
            <p>
              Notre role est de traduire votre realite familiale en protections concretes :
              assurance, prevoyance, assurance-vie, clause beneficiaire, documents et devoir de conseil.
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
            <p className="eyebrow">Les 3 sujets du cabinet</p>
            <h2>Un site centre sur les decisions qui changent vraiment la protection familiale.</h2>
          </div>
          <div className="ej-expertise-grid">
            {pillars.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.title} href={card.href} className="ej-expertise-card">
                  <Icon size={22} aria-hidden />
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <span>{card.cta} <ArrowRight size={14} aria-hidden /></span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="ej-method-section">
          <div>
            <p className="eyebrow">Methode cabinet</p>
            <h2>Une approche assurantielle, patrimoniale et conforme.</h2>
            <p>
              Nous ne partons pas d'un produit. Nous partons de votre famille, de vos volontes et
              des consequences concretes si un accident de vie survient demain.
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
            <h3>Simuler le pret</h3>
            <p>Comparer le contrat bancaire, les garanties, les quotites et les economies possibles.</p>
          </div>
          <div className="ej-product-card">
            <Baby size={22} aria-hidden />
            <h3>Proteger l'enfant</h3>
            <p>Documenter le role du parent social et creer une protection financiere adaptee.</p>
          </div>
          <div className="ej-product-card">
            <PiggyBank size={22} aria-hidden />
            <h3>Creer un patrimoine</h3>
            <p>Utiliser l'assurance-vie pour epargner, transmettre et proteger les proches choisis.</p>
          </div>
        </section>

        <section className="ej-final-cta">
          <p className="eyebrow">Premier echange confidentiel</p>
          <h2>Faisons le point sur votre pret, votre famille et votre patrimoine.</h2>
          <p>
            Le diagnostic permet de comprendre ce qui est deja protege, ce qui ne l'est pas encore,
            et les decisions a prioriser.
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
