"use client";

import { useActionState } from "react";
import { MailPlus, Send } from "lucide-react";
import {
  inviteClientToPortalAction,
  type InviteClientActionState,
} from "@/lib/actions/clients";

type ClientPortalInviteButtonProps = {
  clientId: string;
  email?: string | null;
  inviteSentAt?: string | null;
  hasPortalAccount?: boolean;
};

const initialState: InviteClientActionState = {
  status: "idle",
  message: "",
};

export function ClientPortalInviteButton({
  clientId,
  email,
  inviteSentAt,
  hasPortalAccount,
}: ClientPortalInviteButtonProps) {
  const [state, formAction, isPending] = useActionState(inviteClientToPortalAction, initialState);
  const disabled = isPending || !email;
  const label = hasPortalAccount ? "Renvoyer un lien" : inviteSentAt ? "Renvoyer l'invitation" : "Inviter espace client";

  return (
    <form action={formAction} className="client-portal-invite">
      <input type="hidden" name="clientId" value={clientId} />
      <button type="submit" className="cf360-edit-btn cf360-invite-btn" disabled={disabled}>
        {isPending ? <Send size={14} aria-hidden /> : <MailPlus size={14} aria-hidden />}
        {isPending ? "Envoi..." : label}
      </button>
      {!email && <small>Ajoutez un email pour envoyer le lien.</small>}
      {state.message && (
        <small className={state.status === "success" ? "invite-success" : "invite-error"}>
          {state.message}
        </small>
      )}
    </form>
  );
}
