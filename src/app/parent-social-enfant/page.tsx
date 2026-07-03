import type { Metadata } from "next";
import Link from "next/link";
import { Baby, FileCheck2, HeartHandshake, Scale, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Protection du lien parent social et enfant - EJ Assurances",
  description:
    "Comprendre et proteger le lien entre un parent social et un enfant : coparentalite, familles LGBT+, familles recomposees, prevoyance, assurance-vie et transmission.",
};

const cases = [
  "Un parent social participe à l'éducation mais n'est pas reconnu automatiquement par le droit.",
  "Un enfant vit dans une famille recomposée et dépend financièrement d'un adulte qui n'est pas son parent juridique.",
  "Deux coparents souhaitent protéger le logement, les revenus et l'avenir de l'enfant.",
  "Un couple LGBT+ veut sécuriser la place de chacun auprès de l'enfant.",
];

const levers = [
  { title: "Prévoyance décès", text: "Créer des capitaux pour maintenir le niveau de vie de l'enfant et du foyer.", icon: ShieldCheck },
  { title: "Assurance-vie", text: "Préparer une transmission financière organisée, avec clauses adaptées et bénéficiaires cohérents.", icon: FileCheck2 },
  { title: "Protection juridique", text: "Documenter les volontés, les rôles et les décisions importantes avec les bons professionnels.", icon: Scale },
];

export default function ParentSocialEnfantPage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main">
        <section className="compact-hero">
          <p className="eyebrow">Protection familiale</p>
          <h1>Protéger le lien entre le parent social et l'enfant.</h1>
          <p className="hero-copy">
            Dans beaucoup de familles, la personne qui élève, aime et sécurise l'enfant n'est pas
            toujours celle que le droit ou les contrats protègent spontanément. EJ Assurances aide à
            transformer ce lien affectif en protection concrète.
          </p>
          <div className="hero-actions">
            <Link className="primary-action" href="/contact#rendez-vous">Demander un diagnostic</Link>
            <Link className="secondary-action" href="/conseils-actus">Lire nos conseils</Link>
          </div>
        </section>

        <section className="ej-situation-band">
          <div className="section-heading">
            <p className="eyebrow">Situations fréquentes</p>
            <h2>Le risque naît souvent de l'écart entre la vie réelle et le cadre juridique.</h2>
          </div>
          <div className="ej-situation-list">
            {cases.map((item) => (
              <div key={item} className="ej-situation-item">
                <Baby size={18} aria-hidden />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="ej-products-band">
          {levers.map((lever) => {
            const Icon = lever.icon;
            return (
              <article key={lever.title} className="ej-product-card">
                <Icon size={22} aria-hidden />
                <h3>{lever.title}</h3>
                <p>{lever.text}</p>
              </article>
            );
          })}
        </section>

        <section className="ej-method-section">
          <div>
            <p className="eyebrow">Méthode</p>
            <h2>Nous analysons trois familles : affective, juridique, héritière.</h2>
            <p>
              Le diagnostic identifie qui compte réellement, qui est reconnu juridiquement, et qui
              recevrait quelque chose si un décès ou une invalidité survenait demain.
            </p>
          </div>
          <ol className="ej-method-list">
            <li><span>01</span> Identifier les adultes qui assument réellement un rôle parental.</li>
            <li><span>02</span> Vérifier les protections existantes : contrat, bénéficiaire, logement, revenus.</li>
            <li><span>03</span> Construire une solution assurantielle et documentaire cohérente.</li>
          </ol>
        </section>

        <section className="ej-final-cta">
          <HeartHandshake size={26} aria-hidden />
          <h2>Votre famille mérite une protection à la hauteur de sa réalité.</h2>
          <p>Premier échange confidentiel, pédagogique et sans engagement.</p>
          <Link className="primary-action" href="/contact#rendez-vous">Prendre rendez-vous</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
