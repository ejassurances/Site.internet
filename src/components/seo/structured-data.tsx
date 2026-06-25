/**
 * StructuredData — Composant générique pour injecter du JSON-LD schema.org
 * Usage : <StructuredData data={organizationSchema} />
 */

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}

// ─── Schémas réutilisables ────────────────────────────────────────────────────

const siteUrl = "https://www.ej-assurances.fr";

/** Organisation / InsuranceAgency — à inclure sur toutes les pages */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "InsuranceAgency", "LocalBusiness"],
  "@id": `${siteUrl}/#organization`,
  name: "EJ Assurances",
  alternateName: "EJ Partners Assurances",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/logo-ej-partners-assurances.png`,
    width: 400,
    height: 120,
  },
  description:
    "Cabinet de courtage en assurances spécialisé dans l'assurance emprunteur et la protection des familles modernes : familles recomposées, coparentalité, couples LGBT et situations familiales particulières.",
  areaServed: {
    "@type": "Country",
    name: "France",
  },
  knowsAbout: [
    "Assurance emprunteur",
    "Assurance de prêt immobilier",
    "Délégation d'assurance",
    "Loi Lemoine",
    "Familles recomposées",
    "Coparentalité",
    "Couples LGBT",
    "Prévoyance familiale",
    "Transmission et succession",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services du cabinet EJ Assurances",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Assurance emprunteur",
          description:
            "Accompagnement dans le choix et la mise en place d'une assurance emprunteur adaptée à votre situation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Changement d'assurance de prêt",
          description:
            "Accompagnement pour changer d'assurance emprunteur à tout moment grâce à la loi Lemoine.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Accompagnement familles recomposées",
          description:
            "Conseil personnalisé pour les familles recomposées sur la quotité, les garanties et la protection du foyer.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Accompagnement coparentalité",
          description:
            "Conseil pour les situations de coparentalité : protection des enfants, du logement et des co-emprunteurs.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Accompagnement couples LGBT",
          description:
            "Conseil spécialisé pour les couples LGBT sur l'assurance emprunteur, les garanties et la protection du foyer.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Conseil en garanties et quotités",
          description:
            "Analyse et conseil sur le choix de la quotité d'assurance (50/50, 100/100 ou personnalisée) selon la situation.",
        },
      },
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: `${siteUrl}/contact`,
    availableLanguage: "French",
  },
};

/** WebSite — à inclure sur la page d'accueil */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "EJ Assurances",
  description:
    "Cabinet de courtage en assurances spécialisé dans l'assurance emprunteur et la protection des familles modernes.",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/guides?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/** BreadcrumbList — helper pour générer un fil d'Ariane */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** WebPage — schéma de base pour une page publique */
export function webPageSchema({
  url,
  name,
  description,
  datePublished,
  dateModified,
}: {
  url: string;
  name: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified: dateModified || new Date().toISOString() }),
  };
}

/** Article — schéma pour les guides/articles de blog */
export function articleSchema({
  url,
  headline,
  description,
  datePublished,
  dateModified,
  authorName = "EJ Assurances",
}: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: authorName,
      url: siteUrl,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
