"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Calculator, CheckCircle2, Euro } from "lucide-react";

/* Simulateur natif EJ Assurances : estimation indicative assurance emprunteur. */
type LoanPurpose = "achat" | "substitution" | "renegociation";
type HealthProfile = "standard" | "renforce";

function formatEuro(value: number) {
  return value.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function SimulateurClient() {
  const [loanAmount, setLoanAmount] = useState(280000);
  const [durationYears, setDurationYears] = useState(22);
  const [age, setAge] = useState(38);
  const [quotity, setQuotity] = useState(100);
  const [smoker, setSmoker] = useState(false);
  const [purpose, setPurpose] = useState<LoanPurpose>("achat");
  const [healthProfile, setHealthProfile] = useState<HealthProfile>("standard");
  const [currentMonthlyPremium, setCurrentMonthlyPremium] = useState(85);

  const result = useMemo(() => {
    const ageRate = age < 30 ? 0.09 : age < 40 ? 0.13 : age < 50 ? 0.22 : age < 60 ? 0.36 : 0.58;
    const durationRate = durationYears <= 10 ? 0.02 : durationYears <= 20 ? 0.04 : 0.07;
    const smokerRate = smoker ? 0.12 : 0;
    const healthRate = healthProfile === "renforce" ? 0.08 : 0;
    const purposeDiscount = purpose === "substitution" ? -0.03 : 0;
    const annualRate = clamp(ageRate + durationRate + smokerRate + healthRate + purposeDiscount, 0.08, 0.95);
    const insuredCapital = loanAmount * (quotity / 100);
    const monthlyPremium = (insuredCapital * (annualRate / 100)) / 12;
    const bankLikePremium = currentMonthlyPremium > 0 ? currentMonthlyPremium : monthlyPremium * 1.35;
    const monthlySavings = Math.max(0, bankLikePremium - monthlyPremium);
    const totalSavings = monthlySavings * durationYears * 12;

    return {
      annualRate,
      insuredCapital,
      monthlyPremium,
      monthlySavings,
      totalSavings,
    };
  }, [age, currentMonthlyPremium, durationYears, healthProfile, loanAmount, purpose, quotity, smoker]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <form className="glass-card grid gap-6 p-6 sm:p-8" onSubmit={(event) => event.preventDefault()}>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Vos informations</p>
          <h2 className="mt-3 text-2xl font-black text-[#0F172A]">Simuler une première enveloppe.</h2>
          <p className="mt-2 text-sm leading-6 text-[#475569]">
            Le résultat est indicatif. Une analyse complète vérifie les garanties, exclusions, quotités et formalités médicales.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Achat", value: "achat" as const },
            { label: "Changer d'assurance", value: "substitution" as const },
            { label: "Renégociation", value: "renegociation" as const },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setPurpose(item.value)}
              className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                purpose === item.value
                  ? "border-[#3B82F6] bg-[#EEF4FF] text-[#0F172A] shadow-[0_0_24px_rgba(59,130,246,0.16)]"
                  : "border-[#D8E2F0] bg-white text-[#475569] hover:border-[#3B82F6]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <label className="grid gap-3 text-sm font-semibold text-[#475569]">
          Montant du prêt
          <input
            type="range"
            min="50000"
            max="1200000"
            step="5000"
            value={loanAmount}
            onChange={(event) => setLoanAmount(Number(event.target.value))}
            className="accent-[#3B82F6]"
          />
          <input
            type="number"
            value={loanAmount}
            onChange={(event) => setLoanAmount(Number(event.target.value))}
            className="navy-input"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-semibold text-[#475569]">
            Durée restante
            <div className="relative">
              <input
                type="number"
                min="1"
                max="30"
                value={durationYears}
                onChange={(event) => setDurationYears(Number(event.target.value))}
                className="navy-input pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">ans</span>
            </div>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#475569]">
            Âge emprunteur
            <div className="relative">
              <input
                type="number"
                min="18"
                max="75"
                value={age}
                onChange={(event) => setAge(Number(event.target.value))}
                className="navy-input pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">ans</span>
            </div>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#475569]">
            Quotité assurée
            <div className="relative">
              <input
                type="number"
                min="25"
                max="200"
                step="5"
                value={quotity}
                onChange={(event) => setQuotity(Number(event.target.value))}
                className="navy-input pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">%</span>
            </div>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <fieldset className="grid gap-3 rounded-xl border border-[#D8E2F0] bg-[#EEF4FF] p-4">
            <legend className="px-2 text-sm font-semibold text-[#475569]">Fumeur</legend>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSmoker(false)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${!smoker ? "bg-[#3B82F6] text-white" : "bg-white text-[#475569]"}`}
              >
                Non
              </button>
              <button
                type="button"
                onClick={() => setSmoker(true)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${smoker ? "bg-[#3B82F6] text-white" : "bg-white text-[#475569]"}`}
              >
                Oui
              </button>
            </div>
          </fieldset>

          <fieldset className="grid gap-3 rounded-xl border border-[#D8E2F0] bg-[#EEF4FF] p-4">
            <legend className="px-2 text-sm font-semibold text-[#475569]">Profil médical</legend>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setHealthProfile("standard")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${healthProfile === "standard" ? "bg-[#3B82F6] text-white" : "bg-white text-[#475569]"}`}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setHealthProfile("renforce")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${healthProfile === "renforce" ? "bg-[#3B82F6] text-white" : "bg-white text-[#475569]"}`}
              >
                À vérifier
              </button>
            </div>
          </fieldset>
        </div>

        <label className="grid gap-2 text-sm font-semibold text-[#475569]">
          Prime mensuelle actuelle ou proposée par la banque
          <div className="relative">
            <input
              type="number"
              min="0"
              value={currentMonthlyPremium}
              onChange={(event) => setCurrentMonthlyPremium(Number(event.target.value))}
              className="navy-input pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">€</span>
          </div>
        </label>
      </form>

      <aside className="glass-card sticky top-24 flex flex-col gap-6 self-start p-6 sm:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Résultat estimatif</p>
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] p-6 text-white">
            <span className="text-sm font-bold uppercase tracking-[0.16em] opacity-80">Taux annuel indicatif</span>
            <strong className="mt-3 block text-6xl font-black">{result.annualRate.toFixed(2)}%</strong>
            <p className="mt-3 text-sm leading-6 opacity-85">Sur capital assuré de {formatEuro(result.insuredCapital)}.</p>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-xl border border-[#D8E2F0] bg-[#EEF4FF] p-4">
            <span className="flex items-center gap-2 text-sm font-bold text-[#475569]"><Euro size={16} /> Prime mensuelle estimée</span>
            <strong className="mt-2 block text-3xl font-black text-[#0F172A]">{formatEuro(result.monthlyPremium)}</strong>
          </div>
          <div className="rounded-xl border border-[#D8E2F0] bg-white p-4">
            <span className="flex items-center gap-2 text-sm font-bold text-[#475569]"><Calculator size={16} /> Économie potentielle</span>
            <strong className="mt-2 block text-3xl font-black text-gradient">{formatEuro(result.totalSavings)}</strong>
            <p className="mt-1 text-xs text-[#64748B]">Estimation sur la durée restante du prêt.</p>
          </div>
        </div>

        <div className="grid gap-3 rounded-xl border border-[#D8E2F0] bg-white p-4">
          {[
            "Comparaison garanties décès, PTIA, ITT, IPT",
            "Analyse des quotités co-emprunteurs",
            "Vérification de l'équivalence bancaire",
            "Accompagnement jusqu'à la substitution",
          ].map((item) => (
            <span key={item} className="flex items-start gap-2 text-sm leading-6 text-[#475569]">
              <CheckCircle2 className="mt-0.5 shrink-0 text-[#3B82F6]" size={16} aria-hidden />
              {item}
            </span>
          ))}
        </div>

        <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2 text-white">
          Recevoir une analyse du cabinet <ArrowRight size={18} aria-hidden />
        </Link>

        <p className="text-xs leading-5 text-[#64748B]">
          Simulation non contractuelle. Le tarif définitif dépend de l'assureur, des garanties,
          formalités médicales, exclusions et pièces du dossier.
        </p>
      </aside>
    </div>
  );
}
