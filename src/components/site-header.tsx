import Link from "next/link";
import Image from "next/image";
import { CalendarDays, LockKeyhole } from "lucide-react";

const navLinks = [
  { label: "Coparentalité", href: "/expertise-coparentalite" },
  { label: "Familles LGBT+", href: "/familles-lgbt" },
  { label: "Emprunteur", href: "/assurance-emprunteur" },
  { label: "Prévoyance", href: "/prevoyance-familiale" },
  { label: "Enfants", href: "/protection-enfants" },
  { label: "À propos", href: "/a-propos" },
];

export function SiteHeader() {
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

      <nav className="public-nav" aria-label="Navigation principale">
        {navLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
        <Link className="nav-cta" href="/contact#rendez-vous">
          <CalendarDays size={15} aria-hidden />
          Prendre rendez-vous
        </Link>
        <Link className="login-link" href="/connexion">
          <LockKeyhole size={15} aria-hidden />
          Connexion
        </Link>
      </div>
    </header>
  );
}
