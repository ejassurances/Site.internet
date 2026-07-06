// Génération de la lettre de mission à partir d'un recueil de besoins.
// Produit un fragment HTML autonome (styles inline) stocké dans
// public.lettres_mission.content_html, réutilisé dans l'espace client
// et pour l'impression / export PDF (via la fonction d'impression du navigateur).

import { formatFieldValue, getProduct, SouscriptionProduct } from "@/lib/souscription";

export const CABINET = {
  name: "EJ Partners Assurances",
  activite: "Cabinet de courtage en assurances",
  orias: "En cours d'immatriculation",
  email: "contact@ej-assurances.fr",
  telephone: "01 89 31 40 29",
  adresse: "Paris, Île-de-France",
} as const;

export type LettreMissionData = {
  reference: string;
  product: SouscriptionProduct;
  recueil: Record<string, unknown>;
  clientName: string;
  clientEmail?: string | null;
  dateISO?: string;
};

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDateFr(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

/** Génère une référence lisible de type LM-EMP-20260706-AB12. */
export function generateReference(product: SouscriptionProduct): string {
  const prefix = product === "emprunteur" ? "EMP" : "TROT";
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LM-${prefix}-${stamp}-${rand}`;
}

function renderRecueilTable(product: SouscriptionProduct, recueil: Record<string, unknown>): string {
  const def = getProduct(product);
  if (!def) return "";

  const sections = def.sections
    .map((section) => {
      const rows = section.fields
        .map((field) => {
          const value = formatFieldValue(field, recueil[field.name]);
          if (value === "—") return "";
          return `<tr>
            <td style="padding:6px 10px;border-bottom:1px solid #e2ddd5;color:#5c6a76;width:55%;">${esc(field.label)}</td>
            <td style="padding:6px 10px;border-bottom:1px solid #e2ddd5;font-weight:600;color:#0f1923;">${esc(value)}</td>
          </tr>`;
        })
        .filter(Boolean)
        .join("");

      if (!rows) return "";

      return `<h4 style="margin:18px 0 6px;color:#071827;font-size:14px;">${esc(section.title)}</h4>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">${rows}</table>`;
    })
    .filter(Boolean)
    .join("");

  return sections;
}

function renderGuarantees(product: SouscriptionProduct, recueil: Record<string, unknown>): string {
  const def = getProduct(product);
  if (!def) return "";

  // Garanties cochées dans le recueil, sinon garanties proposées par défaut.
  const checked = def.sections
    .flatMap((s) => s.fields)
    .filter((f) => f.type === "checkbox" && recueil[f.name])
    .map((f) => f.label);

  const list = checked.length > 0 ? checked : def.defaultGuarantees;

  return list.map((g) => `<li style="margin-bottom:4px;">${esc(g)}</li>`).join("");
}

export function buildLettreMissionHtml(data: LettreMissionData): string {
  const def = getProduct(data.product);
  const productLabel = def?.label ?? data.product;
  const dateISO = data.dateISO ?? new Date().toISOString();
  const dateFr = formatDateFr(dateISO);

  return `
<article style="font-family:'Geist',ui-sans-serif,system-ui,sans-serif;color:#0f1923;line-height:1.6;">
  <header style="border-bottom:2px solid #c4a76d;padding-bottom:16px;margin-bottom:24px;">
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <div>
        <strong style="font-size:18px;color:#071827;">${esc(CABINET.name)}</strong><br/>
        <span style="color:#5c6a76;font-size:13px;">${esc(CABINET.activite)}</span><br/>
        <span style="color:#5c6a76;font-size:13px;">ORIAS : ${esc(CABINET.orias)}</span>
      </div>
      <div style="text-align:right;color:#5c6a76;font-size:13px;">
        ${esc(CABINET.adresse)}<br/>
        ${esc(CABINET.telephone)}<br/>
        ${esc(CABINET.email)}
      </div>
    </div>
  </header>

  <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:20px;">
    <div>
      <p style="margin:0;color:#5c6a76;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Référence</p>
      <strong>${esc(data.reference)}</strong>
    </div>
    <div style="text-align:right;">
      <p style="margin:0;color:#5c6a76;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Date</p>
      <strong>${esc(dateFr)}</strong>
    </div>
  </div>

  <h1 style="font-size:22px;color:#071827;margin-bottom:6px;">Lettre de mission</h1>
  <p style="color:#5c6a76;margin-top:0;">Conseil et intermédiation en assurance — ${esc(productLabel)}</p>

  <section style="margin:20px 0;">
    <p><strong>Entre les soussignés :</strong></p>
    <p>
      <strong>${esc(CABINET.name)}</strong>, ${esc(CABINET.activite.toLowerCase())}, immatriculé à l'ORIAS
      (${esc(CABINET.orias)}), ci-après « le Cabinet »,
    </p>
    <p>et</p>
    <p>
      <strong>${esc(data.clientName)}</strong>${data.clientEmail ? ` (${esc(data.clientEmail)})` : ""}, ci-après « le Client ».
    </p>
  </section>

  <section style="margin:20px 0;">
    <h3 style="color:#071827;font-size:15px;">1. Objet de la mission</h3>
    <p>
      Le Client confie au Cabinet une mission de conseil et d'intermédiation en assurance portant sur
      la recherche et la mise en place d'un contrat d'<strong>${esc(productLabel.toLowerCase())}</strong>.
      Cette mission est réalisée conformément à la Directive sur la Distribution d'Assurances (DDA) et au
      devoir de conseil qui en découle.
    </p>
  </section>

  <section style="margin:20px 0;">
    <h3 style="color:#071827;font-size:15px;">2. Recueil des besoins</h3>
    <p>
      La présente mission s'appuie sur le recueil des besoins et exigences renseigné par le Client,
      dont la synthèse figure ci-dessous :
    </p>
    ${renderRecueilTable(data.product, data.recueil)}
  </section>

  <section style="margin:20px 0;">
    <h3 style="color:#071827;font-size:15px;">3. Garanties étudiées</h3>
    <ul style="margin:0;padding-left:20px;">
      ${renderGuarantees(data.product, data.recueil)}
    </ul>
  </section>

  <section style="margin:20px 0;">
    <h3 style="color:#071827;font-size:15px;">4. Étendue de la mission</h3>
    <ul style="margin:0;padding-left:20px;">
      <li>Analyse de la situation et des besoins du Client ;</li>
      <li>Recherche et comparaison des offres du marché adaptées au besoin exprimé ;</li>
      <li>Formalisation d'une recommandation motivée (rapport de conseil DDA) ;</li>
      <li>Accompagnement du Client dans la souscription et les formalités ;</li>
      <li>Suivi du contrat et information annuelle.</li>
    </ul>
  </section>

  <section style="margin:20px 0;">
    <h3 style="color:#071827;font-size:15px;">5. Rémunération</h3>
    <p>
      Le Cabinet est rémunéré sous forme de commissions versées par les compagnies d'assurance
      partenaires. Toute rémunération complémentaire éventuelle (honoraires) serait préalablement
      portée à la connaissance du Client et soumise à son accord.
    </p>
  </section>

  <section style="margin:20px 0;">
    <h3 style="color:#071827;font-size:15px;">6. Indépendance & conformité</h3>
    <p>
      Le Cabinet n'est soumis à aucune obligation contractuelle de travailler exclusivement avec une ou
      plusieurs entreprises d'assurance. Les données personnelles collectées sont traitées conformément au
      RGPD, dans le seul cadre de la présente mission.
    </p>
  </section>

  <section style="margin:20px 0;">
    <h3 style="color:#071827;font-size:15px;">7. Acceptation</h3>
    <p>
      En signant la présente lettre de mission, le Client confirme l'exactitude des informations
      transmises et accepte de confier au Cabinet la mission décrite ci-dessus.
    </p>
  </section>
</article>`.trim();
}

/** Bloc de signature à afficher/imprimer une fois la lettre signée. */
export function buildSignatureBlock(opts: {
  signedByName: string;
  signedAtISO: string;
  signerIp?: string | null;
}): string {
  const dateFr = (() => {
    try {
      return new Date(opts.signedAtISO).toLocaleString("fr-FR");
    } catch {
      return opts.signedAtISO;
    }
  })();

  return `
<div style="margin-top:28px;padding:16px 18px;border:1px solid #c4a76d;border-radius:12px;background:#f8f6f1;">
  <p style="margin:0 0 4px;color:#8c6e35;font-size:12px;text-transform:uppercase;letter-spacing:.08em;font-weight:700;">Signature électronique</p>
  <p style="margin:0;">Signée par <strong>${esc(opts.signedByName)}</strong></p>
  <p style="margin:2px 0 0;color:#5c6a76;font-size:13px;">Le ${esc(dateFr)}${
    opts.signerIp ? ` — IP : ${esc(opts.signerIp)}` : ""
  }</p>
</div>`.trim();
}
