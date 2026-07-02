'use client';

import { useState } from 'react';

// ─── Données de référence ──────────────────────────────────────────────────

const COMPAGNIES = [
  {
    id: 'generali',
    nom: 'Generali',
    logo: '🏛️',
    couleur: '#c8102e',
    gammes: ['Assurance emprunteur', 'Prévoyance', 'Épargne'],
  },
  {
    id: 'allianz',
    nom: 'Allianz',
    logo: '🔵',
    couleur: '#003781',
    gammes: ['Assurance emprunteur', 'Prévoyance', 'Retraite'],
  },
  {
    id: 'axa',
    nom: 'AXA',
    logo: '🔷',
    couleur: '#00008f',
    gammes: ['Assurance emprunteur', 'Prévoyance', 'Santé'],
  },
  {
    id: 'cardif',
    nom: 'BNP Cardif',
    logo: '🟢',
    couleur: '#00965e',
    gammes: ['Assurance emprunteur', 'Prévoyance'],
  },
  {
    id: 'cnp',
    nom: 'CNP Assurances',
    logo: '🟡',
    couleur: '#f5a623',
    gammes: ['Assurance emprunteur', 'Prévoyance', 'Retraite'],
  },
  {
    id: 'metlife',
    nom: 'MetLife',
    logo: '🔴',
    couleur: '#0066cc',
    gammes: ['Assurance emprunteur', 'Prévoyance'],
  },
  {
    id: 'swiss-life',
    nom: 'Swiss Life',
    logo: '⚪',
    couleur: '#e30613',
    gammes: ['Assurance emprunteur', 'Prévoyance', 'Retraite'],
  },
  {
    id: 'april',
    nom: 'APRIL',
    logo: '🟠',
    couleur: '#ff6600',
    gammes: ['Assurance emprunteur', 'Prévoyance', 'Santé'],
  },
];

const TYPOLOGIES = [
  {
    id: 'recueil-besoins',
    label: 'Recueil des besoins',
    icon: '📋',
    description: 'Formulaires de recueil des besoins client',
    sousTypes: [
      'Recueil besoins standard',
      'Recueil besoins coparentalité',
      'Recueil besoins familles LGBT+',
      'Recueil besoins familles recomposées',
      'Recueil besoins co-emprunteurs',
    ],
  },
  {
    id: 'grilles-tarifs',
    label: 'Grilles & Tarifs',
    icon: '💰',
    description: 'Grilles tarifaires et tableaux de garanties',
    sousTypes: [
      'Grille tarifaire standard',
      'Grille tarifaire senior',
      'Grille convention AERAS',
      'Tableau des garanties',
      'Tableau comparatif',
    ],
  },
  {
    id: 'conditions-generales',
    label: 'Conditions Générales',
    icon: '📜',
    description: 'CG, IPID et notices d\'information',
    sousTypes: [
      'Conditions Générales (CG)',
      'IPID (Document d\'information)',
      'Notice d\'information',
      'Fiche standardisée d\'information (FSI)',
    ],
  },
  {
    id: 'questionnaires-medicaux',
    label: 'Questionnaires Médicaux',
    icon: '🏥',
    description: 'Questionnaires de santé et protocoles médicaux',
    sousTypes: [
      'Questionnaire médical simplifié',
      'Questionnaire médical complet',
      'Protocole convention AERAS',
      'Formulaire droit à l\'oubli',
    ],
  },
  {
    id: 'outils-vente',
    label: 'Outils de Vente',
    icon: '🎯',
    description: 'Argumentaires, scripts et supports de présentation',
    sousTypes: [
      'Argumentaire de vente',
      'Script d\'appel',
      'Présentation produit',
      'Fiche réponses objections',
      'Comparatif concurrentiel',
    ],
  },
  {
    id: 'conformite',
    label: 'Conformité & DDA',
    icon: '⚖️',
    description: 'Documents réglementaires et conformité DDA',
    sousTypes: [
      'Lettre de mission',
      'Mandat de recherche',
      'Document d\'entrée en relation',
      'Attestation DDA',
      'Fiche de traçabilité',
    ],
  },
];

interface Document {
  id: string;
  nom: string;
  compagnieId: string;
  typologieId: string;
  sousType: string;
  description?: string;
  url?: string;
  dateAjout: string;
  taille?: string;
  version?: string;
  tags?: string[];
}

// Documents de démonstration
const DOCUMENTS_DEMO: Document[] = [
  {
    id: '1',
    nom: 'Recueil besoins AE - Coparentalité v3.2',
    compagnieId: 'generali',
    typologieId: 'recueil-besoins',
    sousType: 'Recueil besoins coparentalité',
    description: 'Formulaire adapté aux situations de coparentalité avec champs spécifiques',
    dateAjout: '2025-06-01',
    taille: '245 Ko',
    version: 'v3.2',
    tags: ['coparentalité', 'assurance emprunteur'],
  },
  {
    id: '2',
    nom: 'Grille tarifaire Generali 2025 - Standard',
    compagnieId: 'generali',
    typologieId: 'grilles-tarifs',
    sousType: 'Grille tarifaire standard',
    description: 'Grille tarifaire assurance emprunteur 2025 - Tous profils',
    dateAjout: '2025-01-15',
    taille: '1.2 Mo',
    version: '2025',
    tags: ['tarif', '2025'],
  },
  {
    id: '3',
    nom: 'IPID Allianz - Assurance Emprunteur',
    compagnieId: 'allianz',
    typologieId: 'conditions-generales',
    sousType: 'IPID (Document d\'information)',
    description: 'Document d\'information produit Allianz AE - Version 2024',
    dateAjout: '2024-11-20',
    taille: '890 Ko',
    version: '2024',
    tags: ['IPID', 'réglementaire'],
  },
  {
    id: '4',
    nom: 'Questionnaire médical simplifié AXA',
    compagnieId: 'axa',
    typologieId: 'questionnaires-medicaux',
    sousType: 'Questionnaire médical simplifié',
    description: 'QM simplifié pour capitaux < 500K€ et âge < 50 ans',
    dateAjout: '2025-03-10',
    taille: '320 Ko',
    version: 'v2',
    tags: ['médical', 'simplifié'],
  },
  {
    id: '5',
    nom: 'Script appel relance - Familles LGBT+',
    compagnieId: 'cardif',
    typologieId: 'outils-vente',
    sousType: 'Script d\'appel',
    description: 'Script adapté pour les familles homoparentales et couples LGBT+',
    dateAjout: '2025-04-22',
    taille: '180 Ko',
    version: 'v1',
    tags: ['LGBT+', 'script', 'vente'],
  },
];

export default function CentreDocumentaire() {
  const [vueMode, setVueMode] = useState<'compagnie' | 'typologie'>('compagnie');
  const [compagnieSelectionnee, setCompagnieSelectionnee] = useState<string | null>(null);
  const [typologieSelectionnee, setTypologieSelectionnee] = useState<string | null>(null);
  const [recherche, setRecherche] = useState('');
  const [documents] = useState<Document[]>(DOCUMENTS_DEMO);
  const [modalOuvert, setModalOuvert] = useState(false);
  const [docSelectionne, setDocSelectionne] = useState<Document | null>(null);

  // Filtrage des documents
  const documentsFiltres = documents.filter(doc => {
    const matchRecherche = !recherche ||
      doc.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      doc.description?.toLowerCase().includes(recherche.toLowerCase()) ||
      doc.tags?.some(t => t.toLowerCase().includes(recherche.toLowerCase()));

    const matchCompagnie = !compagnieSelectionnee || doc.compagnieId === compagnieSelectionnee;
    const matchTypologie = !typologieSelectionnee || doc.typologieId === typologieSelectionnee;

    return matchRecherche && matchCompagnie && matchTypologie;
  });

  const getCompagnie = (id: string) => COMPAGNIES.find(c => c.id === id);
  const getTypologie = (id: string) => TYPOLOGIES.find(t => t.id === id);

  const ouvrirModal = (doc: Document) => {
    setDocSelectionne(doc);
    setModalOuvert(true);
  };

  return (
    <div className="centre-doc">
      {/* En-tête */}
      <div className="centre-doc-header">
        <div>
          <h1 className="centre-doc-title">Centre Documentaire</h1>
          <p className="centre-doc-subtitle">
            Recueil des besoins, grilles tarifaires et outils de vente — organisés par compagnie et par typologie
          </p>
        </div>
        <button className="centre-doc-btn-add">
          + Ajouter un document
        </button>
      </div>

      {/* Stats rapides */}
      <div className="centre-doc-stats">
        <div className="centre-doc-stat">
          <span className="centre-doc-stat-value">{documents.length}</span>
          <span className="centre-doc-stat-label">Documents</span>
        </div>
        <div className="centre-doc-stat">
          <span className="centre-doc-stat-value">{COMPAGNIES.length}</span>
          <span className="centre-doc-stat-label">Compagnies</span>
        </div>
        <div className="centre-doc-stat">
          <span className="centre-doc-stat-value">{TYPOLOGIES.length}</span>
          <span className="centre-doc-stat-label">Typologies</span>
        </div>
        <div className="centre-doc-stat">
          <span className="centre-doc-stat-value">
            {new Date(Math.max(...documents.map(d => new Date(d.dateAjout).getTime()))).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
          </span>
          <span className="centre-doc-stat-label">Dernière MAJ</span>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="centre-doc-toolbar">
        <div className="centre-doc-search">
          <span className="centre-doc-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher un document, une compagnie, un tag..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="centre-doc-search-input"
          />
          {recherche && (
            <button className="centre-doc-search-clear" onClick={() => setRecherche('')}>✕</button>
          )}
        </div>
        <div className="centre-doc-view-toggle">
          <button
            className={`centre-doc-view-btn ${vueMode === 'compagnie' ? 'active' : ''}`}
            onClick={() => setVueMode('compagnie')}
          >
            🏛️ Par compagnie
          </button>
          <button
            className={`centre-doc-view-btn ${vueMode === 'typologie' ? 'active' : ''}`}
            onClick={() => setVueMode('typologie')}
          >
            📂 Par typologie
          </button>
        </div>
      </div>

      <div className="centre-doc-layout">
        {/* Panneau gauche — Navigation */}
        <div className="centre-doc-nav">
          {vueMode === 'compagnie' ? (
            <>
              <div className="centre-doc-nav-title">Compagnies</div>
              <button
                className={`centre-doc-nav-item ${!compagnieSelectionnee ? 'active' : ''}`}
                onClick={() => setCompagnieSelectionnee(null)}
              >
                <span>🗂️</span>
                <span>Toutes les compagnies</span>
                <span className="centre-doc-nav-count">{documents.length}</span>
              </button>
              {COMPAGNIES.map(c => {
                const count = documents.filter(d => d.compagnieId === c.id).length;
                return (
                  <button
                    key={c.id}
                    className={`centre-doc-nav-item ${compagnieSelectionnee === c.id ? 'active' : ''}`}
                    onClick={() => setCompagnieSelectionnee(c.id)}
                    style={{ '--nav-color': c.couleur } as React.CSSProperties}
                  >
                    <span>{c.logo}</span>
                    <span>{c.nom}</span>
                    <span className="centre-doc-nav-count">{count}</span>
                  </button>
                );
              })}
            </>
          ) : (
            <>
              <div className="centre-doc-nav-title">Typologies</div>
              <button
                className={`centre-doc-nav-item ${!typologieSelectionnee ? 'active' : ''}`}
                onClick={() => setTypologieSelectionnee(null)}
              >
                <span>🗂️</span>
                <span>Toutes les typologies</span>
                <span className="centre-doc-nav-count">{documents.length}</span>
              </button>
              {TYPOLOGIES.map(t => {
                const count = documents.filter(d => d.typologieId === t.id).length;
                return (
                  <button
                    key={t.id}
                    className={`centre-doc-nav-item ${typologieSelectionnee === t.id ? 'active' : ''}`}
                    onClick={() => setTypologieSelectionnee(t.id)}
                  >
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                    <span className="centre-doc-nav-count">{count}</span>
                  </button>
                );
              })}
            </>
          )}
        </div>

        {/* Panneau droit — Documents */}
        <div className="centre-doc-main">
          {/* Fil d'Ariane */}
          <div className="centre-doc-breadcrumb">
            <span>Centre documentaire</span>
            {compagnieSelectionnee && (
              <>
                <span className="centre-doc-breadcrumb-sep">›</span>
                <span>{getCompagnie(compagnieSelectionnee)?.nom}</span>
              </>
            )}
            {typologieSelectionnee && (
              <>
                <span className="centre-doc-breadcrumb-sep">›</span>
                <span>{getTypologie(typologieSelectionnee)?.label}</span>
              </>
            )}
            <span className="centre-doc-breadcrumb-count">
              {documentsFiltres.length} document{documentsFiltres.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Vue par compagnie — Grille de sous-typologies */}
          {vueMode === 'compagnie' && compagnieSelectionnee && (
            <div className="centre-doc-typologies-grid">
              {TYPOLOGIES.map(t => {
                const docsTypo = documentsFiltres.filter(d => d.typologieId === t.id);
                return (
                  <div key={t.id} className="centre-doc-typo-section">
                    <div className="centre-doc-typo-header">
                      <span className="centre-doc-typo-icon">{t.icon}</span>
                      <span className="centre-doc-typo-label">{t.label}</span>
                      <span className="centre-doc-typo-count">{docsTypo.length}</span>
                    </div>
                    {docsTypo.length > 0 ? (
                      <div className="centre-doc-typo-docs">
                        {docsTypo.map(doc => (
                          <DocumentCard key={doc.id} doc={doc} onOuvrir={ouvrirModal} />
                        ))}
                      </div>
                    ) : (
                      <div className="centre-doc-typo-empty">
                        <span>Aucun document</span>
                        <button className="centre-doc-add-small">+ Ajouter</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Vue par typologie — Grille de compagnies */}
          {vueMode === 'typologie' && typologieSelectionnee && (
            <div className="centre-doc-typologies-grid">
              {COMPAGNIES.map(c => {
                const docsComp = documentsFiltres.filter(d => d.compagnieId === c.id);
                return (
                  <div key={c.id} className="centre-doc-typo-section">
                    <div className="centre-doc-typo-header" style={{ borderLeftColor: c.couleur }}>
                      <span className="centre-doc-typo-icon">{c.logo}</span>
                      <span className="centre-doc-typo-label">{c.nom}</span>
                      <span className="centre-doc-typo-count">{docsComp.length}</span>
                    </div>
                    {docsComp.length > 0 ? (
                      <div className="centre-doc-typo-docs">
                        {docsComp.map(doc => (
                          <DocumentCard key={doc.id} doc={doc} onOuvrir={ouvrirModal} />
                        ))}
                      </div>
                    ) : (
                      <div className="centre-doc-typo-empty">
                        <span>Aucun document</span>
                        <button className="centre-doc-add-small">+ Ajouter</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Vue globale — Liste de tous les documents */}
          {(!compagnieSelectionnee && !typologieSelectionnee) || (vueMode === 'compagnie' && !compagnieSelectionnee) || (vueMode === 'typologie' && !typologieSelectionnee) ? (
            <div className="centre-doc-all">
              {documentsFiltres.length === 0 ? (
                <div className="centre-doc-empty">
                  <div className="centre-doc-empty-icon">📂</div>
                  <div className="centre-doc-empty-title">Aucun document trouvé</div>
                  <div className="centre-doc-empty-text">
                    {recherche ? `Aucun résultat pour "${recherche}"` : 'Ajoutez votre premier document'}
                  </div>
                  <button className="centre-doc-btn-add">+ Ajouter un document</button>
                </div>
              ) : (
                <div className="centre-doc-list">
                  {documentsFiltres.map(doc => (
                    <DocumentRow
                      key={doc.id}
                      doc={doc}
                      compagnie={getCompagnie(doc.compagnieId)}
                      typologie={getTypologie(doc.typologieId)}
                      onOuvrir={ouvrirModal}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Modal de détail document */}
      {modalOuvert && docSelectionne && (
        <div className="centre-doc-modal-overlay" onClick={() => setModalOuvert(false)}>
          <div className="centre-doc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="centre-doc-modal-header">
              <div>
                <div className="centre-doc-modal-title">{docSelectionne.nom}</div>
                <div className="centre-doc-modal-meta">
                  {getCompagnie(docSelectionne.compagnieId)?.nom} •{' '}
                  {getTypologie(docSelectionne.typologieId)?.label} •{' '}
                  {docSelectionne.sousType}
                </div>
              </div>
              <button className="centre-doc-modal-close" onClick={() => setModalOuvert(false)}>✕</button>
            </div>
            <div className="centre-doc-modal-body">
              {docSelectionne.description && (
                <p className="centre-doc-modal-desc">{docSelectionne.description}</p>
              )}
              <div className="centre-doc-modal-infos">
                <div className="centre-doc-modal-info">
                  <span className="centre-doc-modal-info-label">Version</span>
                  <span>{docSelectionne.version || 'N/A'}</span>
                </div>
                <div className="centre-doc-modal-info">
                  <span className="centre-doc-modal-info-label">Taille</span>
                  <span>{docSelectionne.taille || 'N/A'}</span>
                </div>
                <div className="centre-doc-modal-info">
                  <span className="centre-doc-modal-info-label">Ajouté le</span>
                  <span>{new Date(docSelectionne.dateAjout).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              {docSelectionne.tags && docSelectionne.tags.length > 0 && (
                <div className="centre-doc-modal-tags">
                  {docSelectionne.tags.map(tag => (
                    <span key={tag} className="centre-doc-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="centre-doc-modal-actions">
              <button className="centre-doc-modal-btn primary">⬇️ Télécharger</button>
              <button className="centre-doc-modal-btn">👁️ Aperçu</button>
              <button className="centre-doc-modal-btn" onClick={() => {
                setModalOuvert(false);
                window.location.href = '/admin/ia/anonymisation';
              }}>
                🛡️ Anonymiser & Analyser
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sous-composants ───────────────────────────────────────────────────────

function DocumentCard({ doc, onOuvrir }: { doc: Document; onOuvrir: (doc: Document) => void }) {
  return (
    <div className="centre-doc-card" onClick={() => onOuvrir(doc)}>
      <div className="centre-doc-card-icon">
        {doc.nom.toLowerCase().includes('pdf') || doc.taille ? '📄' : '📋'}
      </div>
      <div className="centre-doc-card-content">
        <div className="centre-doc-card-name">{doc.nom}</div>
        <div className="centre-doc-card-meta">
          {doc.version && <span className="centre-doc-card-version">{doc.version}</span>}
          {doc.taille && <span>{doc.taille}</span>}
        </div>
      </div>
    </div>
  );
}

function DocumentRow({
  doc,
  compagnie,
  typologie,
  onOuvrir,
}: {
  doc: Document;
  compagnie: typeof COMPAGNIES[0] | undefined;
  typologie: typeof TYPOLOGIES[0] | undefined;
  onOuvrir: (doc: Document) => void;
}) {
  return (
    <div className="centre-doc-row" onClick={() => onOuvrir(doc)}>
      <div className="centre-doc-row-icon">📄</div>
      <div className="centre-doc-row-main">
        <div className="centre-doc-row-name">{doc.nom}</div>
        <div className="centre-doc-row-meta">
          {compagnie && <span className="centre-doc-row-compagnie">{compagnie.logo} {compagnie.nom}</span>}
          {typologie && <span className="centre-doc-row-typo">{typologie.icon} {typologie.label}</span>}
          <span>{doc.sousType}</span>
        </div>
      </div>
      <div className="centre-doc-row-right">
        {doc.version && <span className="centre-doc-card-version">{doc.version}</span>}
        <span className="centre-doc-row-date">
          {new Date(doc.dateAjout).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
        <span className="centre-doc-row-arrow">›</span>
      </div>
    </div>
  );
}
