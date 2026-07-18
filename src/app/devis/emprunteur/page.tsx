import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { EmprunteurTunnel } from "./emprunteur-tunnel";

export const metadata: Metadata = {
  title: "Devis assurance emprunteur — EJ Partners Assurances",
  description: "Obtenez votre devis d'assurance emprunteur en quelques minutes. Renseignez vos informations et déposez vos documents en toute sécurité.",
  robots: { index: false, follow: false },
};

export default function DevisEmprunteurPage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main">
        <EmprunteurTunnel />
      </main>
    </>
  );
}
