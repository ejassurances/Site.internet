"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("La connexion sécurisée n'est pas configurée sur cet environnement.");
      setLoading(false);
      return;
    }

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/client");
    router.refresh();
  }

  return (
    <form className="contact-form login-form" onSubmit={handleSubmit}>
      <label>
        Email
        <input name="email" type="email" placeholder="vous@ej-assurances.fr" required />
      </label>
      <label>
        Mot de passe
        <input name="password" type="password" placeholder="Votre mot de passe" required />
      </label>
      {error ? <p className="form-error">{error}</p> : null}
      <button className="primary-action" type="submit" disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"} <ArrowRight size={18} aria-hidden />
      </button>
      <div className="login-footer">
        <a href="/mot-de-passe-oublie" className="forgot-link">
          Mot de passe oublié ?
        </a>
      </div>
      <p className="form-note">
        Connexion sécurisée par Supabase. Les accès sont réservés aux clients et partenaires autorisés.
      </p>
    </form>
  );
}
