import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { LogOut, ShieldCheck } from "lucide-react";
import { CurrentUser } from "@/lib/auth";
import { Role, dashboardConfig } from "@/lib/content";

type AppShellProps = {
  role: Role;
  user: CurrentUser;
  children?: ReactNode;
};

export function AppShell({ role, user, children }: AppShellProps) {
  const config = dashboardConfig[role];

  return (
    <div className="app-layout">
      <aside className="sidebar">
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
            <small>{config.title}</small>
          </span>
        </Link>
        <nav className="side-nav" aria-label={config.title}>
          {config.nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Icon size={18} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="workspace">
        <header className="workspace-header">
          <div>
            <p className="eyebrow">{config.title}</p>
            <h1>Bonjour, {user.fullName}</h1>
          </div>
          <div className="workspace-user">
            <ShieldCheck size={18} aria-hidden />
            <span>{user.role}</span>
            <form action="/auth/signout" method="post">
              <button className="icon-button" type="submit" title="Deconnexion" aria-label="Deconnexion">
                <LogOut size={16} aria-hidden />
              </button>
            </form>
          </div>
        </header>

        <section className="stats-grid" aria-label="Indicateurs">
          {config.stats.map((stat) => (
            <article className="metric" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.detail}</small>
            </article>
          ))}
        </section>

        {children ?? (
          <section className="module-grid">
            {config.sections.map((section) => (
              <article className="module" key={section.title} id={slugify(section.title)}>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
