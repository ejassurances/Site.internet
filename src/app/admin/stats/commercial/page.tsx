import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import { getStatsCommercial } from "@/lib/actions/stats";
import Link from "next/link";
import { ArrowLeft, Target, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { StatsCommercialClient } from "@/components/stats/stats-commercial-client";

export const metadata = { title: "Performance commerciale — Stats" };

export default async function CommercialPage() {
  const user = await requireRole(["admin", "courtier"]);
  const data = await getStatsCommercial();

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="stats-page">

        {/* ── En-tête ── */}
        <div className="stats-page-header">
          <div>
            <Link href="/admin/stats" className="stats-back-link">
              <ArrowLeft size={14} /> Retour aux stats
            </Link>
            <p className="stats-eyebrow">🎯 Commercial</p>
            <h1 className="stats-page-title">Performance commerciale</h1>
            <p className="stats-page-subtitle">
              Analysez le tunnel de conversion et identifiez les points d&apos;amélioration
            </p>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="stats-kpis-grid">
          <div className="stats-kpi stats-kpi--featured">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#e0e7ff", color: "#3730a3" }}>
                <Target size={20} />
              </div>
              <span className="stats-badge stats-badge--up">{data.taux_closing_global}%</span>
            </div>
            <span className="stats-kpi-val">{data.taux_closing_global}%</span>
            <span className="stats-kpi-lbl">Taux de closing global</span>
            <div className="stats-kpi-progress">
              <div className="stats-kpi-progress-bar" style={{ width: `${data.taux_closing_global}%`, background: "#3730a3" }} />
            </div>
          </div>

          <div className="stats-kpi">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#dbeafe", color: "#1e40af" }}>
                <TrendingUp size={20} />
              </div>
              <span className="stats-badge stats-badge--up">{data.taux_lead_devis}%</span>
            </div>
            <span className="stats-kpi-val">{data.taux_lead_devis}%</span>
            <span className="stats-kpi-lbl">Taux Lead → Devis</span>
            <span className="stats-kpi-sub">{data.devis_envoyes} devis envoyés</span>
          </div>

          <div className="stats-kpi">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#d1fae5", color: "#065f46" }}>
                <CheckCircle size={20} />
              </div>
              <span className="stats-badge stats-badge--up">{data.taux_devis_contrat}%</span>
            </div>
            <span className="stats-kpi-val">{data.taux_devis_contrat}%</span>
            <span className="stats-kpi-lbl">Taux Devis → Contrat</span>
            <span className="stats-kpi-sub">{data.contrats_signes} contrats signés</span>
          </div>

          <div className="stats-kpi">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#fef3c7", color: "#92400e" }}>
                <Clock size={20} />
              </div>
            </div>
            <span className="stats-kpi-val">{data.delai_moyen_signature}j</span>
            <span className="stats-kpi-lbl">Délai moyen de signature</span>
            <span className="stats-kpi-sub">De la prise de contact à la signature</span>
          </div>

          <div className="stats-kpi">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#ede9fe", color: "#7c3aed" }}>
                <Target size={20} />
              </div>
              <span className="stats-badge stats-badge--neutral">{data.leads_en_cours} en cours</span>
            </div>
            <span className="stats-kpi-val">{data.leads_total}</span>
            <span className="stats-kpi-lbl">Leads total</span>
            <span className="stats-kpi-sub">{data.leads_en_cours} prospects actifs</span>
          </div>
        </div>

        {/* ── Tunnel de conversion ── */}
        <StatsCommercialClient data={data} />

      </div>
    </AppShell>
  );
}
