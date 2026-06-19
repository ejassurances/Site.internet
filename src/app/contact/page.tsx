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
            <h1>Parlons de votre situation avec calme et precision.</h1>
            <p className="hero-copy">
              Decrivez votre besoin, le contexte familial et les delais importants. EJ Assurances
              reviendra vers vous avec un cadre d&apos;echange confidentiel.
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
                <option>Assurance emprunteur</option>
                <option>Prevoyance familiale</option>
                <option>Coparentalite</option>
                <option>Familles LGBT+</option>
                <option>Protection des enfants</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="message" placeholder="Quelques lignes sur votre situation" />
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
