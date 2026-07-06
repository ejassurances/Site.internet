"use client";

import { useActionState } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { syncDriveAction, DriveSyncActionState, DriveSyncStatus } from "@/lib/actions/drive-sync";

const initialState: DriveSyncActionState = { status: "idle", message: "" };

export function DriveSyncPanel({ status }: { status: DriveSyncStatus }) {
  const [state, formAction, isPending] = useActionState(syncDriveAction, initialState);

  const totalMissing = status.clientsMissing + status.partnersMissing + status.productsMissing;

  return (
    <div className="ops-card ops-form">
      <div className="ops-card-title">
        <RefreshCw size={18} aria-hidden />
        <h2>Synchroniser le CRM vers Google Drive</h2>
      </div>

      <p style={{ marginTop: 0, color: "var(--muted, #5c6a76)", fontSize: 14, lineHeight: 1.6 }}>
        Crée les dossiers Drive manquants pour les clients, les partenaires et leurs produits
        (avec les sous-dossiers KYC, Conventions, CG, IPID…). Les éléments déjà synchronisés sont ignorés.
      </p>

      {!status.configured && (
        <p className="form-error">
          ⚠️ Identifiants Google Drive non configurés (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET /
          GOOGLE_REFRESH_TOKEN). La synchronisation ne pourra pas s'exécuter tant qu'ils ne sont pas
          renseignés dans Vercel.
        </p>
      )}

      <div className="ops-table" style={{ marginBottom: 16 }}>
        <div className="ops-table-row ops-table-head">
          <span>Type</span>
          <span>À synchroniser</span>
        </div>
        <div className="ops-table-row">
          <span>Clients</span>
          <span>{status.clientsMissing}</span>
        </div>
        <div className="ops-table-row">
          <span>Partenaires</span>
          <span>{status.partnersMissing}</span>
        </div>
        <div className="ops-table-row">
          <span>Produits distribués</span>
          <span>{status.productsMissing}</span>
        </div>
      </div>

      <form action={formAction}>
        <button type="submit" className="btn-primary" disabled={isPending || totalMissing === 0}>
          {isPending ? <Loader2 size={15} className="spin" aria-hidden /> : <RefreshCw size={15} aria-hidden />}{" "}
          {totalMissing === 0 ? "Tout est synchronisé" : `Synchroniser (${totalMissing})`}
        </button>
      </form>

      {state.message && (
        <p className={state.status === "success" ? "form-success" : "form-error"} style={{ marginTop: 12 }}>
          {state.message}
        </p>
      )}
    </div>
  );
}
