import { CalendarDays, Mail, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main">
        <section className="page-hero contact-hero">
          <div>
            <p className="eyebrow">Contact / prise de rendez-vous</p>
            <h1>Parlons de votre famille et de ce qui doit vraiment etre protege.</h1>
            <p className="hero-copy">
              Vous n'avez pas besoin d'avoir deja la bonne solution. Expliquez simplement votre
              situation, les personnes qui comptent et les questions qui vous inquietent.
              EJ Assurances vous recontacte dans un cadre confidentiel.
            </p>
            <div className="contact-lines">
              <a href="tel:+33189314029">
                <Phone size={18} aria-hidden /> 01.89.31.40.29
              </a>
              <span>
                <Mail size={18} aria-hidden /> contact@ej-assurances.fr
              </span>
              <span>
                <CalendarDays size={18} aria-hidden /> Rendez-vous cabinet ou visio
              </span>
            </div>
          </div>
          <form className="contact-form">
            <label>
              Nom complet
              <input name="name" placeholder="Votre nom" />
            </label>
            <label>
              Email
              <input name="email" type="email" placeholder="vous@exemple.fr" />
            </label>
            <label>
              Besoin
              <select name="need" defaultValue="">
                <option value="" disabled>
                  Choisir un sujet
                </option>
                <option>Proteger mon couple ou mon partenaire</option>
                <option>Proteger mes enfants</option>
                <option>Famille LGBT+ ou parent social</option>
                <option>Coparentalite ou famille recomposee</option>
                <option>Assurance emprunteur / logement</option>
                <option>Transmission ou succession</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="message" placeholder="Qui souhaitez-vous proteger ? Quelle situation voulez-vous securiser ?" />
            </label>
            <button className="primary-action" type="submit">
              Envoyer la demande
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
