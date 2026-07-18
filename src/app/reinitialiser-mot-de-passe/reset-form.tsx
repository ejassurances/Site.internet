"use client";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    // Écoute l'événement PASSWORD_RECOVERY déclenché automatiquement
    // quand Supabase détecte le token dans l'URL au chargement de la page
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setSessionReady(true);
      }
    });

    // Vérifie aussi si une session existe déjà (token déjà échangé)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = new FormData(e.currentTarget);
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      setStatus("error");
      return;
    }

    if (password !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      setStatus("error");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("La connexion sécurisée n'est pas configurée sur cet environnement.");
      setStatus("error");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setStatus("error");
      return;
    }

    setStatus("success");
    setTimeout(() => router.push("/connexion"), 3000);
  }

  if (status === "success") {
    return (
      <div className="forgot-success">
        <div className="forgot-success-icon">
          <CheckCircle size={40} />
        </div>
        <h2>Mot de passe mis à jour !</h2>
        <p>
          Votre mot de passe a été modifié avec succès. Vous allez être redirigé
          vers la page de connexion dans quelques secondes.
        </p>
        <a href="/connexion" className="btn-secondary">
          Se connecter maintenant
        </a>
      </div>
    );
  }

  if (!sessionReady) {
    return (
      <div className="forgot-success" style={{ textAlign: "center" }}>
        <Loader2 size={36} className="spin" style={{ margin: "0 auto 16px", display: "block", color: "var(--accent-strong)" }} />
        <p>Vérification du lien en cours…</p>
      </div>
    );
  }

  return (
    <form className="contact-form forgot-form" onSubmit={handleSubmit}>
      <p className="forgot-intro">
        Choisissez un nouveau mot de passe sécurisé pour votre compte EJ Partners Assurances.
        Il doit contenir au moins 8 caractères.
      </p>

      <label>
        Nouveau mot de passe
        <div className="pwd-input-wrap">
          <input
            name="password"
            type={showPwd ? "text" : "password"}
            placeholder="Minimum 8 caractères"
            required
            minLength={8}
          />
          <button
            type="button"
            className="pwd-toggle"
            onClick={() => setShowPwd(!showPwd)}
            aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </label>

      <label>
        Confirmer le mot de passe
        <div className="pwd-input-wrap">
          <input
            name="confirm"
            type={showConfirm ? "text" : "password"}
            placeholder="Répétez votre mot de passe"
            required
            minLength={8}
          />
          <button
            type="button"
            className="pwd-toggle"
            onClick={() => setShowConfirm(!showConfirm)}
            aria-label={showConfirm ? "Masquer" : "Afficher"}
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </label>

      {error && <p className="form-error">{error}</p>}

      <button className="primary-action" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Mise à jour..." : "Enregistrer le nouveau mot de passe"}
        {status !== "loading" && <ArrowRight size={18} aria-hidden />}
      </button>
    </form>
  );
}
