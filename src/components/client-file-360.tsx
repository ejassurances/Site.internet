"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Phone,
  Mail,
  Tag,
  ClipboardCheck,
  FileText,
  MessageSquare,
  Users,
  Shield,
  Calendar,
  Edit3,
  Plus,
  ChevronRight,
  Heart,
  Home,
  Star,
  PhoneCall,
  Video,
  AtSign,
  Paperclip,
  StickyNote,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { ClientRecord, formatClientName } from "@/lib/client-records";

// ── Types ──────────────────────────────────────────────────────────────────────

export type Interaction = {
  id: string;
  type: "appel" | "email" | "rdv" | "visio" | "note" | "document";
  date: string;
  summary: string;
  author?: string;
  attachments?: string[];
};

export type Contract = {
  id: string;
  type: string;
  compagnie: string;
  numero?: string;
  statut: "actif" | "en_attente" | "resilie" | "en_cours";
  date_effet?: string;
  prime_annuelle?: number;
  beneficiaires?: string[];
};

export type LinkedPerson = {
  id: string;
  name: string;
  relation: "conjoint" | "enfant" | "parent_social" | "coparent" | "autre";
  birthdate?: string;
  notes?: string;
};

export type ClientFull = ClientRecord & {
  tags?: string[];
  status?: "prospect" | "actif" | "inactif" | "en_cours";
  family_type?: string | null;
  interactions?: Interaction[];
  contracts?: Contract[];
  linked_persons?: LinkedPerson[];
  protection_score?: number;
};

// ── Helpers ────────────────────────────────────────────────────────────────────

const INTERACTION_ICONS: Record<string, typeof PhoneCall> = {
  appel: PhoneCall,
  email: AtSign,
  rdv: Calendar,
  visio: Video,
  note: StickyNote,
  document: Paperclip,
};

const INTERACTION_LABELS: Record<string, string> = {
  appel: "Appel",
  email: "Email",
  rdv: "Rendez-vous",
  visio: "Visio",
  note: "Note",
  document: "Document",
};

const CONTRACT_STATUS_COLORS: Record<string, string> = {
  actif: "#10b981",
  en_attente: "#f59e0b",
  en_cours: "#3b82f6",
  resilie: "#ef4444",
};

const CONTRACT_STATUS_LABELS: Record<string, string> = {
  actif: "Actif",
  en_attente: "En attente",
  en_cours: "En cours",
  resilie: "Résilié",
};

const RELATION_LABELS: Record<string, string> = {
  conjoint: "Conjoint(e) / Partenaire",
  enfant: "Enfant",
  parent_social: "Parent social",
  coparent: "Co-parent",
  autre: "Autre lien",
};

const RELATION_ICONS: Record<string, typeof Heart> = {
  conjoint: Heart,
  enfant: Star,
  parent_social: Users,
  coparent: Users,
  autre: Users,
};

const TABS = [
  { id: "synthese", label: "Synthèse", icon: TrendingUp },
  { id: "interactions", label: "Interactions", icon: MessageSquare },
  { id: "contrats", label: "Contrats", icon: Shield },
  { id: "personnes", label: "Personnes liées", icon: Users },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "notes", label: "Notes", icon: StickyNote },
];

// ── Composant principal ────────────────────────────────────────────────────────

type ClientFile360Props = {
  client: ClientFull;
  recueilHref: string;
};

export function ClientFile360({ client, recueilHref }: ClientFile360Props) {
  const [activeTab, setActiveTab] = useState("synthese");

  const name = formatClientName(client);
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const interactions = client.interactions ?? [];
  const contracts = client.contracts ?? [];
  const linkedPersons = client.linked_persons ?? [];
  const assessments = [...(client.needs_assessments ?? [])].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  const activeContracts = contracts.filter((c) => c.statut === "actif").length;
  const score = client.protection_score ?? (assessments[0]?.family_protection_score ?? null);

  return (
    <div className="client-360">
      {/* ── Breadcrumb ── */}
      <nav className="page-breadcrumb">
        <Link href="/admin">Accueil</Link>
        <ChevronRight size={12} />
        <Link href="/admin/crm">CRM</Link>
        <ChevronRight size={12} />
        <Link href="/admin/clients">Clients</Link>
        <ChevronRight size={12} />
        <span>{name}</span>
      </nav>

      {/* ── Hero fiche ── */}
      <div className="client-360-hero">
        <div className="client-360-identity">
          <div className="client-360-avatar" aria-hidden>{initials}</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <h1 style={{ margin: 0, fontSize: "clamp(22px, 3vw, 32px)" }}>{name}</h1>
              {client.status && (
                <span className="crm-status-badge" style={{
                  background: client.status === "actif" ? "#10b98120" : client.status === "prospect" ? "#f59e0b20" : "#9ca3af20",
                  color: client.status === "actif" ? "#10b981" : client.status === "prospect" ? "#f59e0b" : "#9ca3af",
                }}>
                  {client.status === "actif" ? "Client actif" : client.status === "prospect" ? "Prospect" : client.status === "en_cours" ? "En cours" : "Inactif"}
                </span>
              )}
            </div>
            <div className="crm-client-meta" style={{ marginTop: "8px" }}>
              {client.email && <span><Mail size={14} aria-hidden /> {client.email}</span>}
              {client.phone && <span><Phone size={14} aria-hidden /> {client.phone}</span>}
              {client.family_type && <span><Heart size={14} aria-hidden /> {client.family_type}</span>}
              <span><Calendar size={14} aria-hidden /> Client depuis {new Date(client.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</span>
            </div>
            {(client.tags ?? []).length > 0 && (
              <div className="crm-tags" style={{ marginTop: "10px" }}>
                {(client.tags ?? []).map((tag) => (
                  <span key={tag} className="crm-tag"><Tag size={11} aria-hidden /> {tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="client-360-actions">
          <Link href={recueilHref} className="primary-action">
            <ClipboardCheck size={18} aria-hidden /> Nouveau recueil
          </Link>
          <button className="secondary-action" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Edit3 size={16} aria-hidden /> Modifier
          </button>
          <button className="secondary-action" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Plus size={16} aria-hidden /> Ajouter contrat
          </button>
        </div>
      </div>

      {/* ── KPIs rapides ── */}
      <div className="client-360-kpis">
        <div className="kpi-card">
          <Shield size={22} aria-hidden />
          <div>
            <strong>{activeContracts}</strong>
            <small>contrat{activeContracts > 1 ? "s" : ""} actif{activeContracts > 1 ? "s" : ""}</small>
          </div>
        </div>
        <div className="kpi-card">
          <MessageSquare size={22} aria-hidden />
          <div>
            <strong>{interactions.length}</strong>
            <small>interaction{interactions.length > 1 ? "s" : ""}</small>
          </div>
        </div>
        <div className="kpi-card">
          <Users size={22} aria-hidden />
          <div>
            <strong>{linkedPersons.length}</strong>
            <small>personne{linkedPersons.length > 1 ? "s" : ""} liée{linkedPersons.length > 1 ? "s" : ""}</small>
          </div>
        </div>
        <div className="kpi-card">
          <TrendingUp size={22} aria-hidden />
          <div>
            <strong style={{ color: score && score >= 70 ? "#10b981" : score && score >= 40 ? "#f59e0b" : "#ef4444" }}>
              {score !== null ? `${score}/100` : "—"}
            </strong>
            <small>score protection</small>
          </div>
        </div>
      </div>

      {/* ── Onglets ── */}
      <div className="client-360-tabs" role="tablist">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`client-360-tab${activeTab === tab.id ? " active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} aria-hidden /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Contenu des onglets ── */}
      <div className="client-360-panel">

        {/* SYNTHÈSE */}
        {activeTab === "synthese" && (
          <div className="tab-synthese">
            <div className="synthese-grid">
              {/* Situation familiale */}
              <section className="synthese-card">
                <h3><Heart size={18} aria-hidden /> Situation familiale</h3>
                <dl>
                  <dt>Type de famille</dt>
                  <dd>{client.family_type || client.family_context || "Non renseigné"}</dd>
                  <dt>Contexte</dt>
                  <dd>{client.family_context || "—"}</dd>
                </dl>
              </section>

              {/* Dernier recueil */}
              <section className="synthese-card">
                <h3><ClipboardCheck size={18} aria-hidden /> Dernier recueil des besoins</h3>
                {assessments.length === 0 ? (
                  <p style={{ color: "var(--muted)", fontSize: "14px" }}>Aucun recueil effectué.</p>
                ) : (
                  <dl>
                    <dt>Objectif</dt>
                    <dd>{assessments[0].protection_goal || "—"}</dd>
                    <dt>Situation</dt>
                    <dd>{assessments[0].family_situation || "—"}</dd>
                    <dt>Statut juridique</dt>
                    <dd>{assessments[0].legal_status || "—"}</dd>
                    <dt>Score</dt>
                    <dd>{assessments[0].family_protection_score ?? "—"} / 100</dd>
                  </dl>
                )}
                <Link href={recueilHref} style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "12px", fontSize: "13px", fontWeight: 700, color: "var(--accent-strong)" }}>
                  Nouveau recueil <ChevronRight size={14} />
                </Link>
              </section>

              {/* Contrats actifs */}
              <section className="synthese-card">
                <h3><Shield size={18} aria-hidden /> Contrats actifs</h3>
                {contracts.filter((c) => c.statut === "actif").length === 0 ? (
                  <p style={{ color: "var(--muted)", fontSize: "14px" }}>Aucun contrat actif.</p>
                ) : (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                    {contracts.filter((c) => c.statut === "actif").map((c) => (
                      <li key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "var(--surface-soft)", borderRadius: "8px", fontSize: "14px" }}>
                        <span><strong>{c.type}</strong> — {c.compagnie}</span>
                        {c.prime_annuelle && <span style={{ color: "var(--accent-strong)", fontWeight: 700 }}>{c.prime_annuelle.toLocaleString("fr-FR")} €/an</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {/* Dernière interaction */}
              <section className="synthese-card">
                <h3><MessageSquare size={18} aria-hidden /> Dernière interaction</h3>
                {interactions.length === 0 ? (
                  <p style={{ color: "var(--muted)", fontSize: "14px" }}>Aucune interaction enregistrée.</p>
                ) : (
                  <div>
                    {(() => {
                      const last = [...interactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
                      const Icon = INTERACTION_ICONS[last.type] ?? MessageSquare;
                      return (
                        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--surface-soft)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                            <Icon size={16} aria-hidden />
                          </div>
                          <div>
                            <strong style={{ fontSize: "14px" }}>{INTERACTION_LABELS[last.type]}</strong>
                            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--muted)" }}>{last.summary}</p>
                            <small style={{ color: "var(--muted)", fontSize: "12px" }}>{new Date(last.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</small>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </section>
            </div>

            {/* Notes libres */}
            {client.notes && (
              <section className="synthese-card" style={{ marginTop: "16px" }}>
                <h3><StickyNote size={18} aria-hidden /> Notes cabinet</h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "14px", whiteSpace: "pre-wrap" }}>{client.notes}</p>
              </section>
            )}
          </div>
        )}

        {/* INTERACTIONS */}
        {activeTab === "interactions" && (
          <div className="tab-interactions">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0 }}>Historique des interactions</h3>
              <button className="primary-action" style={{ fontSize: "13px", padding: "8px 16px" }}>
                <Plus size={15} aria-hidden /> Ajouter
              </button>
            </div>

            {interactions.length === 0 ? (
              <div className="empty-state">
                <MessageSquare size={32} aria-hidden />
                <strong>Aucune interaction enregistrée</strong>
                <p>Ajoutez un appel, un email, un rendez-vous ou une note pour commencer l'historique.</p>
              </div>
            ) : (
              <div className="interaction-timeline">
                {[...interactions]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((interaction) => {
                    const Icon = INTERACTION_ICONS[interaction.type] ?? MessageSquare;
                    return (
                      <article key={interaction.id} className="interaction-item">
                        <div className="interaction-icon-wrap">
                          <Icon size={18} aria-hidden />
                        </div>
                        <div className="interaction-body">
                          <div className="interaction-header">
                            <strong>{INTERACTION_LABELS[interaction.type]}</strong>
                            {interaction.author && <span className="interaction-author">{interaction.author}</span>}
                            <time className="interaction-date">
                              {new Date(interaction.date).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </time>
                          </div>
                          <p className="interaction-summary">{interaction.summary}</p>
                          {(interaction.attachments ?? []).length > 0 && (
                            <div className="interaction-attachments">
                              {(interaction.attachments ?? []).map((att) => (
                                <span key={att} className="crm-tag">
                                  <Paperclip size={11} aria-hidden /> {att}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* CONTRATS */}
        {activeTab === "contrats" && (
          <div className="tab-contrats">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0 }}>Contrats liés ({contracts.length})</h3>
              <button className="primary-action" style={{ fontSize: "13px", padding: "8px 16px" }}>
                <Plus size={15} aria-hidden /> Ajouter un contrat
              </button>
            </div>

            {contracts.length === 0 ? (
              <div className="empty-state">
                <Shield size={32} aria-hidden />
                <strong>Aucun contrat lié</strong>
                <p>Ajoutez les contrats d'assurance de ce client pour un suivi centralisé.</p>
              </div>
            ) : (
              <div className="contracts-list">
                {contracts.map((contract) => (
                  <article key={contract.id} className="contract-card">
                    <div className="contract-card-header">
                      <div>
                        <strong>{contract.type}</strong>
                        <span className="crm-status-badge" style={{
                          background: `${CONTRACT_STATUS_COLORS[contract.statut]}20`,
                          color: CONTRACT_STATUS_COLORS[contract.statut],
                        }}>
                          {CONTRACT_STATUS_LABELS[contract.statut]}
                        </span>
                      </div>
                      {contract.prime_annuelle && (
                        <strong style={{ color: "var(--accent-strong)", fontSize: "18px" }}>
                          {contract.prime_annuelle.toLocaleString("fr-FR")} €/an
                        </strong>
                      )}
                    </div>
                    <dl className="contract-details">
                      <dt>Compagnie</dt>
                      <dd>{contract.compagnie}</dd>
                      {contract.numero && <><dt>N° contrat</dt><dd>{contract.numero}</dd></>}
                      {contract.date_effet && <><dt>Date d'effet</dt><dd>{new Date(contract.date_effet).toLocaleDateString("fr-FR")}</dd></>}
                    </dl>
                    {(contract.beneficiaires ?? []).length > 0 && (
                      <div style={{ marginTop: "12px" }}>
                        <small style={{ color: "var(--muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "11px" }}>Bénéficiaires</small>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "6px" }}>
                          {(contract.beneficiaires ?? []).map((b) => (
                            <span key={b} className="crm-tag">{b}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PERSONNES LIÉES */}
        {activeTab === "personnes" && (
          <div className="tab-personnes">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0 }}>Personnes liées ({linkedPersons.length})</h3>
              <button className="primary-action" style={{ fontSize: "13px", padding: "8px 16px" }}>
                <Plus size={15} aria-hidden /> Ajouter une personne
              </button>
            </div>

            {linkedPersons.length === 0 ? (
              <div className="empty-state">
                <Users size={32} aria-hidden />
                <strong>Aucune personne liée</strong>
                <p>Ajoutez le conjoint, les enfants, les co-parents ou les parents sociaux pour une vision familiale complète.</p>
              </div>
            ) : (
              <div className="persons-grid">
                {linkedPersons.map((person) => {
                  const Icon = RELATION_ICONS[person.relation] ?? Users;
                  return (
                    <article key={person.id} className="person-card">
                      <div className="person-card-icon" aria-hidden>
                        <Icon size={22} />
                      </div>
                      <div>
                        <strong>{person.name}</strong>
                        <span className="crm-tag" style={{ marginTop: "6px", display: "inline-flex" }}>
                          {RELATION_LABELS[person.relation]}
                        </span>
                        {person.birthdate && (
                          <p style={{ margin: "6px 0 0", fontSize: "13px", color: "var(--muted)" }}>
                            Né(e) le {new Date(person.birthdate).toLocaleDateString("fr-FR")}
                          </p>
                        )}
                        {person.notes && (
                          <p style={{ margin: "6px 0 0", fontSize: "13px", color: "var(--muted)", fontStyle: "italic" }}>
                            {person.notes}
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* DOCUMENTS */}
        {activeTab === "documents" && (
          <div className="tab-documents">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0 }}>Documents</h3>
              <button className="primary-action" style={{ fontSize: "13px", padding: "8px 16px" }}>
                <Plus size={15} aria-hidden /> Ajouter un document
              </button>
            </div>
            <div className="empty-state">
              <FileText size={32} aria-hidden />
              <strong>Aucun document</strong>
              <p>Ajoutez les pièces justificatives, contrats signés, courriers et documents du dossier.</p>
            </div>
          </div>
        )}

        {/* NOTES */}
        {activeTab === "notes" && (
          <div className="tab-notes">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0 }}>Notes cabinet</h3>
              <button className="primary-action" style={{ fontSize: "13px", padding: "8px 16px" }}>
                <Plus size={15} aria-hidden /> Ajouter une note
              </button>
            </div>
            {client.notes ? (
              <div className="synthese-card">
                <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "14px", whiteSpace: "pre-wrap" }}>{client.notes}</p>
              </div>
            ) : (
              <div className="empty-state">
                <StickyNote size={32} aria-hidden />
                <strong>Aucune note</strong>
                <p>Ajoutez des notes internes sur ce client pour garder une trace des informations importantes.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
