import Link from "next/link";
import { ChevronRight, Construction } from "lucide-react";
import type { ReactNode } from "react";

type SubLink = {
  label: string;
  href: string;
  description: string;
  emoji: string;
};

type AdminModulePageProps = {
  emoji: string;
  title: string;
  description: string;
  parentHref?: string;
  parentLabel?: string;
  subLinks?: SubLink[];
  children?: ReactNode;
};

export function AdminModulePage({
  emoji,
  title,
  description,
  parentHref = "/admin",
  parentLabel = "Tableau de bord",
  subLinks = [],
  children,
}: AdminModulePageProps) {
  return (
    <>
      {/* Breadcrumb */}
      <nav className="page-breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/admin">Accueil</Link>
        <ChevronRight size={12} />
        {parentHref !== "/admin" && (
          <>
            <Link href={parentHref}>{parentLabel}</Link>
            <ChevronRight size={12} />
          </>
        )}
        <span>{title}</span>
      </nav>

      {/* Header module */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "28px" }}>
        <div
          style={{
            display: "grid",
            width: "52px",
            height: "52px",
            placeItems: "center",
            borderRadius: "12px",
            background: "var(--surface-soft)",
            fontSize: "26px",
            flexShrink: 0,
          }}
        >
          {emoji}
        </div>
        <div>
          <p className="eyebrow" style={{ marginBottom: "4px" }}>{parentLabel}</p>
          <h1 style={{ margin: 0, fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.1 }}>{title}</h1>
          <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: "15px" }}>{description}</p>
        </div>
      </div>

      {/* Sous-modules */}
      {subLinks.length > 0 && (
        <div className="admin-modules-grid" style={{ marginBottom: "32px" }}>
          {subLinks.map((link) => (
            <Link key={link.href} href={link.href} className="admin-module-card">
              <div className="admin-module-icon">{link.emoji}</div>
              <h3>{link.label}</h3>
              <p>{link.description}</p>
              <div className="admin-module-card-footer">
                <span>Accéder</span>
                <ChevronRight size={16} aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Contenu custom ou placeholder */}
      {children ?? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            minHeight: "300px",
            border: "2px dashed var(--line)",
            borderRadius: "var(--radius)",
            background: "rgba(255,255,255,.5)",
            color: "var(--muted)",
            textAlign: "center",
            padding: "40px",
          }}
        >
          <Construction size={40} style={{ opacity: .4 }} aria-hidden />
          <div>
            <strong style={{ display: "block", color: "var(--ink)", marginBottom: "6px" }}>
              Module en cours de développement
            </strong>
            <p style={{ margin: 0, fontSize: "14px" }}>
              Ce module sera disponible prochainement. Contactez l'équipe pour une démonstration.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
