import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getFinanceDashboard } from "@/lib/actions/finance";
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

const fmtEuro = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

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



export default async function FinancePage() {
  const user = await requireRole(["admin", "courtier"]).catch(() => null);
  if (!user) redirect("/connexion");
  const dashboard = await getFinanceDashboard();

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
          {[
            {
              label: "Commissions reçues (mois)",
              value: dashboard ? fmtEuro(dashboard.totalCommissionsRecues) : "—",
              trend: dashboard ? `Attendu : ${fmtEuro(dashboard.totalCommissionsAttendues)}` : "",
              up: true, icon: Euro, color: "#10b981",
            },
            {
              label: "Écart commissions",
              value: dashboard ? fmtEuro(dashboard.ecartCommissions) : "—",
              trend: dashboard ? `${dashboard.nbImpayesCommissions} ligne${dashboard.nbImpayesCommissions !== 1 ? "s" : ""} à traiter` : "",
              up: dashboard ? dashboard.ecartCommissions <= 0 : null,
              icon: dashboard && dashboard.ecartCommissions > 0 ? AlertTriangle : CheckCircle2,
              color: dashboard && dashboard.ecartCommissions > 0 ? "#ef4444" : "#10b981",
            },
            {
              label: "Honoraires facturés (mois)",
              value: dashboard ? fmtEuro(dashboard.totalHonorairesFactures) : "—",
              trend: dashboard ? `${fmtEuro(dashboard.totalHonorairesEncaisses)} encaissés` : "",
              up: true, icon: Receipt, color: "#8b5cf6",
            },
            {
              label: "Factures en retard",
              value: dashboard ? String(dashboard.nbFacturesEnRetard) : "—",
              trend: "Relances à effectuer",
              up: dashboard ? dashboard.nbFacturesEnRetard === 0 : null,
              icon: Clock, color: dashboard && dashboard.nbFacturesEnRetard > 0 ? "#ef4444" : "#10b981",
            },
          ].map((kpi) => {
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
              {dashboard && dashboard.alertes.length > 0 ? dashboard.alertes.map((alert) => (
                <article key={alert.id} className="finance-alert-row">
                  <div className={`finance-alert-dot ${alert.statut}`} aria-hidden />
                  <div>
                    <strong>{alert.statut === "impaye" ? "Commission non reçue" : alert.statut === "taux_erreur" ? "Erreur de taux" : "Contrat résilié non signalé"}</strong>
                    <p>{alert.assureur} · {alert.contrat_ref ?? "—"}</p>
                  </div>
                  <span className="finance-alert-amount">{alert.ecart != null ? fmtEuro(Math.abs(Number(alert.ecart))) : "—"}</span>
                </article>
              )) : (
                <p style={{ color: "var(--muted)", fontSize: "14px", padding: "12px 0" }}>Aucune alerte en attente.</p>
              )}
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
              <p style={{ color: "var(--muted)", fontSize: "14px", padding: "12px 0" }}>
                {dashboard && dashboard.totalCommissionsRecues > 0
                  ? `${fmtEuro(dashboard.totalCommissionsRecues)} reçus ce mois`
                  : "Aucune commission enregistrée ce mois. Importez un bordereau."}
              </p>
              <Link href="/admin/finance/bordereaux" className="primary-action" style={{ display: "inline-flex", marginTop: "8px" }}>
                <FileSpreadsheet size={16} aria-hidden /> Importer un bordereau
              </Link>
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
