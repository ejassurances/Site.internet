"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AcprDocument, ClientAcprFolder } from "@/components/client-acpr-folder";
import { CurrentUser } from "@/lib/auth";
import { ShieldCheck, FolderOpen, FileCheck, Lock, CheckCircle, Clock, AlertTriangle } from "lucide-react";

type Tab = "documents" | "conformite";

interface Props {
  acprDocuments: AcprDocument[];
  user: CurrentUser;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    signe:     { label: "SignÃ©",      color: "#10B981", bg: "rgba(16,185,129,.1)" },
    en_attente:{ label: "En attente", color: "#F59E0B", bg: "rgba(245,158,11,.1)" },
    expire:    { label: "ExpirÃ©",     color: "#EF4444", bg: "rgba(239,68,68,.1)"  },
    conforme:  { label: "Conforme",   color: "#10B981", bg: "rgba(16,185,129,.1)" },
    alerte:    { label: "Ã vÃ©rifier", color: "#EF4444", bg: "rgba(239,68,68,.1)"  },
    en_cours:  { label: "En cours",   color: "#3B82F6", bg: "rgba(59,130,246,.1)" },
  };
  const c = map[status] ?? { label: status, color: "var(--muted)", bg: "rgba(0,0,0,.06)" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "3px 10px",
      borderRadius: "999px", background: c.bg, color: c.color, fontSize: "12px", fontWeight: 700 }}>
      {c.label}
    </span>
  );
}

const CONSENTEMENTS = [
  { id: "1", type: "Recueil des besoins (DDA)",                  date: "2025-01-15", status: "signe"      },
  { id: "2", type: "Consentement traitement donnÃ©es (RGPD)",     date: "2025-01-15", status: "signe"      },
  { id: "3", type: "Devoir de conseil â Assurance Emprunteur",   date: "2025-03-02", status: "signe"      },
  { id: "4", type: "Renouvellement annuel du consentement",      date: "2026-01-15", status: "en_attente" },
];

const DOCS_SIGNES = [
  { id: "1", nom: "Fiche de recueil des besoins 2025",  date: "2025-01-15", type: "DDA" },
  { id: "2", nom: "Rapport de conseil personnalisÃ©",     date: "2025-03-02", type: "DDA" },
  { id: "3", nom: "Information prÃ©contractuelle (IPID)", date: "2025-03-02", type: "DDA" },
];

const VERIFICATIONS = [
  { id: "1", type: "VÃ©rification d'identitÃ© (KYC)",                        date: "2025-01-15", resultat: "conforme" },
  { id: "2", type: "Screening PPE (Personnes Politiquement ExposÃ©es)",      date: "2025-01-15", resultat: "conforme" },
  { id: "3", type: "ContrÃ´le listes gel des avoirs (TrÃ©sor, UE, ONU)",     date: "2025-01-15", resultat: "conforme" },
];

function SectionCard({
  icon: Icon,
  iconColor,
  title,
  children,
}: {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ border: "1px solid var(--line)", borderRadius: "var(--radius)",
      background: "var(--surface)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "16px 20px",
        borderBottom: "1px solid var(--line)", background: `${iconColor}08` }}>
        <Icon size={18} color={iconColor} aria-hidden />
        <h3 style={{ margin: 0, fontSize: "16px" }}>{title}</h3>
      </div>
      {children}
    </section>
  );
}

function Row({ label, sub, right, last = false }: {
  label: string; sub?: React.ReactNode; right?: React.ReactNode; last?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
      padding: "14px 20px", borderBottom: last ? "none" : "1px solid var(--line)" }}>
      <div>
        <p style={{ margin: 0, fontWeight: 600, fontSize: "14px" }}>{label}</p>
        {sub && <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function ClientDashboard({ acprDocuments, user }: Props) {
  const [tab, setTab] = useState<Tab>("documents");

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "documents",  label: "Mes documents", icon: FolderOpen   },
    { id: "conformite", label: "ConformitÃ©",     icon: ShieldCheck  },
  ];

  return (
    <AppShell role="client" user={user}>
      {/* Tab bar */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "24px", padding: "4px",
        background: "rgba(7,24,39,.04)", borderRadius: "10px", width: "fit-content" }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)} style={{
            display: "flex", alignItems: "center", gap: "7px", padding: "8px 16px",
            borderRadius: "8px", border: "none",
            background: tab === id ? "white" : "transparent",
            color: tab === id ? "var(--navy)" : "var(--muted)",
            fontWeight: tab === id ? 700 : 600, fontSize: "14px", cursor: "pointer",
            boxShadow: tab === id ? "0 1px 4px rgba(7,24,39,.1)" : "none",
            transition: "all .15s",
          }}>
            <Icon size={15} aria-hidden /> {label}
          </button>
        ))}
      </div>

      {/* Documents tab */}
      {tab === "documents" && <ClientAcprFolder documents={acprDocuments} />}

      {/* ConformitÃ© tab */}
      {tab === "conformite" && (
        <div style={{ display: "grid", gap: "20px" }}>

          <SectionCard icon={FileCheck} iconColor="#3B82F6" title="Consentements &amp; devoir de conseil (DDA)">
            {CONSENTEMENTS.map((item, i) => (
              <Row key={item.id} label={item.type} last={i === CONSENTEMENTS.length - 1}
                sub={`DatÃ© du ${new Date(item.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`}
                right={<StatusBadge status={item.status} />}
              />
            ))}
          </SectionCard>

          <SectionCard icon={Lock} iconColor="#8B5CF6" title="Documents remis &amp; signÃ©s">
            {DOCS_SIGNES.map((doc, i) => (
              <Row key={doc.id} label={doc.nom} last={i === DOCS_SIGNES.length - 1}
                sub={`${doc.type} Â· ${new Date(doc.date).toLocaleDateString("fr-FR")}`}
                right={
                  <span style={{ display: "flex", alignItems: "center", gap: "5px",
                    fontSize: "12px", color: "#10B981", fontWeight: 700 }}>
                    <CheckCircle size={13} aria-hidden /> Remis
                  </span>
                }
              />
            ))}
          </SectionCard>

          <SectionCard icon={AlertTriangle} iconColor="#10B981" title="VÃ©rifications rÃ©glementaires (LCB-FT)">
            {VERIFICATIONS.map((v, i) => (
              <Row key={v.id} label={v.type} last={i === VERIFICATIONS.length - 1}
                sub={
                  <span>
                    <Clock size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} aria-hidden />
                    EffectuÃ© le {new Date(v.date).toLocaleDateString("fr-FR")}
                  </span>
                }
                right={<StatusBadge status={v.resultat} />}
              />
            ))}
          </SectionCard>

          <p style={{ color: "var(--muted)", fontSize: "13px", margin: 0 }}>
            Ces vÃ©rifications sont effectuÃ©es par votre conseiller dans le respect des obligations
            LCB-FT imposÃ©es aux intermÃ©diaires d&apos;assurance. Pour toute question :{" "}
            <a href="mailto:contact@ej-assurances.fr" style={{ color: "var(--accent)" }}>
              contact@ej-assurances.fr
            </a>
          </p>
        </div>
      )}
    </AppShell>
  );
}
