import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StructuredData, organizationSchema, websiteSchema } from "@/components/seo/structured-data";

/* Layout racine EJ Partners Assurances : police Inter, fond Navy Fintech, navigation et footer globaux. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ej-assurances.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EJ Partners Assurances - Assurance emprunteur et protection des familles",
    template: "%s | EJ Partners Assurances",
  },
  description:
    "EJ Partners Assurances accompagne les emprunteurs et les familles atypiques dans la protection du pret, du patrimoine et de la transmission aux enfants.",
  keywords: [
    "assurance emprunteur",
    "courtier assurance emprunteur",
    "simulateur assurance emprunteur",
    "parent social succession",
    "transmission enfant parent social",
    "famille recomposee succession",
    "conformite DDA",
    "EJ Partners Assurances",
  ],
  authors: [{ name: "EJ Partners Assurances" }],
  creator: "EJ Partners Assurances",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "EJ Partners Assurances",
    title: "EJ Partners Assurances - Assurance emprunteur et protection des familles",
    description: "Assurance emprunteur, protection du parent social, transmission et conseil documente.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "EJ Partners Assurances" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EJ Partners Assurances - Assurance emprunteur et protection des familles",
    description: "Assurance emprunteur, protection du parent social, transmission et conseil documente.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-[#F6F9FC] text-[#0F172A] antialiased">
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />

        {children}
      </body>
    </html>
  );
}
