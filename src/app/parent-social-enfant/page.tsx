import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, HeartHandshake, Landmark, PiggyBank, Scale, ShieldCheck } from "lucide-react";

/* Page expertise : parent social, enfant et transmission patrimoniale. */
export const metadata: Metadata = {
  title: "Parent social et transmission a l'enfant",
  description:
    "Comprendre le risque fiscal et successoral du parent social : droits de succession, assurance-vie, prevoyance et transmission a l'enfant.",
};

const risks = [
  {
    title: "Famille affective",
    text: "L'enfant vit, grandit ou est soutenu par un adulte qu'il considere comme un parent.",
  },
  {
    title: "Famille juridique",
    text: "Le droit ne reconnait pas toujours ce lien comme un lien parent-enfant.",
  },
  {
    title: "Famille heritiere",
    text: "En cas de deces, l'enfant peut ne rien recevoir ou recevoir avec une fiscalite tres lourde.",
  },
];

const solutions = [
  {
    title: "Assurance-vie",
    text: "Structurer un capital, travailler la clause beneficiaire et organiser une transmission plus lisible.",
    icon: PiggyBank,
  },
  {
    title: "Prevoyance deces",
    text: "Creer un capital disponible pour l'enfant ou le foyer si le parent social disparait.",
    icon: ShieldCheck,
  },
  {
    title: "Coordination juridique",
    text: "Identifier les points qui doivent etre documentes avec notaire, avocat ou conseil patrimonial.",
    icon: Landmark,
  },
];

export default function ParentSocialEnfantPage() {
  return (
    <main className="bg-[#07111E] text-[#F0F4F8]">
      <section className="section-hero px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Expertise parent social</p>
            <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
              Transmettre a l'enfant que l'on protege vraiment.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#94A3B8]">
              Dans les familles en coparentalite, recomposition familiale ou parentalite sociale,
              l'adulte qui protege l'enfant au quotidien n'est pas toujours reconnu comme parent au
              moment de transmettre son patrimoine.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2">
                Demander un diagnostic <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href="/assurance-vie-patrimoine"
                className="inline-flex items-center justify-center rounded-lg border border-[#1E3A5F] bg-[#112240] px-6 py-3 font-semibold text-white transition hover:border-[#3B82F6]"
              >
                Assurance-vie et patrimoine
              </Link>
            </div>
          </div>

          <aside className="glass-card p-7">
            <Scale className="text-[#8B5CF6]" size={32} aria-hidden />
            <strong className="mt-5 block text-6xl font-black text-gradient">60%</strong>
            <h2 className="mt-4 text-2xl font-black text-white">Le risque fiscal du lien non reconnu.</h2>
            <p className="mt-4 leading-7 text-[#94A3B8]">
              Si l'enfant n'est pas juridiquement reconnu comme descendant, une transmission peut etre
              taxee comme entre personnes sans lien familial direct. Le risque peut alors atteindre un
              niveau proche de 60%, ce qui fragilise la protection voulue.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Le probleme</p>
          <h2 className="mt-3 text-3xl font-black text-gradient sm:text-4xl">
            La famille de coeur n'est pas toujours la famille fiscale.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {risks.map((risk) => (
            <article key={risk.title} className="glass-card p-6">
              <h3 className="text-xl font-bold text-white">{risk.title}</h3>
              <p className="mt-3 leading-7 text-[#94A3B8]">{risk.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="glass-card grid gap-8 p-7 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <HeartHandshake className="text-[#3B82F6]" size={34} aria-hidden />
            <h2 className="mt-5 text-3xl font-black text-white">Objectif : proteger la transmission, pas vendre un produit.</h2>
            <p className="mt-4 leading-8 text-[#94A3B8]">
              Nous analysons ce qui se passerait si le parent social decedait demain : qui herite,
              qui paie, qui recoit un capital, qui conserve le logement et si cette situation correspond
              vraiment a la volonte familiale.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              "Identifier l'enfant ou les enfants a proteger.",
              "Mesurer l'ecart entre lien affectif, lien juridique et transmission reelle.",
              "Evaluer les droits, capitaux necessaires et risques de blocage.",
              "Construire une solution assurance-vie, prevoyance et conseil patrimonial coordonne.",
            ].map((item, index) => (
              <div key={item} className="flex gap-4 rounded-xl border border-[#1E3A5F] bg-[#112240] p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] font-black text-white">
                  {index + 1}
                </span>
                <p className="m-0 leading-7 text-[#F0F4F8]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Leviers</p>
          <h2 className="mt-3 text-3xl font-black text-gradient sm:text-4xl">Des solutions a combiner selon la situation.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <article key={solution.title} className="glass-card p-6">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-[#112240] text-[#3B82F6]">
                  <Icon size={24} aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-white">{solution.title}</h3>
                <p className="mt-3 leading-7 text-[#94A3B8]">{solution.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl border border-[#1E3A5F] bg-[#0D1B2A] p-8 shadow-[0_0_30px_rgba(59,130,246,0.15)] md:flex-row md:items-center">
          <div>
            <FileCheck2 className="mb-4 text-[#3B82F6]" size={28} aria-hidden />
            <h2 className="text-3xl font-black text-white">Votre volonte doit etre traduite en protection concrete.</h2>
            <p className="mt-3 max-w-2xl text-[#94A3B8]">
              Premier echange confidentiel pour verifier le risque fiscal, successoral et assurantiel.
            </p>
          </div>
          <Link href="/contact" className="btn-primary inline-flex shrink-0 items-center justify-center gap-2">
            Faire le diagnostic
          </Link>
        </div>
      </section>
    </main>
  );
}
