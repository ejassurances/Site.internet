"use client";

import { FormEvent, useMemo, useState } from "react";
import { needSections } from "@/lib/family-protection-os";

type AssessmentState = {
  familySituation: string;
  legalStatus: string;
  protectionGoal: string;
  mortgageProject: string;
  heirsMismatch: boolean;
  socialParent: boolean;
  unprotectedHome: boolean;
  incomeDependency: boolean;
};

const initialState: AssessmentState = {
  familySituation: "Famille recomposée",
  legalStatus: "Concubinage",
  protectionGoal: "Protéger le logement et les enfants",
  mortgageProject: "Aucun projet immédiat",
  heirsMismatch: true,
  socialParent: false,
  unprotectedHome: true,
  incomeDependency: true,
};

export function NeedsAssessmentForm() {
  const [form, setForm] = useState(initialState);
  const [generated, setGenerated] = useState(false);

  const score = useMemo(() => {
    const risks = [
      form.heirsMismatch,
      form.socialParent,
      form.unprotectedHome,
      form.incomeDependency,
      form.legalStatus !== "Mariage",
    ].filter(Boolean).length;

    return Math.max(18, 100 - risks * 14);
  }, [form]);

  function update<K extends keyof AssessmentState>(key: K, value: AssessmentState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGenerated(true);
  }

  return (
    <div className="assessment-layout">
      <form className="assessment-form" onSubmit={onSubmit}>
        <section>
          <p className="eyebrow">Recueil des besoins</p>
          <h2>Créer une demande Family Protection OS</h2>
          <p>
            Ce formulaire structure le besoin client avant analyse. Il prépare la collecte DDA, la
            cartographie familiale et le parcours assurance emprunteur.
          </p>
        </section>

        <label>
          Situation familiale
          <select value={form.familySituation} onChange={(event) => update("familySituation", event.target.value)}>
            <option>Famille recomposée</option>
            <option>Famille LGBT+</option>
            <option>Coparentalité choisie</option>
            <option>Famille monoparentale</option>
            <option>Autre situation atypique</option>
          </select>
        </label>

        <label>
          Statut juridique du couple
          <select value={form.legalStatus} onChange={(event) => update("legalStatus", event.target.value)}>
            <option>Concubinage</option>
            <option>PACS</option>
            <option>Mariage</option>
            <option>Separation</option>
            <option>Sans couple</option>
          </select>
        </label>

        <label>
          Objectif principal
          <textarea value={form.protectionGoal} onChange={(event) => update("protectionGoal", event.target.value)} />
        </label>

        <label>
          Projet assurance emprunteur
          <select value={form.mortgageProject} onChange={(event) => update("mortgageProject", event.target.value)}>
            <option>Aucun projet immédiat</option>
            <option>Achat résidence principale</option>
            <option>Substitution assurance emprunteur</option>
            <option>Investissement locatif</option>
            <option>SCI / projet patrimonial</option>
          </select>
        </label>

        <fieldset>
          <legend>Risques pressentis</legend>
          <label>
            <input
              type="checkbox"
              checked={form.heirsMismatch}
              onChange={(event) => update("heirsMismatch", event.target.checked)}
            />
            Écart entre volonté du client et héritiers légaux
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.socialParent}
              onChange={(event) => update("socialParent", event.target.checked)}
            />
            Parent social ou enfant social non reconnu
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.unprotectedHome}
              onChange={(event) => update("unprotectedHome", event.target.checked)}
            />
            Logement insuffisamment protégé
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.incomeDependency}
              onChange={(event) => update("incomeDependency", event.target.checked)}
            />
            Personnes dépendantes des revenus du client
          </label>
        </fieldset>

        <button className="primary-action" type="submit">
          Générer la synthèse DDA
        </button>
      </form>

      <aside className="assessment-preview">
        <div className="fpos-score compact">
          <span>Score estimé</span>
          <strong>{score}</strong>
          <small>{score < 55 ? "Risque élevé" : score < 75 ? "Risque modéré" : "Protection correcte"}</small>
        </div>

        <section>
          <h3>Structure attendue</h3>
          <div className="module-list">
            {needSections.map((section) => (
              <div key={section.title}>
                <strong>{section.title}</strong>
                <p>{section.fields.slice(0, 3).join(" • ")}</p>
              </div>
            ))}
          </div>
        </section>

        {generated && (
          <section className="generated-summary">
            <h3>Synthèse brouillon</h3>
            <p>
              Situation : {form.familySituation}, {form.legalStatus}. Objectif : {form.protectionGoal}.
            </p>
            <p>
              Points à traiter : logement, revenus, héritiers réels, assurance emprunteur et
              documents justificatifs.
            </p>
          </section>
        )}
      </aside>
    </div>
  );
}
