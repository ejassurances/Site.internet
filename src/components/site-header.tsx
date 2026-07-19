"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CalendarDays, ChevronDown, LockKeyhole, Menu, X } from "lucide-react";

const navItems = [
  { label: "Assurance emprunteur", href: "/assurance-emprunteur", highlight: true, sub: [] },
  {
    label: "Protection & coparentalité",
    href: "/expertise-coparentalite",
    highlight: false,
    sub: [
      { label: "Lien parent social / enfant", href: "/parent-social-enfant" },
      { label: "Familles LGBT+", href: "/familles-lgbt" },
      { label: "Protection des enfants", href: "/protection-enfants" },
      { label: "Familles recomposées", href: "/familles-recomposees" },
    ],
  },
  { label: "Professionnel", href: "/professionnel", highlight: false, sub: [] },
  { label: "Assurance-vie & patrimoine", href: "/assurance-vie-patrimoine", highlight: false, sub: [] },
  { label: "Conseils & actus", href: "/conseils-actus", highlight: false, sub: [] },
  { label: "À propos", href: "/a-propos", highlight: false, sub: [] },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="EJ Partners Assurances - Accueil">
        <Image
          className="brand-logo"
          src="/logo-ej-partners-assurances.png"
          alt="EJ Partners Assurances"
          width={852}
          height={253}
          priority
        />
      </Link>

      <nav className="public-nav" aria-label="Navigation principale">
        {navItems.map((item) => (
          <div
            key={item.href}
            className={`nav-item${item.sub.length ? " nav-item--has-sub" : ""}${item.highlight ? " nav-item--highlight" : ""}`}
            onMouseEnter={() => (item.sub.length ? setOpenDropdown(item.label) : undefined)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link href={item.href} className={item.highlight ? "nav-link-highlight" : ""}>
              {item.label}
              {item.sub.length > 0 && <ChevronDown size={12} aria-hidden style={{ marginLeft: 3, verticalAlign: "middle" }} />}
            </Link>
            {item.sub.length > 0 && openDropdown === item.label && (
              <div className="nav-dropdown">
                {item.sub.map((sub) => (
                  <Link key={sub.href} href={sub.href} className="nav-dropdown-item">
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="header-actions">
        <Link className="nav-cta" href="/contact#rendez-vous">
          <CalendarDays size={15} aria-hidden />
          Rendez-vous
        </Link>
        <Link className="login-link" href="/connexion" aria-label="Espace client et cabinet">
          <LockKeyhole size={15} aria-hidden />
        </Link>
        <button
          className="burger-btn"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
          type="button"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu mobile">
          <nav>
            {navItems.map((item) => (
              <div key={item.href} className="mobile-nav-group">
                <Link
                  href={item.href}
                  className={`mobile-nav-link${item.highlight ? " mobile-nav-link--highlight" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.sub.length > 0 && (
                  <div className="mobile-nav-sub">
                    {item.sub.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="mobile-nav-sub-link"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mobile-menu-cta">
            <Link className="primary-action" href="/contact#rendez-vous" onClick={() => setMobileOpen(false)}>
              <CalendarDays size={16} aria-hidden />
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
