import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { getClientsList } from "@/lib/actions/clients";
import {
  Users, UserPlus, Search, Phone, Mail, FileText,
  ChevronRight, Tag, TrendingUp
} from "lucide-react";

export const metadata: Metadata = { title: "Clients 360° — CRM EJ Partners" };

const STATUT_LABELS: Record<string, { label: string; className: string }> = {
  prospect: { label: "Prospect", className: "status-badge status-prospect" },
  actif: { label: "Client actif", className: "status-badge status-active" },
  en_cours: { label: "En cours", className: "status-badge status-pending" },
  inactif: { label: "Inactif", className: "status-badge status-inactive" },
};

export default async function AdminClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; statut?: string }>;
}) {
  const user = await requireRole(["admin", "courtier"]).catch(() => null);
  if (!user) redirect("/connexion");

  const params = await searchParams;
  const clients = await getClientsList({
    search: params.search,
    statut: params.statut,
  });

  const stats = {
    total: clients.length,
    actifs: clients.filter((c) => (c as { statut_client?: string }).statut_client === "actif").length,
    prospects: clients.filter((c) => (c as { statut_client?: string }).statut_client === "prospect").length,
    enCours: clients.filter((c) => (c as { statut_client?: string }).statut_client === "en_cours").length,
  };

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h1><Users size={22} aria-hidden /> Fiches Clients 360°</h1>
          <p className="admin-page-subtitle">
            {stats.total} client{stats.total !== 1 ? "s" : ""} —{" "}
            {stats.actifs} actif{stats.actifs !== 1 ? "s" : ""},{" "}
            {stats.prospects} prospect{stats.prospects !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="admin-page-header-actions">
          <Link href="/admin/clients/nouveau" className="primary-action">
            <UserPlus size={16} aria-hidden /> Nouveau client
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="crm-stats-row">
        {[
          { label: "Total clients", value: stats.total, icon: Users, color: "navy" },
          { label: "Clients actifs", value: stats.actifs, icon: TrendingUp, color: "green" },
          { label: "Prospects", value: stats.prospects, icon: UserPlus, color: "gold" },
          { label: "En cours", value: stats.enCours, icon: FileText, color: "blue" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={`crm-stat-card crm-stat-${color}`}>
            <Icon size={20} aria-hidden />
            <div>
              <span className="crm-stat-value">{value}</span>
              <span className="crm-stat-label">{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <form method="GET" className="crm-filters-bar">
        <div className="crm-search-box">
          <Search size={16} aria-hidden />
          <input
            type="text"
            name="search"
            placeholder="Rechercher par nom, email, téléphone…"
            defaultValue={params.search ?? ""}
          />
        </div>
        <select name="statut" defaultValue={params.statut ?? ""}>
          <option value="">Tous les statuts</option>
          <option value="prospect">Prospect</option>
          <option value="en_cours">En cours</option>
          <option value="actif">Client actif</option>
          <option value="inactif">Inactif</option>
        </select>
        <button type="submit" className="secondary-action">Filtrer</button>
        {(params.search || params.statut) && (
          <Link href="/admin/clients" className="secondary-action">Réinitialiser</Link>
        )}
      </form>

      {/* Liste */}
      {clients.length === 0 ? (
        <div className="crm-empty-state">
          <Users size={48} aria-hidden />
          <h3>Aucun client trouvé</h3>
          <p>
            {params.search || params.statut
              ? "Aucun résultat pour ces filtres. Essayez une autre recherche."
              : "Commencez par créer votre première fiche client."}
          </p>
          <Link href="/admin/clients/nouveau" className="primary-action">
            <UserPlus size={16} aria-hidden /> Créer un client
          </Link>
        </div>
      ) : (
        <div className="crm-client-list">
          {clients.map((client) => {
            const statut_client = (client as { statut_client?: string }).statut_client ?? "prospect";
            const statut = STATUT_LABELS[statut_client] ?? STATUT_LABELS.prospect;
            const tags: { tag: string }[] = (client as { client_tags?: { tag: string }[] }).client_tags ?? [];
            const contracts: { id: string; contract_type: string; status: string; insurer_name: string }[] =
              (client as { contracts?: { id: string; contract_type: string; status: string; insurer_name: string }[] }).contracts ?? [];
            const activeContracts = contracts.filter((c) => c.status === "active");

            return (
              <Link
                key={client.id}
                href={`/admin/clients/${client.id}`}
                className="crm-client-card"
              >
                <div className="crm-client-avatar">
                  {(client.full_name ?? "?").charAt(0).toUpperCase()}
                </div>
                <div className="crm-client-info">
                  <div className="crm-client-name-row">
                    <span className="crm-client-name">{client.full_name ?? "Client sans nom"}</span>
                    <span className={statut.className}>{statut.label}</span>
                  </div>
                  <div className="crm-client-meta">
                    {client.email && (
                      <span><Mail size={12} aria-hidden /> {client.email}</span>
                    )}
                    {client.phone && (
                      <span><Phone size={12} aria-hidden /> {client.phone}</span>
                    )}
                    {client.family_context && (
                      <span className="crm-client-context">{client.family_context}</span>
                    )}
                  </div>
                  {tags.length > 0 && (
                    <div className="crm-client-tags">
                      <Tag size={11} aria-hidden />
                      {tags.slice(0, 3).map((t) => (
                        <span key={t.tag} className="crm-tag">{t.tag}</span>
                      ))}
                      {tags.length > 3 && (
                        <span className="crm-tag crm-tag-more">+{tags.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="crm-client-contracts">
                  <span className="crm-contracts-count">
                    <FileText size={14} aria-hidden />
                    {activeContracts.length} contrat{activeContracts.length !== 1 ? "s" : ""}
                  </span>
                  <ChevronRight size={16} aria-hidden className="crm-chevron" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
