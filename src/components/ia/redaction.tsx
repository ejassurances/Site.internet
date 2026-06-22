"use client";

import { useState } from "react";

type DocumentType = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  fields: Field[];
};

type Field = {
  id: string;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
  required?: boolean;
};

const DOCUMENT_TYPES: DocumentType[] = [
  {
    id: "email_commercial",
    label: "Email commercial",
    emoji: "📧",
    description: "Email de prospection ou de présentation d'une solution",
    fields: [
      { id: "nom_client", label: "Nom du prospect", type: "text", placeholder: "Marie Dupont", required: true },
      { id: "situation", label: "Situation familiale", type: "select", options: ["Couple marié", "Coparentalité", "Famille recomposée", "Famille homoparentale", "Célibataire"], required: true },
      { id: "produit", label: "Produit à présenter", type: "select", options: ["Assurance emprunteur", "Prévoyance", "Transmission / Succession", "Mutuelle", "Assurance vie"], required: true },
      { id: "contexte", label: "Contexte / Accroche", type: "textarea", placeholder: "Ex: Projet immobilier en cours, refus bancaire..." },
      { id: "ton", label: "Ton souhaité", type: "select", options: ["Professionnel et chaleureux", "Formel", "Décontracté", "Urgent"] },
    ],
  },
  {
    id: "reponse_objection",
    label: "Réponse à une objection",
    emoji: "🛡️",
    description: "Réponse professionnelle à une objection client",
    fields: [
      { id: "objection", label: "Objection du client", type: "textarea", placeholder: "Ex: C'est trop cher, je vais réfléchir...", required: true },
      { id: "produit", label: "Produit concerné", type: "select", options: ["Assurance emprunteur", "Prévoyance", "Transmission", "Mutuelle", "Assurance vie"] },
      { id: "format", label: "Format de réponse", type: "select", options: ["Email", "Script téléphonique", "Message court (SMS/WhatsApp)"] },
    ],
  },
  {
    id: "courrier_resiliation",
    label: "Courrier de résiliation",
    emoji: "📄",
    description: "Courrier de résiliation conforme à la loi Châtel / Hamon",
    fields: [
      { id: "nom_assure", label: "Nom de l'assuré", type: "text", placeholder: "Jean Martin", required: true },
      { id: "assureur", label: "Assureur actuel", type: "text", placeholder: "AXA, Generali...", required: true },
      { id: "numero_contrat", label: "Numéro de contrat", type: "text", placeholder: "123456789" },
      { id: "motif", label: "Motif de résiliation", type: "select", options: ["Loi Châtel (à échéance)", "Loi Hamon (après 1 an)", "Changement de situation", "Résiliation infra-annuelle (emprunteur)"] },
      { id: "date_effet", label: "Date d'effet souhaitée", type: "text", placeholder: "01/09/2025" },
    ],
  },
  {
    id: "email_relance",
    label: "Email de relance",
    emoji: "🔔",
    description: "Relance d'un prospect ou d'un client inactif",
    fields: [
      { id: "nom_client", label: "Nom du client", type: "text", placeholder: "Sophie Bernard", required: true },
      { id: "derniere_interaction", label: "Dernière interaction", type: "select", options: ["Il y a 1 mois", "Il y a 3 mois", "Il y a 6 mois", "Il y a plus d'un an"] },
      { id: "raison_relance", label: "Raison de la relance", type: "select", options: ["Devis non signé", "Renouvellement à venir", "Nouvelle offre", "Suivi post-sinistre", "Anniversaire contrat"] },
      { id: "ton", label: "Ton", type: "select", options: ["Chaleureux", "Professionnel", "Urgent"] },
    ],
  },
  {
    id: "note_appel",
    label: "Note de compte-rendu d'appel",
    emoji: "📝",
    description: "Résumé structuré d'un appel ou d'un rendez-vous",
    fields: [
      { id: "nom_client", label: "Nom du client", type: "text", placeholder: "Paul Leroy", required: true },
      { id: "date_appel", label: "Date de l'appel", type: "text", placeholder: "22/06/2025" },
      { id: "points_abordes", label: "Points abordés (brouillon)", type: "textarea", placeholder: "Projet immobilier, 2 enfants, divorce en cours, cherche prévoyance...", required: true },
      { id: "suite_a_donner", label: "Suite à donner", type: "textarea", placeholder: "Envoyer devis prévoyance, relancer dans 2 semaines..." },
    ],
  },
];

export function RedactionModule() {
  const [selectedType, setSelectedType] = useState<DocumentType>(DOCUMENT_TYPES[0]);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleTypeChange = (type: DocumentType) => {
    setSelectedType(type);
    setFormValues({});
    setResult("");
    setError("");
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setResult("");
    setError("");
    try {
      const res = await fetch("/api/ia/redaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: selectedType.id, fields: formValues }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setResult(data.content);
    } catch {
      setError("Erreur lors de la génération. Vérifiez la configuration OpenAI.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = selectedType.fields
    .filter((f) => f.required)
    .every((f) => formValues[f.id]?.trim());

  return (
    <div className="ia-redaction-layout">
      {/* Type selector */}
      <div className="ia-redaction-types">
        {DOCUMENT_TYPES.map((type) => (
          <button
            key={type.id}
            className={`ia-redaction-type-btn${selectedType.id === type.id ? " active" : ""}`}
            onClick={() => handleTypeChange(type)}
          >
            <span className="ia-redaction-type-emoji">{type.emoji}</span>
            <div>
              <div className="ia-redaction-type-label">{type.label}</div>
              <div className="ia-redaction-type-desc">{type.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Form + result */}
      <div className="ia-redaction-main">
        <div className="ia-redaction-form-panel">
          <div className="ia-redaction-form-title">
            {selectedType.emoji} {selectedType.label}
          </div>
          <div className="ia-redaction-fields">
            {selectedType.fields.map((field) => (
              <div key={field.id} className="ia-redaction-field">
                <label className="ia-redaction-label">
                  {field.label}
                  {field.required && <span className="ia-redaction-required">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    className="ia-redaction-textarea"
                    placeholder={field.placeholder}
                    value={formValues[field.id] || ""}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
                    rows={3}
                  />
                ) : field.type === "select" ? (
                  <select
                    className="ia-redaction-select"
                    value={formValues[field.id] || ""}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
                  >
                    <option value="">Choisir...</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="ia-redaction-input"
                    type="text"
                    placeholder={field.placeholder}
                    value={formValues[field.id] || ""}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
                  />
                )}
              </div>
            ))}
          </div>
          <button
            className={`ia-redaction-generate-btn${isLoading ? " loading" : ""}${!isFormValid ? " disabled" : ""}`}
            onClick={handleGenerate}
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ia-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                Rédaction en cours...
              </>
            ) : (
              <>✍️ Générer avec IaGO</>
            )}
          </button>
        </div>

        <div className="ia-redaction-result-panel">
          {!result && !isLoading && !error && (
            <div className="ia-redaction-placeholder">
              <div className="ia-redaction-placeholder-icon">✍️</div>
              <div className="ia-redaction-placeholder-title">Remplissez le formulaire</div>
              <p>IaGO rédigera votre document avec le ton juste et les informations contextuelles du CRM.</p>
            </div>
          )}
          {isLoading && (
            <div className="ia-redaction-loading">
              <div className="ia-redaction-loading-icon">🤖</div>
              <div>IaGO rédige votre document...</div>
              <div className="ia-chat-typing"><span /><span /><span /></div>
            </div>
          )}
          {error && (
            <div className="ia-resume-error">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}
          {result && (
            <div className="ia-redaction-result">
              <div className="ia-redaction-result-header">
                <span className="ia-redaction-result-title">Document généré</span>
                <div className="ia-redaction-result-actions">
                  <button className="ia-redaction-copy-btn" onClick={handleCopy}>
                    {copied ? "✅ Copié !" : "📋 Copier"}
                  </button>
                  <button className="ia-redaction-regen-btn" onClick={handleGenerate}>
                    🔄 Régénérer
                  </button>
                </div>
              </div>
              <div className="ia-redaction-result-content">
                {result.split("\n").map((line, i) => (
                  <p key={i} className={line === "" ? "ia-redaction-spacer" : "ia-redaction-line"}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
