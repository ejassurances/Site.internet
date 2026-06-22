"use client";

import { RetentionGauge } from "./stats-charts";
import type { StatsPortefeuille } from "@/lib/actions/stats";
import Link from "next/link";
import { AlertTriangle, Mail, Phone } from "lucide-react";

export function StatsPortefeuilleClient({ data }: { data: StatsPortefeuille }) {
  return (
    <div className="stats-portefeuille-grid">

      {/* ── Gauge rétention ── */}
      <div className="stats-card" style={{ textAlign: "center" }}>
        <div className="stats-card-header" style={{ justifyContent: "center" }}>
          <h3 className="stats-card-title">Taux de rétention</h3>
        </div>
        <RetentionGauge taux={data.taux_retention} />
        <div className="stats-retention-legend">
          <div className="stats-retention-item">
            <span className="stats-legend-dot" style={{ background: "#065f46" }} />
            <span>{data.clients_actifs} clients retenus</span>
          </div>
          <div className="stats-retention-item">
            <span className="stats-legend-dot" style={{ background: "#fee2e2" }} />
            <span>{data.resiliations_mois} résiliations ce mois</span>
          </div>
        </div>
      </div>

      {/* ── Clients à risque ── */}
      <div className="stats-card">
        <div className="stats-card-header">
          <AlertTriangle size={16} style={{ color: "#f59e0b" }} />
          <h3 className="stats-card-title">Clients à risque</h3>
          <span className="stats-badge stats-badge--warn" style={{ marginLeft: "auto" }}>
            {data.clients_risque} clients
          </span>
        </div>
        <p className="stats-card-desc">
          Ces clients n&apos;ont pas eu d&apos;interaction depuis plus de 90 jours. Une prise de contact proactive réduit le risque de résiliation.
        </p>
        {data.clients_sans_interaction.length > 0 ? (
          <div className="stats-risk-list">
            {data.clients_sans_interaction.map((c) => {
              const daysSince = c.derniere_interaction
                ? Math.floor((Date.now() - new Date(c.derniere_interaction).getTime()) / (1000 * 60 * 60 * 24))
                : null;
              return (
                <div key={c.id} className="stats-risk-item">
                  <div className="stats-risk-avatar">
                    {c.nom.charAt(0).toUpperCase()}
                  </div>
                  <div className="stats-risk-info">
                    <span className="stats-risk-name">{c.nom}</span>
                    <span className="stats-risk-email">{c.email}</span>
                    {daysSince !== null && (
                      <span className="stats-risk-days">
                        Dernière interaction : il y a {daysSince} jours
                      </span>
                    )}
                  </div>
                  <div className="stats-risk-actions">
                    <Link href={`/admin/clients/${c.id}`} className="stats-risk-btn">
                      Voir fiche
                    </Link>
                    <a href={`mailto:${c.email}`} className="stats-risk-icon-btn" title="Envoyer un email">
                      <Mail size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="stats-empty-state">
            <span style={{ fontSize: 32 }}>✅</span>
            <p>Aucun client à risque identifié — excellent suivi !</p>
          </div>
        )}
      </div>

      {/* ── Répartition résiliations par cause ── */}
      <div className="stats-card">
        <div className="stats-card-header">
          <h3 className="stats-card-title">Causes de résiliation</h3>
        </div>
        {data.resiliations_recentes.length > 0 ? (
          <div className="stats-causes-list">
            {(() => {
              const causes: Record<string, number> = {};
              data.resiliations_recentes.forEach((r) => {
                causes[r.cause] = (causes[r.cause] ?? 0) + 1;
              });
              const total = data.resiliations_recentes.length;
              return Object.entries(causes)
                .sort((a, b) => b[1] - a[1])
                .map(([cause, count]) => (
                  <div key={cause} className="stats-cause-item">
                    <div className="stats-cause-label">
                      <span>{cause}</span>
                      <span className="stats-cause-count">{count}</span>
                    </div>
                    <div className="stats-cause-bar-wrap">
                      <div
                        className="stats-cause-bar"
                        style={{ width: `${Math.round((count / total) * 100)}%` }}
                      />
                    </div>
                    <span className="stats-cause-pct">{Math.round((count / total) * 100)}%</span>
                  </div>
                ));
            })()}
          </div>
        ) : (
          <div className="stats-empty-state">
            <span style={{ fontSize: 32 }}>🎉</span>
            <p>Aucune résiliation ce mois — excellent !</p>
          </div>
        )}
      </div>

    </div>
  );
}
