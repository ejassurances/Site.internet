"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const router = useRouter();
  const [done, setDone] = useState(false);
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
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));

    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/connexion"), 2000);
  }

  if (done) {
    return (
      <div className="contact-form login-form" style={{ textAlign: "center", gap: "16px" }}>
        <CheckCircle2 size={40} style={{ color: "var(--accent-strong)", margin: "0 auto" }} />
        <p style={{ fontWeight: 700, fontSize: "18px" }}>Mot de passe mis à jour</p>
        <p className="form-note">Redirection vers la page de connexion...</p>
      </div>
    );
  }

  return (
    <form className="contact-form login-form" onSubmit={handleSubmit}>
      <label>
        Nouveau mot de passe
        <input name="password" type="password" placeholder="8 caractères minimum" required minLength={8} />
      </label>
      <label>
        Confirmer le mot de passe
        <input name="confirm" type="password" placeholder="Répéter le mot de passe" required minLength={8} />
      </label>
      {error ? <p className="form-error">{error}</p> : null}
      <button className="primary-action" type="submit" disabled={loading}>
        {loading ? "Enregistrement..." : "Enregistrer le mot de passe"} <ArrowRight size={18} aria-hidden />
      </button>
    </form>
  );
}
