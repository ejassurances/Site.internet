import { Resend } from "resend";

// Client initialisé à la demande pour éviter l'erreur de build si RESEND_API_KEY absent
function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY manquante");
  return new Resend(key);
}

// Adresse expéditeur — doit correspondre à un domaine vérifié dans Resend
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL ?? "EJ Partners Assurances <contact@ej-assurances.fr>";
// Adresse de réception des notifications internes
const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL ?? "contact@ej-assurances.fr";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface ContactConfirmationData {
  fullName: string;
  email: string;
  phone?: string;
  need?: string;
  message?: string;
}

export interface AdminNotificationData {
  fullName: string;
  email: string;
  phone?: string;
  need?: string;
  familySituation?: string;
  message?: string;
  urgency?: string;
}

export interface ClientInvitationData {
  fullName: string;
  email: string;
  inviteUrl: string;
}

export interface EmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

// ─────────────────────────────────────────────
// Utilitaires de style commun
// ─────────────────────────────────────────────

const baseStyle = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f7f5f0;
  margin: 0; padding: 0;
`;

const cardStyle = `
  max-width: 600px;
  margin: 32px auto;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(10,25,60,0.08);
`;

const headerStyle = `
  background: linear-gradient(135deg, #0a193c 0%, #1a3a6e 100%);
  padding: 36px 40px 28px;
  text-align: center;
`;

const bodyStyle = `
  padding: 36px 40px;
`;

const footerStyle = `
  background: #f7f5f0;
  padding: 20px 40px;
  text-align: center;
  font-size: 12px;
  color: #8a8a8a;
  border-top: 1px solid #e8e4dc;
`;

const btnStyle = `
  display: inline-block;
  background: linear-gradient(135deg, #0a193c, #1a3a6e);
  color: #ffffff !important;
  text-decoration: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  margin: 8px 0;
`;

const goldBtnStyle = `
  display: inline-block;
  background: linear-gradient(135deg, #d4af37, #f0c842);
  color: #0a193c !important;
  text-decoration: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 15px;
  margin: 8px 0;
`;

const badgeStyle = `
  display: inline-block;
  background: rgba(212,175,55,0.15);
  border: 1px solid rgba(212,175,55,0.4);
  color: #b8960c;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 12px;
`;

// ─────────────────────────────────────────────
// 1. Email de confirmation au prospect/client
// ─────────────────────────────────────────────

export async function sendContactConfirmation(data: ContactConfirmationData): Promise<EmailResult> {
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="${baseStyle}">
  <div style="${cardStyle}">
    <div style="${headerStyle}">
      <div style="${badgeStyle}">EJ Partners Assurances</div>
      <h1 style="color:#ffffff; font-size:22px; font-weight:700; margin:0 0 8px;">
        Votre demande a bien été reçue
      </h1>
      <p style="color:rgba(247,245,240,0.8); font-size:14px; margin:0;">
        Nous vous recontactons sous 24 heures ouvrées
      </p>
    </div>
    <div style="${bodyStyle}">
      <p style="color:#2d3748; font-size:16px; margin:0 0 20px;">
        Bonjour <strong>${data.fullName}</strong>,
      </p>
      <p style="color:#4a5568; font-size:15px; line-height:1.7; margin:0 0 24px;">
        Nous avons bien reçu votre demande et nous vous en remercions. 
        Un conseiller EJ Partners Assurances va étudier votre situation et vous recontactera 
        dans les <strong>24 heures ouvrées</strong>.
      </p>

      ${data.need ? `
      <div style="background:#f7f5f0; border-left:3px solid #d4af37; border-radius:0 8px 8px 0; padding:16px 20px; margin:0 0 24px;">
        <p style="color:#8a8a8a; font-size:12px; text-transform:uppercase; letter-spacing:0.06em; margin:0 0 6px;">Votre besoin</p>
        <p style="color:#2d3748; font-size:14px; font-weight:600; margin:0;">${data.need}</p>
      </div>
      ` : ""}

      <div style="background:#0a193c; border-radius:10px; padding:24px; margin:0 0 28px; text-align:center;">
        <p style="color:rgba(247,245,240,0.7); font-size:13px; margin:0 0 6px;">Notre objectif pour vous</p>
        <p style="color:#d4af37; font-size:28px; font-weight:800; margin:0 0 4px;">100 000 €</p>
        <p style="color:rgba(247,245,240,0.6); font-size:12px; margin:0;">d'économies cumulées sur votre assurance emprunteur</p>
      </div>

      <p style="color:#4a5568; font-size:14px; line-height:1.7; margin:0 0 24px;">
        En attendant, vous pouvez prendre rendez-vous directement dans notre agenda en ligne :
      </p>
      <div style="text-align:center; margin:0 0 28px;">
        <a href="https://www.ej-assurances.fr/contact#rendez-vous" style="${goldBtnStyle}">
          Prendre rendez-vous en ligne
        </a>
      </div>

      <hr style="border:none; border-top:1px solid #e8e4dc; margin:0 0 24px;">
      <p style="color:#8a8a8a; font-size:13px; line-height:1.6; margin:0;">
        <strong>EJ Partners Assurances</strong> est un cabinet de courtage indépendant, 
        spécialisé en assurance emprunteur et protection des familles modernes 
        (coparentalité, familles LGBT+, familles recomposées).
      </p>
    </div>
    <div style="${footerStyle}">
      <p style="margin:0 0 6px;">
        EJ Partners Assurances — Cabinet de courtage indépendant
      </p>
      <p style="margin:0;">
        <a href="https://www.ej-assurances.fr/mentions-legales" style="color:#8a8a8a;">Mentions légales</a> · 
        <a href="https://www.ej-assurances.fr/confidentialite" style="color:#8a8a8a;">Politique de confidentialité</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const result = await getResend().emails.send({
      from: FROM_ADDRESS,
      to: [data.email],
      subject: "Votre demande a bien été reçue — EJ Partners Assurances",
      html,
    });
    return { success: true, id: result.data?.id };
  } catch (err) {
    console.error("[Resend] sendContactConfirmation error:", err);
    return { success: false, error: String(err) };
  }
}

// ─────────────────────────────────────────────
// 2. Notification interne à l'admin
// ─────────────────────────────────────────────

export async function sendAdminNotification(data: AdminNotificationData): Promise<EmailResult> {
  const urgencyLabel: Record<string, string> = {
    urgent: "🔴 Urgent",
    "1_mois": "🟡 Dans 1 mois",
    "3_mois": "🟢 Dans 3 mois",
    reflexion: "⚪ En réflexion",
  };

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="${baseStyle}">
  <div style="${cardStyle}">
    <div style="${headerStyle}">
      <div style="${badgeStyle}">Nouvelle demande</div>
      <h1 style="color:#ffffff; font-size:20px; font-weight:700; margin:0;">
        Nouveau contact — ${data.fullName}
      </h1>
    </div>
    <div style="${bodyStyle}">
      <table style="width:100%; border-collapse:collapse;">
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid #e8e4dc; color:#8a8a8a; font-size:13px; width:140px;">Nom</td>
          <td style="padding:10px 0; border-bottom:1px solid #e8e4dc; color:#2d3748; font-size:14px; font-weight:600;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid #e8e4dc; color:#8a8a8a; font-size:13px;">Email</td>
          <td style="padding:10px 0; border-bottom:1px solid #e8e4dc; color:#2d3748; font-size:14px;">
            <a href="mailto:${data.email}" style="color:#0a193c;">${data.email}</a>
          </td>
        </tr>
        ${data.phone ? `
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid #e8e4dc; color:#8a8a8a; font-size:13px;">Téléphone</td>
          <td style="padding:10px 0; border-bottom:1px solid #e8e4dc; color:#2d3748; font-size:14px;">
            <a href="tel:${data.phone}" style="color:#0a193c;">${data.phone}</a>
          </td>
        </tr>
        ` : ""}
        ${data.need ? `
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid #e8e4dc; color:#8a8a8a; font-size:13px;">Besoin</td>
          <td style="padding:10px 0; border-bottom:1px solid #e8e4dc; color:#2d3748; font-size:14px; font-weight:600;">${data.need}</td>
        </tr>
        ` : ""}
        ${data.familySituation ? `
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid #e8e4dc; color:#8a8a8a; font-size:13px;">Situation</td>
          <td style="padding:10px 0; border-bottom:1px solid #e8e4dc; color:#2d3748; font-size:14px;">${data.familySituation}</td>
        </tr>
        ` : ""}
        ${data.urgency ? `
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid #e8e4dc; color:#8a8a8a; font-size:13px;">Urgence</td>
          <td style="padding:10px 0; border-bottom:1px solid #e8e4dc; color:#2d3748; font-size:14px;">${urgencyLabel[data.urgency] ?? data.urgency}</td>
        </tr>
        ` : ""}
        ${data.message ? `
        <tr>
          <td style="padding:10px 0; color:#8a8a8a; font-size:13px; vertical-align:top;">Message</td>
          <td style="padding:10px 0; color:#4a5568; font-size:14px; line-height:1.6;">${data.message}</td>
        </tr>
        ` : ""}
      </table>

      <div style="text-align:center; margin:28px 0 0;">
        <a href="https://www.ej-assurances.fr/admin/clients" style="${btnStyle}">
          Voir dans le CRM
        </a>
      </div>
    </div>
    <div style="${footerStyle}">
      <p style="margin:0;">Notification automatique — EJ Partners Assurances</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const result = await getResend().emails.send({
      from: FROM_ADDRESS,
      to: [ADMIN_EMAIL],
      subject: `🔔 Nouveau contact : ${data.fullName} — ${data.need ?? "Demande générale"}`,
      html,
    });
    return { success: true, id: result.data?.id };
  } catch (err) {
    console.error("[Resend] sendAdminNotification error:", err);
    return { success: false, error: String(err) };
  }
}

// ─────────────────────────────────────────────
// 3. Email d'invitation espace client
// ─────────────────────────────────────────────

export async function sendClientInvitation(data: ClientInvitationData): Promise<EmailResult> {
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="${baseStyle}">
  <div style="${cardStyle}">
    <div style="${headerStyle}">
      <div style="${badgeStyle}">Votre espace personnel</div>
      <h1 style="color:#ffffff; font-size:22px; font-weight:700; margin:0 0 8px;">
        Accédez à votre espace client
      </h1>
      <p style="color:rgba(247,245,240,0.8); font-size:14px; margin:0;">
        EJ Partners Assurances
      </p>
    </div>
    <div style="${bodyStyle}">
      <p style="color:#2d3748; font-size:16px; margin:0 0 20px;">
        Bonjour <strong>${data.fullName}</strong>,
      </p>
      <p style="color:#4a5568; font-size:15px; line-height:1.7; margin:0 0 24px;">
        Votre espace client EJ Partners Assurances a été créé. 
        Vous pouvez y accéder pour consulter vos documents, suivre vos contrats 
        et communiquer avec votre conseiller.
      </p>

      <div style="background:#f7f5f0; border-radius:10px; padding:20px 24px; margin:0 0 28px;">
        <p style="color:#8a8a8a; font-size:12px; text-transform:uppercase; letter-spacing:0.06em; margin:0 0 8px;">Dans votre espace</p>
        <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">
          <li style="color:#4a5568; font-size:14px;">✓ Vos contrats et documents</li>
          <li style="color:#4a5568; font-size:14px;">✓ Votre Document d'Entrée en Relation (DER)</li>
          <li style="color:#4a5568; font-size:14px;">✓ La messagerie avec votre conseiller</li>
          <li style="color:#4a5568; font-size:14px;">✓ Vos recueils de besoins</li>
        </ul>
      </div>

      <div style="text-align:center; margin:0 0 28px;">
        <a href="${data.inviteUrl}" style="${goldBtnStyle}">
          Créer mon mot de passe et accéder
        </a>
        <p style="color:#8a8a8a; font-size:12px; margin:12px 0 0;">
          Ce lien est valable 24 heures
        </p>
      </div>

      <hr style="border:none; border-top:1px solid #e8e4dc; margin:0 0 20px;">
      <p style="color:#8a8a8a; font-size:13px; line-height:1.6; margin:0;">
        Si vous n'êtes pas à l'origine de cette demande, ignorez cet email. 
        Pour toute question, contactez-nous à 
        <a href="mailto:contact@ej-assurances.fr" style="color:#0a193c;">contact@ej-assurances.fr</a>.
      </p>
    </div>
    <div style="${footerStyle}">
      <p style="margin:0 0 6px;">EJ Partners Assurances — Cabinet de courtage indépendant</p>
      <p style="margin:0;">
        <a href="https://www.ej-assurances.fr/mentions-legales" style="color:#8a8a8a;">Mentions légales</a> · 
        <a href="https://www.ej-assurances.fr/confidentialite" style="color:#8a8a8a;">Politique de confidentialité</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const result = await getResend().emails.send({
      from: FROM_ADDRESS,
      to: [data.email],
      subject: "Votre espace client EJ Partners Assurances est prêt",
      html,
    });
    return { success: true, id: result.data?.id };
  } catch (err) {
    console.error("[Resend] sendClientInvitation error:", err);
    return { success: false, error: String(err) };
  }
}

// ─────────────────────────────────────────────
// 4. Email de relance client (depuis le CRM)
// ─────────────────────────────────────────────

export interface ClientRelanceData {
  fullName: string;
  email: string;
  subject: string;
  body: string;
  advisorName?: string;
}

export async function sendClientRelance(data: ClientRelanceData): Promise<EmailResult> {
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="${baseStyle}">
  <div style="${cardStyle}">
    <div style="${headerStyle}">
      <div style="${badgeStyle}">EJ Partners Assurances</div>
      <h1 style="color:#ffffff; font-size:20px; font-weight:700; margin:0;">
        ${data.subject}
      </h1>
    </div>
    <div style="${bodyStyle}">
      <p style="color:#2d3748; font-size:16px; margin:0 0 20px;">
        Bonjour <strong>${data.fullName}</strong>,
      </p>
      <div style="color:#4a5568; font-size:15px; line-height:1.8; margin:0 0 28px; white-space:pre-wrap;">${data.body}</div>
      <div style="text-align:center; margin:0 0 24px;">
        <a href="https://www.ej-assurances.fr/contact#rendez-vous" style="${goldBtnStyle}">
          Prendre rendez-vous
        </a>
      </div>
      <hr style="border:none; border-top:1px solid #e8e4dc; margin:0 0 20px;">
      <p style="color:#8a8a8a; font-size:13px; margin:0;">
        ${data.advisorName ? `<strong>${data.advisorName}</strong><br>` : ""}
        EJ Partners Assurances — Cabinet de courtage indépendant<br>
        <a href="mailto:contact@ej-assurances.fr" style="color:#0a193c;">contact@ej-assurances.fr</a>
      </p>
    </div>
    <div style="${footerStyle}">
      <p style="margin:0;">EJ Partners Assurances — Cabinet de courtage indépendant</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const result = await getResend().emails.send({
      from: FROM_ADDRESS,
      to: [data.email],
      subject: data.subject,
      html,
    });
    return { success: true, id: result.data?.id };
  } catch (err) {
    console.error("[Resend] sendClientRelance error:", err);
    return { success: false, error: String(err) };
  }
}
