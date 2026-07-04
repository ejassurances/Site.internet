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
    default: "EJ Assurances - Assurance emprunteur et protection des familles",
    template: "%s | EJ Assurances",
  },
  description:
    "EJ Assurances accompagne les emprunteurs et les familles atypiques dans la protection du pret, du patrimoine et de la transmission aux enfants.",
  keywords: [
    "assurance emprunteur",
    "courtier assurance emprunteur",
    "simulateur assurance emprunteur",
    "parent social succession",
    "transmission enfant parent social",
    "famille recomposee succession",
    "conformite DDA",
    "EJ Assurances",
  ],
  authors: [{ name: "EJ Assurances" }],
  creator: "EJ Assurances",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "EJ Assurances",
    title: "EJ Assurances - Assurance emprunteur et protection des familles",
    description: "Assurance emprunteur, protection du parent social, transmission et conseil documente.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "EJ Assurances" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EJ Assurances - Assurance emprunteur et protection des familles",
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

const navigationLinks = [
  { label: "Accueil", href: "/" },
  { label: "Assurance emprunteur", href: "/assurance-emprunteur" },
  { label: "Parent social", href: "/parent-social-enfant" },
  { label: "Simulateur", href: "/simulateur" },
  { label: "Conformite", href: "/conformite" },
  { label: "Contact", href: "/contact" },
];

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

        <header className="sticky top-0 z-50 border-b border-[#D8E2F0] bg-[#FFFFFF]/95 backdrop-blur-xl">
          <nav className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-lg font-black tracking-tight text-[#0F172A]">
              EJ <span className="text-gradient">Assurances</span>
            </Link>
            <div className="hidden items-center gap-1 md:flex">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#EEF4FF] hover:text-[#0F172A]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link href="/connexion" className="btn-primary px-4 py-2 text-sm text-white">
              Espace client
            </Link>
          </nav>
        </header>

        {children}

        <footer className="border-t border-[#D8E2F0] bg-[#FFFFFF]">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-[#475569] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <p>© {new Date().getFullYear()} EJ Assurances. Tous droits reserves.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/mentions-legales" className="transition hover:text-[#0F172A]">
                Mentions legales
              </Link>
              <Link href="/confidentialite" className="transition hover:text-[#0F172A]">
                Confidentialite
              </Link>
              <Link href="/contact" className="transition hover:text-[#0F172A]">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
