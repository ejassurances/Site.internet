import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Mot de passe oublié — EJ Assurances",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main">
        <section className="page-hero login-hero">
          <div>
            <p className="eyebrow">Réinitialisation</p>
            <h1>Mot de passe oublié ?</h1>
            <p className="hero-copy">
              Entrez votre adresse email. Vous recevrez un lien pour créer un nouveau mot de passe.
            </p>
          </div>
          <ForgotPasswordForm />
        </section>
      </main>
    </>
  );
}
