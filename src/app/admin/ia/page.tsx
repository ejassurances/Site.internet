import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import Link from "next/link";

export const metadata = { title: "IaGO — Pilotage Intelligence Artificielle | EJ Partners" };

const modules = [
  {
    href: "/admin/ia/copilot",
    emoji: "🤖",
    label: "Copilot IaGO",
    tag: "Nouveau",
    tagColor: "#d1fae5",
    tagText: "#065f46",
    description: "Votre assistant omniscient. Posez une question, IaGO fouille le CRM et vous répond avec contexte.",
    features: ["Analyse contextuelle CRM", "Actions supervisées", "Synthèse de données"],
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%)",
    featured: true,
  },
  {
    href: "/admin/ia/resume-client",
    emoji: "📋",
    label: "Résumé de fiche client",
    tag: "Gain de temps",
    tagColor: "#dbeafe",
    tagText: "#1d4ed8",
    description: "Avant un appel, synthétisez tout l'historique d'un client en 5 points clés en quelques secondes.",
    features: ["Historique complet", "5 points clés", "Mise en condition RDV"],
    gradient: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
    featured: false,
  },
  {
    href: "/admin/ia/redaction",
    emoji: "✍️",
    label: "Assistance à la rédaction",
    tag: "Zéro faute",
    tagColor: "#fef3c7",
    tagText: "#92400e",
    description: "Générez des emails commerciaux, réponses aux objections ou courriers de résiliation avec le ton juste.",
    features: ["Ton adaptatif", "Emails & courriers", "Réponses aux objections"],
    gradient: "linear-gradient(135deg, #b45309 0%, #f59e0b 100%)",
    featured: false,
  },
  {
    href: "/admin/ia/cross-selling",
    emoji: "🎯",
    label: "Analyse & Cross-Selling",
    tag: "Opportunités",
    tagColor: "#f3e8ff",
    tagText: "#7c3aed",
    description: "L'IA scanne votre portefeuille pour identifier les garanties manquantes et suggérer du multi-équipement.",
    features: ["Détection d'opportunités", "Scoring client", "Multi-équipement"],
    gradient: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
    featured: false,
  },
];

export default async function IaPage() {
  const user = await requireRole(["admin", "courtier"]);

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="ia-hub-page">

        {/* Hero */}
        <div className="ia-hub-hero">
          <div className="ia-hub-hero-bg" />
          <div className="ia-hub-hero-content">
            <div className="ia-hub-hero-badge">
              <span className="ia-hub-hero-badge-dot" />
              Intelligence Artificielle — Powered by GPT-4o
            </div>
            <h1 className="ia-hub-hero-title">
              IaGO
              <span className="ia-hub-hero-title-sub"> — Votre Copilot Cabinet</span>
            </h1>
            <p className="ia-hub-hero-desc">
              IaGO ne devine pas les informations — il va les chercher dans votre CRM pour répondre à vos questions,
              analyser l&apos;historique d&apos;un client et préparer des actions concrètes sous votre supervision.
            </p>
            <div className="ia-hub-hero-stats">
              <div className="ia-hub-hero-stat">
                <span className="ia-hub-hero-stat-val">4</span>
                <span className="ia-hub-hero-stat-lbl">Modules IA</span>
              </div>
              <div className="ia-hub-hero-stat-sep" />
              <div className="ia-hub-hero-stat">
                <span className="ia-hub-hero-stat-val">GPT-4o</span>
                <span className="ia-hub-hero-stat-lbl">Modèle</span>
              </div>
              <div className="ia-hub-hero-stat-sep" />
              <div className="ia-hub-hero-stat">
                <span className="ia-hub-hero-stat-val">100%</span>
                <span className="ia-hub-hero-stat-lbl">Supervisé</span>
              </div>
            </div>
            <Link href="/admin/ia/copilot" className="ia-hub-hero-cta">
              <span>🤖</span> Ouvrir le Copilot IaGO
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Modules grid */}
        <div className="ia-hub-section">
          <h2 className="ia-hub-section-title">Modules disponibles</h2>
          <div className="ia-hub-modules-grid">
            {modules.map((mod) => (
              <Link key={mod.href} href={mod.href} className={`ia-hub-module-card${mod.featured ? " ia-hub-module-card--featured" : ""}`}>
                <div className="ia-hub-module-card-header" style={{ background: mod.gradient }}>
                  <span className="ia-hub-module-emoji">{mod.emoji}</span>
                  <span className="ia-hub-module-tag" style={{ background: mod.tagColor, color: mod.tagText }}>
                    {mod.tag}
                  </span>
                </div>
                <div className="ia-hub-module-body">
                  <h3 className="ia-hub-module-title">{mod.label}</h3>
                  <p className="ia-hub-module-desc">{mod.description}</p>
                  <ul className="ia-hub-module-features">
                    {mod.features.map((f) => (
                      <li key={f} className="ia-hub-module-feature">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="ia-hub-module-footer">
                  <span className="ia-hub-module-cta">
                    Accéder
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="ia-hub-disclaimer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>
            IaGO opère sous votre supervision permanente. Toutes les actions (envoi d&apos;email, création de document, modification CRM)
            nécessitent votre validation explicite avant exécution. Les analyses IA sont des suggestions, non des décisions.
          </span>
        </div>

      </div>
    </AppShell>
  );
}
