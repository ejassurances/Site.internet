"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  FileSpreadsheet,
  FileText,
  ChevronRight,
  Calendar,
  CheckCircle2,
  Clock,
  Database,
  Settings,
} from "lucide-react";

type ExportType = "fec" | "csv_commissions" | "csv_honoraires" | "csv_reversements" | "csv_complet";

const EXPORT_CONFIGS: Record<ExportType, { label: string; description: string; icon: typeof FileSpreadsheet; format: string; color: string }> = {
  fec: {
    label: "Fichier des Écritures Comptables (FEC)",
    description: "Export normé DGFiP — compatible avec tous les logiciels comptables (Sage, Cegid, EBP…). Obligatoire en cas de contrôle fiscal.",
    icon: Database,
    format: ".txt (FEC)",
    color: "#8b5cf6",
  },
  csv_commissions: {
    label: "Export commissions (CSV)",
    description: "Toutes les commissions encaissées et attendues sur la période sélectionnée.",
    icon: FileSpreadsheet,
    format: ".csv",
    color: "#10b981",
  },
  csv_honoraires: {
    label: "Export honoraires facturés (CSV)",
    description: "Toutes les factures d'honoraires émises avec leur statut d'encaissement.",
    icon: FileSpreadsheet,
    format: ".csv",
    color: "#3b82f6",
  },
  csv_reversements: {
    label: "Export reversements apporteurs (CSV)",
    description: "Tous les reversements calculés et payés aux apporteurs et mandataires.",
    icon: FileSpreadsheet,
    format: ".csv",
    color: "#f59e0b",
  },
  csv_complet: {
    label: "Export comptable complet (CSV)",
    description: "Toutes les opérations financières du cabinet sur la période : commissions, honoraires, reversements.",
    icon: FileText,
    format: ".csv",
    color: "#ef4444",
  },
};

const RECENT_EXPORTS = [
  { type: "fec", label: "FEC Janvier–Mai 2026", date: "2026-06-01", size: "48 Ko", statut: "ok" },
  { type: "csv_commissions", label: "Commissions Mai 2026", date: "2026-06-01", size: "12 Ko", statut: "ok" },
  { type: "csv_reversements", label: "Reversements Mai 2026", date: "2026-06-01", size: "6 Ko", statut: "ok" },
  { type: "csv_honoraires", label: "Honoraires T1 2026", date: "2026-04-01", size: "8 Ko", statut: "ok" },
];

export default function ExportsPage() {
  const [periodeDebut, setPeriodeDebut] = useState("2026-01-01");
  const [periodeFin, setPeriodeFin] = useState("2026-06-30");
  const [selectedType, setSelectedType] = useState<ExportType>("fec");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div className="finance-module">
      <nav className="page-breadcrumb">
        <Link href="/admin">Accueil</Link><ChevronRight size={12} />
        <Link href="/admin/finance">Finance</Link><ChevronRight size={12} />
        <span>Exports comptables</span>
      </nav>

      <div className="finance-header">
        <div>
          <p className="eyebrow">Finance & Commissions</p>
          <h1>Exports comptables (FEC)</h1>
          <p style={{ color: "var(--muted)", marginTop: "4px" }}>Générez vos fichiers FEC ou CSV formatés pour votre expert-comptable. Fini les saisies manuelles.</p>
        </div>
      </div>

      <div className="finance-split">
        {/* Configurateur d'export */}
        <section className="finance-panel" style={{ flex: "1.5" }}>
          <div className="finance-panel-header">
            <h2><Settings size={18} aria-hidden /> Configurer l'export</h2>
          </div>

          {/* Période */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontWeight: 700, fontSize: "13px", marginBottom: "10px", color: "var(--navy)" }}>
              <Calendar size={14} style={{ display: "inline", marginRight: "6px" }} aria-hidden />
              Période
            </label>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <input
                type="date"
                value={periodeDebut}
                onChange={(e) => setPeriodeDebut(e.target.value)}
                style={{ padding: "8px 12px", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", fontSize: "14px", background: "var(--bg)" }}
              />
              <span style={{ color: "var(--muted)" }}>→</span>
              <input
                type="date"
                value={periodeFin}
                onChange={(e) => setPeriodeFin(e.target.value)}
                style={{ padding: "8px 12px", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", fontSize: "14px", background: "var(--bg)" }}
              />
            </div>
          </div>

          {/* Type d'export */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontWeight: 700, fontSize: "13px", marginBottom: "10px", color: "var(--navy)" }}>
              Type d'export
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(Object.entries(EXPORT_CONFIGS) as [ExportType, typeof EXPORT_CONFIGS[ExportType]][]).map(([key, cfg]) => {
                const Icon = cfg.icon;
                return (
                  <label
                    key={key}
                    className={`export-option${selectedType === key ? " selected" : ""}`}
                    style={{ borderColor: selectedType === key ? cfg.color : "var(--line)" }}
                  >
                    <input
                      type="radio"
                      name="export_type"
                      value={key}
                      checked={selectedType === key}
                      onChange={() => setSelectedType(key)}
                      style={{ display: "none" }}
                    />
                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: `${cfg.color}15`, display: "grid", placeItems: "center", color: cfg.color, flexShrink: 0 }}>
                      <Icon size={18} aria-hidden />
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: "14px" }}>{cfg.label}</strong>
                      <p style={{ margin: "3px 0 0", fontSize: "12px", color: "var(--muted)" }}>{cfg.description}</p>
                    </div>
                    <span className="crm-tag" style={{ flexShrink: 0 }}>{cfg.format}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <button
            className="primary-action"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? (
              <><Clock size={18} aria-hidden /> Génération en cours…</>
            ) : (
              <><Download size={18} aria-hidden /> Générer et télécharger</>
            )}
          </button>
        </section>

        {/* Exports récents */}
        <section className="finance-panel" style={{ flex: "1" }}>
          <div className="finance-panel-header">
            <h2><Clock size={18} aria-hidden /> Exports récents</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {RECENT_EXPORTS.map((exp, i) => {
              const cfg = EXPORT_CONFIGS[exp.type as ExportType];
              const Icon = cfg?.icon ?? FileText;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: `${cfg?.color ?? "#9ca3af"}15`, display: "grid", placeItems: "center", color: cfg?.color ?? "#9ca3af", flexShrink: 0 }}>
                    <Icon size={18} aria-hidden />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ fontSize: "13px", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{exp.label}</strong>
                    <small style={{ color: "var(--muted)", fontSize: "12px" }}>
                      {new Date(exp.date).toLocaleDateString("fr-FR")} · {exp.size}
                    </small>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <CheckCircle2 size={14} style={{ color: "#10b981" }} aria-hidden />
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: "4px" }}>
                      <Download size={16} aria-hidden />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info FEC */}
          <div style={{ marginTop: "20px", padding: "16px", background: "#8b5cf610", border: "1px solid #8b5cf630", borderRadius: "var(--radius-sm)" }}>
            <strong style={{ fontSize: "13px", color: "#8b5cf6", display: "flex", alignItems: "center", gap: "6px" }}>
              <Database size={14} aria-hidden /> À propos du FEC
            </strong>
            <p style={{ margin: "8px 0 0", fontSize: "12px", color: "var(--muted)", lineHeight: 1.6 }}>
              Le Fichier des Écritures Comptables (FEC) est obligatoire pour les entreprises soumises à l'impôt sur les sociétés. Il doit être fourni à l'administration fiscale en cas de contrôle. Notre export respecte le format normé défini par l'arrêté du 29 juillet 2013.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
