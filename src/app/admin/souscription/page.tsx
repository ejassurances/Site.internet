import Link from "next/link";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PRODUCTS } from "@/lib/souscription";
import { ClipboardList, FileSignature, ArrowRight } from "lucide-react";

export const metadata = { title: "Workbook souscription — EJ Assurances" };

const STATUS_LABEL: Record<string, string> = {
  a_signer: "À signer",
  signee: "Signée",
  annulee: "Annulée",
};

export default async function SouscriptionWorkbookPage() {
  const user = await requireRole(["admin", "courtier", "mandataire"]).catch(() => null);
  if (!user) redirect("/connexion");

  const supabase = await createSupabaseServerClient();
  let lettres: Array<{
    id: string;
    reference: string;
    product: string;
    status: string;
    created_at: string;
    client: { full_name: string | null }[] | null;
  }> = [];

  if (supabase) {
    const { data } = await supabase
      .from("lettres_mission")
      .select("id, reference, product, status, created_at, client:clients(full_name)")
      .order("created_at", { ascending: false })
      .limit(20);
    lettres = (data as typeof lettres) ?? [];
  }

  const shellRole = user.role === "mandataire" ? "mandataire" : user.role === "courtier" ? "courtier" : "admin";

  return (
    <AppShell role={shellRole} user={user}>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h1>
            <ClipboardList size={22} aria-hidden /> Workbook souscription
          </h1>
          <p className="admin-page-subtitle">
            Lancez un recueil des besoins pour générer automatiquement une lettre de mission conforme DDA,
            à faire signer par le client depuis son espace.
          </p>
        </div>
      </div>

      <div className="souscription-products">
        {Object.values(PRODUCTS).map((product) => (
          <Link key={product.key} href={`/admin/souscription/${product.key}`} className="souscription-product-card">
            <span className="souscription-emoji" aria-hidden>
              {product.icon}
            </span>
            <div>
              <h3>{product.label}</h3>
              <p>{product.tagline}</p>
            </div>
            <ArrowRight size={18} aria-hidden className="souscription-product-arrow" />
          </Link>
        ))}
      </div>

      <section className="admin-form-container">
        <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FileSignature size={18} aria-hidden /> Lettres de mission récentes
        </h2>
        {lettres.length === 0 ? (
          <p className="field-hint">Aucune lettre de mission générée pour le moment.</p>
        ) : (
          <table className="stats-table">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Client</th>
                <th>Produit</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lettres.map((l) => (
                <tr key={l.id}>
                  <td>{l.reference}</td>
                  <td>{l.client?.[0]?.full_name ?? "—"}</td>
                  <td>{PRODUCTS[l.product as keyof typeof PRODUCTS]?.label ?? l.product}</td>
                  <td>{STATUS_LABEL[l.status] ?? l.status}</td>
                  <td>
                    <Link className="back-link" href={`/client/lettre-mission/${l.id}`}>
                      Ouvrir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </AppShell>
  );
}
