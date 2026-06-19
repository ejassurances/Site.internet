import type { Metadata } from "next";
import { CalendarDays, Mail, Phone } from "lucide-react";
import { createContactIntakeAction } from "@/app/actions/contact-intake";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Contact & Rendez-vous — EJ Partners Assurances",
  description:
    "Prenez rendez-vous avec EJ Partners Assurances. Formulaire de contact, prise de rendez-vous en ligne via Koalendar. Cabinet spécialisé familles modernes.",
};

type ContactPageProps = {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { success, error } = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="public-main">
        {/* ── Hero formulaire ── */}
        <section className="page-hero contact-hero">
          <div>
            <p className="eyebrow">Contact / prise de rendez-vous</p>
            <h1>Parlons de votre famille et de ce qui doit vraiment être protégé.</h1>
            <p className="hero-copy">
              Vous n'avez pas besoin d'avoir déjà la bonne solution. Expliquez simplement votre
              situation, les personnes qui comptent et les questions qui vous inquiètent.
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
                <CalendarDays size={18} aria-hidden /> Rendez-vous cabinet, téléphone ou visio
              </span>
            </div>
          </div>

          <form className="contact-form needs-contact-form" action={createContactIntakeAction}>
            {success && (
              <p className="form-success">
                Votre demande est enregistrée. Une fiche client a été créée et un lien de connexion vous a été envoyé par email.
              </p>
            )}
            {error && (
              <p className="form-error">
                Impossible d'enregistrer la demande pour le moment. Vérifiez les informations ou contactez le cabinet.
              </p>
            )}

            <section className="form-section">
              <p className="eyebrow">Vos coordonnées</p>
              <div className="form-grid two">
                <label>
                  Nom complet *
                  <input name="name" placeholder="Votre nom" required />
                </label>
                <label>
                  Téléphone
                  <input name="phone" type="tel" placeholder="01.23.45.67.89" />
                </label>
              </div>
              <label>
                Email *
                <input name="email" type="email" placeholder="vous@exemple.fr" required />
              </label>
            </section>

            <section className="form-section">
              <p className="eyebrow">Votre situation familiale</p>
              <div className="form-grid two">
                <label>
                  Situation principale
                  <select name="familySituation" defaultValue="">
                    <option value="" disabled>Choisir une situation</option>
                    <option>Couple marié ou pacsé</option>
                    <option>Concubinage</option>
                    <option>Famille LGBT+</option>
                    <option>Coparentalité choisie</option>
                    <option>Famille recomposée</option>
                    <option>Parent social / enfant social</option>
                    <option>Autre situation familiale</option>
                  </select>
                </label>
                <label>
                  Degré d'urgence
                  <select name="urgency" defaultValue="">
                    <option value="" disabled>Choisir</option>
                    <option>Simple question</option>
                    <option>Projet en cours</option>
                    <option>Décision à prendre rapidement</option>
                    <option>Situation sensible ou urgente</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="form-section">
              <p className="eyebrow">Personnes à protéger</p>
              <fieldset className="checkbox-group">
                <legend>Qui souhaitez-vous sécuriser en priorité ?</legend>
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
                  <option value="" disabled>Choisir un sujet</option>
                  <option>Protéger mon couple ou mon partenaire</option>
                  <option>Protéger mes enfants</option>
                  <option>Famille LGBT+ ou parent social</option>
                  <option>Coparentalité ou famille recomposée</option>
                  <option>Assurance emprunteur / logement</option>
                  <option>Transmission ou succession</option>
                </select>
              </label>
              <label>
                Type de rendez-vous souhaité
                <select name="rdvType" defaultValue="">
                  <option value="" disabled>Choisir</option>
                  <option>Visio (en ligne)</option>
                  <option>Téléphone</option>
                  <option>Cabinet à Paris</option>
                </select>
              </label>
              <label>
                Ce que vous voulez éviter
                <textarea
                  name="message"
                  placeholder="Exemple : que mon partenaire ne soit pas protégé, que mes enfants soient fragilisés, que le logement soit bloqué..."
                />
              </label>
            </section>

            <label className="consent-line">
              <input type="checkbox" name="consent" required />
              J'accepte d'être recontacté(e) par EJ Assurances pour analyser ma situation. Les informations transmises restent confidentielles et ne seront pas partagées sans mon accord. *
            </label>
            <label className="consent-line">
              <input type="checkbox" name="partnerConsent" />
              J'accepte aussi, si mon besoin le nécessite, d'être recontacté(e) par un partenaire sélectionné du cabinet (notaire, avocat, conseiller patrimonial).
            </label>

            <button className="primary-action" type="submit" style={{ width: "100%" }}>
              Demander une première analyse
            </button>
          </form>
        </section>

        {/* ── Agenda Koalendar ── */}
        <section className="koalendar-section" id="rendez-vous" aria-label="Prise de rendez-vous en ligne">
          <p className="eyebrow">Agenda en ligne</p>
          <h2>Réservez directement un créneau dans l'agenda du cabinet</h2>
          <p>
            Choisissez le créneau qui vous convient. Rendez-vous en visio, par téléphone ou en cabinet à Paris.
          </p>
          {/* Koalendar Inline Embed Start */}
          <div id="inline-widget-ej-partners-assurances"></div>
          {/* Koalendar Inline Embed End */}
        </section>

        {/* Scripts Koalendar — chargés côté client */}
      </main>
      <SiteFooter />

      {/* Koalendar scripts avec is:inline équivalent Next.js */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.Koalendar=window.Koalendar||function(){(Koalendar.props=Koalendar.props||[]).push(arguments)};`,
        }}
      />
      <script async src="https://koalendar.com/assets/widget.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `Koalendar('inline', {"url":"https://koalendar.com/e/ej-partners-assurances","selector":"#inline-widget-ej-partners-assurances"});`,
        }}
      />
    </>
  );
}
