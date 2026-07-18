"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Mail, MapPin, Save, Tag, User, X, Loader2 } from "lucide-react";
import { createClient, updateClient, type ClientFormData } from "@/lib/actions/clients";

const TAGS_DISPONIBLES = [
  "Famille LGBT+",
  "Coparentalite",
  "Famille recomposee",
  "Famille homoparentale",
  "Parent social",
  "Assurance emprunteur",
  "Prevoyance",
  "Transmission",
  "Assurance-vie",
  "A relancer",
  "Prescripteur",
  "Association partenaire",
];

const SITUATIONS_FAMILIALES = [
  "Celibataire",
  "En couple",
  "Marie(e)",
  "Pacse(e)",
  "Divorce(e)",
  "Veuf / Veuve",
  "Famille monoparentale",
  "Famille recomposee",
  "Coparentalite",
  "Union libre",
];

const SOURCES = [
  "Site internet",
  "Recommandation client",
  "Association partenaire",
  "Reseau social",
  "Apporteur d'affaires",
  "Mandataire",
  "Salon / Evenement",
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
    contact_type: initialData?.contact_type ?? "prospect",
    source_acquisition: initialData?.source_acquisition ?? "",
    notes: initialData?.notes ?? "",
    tags: selectedTags,
  });

  const set = (field: keyof ClientFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    ));
  };

  const addCustomTag = () => {
    const tag = tagInput.trim();
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
    setTagInput("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const payload: ClientFormData = { ...form, tags: selectedTags };

    startTransition(async () => {
      const result = mode === "create"
        ? await createClient(payload)
        : await updateClient(initialData!.id!, payload);

      if (!result.success) {
        setError(result.error ?? "Une erreur est survenue.");
        return;
      }

      if (onSuccess && result.id) {
        onSuccess(result.id);
        return;
      }

      router.refresh();
      router.push(result.id ? `/admin/clients/${result.id}` : "/admin/clients");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="client-form admin-client-form">
      <div className="admin-client-form-intro">
        <div>
          <p className="eyebrow">CRM EJ Partners Assurances</p>
          <h2>{mode === "create" ? "Creer une fiche exploitable" : "Mettre a jour la fiche"}</h2>
          <p>
            Renseignez les informations utiles au suivi commercial, au conseil et aux obligations
            de tracabilite. Les details pourront etre completes progressivement.
          </p>
        </div>
        <span>{mode === "create" ? "Nouvelle fiche" : "Edition fiche"}</span>
      </div>

      {error && (
        <div className="form-error-banner">
          <X size={16} aria-hidden /> {error}
        </div>
      )}

      <fieldset className="form-section">
        <legend><User size={16} aria-hidden /> Identite</legend>
        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor="full_name">Nom complet <span className="required">*</span></label>
            <input
              id="full_name"
              type="text"
              required
              placeholder="Ex : Famille Martin-Dupont"
              value={form.full_name}
              onChange={(event) => set("full_name", event.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="contact_type">Type de contact</label>
            <select
              id="contact_type"
              value={form.contact_type}
              onChange={(event) => set("contact_type", event.target.value)}
            >
              <option value="prospect">Prospect</option>
              <option value="client">Client</option>
              <option value="partenaire">Partenaire</option>
              <option value="prescripteur">Prescripteur</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="statut_client">Statut du dossier</label>
            <select
              id="statut_client"
              value={form.statut_client}
              onChange={(event) => set("statut_client", event.target.value)}
            >
              <option value="prospect">En prospection</option>
              <option value="en_cours">En cours</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="date_naissance">Date de naissance</label>
            <input
              id="date_naissance"
              type="date"
              value={form.date_naissance}
              onChange={(event) => set("date_naissance", event.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="situation_familiale">Situation familiale</label>
            <select
              id="situation_familiale"
              value={form.situation_familiale}
              onChange={(event) => set("situation_familiale", event.target.value)}
            >
              <option value="">Selectionner...</option>
              {SITUATIONS_FAMILIALES.map((situation) => (
                <option key={situation} value={situation}>{situation}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend><Mail size={16} aria-hidden /> Coordonnees</legend>
        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="contact@exemple.fr"
              value={form.email}
              onChange={(event) => set("email", event.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Telephone</label>
            <input
              id="phone"
              type="tel"
              placeholder="06 00 00 00 00"
              value={form.phone}
              onChange={(event) => set("phone", event.target.value)}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend><MapPin size={16} aria-hidden /> Adresse</legend>
        <div className="form-field">
          <label htmlFor="adresse">Adresse</label>
          <input
            id="adresse"
            type="text"
            placeholder="12 rue des Lilas"
            value={form.adresse}
            onChange={(event) => set("adresse", event.target.value)}
          />
        </div>
        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor="code_postal">Code postal</label>
            <input
              id="code_postal"
              type="text"
              placeholder="75001"
              value={form.code_postal}
              onChange={(event) => set("code_postal", event.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="ville">Ville</label>
            <input
              id="ville"
              type="text"
              placeholder="Paris"
              value={form.ville}
              onChange={(event) => set("ville", event.target.value)}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>Contexte & acquisition</legend>
        <div className="form-field">
          <label htmlFor="family_context">Contexte familial</label>
          <textarea
            id="family_context"
            rows={3}
            placeholder="Ex : couple avec enfant social, famille recomposee, coparentalite choisie..."
            value={form.family_context}
            onChange={(event) => set("family_context", event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="source_acquisition">Source d'acquisition</label>
          <select
            id="source_acquisition"
            value={form.source_acquisition}
            onChange={(event) => set("source_acquisition", event.target.value)}
          >
            <option value="">Selectionner...</option>
            {SOURCES.map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend><Tag size={16} aria-hidden /> Tags</legend>
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
            placeholder="Ajouter un tag personnalise..."
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addCustomTag();
              }
            }}
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

      <fieldset className="form-section">
        <legend>Notes internes</legend>
        <div className="form-field">
          <textarea
            id="notes"
            rows={4}
            placeholder="Notes confidentielles sur ce client..."
            value={form.notes}
            onChange={(event) => set("notes", event.target.value)}
          />
        </div>
      </fieldset>

      <div className="form-actions">
        <button type="button" className="secondary-action" onClick={() => router.back()} disabled={isPending}>
          Annuler
        </button>
        <button type="submit" className="primary-action" disabled={isPending}>
          {isPending ? (
            <><Loader2 size={18} className="spin" aria-hidden /> Enregistrement...</>
          ) : (
            <><Save size={18} aria-hidden /> {mode === "create" ? "Creer la fiche client" : "Enregistrer"}</>
          )}
        </button>
      </div>
    </form>
  );
}
