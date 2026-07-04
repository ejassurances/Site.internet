"use client";

import { useActionState } from "react";
import {
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  FileSignature,
  FileText,
  Inbox,
  LockKeyhole,
  Mail,
  PenLine,
  PlayCircle,
  Send,
  UploadCloud,
} from "lucide-react";
import {
  createBorrowerProjectAction,
  saveBorrowerNeedsAction,
  updateBorrowerWorkflowAction,
  type ProjectActionState,
} from "@/lib/actions/projects";
import {
  getBorrowerDocumentRequirements,
  getBorrowerProjectProgress,
  getBorrowerWorkflow,
  type BorrowerProject,
  type ProjectStepStatus,
} from "@/lib/project-workflow";

type ClientProjectWorkflowProps = {
  clientId: string;
  projects: BorrowerProject[];
};

const initialState: ProjectActionState = {
  status: "idle",
  message: "",
};

const statusLabels: Record<ProjectStepStatus, string> = {
  todo: "A faire",
  in_progress: "En cours",
  blocked: "Bloque",
  waiting_client: "Attente client",
  done: "Termine",
};

const statusClass: Record<ProjectStepStatus, string> = {
  todo: "todo",
  in_progress: "progress",
  blocked: "blocked",
  waiting_client: "waiting",
  done: "done",
};

export function ClientProjectWorkflow({ clientId, projects }: ClientProjectWorkflowProps) {
  const [actionState, formAction, isPending] = useActionState(createBorrowerProjectAction, initialState);
  const [needsState, needsFormAction, isSavingNeeds] = useActionState(saveBorrowerNeedsAction, initialState);
  const borrowerProjects = projects.filter((project) => project.project_type === "assurance_emprunteur");
  const activeProject = borrowerProjects[0] ?? null;
  const workflow = getBorrowerWorkflow(activeProject);
  const documentRequirements = getBorrowerDocumentRequirements(activeProject);
  const progress = getBorrowerProjectProgress(activeProject);
  const needs = activeProject?.project_borrower_needs?.[0] ?? null;
  const deliveries = activeProject?.project_deliveries ?? [];
  const signatures = activeProject?.project_signatures ?? [];
  const imports = activeProject?.project_email_imports?.filter((item) => !item.excluded) ?? [];
  const requiredDocumentsReady = documentRequirements
    .filter((document) => document.requiredForValidation)
    .every((document) => document.status === "received" || document.status === "validated");

  return (
    <div className="client-project-workflow">
      <section className="project-workflow-hero">
        <div>
          <p className="eyebrow">Projet client</p>
          <h3>Assurance emprunteur : du recueil a la souscription</h3>
          <p>
            Le projet centralise le recueil des besoins, les documents obligatoires, les envois au client,
            les signatures, les devis, la fiche conseil et les pieces importees depuis Gmail.
          </p>
        </div>
        <form action={formAction} className="project-create-form">
          <input type="hidden" name="clientId" value={clientId} />
          <label>
            Nom du projet
            <input name="projectTitle" defaultValue="Assurance emprunteur" />
          </label>
          <button className="cf360-add-btn" type="submit" disabled={isPending}>
            <ClipboardCheck size={14} aria-hidden />
            {isPending ? "Creation..." : "Creer un projet"}
          </button>
          {actionState.message && (
            <p className={actionState.status === "success" ? "form-success" : "form-error"}>
              {actionState.message}
            </p>
          )}
        </form>
      </section>

      {activeProject ? (
        <section className="project-current-card">
          <div>
            <span>Projet actif</span>
            <strong>{activeProject.title}</strong>
            <small>Statut CRM : {activeProject.status} - progression {progress.done}/{progress.total}</small>
          </div>
          <div className="project-progress-meter" aria-label={`Progression ${progress.percent}%`}>
            <span style={{ width: `${progress.percent}%` }} />
          </div>
          <div className="project-action-row">
            <button type="button"><Mail size={14} aria-hidden /> Email + espace client</button>
            <button type="button"><Send size={14} aria-hidden /> Signature client</button>
            <button type="button"><Inbox size={14} aria-hidden /> Import Gmail</button>
          </div>
        </section>
      ) : (
        <section className="project-empty-notice">
          <FileText size={22} aria-hidden />
          <div>
            <strong>Aucun projet emprunteur rattache.</strong>
            <p>Creer un projet depuis cette fiche pour initialiser les etapes, documents et signatures.</p>
          </div>
        </section>
      )}

      {activeProject && (
        <section className="project-needs-card">
          <div className="project-documents-header">
            <div>
              <h3>Recueil des besoins emprunteur</h3>
              <p>
                Les donnees saisies ici alimentent les devis, la fiche conseil et la souscription.
                Le recueil ne peut pas etre valide sans l'offre de pret, le tableau d'amortissement et la piece d'identite.
              </p>
            </div>
            <ClipboardCheck size={22} aria-hidden />
          </div>

          <form action={needsFormAction} className="project-needs-form">
            <input type="hidden" name="projectId" value={activeProject.id} />
            <input type="hidden" name="clientId" value={clientId} />
            <div className="project-needs-grid">
              <label>
                Banque
                <input name="bankName" defaultValue={needs?.bank_name ?? ""} placeholder="Banque preteuse" />
              </label>
              <label>
                Type d'operation
                <select name="operationType" defaultValue={needs?.delegation_or_substitution ?? "Substitution assurance emprunteur"}>
                  <option>Delegation assurance emprunteur</option>
                  <option>Substitution assurance emprunteur</option>
                  <option>Renegociation / optimisation</option>
                </select>
              </label>
              <label>
                Montant emprunte
                <input name="loanAmount" type="number" min="0" defaultValue={needs?.loan_amount ?? ""} />
              </label>
              <label>
                Duree en mois
                <input name="loanDurationMonths" type="number" min="0" defaultValue={needs?.loan_duration_months ?? ""} />
              </label>
              <label>
                Capital restant du
                <input name="remainingCapital" type="number" min="0" defaultValue={needs?.remaining_capital ?? ""} />
              </label>
              <label>
                Prime annuelle actuelle
                <input name="currentAnnualPremium" type="number" min="0" defaultValue={needs?.current_annual_premium ?? ""} />
              </label>
              <label>
                Date debut pret
                <input name="loanStartDate" type="date" defaultValue={needs?.loan_start_date ?? ""} />
              </label>
              <label>
                Date fin pret
                <input name="loanEndDate" type="date" defaultValue={needs?.loan_end_date ?? ""} />
              </label>
              <label>
                Assureur actuel
                <input name="currentInsurer" defaultValue={needs?.current_insurer ?? ""} placeholder="Banque, CNP, Cardif..." />
              </label>
              <label>
                Quotite emprunteur 1
                <input
                  name="borrowerQuotity"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={Number(needs?.requested_quotities?.borrower ?? 100)}
                />
              </label>
              <label>
                Quotite co-emprunteur
                <input
                  name="coBorrowerQuotity"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={Number(needs?.requested_quotities?.coBorrower ?? 0)}
                />
              </label>
              <label>
                Objectif client
                <textarea
                  name="objective"
                  defaultValue={needs?.objective ?? ""}
                  placeholder="Economiser, securiser le logement, adapter les quotites, changer d'assurance..."
                />
              </label>
            </div>

            <div className="project-guarantee-row">
              {["Deces", "PTIA", "ITT", "IPT", "IPP", "Perte emploi"].map((guarantee) => (
                <label key={guarantee} className="project-check-pill">
                  <input
                    type="checkbox"
                    name="guarantees"
                    value={guarantee}
                    defaultChecked={(needs?.requested_guarantees ?? ["Deces", "PTIA", "ITT", "IPT"]).includes(guarantee)}
                  />
                  {guarantee}
                </label>
              ))}
            </div>

            <div className="project-doc-checks">
              <label>
                <input type="checkbox" name="loanOfferReady" defaultChecked={documentRequirements.find((d) => d.key === "loan_offer")?.status !== "missing"} />
                Offre de pret recue
              </label>
              <label>
                <input type="checkbox" name="amortizationReady" defaultChecked={documentRequirements.find((d) => d.key === "amortization_schedule")?.status !== "missing"} />
                Tableau d'amortissement recu
              </label>
              <label>
                <input type="checkbox" name="identityReady" defaultChecked={documentRequirements.find((d) => d.key === "identity")?.status !== "missing"} />
                Piece d'identite recue
              </label>
            </div>

            <label className="project-notes-field">
              Notes conseiller / MIA
              <textarea name="advisorNotes" defaultValue={needs?.advisor_notes ?? ""} />
            </label>

            <div className="project-form-footer">
              <p className={requiredDocumentsReady ? "form-success" : "form-error"}>
                {requiredDocumentsReady
                  ? "Pieces obligatoires presentes : le recueil peut passer en validation."
                  : "Validation bloquee : pieces obligatoires manquantes."}
              </p>
              <button className="cf360-add-btn" type="submit" disabled={isSavingNeeds}>
                <ClipboardCheck size={14} aria-hidden />
                {isSavingNeeds ? "Enregistrement..." : "Enregistrer le recueil"}
              </button>
            </div>
            {needsState.message && (
              <p className={needsState.status === "success" ? "form-success" : "form-error"}>{needsState.message}</p>
            )}
          </form>
        </section>
      )}

      <section className="project-workflow-grid">
        {workflow.map((step, index) => (
          <article key={step.key} className={`project-step project-step--${statusClass[step.status]}`}>
            <div className="project-step-index">{String(index + 1).padStart(2, "0")}</div>
            <div className="project-step-body">
              <div className="project-step-title">
                <h4>{step.title}</h4>
                <span>{statusLabels[step.status]}</span>
              </div>
              <p>{step.description}</p>
              <div className="project-step-lists">
                <div>
                  <small>Livrables</small>
                  {step.deliverables.map((item) => <b key={item}>{item}</b>)}
                </div>
                <div>
                  <small>Canaux</small>
                  {step.channels.map((item) => <b key={item}>{item}</b>)}
                </div>
              </div>
              {activeProject && (
                <form action={updateBorrowerWorkflowAction} className="project-step-actions">
                  <input type="hidden" name="projectId" value={activeProject.id} />
                  <input type="hidden" name="clientId" value={clientId} />
                  <input type="hidden" name="stepKey" value={step.key} />
                  {step.key === "subscription" && (
                    <input name="subscriptionLink" placeholder="Lien de souscription compagnie" />
                  )}
                  {step.key === "advice" && (
                    <input name="clientComment" placeholder="Commentaire client eventuel" />
                  )}
                  {step.status === "todo" && (
                    <button name="workflowAction" value="start" type="submit">
                      <PlayCircle size={13} aria-hidden /> Demarrer
                    </button>
                  )}
                  {(step.key === "mission" || step.key === "advice" || step.key === "subscription") && step.status !== "done" && (
                    <button name="workflowAction" value="send" type="submit">
                      <Send size={13} aria-hidden /> Envoyer
                    </button>
                  )}
                  {(step.key === "mission" || step.key === "advice") && step.status !== "done" && (
                    <button name="workflowAction" value="sign" type="submit">
                      <FileSignature size={13} aria-hidden /> Signer
                    </button>
                  )}
                  {step.key !== "activation" && step.status !== "done" && (
                    <button name="workflowAction" value="complete" type="submit">
                      <CheckCircle2 size={13} aria-hidden /> Valider
                    </button>
                  )}
                  {step.key === "activation" && step.status !== "done" && (
                    <button name="workflowAction" value="activate" type="submit">
                      <CheckCircle2 size={13} aria-hidden /> Activer dossier
                    </button>
                  )}
                </form>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="project-documents-gate">
        <div className="project-documents-header">
          <div>
            <h3>Pieces obligatoires du recueil emprunteur</h3>
            <p>Le recueil peut etre saisi par le client, le courtier ou un MIA, mais sa validation reste bloquee sans les justificatifs requis.</p>
          </div>
          <LockKeyhole size={22} aria-hidden />
        </div>
        <div className="project-document-list">
          {documentRequirements.map((document) => (
            <article key={document.key}>
              <div>
                {document.requiredForValidation ? <LockKeyhole size={15} aria-hidden /> : <FileText size={15} aria-hidden />}
                <strong>{document.label}</strong>
              </div>
              <span>{document.requiredForValidation ? "Bloquant" : "Complementaire"} - {document.status}</span>
              <small>{document.acceptedSources.join(" / ")}</small>
            </article>
          ))}
        </div>
      </section>

      {activeProject && (
        <section className="project-traceability-grid">
          <article>
            <h4>Envois</h4>
            {deliveries.length > 0 ? deliveries.slice(0, 4).map((delivery) => (
              <p key={delivery.id}>{delivery.delivery_type} - {delivery.channel} - {delivery.status}</p>
            )) : <p>Aucun envoi journalise.</p>}
          </article>
          <article>
            <h4>Signatures</h4>
            {signatures.length > 0 ? signatures.slice(0, 4).map((signature) => (
              <p key={signature.id}>{signature.signature_type} - {signature.status}</p>
            )) : <p>Aucune signature en attente.</p>}
          </article>
          <article>
            <h4>Imports Gmail</h4>
            {imports.length > 0 ? imports.slice(0, 4).map((item) => (
              <p key={item.id}>
                <ExternalLink size={12} aria-hidden /> {item.subject ?? "Email rattache"} ({item.attachment_count} piece(s))
              </p>
            )) : <p>Aucun email rattache au projet.</p>}
          </article>
        </section>
      )}

      <section className="project-automation-grid">
        <article>
          <UploadCloud size={18} aria-hidden />
          <h4>Documents recus</h4>
          <p>Le client peut deposer depuis son espace. Le courtier ou le MIA peuvent ajouter les pieces au dossier.</p>
        </article>
        <article>
          <Inbox size={18} aria-hidden />
          <h4>Import Gmail</h4>
          <p>Les emails du prospect peuvent etre rattaches au projet avec pieces jointes, resume IA et journalisation.</p>
        </article>
        <article>
          <FileSignature size={18} aria-hidden />
          <h4>Signatures</h4>
          <p>Feuille de mission et fiche conseil sont envoyees par mail et dans l'espace client, puis archivees apres signature.</p>
        </article>
        <article>
          <PenLine size={18} aria-hidden />
          <h4>Commentaire client</h4>
          <p>Le client peut signer la fiche conseil et ajouter un commentaire avant l'envoi du lien de souscription.</p>
        </article>
        <article>
          <CheckCircle2 size={18} aria-hidden />
          <h4>Anti ressaisie</h4>
          <p>Chaque information ajoutee au recueil est conservee sur la fiche client et reutilisee pour devis, conseil et souscription.</p>
        </article>
      </section>
    </div>
  );
}
