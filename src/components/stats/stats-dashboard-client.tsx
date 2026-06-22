"use client";

import { useState } from "react";
import { EvolutionCAChart, ContratsChart } from "./stats-charts";
import type { StatsDashboard } from "@/lib/actions/stats";

const PERIODS = [
  { label: "7 jours", value: "7j" },
  { label: "30 jours", value: "30j" },
  { label: "3 mois", value: "90j" },
  { label: "12 mois", value: "12m" },
  { label: "Année en cours", value: "ytd" },
];

export function StatsDashboardClient({ data }: { data: StatsDashboard }) {
  const [period, setPeriod] = useState("12m");
  const [activeChart, setActiveChart] = useState<"evolution" | "contrats">("evolution");

  return (
    <div className="stats-charts-block">
      {/* ── Toolbar ── */}
      <div className="stats-charts-toolbar">
        <div className="stats-chart-tabs">
          <button
            className={`stats-chart-tab ${activeChart === "evolution" ? "stats-chart-tab--active" : ""}`}
            onClick={() => setActiveChart("evolution")}
          >
            Évolution CA & Commissions
          </button>
          <button
            className={`stats-chart-tab ${activeChart === "contrats" ? "stats-chart-tab--active" : ""}`}
            onClick={() => setActiveChart("contrats")}
          >
            Nouveaux contrats
          </button>
        </div>
        <div className="stats-period-filters">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              className={`stats-period-btn ${period === p.value ? "stats-period-btn--active" : ""}`}
              onClick={() => setPeriod(p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Graphique ── */}
      <div className="stats-chart-area">
        {activeChart === "evolution" ? (
          <EvolutionCAChart data={data.evolution_mensuelle} />
        ) : (
          <ContratsChart data={data.evolution_mensuelle} />
        )}
      </div>

      {/* ── Légende résumée ── */}
      <div className="stats-chart-legend">
        <div className="stats-legend-item">
          <span className="stats-legend-dot" style={{ background: "#1e3a5f" }} />
          <span>CA primes annuelles</span>
        </div>
        <div className="stats-legend-item">
          <span className="stats-legend-dot" style={{ background: "#c4a76d" }} />
          <span>Commissions encaissées</span>
        </div>
        <div className="stats-legend-sep" />
        <span className="stats-legend-note">
          Données sur les 12 derniers mois — Mise à jour en temps réel
        </span>
      </div>
    </div>
  );
}
