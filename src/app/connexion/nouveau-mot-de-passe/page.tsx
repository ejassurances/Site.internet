import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { ResetPasswordForm } from "./reset-password-form";

export const metadata: Metadata = {
  title: "Nouveau mot de passe — EJ Assurances",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main">
        <section className="page-hero login-hero">
          <div>
            <p className="eyebrow">Réinitialisation</p>
            <h1>Créer un nouveau mot de passe</h1>
            <p className="hero-copy">
              Choisissez un mot de passe sécurisé d'au moins 8 caractères.
            </p>
          </div>
          <ResetPasswordForm />
        </section>
      </main>
    </>
  );
}
