"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Plus,
  Search,
  ChevronRight,
  Download,
  CheckCircle2,
  Clock,
  Euro,
  Percent,
  FileText,
  Eye,
} from "lucide-react";

type ApporteurStatut = "actif" | "inactif";
type ReversementStatut = "calcule" | "valide" | "paye" | "en_attente";

type Apporteur = {
  id: string;
  nom: string;
  type: "apporteur" | "mandataire";
  statut: ApporteurStatut;
  taux_retrocession: number;
  contrats_actifs: number;
  ca_genere: number;
  reversement_mois: number;
  reversement_total: number;
};

type Reversement = {
  id: string;
  apporteur: string;
  periode: string;
  contrats: number;
  base_calcul: number;
  taux: number;
  montant: number;
  statut: ReversementStatut;
  date_generation: string;
  date_paiement?: string;
};

const DEMO_APPORTEURS: Apporteur[] = [
  { id: "1", nom: "Sophie Marchand", type: "apporteur", statut: "actif", taux_retrocession: 30, contrats_actifs: 8, ca_genere: 14200, reversement_mois: 426, reversement_total: 3840 },
  { id: "2", nom: "Cabinet Dupuis Conseil", type: "mandataire", statut: "actif", taux_retrocession: 40, contrats_actifs: 15, ca_genere: 28600, reversement_mois: 960, reversement_total: 8640 },
  { id: "3", nom: "Thomas Leroy", type: "apporteur", statut: "actif", taux_retrocession: 25, contrats_actifs: 4, ca_genere: 6800, reversement_mois: 170, reversement_total: 1530 },
  { id: "4", nom: "Réseau Familles+", type: "mandataire", statut: "inactif", taux_retrocession: 35, contrats_actifs: 0, ca_genere: 9200, reversement_mois: 0, reversement_total: 3220 },
];

const DEMO_REVERSEMENTS: Reversement[] = [
  { id: "1", apporteur: "Cabinet Dupuis Conseil", periode: "Mai 2026", contrats: 15, base_calcul: 2400, taux: 40, montant: 960, statut: "paye", date_generation: "2026-06-01", date_paiement: "2026-06-05" },
  { id: "2", apporteur: "Sophie Marchand", periode: "Mai 2026", contrats: 8, base_calcul: 1420, taux: 30, montant: 426, statut: "valide", date_generation: "2026-06-01" },
  { id: "3", apporteur: "Thomas Leroy", periode: "Mai 2026", contrats: 4, base_calcul: 680, taux: 25, montant: 170, statut: "calcule", date_generation: "2026-06-01" },
  { id: "4", apporteur: "Cabinet Dupuis Conseil", periode: "Avril 2026", contrats: 14, base_calcul: 2200, taux: 40, montant: 880, statut: "paye", date_generation: "2026-05-01", date_paiement: "2026-05-06" },
];

const REV_STATUS: Record<ReversementStatut, { label: string; color: string }> = {
  calcule: { label: "Calculé", color: "#9ca3af" },
  valide: { label: "Validé", color: "#3b82f6" },
  paye: { label: "Payé", color: "#10b981" },
  en_attente: { label: "En attente", color: "#f59e0b" },
};

export default function RevergementsPage() {
  const [activeTab, setActiveTab] = useState<"apporteurs" | "reversements">("apporteurs");
  const [search, setSearch] = useState("");

  const totalReversementsMois = DEMO_APPORTEURS.filter((a) => a.statut === "actif").reduce((s, a) => s + a.reversement_mois, 0);
  const totalApporteursActifs = DEMO_APPORTEURS.filter((a) => a.statut === "actif").length;
  const totalCaGenere = DEMO_APPORTEURS.reduce((s, a) => s + a.ca_genere, 0);

  return (
    <div className="finance-module">
      <nav className="page-breadcrumb">
        <Link href="/admin">Accueil</Link><ChevronRight size={12} />
        <Link href="/admin/finance">Finance</Link><ChevronRight size={12} />
        <span>Reversements apporteurs</span>
      </nav>

      <div className="finance-header">
        <div>
          <p className="eyebrow">Finance & Commissions</p>
          <h1>Reversements apporteurs</h1>
          <p style={{ color: "var(--muted)", marginTop: "4px" }}>Gérez la rétrocession de commissions selon des règles pré-établies par apporteur ou mandataire.</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="primary-action"><Plus size={18} aria-hidden /> Nouvel apporteur</button>
          <button className="secondary-action"><FileText size={16} aria-hidden /> Générer les relevés</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="finance-kpis" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="finance-kpi-card">
          <div className="finance-kpi-icon" style={{ background: "#f59e0b15", color: "#f59e0b" }}><Euro size={22} /></div>
          <div>
            <strong className="finance-kpi-value">{totalReversementsMois.toLocaleString("fr-FR")} €</strong>
            <small className="finance-kpi-label">Reversements ce mois</small>
          </div>
        </div>
        <div className="finance-kpi-card">
          <div className="finance-kpi-icon" style={{ background: "#3b82f615", color: "#3b82f6" }}><Users size={22} /></div>
          <div>
            <strong className="finance-kpi-value">{totalApporteursActifs}</strong>
            <small className="finance-kpi-label">Apporteurs actifs</small>
          </div>
        </div>
        <div className="finance-kpi-card">
          <div className="finance-kpi-icon" style={{ background: "#10b98115", color: "#10b981" }}><Percent size={22} /></div>
          <div>
            <strong className="finance-kpi-value">{totalCaGenere.toLocaleString("fr-FR")} €</strong>
            <small className="finance-kpi-label">CA total généré</small>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="client-360-tabs">
        <button className={`client-360-tab${activeTab === "apporteurs" ? " active" : ""}`} onClick={() => setActiveTab("apporteurs")}>
          <Users size={16} /> Apporteurs & mandataires
        </button>
        <button className={`client-360-tab${activeTab === "reversements" ? " active" : ""}`} onClick={() => setActiveTab("reversements")}>
          <FileText size={16} /> Relevés de reversements
        </button>
      </div>

      {/* Apporteurs */}
      {activeTab === "apporteurs" && (
        <div className="finance-table-wrap">
          <div className="finance-table-scroll">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Apporteur / Mandataire</th>
                  <th>Type</th>
                  <th>Statut</th>
                  <th>Taux rétrocession</th>
                  <th>Contrats actifs</th>
                  <th>CA généré</th>
                  <th>Reversement (mois)</th>
                  <th>Total reversé</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {DEMO_APPORTEURS.map((ap) => (
                  <tr key={ap.id} className="finance-table-row">
                    <td><strong>{ap.nom}</strong></td>
                    <td><span className="crm-tag">{ap.type === "mandataire" ? "Mandataire" : "Apporteur"}</span></td>
                    <td>
                      <span className="crm-status-badge" style={{ background: ap.statut === "actif" ? "#10b98120" : "#9ca3af20", color: ap.statut === "actif" ? "#10b981" : "#9ca3af" }}>
                        {ap.statut === "actif" ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right", fontWeight: 700, color: "var(--accent-strong)" }}>{ap.taux_retrocession}%</td>
                    <td style={{ textAlign: "right" }}>{ap.contrats_actifs}</td>
                    <td style={{ textAlign: "right" }}>{ap.ca_genere.toLocaleString("fr-FR")} €</td>
                    <td style={{ textAlign: "right", fontWeight: 700, color: "#f59e0b" }}>{ap.reversement_mois.toLocaleString("fr-FR")} €</td>
                    <td style={{ textAlign: "right" }}>{ap.reversement_total.toLocaleString("fr-FR")} €</td>
                    <td><button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: "4px" }}><Eye size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Relevés */}
      {activeTab === "reversements" && (
        <div className="finance-table-wrap">
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
            <button className="secondary-action" style={{ fontSize: "13px", padding: "7px 14px" }}>
              <Download size={15} aria-hidden /> Exporter les relevés
            </button>
          </div>
          <div className="finance-table-scroll">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Statut</th>
                  <th>Apporteur</th>
                  <th>Période</th>
                  <th>Contrats</th>
                  <th>Base de calcul</th>
                  <th>Taux</th>
                  <th>Montant reversé</th>
                  <th>Date génération</th>
                  <th>Date paiement</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {DEMO_REVERSEMENTS.map((rev) => {
                  const cfg = REV_STATUS[rev.statut];
                  return (
                    <tr key={rev.id} className="finance-table-row">
                      <td><span className="finance-status-cell" style={{ color: cfg.color }}>{cfg.label}</span></td>
                      <td><strong>{rev.apporteur}</strong></td>
                      <td>{rev.periode}</td>
                      <td style={{ textAlign: "right" }}>{rev.contrats}</td>
                      <td style={{ textAlign: "right" }}>{rev.base_calcul.toLocaleString("fr-FR")} €</td>
                      <td style={{ textAlign: "right", fontWeight: 700 }}>{rev.taux}%</td>
                      <td style={{ textAlign: "right", fontWeight: 700, color: "#f59e0b" }}>{rev.montant.toLocaleString("fr-FR")} €</td>
                      <td style={{ fontSize: "13px" }}>{new Date(rev.date_generation).toLocaleDateString("fr-FR")}</td>
                      <td style={{ fontSize: "13px", color: "#10b981" }}>{rev.date_paiement ? new Date(rev.date_paiement).toLocaleDateString("fr-FR") : "—"}</td>
                      <td>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: "4px" }}><Eye size={16} /></button>
                          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: "4px" }}><Download size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
