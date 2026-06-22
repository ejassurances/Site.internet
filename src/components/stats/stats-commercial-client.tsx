"use client";

import { TunnelChart } from "./stats-charts";
import type { StatsCommercial } from "@/lib/actions/stats";

export function StatsCommercialClient({ data }: { data: StatsCommercial }) {
  return (
    <div className="stats-commercial-grid">

      {/* ── Tunnel visuel ── */}
      <div className="stats-card stats-card--large">
        <div className="stats-card-header">
          <h3 className="stats-card-title">Tunnel de conversion</h3>
          <span className="stats-card-sub">Leads → Contacts → Devis → Contrats</span>
        </div>

        {/* Tunnel en entonnoir visuel */}
        <div className="stats-funnel">
          {data.tunnel.map((step, i) => (
            <div key={i} className="stats-funnel-step" style={{ "--funnel-w": `${100 - i * 8}%` } as React.CSSProperties}>
              <div className="stats-funnel-bar" style={{ background: step.couleur, width: `${100 - i * 8}%` }}>
                <span className="stats-funnel-label">{step.etape}</span>
                <span className="stats-funnel-val">{step.nombre}</span>
              </div>
              <span className="stats-funnel-pct">{step.taux}%</span>
              {i < data.tunnel.length - 1 && (
                <div className="stats-funnel-drop">
                  <span className="stats-funnel-drop-val">
                    -{data.tunnel[i].nombre - data.tunnel[i + 1].nombre} perdus
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Graphique bar horizontal */}
        <div style={{ marginTop: 24 }}>
          <TunnelChart data={data.tunnel} />
        </div>
      </div>

      {/* ── Métriques détaillées ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        <div className="stats-card">
          <div className="stats-card-header">
            <h3 className="stats-card-title">Taux de conversion par étape</h3>
          </div>
          <div className="stats-conversion-list">
            {data.tunnel.slice(0, -1).map((step, i) => {
              const next = data.tunnel[i + 1];
              const taux = step.nombre > 0 ? Math.round((next.nombre / step.nombre) * 100) : 0;
              return (
                <div key={i} className="stats-conversion-item">
                  <div className="stats-conversion-labels">
                    <span className="stats-conversion-from">{step.etape}</span>
                    <span className="stats-conversion-arrow">→</span>
                    <span className="stats-conversion-to">{next.etape}</span>
                  </div>
                  <div className="stats-conversion-bar-wrap">
                    <div className="stats-conversion-bar" style={{ width: `${taux}%`, background: step.couleur }} />
                  </div>
                  <span className="stats-conversion-pct" style={{ color: step.couleur }}>{taux}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-card-header">
            <h3 className="stats-card-title">Indicateurs clés</h3>
          </div>
          <div className="stats-indicators">
            <div className="stats-indicator">
              <span className="stats-indicator-label">Leads en cours de traitement</span>
              <span className="stats-indicator-val" style={{ color: "#1e40af" }}>{data.leads_en_cours}</span>
            </div>
            <div className="stats-indicator">
              <span className="stats-indicator-label">Devis en attente de réponse</span>
              <span className="stats-indicator-val" style={{ color: "#92400e" }}>{data.devis_envoyes - data.contrats_signes}</span>
            </div>
            <div className="stats-indicator">
              <span className="stats-indicator-label">Contrats signés (total)</span>
              <span className="stats-indicator-val" style={{ color: "#065f46" }}>{data.contrats_signes}</span>
            </div>
            <div className="stats-indicator">
              <span className="stats-indicator-label">Délai moyen de signature</span>
              <span className="stats-indicator-val" style={{ color: "#7c3aed" }}>{data.delai_moyen_signature} jours</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
