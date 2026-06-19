"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  LogOut,
  ShieldCheck,
  LayoutDashboard,
  Users,
  FolderOpen,
  FileText,
  TrendingUp,
  Zap,
  Bot,
  Scale,
  DollarSign,
  BarChart3,
  ChevronRight,
  Settings,
  Bell,
  Search,
} from "lucide-react";
import { CurrentUser } from "@/lib/auth";
import { Role } from "@/lib/content";

type AppShellProps = {
  role: Role;
  user: CurrentUser;
  children?: ReactNode;
};

const adminModules = [
  {
    id: "crm",
    label: "CRM & Productivité",
    emoji: "🗂️",
    icon: Users,
    href: "/admin/crm",
    description: "Clients, contacts, agenda, tâches",
    links: [
      { label: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
      { label: "Clients", href: "/admin/clients", icon: Users },
      { label: "Contacts & Prospects", href: "/admin/crm/contacts", icon: Users },
      { label: "Agenda & RDV", href: "/admin/crm/agenda", icon: LayoutDashboard },
      { label: "Tâches", href: "/admin/crm/taches", icon: FileText },
    ],
  },
  {
    id: "vente",
    label: "Vente, Leads & GED",
    emoji: "💼",
    icon: TrendingUp,
    href: "/admin/vente",
    description: "Pipeline, devis, documents",
    links: [
      { label: "Pipeline commercial", href: "/admin/vente/pipeline", icon: TrendingUp },
      { label: "Leads entrants", href: "/admin/vente/leads", icon: TrendingUp },
      { label: "Devis & Propositions", href: "/admin/vente/devis", icon: FileText },
      { label: "GED — Documents", href: "/admin/vente/ged", icon: FolderOpen },
      { label: "Méthode cabinet", href: "/admin/family-protection-os", icon: ShieldCheck },
    ],
  },
  {
    id: "workflows",
    label: "Workflows",
    emoji: "⚙️",
    icon: Zap,
    href: "/admin/workflows",
    description: "Automatisations, processus, statuts",
    links: [
      { label: "Mes workflows", href: "/admin/workflows", icon: Zap },
      { label: "Automatisations", href: "/admin/workflows/automatisations", icon: Zap },
      { label: "Statuts de dossier", href: "/admin/workflows/statuts", icon: FileText },
      { label: "Modèles de documents", href: "/admin/workflows/templates", icon: FileText },
      { label: "Notifications", href: "/admin/workflows/notifications", icon: Bell },
    ],
  },
  {
    id: "ia",
    label: "Pilotage IA",
    emoji: "🤖",
    icon: Bot,
    href: "/admin/ia",
    description: "Analyse IA, recommandations, scoring",
    links: [
      { label: "Tableau IA", href: "/admin/ia", icon: Bot },
      { label: "Analyse familiale IA", href: "/admin/ia/analyse-familiale", icon: Bot },
      { label: "Scoring clients", href: "/admin/ia/scoring", icon: BarChart3 },
      { label: "Recommandations", href: "/admin/ia/recommandations", icon: Bot },
      { label: "Recueil des besoins", href: "/admin/family-protection-os/recueil", icon: FileText },
    ],
  },
  {
    id: "conformite",
    label: "Conformité",
    emoji: "⚖️",
    icon: Scale,
    href: "/admin/conformite",
    description: "ORIAS, DDA, RGPD, classeurs ACPR",
    links: [
      { label: "Tableau conformité", href: "/admin/conformite", icon: Scale },
      { label: "Classeurs ACPR", href: "/admin/conformite/acpr", icon: FolderOpen },
      { label: "DDA & Devoir conseil", href: "/admin/conformite/dda", icon: FileText },
      { label: "RGPD", href: "/admin/conformite/rgpd", icon: ShieldCheck },
      { label: "Journal d'audit", href: "/admin/conformite/audit", icon: FileText },
    ],
  },
  {
    id: "finance",
    label: "Finance & Coms",
    emoji: "💰",
    icon: DollarSign,
    href: "/admin/finance",
    description: "Commissions, mandataires, facturation",
    links: [
      { label: "Tableau finance", href: "/admin/finance", icon: DollarSign },
      { label: "Commissions", href: "/admin/finance/commissions", icon: DollarSign },
      { label: "Mandataires", href: "/admin/mandataire", icon: Users },
      { label: "Prescripteurs", href: "/admin/prescripteur", icon: Users },
      { label: "Facturation", href: "/admin/finance/facturation", icon: FileText },
    ],
  },
  {
    id: "stats",
    label: "Stats & Analyses",
    emoji: "📊",
    icon: BarChart3,
    href: "/admin/stats",
    description: "KPIs, rapports, performance",
    links: [
      { label: "Vue d'ensemble", href: "/admin/stats", icon: BarChart3 },
      { label: "Performance cabinet", href: "/admin/stats/performance", icon: TrendingUp },
      { label: "Rapports clients", href: "/admin/stats/clients", icon: Users },
      { label: "Rapports financiers", href: "/admin/stats/finance", icon: DollarSign },
      { label: "Exports", href: "/admin/stats/exports", icon: FolderOpen },
    ],
  },
];

const clientModules = [
  { label: "Tableau de bord", href: "/client", icon: LayoutDashboard },
  { label: "Diagnostic familial", href: "/client/diagnostic-familial", icon: ShieldCheck },
  { label: "Mes projets", href: "/client#projets", icon: FolderOpen },
  { label: "Mes contrats", href: "/client#contrats", icon: FileText },
  { label: "Mes documents", href: "/client#documents", icon: FolderOpen },
  { label: "Classeur ACPR", href: "/client#classeur-acpr", icon: Scale },
  { label: "Messages", href: "/client#messages", icon: Bell },
];

export function AppShell({ role, user, children }: AppShellProps) {
  const pathname = usePathname();
  const isAdmin = role === "admin" || role === "courtier";

  return (
    <div className="app-layout">
      <aside className="sidebar">
        {/* Brand */}
        <Link className="brand app-brand" href="/">
          <Image
            className="brand-logo"
            src="/logo-ej-partners-assurances.png"
            alt="EJ Partners Assurances"
            width={852}
            height={253}
            priority
          />
          <span className="app-brand-title">
            <small>{isAdmin ? "Espace cabinet" : "Espace client"}</small>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="side-nav" aria-label={isAdmin ? "Navigation cabinet" : "Navigation client"}>
          {isAdmin ? (
            <>
              {adminModules.map((module, idx) => {
                const Icon = module.icon;
                const isActive = module.links.some((l) => pathname === l.href || pathname.startsWith(l.href + "/"));
                return (
                  <div key={module.id} className="side-nav-group">
                    {idx > 0 && <div className="side-nav-divider" />}
                    <div className="side-nav-group-label">
                      <Icon size={12} aria-hidden />
                      {module.emoji} {module.label}
                    </div>
                    {module.links.map((link) => {
                      const LinkIcon = link.icon;
                      const linkActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={linkActive ? "active" : ""}
                        >
                          <LinkIcon size={15} aria-hidden />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </>
          ) : (
            clientModules.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={active ? "active" : ""}>
                  <Icon size={15} aria-hidden />
                  {item.label}
                </Link>
              );
            })
          )}

          <div className="side-nav-divider" />

          {/* Paramètres */}
          <Link href={isAdmin ? "/admin/parametres" : "/client#parametres"}>
            <Settings size={15} aria-hidden />
            Paramètres
          </Link>
        </nav>

        {/* Sidebar footer */}
        <div className="sidebar-footer">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", color: "rgba(247,245,240,.55)", fontSize: "13px" }}>
            <ShieldCheck size={14} aria-hidden />
            <span style={{ flex: 1 }}>{user.email}</span>
          </div>
          <form action="/auth/signout" method="post">
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                minHeight: "38px",
                padding: "0 10px",
                border: 0,
                borderRadius: "8px",
                background: "rgba(255,255,255,.07)",
                color: "rgba(247,245,240,.65)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background .15s",
              }}
              type="submit"
            >
              <LogOut size={14} aria-hidden />
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      {/* Main workspace */}
      <main className="workspace">
        <header className="workspace-header">
          <div>
            <p className="eyebrow">{isAdmin ? "Cabinet EJ Partners Assurances" : "Espace client"}</p>
            <h1>Bonjour, {user.fullName.split(" ")[0]} 👋</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button className="icon-button" title="Recherche" aria-label="Recherche">
              <Search size={16} aria-hidden />
            </button>
            <button className="icon-button" title="Notifications" aria-label="Notifications">
              <Bell size={16} aria-hidden />
            </button>
            <div className="workspace-user">
              <ShieldCheck size={16} aria-hidden />
              <span>{user.fullName}</span>
              <span style={{ padding: "3px 8px", borderRadius: "999px", background: "rgba(7,24,39,.07)", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em" }}>
                {user.role}
              </span>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
