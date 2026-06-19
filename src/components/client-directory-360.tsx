"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  Search,
  UserRound,
  Phone,
  Mail,
  Tag,
  ClipboardCheck,
  Filter,
  Plus,
  ChevronRight,
  Calendar,
  Heart,
  Users,
  Home,
  Star,
} from "lucide-react";
import { ClientRecord, formatClientName } from "@/lib/client-records";

// ── Types étendus ──────────────────────────────────────────────────────────────
export type ClientTag = {
  label: string;
  color: string;
};

export type ClientWith360 = ClientRecord & {
  tags?: string[];
  status?: "prospect" | "actif" | "inactif" | "en_cours";
  last_interaction?: string | null;
  contracts_count?: number;
  family_type?: string | null;
};

const STATUS_LABELS: Record<string, string> = {
  prospect: "Prospect",
  actif: "Client actif",
  en_cours: "En cours",
  inactif: "Inactif",
};

const STATUS_COLORS: Record<string, string> = {
  prospect: "#f59e0b",
  actif: "#10b981",
  en_cours: "#3b82f6",
  inactif: "#9ca3af",
};

const FAMILY_ICONS: Record<string, typeof Heart> = {
  "Famille LGBT+": Heart,
  "Coparentalité": Users,
  "Famille recomposée": Home,
  "Couple": Star,
};

const AVAILABLE_TAGS = [
  "Famille LGBT+",
  "Coparentalité",
  "Famille recomposée",
  "Couple",
  "Assurance emprunteur",
  "Prévoyance",
  "Transmission",
  "VIP",
  "À relancer",
  "Dossier urgent",
];

type ClientDirectory360Props = {
  clients: ClientWith360[];
  basePath: "/admin/clients" | "/mandataire/clients";
};

export function ClientDirectory360({ clients, basePath }: ClientDirectory360Props) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("list");

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      const name = formatClientName(c).toLowerCase();
      const email = (c.email ?? "").toLowerCase();
      const phone = (c.phone ?? "").toLowerCase();
      const matchSearch =
        !search ||
        name.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase()) ||
        phone.includes(search.toLowerCase());
      const matchTag = !activeTag || (c.tags ?? []).includes(activeTag);
      const matchStatus = !activeStatus || c.status === activeStatus;
      return matchSearch && matchTag && matchStatus;
    });
  }, [clients, search, activeTag, activeStatus]);

  return (
    <div className="crm-directory">
      {/* ── Header ── */}
      <div className="crm-directory-header">
        <div>
          <p className="eyebrow">CRM — Fichier clients</p>
          <h2>Fiches Clients 360°</h2>
          <p style={{ color: "var(--muted)", marginTop: "4px" }}>
            {clients.length} client{clients.length > 1 ? "s" : ""} · {filtered.length} affiché{filtered.length > 1 ? "s" : ""}
          </p>
        </div>
        <Link href={`${basePath}/nouveau`} className="primary-action">
          <Plus size={18} aria-hidden /> Nouveau client
        </Link>
      </div>

      {/* ── Barre de recherche + filtres ── */}
      <div className="crm-filters">
        <div className="crm-search-wrap">
          <Search size={18} aria-hidden className="crm-search-icon" />
          <input
            className="crm-search"
            type="search"
            placeholder="Rechercher par nom, email, téléphone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="crm-filter-chips">
          <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", fontSize: "13px" }}>
            <Filter size={14} /> Statut :
          </span>
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <button
              key={key}
              className={`crm-chip${activeStatus === key ? " active" : ""}`}
              onClick={() => setActiveStatus(activeStatus === key ? null : key)}
              style={activeStatus === key ? { background: STATUS_COLORS[key], color: "white", borderColor: STATUS_COLORS[key] } : {}}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="crm-filter-chips">
          <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", fontSize: "13px" }}>
            <Tag size={14} /> Tags :
          </span>
          {AVAILABLE_TAGS.slice(0, 6).map((tag) => (
            <button
              key={tag}
              className={`crm-chip${activeTag === tag ? " active" : ""}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Liste ── */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <UserRound size={32} aria-hidden />
          <strong>Aucun client trouvé</strong>
          <p>Modifiez votre recherche ou vos filtres.</p>
        </div>
      ) : (
        <div className="crm-client-list">
          {filtered.map((client) => {
            const name = formatClientName(client);
            const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
            const status = client.status ?? "actif";
            const FamilyIcon = client.family_type ? FAMILY_ICONS[client.family_type] : null;

            return (
              <article key={client.id} className="crm-client-row">
                {/* Avatar */}
                <div className="crm-avatar" aria-hidden>
                  {initials}
                </div>

                {/* Infos principales */}
                <div className="crm-client-main">
                  <div className="crm-client-name-row">
                    <strong>{name}</strong>
                    <span
                      className="crm-status-badge"
                      style={{ background: `${STATUS_COLORS[status]}20`, color: STATUS_COLORS[status] }}
                    >
                      {STATUS_LABELS[status]}
                    </span>
                  </div>

                  <div className="crm-client-meta">
                    {client.email && (
                      <span>
                        <Mail size={13} aria-hidden /> {client.email}
                      </span>
                    )}
                    {client.phone && (
                      <span>
                        <Phone size={13} aria-hidden /> {client.phone}
                      </span>
                    )}
                    {client.family_type && (
                      <span>
                        {FamilyIcon && <FamilyIcon size={13} aria-hidden />}
                        {client.family_type}
                      </span>
                    )}
                    {client.last_interaction && (
                      <span>
                        <Calendar size={13} aria-hidden /> Dernier contact : {new Date(client.last_interaction).toLocaleDateString("fr-FR")}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {(client.tags ?? []).length > 0 && (
                    <div className="crm-tags">
                      {(client.tags ?? []).map((tag) => (
                        <span key={tag} className="crm-tag">
                          <Tag size={11} aria-hidden /> {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stats rapides */}
                <div className="crm-client-stats">
                  <div>
                    <strong>{client.contracts_count ?? 0}</strong>
                    <small>contrat{(client.contracts_count ?? 0) > 1 ? "s" : ""}</small>
                  </div>
                  <div>
                    <strong>{(client.needs_assessments ?? []).length}</strong>
                    <small>recueil{(client.needs_assessments ?? []).length > 1 ? "s" : ""}</small>
                  </div>
                </div>

                {/* Actions */}
                <div className="crm-client-actions">
                  <Link href={`${basePath}/${client.id}`} className="crm-action-btn primary">
                    Fiche 360° <ChevronRight size={15} aria-hidden />
                  </Link>
                  <Link href={`/admin/family-protection-os/recueil?client=${client.id}`} className="crm-action-btn">
                    <ClipboardCheck size={15} aria-hidden /> Recueil
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
