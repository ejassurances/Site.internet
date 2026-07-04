import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { createContactIntakeAction } from "@/app/actions/contact-intake";

/* Page contact : formulaire courtier assurance emprunteur en glass-card Navy Fintech. */
export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez EJ Assurances pour une analyse assurance emprunteur ou transmission parent social enfant.",
};

type ContactPageProps = {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { success, error } = await searchParams;

  return (
    <main className="min-h-screen bg-[#07111E] px-4 py-16 text-[#F0F4F8] sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="pt-4">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Contact</p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl">
            Parlons de votre <span className="text-gradient">protection familiale</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#94A3B8]">
            Expliquez-nous votre prêt, votre situation familiale ou votre enjeu de transmission.
            Le cabinet vous recontacte pour identifier les risques et les prochaines étapes.
          </p>
          <div className="mt-8 grid gap-3 text-[#94A3B8]">
            <a href="tel:+33189314029" className="flex items-center gap-3 transition hover:text-white">
              <Phone size={18} aria-hidden /> 01.89.31.40.29
            </a>
            <a href="mailto:contact@ej-assurances.fr" className="flex items-center gap-3 transition hover:text-white">
              <Mail size={18} aria-hidden /> contact@ej-assurances.fr
            </a>
          </div>
        </div>

        <form action={createContactIntakeAction} className="glass-card grid gap-5 p-6 sm:p-8">
          {success && (
            <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm font-semibold text-emerald-200">
              Votre demande est enregistrée. Le cabinet revient vers vous rapidement.
            </p>
          )}
          {error && (
            <p className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm font-semibold text-red-200">
              Impossible d'enregistrer la demande pour le moment. Vous pouvez aussi nous contacter par téléphone.
            </p>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[#94A3B8]">
              Nom
              <input name="name" required className="navy-input" placeholder="Votre nom" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[#94A3B8]">
              Prénom
              <input name="firstName" className="navy-input" placeholder="Votre prénom" />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[#94A3B8]">
              Email
              <input name="email" type="email" required className="navy-input" placeholder="vous@exemple.fr" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[#94A3B8]">
              Téléphone
              <input name="phone" type="tel" className="navy-input" placeholder="01.89.31.40.29" />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-[#94A3B8]">
            Montant du prêt ou patrimoine concerné
            <input name="loanAmount" inputMode="decimal" className="navy-input" placeholder="Ex. 320000" />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#94A3B8]">
            Message
            <textarea
              name="message"
              className="navy-input min-h-36 resize-y"
              placeholder="Votre projet, votre banque, votre assurance actuelle, ou votre situation de parent social / enfant à protéger..."
            />
          </label>

          <input type="hidden" name="familySituation" value="Diagnostic protection familiale" />
          <input type="hidden" name="need" value="Assurance emprunteur ou transmission parent social" />
          <input type="hidden" name="urgency" value="Projet en cours" />

          <label className="flex gap-3 text-sm leading-6 text-[#94A3B8]">
            <input name="consent" type="checkbox" required className="mt-1 size-4 accent-[#3B82F6]" />
            J'accepte d'être recontacté par EJ Assurances au sujet de ma demande.
          </label>

          <button type="submit" className="btn-primary mt-2 w-full">
            Envoyer ma demande
          </button>
        </form>
      </section>
    </main>
  );
}
