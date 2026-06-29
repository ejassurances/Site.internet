import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function EconomiesCounter() {
  let total = 0;

  try {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data } = await supabase
        .from("cabinet_stats")
        .select("economies_emprunteur_euros")
        .eq("id", "singleton")
        .single();
      if (data) total = data.economies_emprunteur_euros;
    }
  } catch {
    // Si pas de BDD configurée, on affiche 0
  }

  const formatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(total);

  return (
    <div className="economies-counter" aria-label="Économies réalisées pour nos clients">
      <p className="eyebrow">Économies cumulées sur assurance emprunteur</p>
      <p className="economies-amount">{formatted}</p>
      <p className="economies-target">Objectif : 100 000 €</p>
      <div className="economies-bar" aria-hidden>
        <div
          className="economies-progress"
          style={{ width: `${Math.min((total / 100000) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
