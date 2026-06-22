import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import { getStatsDashboard } from "@/lib/actions/stats";
import Link from "next/link";
import {
  TrendingUp, Users, FileText, DollarSign,
  BarChart2, ChevronRight, Download, Target
} from "lucide-react";
import { StatsDashboardClient } from "@/components/stats/stats-dashboard-client";

export const metadata = { title: "Stats & Analyses — EJ Assurances" };

export default async function StatsPage() {
  const user = await requireRole(["admin", "courtier"]);
  const data = await getStatsDashboard("12m");

  const modules = [
    {
      href: "/admin/stats/dashboard",
      emoji: "📈",
      title: "Tableau de bord complet",
      description: "KPIs globaux, évolution CA et filtres multicritères par période",
      color: "#3730a3",
      bg: "#e0e7ff",
    },
    {
      href: "/admin/stats/production",
      emoji: "🏭",
      title: "Analyse de la production",
      description: "Répartition par assureur, par gamme de produit et top contrats",
      color: "#065f46",
      bg: "#d1fae5",
    },
    {
      href: "/admin/stats/commercial",
      emoji: "🎯",
      title: "Performance commerciale",
      description: "Tunnel de conversion Leads → Contrats, taux de closing et délais",
      color: "#92400e",
      bg: "#fef3c7",
    },
    {
      href: "/admin/stats/portefeuille",
      emoji: "🛡️",
      title: "Analyse du portefeuille",
      description: "Rétention client, résiliations, renouvellements et clientèle à risque",
      color: "#7c3aed",
      bg: "#ede9fe",
    },
  ];

  const fmtEur = (v: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="stats-page">

        {/* ── En-tête ── */}
        <div className="stats-page-header">
          <div>
            <p className="stats-eyebrow">📊 Pilotage stratégique</p>
            <h1 className="stats-page-title">Stats &amp; Analyses</h1>
            <p className="stats-page-subtitle">
              Vision claire et instantanée de la santé de votre cabinet
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/admin/stats/dashboard" className="stats-header-btn stats-header-btn--primary">
              <BarChart2 size={15} />
              Tableau de bord
            </Link>
            <button className="stats-header-btn">
              <Download size={15} />
              Export PDF
            </button>
          </div>
        </div>

        {/* ── KPIs principaux ── */}
        <div className="stats-kpis-grid">

          <div className="stats-kpi stats-kpi--featured">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#e0e7ff", color: "#3730a3" }}>
                <DollarSign size={20} />
              </div>
              <span className="stats-badge stats-badge--up">
                +{data.ca_croissance.toFixed(1)}% vs N-1
              </span>
            </div>
            <span className="stats-kpi-val">{fmtEur(data.ca_total)}</span>
            <span className="stats-kpi-lbl">Chiffre d&apos;affaires (primes)</span>
            <div className="stats-kpi-progress">
              <div className="stats-kpi-progress-bar" style={{ width: `${Math.min(data.ca_croissance + 50, 100)}%`, background: "#3730a3" }} />
            </div>
          </div>

          <div className="stats-kpi">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#d1fae5", color: "#065f46" }}>
                <TrendingUp size={20} />
              </div>
              <span className="stats-badge stats-badge--up">{data.taux_encaissement}%</span>
            </div>
            <span className="stats-kpi-val">{fmtEur(data.commissions_encaissees)}</span>
            <span className="stats-kpi-lbl">Commissions encaissées</span>
            <span className="stats-kpi-sub">sur {fmtEur(data.commissions_attendues)} attendues</span>
          </div>

          <div className="stats-kpi">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#dbeafe", color: "#1e40af" }}>
                <FileText size={20} />
              </div>
              <span className="stats-badge stats-badge--up">+{data.contrats_nouveaux} / mois</span>
            </div>
            <span className="stats-kpi-val">{data.contrats_actifs}</span>
            <span className="stats-kpi-lbl">Contrats actifs</span>
            <span className="stats-kpi-sub">{data.contrats_nouveaux} nouveaux ce mois</span>
          </div>

          <div className="stats-kpi">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#fef3c7", color: "#92400e" }}>
                <Users size={20} />
              </div>
              <span className="stats-badge stats-badge--up">+{data.clients_nouveaux}</span>
            </div>
            <span className="stats-kpi-val">{data.clients_total}</span>
            <span className="stats-kpi-lbl">Clients assurés</span>
            <span className="stats-kpi-sub">{data.clients_nouveaux} nouveaux ce mois</span>
          </div>

          <div className="stats-kpi">
            <div className="stats-kpi-header">
              <div className="stats-kpi-icon-wrap" style={{ background: "#ede9fe", color: "#7c3aed" }}>
                <Target size={20} />
              </div>
            </div>
            <span className="stats-kpi-val">{data.taux_transformation}%</span>
            <span className="stats-kpi-lbl">Taux de transformation</span>
            <span className="stats-kpi-sub">{data.leads_convertis} convertis / {data.leads_total} leads</span>
          </div>

        </div>

        {/* ── Graphiques (client component) ── */}
        <StatsDashboardClient data={data} />

        {/* ── Modules de navigation ── */}
        <div>
          <h2 className="stats-section-title">Analyses détaillées</h2>
          <div className="stats-modules-grid">
            {modules.map((m) => (
              <Link key={m.href} href={m.href} className="stats-module-card">
                <div className="stats-module-icon" style={{ background: m.bg, color: m.color }}>
                  <span style={{ fontSize: 26 }}>{m.emoji}</span>
                </div>
                <div className="stats-module-body">
                  <span className="stats-module-title">{m.title}</span>
                  <span className="stats-module-desc">{m.description}</span>
                </div>
                <ChevronRight size={18} className="stats-module-arrow" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  );
}
