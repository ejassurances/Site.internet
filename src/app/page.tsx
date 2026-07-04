import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ClipboardCheck, FileCheck2, ShieldCheck, TrendingUp } from "lucide-react";

/* Page d'accueil publique : positionnement courtier assurance emprunteur en thème Navy Fintech. */
export const metadata: Metadata = {
  title: "Votre courtier en assurance emprunteur",
  description:
    "EJ Assurances compare, analyse et sécurise votre assurance emprunteur avec une approche moderne, conforme et personnalisée.",
  alternates: { canonical: "https://www.ej-assurances.fr" },
};

const stats = [
  { value: "+500", label: "clients accompagnés" },
  { value: "15 ans", label: "d'expérience métier" },
  { value: "98%", label: "satisfaction client" },
];

const services = [
  {
    title: "Assurance emprunteur",
    description: "Comparer les garanties, optimiser les quotités et réduire le coût de votre assurance de prêt.",
    icon: ShieldCheck,
  },
  {
    title: "Prévoyance",
    description: "Protéger les revenus, le logement et les proches en cas d'arrêt de travail, invalidité ou décès.",
    icon: TrendingUp,
  },
  {
    title: "Conformité",
    description: "Un accompagnement documenté : DDA, devoir de conseil, traçabilité et documents contractuels.",
    icon: FileCheck2,
  },
];

const process = [
  { step: "1", title: "Simulation", text: "Vous renseignez votre prêt, votre âge et vos besoins de garanties." },
  { step: "2", title: "Analyse", text: "Nous comparons les garanties, exclusions, quotités et économies possibles." },
  { step: "3", title: "Souscription", text: "Nous préparons le dossier, la fiche conseil et le suivi jusqu'à validation." },
];

export default function HomePage() {
  return (
    <main className="bg-[#07111E] text-[#F0F4F8]">
      <section className="section-hero px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 flex flex-wrap gap-3">
              <span className="navy-badge"><BadgeCheck size={14} aria-hidden /> Conforme ORIAS</span>
              <span className="navy-badge"><ClipboardCheck size={14} aria-hidden /> Conseil documenté</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Votre courtier en <span className="text-gradient">assurance emprunteur</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#94A3B8]">
              EJ Assurances vous aide à sécuriser votre prêt immobilier, réduire le coût de votre assurance
              et choisir des garanties réellement adaptées à votre situation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/simulateur" className="btn-primary inline-flex items-center justify-center gap-2">
                Simuler mon taux <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-[#1E3A5F] bg-[#112240] px-6 py-3 font-semibold text-white transition hover:border-[#3B82F6]"
              >
                Nous contacter
              </Link>
            </div>
          </div>

          <aside className="glass-card p-6 shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">Analyse rapide</p>
            <div className="mt-6 space-y-4">
              {["Capital à assurer", "Garanties décès / PTIA / ITT", "Quotités co-emprunteurs", "Économies potentielles"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-lg border border-[#1E3A5F] bg-[#112240] p-4">
                  <span className="text-sm text-[#F0F4F8]">{item}</span>
                  <ShieldCheck className="text-[#3B82F6]" size={18} aria-hidden />
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        {stats.map((stat) => (
          <article key={stat.label} className="glass-card p-6 text-center">
            <strong className="block text-4xl font-black text-white">{stat.value}</strong>
            <span className="mt-2 block text-sm font-semibold text-[#94A3B8]">{stat.label}</span>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Services</p>
          <h2 className="mt-3 text-3xl font-black text-gradient sm:text-4xl">Un accompagnement complet pour votre prêt.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="glass-card p-6">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-[#112240] text-[#3B82F6]">
                  <Icon size={24} aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                <p className="mt-3 leading-7 text-[#94A3B8]">{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="glass-card p-6 sm:p-8">
          <h2 className="text-3xl font-black text-gradient">Un process clair, de la simulation à la souscription.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {process.map((item) => (
              <article key={item.step} className="rounded-xl border border-[#1E3A5F] bg-[#112240] p-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] font-black text-white">
                  {item.step}
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 leading-7 text-[#94A3B8]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl border border-[#1E3A5F] bg-[#0D1B2A] p-8 shadow-[0_0_30px_rgba(59,130,246,0.15)] md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-black text-white">Démarrer votre simulation en quelques minutes.</h2>
            <p className="mt-3 max-w-2xl text-[#94A3B8]">
              Obtenez une première estimation et préparez votre dossier avec un courtier.
            </p>
          </div>
          <Link href="/simulateur" className="btn-primary inline-flex shrink-0 items-center justify-center gap-2">
            Démarrer ma simulation <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
