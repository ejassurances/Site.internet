"use client";

import { useState } from "react";
import { AlertTriangle, Shield, Search, Clock, CheckCircle, XCircle, RefreshCw, User, FileText, Globe } from "lucide-react";
import { AdminModulePage } from "@/components/admin-module-page";
import { requireRole } from "@/lib/auth";

// âââ Types âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
type ScreeningResult = "conforme" | "alerte" | "en_cours" | "non_verifie";

interface PPECheck {
  id: string;
  client_name: string;
  client_email: string;
  check_date: string;
  resultat: ScreeningResult;
  sources: string[];
  note?: string;
}

interface GelAvoirs {
  id: string;
  client_name: string;
  check_date: string;
  listes_verifiees: string[];
  resultat: ScreeningResult;
}

// âââ Mock data (Ã  remplacer par appel Supabase) ââââââââââââââââââââââââââââââ
const MOCK_PPE: PPECheck[] = [
  {
    id: "1",
    client_name: "Jean Dupont",
    client_email: "jean.dupont@email.fr",
    check_date: "2025-01-15",
    resultat: "conforme",
    sources: ["Bases PPE FR", "Bases UE"],
    note: "Aucune correspondance dÃ©tectÃ©e",
  },
  {
    id: "2",
    client_name: "Marie Martin",
    client_email: "marie.martin@email.fr",
    check_date: "2025-02-08",
    resultat: "conforme",
    sources: ["Bases PPE FR", "Bases UE", "Bases ONU"],
  },
  {
    id: "3",
    client_name: "Pierre Leblanc",
    client_email: "pierre.leblanc@email.fr",
    check_date: "2025-03-12",
    resultat: "alerte",
    sources: ["Bases PPE FR"],
    note: "Correspondance partielle dÃ©tectÃ©e â vÃ©rification manuelle requise",
  },
  {
    id: "4",
    client_name: "Sophie Bernard",
    client_email: "sophie.bernard@email.fr",
    check_date: "2025-04-01",
    resultat: "en_cours",
    sources: [],
  },
];

const MOCK_GEL: GelAvoirs[] = [
  {
    id: "1",
    client_name: "Jean Dupont",
    check_date: "2025-01-15",
    listes_verifiees: ["TrÃ©sor FR", "UE", "ONU", "OFAC"],
    resultat: "conforme",
  },
  {
    id: "2",
    client_name: "Marie Martin",
    check_date: "2025-02-08",
    listes_verifiees: ["TrÃ©sor FR", "UE", "ONU"],
    resultat: "conforme",
  },
  {
    id: "3",
    client_name: "Pierre Leblanc",
    check_date: "2025-03-12",
    listes_verifiees: ["TrÃ©sor FR", "UE"],
    resultat: "alerte",
  },
  {
    id: "4",
    client_name: "Sophie Bernard",
    check_date: "2025-04-01",
    listes_verifiees: [],
    resultat: "non_verifie",
  },
];

// âââ Composants ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function ResultBadge({ result }: { result: ScreeningResult }) {
  const map: Record<ScreeningResult, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
    conforme:    { label: "Conforme",     color: "#10B981", bg: "rgba(16,185,129,.1)",  icon: CheckCircle   },
    alerte:      { label: "Alerte",       color: "#EF4444", bg: "rgba(239,68,68,.1)",   icon: XCircle       },
    en_cours:    { label: "En cours",     color: "#3B82F6", bg: "rgba(59,130,246,.1)",  icon: RefreshCw     },
    non_verifie: { label: "Non vÃ©rifiÃ©",  color: "#F59E0B", bg: "rgba(245,158,11,.1)",  icon: AlertTriangle },
  };
  const { label, color, bg, icon: Icon } = map[result];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "4px 10px", borderRadius: "999px", background: bg,
      color, fontSize: "12px", fontWeight: 700 }}>
      <Icon size={11} aria-hidden /> {label}
    </span>
  );
}

type TabId = "ppe" | "gel" | "statistiques";

export default function LcbFtPage() {
  const [tab, setTab] = useState<TabId>("ppe");
  const [search, setSearch] = useState("");

  const filteredPPE = MOCK_PPE.filter(
    (r) =>
      r.client_name.toLowerCase().includes(search.toLowerCase()) ||
      r.client_email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredGel = MOCK_GEL.filter((r) =>
    r.client_name.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: MOCK_PPE.length,
    conformes: MOCK_PPE.filter((r) => r.resultat === "conforme").length,
    alertes: MOCK_PPE.filter((r) => r.resultat === "alerte").length,
    en_cours: MOCK_PPE.filter((r) => r.resultat === "en_cours").length,
    non_verifies: MOCK_PPE.filter((r) => r.resultat === "non_verifie").length,
  };

  const tabs: { id: TabId; label: string; icon: typeof Shield }[] = [
    { id: "ppe",          label: "Screening PPE",    icon: User       },
    { id: "gel",          label: "Gel des avoirs",   icon: Globe      },
    { id: "statistiques", label: "Statistiques",     icon: FileText   },
  ];

  return (
    <AdminModulePage
      icon={<Shield size={20} />}
      title="LCB-FT â Screening &amp; Gel des avoirs"
      description="Lutte contre le Blanchiment de Capitaux et le Financement du Terrorisme"
      breadcrumbs={[
        { label: "ConformitÃ©", href: "/admin/conformite" },
        { label: "LCB-FT" },
      ]}
    >
      {/* KPI banner */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Total vÃ©rifiÃ©s",  value: stats.total,           color: "var(--navy)"  },
          { label: "Conformes",       value: stats.conformes,      color: "#10B981"       },
          { label: "Alertes",         value: stats.alertes,        color: "#EF4444"       },
          { label: "Non vÃ©rifiÃ©s",    value: stats.non_verifies,   color: "#F59E0B"       },
        ].map((kpi) => (
          <div key={kpi.label} style={{ padding: "16px", border: "1px solid var(--line)",
            borderRadius: "var(--radius-sm)", background: "var(--surface)",
            boxShadow: "var(--shadow-sm)" }}>
            <p style={{ margin: "0 0 4px", fontSize: "12px", fontWeight: 700,
              color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>
              {kpi.label}
            </p>
            <p style={{ margin: 0, fontSize: "28px", fontWeight: 900, color: kpi.color, lineHeight: 1 }}>
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "20px", padding: "4px",
        background: "rgba(7,24,39,.04)", borderRadius: "10px", width: "fit-content" }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)} style={{
            display: "flex", alignItems: "center", gap: "7px", padding: "7px 14px",
            borderRadius: "8px", border: "none",
            background: tab === id ? "white" : "transparent",
            color: tab === id ? "var(--navy)" : "var(--muted)",
            fontWeight: tab === id ? 700 : 600, fontSize: "13px", cursor: "pointer",
            boxShadow: tab === id ? "0 1px 4px rgba(7,24,39,.1)" : "none",
            transition: "all .15s",
          }}>
            <Icon size={14} aria-hidden /> {label}
          </button>
        ))}
      </div>

      {/* Search (PPE + Gel tabs) */}
      {tab !== "statistiques" && (
        <div style={{ position: "relative", marginBottom: "16px", maxWidth: "400px" }}>
          <Search size={15} style={{ position: "absolute", left: "12px", top: "50%",
            transform: "translateY(-50%)", color: "var(--muted)" }} aria-hidden />
          <input
            type="text"
            placeholder="Rechercher un clientâ¦"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", height: "38px", paddingLeft: "36px", paddingRight: "12px",
              border: "1px solid var(--line)", borderRadius: "var(--radius-sm)",
              background: "var(--surface)", fontSize: "14px", outline: "none" }}
          />
        </div>
      )}

      {/* Tab: PPE 
  {tab === "ppe" && (
        <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius)",
          background: "var(--surface)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "rgba(7,24,39,.03)", borderBottom: "1px solid var(--line)" }}>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700,
                  fontSize: "12px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>Client</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700,
                  fontSize: "12px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>Date</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700,
                  fontSize: "12px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>Sources</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700,
                  fontSize: "12px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>RÃ©sultat</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700,
                  fontSize: "12px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>Note</th>
              </tr>
            </thead>
            <tbody>
              {filteredPPE.map((row, i) => (
                <tr key={row.id}
                  style={{ borderBottom: i < filteredPPE.length - 1 ? "1px solid var(--line)" : "none",
                    background: row.resultat === "alerte" ? "rgba(239,68,68,.02)" : undefined }}>
                  <td style={{ padding: "12px 16px" }}>
                    <p style={{ margin: 0, fontWeight: 600 }}>{row.client_name}</p>
                    <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)" }}>{row.client_email}</p>
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--muted)", fontSize: "13px" }}>
                    <Clock size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} aria-hidden />
                    {new Date(row.check_date).toLocaleDateString("fr-FR")}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {row.sources.map((s) => (
                        <span key={s} style={{ padding: "2px 7px", background: "rgba(59,130,246,.08)",
                          color: "#3B82F6", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>
                          {s}
                        </span>
                      ))}
                      {row.sources.length === 0 && <span style={{ color: "var(--muted)", fontSize: "12px" }}>â</span>}
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <ResultBadge result={row.resultat} />
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--muted)", fontSize: "13px", maxWidth: "200px" }}>
                    {row.note ?? "â"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Gel des avoirs */}
      {tab === "gel" && (
        <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius)",
          background: "var(--surface)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "rgba(7,24,39,.03)", borderBottom: "1px solid var(--line)" }}>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700,
                  fontSize: "12px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>Client</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700,
                  fontSize: "12px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>Date</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700,
                  fontSize: "12px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>Listes vÃ©rifiÃ©es</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700,
                  fontSize: "12px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>RÃ©sultat</th>
              </tr>
            </thead>
            <tbody>
              {filteredGel.map((row, i) => (
                <tr key={row.id}
                  style={{ borderBottom: i < filteredGel.length - 1 ? "1px solid var(--line)" : "none",
                    background: row.resultat === "alerte" ? "rgba(239,68,68,.02)" : undefined }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>{row.client_name}</td>
                  <td style={{ padding: "12px 16px", color: "var(--muted)", fontSize: "13px" }}>
                    {new Date(row.check_date).toLocaleDateString("fr-FR")}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {row.listes_verifiees.map((l) => (
                        <span key={l} style={{ padding: "2px 7px", background: "rgba(139,92,246,.08)",
                          color: "#8B5CF6", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>
                          {l}
                        </span>
                      ))}
                      {row.listes_verifiees.length === 0 && <span style={{ color: "var(--muted)", fontSize: "12px" }}>Non lancÃ©</span>}
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <ResultBadge result={row.resultat} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Statistiques */}
      {tab === "statistiques" && (
        <div style={{ display: "grid", gap: "20px" }}>
          <div style={{ padding: "24px", border: "1px solid var(--line)", borderRadius: "var(--radius)",
            background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: "16px" }}>Tableau de bord LCB-FT</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { label: "Taux de conformitÃ© PPE",             value: `${Math.round((stats.conformes / stats.total) * 100)}%`, color: "#10B981" },
                { label: "Alertes actives",                     value: stats.alertes.toString(),                                   color: "#EF4444" },
                { label: "Dossiers en cours de vÃ©rification",   value: stats.en_cours.toString(),                                  color: "#3B82F6" },
                { label: "Dossiers sans vÃ©rification",          value: stats.non_verifies.toString(),                              color: "#F59E0B" },
              ].map((item) => (
                <div key={item.label} style={{ padding: "14px 16px", border: "1px solid var(--line)",
                  borderRadius: "var(--radius-sm)", background: "var(--surface-soft)" }}>
                  <p style={{ margin: "0 0 4px", fontSize: "13px", color: "var(--muted)" }}>{item.label}</p>
                  <p style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: item.color }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "20px", border: "1px solid rgba(245,158,11,.3)",
            borderRadius: "var(--radius)", background: "rgba(245,158,11,.05)" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <AlertTriangle size={18} color="#F59E0B" style={{ flexShrink: 0, marginTop: "2px" }} aria-hidden />
              <div>
                <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#92400e", fontSize: "14px" }}>
                  Rappel rÃ©glementaire
                </p>
                <p style={{ margin: 0, fontSize: "13px", color: "#92400e", lineHeight: 1.6 }}>
                  Les screenings PPE et gel des avoirs doivent Ãªtre renouvelÃ©s lors de chaque
                  nouvelle entrÃ©e en relation ET pÃ©riodiquement (au minimum annuellement) pour
                  les clients existants. Tout soupÃ§on doit faire l&apos;objet d&apos;une
                  dÃ©claration Ã  Tracfin (Art. L.561-15 CMF).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminModulePage>
  );
}
