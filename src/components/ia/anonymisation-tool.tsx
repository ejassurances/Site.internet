'use client';

import { useState, useRef, useCallback } from 'react';

interface EntiteDetectee {
  type: string;
  valeur: string;
  position: number;
  remplacePar: string;
}

interface AnonymisationResult {
  texteOriginal: string;
  texteAnonymise: string;
  entitesDetectees: EntiteDetectee[];
  statistiques: {
    totalDetections: number;
    parCategorie: Record<string, number>;
    scoreRGPD: number;
  };
}

const TYPE_LABELS: Record<string, string> = {
  nom: 'Noms & Prénoms',
  nss: 'N° Sécurité Sociale',
  telephone: 'Téléphones',
  email: 'Adresses Email',
  adresse: 'Adresses Postales',
  codePostal: 'Codes Postaux',
  dateNaissance: 'Dates de Naissance',
  iban: 'IBAN / RIB',
  numeroContrat: 'N° de Contrat',
  montant: 'Montants',
};

const TYPE_COLORS: Record<string, string> = {
  nom: '#ef4444',
  nss: '#dc2626',
  telephone: '#f97316',
  email: '#eab308',
  adresse: '#8b5cf6',
  codePostal: '#6366f1',
  dateNaissance: '#ec4899',
  iban: '#14b8a6',
  numeroContrat: '#3b82f6',
  montant: '#10b981',
};

const TYPES_DOCUMENTS = [
  'Offre de prêt',
  'Tableau d\'amortissement',
  'Attestation d\'assurance',
  'Relevé de compte',
  'Bulletin de salaire',
  'Avis d\'imposition',
  'Contrat d\'assurance',
  'Devis assurance',
  'Autre document',
];

export default function AnonymisationTool() {
  const [fichier, setFichier] = useState<File | null>(null);
  const [texteManuel, setTexteManuel] = useState('');
  const [typeDocument, setTypeDocument] = useState('');
  const [mode, setMode] = useState<'upload' | 'texte'>('upload');
  const [modeAnonymisation, setModeAnonymisation] = useState<'ia' | 'regex'>('ia');
  const [chargement, setChargement] = useState(false);
  const [resultat, setResultat] = useState<AnonymisationResult | null>(null);
  const [erreur, setErreur] = useState('');
  const [ongletActif, setOngletActif] = useState<'original' | 'anonymise' | 'rapport'>('anonymise');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFichier = useCallback((file: File) => {
    const typesAcceptes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!typesAcceptes.includes(file.type)) {
      setErreur('Format non supporté. Acceptés : PDF, PNG, JPG, WebP');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErreur('Fichier trop volumineux (max 10 Mo)');
      return;
    }
    setFichier(file);
    setErreur('');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFichier(file);
  }, [handleFichier]);

  const traiter = async () => {
    setChargement(true);
    setErreur('');
    setResultat(null);

    try {
      let body: Record<string, string>;

      if (mode === 'texte') {
        if (!texteManuel.trim()) {
          setErreur('Veuillez saisir du texte à anonymiser');
          setChargement(false);
          return;
        }
        body = { texteDirecte: texteManuel };
      } else {
        if (!fichier) {
          setErreur('Veuillez sélectionner un fichier');
          setChargement(false);
          return;
        }
        // Convertir en base64
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]); // Enlever le préfixe data:...;base64,
          };
          reader.onerror = reject;
          reader.readAsDataURL(fichier);
        });
        body = {
          contenuBase64: base64,
          typeFichier: fichier.type,
          mode: modeAnonymisation,
        };
      }

      const response = await fetch('/api/ia/anonymisation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de l\'anonymisation');
      }

      const data = await response.json();
      setResultat(data);
      setOngletActif('anonymise');
    } catch (err) {
      setErreur(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setChargement(false);
    }
  };

  const copierTexte = (texte: string) => {
    navigator.clipboard.writeText(texte);
  };

  const telechargerTexte = (texte: string, suffixe: string) => {
    const blob = new Blob([texte], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fichier?.name?.replace(/\.[^.]+$/, '') || 'document'}_${suffixe}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const scoreColor = (score: number) => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="anonymisation-tool">
      {/* En-tête */}
      <div className="anon-header">
        <div className="anon-header-icon">🛡️</div>
        <div>
          <h2 className="anon-title">Anonymisation RGPD des Documents</h2>
          <p className="anon-subtitle">
            Masquez automatiquement toutes les données personnelles avant l'analyse IA.
            Aucune donnée sensible ne quitte vos serveurs en clair.
          </p>
        </div>
      </div>

      {/* Sélecteur de mode */}
      <div className="anon-mode-tabs">
        <button
          className={`anon-mode-tab ${mode === 'upload' ? 'active' : ''}`}
          onClick={() => setMode('upload')}
        >
          📄 Importer un document
        </button>
        <button
          className={`anon-mode-tab ${mode === 'texte' ? 'active' : ''}`}
          onClick={() => setMode('texte')}
        >
          ✏️ Coller du texte
        </button>
      </div>

      <div className="anon-content">
        {/* Zone de configuration */}
        <div className="anon-config">
          {mode === 'upload' ? (
            <>
              {/* Zone de drop */}
              <div
                className={`anon-dropzone ${dragOver ? 'drag-over' : ''} ${fichier ? 'has-file' : ''}`}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => inputRef.current?.click()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.webp"
                  onChange={(e) => e.target.files?.[0] && handleFichier(e.target.files[0])}
                  style={{ display: 'none' }}
                />
                {fichier ? (
                  <div className="anon-file-info">
                    <span className="anon-file-icon">
                      {fichier.type.includes('pdf') ? '📄' : '🖼️'}
                    </span>
                    <div>
                      <div className="anon-file-name">{fichier.name}</div>
                      <div className="anon-file-size">
                        {(fichier.size / 1024).toFixed(0)} Ko
                      </div>
                    </div>
                    <button
                      className="anon-file-remove"
                      onClick={(e) => { e.stopPropagation(); setFichier(null); }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="anon-drop-icon">📂</div>
                    <div className="anon-drop-text">
                      Glissez votre document ici ou <span className="anon-drop-link">parcourir</span>
                    </div>
                    <div className="anon-drop-hint">PDF, PNG, JPG, WebP — max 10 Mo</div>
                  </>
                )}
              </div>

              {/* Type de document */}
              <div className="anon-field">
                <label className="anon-label">Type de document (optionnel)</label>
                <select
                  className="anon-select"
                  value={typeDocument}
                  onChange={(e) => setTypeDocument(e.target.value)}
                >
                  <option value="">Sélectionner...</option>
                  {TYPES_DOCUMENTS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <div className="anon-field">
              <label className="anon-label">Texte à anonymiser</label>
              <textarea
                className="anon-textarea"
                placeholder="Collez ici le texte extrait de votre document (offre de prêt, attestation, etc.)..."
                value={texteManuel}
                onChange={(e) => setTexteManuel(e.target.value)}
                rows={12}
              />
              <div className="anon-char-count">{texteManuel.length} caractères</div>
            </div>
          )}

          {/* Mode d'anonymisation */}
          <div className="anon-field">
            <label className="anon-label">Mode d'anonymisation</label>
            <div className="anon-radio-group">
              <label className={`anon-radio ${modeAnonymisation === 'ia' ? 'active' : ''}`}>
                <input
                  type="radio"
                  value="ia"
                  checked={modeAnonymisation === 'ia'}
                  onChange={() => setModeAnonymisation('ia')}
                />
                <div>
                  <div className="anon-radio-title">🤖 IA + Regex (recommandé)</div>
                  <div className="anon-radio-desc">Détection contextuelle intelligente — meilleure précision</div>
                </div>
              </label>
              <label className={`anon-radio ${modeAnonymisation === 'regex' ? 'active' : ''}`}>
                <input
                  type="radio"
                  value="regex"
                  checked={modeAnonymisation === 'regex'}
                  onChange={() => setModeAnonymisation('regex')}
                />
                <div>
                  <div className="anon-radio-title">⚡ Regex uniquement (rapide)</div>
                  <div className="anon-radio-desc">Patterns prédéfinis — plus rapide, sans IA</div>
                </div>
              </label>
            </div>
          </div>

          {erreur && (
            <div className="anon-error">
              ⚠️ {erreur}
            </div>
          )}

          <button
            className="anon-btn-process"
            onClick={traiter}
            disabled={chargement || (mode === 'upload' ? !fichier : !texteManuel.trim())}
          >
            {chargement ? (
              <>
                <span className="anon-spinner" />
                Anonymisation en cours...
              </>
            ) : (
              <>🛡️ Anonymiser le document</>
            )}
          </button>

          {/* Avertissement RGPD */}
          <div className="anon-rgpd-notice">
            <span>🔒</span>
            <span>
              Le document est traité sur nos serveurs sécurisés. Le texte anonymisé est le seul
              élément transmis à l'IA pour analyse. Aucune donnée personnelle n'est stockée.
            </span>
          </div>
        </div>

        {/* Zone de résultats */}
        {resultat && (
          <div className="anon-results">
            {/* Score RGPD */}
            <div className="anon-score-card">
              <div
                className="anon-score-circle"
                style={{ '--score-color': scoreColor(resultat.statistiques.scoreRGPD) } as React.CSSProperties}
              >
                <span className="anon-score-value">{resultat.statistiques.scoreRGPD}</span>
                <span className="anon-score-label">Score RGPD</span>
              </div>
              <div className="anon-score-stats">
                <div className="anon-stat">
                  <span className="anon-stat-value">{resultat.statistiques.totalDetections}</span>
                  <span className="anon-stat-label">Données détectées</span>
                </div>
                <div className="anon-stat">
                  <span className="anon-stat-value">{Object.keys(resultat.statistiques.parCategorie).length}</span>
                  <span className="anon-stat-label">Catégories</span>
                </div>
                <div className="anon-stat">
                  <span className="anon-stat-value" style={{ color: '#10b981' }}>✓</span>
                  <span className="anon-stat-label">Prêt pour l'IA</span>
                </div>
              </div>
            </div>

            {/* Catégories détectées */}
            {Object.keys(resultat.statistiques.parCategorie).length > 0 && (
              <div className="anon-categories">
                <div className="anon-categories-title">Données anonymisées</div>
                <div className="anon-categories-grid">
                  {Object.entries(resultat.statistiques.parCategorie).map(([type, count]) => (
                    <div key={type} className="anon-category-badge" style={{ borderColor: TYPE_COLORS[type] || '#6b7280' }}>
                      <span className="anon-category-dot" style={{ background: TYPE_COLORS[type] || '#6b7280' }} />
                      <span>{TYPE_LABELS[type] || type}</span>
                      <span className="anon-category-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Onglets texte */}
            <div className="anon-text-tabs">
              <button
                className={`anon-text-tab ${ongletActif === 'anonymise' ? 'active' : ''}`}
                onClick={() => setOngletActif('anonymise')}
              >
                🛡️ Texte anonymisé
              </button>
              <button
                className={`anon-text-tab ${ongletActif === 'original' ? 'active' : ''}`}
                onClick={() => setOngletActif('original')}
              >
                📄 Texte original
              </button>
              <button
                className={`anon-text-tab ${ongletActif === 'rapport' ? 'active' : ''}`}
                onClick={() => setOngletActif('rapport')}
              >
                📊 Rapport
              </button>
            </div>

            <div className="anon-text-content">
              {ongletActif === 'anonymise' && (
                <>
                  <div className="anon-text-actions">
                    <button className="anon-action-btn" onClick={() => copierTexte(resultat.texteAnonymise)}>
                      📋 Copier
                    </button>
                    <button className="anon-action-btn" onClick={() => telechargerTexte(resultat.texteAnonymise, 'anonymise')}>
                      ⬇️ Télécharger
                    </button>
                    <button className="anon-action-btn primary" onClick={() => {
                      // Envoyer vers le Copilot IA
                      localStorage.setItem('copilot_context', resultat.texteAnonymise);
                      window.location.href = '/admin/ia/copilot';
                    }}>
                      🤖 Analyser avec IaGO
                    </button>
                  </div>
                  <pre className="anon-text-pre anonymise">{resultat.texteAnonymise}</pre>
                </>
              )}

              {ongletActif === 'original' && (
                <>
                  <div className="anon-text-actions">
                    <button className="anon-action-btn" onClick={() => copierTexte(resultat.texteOriginal)}>
                      📋 Copier
                    </button>
                  </div>
                  <pre className="anon-text-pre original">{resultat.texteOriginal}</pre>
                </>
              )}

              {ongletActif === 'rapport' && (
                <div className="anon-rapport">
                  <div className="anon-rapport-title">Rapport d'anonymisation RGPD</div>
                  <div className="anon-rapport-date">
                    Généré le {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>

                  {resultat.entitesDetectees.length > 0 ? (
                    <table className="anon-rapport-table">
                      <thead>
                        <tr>
                          <th>Catégorie</th>
                          <th>Valeur détectée (tronquée)</th>
                          <th>Remplacée par</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultat.entitesDetectees.slice(0, 50).map((entite, i) => (
                          <tr key={i}>
                            <td>
                              <span
                                className="anon-rapport-badge"
                                style={{ background: TYPE_COLORS[entite.type] + '20', color: TYPE_COLORS[entite.type] }}
                              >
                                {TYPE_LABELS[entite.type] || entite.type}
                              </span>
                            </td>
                            <td className="anon-rapport-valeur">{entite.valeur}</td>
                            <td className="anon-rapport-remplacement">{entite.remplacePar}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="anon-rapport-empty">
                      ✅ Aucune donnée personnelle détectée par les patterns regex.
                      Le passage IA a pu détecter des entités supplémentaires.
                    </div>
                  )}

                  <button
                    className="anon-action-btn"
                    onClick={() => {
                      const rapport = `RAPPORT D'ANONYMISATION RGPD
Généré le : ${new Date().toLocaleString('fr-FR')}
Document : ${fichier?.name || 'Texte manuel'}
Score RGPD : ${resultat.statistiques.scoreRGPD}/100
Total détections : ${resultat.statistiques.totalDetections}

DÉTAIL PAR CATÉGORIE :
${Object.entries(resultat.statistiques.parCategorie).map(([k, v]) => `- ${TYPE_LABELS[k] || k} : ${v}`).join('\n')}

ENTITÉS DÉTECTÉES :
${resultat.entitesDetectees.map(e => `[${TYPE_LABELS[e.type] || e.type}] "${e.valeur}" → ${e.remplacePar}`).join('\n')}`;
                      telechargerTexte(rapport, 'rapport_rgpd');
                    }}
                  >
                    ⬇️ Télécharger le rapport
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
