import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ForgotPasswordForm } from "./forgot-form";

export const metadata: Metadata = {
  title: "Mot de passe oublié — EJ Partners Assurances",
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
            <h1>Vous avez oublié votre mot de passe ?</h1>
            <p className="hero-copy">
              Pas de panique. Renseignez votre adresse email et nous vous enverrons
              un lien sécurisé pour créer un nouveau mot de passe en quelques secondes.
            </p>
            <div className="trust-row standalone">
              <ShieldCheck size={20} aria-hidden />
              Lien de réinitialisation sécurisé, valable 1 heure.
            </div>
          </div>
          <ForgotPasswordForm />
        </section>
      </main>
    </>
  );
}
