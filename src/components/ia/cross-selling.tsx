"use client";

import { useState } from "react";

type Opportunity = {
  client_id: string;
  client_name: string;
  email: string;
  score: number;
  situation: string;
  contrats_actifs: string[];
  opportunites: {
    produit: string;
    raison: string;
    priorite: "haute" | "moyenne" | "basse";
    potentiel_ca: string;
  }[];
  action_recommandee: string;
};

type ScanResult = {
  total_clients: number;
  opportunites_detectees: number;
  ca_potentiel_total: string;
  opportunities: Opportunity[];
};

const PRIORITY_COLORS = {
  haute: { bg: "#fee2e2", text: "#dc2626", border: "#fca5a5" },
  moyenne: { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  basse: { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
};

const SCORE_COLOR = (score: number) => {
  if (score >= 80) return "#dc2626";
  if (score >= 60) return "#f59e0b";
  return "#059669";
};

export function CrossSellingModule() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "haute" | "moyenne" | "basse">("all");
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const runScan = async () => {
    setIsScanning(true);
    setResult(null);
    setError("");
    try {
      const res = await fetch("/api/ia/cross-selling", { method: "POST" });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setResult(data);
    } catch {
      setError("Erreur lors du scan. Vérifiez la configuration OpenAI.");
    } finally {
      setIsScanning(false);
    }
  };

  const filtered = result?.opportunities.filter((o) => {
    if (filter === "all") return true;
    return o.opportunites.some((op) => op.priorite === filter);
  }) || [];

  return (
    <div className="ia-cross-layout">
      {/* Header scan */}
      {!result && !isScanning && (
        <div className="ia-cross-start">
          <div className="ia-cross-start-icon">🎯</div>
          <h2 className="ia-cross-start-title">Scanner le portefeuille</h2>
          <p className="ia-cross-start-desc">
            IaGO analyse l&apos;ensemble de votre portefeuille client pour identifier les garanties manquantes
            et les opportunités de multi-équipement. L&apos;analyse prend environ 30 secondes.
          </p>
          <div className="ia-cross-start-features">
            {[
              { icon: "🔍", label: "Analyse 100% du portefeuille" },
              { icon: "💡", label: "Détection des garanties manquantes" },
              { icon: "📊", label: "Scoring par opportunité" },
              { icon: "💰", label: "Estimation du CA potentiel" },
            ].map((f) => (
              <div key={f.label} className="ia-cross-start-feature">
                <span>{f.icon}</span> {f.label}
              </div>
            ))}
          </div>
          <button className="ia-cross-scan-btn" onClick={runScan}>
            🎯 Lancer le scan IA
          </button>
        </div>
      )}

      {isScanning && (
        <div className="ia-cross-scanning">
          <div className="ia-cross-scanning-icon">🤖</div>
          <div className="ia-cross-scanning-title">IaGO scanne votre portefeuille...</div>
          <div className="ia-cross-scanning-steps">
            {[
              "Chargement des fiches clients",
              "Analyse des contrats actifs",
              "Détection des garanties manquantes",
              "Calcul des scores d'opportunité",
              "Génération des recommandations",
            ].map((step, i) => (
              <div key={step} className="ia-cross-scanning-step" style={{ animationDelay: `${i * 0.4}s` }}>
                <div className="ia-cross-scanning-dot" />
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="ia-resume-error">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </div>
      )}

      {result && (
        <div className="ia-cross-results">
          {/* KPIs */}
          <div className="ia-cross-kpis">
            <div className="ia-cross-kpi">
              <div className="ia-cross-kpi-val">{result.total_clients}</div>
              <div className="ia-cross-kpi-lbl">Clients analysés</div>
            </div>
            <div className="ia-cross-kpi ia-cross-kpi--featured">
              <div className="ia-cross-kpi-val" style={{ color: "#dc2626" }}>{result.opportunites_detectees}</div>
              <div className="ia-cross-kpi-lbl">Opportunités détectées</div>
            </div>
            <div className="ia-cross-kpi">
              <div className="ia-cross-kpi-val" style={{ color: "#059669" }}>{result.ca_potentiel_total}</div>
              <div className="ia-cross-kpi-lbl">CA potentiel estimé</div>
            </div>
            <button className="ia-cross-rescan-btn" onClick={runScan}>
              🔄 Relancer le scan
            </button>
          </div>

          {/* Filters */}
          <div className="ia-cross-filters">
            <span className="ia-cross-filters-label">Filtrer par priorité :</span>
            {(["all", "haute", "moyenne", "basse"] as const).map((f) => (
              <button
                key={f}
                className={`ia-cross-filter-btn${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "Toutes" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Opportunities list */}
          <div className="ia-cross-list">
            {filtered.map((opp) => (
              <div
                key={opp.client_id}
                className={`ia-cross-item${selectedOpportunity?.client_id === opp.client_id ? " active" : ""}`}
                onClick={() => setSelectedOpportunity(selectedOpportunity?.client_id === opp.client_id ? null : opp)}
              >
                <div className="ia-cross-item-header">
                  <div className="ia-cross-item-left">
                    <div className="ia-cross-item-avatar">
                      {opp.client_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="ia-cross-item-name">{opp.client_name}</div>
                      <div className="ia-cross-item-situation">{opp.situation}</div>
                    </div>
                  </div>
                  <div className="ia-cross-item-right">
                    <div className="ia-cross-score-wrap">
                      <div
                        className="ia-cross-score"
                        style={{ background: `${SCORE_COLOR(opp.score)}20`, color: SCORE_COLOR(opp.score), borderColor: `${SCORE_COLOR(opp.score)}40` }}
                      >
                        Score {opp.score}
                      </div>
                    </div>
                    <div className="ia-cross-item-opps">
                      {opp.opportunites.slice(0, 3).map((op, i) => (
                        <span
                          key={i}
                          className="ia-cross-opp-badge"
                          style={{
                            background: PRIORITY_COLORS[op.priorite].bg,
                            color: PRIORITY_COLORS[op.priorite].text,
                            borderColor: PRIORITY_COLORS[op.priorite].border,
                          }}
                        >
                          {op.produit}
                        </span>
                      ))}
                      {opp.opportunites.length > 3 && (
                        <span className="ia-cross-opp-more">+{opp.opportunites.length - 3}</span>
                      )}
                    </div>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      style={{ transform: selectedOpportunity?.client_id === opp.client_id ? "rotate(180deg)" : "none", transition: "transform .2s" }}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>

                {selectedOpportunity?.client_id === opp.client_id && (
                  <div className="ia-cross-item-detail">
                    <div className="ia-cross-detail-contrats">
                      <div className="ia-cross-detail-label">Contrats actifs :</div>
                      <div className="ia-cross-detail-tags">
                        {opp.contrats_actifs.map((c) => (
                          <span key={c} className="ia-cross-contrat-tag">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className="ia-cross-detail-opps">
                      {opp.opportunites.map((op, i) => (
                        <div
                          key={i}
                          className="ia-cross-detail-opp"
                          style={{ borderLeftColor: PRIORITY_COLORS[op.priorite].text }}
                        >
                          <div className="ia-cross-detail-opp-header">
                            <span className="ia-cross-detail-opp-produit">{op.produit}</span>
                            <span
                              className="ia-cross-detail-opp-priorite"
                              style={{ background: PRIORITY_COLORS[op.priorite].bg, color: PRIORITY_COLORS[op.priorite].text }}
                            >
                              {op.priorite}
                            </span>
                            <span className="ia-cross-detail-opp-ca">{op.potentiel_ca}</span>
                          </div>
                          <p className="ia-cross-detail-opp-raison">{op.raison}</p>
                        </div>
                      ))}
                    </div>
                    <div className="ia-cross-detail-action">
                      <div className="ia-cross-detail-action-label">💡 Action recommandée :</div>
                      <p className="ia-cross-detail-action-text">{opp.action_recommandee}</p>
                      <div className="ia-cross-detail-btns">
                        <a href={`/admin/ia/redaction?client=${opp.client_name}`} className="ia-cross-detail-btn">
                          ✉️ Générer un email
                        </a>
                        <a href={`/admin/clients/${opp.client_id}`} className="ia-cross-detail-btn ia-cross-detail-btn--secondary">
                          👤 Voir la fiche
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
