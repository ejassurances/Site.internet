"use client";
import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("La connexion sécurisée n'est pas configurée sur cet environnement.");
      setStatus("error");
      return;
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ej-assurances.fr";

    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/reinitialiser-mot-de-passe`,
    });

    if (authError) {
      setError(authError.message);
      setStatus("error");
      return;
    }

    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="forgot-success">
        <div className="forgot-success-icon">
          <CheckCircle size={40} />
        </div>
        <h2>Email envoyé !</h2>
        <p>
          Un lien de réinitialisation a été envoyé à <strong>{email}</strong>.
          Vérifiez votre boîte de réception (et vos spams).
        </p>
        <p className="forgot-note">
          Le lien est valable <strong>1 heure</strong>. Si vous ne recevez rien,
          vérifiez que l'adresse email est bien celle associée à votre compte.
        </p>
        <a href="/connexion" className="btn-secondary">
          Retour à la connexion
        </a>
      </div>
    );
  }

  return (
    <form className="contact-form forgot-form" onSubmit={handleSubmit}>
      <div className="forgot-icon-wrap">
        <Mail size={28} />
      </div>
      <p className="forgot-intro">
        Saisissez l'adresse email associée à votre compte. Nous vous enverrons
        un lien pour créer un nouveau mot de passe.
      </p>
      <label>
        Adresse email
        <input
          name="email"
          type="email"
          placeholder="vous@exemple.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
      </label>
      {error && <p className="form-error">{error}</p>}
      <button className="primary-action" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Envoi en cours..." : "Recevoir le lien"}
        {status !== "loading" && <ArrowRight size={18} aria-hidden />}
      </button>
      <a href="/connexion" className="forgot-back-link">
        ← Retour à la connexion
      </a>
    </form>
  );
}
