import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import { getStatsPortefeuille } from "@/lib/actions/stats";
import Link from "next/link";
import { ArrowLeft, Shield, AlertTriangle, RefreshCw, UserX, Calendar } from "lucide-react";
import { StatsPortefeuilleClient } from "@/components/stats/stats-portefeuille-client";

export const metadata = { title: "Analyse du portefeuille — Stats" };

export default async function PortefeuillePage() {
  const user = await requireRole(["admin", "courtier"]);
  const data = await getStatsPortefeuille();

  const fmtEur = (v: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="stats-page">

        {/* ── En-tête ── */}
        <div className="stats-page-header">
          <div>
            <Link href="/admin/stats" className="stats-back-link">
              <ArrowLeft size={14} /> Retour aux stats
            </Link>
            <p className="stats-eyebrow">🛡️ Portefeuille</p>
            <h1 className="stats-page-title">Analyse du portefeuille</h1>
            <p className="stats-page-subtitle">
              Gérez la rétention client, anticipez les résiliations et les renouvellements
            </p>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="stats-kpis-grid">
          <div className="stats-kpi stats-kpi--featured">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#d1fae5", color: "#065f46" }}>
                <Shield size={20} />
              </div>
              <span className="stats-badge stats-badge--up">Excellent</span>
            </div>
            <span className="stats-kpi-val">{data.taux_retention.toFixed(1)}%</span>
            <span className="stats-kpi-lbl">Taux de rétention</span>
            <div className="stats-kpi-progress">
              <div className="stats-kpi-progress-bar" style={{ width: `${data.taux_retention}%`, background: "#065f46" }} />
            </div>
          </div>

          <div className="stats-kpi">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#fee2e2", color: "#dc2626" }}>
                <UserX size={20} />
              </div>
              <span className="stats-badge stats-badge--down">{data.taux_chute.toFixed(1)}%</span>
            </div>
            <span className="stats-kpi-val">{data.resiliations_mois}</span>
            <span className="stats-kpi-lbl">Résiliations ce mois</span>
            <span className="stats-kpi-sub">Taux de chute : {data.taux_chute.toFixed(1)}%</span>
          </div>

          <div className="stats-kpi">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#fef3c7", color: "#92400e" }}>
                <AlertTriangle size={20} />
              </div>
              <span className="stats-badge stats-badge--warn">À surveiller</span>
            </div>
            <span className="stats-kpi-val">{data.clients_risque}</span>
            <span className="stats-kpi-lbl">Clients à risque</span>
            <span className="stats-kpi-sub">Sans interaction récente</span>
          </div>

          <div className="stats-kpi">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#dbeafe", color: "#1e40af" }}>
                <RefreshCw size={20} />
              </div>
              <span className="stats-badge stats-badge--neutral">{data.renouvellements_90j} / 90j</span>
            </div>
            <span className="stats-kpi-val">{data.renouvellements_30j}</span>
            <span className="stats-kpi-lbl">Renouvellements dans 30j</span>
            <span className="stats-kpi-sub">{data.renouvellements_90j} dans les 90 prochains jours</span>
          </div>

          <div className="stats-kpi">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#ede9fe", color: "#7c3aed" }}>
                <Shield size={20} />
              </div>
            </div>
            <span className="stats-kpi-val">{data.clients_actifs}</span>
            <span className="stats-kpi-lbl">Clients actifs</span>
            <span className="stats-kpi-sub">Portefeuille total</span>
          </div>
        </div>

        {/* ── Gauge rétention (client) ── */}
        <StatsPortefeuilleClient data={data} />

        {/* ── Renouvellements prochains ── */}
        {data.renouvellements_prochains.length > 0 && (
          <div className="stats-card">
            <div className="stats-card-header">
              <Calendar size={16} />
              <h3 className="stats-card-title">Renouvellements à venir (90 jours)</h3>
            </div>
            <div className="stats-table-wrap">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Type de contrat</th>
                    <th>Assureur</th>
                    <th>Échéance</th>
                    <th>Prime annuelle</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.renouvellements_prochains.map((r, i) => {
                    const daysLeft = Math.ceil((new Date(r.date_echeance).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                    const urgency = daysLeft <= 30 ? "danger" : daysLeft <= 60 ? "warn" : "ok";
                    return (
                      <tr key={i}>
                        <td className="stats-td-bold">{r.client}</td>
                        <td>{r.type}</td>
                        <td><span className="stats-badge stats-badge--neutral">{r.assureur}</span></td>
                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <span>{fmtDate(r.date_echeance)}</span>
                            <span className={`stats-days-badge stats-days-badge--${urgency}`}>
                              {daysLeft <= 0 ? "Échu" : `J-${daysLeft}`}
                            </span>
                          </div>
                        </td>
                        <td className="stats-td-prime">{fmtEur(r.prime)}</td>
                        <td>
                          <button className="stats-action-btn">Contacter</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Résiliations récentes ── */}
        {data.resiliations_recentes.length > 0 && (
          <div className="stats-card">
            <div className="stats-card-header">
              <UserX size={16} style={{ color: "#dc2626" }} />
              <h3 className="stats-card-title">Résiliations récentes</h3>
            </div>
            <div className="stats-table-wrap">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Type de contrat</th>
                    <th>Date</th>
                    <th>Cause</th>
                  </tr>
                </thead>
                <tbody>
                  {data.resiliations_recentes.map((r, i) => (
                    <tr key={i}>
                      <td className="stats-td-bold">{r.client}</td>
                      <td>{r.type}</td>
                      <td>{fmtDate(r.date)}</td>
                      <td>
                        <span className="stats-badge stats-badge--danger">{r.cause}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}
