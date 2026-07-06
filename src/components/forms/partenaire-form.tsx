"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createMandataireAction, MandataireActionState } from "@/app/actions/mandataires";

const initialState: MandataireActionState = { status: "idle", message: "" };

export function PartenaireForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createMandataireAction, initialState);

  useEffect(() => {
    if (state.status === "success" && state.mandataireId) {
      const id = state.mandataireId;
      const timer = setTimeout(() => router.push(`/admin/partenaires/${id}`), 1200);
      return () => clearTimeout(timer);
    }
  }, [state, router]);

  return (
    <form className="souscription-form" action={formAction}>
      <section className="souscription-card">
        <h3>Identité du partenaire</h3>
        <div className="souscription-grid">
          <label className="souscription-field">
            <span className="souscription-label">
              Nom du partenaire / société<em aria-hidden> *</em>
            </span>
            <input name="company_name" type="text" placeholder="Ex. Cabinet Dupont" required />
          </label>
          <label className="souscription-field half">
            <span className="souscription-label">Type de partenaire</span>
            <select name="partner_type" defaultValue="mandataire">
              <option value="mandataire">Mandataire</option>
              <option value="courtier_partenaire">Courtier partenaire</option>
              <option value="apporteur">Apporteur d&apos;affaires</option>
              <option value="prescripteur">Prescripteur</option>
            </select>
          </label>
          <label className="souscription-field half">
            <span className="souscription-label">N° ORIAS</span>
            <input name="orias_number" type="text" placeholder="Ex. 12345678" />
          </label>
        </div>
      </section>

      <section className="souscription-card">
        <h3>Contact</h3>
        <div className="souscription-grid">
          <label className="souscription-field half">
            <span className="souscription-label">Nom du contact</span>
            <input name="contact_name" type="text" placeholder="Prénom Nom" />
          </label>
          <label className="souscription-field half">
            <span className="souscription-label">Email</span>
            <input name="contact_email" type="email" placeholder="contact@partenaire.fr" />
          </label>
          <label className="souscription-field half">
            <span className="souscription-label">Téléphone</span>
            <input name="phone" type="tel" placeholder="06 12 34 56 78" />
          </label>
        </div>
      </section>

      <section className="souscription-card">
        <h3>Notes</h3>
        <label className="souscription-field">
          <span className="souscription-label">Remarques internes</span>
          <textarea name="notes" rows={3} placeholder="Contexte, conditions de la convention…" />
        </label>
      </section>

      <div className="form-actions">
        <button className="primary-action" type="submit" disabled={isPending}>
          {isPending ? "Création…" : "Créer la fiche + dossier Drive"}
        </button>
      </div>

      {state.message && (
        <p className={state.status === "success" ? "form-success" : "form-error"}>{state.message}</p>
      )}
    </form>
  );
}
