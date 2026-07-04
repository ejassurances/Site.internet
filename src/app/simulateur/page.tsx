import type { Metadata } from "next";
import { SimulateurClient } from "./simulateur-client";

/* Page simulateur : outil natif EJ Assurances pour comparer l'assurance emprunteur. */
export const metadata: Metadata = {
  title: "Simulateur assurance emprunteur",
  description: "Simulez votre assurance emprunteur et estimez les economies potentielles avec EJ Assurances.",
};

export default function SimulateurPage() {
  return (
    <main className="min-h-screen bg-[#F6F9FC] px-4 py-16 text-[#0F172A] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Simulateur</p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-[#0F172A] sm:text-6xl">
            Comparez votre <span className="text-gradient">assurance emprunteur</span>.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#475569]">
            Renseignez les informations principales de votre pret pour obtenir une premiere estimation.
            Le cabinet affine ensuite le resultat avec les garanties, quotites et documents du dossier.
          </p>
        </div>
        <SimulateurClient />
      </section>
    </main>
  );
}
