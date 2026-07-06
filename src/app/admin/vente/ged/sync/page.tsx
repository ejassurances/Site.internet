import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { getDriveSyncStatus } from "@/lib/actions/drive-sync";
import { DriveSyncPanel } from "@/components/forms/drive-sync-panel";
import { RefreshCw } from "lucide-react";

export const metadata = { title: "Synchronisation Drive — EJ Assurances" };

export default async function DriveSyncPage() {
  const user = await requireRole(["admin", "courtier"]);
  const status = await getDriveSyncStatus();

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="ops-page">
        <nav className="page-breadcrumb" aria-label="Fil d'Ariane">
          <Link href="/admin">Accueil</Link>
          <span>/</span>
          <Link href="/admin/vente/ged">GED</Link>
          <span>/</span>
          <span>Synchronisation Drive</span>
        </nav>

        <header className="ops-hero">
          <div>
            <p className="eyebrow">CRM → Google Drive</p>
            <h1>Synchronisation Drive</h1>
            <p>
              Rattrape les dossiers Drive manquants pour les clients et partenaires déjà présents dans le CRM.
              Chaque partenaire obtient ses sous-dossiers (Produits, Conventions, Commissions…) et chaque produit
              son sous-dossier <strong>CG</strong> pour y déposer les conditions générales.
            </p>
          </div>
          <div className="ops-hero-badge">
            <RefreshCw size={18} aria-hidden />
            Sync
          </div>
        </header>

        <section className="ops-grid ops-grid--two">
          <DriveSyncPanel status={status} />

          <div className="ops-card">
            <div className="ops-card-title">
              <RefreshCw size={18} aria-hidden />
              <h2>Bon à savoir</h2>
            </div>
            <ul className="ops-list">
              <li>La création automatique ne se déclenche que pour les nouveaux enregistrements ; cette page rattrape l&apos;existant.</li>
              <li>Les éléments déjà liés à un dossier Drive sont ignorés.</li>
              <li>Le traitement se fait par lots : si un reliquat subsiste, relancez la synchronisation.</li>
              <li>Une fois le partenaire synchronisé, ses produits (et le dossier CG) peuvent l&apos;être à leur tour.</li>
            </ul>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
