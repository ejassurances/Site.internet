import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import { getStatsProduction } from "@/lib/actions/stats";
import Link from "next/link";
import { ArrowLeft, Building2, Package, Trophy } from "lucide-react";
import { StatsProductionClient } from "@/components/stats/stats-production-client";

export const metadata = { title: "Analyse de la production — Stats" };

export default async function ProductionPage() {
  const user = await requireRole(["admin", "courtier"]);
  const data = await getStatsProduction();

  const fmtEur = (v: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

  const totalCA = data.par_assureur.reduce((s, a) => s + a.ca, 0);
  const totalContrats = data.par_assureur.reduce((s, a) => s + a.contrats, 0);

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="stats-page">

        {/* ── En-tête ── */}
        <div className="stats-page-header">
          <div>
            <Link href="/admin/stats" className="stats-back-link">
              <ArrowLeft size={14} /> Retour aux stats
            </Link>
            <p className="stats-eyebrow">🏭 Production</p>
            <h1 className="stats-page-title">Analyse de la production</h1>
            <p className="stats-page-subtitle">Répartition du CA par assureur, par gamme et top contrats</p>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="stats-kpis-grid stats-kpis-grid--3">
          <div className="stats-kpi stats-kpi--featured">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#d1fae5", color: "#065f46" }}>
                <Building2 size={20} />
              </div>
              <span className="stats-badge stats-badge--neutral">{data.par_assureur.length} assureurs</span>
            </div>
            <span className="stats-kpi-val">{fmtEur(totalCA)}</span>
            <span className="stats-kpi-lbl">CA total (primes)</span>
          </div>
          <div className="stats-kpi">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#dbeafe", color: "#1e40af" }}>
                <Package size={20} />
              </div>
              <span className="stats-badge stats-badge--neutral">{data.par_produit.length} gammes</span>
            </div>
            <span className="stats-kpi-val">{totalContrats}</span>
            <span className="stats-kpi-lbl">Contrats actifs</span>
          </div>
          <div className="stats-kpi">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#fef3c7", color: "#92400e" }}>
                <Trophy size={20} />
              </div>
            </div>
            <span className="stats-kpi-val">{data.par_assureur[0]?.assureur ?? "—"}</span>
            <span className="stats-kpi-lbl">Top assureur</span>
            <span className="stats-kpi-sub">{data.par_assureur[0]?.part ?? 0}% du CA</span>
          </div>
        </div>

        {/* ── Graphiques (client) ── */}
        <StatsProductionClient data={data} />

        {/* ── Top contrats ── */}
        {data.top_contrats.length > 0 && (
          <div className="stats-card">
            <div className="stats-card-header">
              <Trophy size={16} />
              <h3 className="stats-card-title">Top contrats par prime annuelle</h3>
            </div>
            <div className="stats-table-wrap">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Client</th>
                    <th>Type de contrat</th>
                    <th>Assureur</th>
                    <th>Prime annuelle</th>
                    <th>Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {data.top_contrats.map((c, i) => (
                    <tr key={i}>
                      <td>
                        <span className={`stats-rank stats-rank--${i + 1}`}>#{i + 1}</span>
                      </td>
                      <td className="stats-td-bold">{c.client}</td>
                      <td>{c.type}</td>
                      <td>
                        <span className="stats-badge stats-badge--neutral">{c.assureur}</span>
                      </td>
                      <td className="stats-td-prime">{fmtEur(c.prime)}</td>
                      <td className="stats-td-commission">{fmtEur(c.commission)}</td>
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
