"use client";

import { useActionState, useMemo, useState } from "react";
import Link from "next/link";
import { createSouscriptionAction, SouscriptionActionState } from "@/app/actions/souscriptions";
import { AssessmentClientOption } from "@/lib/client-records";
import { FieldDef, ProductDef } from "@/lib/souscription";

type Props = {
  product: ProductDef;
  clients: AssessmentClientOption[];
  lockedClientId?: string;
};

const initialActionState: SouscriptionActionState = { status: "idle", message: "" };

function Field({ field }: { field: FieldDef }) {
  const id = `f_${field.name}`;

  if (field.type === "checkbox") {
    return (
      <label className="souscription-check" htmlFor={id}>
        <input id={id} name={field.name} type="checkbox" />
        <span>{field.label}</span>
      </label>
    );
  }

  const label = (
    <span className="souscription-label">
      {field.label}
      {field.required && <em aria-hidden> *</em>}
    </span>
  );

  let control;
  if (field.type === "select") {
    control = (
      <select id={id} name={field.name} defaultValue="" required={field.required}>
        <option value="">Sélectionner…</option>
        {field.options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  } else if (field.type === "textarea") {
    control = <textarea id={id} name={field.name} placeholder={field.placeholder} rows={3} />;
  } else {
    control = (
      <div className={field.suffix ? "souscription-input-suffix" : undefined}>
        <input
          id={id}
          name={field.name}
          type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
          step={field.type === "number" ? "any" : undefined}
          placeholder={field.placeholder}
          required={field.required}
        />
        {field.suffix && <span>{field.suffix}</span>}
      </div>
    );
  }

  return (
    <label className={`souscription-field${field.half ? " half" : ""}`} htmlFor={id}>
      {label}
      {control}
      {field.hint && <small className="souscription-hint">{field.hint}</small>}
    </label>
  );
}

export function SouscriptionRecueilForm({ product, clients, lockedClientId }: Props) {
  const [actionState, formAction, isPending] = useActionState(createSouscriptionAction, initialActionState);
  const [clientId, setClientId] = useState(lockedClientId ?? clients[0]?.id ?? "");

  const selectedClient = useMemo(
    () => clients.find((c) => c.id === clientId),
    [clients, clientId],
  );

  const done = actionState.status === "success";

  return (
    <div className="souscription-layout">
      <form className="souscription-form" action={formAction}>
        <input type="hidden" name="product" value={product.key} />

        <header className="souscription-head">
          <span className="souscription-emoji" aria-hidden>
            {product.icon}
          </span>
          <div>
            <p className="eyebrow">Recueil des besoins</p>
            <h2>{product.label}</h2>
            <p className="souscription-intro">{product.intro}</p>
          </div>
        </header>

        <section className="souscription-card">
          <h3>Fiche client</h3>
          <label className="souscription-field" htmlFor="clientId">
            <span className="souscription-label">
              Client concerné<em aria-hidden> *</em>
            </span>
            <select
              id="clientId"
              name="clientId"
              value={clientId}
              disabled={Boolean(lockedClientId)}
              onChange={(e) => setClientId(e.target.value)}
              required
            >
              <option value="">Sélectionner une fiche client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          {lockedClientId && <input type="hidden" name="clientId" value={lockedClientId} />}
          {selectedClient && <p className="field-hint">{selectedClient.detail}</p>}
        </section>

        {product.sections.map((section) => (
          <section key={section.title} className="souscription-card">
            <h3>{section.title}</h3>
            {section.description && <p className="souscription-card-desc">{section.description}</p>}
            <div className="souscription-grid">
              {section.fields.map((field) => (
                <Field key={field.name} field={field} />
              ))}
            </div>
          </section>
        ))}

        <div className="form-actions">
          <button className="primary-action" type="submit" disabled={isPending || clients.length === 0}>
            {isPending ? "Génération…" : "Générer la lettre de mission"}
          </button>
        </div>

        {actionState.message && (
          <p className={done ? "form-success" : "form-error"}>{actionState.message}</p>
        )}

        {done && actionState.lettreId && (
          <div className="souscription-success-actions">
            <Link className="secondary-action" href={`/client/lettre-mission/${actionState.lettreId}`}>
              Voir la lettre de mission
            </Link>
          </div>
        )}
      </form>

      <aside className="souscription-preview">
        <div className="souscription-preview-card">
          <p className="eyebrow">Lettre de mission</p>
          <h3>{product.label}</h3>
          <p>
            Le recueil ci-contre sera transformé en <strong>lettre de mission</strong> conforme DDA,
            envoyée au client et signée depuis son espace.
          </p>
        </div>

        <div className="souscription-preview-card">
          <h4>Garanties étudiées</h4>
          <ul className="souscription-guarantees">
            {product.defaultGuarantees.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>

        <div className="souscription-preview-card">
          <h4>Étapes</h4>
          <ol className="souscription-steps">
            <li>Recueil des besoins</li>
            <li>Génération de la lettre de mission</li>
            <li>Signature électronique du client</li>
            <li>Recherche et recommandation</li>
          </ol>
        </div>
      </aside>
    </div>
  );
}
