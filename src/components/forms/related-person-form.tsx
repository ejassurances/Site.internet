"use client";

import { useState, useTransition } from "react";
import { createRelatedPerson } from "@/lib/actions/interactions";
import { Users, Loader2, Plus, X } from "lucide-react";

const TYPES_RELATION = [
  { value: "conjoint", label: "Conjoint(e) / Partenaire" },
  { value: "enfant", label: "Enfant" },
  { value: "parent_social", label: "Parent social" },
  { value: "co_parent", label: "Co-parent" },
  { value: "autre", label: "Autre" },
] as const;

type Props = {
  clientId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function RelatedPersonForm({ clientId, onSuccess, onCancel }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    type_relation: "conjoint" as typeof TYPES_RELATION[number]["value"],
    full_name: "",
    date_naissance: "",
    email: "",
    phone: "",
    notes: "",
  });

  const set = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.full_name.trim()) { setError("Le nom est obligatoire."); return; }

    startTransition(async () => {
      const result = await createRelatedPerson({
        client_id: clientId,
        type_relation: form.type_relation,
        full_name: form.full_name.trim(),
        date_naissance: form.date_naissance || undefined,
        email: form.email || undefined,
        phone: form.phone || undefined,
        notes: form.notes || undefined,
      });

      if (!result.success) {
        setError(result.error ?? "Une erreur est survenue.");
        return;
      }
      onSuccess?.();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="client-form">
      {error && (
        <div className="form-error-banner">
          <X size={14} aria-hidden /> {error}
        </div>
      )}

      <fieldset className="form-section">
        <legend><Users size={16} aria-hidden /> Personne liée</legend>

        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor="type_relation">Type de relation <span className="required">*</span></label>
            <select
              id="type_relation"
              value={form.type_relation}
              onChange={(e) => set("type_relation", e.target.value as typeof form.type_relation)}
            >
              {TYPES_RELATION.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="related_full_name">Nom complet <span className="required">*</span></label>
            <input
              id="related_full_name"
              type="text"
              required
              placeholder="Prénom Nom"
              value={form.full_name}
              onChange={(e) => set("full_name", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="related_dob">Date de naissance</label>
            <input
              id="related_dob"
              type="date"
              value={form.date_naissance}
              onChange={(e) => set("date_naissance", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="related_email">Email</label>
            <input
              id="related_email"
              type="email"
              placeholder="email@exemple.fr"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="related_phone">Téléphone</label>
            <input
              id="related_phone"
              type="tel"
              placeholder="06 00 00 00 00"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="related_notes">Notes</label>
          <textarea
            id="related_notes"
            rows={2}
            placeholder="Informations complémentaires…"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>
      </fieldset>

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
            <><Plus size={16} aria-hidden /> Ajouter la personne</>
          )}
        </button>
      </div>
    </form>
  );
}
