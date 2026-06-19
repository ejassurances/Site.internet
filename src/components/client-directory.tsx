import Link from "next/link";
import { ClipboardCheck, UserRound } from "lucide-react";
import { ClientRecord, formatClientName } from "@/lib/client-records";

type ClientDirectoryProps = {
  clients: ClientRecord[];
  basePath: "/admin/clients" | "/mandataire/clients";
};

export function ClientDirectory({ clients, basePath }: ClientDirectoryProps) {
  return (
    <section className="client-directory">
      <div className="section-heading">
        <p className="eyebrow">Fichier client</p>
        <h2>Clients et recueils rattachés</h2>
        <p>Chaque recueil des besoins est créé depuis une fiche client et reste consultable dans son dossier.</p>
      </div>

      <div className="client-list">
        {clients.length === 0 && (
          <article className="empty-state">
            <UserRound size={22} aria-hidden />
            <strong>Aucun client visible</strong>
            <p>Ajoute une fiche client ou vérifie les droits du compte connecté.</p>
          </article>
        )}

        {clients.map((client) => (
          <article className="client-row" key={client.id}>
            <div>
              <strong>{formatClientName(client)}</strong>
              <p>{[client.email, client.phone, client.family_context].filter(Boolean).join(" · ") || "Fiche client"}</p>
            </div>
            <Link href={`${basePath}/${client.id}`}>
              <ClipboardCheck size={18} aria-hidden />
              Ouvrir la fiche
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
