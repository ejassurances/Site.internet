import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileText,
  FolderOpen,
  Scale,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Users,
  Workflow,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import { getAccessibleClients } from "@/lib/clients";
import { getEmprunteurStats } from "@/lib/actions/emprunteur";

const adminModuleCards = [
  {
    icon: Users,
    title: "Clients & fiches 360",
    description: "Fiches clients, familles, contrats, interactions et projets rattaches.",
    href: "/admin/clients",
    stat: "Portefeuille",
  },
  {
    icon: BriefcaseBusiness,
    title: "Assurance emprunteur",
    description: "Prospects, recueil des besoins, pieces, workflow de souscription et activation.",
    href: "/admin/emprunteur",
    stat: "Dossiers entrants",
  },
  {
    icon: Workflow,
    title: "Workflows cabinet",
    description: "Etapes, automatisations, statuts, relances et modeles operationnels.",
    href: "/admin/workflows",
    stat: "Process",
  },
  {
    icon: Scale,
    title: "Conformite",
    description: "DDA, LCB-FT, RGPD, classeurs ACPR, audit et obligations courtage.",
    href: "/admin/conformite",
    stat: "ACPR",
  },
  {
    icon: Bot,
    title: "Assistants IA",
    description: "Resume client, redaction, anonymisation, copilot et recommandations.",
    href: "/admin/ia",
    stat: "Copilot",
  },
  {
    icon: BarChart3,
    title: "Pilotage",
    description: "Production, portefeuille, statistiques commerciales et indicateurs cabinet.",
    href: "/admin/stats",
    stat: "KPIs",
  },
];

export default async function AdminDashboardPage() {
  const user = await requireRole(["admin", "courtier"]);
  const [clients, emprunteurStats] = await Promise.all([
    getAccessibleClients(user),
    getEmprunteurStats(),
  ]);

  const activeClients = clients.length;
  const pendingBorrowerFiles = emprunteurStats.non_convertis;

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <section className="admin-home-hero">
        <div>
          <p className="eyebrow">Espace cabinet</p>
          <h1>Piloter EJ Assurances sans perdre le fil des dossiers.</h1>
          <p>
            Une vue claire pour creer une fiche client, traiter les prospects emprunteur,
            suivre les workflows et garder la conformite au centre du dossier.
          </p>
          <div className="admin-home-actions">
            <Link href="/admin/clients/nouveau" className="primary-action">
              <UserPlus size={17} aria-hidden /> Creer une fiche client
            </Link>
            <Link href="/admin/emprunteur" className="secondary-action">
              <BriefcaseBusiness size={17} aria-hidden /> Traiter les dossiers emprunteur
            </Link>
          </div>
        </div>

        <div className="admin-home-focus-card">
          <div className="admin-home-focus-top">
            <ShieldCheck size={20} aria-hidden />
            <span>Priorite cabinet</span>
          </div>
          <strong>{pendingBorrowerFiles}</strong>
          <p>dossier{pendingBorrowerFiles > 1 ? "s" : ""} emprunteur a convertir ou suivre</p>
          <Link href="/admin/emprunteur">
            Ouvrir la file <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="admin-home-kpis" aria-label="Indicateurs cabinet">
        <article>
          <Users size={18} aria-hidden />
          <span>Clients accessibles</span>
          <strong>{activeClients}</strong>
          <small>fiches en portefeuille</small>
        </article>
        <article>
          <ClipboardList size={18} aria-hidden />
          <span>Emprunteur</span>
          <strong>{emprunteurStats.total}</strong>
          <small>dossiers recus</small>
        </article>
        <article>
          <CheckCircle2 size={18} aria-hidden />
          <span>Convertis CRM</span>
          <strong>{emprunteurStats.convertis}</strong>
          <small>fiches rattachees</small>
        </article>
        <article>
          <TrendingUp size={18} aria-hidden />
          <span>Cette semaine</span>
          <strong>{emprunteurStats.cette_semaine}</strong>
          <small>nouveaux dossiers</small>
        </article>
      </section>

      <section className="admin-home-section" aria-label="Actions rapides">
        <div className="admin-home-section-header">
          <div>
            <p className="eyebrow">Actions rapides</p>
            <h2>Ce que vous faites le plus souvent</h2>
          </div>
        </div>
        <div className="admin-quick-grid">
          <Link href="/admin/clients/nouveau">
            <UserPlus size={18} aria-hidden />
            <span>Nouvelle fiche client</span>
            <ChevronRight size={15} aria-hidden />
          </Link>
          <Link href="/admin/family-protection-os/recueil">
            <FileText size={18} aria-hidden />
            <span>Recueil des besoins</span>
            <ChevronRight size={15} aria-hidden />
          </Link>
          <Link href="/admin/conformite/lcb-ft">
            <Scale size={18} aria-hidden />
            <span>Controle LCB-FT</span>
            <ChevronRight size={15} aria-hidden />
          </Link>
          <Link href="/admin/vente/ged">
            <FolderOpen size={18} aria-hidden />
            <span>Centre documentaire</span>
            <ChevronRight size={15} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="admin-home-section" aria-label="Modules cabinet">
        <div className="admin-home-section-header">
          <div>
            <p className="eyebrow">Modules cabinet</p>
            <h2>Votre espace de travail</h2>
          </div>
        </div>

        <div className="admin-home-modules-grid">
          {adminModuleCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.href} href={card.href} className="admin-home-module-card">
                <div className="admin-home-module-icon">
                  <Icon size={19} aria-hidden />
                </div>
                <span>{card.stat}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div>
                  Acceder <ChevronRight size={15} aria-hidden />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {clients.length > 0 && (
        <section className="admin-home-section" aria-label="Derniers clients">
          <div className="admin-home-section-header">
            <div>
              <p className="eyebrow">Acces rapide</p>
              <h2>Derniers clients</h2>
            </div>
            <Link href="/admin/clients">
              Voir tous <ChevronRight size={14} aria-hidden />
            </Link>
          </div>

          <div className="admin-home-client-list">
            {clients.slice(0, 5).map((client) => (
              <Link key={client.id} href={`/admin/clients/${client.id}`}>
                <div>
                  <strong>{client.full_name}</strong>
                  <p>{client.email || "Email non renseigne"}</p>
                </div>
                <ChevronRight size={15} aria-hidden />
              </Link>
            ))}
          </div>
        </section>
      )}
    </AppShell>
  );
}
