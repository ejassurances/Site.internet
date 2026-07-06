"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CalendarDays, LockKeyhole, Menu, X, ChevronDown } from "lucide-react";

// Navigation unique du site, structurée autour des 3 pôles du cabinet.
const navItems = [
  {
    label: "Assurance emprunteur",
    href: "/assurance-emprunteur",
    highlight: true,
    sub: [
      { label: "Assurance de prêt immobilier", href: "/assurance-emprunteur" },
      { label: "Simuler mon économie", href: "/devis/emprunteur" },
    ],
  },
  {
    label: "Protection & coparentalité",
    href: "/expertise-coparentalite",
    highlight: false,
    sub: [
      { label: "Coparentalité choisie", href: "/expertise-coparentalite" },
      { label: "Familles LGBT+", href: "/familles-lgbt" },
      { label: "Familles recomposées", href: "/familles-recomposees" },
      { label: "Prévoyance familiale", href: "/prevoyance-familiale" },
      { label: "Protection des enfants", href: "/protection-enfants" },
    ],
  },
  {
    label: "Professionnel",
    href: "/professionnel",
    highlight: false,
    sub: [
      { label: "Responsabilité civile pro", href: "/professionnel#rc-pro" },
      { label: "Multirisque professionnelle", href: "/professionnel#multirisque" },
      { label: "Prévoyance TNS", href: "/professionnel#prevoyance-tns" },
      { label: "Santé collective", href: "/professionnel#sante-collective" },
    ],
  },
  { label: "À propos", href: "/a-propos", highlight: false, sub: [] },
  { label: "Contact", href: "/contact", highlight: false, sub: [] },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="EJ Partners Assurances — Accueil">
        <Image
          className="brand-logo"
          src="/logo-ej-partners-assurances.png"
          alt="EJ Partners Assurances"
          width={852}
          height={253}
          priority
        />
      </Link>

      {/* Navigation desktop */}
      <nav className="public-nav" aria-label="Navigation principale">
        {navItems.map((item) => (
          <div
            key={item.href}
            className={`nav-item${item.sub.length ? " nav-item--has-sub" : ""}${item.highlight ? " nav-item--highlight" : ""}`}
            onMouseEnter={() => item.sub.length ? setOpenDropdown(item.label) : undefined}
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

      {/* Actions desktop */}
      <div className="header-actions">
        <Link className="nav-cta" href="/contact#rendez-vous">
          <CalendarDays size={15} aria-hidden />
          Rendez-vous
        </Link>
        <Link className="login-link" href="/connexion" aria-label="Espace cabinet">
          <LockKeyhole size={15} aria-hidden />
        </Link>
        <button
          className="burger-btn"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu mobile */}
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
