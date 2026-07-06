"use client";

import { useActionState } from "react";
import { Printer, CheckCircle2, PenLine } from "lucide-react";
import { signLettreMissionAction, SignatureActionState } from "@/app/actions/souscriptions";

export type LettreMissionViewData = {
  id: string;
  reference: string;
  contentHtml: string;
  status: string;
  signedByName: string | null;
  signedAt: string | null;
  signerIp: string | null;
};

type Props = {
  lettre: LettreMissionViewData;
  canSign: boolean;
};

const initialState: SignatureActionState = { status: "idle", message: "" };

function formatDate(iso: string | null) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("fr-FR");
  } catch {
    return iso;
  }
}

export function LettreMissionView({ lettre, canSign }: Props) {
  const [state, formAction, isPending] = useActionState(signLettreMissionAction, initialState);
  const isSigned = lettre.status === "signee" || state.status === "success";

  return (
    <div className="lm-view">
      <div className="lm-toolbar">
        <div>
          <p className="eyebrow">Lettre de mission</p>
          <strong>{lettre.reference}</strong>
        </div>
        <button type="button" className="secondary-action" onClick={() => window.print()}>
          <Printer size={16} aria-hidden /> Imprimer / PDF
        </button>
      </div>

      <div className="lm-paper" dangerouslySetInnerHTML={{ __html: lettre.contentHtml }} />

      {isSigned ? (
        <div className="lm-signed">
          <CheckCircle2 size={20} aria-hidden />
          <div>
            <strong>Lettre signée</strong>
            <p>
              {lettre.signedByName ? `Signée par ${lettre.signedByName}` : "Signature enregistrée"}
              {lettre.signedAt ? ` le ${formatDate(lettre.signedAt)}` : ""}
              {lettre.signerIp ? ` — IP ${lettre.signerIp}` : ""}
            </p>
          </div>
        </div>
      ) : canSign ? (
        <form className="lm-sign-form" action={formAction}>
          <input type="hidden" name="lettreId" value={lettre.id} />
          <h3>
            <PenLine size={18} aria-hidden /> Signer la lettre de mission
          </h3>
          <label className="souscription-field">
            <span className="souscription-label">
              Nom et prénom<em aria-hidden> *</em>
            </span>
            <input name="signerName" type="text" placeholder="Votre nom et prénom" required />
          </label>
          <label className="souscription-check">
            <input name="consent" type="checkbox" required />
            <span>
              Je reconnais avoir pris connaissance de la lettre de mission et j'accepte de confier au cabinet
              la mission décrite. Je consens à la signature électronique.
            </span>
          </label>
          <button className="primary-action" type="submit" disabled={isPending}>
            {isPending ? "Signature…" : "Signer électroniquement"}
          </button>
          {state.message && (
            <p className={state.status === "success" ? "form-success" : "form-error"}>{state.message}</p>
          )}
        </form>
      ) : (
        <p className="field-hint lm-pending">En attente de signature du client.</p>
      )}
    </div>
  );
}
