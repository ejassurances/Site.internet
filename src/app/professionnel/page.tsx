import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Building2, HeartPulse, Users2, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Assurance des professionnels — RC Pro, multirisque, prévoyance TNS",
  description:
    "Pôle Professionnel d'EJ Partners Assurances : responsabilité civile professionnelle, multirisque, prévoyance et retraite du dirigeant (TNS), santé collective. Conseil indépendant pour protéger votre activité.",
  alternates: { canonical: "https://www.ej-assurances.fr/professionnel" },
};

const offres = [
  {
    id: "rc-pro",
    icon: ShieldCheck,
    title: "Responsabilité civile professionnelle",
    text: "Couvrez les dommages causés à vos clients ou tiers dans le cadre de votre activité. Indispensable pour de nombreuses professions réglementées.",
    points: ["RC exploitation & professionnelle", "Professions réglementées", "Défense pénale et recours"],
  },
  {
    id: "multirisque",
    icon: Building2,
    title: "Multirisque professionnelle",
    text: "Protégez vos locaux, votre matériel et votre activité contre les sinistres (incendie, dégâts des eaux, vol, bris) et la perte d'exploitation.",
    points: ["Locaux & matériel professionnel", "Perte d'exploitation", "Bris de machine & informatique"],
  },
  {
    id: "prevoyance-tns",
    icon: HeartPulse,
    title: "Prévoyance & retraite du dirigeant (TNS)",
    text: "Sécurisez vos revenus et ceux de vos proches en cas d'arrêt de travail, d'invalidité ou de décès, et préparez votre retraite avec des contrats adaptés au statut TNS (loi Madelin).",
    points: ["Maintien de revenus (IJ, invalidité)", "Capital décès & rente", "Épargne retraite Madelin / PER"],
  },
  {
    id: "sante-collective",
    icon: Users2,
    title: "Santé collective (mutuelle d'entreprise)",
    text: "Mettez en place une complémentaire santé conforme à vos obligations d'employeur, attractive pour vos équipes et optimisée fiscalement.",
    points: ["Conformité ANI & obligations employeur", "Garanties adaptées aux équipes", "Optimisation sociale et fiscale"],
  },
];

export default function ProfessionnelPage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main">
        <section className="page-hero compact-hero">
          <div>
            <p className="eyebrow">Pôle Professionnel</p>
            <h1>Protéger votre activité, votre entreprise et vos équipes</h1>
            <p className="hero-copy">
              Au-delà de l&apos;assurance emprunteur et de la protection des familles, EJ Partners Assurances
              accompagne les <strong>professionnels, indépendants et dirigeants</strong> : responsabilité civile,
              multirisque, prévoyance TNS et santé collective. Un conseil indépendant, adapté à votre métier.
            </p>
            <div className="hero-actions">
              <Link className="primary-action" href="/contact#rendez-vous">
                Prendre rendez-vous <ArrowRight size={18} aria-hidden />
              </Link>
              <Link className="secondary-action" href="/connexion">
                Accéder à mon espace
              </Link>
            </div>
          </div>
          <aside className="trust-panel" aria-label="Points d'accompagnement">
            <div className="trust-row">
              <CheckCircle2 size={20} aria-hidden />
              <span>Analyse des besoins de votre activité</span>
            </div>
            <div className="trust-row">
              <CheckCircle2 size={20} aria-hidden />
              <span>Comparaison de plusieurs assureurs</span>
            </div>
            <div className="trust-row">
              <CheckCircle2 size={20} aria-hidden />
              <span>Conformité et devoir de conseil (DDA)</span>
            </div>
            <div className="trust-row">
              <CheckCircle2 size={20} aria-hidden />
              <span>Suivi de vos contrats dans la durée</span>
            </div>
          </aside>
        </section>

        <section className="example-section">
          <div className="section-heading">
            <p className="eyebrow">Nos solutions professionnelles</p>
            <h2>Une couverture complète pour les pros et les TNS</h2>
          </div>
          <div className="example-grid">
            {offres.map((offre) => {
              const Icon = offre.icon;
              return (
                <article id={offre.id} key={offre.id} className="example-card" style={{ scrollMarginTop: "96px" }}>
                  <Icon size={26} aria-hidden style={{ color: "var(--accent-strong)" }} />
                  <h3>{offre.title}</h3>
                  <p>{offre.text}</p>
                  <ul className="service-list">
                    {offre.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="content-band detail-band">
          <div>
            <p className="eyebrow">Notre méthode</p>
            <h2>Un accompagnement sur mesure</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Nous partons de la réalité de votre métier et de votre statut pour construire une protection
              cohérente : nature de l&apos;activité, chiffre d&apos;affaires, effectifs, locaux, matériel et
              situation personnelle du dirigeant. Chaque recommandation est documentée dans le respect du
              devoir de conseil.
            </p>
          </div>
          <div>
            <p className="eyebrow">Passer à l&apos;action</p>
            <h2>Un audit de vos contrats pros</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Faites le point sur vos contrats existants et identifiez les manques ou les économies possibles.
            </p>
            <Link className="primary-action standalone" href="/contact#rendez-vous">
              Demander un audit gratuit <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
