import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  HeartHandshake,
  Home,
  Scale,
} from "lucide-react";

/* Page d'accueil publique : deux expertises EJ Partners Assurances en thème Navy Fintech. */
export const metadata: Metadata = {
  title: "Assurance emprunteur et transmission parent social enfant",
  description:
    "EJ Partners Assurances accompagne les emprunteurs et les coparents sociaux pour proteger le pret, le patrimoine et la transmission aux enfants.",
  alternates: { canonical: "https://www.ej-assurances.fr" },
};

const stats = [
  { value: "2", label: "expertises cabinet" },
  { value: "60%", label: "risque de taxation possible hors lien juridique" },
  { value: "100%", label: "conseil documente et humain" },
];

const expertises = [
  {
    title: "Assurance emprunteur",
    description:
      "Comparer les garanties, optimiser les quotites, reduire le cout de l'assurance et securiser le logement familial.",
    href: "/assurance-emprunteur",
    cta: "Voir l'expertise emprunteur",
    icon: Home,
  },
  {
    title: "Parent social et transmission a l'enfant",
    description:
      "Identifier le risque successoral, anticiper les droits potentiels et organiser une protection patrimoniale adaptee.",
    href: "/parent-social-enfant",
    cta: "Proteger la transmission",
    icon: HeartHandshake,
  },
];

const transmissionRisks = [
  "L'enfant aime et reconnait le parent social, mais le droit fiscal peut le traiter comme un tiers.",
  "Sans organisation, une transmission directe peut subir une fiscalite tres lourde, souvent proche de 60%.",
  "Le logement, l'epargne et les capitaux transmis peuvent etre fragilises au moment ou l'enfant devrait etre protege.",
];

const process = [
  { step: "1", title: "Diagnostic", text: "On distingue famille affective, famille juridique et famille heritiere." },
  { step: "2", title: "Analyse", text: "On mesure les risques : pret, logement, enfant, fiscalite, succession, prevoyance." },
  { step: "3", title: "Protection", text: "On structure les solutions : assurance, clause beneficiaire, capital, conseil notarial si besoin." },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#F6F9FC] text-[#0F172A]">
      <section className="section-hero px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 flex flex-wrap gap-3">
              <span className="navy-badge"><BadgeCheck size={14} aria-hidden /> Courtier ORIAS</span>
              <span className="navy-badge"><ClipboardCheck size={14} aria-hidden /> Transmission documentee</span>
            </div>
            <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight text-[#0F172A] sm:text-6xl lg:text-7xl">
              Proteger le <span className="text-gradient">pret</span>, le patrimoine et l'enfant.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#475569]">
              EJ Partners Assurances accompagne deux situations sensibles : l'assurance emprunteur pour securiser
              le logement, et la protection des coparents sociaux lorsque la transmission a l'enfant n'est
              pas naturellement protegee par le droit.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/parent-social-enfant" className="btn-primary inline-flex text-white items-center justify-center gap-2">
                Comprendre le risque parent social <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href="/assurance-emprunteur#simulateur"
                className="inline-flex items-center justify-center rounded-lg border border-[#D8E2F0] bg-[#EEF4FF] px-6 py-3 font-semibold text-[#0F172A] transition hover:border-[#3B82F6]"
              >
                Simuler mon assurance emprunteur
              </Link>
            </div>
          </div>

          <aside className="glass-card p-6 shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#475569]">Risque souvent ignore</p>
            <strong className="mt-5 block text-6xl font-black text-gradient">60%</strong>
            <p className="mt-4 leading-7 text-[#475569]">
              Dans certaines situations, l'enfant du conjoint, l'enfant social ou l'enfant eleve par un
              coparent peut etre fiscalement considere comme un tiers. L'enjeu du cabinet est d'anticiper
              cette fragilite avant la transmission.
            </p>
            <div className="mt-6 grid gap-3">
              {transmissionRisks.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-[#D8E2F0] bg-[#EEF4FF] p-4">
                  <Scale className="mt-1 shrink-0 text-[#8B5CF6]" size={18} aria-hidden />
                  <span className="text-sm leading-6 text-[#0F172A]">{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        {stats.map((stat) => (
          <article key={stat.label} className="glass-card p-6 text-center">
            <strong className="block text-4xl font-black text-[#0F172A]">{stat.value}</strong>
            <span className="mt-2 block text-sm font-semibold text-[#475569]">{stat.label}</span>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Expertises</p>
          <h2 className="mt-3 text-3xl font-black text-gradient sm:text-4xl">Deux portes d'entree, une meme mission : proteger les proches.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {expertises.map((expertise) => {
            const Icon = expertise.icon;
            return (
              <Link key={expertise.title} href={expertise.href} className="glass-card group p-7">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-[#EEF4FF] text-[#3B82F6]">
                  <Icon size={24} aria-hidden />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A]">{expertise.title}</h3>
                <p className="mt-3 leading-7 text-[#475569]">{expertise.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#3B82F6]">
                  {expertise.cta} <ArrowRight className="transition group-hover:translate-x-1" size={16} aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="glass-card p-7">
            <FileCheck2 className="text-[#3B82F6]" size={30} aria-hidden />
            <h2 className="mt-5 text-3xl font-black text-[#0F172A]">Le sujet n'est pas seulement assurantiel.</h2>
            <p className="mt-4 leading-8 text-[#475569]">
              Pour un parent social, la vraie question est : si je disparais demain, est-ce que l'enfant
              que j'ai eleve sera protege, ou sera-t-il traite comme un tiers au moment de transmettre ?
            </p>
          </article>
          <article className="glass-card p-7">
            <h2 className="text-3xl font-black text-gradient">Notre methode</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {process.map((item) => (
                <div key={item.step} className="rounded-xl border border-[#D8E2F0] bg-[#EEF4FF] p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] font-black text-white">
                    {item.step}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-[#0F172A]">{item.title}</h3>
                  <p className="mt-2 leading-7 text-[#475569]">{item.text}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl border border-[#D8E2F0] bg-[#FFFFFF] p-8 shadow-[0_0_30px_rgba(59,130,246,0.15)] md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-black text-[#0F172A]">Faire le point avant qu'un risque devienne irreversible.</h2>
            <p className="mt-3 max-w-2xl text-[#475569]">
              Diagnostic confidentiel : pret, logement, parent social, enfant, assurance-vie et transmission.
            </p>
          </div>
          <Link href="/contact" className="btn-primary inline-flex text-white shrink-0 items-center justify-center gap-2">
            Demander un diagnostic <Calculator size={18} aria-hidden />
          </Link>
        </div>
      </section>
      </main>
      <SiteFooter />
    </>
  );
}
