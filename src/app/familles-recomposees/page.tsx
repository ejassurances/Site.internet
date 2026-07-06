import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData, organizationSchema, breadcrumbSchema, webPageSchema } from "@/components/seo/structured-data";
import { FAQSection } from "@/components/seo/faq-section";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const pageUrl = "https://www.ej-assurances.fr/familles-recomposees";

export const metadata: Metadata = {
  title: "Assurance emprunteur famille recomposée | EJ Assurances",
  description:
    "Comprendre les points à vérifier pour protéger une famille recomposée avec une assurance emprunteur : quotité, co-emprunteur, séparation, décès et garanties.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Assurance emprunteur famille recomposée | EJ Assurances",
    description:
      "Comprendre les points à vérifier pour protéger une famille recomposée avec une assurance emprunteur : quotité, co-emprunteur, séparation, décès et garanties.",
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "Peut-on changer d'assurance emprunteur après la signature du prêt ?",
    answer:
      "Oui. Depuis la loi Lemoine de 2022, il est possible de changer d'assurance emprunteur à tout moment, sans frais ni pénalités, dès lors que le nouveau contrat présente un niveau de garanties au moins équivalent à celui exigé par la banque.",
  },
  {
    question: "Une famille recomposée doit-elle choisir une quotité 100/100 ?",
    answer:
      "Pas nécessairement. Le choix de la quotité dépend de la situation financière de chaque co-emprunteur, des revenus respectifs et des personnes à protéger. Une quotité 100/100 offre une protection maximale mais entraîne une prime plus élevée. Un courtier peut vous aider à trouver l'équilibre adapté.",
  },
  {
    question: "Que se passe-t-il si l'un des co-emprunteurs décède ?",
    answer:
      "En cas de décès d'un co-emprunteur, l'assurance prend en charge le remboursement du capital restant dû à hauteur de la quotité assurée. Si la quotité est de 50 %, la moitié du capital est remboursée. Si elle est de 100 %, la totalité est couverte.",
  },
  {
    question: "L'assurance emprunteur protège-t-elle les enfants ?",
    answer:
      "L'assurance emprunteur protège le logement familial en cas de décès ou d'incapacité d'un co-emprunteur, ce qui bénéficie indirectement aux enfants. Pour une protection directe des enfants, d'autres contrats comme la prévoyance ou l'assurance vie sont plus adaptés.",
  },
  {
    question: "Le contrat doit-il être revu après une séparation ?",
    answer:
      "Oui, une séparation peut modifier la situation des co-emprunteurs et rendre nécessaire une révision du contrat d'assurance emprunteur. Il est conseillé de faire le point avec un courtier pour adapter les garanties à la nouvelle situation.",
  },
];

export default function FamillesRecomposeesPage() {
  return (
    <>
      <SiteHeader />
      <StructuredData data={organizationSchema} />
      <StructuredData data={webPageSchema({ url: pageUrl, name: "Assurance emprunteur famille recomposée", description: "Points à vérifier pour protéger une famille recomposée avec une assurance emprunteur." })} />
      <StructuredData data={breadcrumbSchema([{ name: "Accueil", url: "https://www.ej-assurances.fr/" }, { name: "Familles recomposées", url: pageUrl }])} />

      <main className="geo-page">
        <div className="geo-page-container">

          {/* Fil d'Ariane */}
          <nav className="geo-breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span aria-hidden="true"> › </span>
            <span>Familles recomposées</span>
          </nav>

          {/* H1 */}
          <h1 className="geo-h1">
            Assurance emprunteur pour famille recomposée : les points à vérifier
          </h1>

          {/* Introduction */}
          <p className="geo-intro">
            Dans une famille recomposée, l&apos;assurance emprunteur ne protège pas seulement un prêt immobilier. Elle peut aussi avoir des conséquences importantes pour le conjoint, l&apos;ex-conjoint, les enfants et les co-emprunteurs. Voici les principaux points à vérifier avant de choisir ou modifier son contrat.
          </p>

          {/* Contenu principal */}
          <div className="geo-content">

            <h2>Pourquoi l&apos;assurance emprunteur est-elle importante dans une famille recomposée ?</h2>
            <p>
              Dans une famille recomposée, la situation patrimoniale est souvent plus complexe qu&apos;au sein d&apos;un foyer traditionnel. Les co-emprunteurs peuvent avoir des revenus très différents, des enfants issus d&apos;unions précédentes, et des droits successoraux qui ne correspondent pas automatiquement à la réalité du foyer. L&apos;assurance emprunteur est le filet de sécurité qui permet de maintenir le logement familial en cas d&apos;accident de la vie.
            </p>

            <h2>Quels risques en cas de séparation ou de décès ?</h2>
            <p>
              En cas de séparation, les co-emprunteurs restent solidairement engagés sur le prêt immobilier, sauf rachat de soulte ou accord bancaire. Si l&apos;un des co-emprunteurs décède, l&apos;assurance prend en charge le capital restant dû à hauteur de la quotité assurée. Sans couverture suffisante, le co-emprunteur survivant peut se retrouver seul à assumer l&apos;intégralité des mensualités.
            </p>

            <h2>Comment choisir la bonne quotité entre co-emprunteurs ?</h2>
            <p>
              La quotité représente la part du capital assurée pour chaque co-emprunteur. Elle peut être répartie à 50/50, à 100/100, ou de manière asymétrique (par exemple 70/30) selon les revenus et les besoins de protection. Dans une famille recomposée, il est souvent pertinent d&apos;analyser qui supporte réellement la charge du prêt et qui serait le plus vulnérable en cas de sinistre.
            </p>

            <h2>Le conjoint, le partenaire ou l&apos;ex-conjoint est-il correctement protégé ?</h2>
            <p>
              L&apos;assurance emprunteur couvre les co-emprunteurs signataires du prêt, pas nécessairement tous les membres du foyer. Si le conjoint actuel n&apos;est pas co-emprunteur, il ne bénéficie pas directement de la couverture. Il peut être utile d&apos;envisager des contrats complémentaires (assurance vie, prévoyance) pour assurer une protection globale du foyer.
            </p>

            <h2>Quels documents préparer avant une étude ?</h2>
            <p>
              Pour obtenir une étude personnalisée, il est utile de rassembler les éléments suivants : le tableau d&apos;amortissement du prêt, les conditions générales du contrat d&apos;assurance actuel, les avis d&apos;imposition des deux co-emprunteurs, et tout document relatif à la situation familiale (jugement de divorce, convention de coparentalité, acte de PACS).
            </p>

            <h2>Quand faut-il revoir son assurance de prêt ?</h2>
            <p>
              Plusieurs événements justifient une révision du contrat : une séparation ou un divorce, un remariage ou une mise en couple, la naissance ou l&apos;arrivée d&apos;un enfant dans le foyer, un changement de situation professionnelle, ou simplement l&apos;évolution des tarifs du marché. La loi Lemoine permet désormais de changer à tout moment.
            </p>

            <h2>Pourquoi passer par un courtier ?</h2>
            <p>
              Un courtier spécialisé dans les familles modernes connaît les subtilités liées aux situations de coparentalité, de famille recomposée ou de couples non mariés. Il peut comparer les offres de plusieurs assureurs, identifier les clauses importantes et vous accompagner dans les démarches de délégation d&apos;assurance auprès de votre banque.
            </p>

            {/* À retenir */}
            <div className="geo-key-points">
              <h2>À retenir</h2>
              <ul>
                <li>La quotité d&apos;assurance doit être choisie en fonction de la situation réelle de chaque co-emprunteur.</li>
                <li>Une séparation ou un changement de situation familiale justifie une révision du contrat.</li>
                <li>La loi Lemoine permet de changer d&apos;assurance emprunteur à tout moment sans frais.</li>
                <li>L&apos;assurance emprunteur protège le logement, pas directement les enfants — d&apos;autres contrats peuvent compléter la protection.</li>
                <li>Un courtier spécialisé peut vous aider à trouver la couverture la plus adaptée à votre situation.</li>
              </ul>
            </div>

            {/* FAQ */}
            <FAQSection items={faqItems} />

            {/* Maillage interne */}
            <div className="geo-related">
              <h2>Pages utiles</h2>
              <div className="geo-related-links">
                <Link href="/assurance-emprunteur">Assurance emprunteur</Link>
                <Link href="/coparentalite">Coparentalité</Link>
                <Link href="/quotite-assurance-emprunteur">Quotité d&apos;assurance</Link>
                <Link href="/changer-assurance-emprunteur">Changer d&apos;assurance</Link>
                <Link href="/loi-lemoine">Loi Lemoine</Link>
                <Link href="/co-emprunteur">Co-emprunteur</Link>
              </div>
            </div>

            {/* CTA sobre */}
            <div className="geo-cta">
              <p>Vous souhaitez faire le point sur votre situation ?</p>
              <Link href="/contact#rendez-vous" className="geo-cta-link">
                Prendre rendez-vous avec un courtier
              </Link>
            </div>

          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
