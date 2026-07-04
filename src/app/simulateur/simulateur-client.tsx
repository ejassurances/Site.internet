"use client";

import { useMemo, useState } from "react";

/* Composant client : simulation indicative assurance emprunteur. */
export function SimulateurClient() {
  const [amount, setAmount] = useState(250000);
  const [duration, setDuration] = useState(20);
  const [age, setAge] = useState(38);
  const [smoker, setSmoker] = useState(false);

  const result = useMemo(() => {
    const ageFactor = age < 35 ? 0.1 : age < 45 ? 0.16 : age < 55 ? 0.26 : 0.42;
    const durationFactor = duration > 20 ? 0.04 : duration > 10 ? 0.02 : 0;
    const smokerFactor = smoker ? 0.12 : 0;
    const rate = ageFactor + durationFactor + smokerFactor;
    const monthlyPremium = (amount * (rate / 100)) / 12;

    return {
      rate: rate.toFixed(2),
      monthlyPremium: monthlyPremium.toFixed(2),
    };
  }, [age, amount, duration, smoker]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form className="glass-card grid gap-6 p-6 sm:p-8">
        <label className="grid gap-3 text-sm font-semibold text-[#94A3B8]">
          Montant emprunté
          <input
            type="range"
            min="50000"
            max="900000"
            step="5000"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
            className="accent-[#3B82F6]"
          />
          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
            className="navy-input"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-[#94A3B8]">
            Durée (années)
            <input
              type="number"
              min="1"
              max="30"
              value={duration}
              onChange={(event) => setDuration(Number(event.target.value))}
              className="navy-input"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#94A3B8]">
            Âge de l'emprunteur
            <input
              type="number"
              min="18"
              max="75"
              value={age}
              onChange={(event) => setAge(Number(event.target.value))}
              className="navy-input"
            />
          </label>
        </div>

        <fieldset className="grid gap-3 rounded-xl border border-[#1E3A5F] bg-[#112240] p-4">
          <legend className="px-2 text-sm font-semibold text-[#94A3B8]">Fumeur</legend>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setSmoker(false)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${!smoker ? "bg-[#3B82F6] text-white" : "bg-[#0D1B2A] text-[#94A3B8]"}`}
            >
              Non
            </button>
            <button
              type="button"
              onClick={() => setSmoker(true)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${smoker ? "bg-[#3B82F6] text-white" : "bg-[#0D1B2A] text-[#94A3B8]"}`}
            >
              Oui
            </button>
          </div>
        </fieldset>
      </form>

      <aside className="glass-card flex flex-col justify-between p-6 sm:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Estimation</p>
          <div className="mt-8 grid gap-5">
            <div>
              <span className="text-sm font-semibold text-[#94A3B8]">Taux estimatif</span>
              <strong className="mt-2 block text-5xl font-black text-gradient">{result.rate}%</strong>
            </div>
            <div>
              <span className="text-sm font-semibold text-[#94A3B8]">Prime mensuelle estimée</span>
              <strong className="mt-2 block text-4xl font-black text-white">{result.monthlyPremium} €</strong>
            </div>
          </div>
        </div>
        <p className="mt-8 rounded-xl border border-[#1E3A5F] bg-[#112240] p-4 text-sm leading-6 text-[#94A3B8]">
          Cette simulation est indicative. Le tarif réel dépend des garanties, quotités, formalités médicales,
          exclusions et conditions de l'assureur.
        </p>
      </aside>
    </div>
  );
}
