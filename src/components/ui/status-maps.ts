import type { StatusTone } from "./status-badge";

// Vocabulaire métier des statuts, par domaine. On NE fusionne PAS les domaines
// entre eux : mêmes clés (« draft », « actif/active ») ≠ même signification.
// Seule la présentation est unifiée (StatusBadge + palette sémantique).

export type StatusConfig = { tone: StatusTone; label: string };

// Statut client — fusion des anciennes maps `clients/page` + `client-file-360-live`
// (domaine et clés identiques : prospect / actif / en_cours / inactif).
export const clientStatus: Record<string, StatusConfig> = {
  prospect: { tone: "warning", label: "Prospect" },
  actif:    { tone: "success", label: "Client actif" },
  en_cours: { tone: "info",    label: "En cours" },
  inactif:  { tone: "neutral", label: "Inactif" },
};

// Statut contrat — domaine distinct du statut client (ne pas fusionner).
export const contractStatus: Record<string, StatusConfig> = {
  draft:             { tone: "neutral", label: "Brouillon" },
  active:            { tone: "success", label: "Actif" },
  pending_signature: { tone: "warning", label: "En attente signature" },
  terminated:        { tone: "danger",  label: "Résilié" },
  archived:          { tone: "neutral", label: "Archivé" },
};
