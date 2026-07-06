import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import {
  createPartnerDistributedContractAction,
  createPartnerProductDocumentAction,
  generatePartnerContractAiSummaryAction,
  getPartnerCompany,
  importPartnerProductFromDriveAction,
  updatePartnerApiConfigurationAction,
} from "@/lib/actions/partners";
import { Bot, Building2, FileText, KeyRound, PackageCheck, ShieldCheck } from "lucide-react";

export const metadata = { title: "Fiche partenaire - EJ Assurances" };

const productCategories = [
  ["assurance_emprunteur", "Assurance emprunteur"],
  ["prevoyance", "Prevoyance"],
  ["assurance_vie", "Assurance vie"],
  ["sante", "Sante"],
  ["protection_juridique", "Protection juridique"],
  ["trottinette", "Trottinette / EDPM"],
  ["autre", "Autre"],
];

const documentTypes = [
  ["notice", "Notice"],
  ["ipid", "IPID / INPI"],
  ["conditions_generales", "Conditions generales"],
  ["fiche_produit", "Fiche produit"],
  ["bulletin_adhesion", "Bulletin d'adhesion"],
  ["convention", "Convention signee"],
  ["commission", "Bulletin / bareme de commission"],
  ["autre", "Autre"],
];

const requiredContractDocuments = [
  { key: "conditions_generales", label: "Conditions generales", required: true },
  { key: "ipid", label: "IPID / INPI", required: true },
  { key: "fiche_produit", label: "Fiche produit", required: false },
];

export default async function PartnerDetailPage({ params }: { params: Promise<{ partnerId: string }> }) {
  const user = await requireRole(["admin", "courtier"]);
  const { partnerId } = await params;
  const partner = await getPartnerCompany(partnerId);

  if (!partner) notFound();

  async function addDistributedContract(formData: FormData) {
    "use server";
    await createPartnerDistributedContractAction({ status: "idle", message: "" }, formData);
  }

  async function addProductDocument(formData: FormData) {
    "use server";
    await createPartnerProductDocumentAction({ status: "idle", message: "" }, formData);
  }

  async function importDriveProduct(formData: FormData) {
    "use server";
    await importPartnerProductFromDriveAction({ status: "idle", message: "" }, formData);
  }

  async function updateApi(formData: FormData) {
    "use server";
    await updatePartnerApiConfigurationAction({ status: "idle", message: "" }, formData);
  }

  async function generateAiSummary(formData: FormData) {
    "use server";
    await generatePartnerContractAiSummaryAction(formData);
  }

  const contracts = partner.partner_distributed_contracts ?? [];
  const documents = partner.partner_product_documents ?? [];
  const apiConfig = partner.api_config ?? {};

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <div className="ops-page">
        <nav className="page-breadcrumb" aria-label="Fil d'Ariane">
          <Link href="/admin">Accueil</Link>
          <span>/</span>
          <Link href="/admin/partenaires">Partenaires</Link>
          <span>/</span>
          <span>{partner.name}</span>
        </nav>

        <header className="ops-hero">
          <div>
            <p className="eyebrow">Fiche partenaire</p>
            <h1>{partner.name}</h1>
            <p>
              Produits distribues, documents contractuels, contacts metier et integration API du partenaire.
            </p>
          </div>
          <div className="ops-hero-badge">
            <Building2 size={18} aria-hidden />
            {partner.partner_type}
          </div>
        </header>

        <section className="ops-grid ops-grid--two">
          <article className="ops-card">
            <div className="ops-card-title">
              <ShieldCheck size={18} aria-hidden />
              <h2>Informations cabinet</h2>
            </div>
            <div className="ops-list">
              <li>Statut : <strong>{partner.status}</strong></li>
              <li>ORIAS / reference : <strong>{partner.orias_number ?? "Non renseigne"}</strong></li>
              <li>Site : {partner.website ? <a href={partner.website} target="_blank" rel="noreferrer">{partner.website}</a> : "Non renseigne"}</li>
              <li>Dossier Drive : {partner.google_drive_folder_url ? <a href={partner.google_drive_folder_url} target="_blank" rel="noreferrer">Ouvrir le dossier partenaire</a> : "Creation en attente"}</li>
              <li>Convention signee : <strong>{partner.convention_signed_at ?? "A verifier"}</strong></li>
            </div>
          </article>

          <article className="ops-card">
            <div className="ops-card-title">
              <PackageCheck size={18} aria-hidden />
              <h2>Contacts utiles</h2>
            </div>
            <div className="ops-list">
              <li>Commercial : <strong>{partner.commercial_contact?.name || "Non renseigne"}</strong> {partner.commercial_contact?.email || ""}</li>
              <li>Sinistre : <strong>{partner.claims_contact?.name || "Non renseigne"}</strong> {partner.claims_contact?.email || ""}</li>
              <li>Reclamation : <strong>{partner.complaints_contact?.name || "Non renseigne"}</strong> {partner.complaints_contact?.email || ""}</li>
              <li>Inspecteur : <strong>{partner.inspector_contact?.name || "Non renseigne"}</strong> {partner.inspector_contact?.email || ""}</li>
            </div>
          </article>
        </section>

        <section className="ops-grid ops-grid--two">
          <form action={addDistributedContract} className="ops-card ops-form">
            <input type="hidden" name="partnerId" value={partner.id} />
            <div className="ops-card-title">
              <PackageCheck size={18} aria-hidden />
              <h2>Ajouter un produit distribue</h2>
            </div>

            <div className="ops-form-grid">
              <label>
                Nom du contrat
                <input name="contractName" placeholder="Ex : Pack EDPM, Garantie emprunteur..." required />
              </label>
              <label>
                Categorie
                <select name="productCategory" defaultValue="assurance_emprunteur">
                  {productCategories.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="ops-form-grid">
              <label>
                Code produit
                <input name="productCode" />
              </label>
              <label>
                Statut
                <select name="status" defaultValue="active">
                  <option value="draft">Brouillon</option>
                  <option value="active">Actif</option>
                  <option value="suspended">Suspendu</option>
                  <option value="archived">Archive</option>
                </select>
              </label>
            </div>

            <fieldset className="ops-fieldset">
              <legend>Cibles devoir de conseil</legend>
              {["Famille", "Parent social", "Emprunteur", "Trottinette", "Chef d'entreprise", "Senior"].map((target) => (
                <label key={target}>
                  <input type="checkbox" name="targetClients" value={target} /> {target}
                </label>
              ))}
            </fieldset>

            <label>
              Garanties principales
              <textarea name="guarantees" />
            </label>
            <label>
              Positionnement devoir de conseil
              <textarea name="advicePositioning" />
            </label>
            <label>
              Exclusions / limites
              <textarea name="exclusions" />
            </label>
            <label>
              Regles de souscription
              <textarea name="underwritingRules" />
            </label>

            <div className="ops-form-grid">
              <label>
                Taux commission
                <input name="commissionRate" inputMode="decimal" />
              </label>
              <label>
                Lien de souscription
                <input name="subscriptionLink" type="url" />
              </label>
            </div>

            <button type="submit" className="btn-primary">Ajouter au catalogue</button>
          </form>

          <form action={addProductDocument} className="ops-card ops-form">
            <input type="hidden" name="partnerId" value={partner.id} />
            <div className="ops-card-title">
              <FileText size={18} aria-hidden />
              <h2>Ajouter un document contractuel</h2>
            </div>

            <div className="ops-form-grid">
              <label>
                Contrat rattache
                <select name="contractId" required defaultValue="">
                  <option value="">Selectionner un contrat distribue</option>
                  {contracts.map((contract) => (
                    <option key={contract.id} value={contract.id}>
                      {contract.contract_name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Produit concerne
                <input name="productName" list="partner-products" required />
                <datalist id="partner-products">
                  {contracts.map((contract) => (
                    <option key={contract.id} value={contract.contract_name} />
                  ))}
                </datalist>
              </label>
              <label>
                Categorie
                <select name="productCategory" defaultValue="autre">
                  {productCategories.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="ops-form-grid">
              <label>
                Type de document
                <select name="documentType" defaultValue="notice">
                  {documentTypes.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
              <label>
                Nom du fichier
                <input name="fileName" placeholder="Notice Pack EDPM 2026.pdf" />
              </label>
            </div>

            <label>
              ID fichier Google Drive
              <input name="driveFileId" placeholder="ID du fichier ou reference Drive" />
            </label>

            <div className="ops-form-grid">
              <label>
                Valide depuis
                <input name="validFrom" type="date" />
              </label>
              <label>
                Valide jusqu'au
                <input name="validUntil" type="date" />
              </label>
            </div>

            <label>
              Notes
              <textarea name="notes" />
            </label>

            <button type="submit" className="btn-primary">Rattacher le document</button>
          </form>
        </section>

        <section className="ops-grid ops-grid--two">
          <form action={importDriveProduct} className="ops-card ops-form">
            <input type="hidden" name="partnerId" value={partner.id} />
            <div className="ops-card-title">
              <FileText size={18} aria-hidden />
              <h2>Importer un produit cree dans Drive</h2>
            </div>
            <p className="form-note">
              Utilisez cette action quand un dossier produit existe deja dans Drive, par exemple dans Produits/PROD_ASSURANCE_EMPRUNTEUR_NomProduit.
            </p>
            <label>
              Nom du dossier produit
              <input name="folderName" placeholder="PROD_ASSURANCE_EMPRUNTEUR_NomProduit" required />
            </label>
            <div className="ops-form-grid">
              <label>
                Categorie
                <select name="productCategory" defaultValue="assurance_emprunteur">
                  {productCategories.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
              <label>
                Code produit
                <input name="productCode" placeholder="Optionnel" />
              </label>
            </div>
            <label>
              ID ou URL du dossier Drive
              <input name="folderIdOrUrl" placeholder="https://drive.google.com/drive/folders/..." required />
            </label>
            <button type="submit" className="btn-primary">Créer le produit dans le CRM</button>
          </form>

          <article className="ops-card">
            <div className="ops-card-title">
              <ShieldCheck size={18} aria-hidden />
              <h2>Nomenclature Drive partenaire</h2>
            </div>
            <ul className="ops-list">
              <li>Dossier partenaire : <strong>PART_NomPartenaire</strong></li>
              <li>Sous-dossier obligatoire : <strong>Produits</strong></li>
              <li>Dossier produit : <strong>PROD_CATEGORIE_NomProduit</strong></li>
              <li>Documents produit : <strong>CG_NomProduit</strong>, <strong>IPID_NomProduit</strong>, <strong>FicheProduit_NomProduit</strong>.</li>
            </ul>
          </article>
        </section>

        <section className="ops-grid ops-grid--two">
          <article className="ops-card">
            <div className="ops-section-header">
              <div>
                <p className="eyebrow">Catalogue</p>
                <h2>Produits distribues</h2>
              </div>
              <span className="ops-count">{contracts.length}</span>
            </div>
            <div className="ops-table">
              {contracts.length === 0 ? (
                <div className="ops-empty">Aucun produit distribue rattache.</div>
              ) : (
                contracts.map((contract) => (
                  <article key={contract.id} className="ops-contract-card">
                    <div className="ops-table-row">
                      <div>
                        <strong>{contract.contract_name}</strong>
                        <small>{contract.product_code ?? "Code non renseigne"}</small>
                      </div>
                      <div>
                        <strong>{contract.product_category}</strong>
                        <small>{contract.target_clients?.join(", ") || "Cibles a qualifier"}</small>
                      </div>
                      <div>
                        <strong>{contract.commission_rate ? `${contract.commission_rate}%` : "Commission a verifier"}</strong>
                      <small>{contract.google_drive_folder_url ? "Dossier Drive produit OK" : contract.subscription_link ? "Lien de souscription renseigne" : "Pas de lien"}</small>
                      {contract.google_drive_folder_url && <a href={contract.google_drive_folder_url} target="_blank" rel="noreferrer">Ouvrir Drive</a>}
                      </div>
                      <div><span className={`ops-status ops-status--${contract.status}`}>{contract.status}</span></div>
                    </div>

                    <div className="ops-contract-detail">
                      <div>
                        <h3>Documents attendus</h3>
                        <div className="ops-document-checks">
                          {requiredContractDocuments.map((requiredDocument) => {
                            const found = contract.partner_product_documents?.some(
                              (document) => document.document_type === requiredDocument.key,
                            );
                            return (
                              <span key={requiredDocument.key} className={`ops-status ops-status--${found ? "active" : requiredDocument.required ? "rejected" : "draft"}`}>
                                {found ? "OK" : requiredDocument.required ? "Manquant" : "Optionnel"} - {requiredDocument.label}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <form action={generateAiSummary}>
                        <input type="hidden" name="partnerId" value={partner.id} />
                        <input type="hidden" name="contractId" value={contract.id} />
                        <button type="submit" className="btn-primary">
                          <Bot size={15} aria-hidden />
                          Analyser avec IA
                        </button>
                      </form>
                    </div>

                    {contract.ai_guarantee_summary && (
                      <div className="ops-ai-summary">
                        <div className="ops-card-title">
                          <Bot size={16} aria-hidden />
                          <h3>Resume IA garanties</h3>
                        </div>
                        <p>{contract.ai_guarantee_summary}</p>
                        {contract.ai_needs_questions && contract.ai_needs_questions.length > 0 && (
                          <ul className="ops-list">
                            {contract.ai_needs_questions.slice(0, 4).map((question) => (
                              <li key={question}>{question}</li>
                            ))}
                          </ul>
                        )}
                        {contract.ai_advice_notes && <small>{contract.ai_advice_notes}</small>}
                      </div>
                    )}
                  </article>
                ))
              )}
            </div>
          </article>

          <article className="ops-card">
            <div className="ops-section-header">
              <div>
                <p className="eyebrow">Documents</p>
                <h2>Pieces contractuelles</h2>
              </div>
              <span className="ops-count">{documents.length}</span>
            </div>
            <div className="ops-table">
              {documents.length === 0 ? (
                <div className="ops-empty">Aucun document contractuel rattache.</div>
              ) : (
                documents.map((document) => (
                  <div key={document.id} className="ops-table-row">
                    <div>
                      <strong>{document.file_name ?? document.product_name}</strong>
                      <small>{document.product_name}</small>
                    </div>
                    <div>
                      <strong>{document.document_type}</strong>
                      <small>{document.product_category}</small>
                    </div>
                    <div>
                      <strong>{document.valid_until ?? "Sans echeance"}</strong>
                      <small>{document.drive_file_id ? "Drive renseigne" : "Drive a rattacher"}</small>
                    </div>
                    <div><span className="ops-status ops-status--active">reference</span></div>
                  </div>
                ))
              )}
            </div>
          </article>
        </section>

        <form action={updateApi} className="ops-card ops-form">
          <input type="hidden" name="partnerId" value={partner.id} />
          <div className="ops-card-title">
            <KeyRound size={18} aria-hidden />
            <h2>Integration API partenaire</h2>
          </div>

          <fieldset className="ops-fieldset">
            <legend>Activation</legend>
            <label>
              <input type="checkbox" name="apiEnabled" defaultChecked={partner.api_enabled ?? false} /> API utile pour devis ou souscription
            </label>
          </fieldset>

          <div className="ops-form-grid">
            <label>
              Nom de l'API / fournisseur
              <input name="apiProviderName" defaultValue={partner.api_provider_name ?? ""} />
            </label>
            <label>
              URL de base
              <input name="apiBaseUrl" type="url" defaultValue={partner.api_base_url ?? ""} />
            </label>
          </div>

          <div className="ops-form-grid">
            <label>
              Environnement
              <select name="apiEnvironment" defaultValue={partner.api_environment ?? "sandbox"}>
                <option value="sandbox">Sandbox</option>
                <option value="production">Production</option>
                <option value="unknown">A confirmer</option>
              </select>
            </label>
            <label>
              Authentification
              <select name="apiAuthMode" defaultValue={partner.api_auth_mode ?? "none"}>
                <option value="none">Non configuree</option>
                <option value="api_key">API key</option>
                <option value="oauth2">OAuth2</option>
                <option value="basic">Basic</option>
                <option value="mtls">mTLS</option>
                <option value="other">Autre</option>
              </select>
            </label>
          </div>

          <div className="ops-form-grid">
            <label>
              Statut
              <select name="apiStatus" defaultValue={partner.api_status ?? "not_configured"}>
                <option value="not_configured">Non configuree</option>
                <option value="requested">Acces demande</option>
                <option value="sandbox_ready">Sandbox prete</option>
                <option value="production_ready">Production prete</option>
                <option value="disabled">Desactivee</option>
                <option value="error">Erreur</option>
              </select>
            </label>
            <label>
              Emplacement des secrets
              <input name="secretStorage" defaultValue={String(apiConfig.secret_storage ?? "")} placeholder="Ex : Vercel env PARTNER_X_API_KEY" />
            </label>
          </div>

          <div className="ops-form-grid">
            <label>
              Endpoint devis
              <input name="quoteEndpoint" defaultValue={String(apiConfig.quote_endpoint ?? "")} />
            </label>
            <label>
              Endpoint souscription
              <input name="subscriptionEndpoint" defaultValue={String(apiConfig.subscription_endpoint ?? "")} />
            </label>
          </div>

          <label>
            Endpoint webhook
            <input name="webhookEndpoint" defaultValue={String(apiConfig.webhook_endpoint ?? "")} />
          </label>

          <label>
            Scopes / droits API
            <textarea name="apiScopes" defaultValue={(partner.api_scopes ?? []).join("\n")} />
          </label>

          <label>
            Notes API
            <textarea name="apiNotes" defaultValue={partner.api_notes ?? ""} />
          </label>

          <p className="form-note">Ne jamais saisir de cle API ou mot de passe ici. Stocker les secrets dans Vercel ou Supabase Secrets.</p>
          <button type="submit" className="btn-primary">Enregistrer la configuration API</button>
        </form>
      </div>
    </AppShell>
  );
}
