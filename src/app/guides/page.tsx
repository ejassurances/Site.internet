import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData, organizationSchema, breadcrumbSchema, webPageSchema } from "@/components/seo/structured-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const pageUrl = "https://www.ej-assurances.fr/guides";

export const metadata: Metadata = {
  title: "Guides et articles — Assurance emprunteur | EJ Assurances",
  description:
    "Guides pratiques sur l'assurance emprunteur, la loi Lemoine, les familles recomposées, la coparentalité et les couples LGBT. Des contenus pédagogiques pour comprendre et décider.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Guides et articles — Assurance emprunteur | EJ Assurances",
    description:
      "Guides pratiques sur l'assurance emprunteur, la loi Lemoine, les familles recomposées, la coparentalité et les couples LGBT.",
    url: pageUrl,
    type: "website",
  },
};

const guides = [
  {
    slug: "quotite-assurance-emprunteur-50-100",
    title: "Quotité assurance emprunteur : 50/50, 100/100 ou personnalisée ?",
    description:
      "Comprendre la quotité d'assurance emprunteur et comment la choisir entre co-emprunteurs selon la situation familiale et financière.",
    category: "Assurance emprunteur",
    date: "2025-01-15",
  },
  {
    slug: "famille-recomposee-pret-immobilier-erreurs",
    title: "Famille recomposée et prêt immobilier : les erreurs à éviter",
    description:
      "Les points de vigilance spécifiques aux familles recomposées lors de la souscription d'une assurance emprunteur.",
    category: "Familles recomposées",
    date: "2025-01-22",
  },
  {
    slug: "couple-lgbt-assurance-emprunteur",
    title: "Couple LGBT et assurance emprunteur : ce qu'il faut savoir",
    description:
      "Les spécificités de l'assurance emprunteur pour les couples de même sexe : garanties, quotité et protection du foyer.",
    category: "Couples LGBT",
    date: "2025-02-05",
  },
  {
    slug: "coparentalite-proteger-enfants-logement",
    title: "Coparentalité : comment protéger les enfants et le logement",
    description:
      "En situation de coparentalité, l'assurance emprunteur soulève des questions spécifiques sur la protection des enfants et du logement.",
    category: "Coparentalité",
    date: "2025-02-12",
  },
  {
    slug: "loi-lemoine-changer-assurance-emprunteur",
    title: "Loi Lemoine : quand et comment changer d'assurance emprunteur",
    description:
      "Depuis 2022, la loi Lemoine permet de changer d'assurance emprunteur à tout moment. Comprendre les conditions et les démarches.",
    category: "Loi Lemoine",
    date: "2025-02-19",
  },
  {
    slug: "questionnaire-medical-assurance-emprunteur",
    title: "Questionnaire médical : ce qui change selon les situations",
    description:
      "Le questionnaire médical de l'assurance emprunteur varie selon les situations. Ce qu'il contient et ce qui peut changer.",
    category: "Assurance emprunteur",
    date: "2025-03-05",
  },
  {
    slug: "co-emprunteur-repartir-garanties",
    title: "Co-emprunteur : comment répartir les garanties",
    description:
      "Répartir les garanties entre co-emprunteurs est une décision importante. Les critères à prendre en compte selon la situation.",
    category: "Co-emprunteur",
    date: "2025-03-12",
  },
  {
    slug: "separation-assurance-pret",
    title: "Séparation : faut-il revoir son assurance de prêt ?",
    description:
      "Une séparation ou un divorce peut modifier la situation des co-emprunteurs. Les points à vérifier sur l'assurance emprunteur.",
    category: "Familles recomposées",
    date: "2025-03-19",
  },
];

const categoryColors: Record<string, string> = {
  "Assurance emprunteur": "#1B2A4A",
  "Familles recomposées": "#7C5C2E",
  "Couples LGBT": "#5C2E7C",
  "Coparentalité": "#2E5C7C",
  "Loi Lemoine": "#2E7C5C",
  "Co-emprunteur": "#7C2E2E",
};

export default function GuidesPage() {
  return (
    <>
      <SiteHeader />
      <StructuredData data={organizationSchema} />
      <StructuredData
        data={webPageSchema({
          url: pageUrl,
          name: "Guides et articles — Assurance emprunteur",
          description:
            "Guides pratiques sur l'assurance emprunteur, la loi Lemoine, les familles recomposées, la coparentalité et les couples LGBT.",
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Accueil", url: "https://www.ej-assurances.fr/" },
          { name: "Guides", url: pageUrl },
        ])}
      />

      <main className="geo-page">
        <div className="geo-page-container">

          <nav className="geo-breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span aria-hidden="true"> › </span>
            <span>Guides</span>
          </nav>

          <h1 className="geo-h1">Guides et articles sur l&apos;assurance emprunteur</h1>

          <p className="geo-intro">
            Des contenus pédagogiques pour comprendre l&apos;assurance emprunteur, la loi Lemoine, et les spécificités des familles modernes. Ces guides sont informatifs et ne constituent pas un conseil personnalisé.
          </p>

          <div className="guides-grid">
            {guides.map((guide) => (
              <article key={guide.slug} className="guide-card">
                <div
                  className="guide-card-category"
                  style={{ backgroundColor: categoryColors[guide.category] || "#1B2A4A" }}
                >
                  {guide.category}
                </div>
                <h2 className="guide-card-title">
                  <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                </h2>
                <p className="guide-card-desc">{guide.description}</p>
                <div className="guide-card-footer">
                  <time dateTime={guide.date}>
                    {new Date(guide.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <Link href={`/guides/${guide.slug}`} className="guide-card-link">
                    Lire le guide →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="geo-cta" style={{ marginTop: "48px" }}>
            <p>Vous avez une question sur votre situation ?</p>
            <Link href="/contact#rendez-vous" className="geo-cta-link">
              Prendre rendez-vous avec un courtier
            </Link>
          </div>

        </div>
      </main>
      <SiteFooter />
    </>
  );
}
