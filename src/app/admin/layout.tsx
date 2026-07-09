import type { Metadata } from "next";
import { requireRole } from "@/lib/auth";

/**
 * Layout admin — noindex global sur toutes les pages /admin/*
 * Empêche l'indexation de l'espace privé par les moteurs de recherche et les crawlers IA.
 *
 * P0-01 — Security by Design (réf. 227 §7) : garde de rôle au niveau route.
 * Protège l'ensemble des pages /admin/*, y compris les écrans client-only qui ne
 * peuvent pas appeler requireRole eux-mêmes (finance/*, conformite/lcb-ft).
 * Les pages serveur qui appellent déjà requireRole restent inchangées (défense en profondeur).
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

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["admin", "courtier"]);
  return <>{children}</>;
}
