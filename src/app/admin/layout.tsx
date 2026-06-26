import type { Metadata } from "next";

/**
 * Layout admin — noindex global sur toutes les pages /admin/*
 * Empêche l'indexation de l'espace privé par les moteurs de recherche et les crawlers IA.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
