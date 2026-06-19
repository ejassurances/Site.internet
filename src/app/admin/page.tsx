import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import { getAccessibleClients } from "@/lib/clients";

const adminModuleCards = [
  {
    emoji: "🗂️",
    title: "CRM & Productivité",
    description: "Gérez vos clients, contacts, agenda et tâches quotidiennes du cabinet.",
    href: "/admin/crm",
    stat: "Clients actifs",
    color: "#e8f4fd",
  },
  {
    emoji: "💼",
    title: "Vente, Leads & GED",
    description: "Suivez votre pipeline commercial, les leads entrants et gérez vos documents.",
    href: "/admin/vente",
    stat: "Leads en cours",
    color: "#fdf3e8",
  },
  {
    emoji: "⚙️",
    title: "Workflows",
    description: "Automatisez vos processus, gérez les statuts de dossiers et les modèles.",
    href: "/admin/workflows",
    stat: "Workflows actifs",
    color: "#f0f8ee",
  },
  {
    emoji: "🤖",
    title: "Pilotage IA",
    description: "Analyse familiale assistée par IA, scoring clients et recommandations automatiques.",
    href: "/admin/ia",
    stat: "Analyses IA",
    color: "#f3e8fd",
  },
  {
    emoji: "⚖️",
    title: "Conformité",
    description: "Classeurs ACPR, devoir de conseil DDA, RGPD et journal d'audit réglementaire.",
    href: "/admin/conformite",
    stat: "Dossiers conformes",
    color: "#fdf8e8",
  },
  {
    emoji: "💰",
    title: "Finance & Coms",
    description: "Suivez vos commissions, gérez mandataires, prescripteurs et facturation.",
    href: "/admin/finance",
    stat: "Commissions du mois",
    color: "#e8fdf0",
  },
  {
    emoji: "📊",
    title: "Stats & Analyses",
    description: "KPIs cabinet, rapports de performance, analyses clients et exports.",
    href: "/admin/stats",
    stat: "Rapports disponibles",
    color: "#fde8e8",
  },
];

export default async function AdminDashboardPage() {
  const user = await requireRole(["admin", "courtier"]);
  const clients = await getAccessibleClients(user);

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      {/* Stats rapides */}
      <section className="stats-grid" aria-label="Indicateurs cabinet">
        <article className="metric">
          <span>Clients actifs</span>
          <strong>{clients.length}</strong>
          <small>dossiers en portefeuille</small>
        </article>
        <article className="metric">
          <span>Cabinet</span>
          <strong>EJ</strong>
          <small>Partners Assurances</small>
        </article>
        <article className="metric">
          <span>Contact</span>
          <strong>01.89</strong>
          <small>31.40.29</small>
        </article>
        <article className="metric">
          <span>Conformité</span>
          <strong>OK</strong>
          <small>compte admin vérifié</small>
        </article>
      </section>

      {/* 7 Modules maîtres */}
      <section aria-label="Modules cabinet">
        <div style={{ marginBottom: "20px" }}>
          <p className="eyebrow">Modules cabinet</p>
          <h2 style={{ margin: "4px 0 0", fontSize: "clamp(20px, 2.5vw, 28px)" }}>
            Votre espace de travail
          </h2>
        </div>

        <div className="admin-modules-grid">
          {adminModuleCards.map((card) => (
            <Link key={card.href} href={card.href} className="admin-module-card">
              <div className="admin-module-icon" style={{ background: card.color }}>
                {card.emoji}
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="admin-module-card-footer">
                <span>Accéder au module</span>
                <ChevronRight size={16} aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Accès rapide clients */}
      {clients.length > 0 && (
        <section style={{ marginTop: "32px" }} aria-label="Derniers clients">
          <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p className="eyebrow">Accès rapide</p>
              <h2 style={{ margin: "4px 0 0", fontSize: "clamp(18px, 2vw, 24px)" }}>Derniers clients</h2>
            </div>
            <Link href="/admin/clients" style={{ color: "var(--accent-strong)", fontWeight: 700, fontSize: "14px", display: "flex", alignItems: "center", gap: "4px" }}>
              Voir tous <ChevronRight size={14} />
            </Link>
          </div>
          <div className="client-list">
            {clients.slice(0, 5).map((client) => (
              <div key={client.id} className="client-row">
                <div>
                  <strong>{client.full_name}</strong>
                  <p>{client.email}</p>
                </div>
                <Link href={`/admin/clients/${client.id}`} style={{ color: "var(--accent-strong)", fontWeight: 700, fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
                  Voir le dossier <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </AppShell>
  );
}
