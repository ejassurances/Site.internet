"use client";

import { useState } from "react";
import { AssureurChart, ProduitPieChart } from "./stats-charts";
import type { StatsProduction } from "@/lib/actions/stats";

export function StatsProductionClient({ data }: { data: StatsProduction }) {
  const [view, setView] = useState<"assureur" | "produit">("assureur");

  const fmtEur = (v: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

  return (
    <div className="stats-production-grid">

      {/* ── Graphique principal ── */}
      <div className="stats-card stats-card--large">
        <div className="stats-card-header">
          <div className="stats-chart-tabs">
            <button
              className={`stats-chart-tab ${view === "assureur" ? "stats-chart-tab--active" : ""}`}
              onClick={() => setView("assureur")}
            >
              Par assureur
            </button>
            <button
              className={`stats-chart-tab ${view === "produit" ? "stats-chart-tab--active" : ""}`}
              onClick={() => setView("produit")}
            >
              Par gamme de produit
            </button>
          </div>
        </div>
        <div className="stats-chart-area">
          {view === "assureur" ? (
            <AssureurChart data={data.par_assureur} />
          ) : (
            <ProduitPieChart data={data.par_produit} />
          )}
        </div>
      </div>

      {/* ── Tableau détaillé ── */}
      <div className="stats-card">
        <div className="stats-card-header">
          <h3 className="stats-card-title">
            {view === "assureur" ? "Détail par assureur" : "Détail par gamme"}
          </h3>
        </div>
        <div className="stats-ranking-list">
          {(view === "assureur" ? data.par_assureur : data.par_produit).map((item, i) => {
            const label = "assureur" in item ? item.assureur : item.produit;
            return (
              <div key={i} className="stats-ranking-item">
                <div className="stats-ranking-left">
                  <span className="stats-ranking-num">{i + 1}</span>
                  <div>
                    <span className="stats-ranking-label">{label}</span>
                    <span className="stats-ranking-sub">{item.contrats} contrats</span>
                  </div>
                </div>
                <div className="stats-ranking-right">
                  <span className="stats-ranking-val">{fmtEur(item.ca)}</span>
                  <div className="stats-ranking-bar-wrap">
                    <div className="stats-ranking-bar" style={{ width: `${item.part}%` }} />
                  </div>
                  <span className="stats-ranking-pct">{item.part}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
