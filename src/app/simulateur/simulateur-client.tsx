"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, Euro, Plus, Trash2, Users } from "lucide-react";

/* Simulateur natif EJ Assurances : tunnel par etapes avec co-emprunteur et jusqu'a 3 prets. */
type LoanPurpose = "achat" | "substitution" | "renegociation";
type HealthProfile = "standard" | "renforce";
type Loan = {
  id: string;
  label: string;
  amount: number;
  durationYears: number;
  rate: number;
};
type Borrower = {
  age: number;
  quotity: number;
  smoker: boolean;
  healthProfile: HealthProfile;
};

const steps = ["Projet", "Prets", "Emprunteurs", "Contrat actuel", "Resultat"];

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

function borrowerRate(borrower: Borrower, maxDuration: number, purpose: LoanPurpose) {
  const ageRate = borrower.age < 30 ? 0.09 : borrower.age < 40 ? 0.13 : borrower.age < 50 ? 0.22 : borrower.age < 60 ? 0.36 : 0.58;
  const durationRate = maxDuration <= 10 ? 0.02 : maxDuration <= 20 ? 0.04 : 0.07;
  const smokerRate = borrower.smoker ? 0.12 : 0;
  const healthRate = borrower.healthProfile === "renforce" ? 0.08 : 0;
  const purposeDiscount = purpose === "substitution" ? -0.03 : 0;
  return clamp(ageRate + durationRate + smokerRate + healthRate + purposeDiscount, 0.08, 0.95);
}

function ToggleButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
        active ? "bg-[#3B82F6] text-white" : "border border-[#D8E2F0] bg-white text-[#475569] hover:border-[#3B82F6]"
      }`}
    >
      {children}
    </button>
  );
}

export function SimulateurClient() {
  const [step, setStep] = useState(0);
  const [purpose, setPurpose] = useState<LoanPurpose>("achat");
  const [loans, setLoans] = useState<Loan[]>([
    { id: "loan-1", label: "Pret principal", amount: 280000, durationYears: 22, rate: 3.8 },
  ]);
  const [borrower, setBorrower] = useState<Borrower>({
    age: 38,
    quotity: 100,
    smoker: false,
    healthProfile: "standard",
  });
  const [hasCoBorrower, setHasCoBorrower] = useState(false);
  const [coBorrower, setCoBorrower] = useState<Borrower>({
    age: 36,
    quotity: 100,
    smoker: false,
    healthProfile: "standard",
  });
  const [currentMonthlyPremium, setCurrentMonthlyPremium] = useState(95);

  const totals = useMemo(() => {
    const totalAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);
    const maxDuration = Math.max(...loans.map((loan) => loan.durationYears), 1);
    const borrowerAnnualRate = borrowerRate(borrower, maxDuration, purpose);
    const borrowerPremium = (totalAmount * (borrower.quotity / 100) * (borrowerAnnualRate / 100)) / 12;
    const coBorrowerAnnualRate = hasCoBorrower ? borrowerRate(coBorrower, maxDuration, purpose) : 0;
    const coBorrowerPremium = hasCoBorrower
      ? (totalAmount * (coBorrower.quotity / 100) * (coBorrowerAnnualRate / 100)) / 12
      : 0;
    const monthlyPremium = borrowerPremium + coBorrowerPremium;
    const bankLikePremium = currentMonthlyPremium > 0 ? currentMonthlyPremium : monthlyPremium * 1.35;
    const monthlySavings = Math.max(0, bankLikePremium - monthlyPremium);
    const totalSavings = monthlySavings * maxDuration * 12;
    const weightedRate =
      (borrowerAnnualRate * borrower.quotity + coBorrowerAnnualRate * (hasCoBorrower ? coBorrower.quotity : 0)) /
      Math.max(borrower.quotity + (hasCoBorrower ? coBorrower.quotity : 0), 1);

    return {
      totalAmount,
      maxDuration,
      monthlyPremium,
      monthlySavings,
      totalSavings,
      weightedRate,
      coveredCapital: totalAmount * ((borrower.quotity + (hasCoBorrower ? coBorrower.quotity : 0)) / 100),
    };
  }, [borrower, coBorrower, currentMonthlyPremium, hasCoBorrower, loans, purpose]);

  const canGoNext = step < steps.length - 1;
  const progress = ((step + 1) / steps.length) * 100;

  function updateLoan(id: string, patch: Partial<Loan>) {
    setLoans((current) => current.map((loan) => (loan.id === id ? { ...loan, ...patch } : loan)));
  }

  function addLoan() {
    if (loans.length >= 3) return;
    setLoans((current) => [
      ...current,
      {
        id: `loan-${Date.now()}`,
        label: `Pret ${current.length + 1}`,
        amount: 80000,
        durationYears: 15,
        rate: 3.8,
      },
    ]);
  }

  function removeLoan(id: string) {
    setLoans((current) => (current.length === 1 ? current : current.filter((loan) => loan.id !== id)));
  }

  function renderBorrowerFields(label: string, value: Borrower, onChange: (next: Borrower) => void) {
    return (
      <div className="rounded-2xl border border-[#D8E2F0] bg-[#EEF4FF] p-5">
        <h3 className="flex items-center gap-2 text-lg font-black text-[#0F172A]">
          <Users size={18} aria-hidden />
          {label}
        </h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-[#475569]">
            Age
            <div className="relative">
              <input
                type="number"
                min="18"
                max="75"
                value={value.age}
                onChange={(event) => onChange({ ...value, age: Number(event.target.value) })}
                className="navy-input pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">ans</span>
            </div>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#475569]">
            Quotite assuree
            <div className="relative">
              <input
                type="number"
                min="25"
                max="200"
                step="5"
                value={value.quotity}
                onChange={(event) => onChange({ ...value, quotity: Number(event.target.value) })}
                className="navy-input pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">%</span>
            </div>
          </label>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <fieldset className="grid gap-3">
            <legend className="mb-2 text-sm font-semibold text-[#475569]">Fumeur</legend>
            <div className="flex gap-3">
              <ToggleButton active={!value.smoker} onClick={() => onChange({ ...value, smoker: false })}>Non</ToggleButton>
              <ToggleButton active={value.smoker} onClick={() => onChange({ ...value, smoker: true })}>Oui</ToggleButton>
            </div>
          </fieldset>
          <fieldset className="grid gap-3">
            <legend className="mb-2 text-sm font-semibold text-[#475569]">Profil medical</legend>
            <div className="flex flex-wrap gap-3">
              <ToggleButton active={value.healthProfile === "standard"} onClick={() => onChange({ ...value, healthProfile: "standard" })}>
                Standard
              </ToggleButton>
              <ToggleButton active={value.healthProfile === "renforce"} onClick={() => onChange({ ...value, healthProfile: "renforce" })}>
                A verifier
              </ToggleButton>
            </div>
          </fieldset>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <div className="glass-card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-bold text-[#475569]">
            Etape {step + 1} sur {steps.length} - {steps[step]}
          </span>
          <span className="text-sm font-bold text-[#3B82F6]">{Math.round(progress)}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EEF4FF]">
          <div className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-4 hidden grid-cols-5 gap-2 md:grid">
          {steps.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => setStep(index)}
              className={`rounded-lg px-3 py-2 text-xs font-black transition ${
                step === index ? "bg-[#3B82F6] text-white" : index < step ? "bg-[#EEF4FF] text-[#3B82F6]" : "bg-white text-[#64748B]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <form className="glass-card grid gap-6 p-6 sm:p-8" onSubmit={(event) => event.preventDefault()}>
        {step === 0 && (
          <section>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Projet</p>
            <h2 className="mt-3 text-2xl font-black text-[#0F172A]">Quelle est votre situation ?</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { label: "Achat immobilier", value: "achat" as const },
                { label: "Changer d'assurance", value: "substitution" as const },
                { label: "Renegociation", value: "renegociation" as const },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setPurpose(item.value)}
                  className={`rounded-2xl border p-5 text-left transition ${
                    purpose === item.value
                      ? "border-[#3B82F6] bg-[#EEF4FF] shadow-[0_0_24px_rgba(59,130,246,0.16)]"
                      : "border-[#D8E2F0] bg-white hover:border-[#3B82F6]"
                  }`}
                >
                  <strong className="block text-lg text-[#0F172A]">{item.label}</strong>
                  <span className="mt-2 block text-sm leading-6 text-[#475569]">
                    {item.value === "achat"
                      ? "Vous financez un nouveau bien."
                      : item.value === "substitution"
                        ? "Vous voulez remplacer le contrat bancaire."
                        : "Vous revoyez votre financement ou vos conditions."}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 1 && (
          <section>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Prets</p>
                <h2 className="mt-3 text-2xl font-black text-[#0F172A]">Ajoutez jusqu'a 3 prets a assurer.</h2>
              </div>
              <button
                type="button"
                onClick={addLoan}
                disabled={loans.length >= 3}
                className="inline-flex items-center gap-2 rounded-lg border border-[#D8E2F0] bg-white px-4 py-2 text-sm font-bold text-[#0F172A] transition hover:border-[#3B82F6] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={16} aria-hidden />
                Ajouter un pret
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              {loans.map((loan, index) => (
                <article key={loan.id} className="rounded-2xl border border-[#D8E2F0] bg-white p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-black text-[#0F172A]">Pret {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeLoan(loan.id)}
                      disabled={loans.length === 1}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-[#991B1B] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Trash2 size={15} aria-hidden />
                      Supprimer
                    </button>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-4">
                    <label className="grid gap-2 text-sm font-semibold text-[#475569] md:col-span-1">
                      Nom
                      <input value={loan.label} onChange={(event) => updateLoan(loan.id, { label: event.target.value })} className="navy-input" />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-[#475569]">
                      Montant
                      <input type="number" value={loan.amount} onChange={(event) => updateLoan(loan.id, { amount: Number(event.target.value) })} className="navy-input" />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-[#475569]">
                      Duree
                      <input type="number" min="1" max="30" value={loan.durationYears} onChange={(event) => updateLoan(loan.id, { durationYears: Number(event.target.value) })} className="navy-input" />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-[#475569]">
                      Taux credit
                      <input type="number" min="0" step="0.05" value={loan.rate} onChange={(event) => updateLoan(loan.id, { rate: Number(event.target.value) })} className="navy-input" />
                    </label>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="grid gap-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Emprunteurs</p>
              <h2 className="mt-3 text-2xl font-black text-[#0F172A]">Qui doit etre assure ?</h2>
            </div>
            {renderBorrowerFields("Emprunteur principal", borrower, setBorrower)}
            <div className="rounded-2xl border border-[#D8E2F0] bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-[#0F172A]">Co-emprunteur</h3>
                  <p className="mt-1 text-sm text-[#475569]">Ajoutez un second profil si le pret est porte a deux.</p>
                </div>
                <ToggleButton active={hasCoBorrower} onClick={() => setHasCoBorrower(!hasCoBorrower)}>
                  {hasCoBorrower ? "Co-emprunteur ajoute" : "Ajouter un co-emprunteur"}
                </ToggleButton>
              </div>
            </div>
            {hasCoBorrower && renderBorrowerFields("Co-emprunteur", coBorrower, setCoBorrower)}
          </section>
        )}

        {step === 3 && (
          <section>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Contrat actuel</p>
            <h2 className="mt-3 text-2xl font-black text-[#0F172A]">Combien payez-vous aujourd'hui ?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#475569]">
              Si vous ne connaissez pas la prime, laissez 0 : le simulateur utilisera une base indicative pour calculer le potentiel.
            </p>
            <label className="mt-6 grid max-w-md gap-2 text-sm font-semibold text-[#475569]">
              Prime mensuelle actuelle ou proposee par la banque
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={currentMonthlyPremium}
                  onChange={(event) => setCurrentMonthlyPremium(Number(event.target.value))}
                  className="navy-input pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">EUR</span>
              </div>
            </label>
          </section>
        )}

        {step === 4 && (
          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Resultat</p>
              <h2 className="mt-3 text-2xl font-black text-[#0F172A]">Votre estimation EJ Assurances.</h2>
              <p className="mt-2 text-sm leading-6 text-[#475569]">
                Ce resultat est indicatif. Le cabinet doit verifier les garanties, les quotites, les exclusions et l'equivalence bancaire.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] p-6 text-white">
                <span className="text-sm font-bold uppercase tracking-[0.16em] opacity-80">Taux annuel indicatif</span>
                <strong className="mt-3 block text-6xl font-black">{totals.weightedRate.toFixed(2)}%</strong>
                <p className="mt-3 text-sm leading-6 opacity-85">Capital total assure : {formatEuro(totals.coveredCapital)}.</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-[#D8E2F0] bg-[#EEF4FF] p-4">
                  <span className="flex items-center gap-2 text-sm font-bold text-[#475569]"><Euro size={16} /> Prime mensuelle estimee</span>
                  <strong className="mt-2 block text-3xl font-black text-[#0F172A]">{formatEuro(totals.monthlyPremium)}</strong>
                </div>
                <div className="rounded-xl border border-[#D8E2F0] bg-white p-4">
                  <span className="flex items-center gap-2 text-sm font-bold text-[#475569]"><Calculator size={16} /> Economie potentielle</span>
                  <strong className="mt-2 block text-3xl font-black text-gradient">{formatEuro(totals.totalSavings)}</strong>
                  <p className="mt-1 text-xs text-[#64748B]">Sur {totals.maxDuration} an(s).</p>
                </div>
              </div>
              <div className="grid gap-3 rounded-xl border border-[#D8E2F0] bg-white p-4">
                {[
                  "Analyse des garanties deces, PTIA, ITT, IPT",
                  "Verification des quotites emprunteur et co-emprunteur",
                  "Controle de l'equivalence bancaire",
                  "Accompagnement jusqu'a la substitution ou souscription",
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
            </div>
          </section>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-[#D8E2F0] pt-6 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            disabled={step === 0}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D8E2F0] bg-white px-5 py-3 font-bold text-[#0F172A] transition hover:border-[#3B82F6] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft size={18} aria-hidden />
            Precedent
          </button>
          {canGoNext ? (
            <button
              type="button"
              onClick={() => setStep((current) => Math.min(current + 1, steps.length - 1))}
              className="btn-primary inline-flex items-center justify-center gap-2 text-white"
            >
              Continuer <ArrowRight size={18} aria-hidden />
            </button>
          ) : (
            <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2 text-white">
              Etre accompagne <ArrowRight size={18} aria-hidden />
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
