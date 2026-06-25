import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData, organizationSchema, websiteSchema } from "@/components/seo/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ej-assurances.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EJ Partners Assurances — Cabinet expert des familles modernes",
    template: "%s | EJ Partners Assurances",
  },
  description:
    "Cabinet de courtage en assurances spécialisé dans l'assurance emprunteur et la protection des familles modernes : familles recomposées, coparentalité, couples LGBT. Conseil personnalisé, indépendant et confidentiel.",
  keywords: [
    "assurance emprunteur",
    "assurance de prêt immobilier",
    "délégation assurance emprunteur",
    "loi Lemoine",
    "assurance familles LGBT",
    "coparentalité assurance",
    "assurance emprunteur famille recomposée",
    "quotité assurance emprunteur",
    "changer assurance emprunteur",
    "courtier assurance emprunteur",
    "EJ Assurances",
    "EJ Partners Assurances",
  ],
  authors: [{ name: "EJ Partners Assurances" }],
  creator: "EJ Partners Assurances",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "EJ Partners Assurances",
    title: "EJ Partners Assurances — Cabinet expert des familles modernes",
    description:
      "Cabinet de courtage spécialisé familles LGBT+, coparentalité, familles recomposées. Assurance emprunteur, prévoyance, transmission.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EJ Partners Assurances",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EJ Partners Assurances — Cabinet expert des familles modernes",
    description:
      "Cabinet de courtage spécialisé familles LGBT+, coparentalité, familles recomposées.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
