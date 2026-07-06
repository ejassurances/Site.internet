"use client";

import { useActionState } from "react";
import { FolderPlus, Loader2 } from "lucide-react";
import { ensureMandataireDriveAction, MandataireActionState } from "@/app/actions/mandataires";

const initialState: MandataireActionState = { status: "idle", message: "" };

export function PartenaireEnsureDrive({ mandataireId }: { mandataireId: string }) {
  const [state, formAction, isPending] = useActionState(ensureMandataireDriveAction, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="mandataireId" value={mandataireId} />
      <button className="primary-action" type="submit" disabled={isPending}>
        {isPending ? <Loader2 size={15} className="spin" aria-hidden /> : <FolderPlus size={15} aria-hidden />}{" "}
        Créer le dossier Drive
      </button>
      {state.message && (
        <p className={state.status === "success" ? "form-success" : "form-error"}>{state.message}</p>
      )}
    </form>
  );
}
