import type { Metadata } from "next";

/* Page simulateur : iframe Magnolia en marque blanche pour comparer l'assurance emprunteur. */
export const metadata: Metadata = {
  title: "Simulateur assurance emprunteur",
  description: "Comparez votre assurance emprunteur avec le simulateur EJ Assurances.",
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
            Utilisez le simulateur pour obtenir une premiere comparaison. Le cabinet peut ensuite
            analyser les garanties, les quotites et les documents de votre dossier.
          </p>
        </div>

        <div className="glass-card overflow-hidden p-2 shadow-[0_0_30px_rgba(59,130,246,0.12)]">
          <iframe
            src="https://www.magnolia.fr/comparer-assurance-pret-immobilier?utm_source=33594&whiteLabel=true&platform=direct"
            title="Simulateur assurance emprunteur EJ Assurances"
            className="h-[780px] w-full rounded-lg border-0 md:h-[880px]"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>
    </main>
  );
}
