"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ContractForm } from "@/components/forms/contract-form";
import { InteractionForm } from "@/components/forms/interaction-form";
import { RelatedPersonForm } from "@/components/forms/related-person-form";
import { deleteContract } from "@/lib/actions/contracts";
import { deleteInteraction, deleteRelatedPerson } from "@/lib/actions/interactions";
import {
  FileText, Users, MessageSquare, Phone, Mail, Calendar, Video,
  StickyNote, Plus, Trash2, Shield, ChevronDown, ChevronUp,
  Building2, Euro, User, MapPin, Tag, X, CheckCircle2,
  Clock, AlertCircle
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type Client = Record<string, unknown> & {
  id: string;
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  family_context?: string | null;
  notes?: string | null;
  statut_client?: string;
  situation_familiale?: string;
  date_naissance?: string;
  adresse?: string;
  code_postal?: string;
  ville?: string;
  source_acquisition?: string;
  score_protection?: number;
};

type Contract = {
  id: string;
  contract_number?: string | null;
  insurer_name?: string | null;
  contract_type: string;
  status: string;
  effective_date?: string | null;
  end_date?: string | null;
  prime_annuelle?: number | null;
  taux_commission?: number | null;
  montant_commission_annuel?: number | null;
  beneficiaires?: string | null;
  notes?: string | null;
};

type Interaction = {
  id: string;
  type: string;
  titre: string;
  contenu?: string | null;
  duree_minutes?: number | null;
  created_at: string;
  profiles?: { full_name?: string | null } | null;
};

type RelatedPerson = {
  id: string;
  type_relation: string;
  full_name: string;
  date_naissance?: string | null;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
};

type Props = {
  clientId: string;
  initialData: {
    client: Client;
    tags: string[];
    related_persons: RelatedPerson[];
    interactions: Interaction[];
    contracts: Contract[];
  };
};

const TABS = [
  { id: "synthese", label: "Synthèse", icon: Shield },
  { id: "interactions", label: "Interactions", icon: MessageSquare },
  { id: "contrats", label: "Contrats", icon: FileText },
  { id: "personnes", label: "Personnes liées", icon: Users },
  { id: "notes", label: "Notes", icon: StickyNote },
] as const;

const INTERACTION_ICONS: Record<string, React.ElementType> = {
  appel: Phone, email: Mail, rdv: Calendar, visio: Video,
  note: StickyNote, sms: MessageSquare, document: FileText,
};

const CONTRACT_STATUS: Record<string, { label: string; className: string }> = {
  draft: { label: "Brouillon", className: "status-badge status-draft" },
  active: { label: "Actif", className: "status-badge status-active" },
  pending_signature: { label: "En attente de signature", className: "status-badge status-pending" },
  terminated: { label: "Résilié", className: "status-badge status-inactive" },
  archived: { label: "Archivé", className: "status-badge status-archived" },
};

const RELATION_LABELS: Record<string, string> = {
  conjoint: "Conjoint(e) / Partenaire",
  enfant: "Enfant",
  parent_social: "Parent social",
  co_parent: "Co-parent",
  autre: "Autre",
};

export function ClientFile360Live({ clientId, initialData }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<typeof TABS[number]["id"]>("synthese");
  const [showContractForm, setShowContractForm] = useState(false);
  const [showInteractionForm, setShowInteractionForm] = useState(false);
  const [showPersonForm, setShowPersonForm] = useState(false);
  const [expandedInteraction, setExpandedInteraction] = useState<string | null>(null);

  const { client, tags, related_persons, interactions, contracts } = initialData;
  const activeContracts = contracts.filter((c) => c.status === "active");
  const score = (client.score_protection as number | undefined) ?? 0;

  const handleDeleteContract = async (contractId: string) => {
    if (!confirm("Supprimer ce contrat ? Cette action est irréversible.")) return;
    await deleteContract(contractId, clientId);
    router.refresh();
  };

  const handleDeleteInteraction = async (interactionId: string) => {
    if (!confirm("Supprimer cette interaction ?")) return;
    await deleteInteraction(interactionId, clientId);
    router.refresh();
  };

  const handleDeletePerson = async (personId: string) => {
    if (!confirm("Supprimer cette personne liée ?")) return;
    await deleteRelatedPerson(personId, clientId);
    router.refresh();
  };

  const formatDate = (d?: string | null) =>
    d ? new Date(d).toLocaleDateString("fr-FR") : "—";

  const formatEuro = (n?: number | null) =>
    n != null ? n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" }) : "—";

  return (
    <div className="client-360-container">
      {/* ── KPIs ── */}
      <div className="client-360-kpis">
        <div className="kpi-card">
          <FileText size={20} aria-hidden />
          <span className="kpi-value">{activeContracts.length}</span>
          <span className="kpi-label">Contrats actifs</span>
        </div>
        <div className="kpi-card">
          <MessageSquare size={20} aria-hidden />
          <span className="kpi-value">{interactions.length}</span>
          <span className="kpi-label">Interactions</span>
        </div>
        <div className="kpi-card">
          <Users size={20} aria-hidden />
          <span className="kpi-value">{related_persons.length}</span>
          <span className="kpi-label">Personnes liées</span>
        </div>
        <div className="kpi-card kpi-score">
          <Shield size={20} aria-hidden />
          <span className="kpi-value">{score}/100</span>
          <span className="kpi-label">Score protection</span>
        </div>
      </div>

      {/* ── Onglets ── */}
      <div className="client-360-tabs">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`tab-btn${activeTab === id ? " active" : ""}`}
            onClick={() => setActiveTab(id)}
          >
            <Icon size={15} aria-hidden /> {label}
          </button>
        ))}
      </div>

      <div className="client-360-tab-content">

        {/* ── SYNTHÈSE ── */}
        {activeTab === "synthese" && (
          <div className="tab-synthese">
            <div className="synthese-grid">
              <div className="synthese-card">
                <h3><User size={16} aria-hidden /> Identité</h3>
                <dl>
                  <dt>Nom</dt><dd>{client.full_name ?? "—"}</dd>
                  <dt>Email</dt><dd>{client.email ? <a href={`mailto:${client.email}`}>{client.email}</a> : "—"}</dd>
                  <dt>Téléphone</dt><dd>{client.phone ? <a href={`tel:${client.phone}`}>{client.phone}</a> : "—"}</dd>
                  <dt>Date de naissance</dt><dd>{formatDate(client.date_naissance as string | undefined)}</dd>
                  <dt>Situation familiale</dt><dd>{(client.situation_familiale as string | undefined) ?? "—"}</dd>
                  <dt>Statut</dt><dd>{(client.statut_client as string | undefined) ?? "prospect"}</dd>
                </dl>
              </div>
              <div className="synthese-card">
                <h3><MapPin size={16} aria-hidden /> Adresse</h3>
                <dl>
                  <dt>Adresse</dt><dd>{(client.adresse as string | undefined) ?? "—"}</dd>
                  <dt>Code postal</dt><dd>{(client.code_postal as string | undefined) ?? "—"}</dd>
                  <dt>Ville</dt><dd>{(client.ville as string | undefined) ?? "—"}</dd>
                  <dt>Source</dt><dd>{(client.source_acquisition as string | undefined) ?? "—"}</dd>
                </dl>
              </div>
              <div className="synthese-card synthese-card-full">
                <h3><Tag size={16} aria-hidden /> Tags</h3>
                {tags.length > 0 ? (
                  <div className="crm-client-tags">
                    {tags.map((tag) => <span key={tag} className="crm-tag">{tag}</span>)}
                  </div>
                ) : (
                  <p className="empty-hint">Aucun tag — <Link href={`/admin/clients/${clientId}/modifier`}>Modifier la fiche</Link></p>
                )}
              </div>
              {client.family_context && (
                <div className="synthese-card synthese-card-full">
                  <h3>Contexte familial</h3>
                  <p>{client.family_context as string}</p>
                </div>
              )}
            </div>

            {/* Contrats actifs en résumé */}
            {activeContracts.length > 0 && (
              <div className="synthese-contracts">
                <h3><FileText size={16} aria-hidden /> Contrats actifs</h3>
                <div className="contracts-summary">
                  {activeContracts.map((c) => (
                    <div key={c.id} className="contract-summary-item">
                      <CheckCircle2 size={14} className="text-green" aria-hidden />
                      <span>{c.contract_type}</span>
                      <span className="contract-insurer">{c.insurer_name}</span>
                      {c.prime_annuelle && <span className="contract-prime">{formatEuro(c.prime_annuelle)}/an</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dernière interaction */}
            {interactions.length > 0 && (
              <div className="synthese-last-interaction">
                <h3><MessageSquare size={16} aria-hidden /> Dernière interaction</h3>
                <div className="interaction-item">
                  <span className="interaction-type-badge">{interactions[0].type}</span>
                  <span className="interaction-titre">{interactions[0].titre}</span>
                  <span className="interaction-date">{formatDate(interactions[0].created_at)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── INTERACTIONS ── */}
        {activeTab === "interactions" && (
          <div className="tab-interactions">
            <div className="tab-header-actions">
              <h3>Historique des interactions ({interactions.length})</h3>
              <button className="primary-action" onClick={() => setShowInteractionForm(!showInteractionForm)}>
                <Plus size={15} aria-hidden /> Ajouter
              </button>
            </div>

            {showInteractionForm && (
              <div className="inline-form-card">
                <InteractionForm
                  clientId={clientId}
                  onSuccess={() => { setShowInteractionForm(false); router.refresh(); }}
                  onCancel={() => setShowInteractionForm(false)}
                />
              </div>
            )}

            {interactions.length === 0 ? (
              <div className="empty-state-small">
                <MessageSquare size={32} aria-hidden />
                <p>Aucune interaction enregistrée. Ajoutez le premier contact.</p>
              </div>
            ) : (
              <div className="interactions-timeline">
                {interactions.map((interaction) => {
                  const Icon = INTERACTION_ICONS[interaction.type] ?? StickyNote;
                  const isExpanded = expandedInteraction === interaction.id;
                  return (
                    <div key={interaction.id} className="interaction-timeline-item">
                      <div className="interaction-timeline-icon">
                        <Icon size={14} aria-hidden />
                      </div>
                      <div className="interaction-timeline-content">
                        <div className="interaction-header" onClick={() => setExpandedInteraction(isExpanded ? null : interaction.id)}>
                          <span className={`interaction-type-badge badge-${interaction.type}`}>{interaction.type}</span>
                          <span className="interaction-titre">{interaction.titre}</span>
                          <span className="interaction-meta">
                            {formatDate(interaction.created_at)}
                            {interaction.duree_minutes && ` · ${interaction.duree_minutes} min`}
                          </span>
                          {interaction.contenu && (
                            isExpanded ? <ChevronUp size={14} aria-hidden /> : <ChevronDown size={14} aria-hidden />
                          )}
                          <button
                            className="icon-btn danger"
                            onClick={(e) => { e.stopPropagation(); handleDeleteInteraction(interaction.id); }}
                            aria-label="Supprimer l'interaction"
                          >
                            <Trash2 size={13} aria-hidden />
                          </button>
                        </div>
                        {isExpanded && interaction.contenu && (
                          <div className="interaction-contenu">{interaction.contenu}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── CONTRATS ── */}
        {activeTab === "contrats" && (
          <div className="tab-contrats">
            <div className="tab-header-actions">
              <h3>Contrats ({contracts.length})</h3>
              <button className="primary-action" onClick={() => setShowContractForm(!showContractForm)}>
                <Plus size={15} aria-hidden /> Nouveau contrat
              </button>
            </div>

            {showContractForm && (
              <div className="inline-form-card">
                <ContractForm
                  mode="create"
                  clientId={clientId}
                  onSuccess={() => { setShowContractForm(false); router.refresh(); }}
                  onCancel={() => setShowContractForm(false)}
                />
              </div>
            )}

            {contracts.length === 0 ? (
              <div className="empty-state-small">
                <FileText size={32} aria-hidden />
                <p>Aucun contrat enregistré. Créez le premier contrat de ce client.</p>
              </div>
            ) : (
              <div className="contracts-list">
                {contracts.map((contract) => {
                  const statusInfo = CONTRACT_STATUS[contract.status] ?? CONTRACT_STATUS.draft;
                  return (
                    <div key={contract.id} className="contract-card">
                      <div className="contract-card-header">
                        <div>
                          <span className="contract-type">{contract.contract_type}</span>
                          <span className={statusInfo.className}>{statusInfo.label}</span>
                        </div>
                        <button
                          className="icon-btn danger"
                          onClick={() => handleDeleteContract(contract.id)}
                          aria-label="Supprimer le contrat"
                        >
                          <Trash2 size={14} aria-hidden />
                        </button>
                      </div>
                      <dl className="contract-details">
                        <dt><Building2 size={12} aria-hidden /> Assureur</dt>
                        <dd>{contract.insurer_name ?? "—"}</dd>
                        <dt><FileText size={12} aria-hidden /> N° contrat</dt>
                        <dd>{contract.contract_number ?? "—"}</dd>
                        <dt><Clock size={12} aria-hidden /> Date d'effet</dt>
                        <dd>{formatDate(contract.effective_date)}</dd>
                        <dt><Euro size={12} aria-hidden /> Prime annuelle</dt>
                        <dd>{formatEuro(contract.prime_annuelle)}</dd>
                        <dt>Commission</dt>
                        <dd>
                          {contract.taux_commission ? `${contract.taux_commission}%` : "—"}
                          {contract.montant_commission_annuel ? ` (${formatEuro(contract.montant_commission_annuel)}/an)` : ""}
                        </dd>
                        {contract.beneficiaires && (
                          <>
                            <dt>Bénéficiaires</dt>
                            <dd>{contract.beneficiaires}</dd>
                          </>
                        )}
                      </dl>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── PERSONNES LIÉES ── */}
        {activeTab === "personnes" && (
          <div className="tab-personnes">
            <div className="tab-header-actions">
              <h3>Personnes liées ({related_persons.length})</h3>
              <button className="primary-action" onClick={() => setShowPersonForm(!showPersonForm)}>
                <Plus size={15} aria-hidden /> Ajouter
              </button>
            </div>

            {showPersonForm && (
              <div className="inline-form-card">
                <RelatedPersonForm
                  clientId={clientId}
                  onSuccess={() => { setShowPersonForm(false); router.refresh(); }}
                  onCancel={() => setShowPersonForm(false)}
                />
              </div>
            )}

            {related_persons.length === 0 ? (
              <div className="empty-state-small">
                <Users size={32} aria-hidden />
                <p>Aucune personne liée. Ajoutez le conjoint, les enfants ou les co-parents.</p>
              </div>
            ) : (
              <div className="persons-grid">
                {related_persons.map((person) => (
                  <div key={person.id} className="person-card">
                    <div className="person-card-header">
                      <div className="person-avatar">{person.full_name.charAt(0).toUpperCase()}</div>
                      <div>
                        <span className="person-name">{person.full_name}</span>
                        <span className="person-relation">{RELATION_LABELS[person.type_relation] ?? person.type_relation}</span>
                      </div>
                      <button
                        className="icon-btn danger"
                        onClick={() => handleDeletePerson(person.id)}
                        aria-label="Supprimer la personne"
                      >
                        <Trash2 size={13} aria-hidden />
                      </button>
                    </div>
                    <dl className="person-details">
                      {person.date_naissance && (
                        <><dt>Naissance</dt><dd>{formatDate(person.date_naissance)}</dd></>
                      )}
                      {person.email && (
                        <><dt>Email</dt><dd><a href={`mailto:${person.email}`}>{person.email}</a></dd></>
                      )}
                      {person.phone && (
                        <><dt>Tél.</dt><dd><a href={`tel:${person.phone}`}>{person.phone}</a></dd></>
                      )}
                      {person.notes && (
                        <><dt>Notes</dt><dd>{person.notes}</dd></>
                      )}
                    </dl>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── NOTES ── */}
        {activeTab === "notes" && (
          <div className="tab-notes">
            <div className="tab-header-actions">
              <h3>Notes internes</h3>
              <Link href={`/admin/clients/${clientId}/modifier`} className="secondary-action">
                Modifier les notes
              </Link>
            </div>
            {client.notes ? (
              <div className="notes-content">{client.notes as string}</div>
            ) : (
              <div className="empty-state-small">
                <StickyNote size={32} aria-hidden />
                <p>Aucune note interne. <Link href={`/admin/clients/${clientId}/modifier`}>Ajouter une note</Link></p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
