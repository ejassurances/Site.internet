import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Image
            className="brand-logo"
            src="/logo-ej-partners-assurances.png"
            alt="EJ Partners Assurances"
            width={852}
            height={253}
          />
          <p>
            Cabinet de courtage spécialisé dans l'accompagnement des familles modernes :
            LGBT+, coparentalité, familles recomposées. Conseil confidentiel et bienveillant.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
            <a href="tel:+33189314029" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(247,245,240,.65)", fontSize: "14px" }}>
              <Phone size={14} aria-hidden /> 01.89.31.40.29
            </a>
            <a href="mailto:contact@ej-assurances.fr" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(247,245,240,.65)", fontSize: "14px" }}>
              <Mail size={14} aria-hidden /> contact@ej-assurances.fr
            </a>
            <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(247,245,240,.65)", fontSize: "14px" }}>
              <MapPin size={14} aria-hidden /> Paris, Île-de-France
            </span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Nos expertises</h4>
          <Link href="/expertise-coparentalite">Coparentalité choisie</Link>
          <Link href="/familles-lgbt">Familles LGBT+</Link>
          <Link href="/assurance-emprunteur">Assurance emprunteur</Link>
          <Link href="/prevoyance-familiale">Prévoyance familiale</Link>
          <Link href="/protection-enfants">Protection des enfants</Link>
        </div>

        <div className="footer-col">
          <h4>Le cabinet</h4>
          <Link href="/a-propos">À propos</Link>
          <Link href="/blog">Blog & conseils</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/contact#rendez-vous">Prendre rendez-vous</Link>
          <Link href="/connexion">Espace client</Link>
        </div>

        <div className="footer-col">
          <h4>Informations légales</h4>
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/confidentialite">Politique de confidentialité</Link>
          <Link href="/informations-courtier">Informations courtier</Link>
          <span>ORIAS n° — (en cours)</span>
          <span>Courtier en assurances</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} EJ Partners Assurances. Tous droits réservés.</span>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/confidentialite">Confidentialité</Link>
          <Link href="/informations-courtier">Courtier</Link>
        </div>
      </div>
    </footer>
  );
}
