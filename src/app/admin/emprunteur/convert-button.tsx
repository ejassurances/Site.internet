"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { convertDossierToClient } from "@/lib/actions/emprunteur";
import { Loader2, UserPlus } from "lucide-react";

export function ConvertDossierButton({ dossierId }: { dossierId: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  async function handleConvert() {
    if (loading || done) return;
    setLoading(true);
    const result = await convertDossierToClient(dossierId);
    setLoading(false);
    if (result.success) {
      setDone(true);
      router.refresh();
      if (result.clientId) {
        router.push(`/admin/clients/${result.clientId}`);
      }
    } else {
      alert(result.error ?? "Erreur lors de la conversion.");
    }
  }

  return (
    <button
      className="emprunteur-convert-btn"
      onClick={handleConvert}
      disabled={loading || done}
      aria-label="Convertir en prospect CRM"
    >
      {loading ? (
        <Loader2 size={15} className="spin" aria-hidden />
      ) : (
        <UserPlus size={15} aria-hidden />
      )}
      {done ? "Converti !" : "Créer fiche"}
    </button>
  );
}
