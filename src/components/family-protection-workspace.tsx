import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileText, ShieldAlert } from "lucide-react";
import {
  advisorQuestions,
  complianceOutputs,
  ddaWorkflow,
  fposModules,
  riskDomains,
} from "@/lib/family-protection-os";

type WorkspaceProps = {
  mode: "admin" | "mandataire" | "client";
};

export function FamilyProtectionWorkspace({ mode }: WorkspaceProps) {
  const isClient = mode === "client";

  return (
    <div className="fpos-space">
      <section className="fpos-hero">
        <div>
          <p className="eyebrow">Methode cabinet</p>
          <h2>{isClient ? "Mon diagnostic familial" : "Analyse familiale et assurantielle"}</h2>
          <p>
            {isClient
              ? "Un parcours guide pour exprimer votre situation familiale, vos objectifs et les personnes que vous souhaitez proteger."
              : "Un cadre de travail pour relier la situation familiale, les besoins exprimes, les risques detectes et les recommandations du cabinet."}
          </p>
        </div>
        <div className="fpos-score">
          <span>Niveau de protection</span>
          <strong>57</strong>
          <small>Indicateur de travail, a valider par le conseiller</small>
        </div>
      </section>

      <section className="fpos-actions">
        <Link href={isClient ? "/client/diagnostic-familial" : "/admin/family-protection-os/recueil"}>
          <ClipboardCheck size={20} aria-hidden />
          Demarrer un recueil des besoins
          <ArrowRight size={16} aria-hidden />
        </Link>
        <Link href="/assurance-emprunteur">
          <FileText size={20} aria-hidden />
          Parcours assurance emprunteur
          <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <section className="risk-grid" aria-label="Scores de risque">
        {riskDomains.map((risk) => {
          const Icon = risk.icon;
          return (
            <article key={risk.label} className="risk-card">
              <div className="risk-card-header">
                <Icon size={20} aria-hidden />
                <strong>{risk.label}</strong>
                <span>{risk.score}/100</span>
              </div>
              <div className="risk-bar" aria-hidden>
                <span style={{ width: `${risk.score}%` }} />
              </div>
              <p>{risk.detail}</p>
            </article>
          );
        })}
      </section>

      {!isClient && (
        <section className="fpos-columns">
          <article className="fpos-panel">
            <h3>Modules de production</h3>
            <div className="module-list">
              {fposModules.map((module) => (
                <div key={module.title}>
                  <strong>{module.title}</strong>
                  <p>{module.description}</p>
                  <small>{module.status}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="fpos-panel">
            <h3>Questions clés du conseiller</h3>
            <ul className="clean-list">
              {advisorQuestions.map((question) => (
                <li key={question}>
                  <ShieldAlert size={16} aria-hidden />
                  {question}
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}

      <section className="fpos-columns">
        <article className="fpos-panel">
          <h3>Parcours d'accompagnement</h3>
          <ol className="timeline-list">
            {ddaWorkflow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
        <article className="fpos-panel">
          <h3>Preuves de conseil</h3>
          <div className="proof-grid">
            {complianceOutputs.map((output) => {
              const Icon = output.icon;
              return (
                <span key={output.label}>
                  <Icon size={16} aria-hidden />
                  {output.label}
                </span>
              );
            })}
          </div>
        </article>
      </section>
    </div>
  );
}
