import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { getClientsList } from "@/lib/actions/clients";
import {
  Users, UserPlus, Search, Phone, Mail, FileText,
  ChevronRight, Tag, TrendingUp, Filter, Star
} from "lucide-react";

export const metadata: Metadata = { title: "Clients 360° — CRM EJ Partners" };

const STATUT_CONFIG: Record<string, { label: string; dot: string; bg: string; color: string }> = {
  prospect:  { label: "Prospect",      dot: "#f59e0b", bg: "#fef3c720", color: "#92400e" },
  actif:     { label: "Client actif",  dot: "#10b981", bg: "#d1fae520", color: "#065f46" },
  en_cours:  { label: "En cours",      dot: "#3b82f6", bg: "#dbeafe20", color: "#1e40af" },
  inactif:   { label: "Inactif",       dot: "#9ca3af", bg: "#f3f4f620", color: "#6b7280" },
};

const FAMILY_ICONS: Record<string, string> = {
  "coparentalité": "👨‍👩‍👧",
  "famille recomposée": "👨‍👩‍👧‍👦",
  "famille homoparentale": "🏳️‍🌈",
  "lgbt": "🏳️‍🌈",
  "monoparentale": "👤",
};

function getFamilyIcon(context?: string | null): string {
  if (!context) return "👤";
  const lower = context.toLowerCase();
  for (const [key, icon] of Object.entries(FAMILY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "👤";
}

function getAvatarGradient(name: string): string {
  const gradients = [
    "linear-gradient(135deg, #1e3a5f, #2d5a8e)",
    "linear-gradient(135deg, #b8860b, #d4a017)",
    "linear-gradient(135deg, #1a4a3a, #2d7a5f)",
    "linear-gradient(135deg, #4a1a6b, #7c3aed)",
    "linear-gradient(135deg, #1a3a6b, #2563eb)",
    "linear-gradient(135deg, #6b1a1a, #dc2626)",
  ];
  const idx = name.charCodeAt(0) % gradients.length;
  return gradients[idx];
}

const CONTACT_TYPE_TABS = [
  { value: "", label: "Tous", icon: "👥" },
  { value: "prospect", label: "Prospects", icon: "🎯" },
  { value: "client", label: "Clients", icon: "⭐" },
  { value: "partenaire", label: "Partenaires", icon: "🤝" },
  { value: "prescripteur", label: "Prescripteurs", icon: "📣" },
];

export default async function AdminClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; statut?: string; type?: string }>;
}) {
  const user = await requireRole(["admin", "courtier"]).catch(() => null);
  if (!user) redirect("/connexion");

  const params = await searchParams;
  const clients = await getClientsList({
    search: params.search,
    statut: params.statut,
    contact_type: params.type || undefined,
  });

  const stats = {
    total: clients.length,
    clients: clients.filter((c) => (c as { contact_type?: string }).contact_type === "client").length,
    prospects: clients.filter((c) => (c as { contact_type?: string }).contact_type === "prospect").length,
    partenaires: clients.filter((c) => (c as { contact_type?: string }).contact_type === "partenaire").length,
    prescripteurs: clients.filter((c) => (c as { contact_type?: string }).contact_type === "prescripteur").length,
  };

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="crm-page">

        {/* ── Header ── */}
        <div className="crm-page-header">
          <div className="crm-page-header-text">
            <div className="crm-page-eyebrow">
              <Users size={14} aria-hidden />
              <span>CRM · Fiches Clients</span>
            </div>
            <h1 className="crm-page-title">Clients 360°</h1>
            <p className="crm-page-subtitle">
              Tout l&apos;historique de vos assurés et prospects centralisé en un seul endroit.
            </p>
          </div>
          <Link href="/admin/clients/nouveau" className="crm-new-btn">
            <UserPlus size={18} aria-hidden />
            <span>Nouveau client</span>
          </Link>
        </div>

        {/* ── KPIs ── */}
        <div className="crm-kpis-row">
          <div className="crm-kpi-item crm-kpi-total">
            <div className="crm-kpi-icon-wrap">
              <Users size={20} aria-hidden />
            </div>
            <div>
              <span className="crm-kpi-num">{stats.total}</span>
              <span className="crm-kpi-lbl">Total clients</span>
            </div>
          </div>
          <div className="crm-kpi-item crm-kpi-actif">
            <div className="crm-kpi-icon-wrap">
              <Star size={20} aria-hidden />
            </div>
            <div>
              <span className="crm-kpi-num">{stats.clients}</span>
              <span className="crm-kpi-lbl">Clients</span>
            </div>
          </div>
          <div className="crm-kpi-item crm-kpi-prospect">
            <div className="crm-kpi-icon-wrap">
              <TrendingUp size={20} aria-hidden />
            </div>
            <div>
              <span className="crm-kpi-num">{stats.prospects}</span>
              <span className="crm-kpi-lbl">Prospects</span>
            </div>
          </div>
          <div className="crm-kpi-item crm-kpi-encours">
            <div className="crm-kpi-icon-wrap">
              <FileText size={20} aria-hidden />
            </div>
            <div>
              <span className="crm-kpi-num">{stats.partenaires + stats.prescripteurs}</span>
              <span className="crm-kpi-lbl">Partenaires & prescripteurs</span>
            </div>
          </div>
        </div>

        {/* ── Onglets par type de contact ── */}
        <div className="crm-type-tabs">
          {CONTACT_TYPE_TABS.map((tab) => (
            <Link
              key={tab.value}
              href={`/admin/clients${tab.value ? `?type=${tab.value}` : ""}`}
              className={`crm-type-tab ${(params.type ?? "") === tab.value ? "crm-type-tab--active" : ""}`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          ))}
        </div>

        {/* ── Barre de recherche & filtres ── */}
        <form method="GET" className="crm-search-bar">
          <div className="crm-search-input-wrap">
            <Search size={16} aria-hidden className="crm-search-icon" />
            <input
              type="text"
              name="search"
              placeholder="Rechercher un client par nom, email ou téléphone…"
              defaultValue={params.search ?? ""}
              className="crm-search-input"
            />
          </div>
          <div className="crm-filter-wrap">
            <Filter size={14} aria-hidden />
            <select name="statut" defaultValue={params.statut ?? ""} className="crm-filter-select">
              <option value="">Tous les statuts</option>
              <option value="prospect">Prospect</option>
              <option value="en_cours">En cours</option>
              <option value="actif">Client actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
          {params.type && <input type="hidden" name="type" value={params.type} />}
          <button type="submit" className="crm-filter-btn">Rechercher</button>
          {(params.search || params.statut) && (
            <Link href={`/admin/clients${params.type ? `?type=${params.type}` : ""}`} className="crm-reset-btn">✕ Réinitialiser</Link>
          )}
        </form>

        {/* ── Liste ── */}
        {clients.length === 0 ? (
          <div className="crm-empty">
            <div className="crm-empty-icon">
              <Users size={40} aria-hidden />
            </div>
            <h3>Aucun client trouvé</h3>
            <p>
              {params.search || params.statut
                ? "Aucun résultat pour ces critères. Modifiez votre recherche."
                : "Votre CRM est vide. Créez votre première fiche client pour commencer."}
            </p>
            <Link href="/admin/clients/nouveau" className="crm-new-btn">
              <UserPlus size={16} aria-hidden /> Créer un client
            </Link>
          </div>
        ) : (
          <div className="crm-clients-grid">
            {clients.map((client) => {
              const statut_client = (client as { statut_client?: string }).statut_client ?? "prospect";
              const contact_type = (client as { contact_type?: string }).contact_type ?? "prospect";
              const statusCfg = STATUT_CONFIG[statut_client] ?? STATUT_CONFIG.prospect;
              const contactTypeLabel: Record<string, string> = {
                prospect: "🎯 Prospect", client: "⭐ Client",
                partenaire: "🤝 Partenaire", prescripteur: "📣 Prescripteur",
              };
              const tags: { tag: string }[] = (client as { client_tags?: { tag: string }[] }).client_tags ?? [];
              const contracts: { id: string; status: string }[] =
                (client as { contracts?: { id: string; status: string }[] }).contracts ?? [];
              const activeCount = contracts.filter((c) => c.status === "active").length;
              const name = client.full_name ?? "Client sans nom";
              const familyIcon = getFamilyIcon(client.family_context as string | undefined);

              return (
                <Link
                  key={client.id}
                  href={`/admin/clients/${client.id}`}
                  className="crm-client-tile"
                >
                  {/* Avatar + statut */}
                  <div className="crm-tile-top">
                    <div
                      className="crm-tile-avatar"
                      style={{ background: getAvatarGradient(name) }}
                    >
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                      <span className="crm-tile-contact-type">{contactTypeLabel[contact_type] ?? contact_type}</span>
                      <span
                        className="crm-tile-status"
                        style={{ background: statusCfg.bg, color: statusCfg.color }}
                      >
                        <span
                          className="crm-tile-status-dot"
                          style={{ background: statusCfg.dot }}
                        />
                        {statusCfg.label}
                      </span>
                    </div>
                  </div>

                  {/* Nom + contexte */}
                  <div className="crm-tile-body">
                    <h3 className="crm-tile-name">{name}</h3>
                    {client.family_context && (
                      <p className="crm-tile-context">
                        <span className="crm-tile-context-icon">{familyIcon}</span>
                        {client.family_context as string}
                      </p>
                    )}
                  </div>

                  {/* Coordonnées */}
                  <div className="crm-tile-contact">
                    {client.email && (
                      <span className="crm-tile-contact-item">
                        <Mail size={11} aria-hidden />
                        {client.email as string}
                      </span>
                    )}
                    {client.phone && (
                      <span className="crm-tile-contact-item">
                        <Phone size={11} aria-hidden />
                        {client.phone as string}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="crm-tile-tags">
                      {tags.slice(0, 2).map((t) => (
                        <span key={t.tag} className="crm-tile-tag">{t.tag}</span>
                      ))}
                      {tags.length > 2 && (
                        <span className="crm-tile-tag crm-tile-tag-more">+{tags.length - 2}</span>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="crm-tile-footer">
                    <span className="crm-tile-contracts">
                      <FileText size={12} aria-hidden />
                      {activeCount} contrat{activeCount !== 1 ? "s" : ""}
                    </span>
                    <span className="crm-tile-arrow">
                      Voir la fiche <ChevronRight size={13} aria-hidden />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
