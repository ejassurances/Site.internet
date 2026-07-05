import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import { createPartnerCompanyAction, getPartnerCompanies } from "@/lib/actions/partners";
import { Building2, FileSignature, Handshake } from "lucide-react";

export const metadata = { title: "Partenaires assureurs et grossistes - EJ Assurances" };

const products = [
  "Assurance emprunteur",
  "Assurance vie",
  "Prevoyance",
  "Protection juridique",
  "Sante",
  "Trottinette / EDPM",
  "Transmission patrimoniale",
];

export default async function PartnersPage() {
  const user = await requireRole(["admin", "courtier"]);
  const partners = await getPartnerCompanies();

  async function createPartner(formData: FormData) {
    "use server";
    await createPartnerCompanyAction({ status: "idle", message: "" }, formData);
  }

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="ops-page">
        <nav className="page-breadcrumb" aria-label="Fil d'Ariane">
          <Link href="/admin">Accueil</Link>
          <span>/</span>
          <span>Partenaires</span>
        </nav>

        <header className="ops-hero">
          <div>
            <p className="eyebrow">Assureurs, grossistes, plateformes</p>
            <h1>Fiches partenaires produits</h1>
            <p>
              Centralisez les produits distribues, conventions signees, bulletins de commission et contacts utiles :
              commercial, sinistre, reclamation et inspecteur.
            </p>
          </div>
          <div className="ops-hero-badge">
            <Handshake size={18} aria-hidden />
            Distribution
          </div>
        </header>

        <section className="ops-grid ops-grid--two">
          <form action={createPartner} className="ops-card ops-form">
            <div className="ops-card-title">
              <Building2 size={18} aria-hidden />
              <h2>Nouvelle fiche partenaire</h2>
            </div>

            <div className="ops-form-grid">
              <label>
                Nom
                <input name="name" required />
              </label>
              <label>
                Type
                <select name="partnerType" defaultValue="assureur">
                  <option value="assureur">Assureur</option>
                  <option value="grossiste">Grossiste</option>
                  <option value="plateforme">Plateforme</option>
                  <option value="autre">Autre</option>
                </select>
              </label>
            </div>

            <div className="ops-form-grid">
              <label>
                Statut
                <select name="status" defaultValue="active">
                  <option value="prospect">Prospect</option>
                  <option value="active">Actif</option>
                  <option value="suspended">Suspendu</option>
                  <option value="archived">Archive</option>
                </select>
              </label>
              <label>
                ORIAS / reference
                <input name="oriasNumber" />
              </label>
            </div>

            <label>
              Site internet
              <input name="website" type="url" placeholder="https://..." />
            </label>

            <fieldset className="ops-fieldset">
              <legend>Assurances distribuees</legend>
              {products.map((product) => (
                <label key={product}>
                  <input type="checkbox" name="products" value={product} /> {product}
                </label>
              ))}
            </fieldset>

            <div className="ops-contact-block">
              <h3>Contacts services</h3>
              {[
                ["commercial", "Service commercial"],
                ["claims", "Service sinistre"],
                ["complaints", "Service reclamation"],
                ["inspector", "Inspecteur"],
              ].map(([prefix, label]) => (
                <div key={prefix} className="ops-form-grid">
                  <input name={`${prefix}Name`} placeholder={`${label} - nom`} />
                  <input name={`${prefix}Email`} placeholder="email" type="email" />
                  <input name={`${prefix}Phone`} placeholder="telephone" />
                </div>
              ))}
            </div>

            <div className="ops-form-grid">
              <label>
                Convention signee le
                <input name="conventionSignedAt" type="date" />
              </label>
              <label>
                Bulletin de commission
                <input name="commissionBulletin" placeholder="Reference Drive ou note" />
              </label>
            </div>

            <label>
              Notes
              <textarea name="notes" />
            </label>

            <button type="submit" className="btn-primary">Creer la fiche partenaire</button>
          </form>

          <div className="ops-card">
            <div className="ops-card-title">
              <FileSignature size={18} aria-hidden />
              <h2>Documents attendus</h2>
            </div>
            <ul className="ops-list">
              <li>Convention signee avec le cabinet.</li>
              <li>Notice, IPID, conditions generales et bulletin d'adhesion.</li>
              <li>Bulletins et baremes de commission.</li>
              <li>Coordonnees des services et inspecteur de reference.</li>
            </ul>
          </div>
        </section>

        <section className="ops-card">
          <div className="ops-section-header">
            <div>
              <p className="eyebrow">Referentiel cabinet</p>
              <h2>Partenaires enregistres</h2>
            </div>
            <span className="ops-count">{partners.length} partenaire(s)</span>
          </div>
          <div className="ops-table">
            <div className="ops-table-row ops-table-head">
              <span>Partenaire</span>
              <span>Produits</span>
              <span>Contacts</span>
              <span>Statut</span>
            </div>
            {partners.length === 0 ? (
              <div className="ops-empty">Aucune fiche partenaire creee.</div>
            ) : (
              partners.map((partner) => (
                <div key={partner.id} className="ops-table-row">
                  <div>
                    <strong>{partner.name}</strong>
                    <small>{partner.partner_type} {partner.orias_number ? `- ${partner.orias_number}` : ""}</small>
                  </div>
                  <div><strong>{partner.distributed_products?.slice(0, 2).join(", ") || "A qualifier"}</strong><small>{partner.distributed_products?.length ?? 0} produit(s)</small></div>
                  <div><strong>{partner.inspector_contact?.name || "Inspecteur non renseigne"}</strong><small>{partner.commercial_contact?.email || "Commercial non renseigne"}</small></div>
                  <div><span className={`ops-status ops-status--${partner.status}`}>{partner.status}</span></div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
