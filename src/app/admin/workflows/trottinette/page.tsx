import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import { getClientsList } from "@/lib/actions/clients";
import { createScooterNeedAction, getScooterNeeds } from "@/lib/actions/scooter";
import { Bike, CheckCircle2, ShieldQuestion } from "lucide-react";

export const metadata = { title: "Workflow assurance trottinette - EJ Assurances" };

export default async function ScooterWorkflowPage() {
  const user = await requireRole(["admin", "courtier"]);
  const [clients, needs] = await Promise.all([getClientsList(), getScooterNeeds()]);

  async function createNeed(formData: FormData) {
    "use server";
    await createScooterNeedAction({ status: "idle", message: "" }, formData);
  }

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="ops-page">
        <nav className="page-breadcrumb" aria-label="Fil d'Ariane">
          <Link href="/admin">Accueil</Link>
          <span>/</span>
          <Link href="/admin/workflows">Workflows</Link>
          <span>/</span>
          <span>Trottinette</span>
        </nav>

        <header className="ops-hero">
          <div>
            <p className="eyebrow">Recueil des besoins</p>
            <h1>Assurance trottinette electrique</h1>
            <p>
              Controle de l'eligibilite 25 km/h et recommandation automatique de l'extension lorsque la trottinette est
              utilisee par d'autres membres du foyer fiscal.
            </p>
          </div>
          <div className="ops-hero-badge">
            <Bike size={18} aria-hidden />
            EDPM
          </div>
        </header>

        <section className="ops-grid ops-grid--two">
          <form action={createNeed} className="ops-card ops-form">
            <div className="ops-card-title">
              <ShieldQuestion size={18} aria-hidden />
              <h2>Nouveau recueil trottinette</h2>
            </div>

            <label>
              Rattacher a une fiche client
              <select name="clientId" defaultValue="">
                <option value="">Non rattache pour le moment</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.full_name ?? client.email ?? client.id}
                  </option>
                ))}
              </select>
            </label>

            <div className="ops-form-grid">
              <label>
                Nom de l'assure
                <input name="ownerFullName" required />
              </label>
              <label>
                Email
                <input name="ownerEmail" type="email" />
              </label>
            </div>

            <div className="ops-form-grid">
              <label>
                Marque
                <input name="vehicleBrand" />
              </label>
              <label>
                Modele
                <input name="vehicleModel" />
              </label>
            </div>

            <div className="ops-form-grid">
              <label>
                Numero de serie
                <input name="serialNumber" />
              </label>
              <label>
                Prix d'achat
                <input name="purchasePrice" inputMode="decimal" />
              </label>
            </div>

            <fieldset className="ops-fieldset">
              <legend>La trottinette est-elle bien limitee a 25 km/h ?</legend>
              <label><input type="radio" name="maxSpeedLimited25" value="yes" required /> Oui</label>
              <label><input type="radio" name="maxSpeedLimited25" value="no" /> Non / a verifier</label>
            </fieldset>

            <fieldset className="ops-fieldset">
              <legend>Est-elle utilisee par d'autres membres du foyer fiscal ?</legend>
              <label><input type="radio" name="usedByHouseholdMembers" value="yes" required /> Oui, proposer l'extension</label>
              <label><input type="radio" name="usedByHouseholdMembers" value="no" /> Non</label>
            </fieldset>

            <label>
              Details des autres utilisateurs
              <textarea name="householdUsersDetails" placeholder="Conjoint, enfant majeur, enfant mineur..." />
            </label>

            <div className="ops-form-grid">
              <label>
                Usage
                <select name="usageType" defaultValue="">
                  <option value="">A qualifier</option>
                  <option value="loisir">Loisir</option>
                  <option value="trajet_travail">Trajet domicile-travail</option>
                  <option value="mixte">Mixte</option>
                  <option value="professionnel">Professionnel</option>
                </select>
              </label>
              <label>
                Date d'effet souhaitee
                <input name="desiredEffectiveDate" type="date" />
              </label>
            </div>

            <label>
              Notes courtier
              <textarea name="advisorNotes" />
            </label>

            <button type="submit" className="btn-primary">Creer le workflow</button>
          </form>

          <div className="ops-card">
            <div className="ops-card-title">
              <CheckCircle2 size={18} aria-hidden />
              <h2>Etapes metier</h2>
            </div>
            <ol className="ops-steps">
              <li><span>1</span>Verifier la limitation constructeur a 25 km/h.</li>
              <li><span>2</span>Identifier les utilisateurs du foyer fiscal.</li>
              <li><span>3</span>Proposer l'extension si plusieurs utilisateurs.</li>
              <li><span>4</span>Rattacher le devis, la fiche conseil et la souscription au projet.</li>
            </ol>
          </div>
        </section>

        <section className="ops-card">
          <div className="ops-section-header">
            <div>
              <p className="eyebrow">Historique</p>
              <h2>Recueils trottinette</h2>
            </div>
            <span className="ops-count">{needs.length} dossier(s)</span>
          </div>
          <div className="ops-table">
            <div className="ops-table-row ops-table-head">
              <span>Assure</span>
              <span>Vehicule</span>
              <span>Controle</span>
              <span>Statut</span>
            </div>
            {needs.length === 0 ? (
              <div className="ops-empty">Aucun recueil trottinette enregistre.</div>
            ) : (
              needs.map((need) => (
                <div key={need.id} className="ops-table-row">
                  <div><strong>{need.owner_full_name}</strong><small>{need.owner_email ?? "Email non renseigne"}</small></div>
                  <div><strong>{[need.vehicle_brand, need.vehicle_model].filter(Boolean).join(" ") || "A qualifier"}</strong><small>Usage : {need.usage_type ?? "non precise"}</small></div>
                  <div><strong>{need.max_speed_limited_25 ? "25 km/h OK" : "A verifier"}</strong><small>{need.used_by_household_members ? "Extension conseillee" : "Usage individuel"}</small></div>
                  <div><span className={`ops-status ops-status--${need.status}`}>{need.status}</span></div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
