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
          <form className="contact-form needs-contact-form">
            <section className="form-section">
              <p className="eyebrow">Vos coordonnees</p>
              <div className="form-grid two">
                <label>
                  Nom complet
                  <input name="name" placeholder="Votre nom" required />
                </label>
                <label>
                  Telephone
                  <input name="phone" type="tel" placeholder="01.23.45.67.89" />
                </label>
              </div>
              <label>
                Email
                <input name="email" type="email" placeholder="vous@exemple.fr" required />
              </label>
            </section>

            <section className="form-section">
              <p className="eyebrow">Votre situation familiale</p>
              <div className="form-grid two">
                <label>
                  Situation principale
                  <select name="familySituation" defaultValue="">
                    <option value="" disabled>
                      Choisir une situation
                    </option>
                    <option>Couple marie ou pacse</option>
                    <option>Concubinage</option>
                    <option>Famille LGBT+</option>
                    <option>Coparentalite choisie</option>
                    <option>Famille recomposee</option>
                    <option>Parent social / enfant social</option>
                    <option>Autre situation familiale</option>
                  </select>
                </label>
                <label>
                  Degre d'urgence
                  <select name="urgency" defaultValue="">
                    <option value="" disabled>
                      Choisir
                    </option>
                    <option>Simple question</option>
                    <option>Projet en cours</option>
                    <option>Decision a prendre rapidement</option>
                    <option>Situation sensible ou urgente</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="form-section">
              <p className="eyebrow">Personnes a proteger</p>
              <fieldset className="checkbox-group">
                <legend>Qui souhaitez-vous securiser en priorite ?</legend>
                <label>
                  <input type="checkbox" name="protectPartner" />
                  Mon conjoint, partenaire ou compagnon/compagne
                </label>
                <label>
                  <input type="checkbox" name="protectChildren" />
                  Mes enfants
                </label>
                <label>
                  <input type="checkbox" name="protectSocialParent" />
                  Un parent social ou une personne non reconnue juridiquement
                </label>
                <label>
                  <input type="checkbox" name="protectHome" />
                  Le logement familial
                </label>
              </fieldset>
            </section>

            <section className="form-section">
              <p className="eyebrow">Votre besoin</p>
              <label>
                Sujet prioritaire
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
                Ce que vous voulez eviter
                <textarea
                  name="message"
                  placeholder="Exemple : que mon partenaire ne soit pas protege, que mes enfants soient fragilises, que le logement soit bloque, que ma succession ne corresponde pas a ma volonte..."
                />
              </label>
            </section>

            <label className="consent-line">
              <input type="checkbox" name="consent" required />
              J'accepte d'etre recontacte par EJ Assurances pour analyser ma situation. Les informations transmises restent confidentielles.
            </label>
            <button className="primary-action" type="submit">
              Demander une premiere analyse
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
