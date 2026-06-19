"use client";

import { useState, useTransition } from "react";
import { createInteraction } from "@/lib/actions/interactions";
import { Phone, Mail, Calendar, Video, FileText, MessageSquare, Loader2, Plus, X } from "lucide-react";

const TYPES = [
  { value: "appel", label: "Appel téléphonique", icon: Phone },
  { value: "email", label: "Email", icon: Mail },
  { value: "rdv", label: "Rendez-vous", icon: Calendar },
  { value: "visio", label: "Visioconférence", icon: Video },
  { value: "note", label: "Note interne", icon: FileText },
  { value: "sms", label: "SMS", icon: MessageSquare },
] as const;

type Props = {
  clientId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function InteractionForm({ clientId, onSuccess, onCancel }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<typeof TYPES[number]["value"]>("note");
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [duree, setDuree] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!titre.trim()) { setError("Le titre est obligatoire."); return; }

    startTransition(async () => {
      const result = await createInteraction({
        client_id: clientId,
        type,
        titre: titre.trim(),
        contenu: contenu.trim() || undefined,
        duree_minutes: duree ? parseInt(duree) : undefined,
      });

      if (!result.success) {
        setError(result.error ?? "Une erreur est survenue.");
        return;
      }
      onSuccess?.();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="interaction-form">
      {error && (
        <div className="form-error-banner">
          <X size={14} aria-hidden /> {error}
        </div>
      )}

      {/* Type d'interaction */}
      <div className="interaction-type-grid">
        {TYPES.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            className={`interaction-type-btn${type === value ? " active" : ""}`}
            onClick={() => setType(value)}
          >
            <Icon size={16} aria-hidden />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Titre */}
      <div className="form-field">
        <label htmlFor="interaction-titre">Titre <span className="required">*</span></label>
        <input
          id="interaction-titre"
          type="text"
          required
          placeholder={
            type === "appel" ? "Appel de suivi — recueil de besoins" :
            type === "email" ? "Envoi de la proposition d'assurance emprunteur" :
            type === "rdv" ? "RDV bilan protection familiale" :
            type === "visio" ? "Visio de présentation des garanties" :
            type === "sms" ? "SMS de confirmation RDV" :
            "Note sur le dossier client"
          }
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
      </div>

      {/* Durée (pour appels et RDV) */}
      {(type === "appel" || type === "rdv" || type === "visio") && (
        <div className="form-field">
          <label htmlFor="interaction-duree">Durée (minutes)</label>
          <input
            id="interaction-duree"
            type="number"
            min="1"
            max="480"
            placeholder="30"
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
          />
        </div>
      )}

      {/* Contenu */}
      <div className="form-field">
        <label htmlFor="interaction-contenu">Détails / Notes</label>
        <textarea
          id="interaction-contenu"
          rows={4}
          placeholder="Résumé de l'échange, points importants, actions à suivre…"
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
        />
      </div>

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="secondary-action" onClick={onCancel} disabled={isPending}>
            Annuler
          </button>
        )}
        <button type="submit" className="primary-action" disabled={isPending}>
          {isPending ? (
            <><Loader2 size={16} className="spin" aria-hidden /> Enregistrement…</>
          ) : (
            <><Plus size={16} aria-hidden /> Ajouter l'interaction</>
          )}
        </button>
      </div>
    </form>
  );
}
