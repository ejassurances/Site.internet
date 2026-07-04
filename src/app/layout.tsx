import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { StructuredData, organizationSchema, websiteSchema } from "@/components/seo/structured-data";

/* Layout racine EJ Assurances : police Inter, fond Navy Fintech, navigation et footer globaux. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ej-assurances.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EJ Assurances - Courtier assurance emprunteur",
    template: "%s | EJ Assurances",
  },
  description:
    "EJ Assurances accompagne les emprunteurs avec une approche claire, conforme et personnalisée de l'assurance de prêt.",
  keywords: [
    "assurance emprunteur",
    "courtier assurance emprunteur",
    "simulateur assurance emprunteur",
    "conformité DDA",
    "EJ Assurances",
  ],
  authors: [{ name: "EJ Assurances" }],
  creator: "EJ Assurances",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "EJ Assurances",
    title: "EJ Assurances - Courtier assurance emprunteur",
    description: "Simulation, analyse et accompagnement en assurance emprunteur.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "EJ Assurances" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EJ Assurances - Courtier assurance emprunteur",
    description: "Simulation, analyse et accompagnement en assurance emprunteur.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: siteUrl },
};

const navigationLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/assurance-emprunteur" },
  { label: "Simulateur", href: "/simulateur" },
  { label: "Conformité", href: "/conformite" },
  { label: "Contact", href: "/contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-[#07111E] text-[#F0F4F8] antialiased">
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />

        <header className="sticky top-0 z-50 border-b border-[#1E3A5F] bg-[#0D1B2A]/95 backdrop-blur-xl">
          <nav className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-lg font-black tracking-tight text-white">
              EJ <span className="text-gradient">Assurances</span>
            </Link>
            <div className="hidden items-center gap-1 md:flex">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-[#94A3B8] transition hover:bg-[#112240] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link href="/connexion" className="btn-primary px-4 py-2 text-sm">
              Espace client
            </Link>
          </nav>
        </header>

        {children}

        <footer className="border-t border-[#1E3A5F] bg-[#0D1B2A]">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-[#94A3B8] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <p>© {new Date().getFullYear()} EJ Assurances. Tous droits réservés.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/mentions-legales" className="transition hover:text-white">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="transition hover:text-white">
                Confidentialité
              </Link>
              <Link href="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
