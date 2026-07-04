import type { Metadata } from "next";
import { SimulateurClient } from "./simulateur-client";

/* Page simulateur : point d'entrée public pour estimer une assurance emprunteur. */
export const metadata: Metadata = {
  title: "Simulateur assurance emprunteur",
  description: "Estimez votre taux et votre prime mensuelle d'assurance emprunteur avec EJ Assurances.",
};

export default function SimulateurPage() {
  return (
    <main className="min-h-screen bg-[#07111E] px-4 py-16 text-[#F0F4F8] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Simulateur</p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl">
            Estimez votre <span className="text-gradient">assurance emprunteur</span>.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#94A3B8]">
            Renseignez les informations principales de votre prêt pour obtenir une première estimation.
            Le cabinet affine ensuite le résultat avec les garanties, quotités et documents du dossier.
          </p>
        </div>
        <SimulateurClient />
      </section>
    </main>
  );
}
