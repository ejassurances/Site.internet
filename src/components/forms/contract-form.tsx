"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createContract, updateContract, type ContractFormData } from "@/lib/actions/contracts";
import { FileText, Building2, Euro, Save, Loader2, X, Calculator } from "lucide-react";

const TYPES_CONTRAT = [
  "Assurance emprunteur",
  "Prévoyance individuelle",
  "Prévoyance collective",
  "Transmission / Vie entière",
  "Épargne retraite",
  "Assurance décès",
  "Garantie accidents de la vie",
  "Autre",
];

const ASSUREURS = [
  "Generali",
  "Allianz",
  "AXA",
  "CNP Assurances",
  "Cardif (BNP Paribas)",
  "Swiss Life",
  "Spirica",
  "Suravenir",
  "Apicil",
  "Malakoff Humanis",
  "AG2R La Mondiale",
  "Autre",
];

const STATUTS = [
  { value: "draft", label: "Brouillon" },
  { value: "pending_signature", label: "En attente de signature" },
  { value: "active", label: "Actif" },
  { value: "terminated", label: "Résilié" },
  { value: "archived", label: "Archivé" },
];

type Props = {
  mode: "create" | "edit";
  clientId: string;
  initialData?: Partial<ContractFormData> & { id?: string };
  onSuccess?: (id: string) => void;
  onCancel?: () => void;
};

export function ContractForm({ mode, clientId, initialData, onSuccess, onCancel }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ContractFormData>({
    client_id: clientId,
    contract_number: initialData?.contract_number ?? "",
    insurer_name: initialData?.insurer_name ?? "",
    contract_type: initialData?.contract_type ?? "",
    status: initialData?.status ?? "draft",
    effective_date: initialData?.effective_date ?? "",
    end_date: initialData?.end_date ?? "",
    prime_annuelle: initialData?.prime_annuelle ?? undefined,
    prime_mensuelle: initialData?.prime_mensuelle ?? undefined,
    taux_commission: initialData?.taux_commission ?? undefined,
    economies_realisees: initialData?.economies_realisees ?? undefined,
    beneficiaires: initialData?.beneficiaires ?? "",
    notes: initialData?.notes ?? "",
  });

  const set = <K extends keyof ContractFormData>(field: K, value: ContractFormData[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Calcul automatique prime mensuelle <-> annuelle
  const handlePrimeAnnuelle = (v: string) => {
    const val = parseFloat(v) || undefined;
    set("prime_annuelle", val);
    if (val) set("prime_mensuelle", parseFloat((val / 12).toFixed(2)));
  };

  const handlePrimeMensuelle = (v: string) => {
    const val = parseFloat(v) || undefined;
    set("prime_mensuelle", val);
    if (val) set("prime_annuelle", parseFloat((val * 12).toFixed(2)));
  };

  const commissionCalculee =
    form.prime_annuelle && form.taux_commission
      ? ((form.prime_annuelle * form.taux_commission) / 100).toFixed(2)
      : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createContract(form)
          : await updateContract(initialData!.id!, form, initialData?.status);

      if (!result.success) {
        setError(result.error ?? "Une erreur est survenue.");
        return;
      }

      if (onSuccess && result.id) {
        onSuccess(result.id);
      } else {
        router.push(`/admin/clients/${clientId}`);
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

      {/* ── Identification du contrat ── */}
      <fieldset className="form-section">
        <legend><FileText size={16} aria-hidden /> Identification du contrat</legend>
        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor="contract_type">Type de contrat <span className="required">*</span></label>
            <select
              id="contract_type"
              required
              value={form.contract_type}
              onChange={(e) => set("contract_type", e.target.value)}
            >
              <option value="">Sélectionner…</option>
              {TYPES_CONTRAT.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="insurer_name">Assureur <span className="required">*</span></label>
            <select
              id="insurer_name"
              required
              value={form.insurer_name}
              onChange={(e) => set("insurer_name", e.target.value)}
            >
              <option value="">Sélectionner…</option>
              {ASSUREURS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="contract_number">Numéro de contrat</label>
            <input
              id="contract_number"
              type="text"
              placeholder="Ex : AE-2024-0312"
              value={form.contract_number}
              onChange={(e) => set("contract_number", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="status">Statut</label>
            <select id="status" value={form.status} onChange={(e) => set("status", e.target.value as ContractFormData["status"])}>
              {STATUTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="effective_date">Date d'effet</label>
            <input id="effective_date" type="date" value={form.effective_date} onChange={(e) => set("effective_date", e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="end_date">Date d'échéance</label>
            <input id="end_date" type="date" value={form.end_date} onChange={(e) => set("end_date", e.target.value)} />
          </div>
        </div>
      </fieldset>

      {/* ── Primes & Commissions ── */}
      <fieldset className="form-section">
        <legend><Euro size={16} aria-hidden /> Primes & Commissions</legend>
        <div className="form-grid-3">
          <div className="form-field">
            <label htmlFor="prime_annuelle">Prime annuelle (€)</label>
            <input
              id="prime_annuelle"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={form.prime_annuelle ?? ""}
              onChange={(e) => handlePrimeAnnuelle(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="prime_mensuelle">Prime mensuelle (€)</label>
            <input
              id="prime_mensuelle"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={form.prime_mensuelle ?? ""}
              onChange={(e) => handlePrimeMensuelle(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="taux_commission">Taux de commission (%)</label>
            <input
              id="taux_commission"
              type="number"
              step="0.01"
              min="0"
              max="100"
              placeholder="0.00"
              value={form.taux_commission ?? ""}
              onChange={(e) => set("taux_commission", parseFloat(e.target.value) || undefined)}
            />
          </div>
        </div>
        {commissionCalculee && (
          <div className="form-calc-result">
            <Calculator size={14} aria-hidden />
            Commission annuelle calculée : <strong>{commissionCalculee} €</strong>
          </div>
        )}
        {form.contract_type === "Assurance emprunteur" && (
          <div className="form-field" style={{ marginTop: "12px" }}>
            <label htmlFor="economies_realisees" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              💰 Économies réalisées pour le client (€)
              <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 400 }}>
                — mis à jour sur le site public à l'activation
              </span>
            </label>
            <input
              id="economies_realisees"
              type="number"
              step="1"
              min="0"
              placeholder="Ex : 4500"
              value={form.economies_realisees ?? ""}
              onChange={(e) => set("economies_realisees", parseFloat(e.target.value) || undefined)}
            />
          </div>
        )}
      </fieldset>

      {/* ── Bénéficiaires ── */}
      <fieldset className="form-section">
        <legend><Building2 size={16} aria-hidden /> Bénéficiaires & Notes</legend>
        <div className="form-field">
          <label htmlFor="beneficiaires">Bénéficiaires</label>
          <input
            id="beneficiaires"
            type="text"
            placeholder="Ex : Conjoint(e) à 100%, ou enfants par parts égales…"
            value={form.beneficiaires}
            onChange={(e) => set("beneficiaires", e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="notes_contrat">Notes sur le contrat</label>
          <textarea
            id="notes_contrat"
            rows={3}
            placeholder="Conditions particulières, historique, remarques…"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>
      </fieldset>

      {/* ── Actions ── */}
      <div className="form-actions">
        <button
          type="button"
          className="secondary-action"
          onClick={onCancel ?? (() => router.back())}
          disabled={isPending}
        >
          Annuler
        </button>
        <button type="submit" className="primary-action" disabled={isPending}>
          {isPending ? (
            <><Loader2 size={18} className="spin" aria-hidden /> Enregistrement…</>
          ) : (
            <><Save size={18} aria-hidden /> {mode === "create" ? "Créer le contrat" : "Enregistrer"}</>
          )}
        </button>
      </div>
    </form>
  );
}
