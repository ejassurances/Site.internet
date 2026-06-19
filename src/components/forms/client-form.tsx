"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient, updateClient, type ClientFormData } from "@/lib/actions/clients";
import { User, Mail, Phone, MapPin, Tag, X, Save, Loader2 } from "lucide-react";

const TAGS_DISPONIBLES = [
  "Famille LGBT+",
  "Coparentalité",
  "Famille recomposée",
  "Famille homoparentale",
  "Assurance emprunteur",
  "Prévoyance",
  "Transmission",
  "VIP",
  "À relancer",
  "Prescripteur",
  "Association partenaire",
];

const SITUATIONS_FAMILIALES = [
  "Célibataire",
  "En couple",
  "Marié(e)",
  "Pacsé(e)",
  "Divorcé(e)",
  "Veuf/Veuve",
  "Famille monoparentale",
  "Famille recomposée",
  "Coparentalité",
  "Union libre",
];

const SOURCES = [
  "Site internet",
  "Recommandation client",
  "Association partenaire",
  "Réseau social",
  "Apporteur d'affaires",
  "Mandataire",
  "Salon / Événement",
  "Autre",
];

type Props = {
  mode: "create" | "edit";
  initialData?: Partial<ClientFormData> & { id?: string };
  onSuccess?: (id: string) => void;
};

export function ClientForm({ mode, initialData, onSuccess }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState<ClientFormData>({
    full_name: initialData?.full_name ?? "",
    email: initialData?.email ?? "",
    phone: initialData?.phone ?? "",
    date_naissance: initialData?.date_naissance ?? "",
    adresse: initialData?.adresse ?? "",
    code_postal: initialData?.code_postal ?? "",
    ville: initialData?.ville ?? "",
    situation_familiale: initialData?.situation_familiale ?? "",
    family_context: initialData?.family_context ?? "",
    statut_client: initialData?.statut_client ?? "prospect",
    source_acquisition: initialData?.source_acquisition ?? "",
    notes: initialData?.notes ?? "",
    tags: selectedTags,
  });

  const set = (field: keyof ClientFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addCustomTag = () => {
    const t = tagInput.trim();
    if (t && !selectedTags.includes(t)) {
      setSelectedTags((prev) => [...prev, t]);
    }
    setTagInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload: ClientFormData = { ...form, tags: selectedTags };

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createClient(payload)
          : await updateClient(initialData!.id!, payload);

      if (!result.success) {
        setError(result.error ?? "Une erreur est survenue.");
        return;
      }

      if (onSuccess && result.id) {
        onSuccess(result.id);
      } else {
        router.push(result.id ? `/admin/clients/${result.id}` : "/admin/clients");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="client-form">
      {error && (
        <div className="form-error-banner">
          <X size={16} aria-hidden /> {error}
        </div>
      )}

      {/* ── Identité ── */}
      <fieldset className="form-section">
        <legend><User size={16} aria-hidden /> Identité</legend>
        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor="full_name">Nom complet <span className="required">*</span></label>
            <input
              id="full_name"
              type="text"
              required
              placeholder="Ex : Famille Martin-Dupont"
              value={form.full_name}
              onChange={(e) => set("full_name", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="statut_client">Statut</label>
            <select id="statut_client" value={form.statut_client} onChange={(e) => set("statut_client", e.target.value as "prospect" | "actif" | "en_cours" | "inactif")}>
              <option value="prospect">Prospect</option>
              <option value="en_cours">En cours</option>
              <option value="actif">Client actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="date_naissance">Date de naissance</label>
            <input id="date_naissance" type="date" value={form.date_naissance} onChange={(e) => set("date_naissance", e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="situation_familiale">Situation familiale</label>
            <select id="situation_familiale" value={form.situation_familiale} onChange={(e) => set("situation_familiale", e.target.value)}>
              <option value="">Sélectionner…</option>
              {SITUATIONS_FAMILIALES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </fieldset>

      {/* ── Coordonnées ── */}
      <fieldset className="form-section">
        <legend><Mail size={16} aria-hidden /> Coordonnées</legend>
        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="contact@exemple.fr" value={form.email} onChange={(e) => set("email", e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Téléphone</label>
            <input id="phone" type="tel" placeholder="06 00 00 00 00" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
        </div>
      </fieldset>

      {/* ── Adresse ── */}
      <fieldset className="form-section">
        <legend><MapPin size={16} aria-hidden /> Adresse</legend>
        <div className="form-field">
          <label htmlFor="adresse">Adresse</label>
          <input id="adresse" type="text" placeholder="12 rue des Lilas" value={form.adresse} onChange={(e) => set("adresse", e.target.value)} />
        </div>
        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor="code_postal">Code postal</label>
            <input id="code_postal" type="text" placeholder="75001" value={form.code_postal} onChange={(e) => set("code_postal", e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="ville">Ville</label>
            <input id="ville" type="text" placeholder="Paris" value={form.ville} onChange={(e) => set("ville", e.target.value)} />
          </div>
        </div>
      </fieldset>

      {/* ── Contexte & Acquisition ── */}
      <fieldset className="form-section">
        <legend>Contexte & Acquisition</legend>
        <div className="form-field">
          <label htmlFor="family_context">Contexte familial</label>
          <textarea
            id="family_context"
            rows={3}
            placeholder="Ex : Couple de femmes avec 2 enfants, coparentalité avec donneur connu…"
            value={form.family_context}
            onChange={(e) => set("family_context", e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="source_acquisition">Source d'acquisition</label>
          <select id="source_acquisition" value={form.source_acquisition} onChange={(e) => set("source_acquisition", e.target.value)}>
            <option value="">Sélectionner…</option>
            {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </fieldset>

      {/* ── Tags ── */}
      <fieldset className="form-section">
        <legend><Tag size={16} aria-hidden /> Tags personnalisés</legend>
        <div className="form-tags-grid">
          {TAGS_DISPONIBLES.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`crm-chip${selectedTags.includes(tag) ? " active" : ""}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="form-tag-input">
          <input
            type="text"
            placeholder="Ajouter un tag personnalisé…"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomTag(); } }}
          />
          <button type="button" className="secondary-action" onClick={addCustomTag}>Ajouter</button>
        </div>
        {selectedTags.length > 0 && (
          <div className="form-selected-tags">
            {selectedTags.map((tag) => (
              <span key={tag} className="crm-tag selected">
                {tag}
                <button type="button" onClick={() => toggleTag(tag)} aria-label={`Supprimer le tag ${tag}`}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </fieldset>

      {/* ── Notes ── */}
      <fieldset className="form-section">
        <legend>Notes internes</legend>
        <div className="form-field">
          <textarea
            id="notes"
            rows={4}
            placeholder="Notes confidentielles sur ce client…"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>
      </fieldset>

      {/* ── Actions ── */}
      <div className="form-actions">
        <button type="button" className="secondary-action" onClick={() => router.back()} disabled={isPending}>
          Annuler
        </button>
        <button type="submit" className="primary-action" disabled={isPending}>
          {isPending ? (
            <><Loader2 size={18} className="spin" aria-hidden /> Enregistrement…</>
          ) : (
            <><Save size={18} aria-hidden /> {mode === "create" ? "Créer la fiche client" : "Enregistrer les modifications"}</>
          )}
        </button>
      </div>
    </form>
  );
}
