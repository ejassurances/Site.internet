import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Euro,
  FileSpreadsheet,
  Receipt,
  Users,
  Download,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Zap,
  CreditCard,
  BarChart3,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";

export const metadata: Metadata = { title: "Finance & Commissions — EJ Partners Admin" };

// ── Données de démo ────────────────────────────────────────────────────────────
const kpis = [
  {
    label: "Commissions encaissées (mois)",
    value: "4 820 €",
    trend: "+12%",
    up: true,
    icon: Euro,
    color: "#10b981",
  },
  {
    label: "Commissions attendues",
    value: "6 340 €",
    trend: "2 assureurs",
    up: null,
    icon: Clock,
    color: "#3b82f6",
  },
  {
    label: "Impayés détectés",
    value: "3",
    trend: "780 € en attente",
    up: false,
    icon: AlertTriangle,
    color: "#ef4444",
  },
  {
    label: "Honoraires facturés (mois)",
    value: "1 200 €",
    trend: "+2 factures",
    up: true,
    icon: Receipt,
    color: "#8b5cf6",
  },
  {
    label: "Reversements apporteurs",
    value: "620 €",
    trend: "3 apporteurs",
    up: null,
    icon: Users,
    color: "#f59e0b",
  },
  {
    label: "Taux de rapprochement",
    value: "94%",
    trend: "+3pts vs mois dernier",
    up: true,
    icon: CheckCircle2,
    color: "#10b981",
  },
];

const modules = [
  {
    href: "/admin/finance/bordereaux",
    emoji: "📊",
    title: "Bordereaux de commissions",
    description: "Importez vos bordereaux assureurs (Excel/CSV/PDF) et lancez le matching automatique avec vos contrats.",
    badge: "3 alertes",
    badgeColor: "#ef4444",
  },
  {
    href: "/admin/finance/facturation",
    emoji: "🧾",
    title: "Facturation honoraires",
    description: "Émettez des factures d'honoraires de conseil conformes et suivez leurs encaissements.",
    badge: null,
    badgeColor: null,
  },
  {
    href: "/admin/finance/reversements",
    emoji: "🤝",
    title: "Reversements apporteurs",
    description: "Gérez la rétrocession de commissions à vos apporteurs d'affaires selon des règles pré-établies.",
    badge: null,
    badgeColor: null,
  },
  {
    href: "/admin/finance/exports",
    emoji: "📤",
    title: "Exports comptables (FEC)",
    description: "Générez vos fichiers FEC ou CSV formatés pour votre expert-comptable.",
    badge: null,
    badgeColor: null,
  },
  {
    href: "/admin/finance/encaissements",
    emoji: "💳",
    title: "Encaissements & SEPA",
    description: "Suivi fin des encaissements, prélèvements SEPA clients et génération des quittances.",
    badge: null,
    badgeColor: null,
  },
  {
    href: "/admin/finance/avenants",
    emoji: "📝",
    title: "Avenants sur contrat",
    description: "Gestion des avenants et impact sur les commissions et reversements.",
    badge: null,
    badgeColor: null,
  },
];

const recentAlerts = [
  { type: "impaye", assureur: "Generali", contrat: "AE-2024-0312", montant: "320 €", date: "2026-06-01", label: "Commission non reçue" },
  { type: "taux", assureur: "Allianz", contrat: "PRE-2024-0198", montant: "45 €", date: "2026-05-28", label: "Erreur de taux détectée" },
  { type: "resilie", assureur: "AXA", contrat: "AE-2023-0089", montant: "415 €", date: "2026-05-15", label: "Contrat résilié non signalé" },
];

const recentCommissions = [
  { assureur: "CNP Assurances", type: "Assurance emprunteur", montant: "1 240 €", statut: "encaisse", date: "2026-06-10" },
  { assureur: "Generali", type: "Prévoyance", montant: "680 €", statut: "encaisse", date: "2026-06-08" },
  { assureur: "Allianz", type: "Assurance emprunteur", montant: "890 €", statut: "en_attente", date: "2026-06-05" },
  { assureur: "AXA", type: "Transmission", montant: "560 €", statut: "en_attente", date: "2026-06-01" },
  { assureur: "Cardif", type: "Prévoyance", montant: "450 €", statut: "encaisse", date: "2026-05-28" },
];

export default async function FinancePage() {
  const user = await requireRole(["admin", "courtier"]);

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="finance-dashboard">
        {/* ── Header ── */}
        <div className="finance-header">
          <div>
            <p className="eyebrow">Module Finance</p>
            <h1>Finance & Commissions</h1>
            <p style={{ color: "var(--muted)", marginTop: "4px", fontSize: "15px" }}>
              Suivi automatisé des commissions, facturation honoraires, reversements et exports comptables.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link href="/admin/finance/bordereaux" className="primary-action">
              <FileSpreadsheet size={18} aria-hidden /> Importer un bordereau
            </Link>
            <Link href="/admin/finance/exports" className="secondary-action">
              <Download size={18} aria-hidden /> Export FEC
            </Link>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="finance-kpis">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="finance-kpi-card">
                <div className="finance-kpi-icon" style={{ background: `${kpi.color}15`, color: kpi.color }}>
                  <Icon size={22} aria-hidden />
                </div>
                <div>
                  <strong className="finance-kpi-value">{kpi.value}</strong>
                  <small className="finance-kpi-label">{kpi.label}</small>
                  <span className="finance-kpi-trend" style={{
                    color: kpi.up === true ? "#10b981" : kpi.up === false ? "#ef4444" : "var(--muted)",
                  }}>
                    {kpi.up === true && <ArrowUp size={12} aria-hidden />}
                    {kpi.up === false && <ArrowDown size={12} aria-hidden />}
                    {kpi.trend}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Alertes + Commissions récentes ── */}
        <div className="finance-split">
          {/* Alertes impayés */}
          <section className="finance-panel">
            <div className="finance-panel-header">
              <h2><AlertTriangle size={18} aria-hidden style={{ color: "#ef4444" }} /> Alertes impayés</h2>
              <Link href="/admin/finance/bordereaux" style={{ fontSize: "13px", color: "var(--accent-strong)", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                Voir tout <ArrowRight size={14} />
              </Link>
            </div>
            <div className="finance-alerts-list">
              {recentAlerts.map((alert) => (
                <article key={alert.contrat} className="finance-alert-row">
                  <div className={`finance-alert-dot ${alert.type}`} aria-hidden />
                  <div>
                    <strong>{alert.label}</strong>
                    <p>{alert.assureur} · {alert.contrat}</p>
                  </div>
                  <span className="finance-alert-amount">{alert.montant}</span>
                </article>
              ))}
            </div>
          </section>

          {/* Commissions récentes */}
          <section className="finance-panel">
            <div className="finance-panel-header">
              <h2><TrendingUp size={18} aria-hidden style={{ color: "#10b981" }} /> Commissions récentes</h2>
              <Link href="/admin/finance/commissions" style={{ fontSize: "13px", color: "var(--accent-strong)", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                Voir tout <ArrowRight size={14} />
              </Link>
            </div>
            <div className="finance-commissions-list">
              {recentCommissions.map((com, i) => (
                <article key={i} className="finance-commission-row">
                  <div>
                    <strong>{com.assureur}</strong>
                    <p>{com.type}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <strong style={{ color: com.statut === "encaisse" ? "#10b981" : "var(--ink)" }}>{com.montant}</strong>
                    <span className="crm-status-badge" style={{
                      background: com.statut === "encaisse" ? "#10b98120" : "#f59e0b20",
                      color: com.statut === "encaisse" ? "#10b981" : "#f59e0b",
                      display: "block",
                      marginTop: "4px",
                    }}>
                      {com.statut === "encaisse" ? "Encaissé" : "En attente"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* ── Modules Finance ── */}
        <section>
          <div style={{ marginBottom: "20px" }}>
            <p className="eyebrow">Modules disponibles</p>
            <h2 style={{ margin: 0 }}>Finance & Gestion</h2>
          </div>
          <div className="admin-modules-grid">
            {modules.map((mod) => (
              <Link key={mod.href} href={mod.href} className="admin-module-card">
                <div className="admin-module-icon">{mod.emoji}</div>
                <h3>
                  {mod.title}
                  {mod.badge && (
                    <span style={{
                      marginLeft: "8px",
                      padding: "2px 8px",
                      background: `${mod.badgeColor}20`,
                      color: mod.badgeColor ?? "inherit",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}>
                      {mod.badge}
                    </span>
                  )}
                </h3>
                <p>{mod.description}</p>
                <div className="admin-module-card-footer">
                  <span>Accéder</span>
                  <ArrowRight size={16} aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
