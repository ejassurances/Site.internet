import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Connexion — EJ Assurances",
  robots: { index: false, follow: false },
};

export default function ConnexionPage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main">
        <section className="page-hero login-hero">
          <div>
            <p className="eyebrow">Connexion securisee</p>
            <h1>Acceder a votre espace EJ Assurances.</h1>
            <p className="hero-copy">
              Les espaces connectes sont separes par role afin que chaque personne voie uniquement
              les informations utiles a sa mission ou a son dossier.
            </p>
            <div className="trust-row standalone">
              <ShieldCheck size={20} aria-hidden />
              Authentification Supabase, profils par role et politiques RLS cote base.
            </div>
          </div>
          <LoginForm />
        </section>
      </main>
    </>
  );
}
