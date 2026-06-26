"use client";

import { useState } from "react";

type Client = { id: string; first_name: string; last_name: string; email: string };
type ResumeResult = {
  client_name: string;
  points: { titre: string; contenu: string; priorite: "haute" | "normale" | "info" }[];
  recommandations: string[];
  ton_suggere: string;
  duree_estimee: string;
};

export function ResumeClientModule({ clients }: { clients: Client[] }) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [error, setError] = useState("");

  const filtered = clients.filter((c) =>
    `${c.first_name} ${c.last_name} ${c.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const generateResume = async () => {
    if (!selectedClient) return;
    setIsLoading(true);
    setResult(null);
    setError("");
    try {
      const res = await fetch("/api/ia/resume-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: selectedClient.id }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setResult(data);
    } catch {
      setError("Erreur lors de la génération. Vérifiez la configuration OpenAI.");
    } finally {
      setIsLoading(false);
    }
  };

  const priorityColors: Record<string, string> = {
    haute: "#dc2626",
    normale: "#1e3a5f",
    info: "#059669",
  };
  const priorityBg: Record<string, string> = {
    haute: "#fee2e2",
    normale: "#eef1f7",
    info: "#d1fae5",
  };

  return (
    <div className="ia-resume-layout">
      {/* Panel gauche — sélection client */}
      <div className="ia-resume-panel-left">
        <div className="ia-resume-panel-title">Sélectionner un client</div>
        <input
          className="ia-resume-search"
          placeholder="Rechercher un client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="ia-resume-client-list">
          {filtered.length === 0 ? (
            <div className="ia-resume-empty">Aucun client trouvé</div>
          ) : (
            filtered.slice(0, 20).map((c) => (
              <button
                key={c.id}
                className={`ia-resume-client-item${selectedClient?.id === c.id ? " active" : ""}`}
                onClick={() => { setSelectedClient(c); setResult(null); }}
              >
                <div className="ia-resume-client-avatar">
                  {c.first_name.charAt(0)}{c.last_name.charAt(0)}
                </div>
                <div className="ia-resume-client-info">
                  <div className="ia-resume-client-name">{c.first_name} {c.last_name}</div>
                  <div className="ia-resume-client-email">{c.email}</div>
                </div>
                {selectedClient?.id === c.id && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                )}
              </button>
            ))
          )}
        </div>

        {selectedClient && (
          <button
            className={`ia-resume-generate-btn${isLoading ? " loading" : ""}`}
            onClick={generateResume}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ia-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                Analyse en cours...
              </>
            ) : (
              <>
                <span>📋</span>
                Générer la synthèse
              </>
            )}
          </button>
        )}
      </div>

      {/* Panel droit — résultat */}
      <div className="ia-resume-panel-right">
        {!selectedClient && !result && (
          <div className="ia-resume-placeholder">
            <div className="ia-resume-placeholder-icon">📋</div>
            <div className="ia-resume-placeholder-title">Préparez votre prochain rendez-vous</div>
            <p className="ia-resume-placeholder-desc">
              Sélectionnez un client à gauche et IaGO synthétisera tout son historique
              en 5 points clés pour vous mettre en condition avant l&apos;appel.
            </p>
            <div className="ia-resume-placeholder-features">
              {["Historique des interactions", "Contrats actifs & manquants", "Situation familiale", "Points d'attention", "Recommandations"].map((f) => (
                <div key={f} className="ia-resume-placeholder-feature">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {f}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedClient && !result && !isLoading && !error && (
          <div className="ia-resume-ready">
            <div className="ia-resume-ready-avatar">
              {selectedClient.first_name.charAt(0)}{selectedClient.last_name.charAt(0)}
            </div>
            <div className="ia-resume-ready-name">{selectedClient.first_name} {selectedClient.last_name}</div>
            <p className="ia-resume-ready-desc">Cliquez sur &quot;Générer la synthèse&quot; pour préparer votre entretien.</p>
          </div>
        )}

        {isLoading && (
          <div className="ia-resume-loading">
            <div className="ia-resume-loading-icon">🤖</div>
            <div className="ia-resume-loading-title">IaGO analyse le dossier...</div>
            <div className="ia-resume-loading-steps">
              {["Lecture des interactions", "Analyse des contrats", "Évaluation de la situation familiale", "Rédaction de la synthèse"].map((step, i) => (
                <div key={step} className="ia-resume-loading-step" style={{ animationDelay: `${i * 0.3}s` }}>
                  <div className="ia-resume-loading-step-dot" />
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
          <div className="ia-resume-result">
            <div className="ia-resume-result-header">
              <div className="ia-resume-result-title">
                Synthèse — {result.client_name}
              </div>
              <div className="ia-resume-result-meta">
                <span className="ia-resume-meta-badge">⏱ {result.duree_estimee}</span>
                <span className="ia-resume-meta-badge ia-resume-meta-badge--tone">🎯 Ton : {result.ton_suggere}</span>
              </div>
            </div>

            <div className="ia-resume-points">
              {result.points.map((point, i) => (
                <div key={i} className="ia-resume-point" style={{ borderLeftColor: priorityColors[point.priorite] }}>
                  <div className="ia-resume-point-header">
                    <span className="ia-resume-point-num" style={{ background: priorityBg[point.priorite], color: priorityColors[point.priorite] }}>
                      {i + 1}
                    </span>
                    <span className="ia-resume-point-title">{point.titre}</span>
                    <span className="ia-resume-point-priority" style={{ background: priorityBg[point.priorite], color: priorityColors[point.priorite] }}>
                      {point.priorite}
                    </span>
                  </div>
                  <p className="ia-resume-point-content">{point.contenu}</p>
                </div>
              ))}
            </div>

            {result.recommandations.length > 0 && (
              <div className="ia-resume-recommandations">
                <div className="ia-resume-reco-title">💡 Recommandations IaGO</div>
                <ul className="ia-resume-reco-list">
                  {result.recommandations.map((r, i) => (
                    <li key={i} className="ia-resume-reco-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="ia-resume-result-actions">
              <button className="ia-resume-action-btn" onClick={() => { setResult(null); setSelectedClient(null); }}>
                Nouvelle synthèse
              </button>
              <button className="ia-resume-action-btn ia-resume-action-btn--secondary" onClick={() => window.print()}>
                🖨️ Imprimer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
