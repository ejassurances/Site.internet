"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("La connexion sécurisée n'est pas configurée.");
      setLoading(false);
      return;
    }

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));

    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/connexion/nouveau-mot-de-passe`,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="contact-form login-form" style={{ textAlign: "center", gap: "16px" }}>
        <CheckCircle2 size={40} style={{ color: "var(--accent-strong)", margin: "0 auto" }} />
        <p style={{ fontWeight: 700, fontSize: "18px" }}>Email envoyé</p>
        <p className="form-note">
          Si cette adresse est associée à un compte, vous recevrez un lien de réinitialisation dans quelques minutes.
          Vérifiez vos spams si nécessaire.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form login-form" onSubmit={handleSubmit}>
      <label>
        Email
        <input name="email" type="email" placeholder="vous@exemple.fr" required />
      </label>
      {error ? <p className="form-error">{error}</p> : null}
      <button className="primary-action" type="submit" disabled={loading}>
        {loading ? "Envoi..." : "Envoyer le lien"} <ArrowRight size={18} aria-hidden />
      </button>
      <p className="form-note">
        Vous recevrez un lien valable 1 heure pour créer un nouveau mot de passe.
      </p>
    </form>
  );
}
