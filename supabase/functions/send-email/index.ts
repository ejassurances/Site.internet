import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" }

async function getGmailToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: Deno.env.get("GOOGLE_CLIENT_ID"), client_secret: Deno.env.get("GOOGLE_CLIENT_SECRET"), refresh_token: Deno.env.get("GOOGLE_REFRESH_TOKEN"), grant_type: "refresh_token" }),
  })
  const { access_token, error } = await res.json()
  if (error) throw new Error("OAuth: " + error)
  return access_token
}

function buildEmail(to, subject, html, fromName, fromEmail) {
  const raw = ["From: " + fromName + " <" + fromEmail + ">","To: " + to,"Subject: " + subject,"MIME-Version: 1.0","Content-Type: text/html; charset=UTF-8","",html].join("\r\n")
  return btoa(unescape(encodeURIComponent(raw))).replace(/\+/g,"-").replace(/\//g,"_")
}

async function sendGmail(to, subject, html, token) {
  const email = Deno.env.get("ADVISOR_EMAIL") || "contact@ej-assurances.fr"
  const name = Deno.env.get("ADVISOR_NAME") || "Erwan Jaffrelot"
  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ raw: buildEmail(to, subject, html, name, email) }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error("Gmail: " + JSON.stringify(data))
  return data.id
}

const T = {
  contact_ae_confirmation: (d) => ({ subject: "Demande AE recue - EJ Assurances", html: "<p>Bonjour " + d.prenom + ", votre demande est bien recue. Rappel sous 48h.</p>" }),
  workflow_step_2: (d) => ({ subject: "Fiche conseil - EJ Assurances", html: "<p>Bonjour " + d.prenom + ", <a href='" + (d.esignature_link||'#') + "'>Signer</a></p>" }),
  workflow_step_3: (d) => ({ subject: "Recueil a signer - EJ Assurances", html: "<p>Bonjour " + d.prenom + ", <a href='" + (d.esignature_link||'#') + "'>Signer recueil</a></p>" }),
  workflow_step_4: (d) => ({ subject: "Souscription - EJ Assurances", html: "<p>Bonjour " + d.prenom + ", <a href='" + (d.souscription_link||'#') + "'>Souscrire</a></p>" }),
  invite_espace_client: (d) => ({ subject: "Espace client - EJ Assurances", html: "<p>Bonjour " + d.prenom + ", <a href='" + d.invite_link + "'>Acceder</a></p>" }),
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS })
  try {
    const { type, to, client_id, data: tData } = await req.json()
    let email = to, rData = tData || {}
    if (client_id) {
      const sb = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"))
      const { data: c } = await sb.from("clients").select("*").eq("id", client_id).single()
      if (c) { email = email || c.email; rData = { ...c, ...rData } }
    }
    if (!email) throw new Error("No email")
    if (!T[type]) throw new Error("Unknown type: " + type)
    const tmpl = T[type](rData)
    const token = await getGmailToken()
    const msgId = await sendGmail(email, tmpl.subject, tmpl.html, token)
    if (client_id) {
      const sb = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"))
      await sb.from("email_logs").insert({ client_id, type, subject: tmpl.subject, to: email, gmail_message_id: msgId, sent_at: new Date().toISOString() })
    }
    return new Response(JSON.stringify({ success: true, message_id: msgId }), { headers: { ...CORS, "Content-Type": "application/json" } })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { ...CORS, "Content-Type": "application/json" } })
  }
})
