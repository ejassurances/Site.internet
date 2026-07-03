"use client";

import { FormEvent, useActionState, useMemo, useState } from "react";
import { createNeedsAssessmentAction, NeedsAssessmentActionState } from "@/app/actions/needs-assessments";
import { AssessmentClientOption } from "@/lib/client-records";
import { needSections } from "@/lib/family-protection-os";

type AssessmentState = {
  clientId: string;
  familySituation: string;
  legalStatus: string;
  protectionGoal: string;
  mortgageProject: string;
  bankName: string;
  loanAmount: string;
  loanDurationMonths: string;
  borrowersCount: string;
  currentInsurer: string;
  currentAnnualPremium: string;
  borrowerOneQuotity: string;
  borrowerTwoQuotity: string;
  loanOfferReceived: boolean;
  amortizationScheduleReceived: boolean;
  identityReceived: boolean;
  advisorNotes: string;
  heirsMismatch: boolean;
  socialParent: boolean;
  unprotectedHome: boolean;
  incomeDependency: boolean;
};

type NeedsAssessmentFormProps = {
  clients: AssessmentClientOption[];
  lockedClientId?: string;
};

const initialActionState: NeedsAssessmentActionState = {
  status: "idle",
  message: "",
};

function createInitialState(clients: AssessmentClientOption[], lockedClientId?: string): AssessmentState {
  return {
    clientId: lockedClientId ?? clients[0]?.id ?? "",
    familySituation: "Famille recomposée",
    legalStatus: "Concubinage",
    protectionGoal: "Protéger le logement et les enfants",
    mortgageProject: "Aucun projet immédiat",
    bankName: "",
    loanAmount: "",
    loanDurationMonths: "",
    borrowersCount: "2",
    currentInsurer: "",
    currentAnnualPremium: "",
    borrowerOneQuotity: "100",
    borrowerTwoQuotity: "100",
    loanOfferReceived: false,
    amortizationScheduleReceived: false,
    identityReceived: false,
    advisorNotes: "",
    heirsMismatch: true,
    socialParent: false,
    unprotectedHome: true,
    incomeDependency: true,
  };
}

export function NeedsAssessmentForm({ clients, lockedClientId }: NeedsAssessmentFormProps) {
  const [form, setForm] = useState(() => createInitialState(clients, lockedClientId));
  const [generated, setGenerated] = useState(false);
  const [actionState, formAction, isPending] = useActionState(createNeedsAssessmentAction, initialActionState);

  const selectedClient = clients.find((client) => client.id === form.clientId);

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

  const isBorrowerProject = form.mortgageProject !== "Aucun projet immédiat";
  const documentsReady = form.loanOfferReceived && form.amortizationScheduleReceived && form.identityReceived;

  function update<K extends keyof AssessmentState>(key: K, value: AssessmentState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function onPreview(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setGenerated(true);
  }

  return (
    <div className="assessment-layout">
      <form className="assessment-form" action={formAction}>
        <section>
          <p className="eyebrow">Recueil des besoins</p>
          <h2>Créer une analyse de protection familiale</h2>
          <p>
            Ce recueil aide le cabinet a comprendre la situation familiale, les personnes a proteger,
            les risques prioritaires et le cas échéant le projet d'assurance emprunteur.
          </p>
        </section>

        <label>
          Fiche client concernée
          <select
            name="clientId"
            value={form.clientId}
            disabled={Boolean(lockedClientId)}
            onChange={(event) => update("clientId", event.target.value)}
            required
          >
            <option value="">Sélectionner une fiche client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.label}
              </option>
            ))}
          </select>
        </label>
        {lockedClientId && <input type="hidden" name="clientId" value={lockedClientId} />}
        {selectedClient && <p className="field-hint">{selectedClient.detail}</p>}

        <label>
          Situation familiale
          <select
            name="familySituation"
            value={form.familySituation}
            onChange={(event) => update("familySituation", event.target.value)}
          >
            <option>Famille recomposée</option>
            <option>Famille LGBT+</option>
            <option>Coparentalité choisie</option>
            <option>Famille monoparentale</option>
            <option>Autre situation atypique</option>
          </select>
        </label>

        <label>
          Statut juridique du couple
          <select name="legalStatus" value={form.legalStatus} onChange={(event) => update("legalStatus", event.target.value)}>
            <option>Concubinage</option>
            <option>PACS</option>
            <option>Mariage</option>
            <option>Séparation</option>
            <option>Sans couple</option>
          </select>
        </label>

        <label>
          Objectif principal
          <textarea
            name="protectionGoal"
            value={form.protectionGoal}
            onChange={(event) => update("protectionGoal", event.target.value)}
          />
        </label>

        <label>
          Projet assurance emprunteur
          <select
            name="mortgageProject"
            value={form.mortgageProject}
            onChange={(event) => update("mortgageProject", event.target.value)}
          >
            <option>Aucun projet immédiat</option>
            <option>Achat résidence principale</option>
            <option>Substitution assurance emprunteur</option>
            <option>Investissement locatif</option>
            <option>SCI / projet patrimonial</option>
          </select>
        </label>

        {isBorrowerProject && (
          <div className="assessment-borrower-block">
            <div>
              <h3>Informations du crédit à assurer</h3>
              <p>
                Le client, le courtier ou un MIA peuvent compléter ces champs. Les informations enregistrées
                seront réutilisées pour les devis, la fiche conseil et le lien de souscription.
              </p>
            </div>

            <div className="assessment-field-grid">
              <label>
                Banque
                <input name="bankName" value={form.bankName} onChange={(event) => update("bankName", event.target.value)} />
              </label>
              <label>
                Montant du crédit
                <input name="loanAmount" inputMode="decimal" value={form.loanAmount} onChange={(event) => update("loanAmount", event.target.value)} />
              </label>
              <label>
                Durée en mois
                <input name="loanDurationMonths" inputMode="numeric" value={form.loanDurationMonths} onChange={(event) => update("loanDurationMonths", event.target.value)} />
              </label>
              <label>
                Nombre d'emprunteurs
                <input name="borrowersCount" inputMode="numeric" value={form.borrowersCount} onChange={(event) => update("borrowersCount", event.target.value)} />
              </label>
              <label>
                Assureur actuel
                <input name="currentInsurer" value={form.currentInsurer} onChange={(event) => update("currentInsurer", event.target.value)} />
              </label>
              <label>
                Prime annuelle actuelle
                <input name="currentAnnualPremium" inputMode="decimal" value={form.currentAnnualPremium} onChange={(event) => update("currentAnnualPremium", event.target.value)} />
              </label>
              <label>
                Quotité emprunteur 1
                <input name="borrowerOneQuotity" inputMode="numeric" value={form.borrowerOneQuotity} onChange={(event) => update("borrowerOneQuotity", event.target.value)} />
              </label>
              <label>
                Quotité emprunteur 2
                <input name="borrowerTwoQuotity" inputMode="numeric" value={form.borrowerTwoQuotity} onChange={(event) => update("borrowerTwoQuotity", event.target.value)} />
              </label>
            </div>

            <fieldset>
              <legend>Pièces obligatoires avant validation</legend>
              <label>
                <input name="loanOfferReceived" type="checkbox" checked={form.loanOfferReceived} onChange={(event) => update("loanOfferReceived", event.target.checked)} />
                Offre de prêt ajoutée au dossier
              </label>
              <label>
                <input name="amortizationScheduleReceived" type="checkbox" checked={form.amortizationScheduleReceived} onChange={(event) => update("amortizationScheduleReceived", event.target.checked)} />
                Tableau d'amortissement ajouté au dossier
              </label>
              <label>
                <input name="identityReceived" type="checkbox" checked={form.identityReceived} onChange={(event) => update("identityReceived", event.target.checked)} />
                Pièce d'identité présente
              </label>
              <p className={documentsReady ? "form-success" : "form-error"}>
                {documentsReady
                  ? "Recueil prêt à être vérifié : les pièces bloquantes sont présentes."
                  : "Validation métier bloquée : offre de prêt, tableau d'amortissement et pièce d'identité doivent être rattachés."}
              </p>
            </fieldset>
          </div>
        )}

        <fieldset>
          <legend>Risques pressentis</legend>
          <label>
            <input
              name="heirsMismatch"
              type="checkbox"
              checked={form.heirsMismatch}
              onChange={(event) => update("heirsMismatch", event.target.checked)}
            />
            Écart entre volonté du client et héritiers légaux
          </label>
          <label>
            <input
              name="socialParent"
              type="checkbox"
              checked={form.socialParent}
              onChange={(event) => update("socialParent", event.target.checked)}
            />
            Parent social ou enfant social non reconnu
          </label>
          <label>
            <input
              name="unprotectedHome"
              type="checkbox"
              checked={form.unprotectedHome}
              onChange={(event) => update("unprotectedHome", event.target.checked)}
            />
            Logement insuffisamment protégé
          </label>
          <label>
            <input
              name="incomeDependency"
              type="checkbox"
              checked={form.incomeDependency}
              onChange={(event) => update("incomeDependency", event.target.checked)}
            />
            Personnes dépendantes des revenus du client
          </label>
        </fieldset>

        <label>
          Notes conseiller
          <textarea
            name="advisorNotes"
            value={form.advisorNotes}
            onChange={(event) => update("advisorNotes", event.target.value)}
            placeholder="Contexte sensible, points à vérifier, documents attendus..."
          />
        </label>

        <div className="form-actions">
          <button className="secondary-action" type="button" onClick={onPreview}>
            Générer la synthèse
          </button>
          <button className="primary-action" type="submit" disabled={isPending || clients.length === 0}>
            {isPending ? "Enregistrement..." : "Enregistrer dans la fiche client"}
          </button>
        </div>

        {actionState.message && (
          <p className={actionState.status === "success" ? "form-success" : "form-error"}>{actionState.message}</p>
        )}
      </form>

      <aside className="assessment-preview">
        <div className="fpos-score compact">
          <span>Score estimé</span>
          <strong>{score}</strong>
          <small>{score < 55 ? "Protection à renforcer" : score < 75 ? "Points à vérifier" : "Protection lisible"}</small>
        </div>

        <section>
          <h3>Fiche de rattachement</h3>
          <p>{selectedClient ? selectedClient.label : "Aucune fiche client sélectionnée"}</p>
          {selectedClient && <small>{selectedClient.detail}</small>}
        </section>

        <section>
          <h3>Points analysés par le cabinet</h3>
          <div className="module-list">
            {needSections.map((section) => (
              <div key={section.title}>
                <strong>{section.title}</strong>
                <p>{section.fields.slice(0, 3).join(" · ")}</p>
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
              Points à traiter : logement, revenus, héritiers réels, assurance emprunteur et documents justificatifs.
            </p>
          </section>
        )}
      </aside>
    </div>
  );
}
