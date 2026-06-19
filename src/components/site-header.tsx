import Link from "next/link";
import Image from "next/image";
import { LockKeyhole } from "lucide-react";
import { publicNav } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="EJ Assurances - Accueil">
        <Image
          className="brand-logo"
          src="/logo-ej-partners-assurances.png"
          alt="EJ Partners Assurances"
          width={852}
          height={253}
          priority
        />
      </Link>

      <nav className="public-nav" aria-label="Navigation publique">
        {publicNav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <Link className="login-link" href="/connexion">
        <LockKeyhole size={16} aria-hidden />
        Connexion
      </Link>
    </header>
  );
}
