"use client";

import { useActionState } from "react";
import {
  CheckCircle2,
  ClipboardCheck,
  FileSignature,
  FileText,
  Inbox,
  LockKeyhole,
  Mail,
  PenLine,
  Send,
  UploadCloud,
} from "lucide-react";
import { createBorrowerProjectAction, type ProjectActionState } from "@/lib/actions/projects";
import {
  borrowerRequiredDocuments,
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
  const borrowerProjects = projects.filter((project) => project.project_type === "assurance_emprunteur");
  const activeProject = borrowerProjects[0] ?? null;
  const workflow = getBorrowerWorkflow(activeProject);

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
            <small>Statut CRM : {activeProject.status}</small>
          </div>
          <div className="project-action-row">
            <button type="button"><Mail size={14} aria-hidden /> Envoyer par mail</button>
            <button type="button"><Send size={14} aria-hidden /> Publier espace client</button>
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
          {borrowerRequiredDocuments.map((document) => (
            <article key={document.key}>
              <div>
                {document.requiredForValidation ? <LockKeyhole size={15} aria-hidden /> : <FileText size={15} aria-hidden />}
                <strong>{document.label}</strong>
              </div>
              <span>{document.requiredForValidation ? "Bloquant" : "Complementaire"}</span>
              <small>{document.acceptedSources.join(" / ")}</small>
            </article>
          ))}
        </div>
      </section>

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
