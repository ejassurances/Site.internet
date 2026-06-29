import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ResetPasswordForm } from "./reset-form";

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
            <p className="eyebrow">Nouveau mot de passe</p>
            <h1>Choisissez votre nouveau mot de passe.</h1>
            <p className="hero-copy">
              Vous avez cliqué sur le lien de réinitialisation reçu par email.
              Définissez maintenant un nouveau mot de passe sécurisé pour accéder
              à votre espace EJ Assurances.
            </p>
            <div className="trust-row standalone">
              <ShieldCheck size={20} aria-hidden />
              Connexion sécurisée par Supabase Auth.
            </div>
          </div>
          <ResetPasswordForm />
        </section>
      </main>
    </>
  );
}
