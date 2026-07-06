"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createLettreMissionAction, LettreMissionActionState } from "@/lib/actions/lettres-mission";

type ClientOption = { id: string; label: string };

type Props = {
  clients: ClientOption[];
  products: { value: string; label: string }[];
};

const initialState: LettreMissionActionState = { status: "idle", message: "" };

export function LettreMissionForm({ clients, products }: Props) {
  const [state, formAction, isPending] = useActionState(createLettreMissionAction, initialState);

  return (
    <form action={formAction} className="ops-card ops-form">
      <div className="ops-form-grid">
        <label>
          Client
          <select name="clientId" required defaultValue="">
            <option value="" disabled>
              Sélectionner un client
            </option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Produit / pôle
          <select name="product" defaultValue="emprunteur">
            {products.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Objet de la mission (optionnel)
        <input name="objet" placeholder="Laisser vide pour un objet standard généré automatiquement" />
      </label>

      <label>
        Synthèse du recueil des besoins (optionnel)
        <textarea name="besoins" rows={4} placeholder="Reprise des besoins et exigences exprimés par le client…" />
      </label>

      <label>
        Garanties étudiées (une par ligne, optionnel)
        <textarea name="guarantees" rows={4} placeholder={"Laisser vide pour les garanties par défaut du produit"} />
      </label>

      <button type="submit" className="btn-primary" disabled={isPending || clients.length === 0}>
        {isPending ? "Génération…" : "Générer la lettre de mission"}
      </button>

      {state.message && (
        <p className={state.status === "success" ? "form-success" : "form-error"}>{state.message}</p>
      )}
      {state.status === "success" && state.lettreId && (
        <Link className="secondary-action" href={`/client/lettre-mission/${state.lettreId}`}>
          Ouvrir la lettre de mission
        </Link>
      )}
    </form>
  );
}
