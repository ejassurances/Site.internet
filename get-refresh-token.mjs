#!/usr/bin/env node
/**
 * get-refresh-token.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Script interactif pour générer un refresh token Google OAuth 2.0.
 * À utiliser une seule fois pour configurer le secret GOOGLE_REFRESH_TOKEN
 * dans Supabase Edge Functions.
 *
 * Usage :
 *   GOOGLE_CLIENT_ID="..." GOOGLE_CLIENT_SECRET="..." node get-refresh-token.mjs
 *
 * Ou avec les valeurs EJ Assurances :
 *   node get-refresh-token.mjs
 *   (les credentials sont pré-remplis ci-dessous)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { createServer } from 'http';
import { URL } from 'url';
import { createInterface } from 'readline';

// ─── Configuration ────────────────────────────────────────────────────────────

// Renseignez votre Client ID Google OAuth 2.0
// Disponible sur : https://console.cloud.google.com/apis/credentials
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

// Renseignez votre Client Secret Google OAuth 2.0
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

// Redirect URI configurée dans Google Cloud Console
// Option A : localhost (serveur HTTP local intégré)
const REDIRECT_URI_LOCAL = 'http://localhost:3333/callback';
// Option B : localhost sans port (si configuré dans GCC)
const REDIRECT_URI_PLAIN = 'http://localhost';

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
].join(' ');

// ─── Couleurs terminal ────────────────────────────────────────────────────────

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

// ─── Méthode A : Serveur local (automatique) ──────────────────────────────────

async function methodAutoLocalServer() {
  return new Promise((resolve, reject) => {
    let server;

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', REDIRECT_URI_LOCAL);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', SCOPES);
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent');

    console.log(`\n${c.bold}${c.blue}━━━ Méthode A : Serveur local automatique ━━━${c.reset}`);
    console.log(`\n${c.yellow}1. Ouvrez ce lien dans votre navigateur :${c.reset}`);
    console.log(`\n   ${c.cyan}${authUrl.toString()}${c.reset}\n`);
    console.log(`${c.yellow}2. Connectez-vous avec contact@ej-assurances.fr${c.reset}`);
    console.log(`${c.yellow}3. Autorisez l'accès Google Drive${c.reset}`);
    console.log(`${c.yellow}4. Le token sera capturé automatiquement...${c.reset}\n`);

    server = createServer(async (req, res) => {
      const reqUrl = new URL(req.url, 'http://localhost:3333');
      if (reqUrl.pathname !== '/callback') {
        res.end('Not found');
        return;
      }

      const code = reqUrl.searchParams.get('code');
      const error = reqUrl.searchParams.get('error');

      if (error) {
        res.writeHead(400);
        res.end(`<h1>Erreur : ${error}</h1>`);
        server.close();
        reject(new Error(`Erreur OAuth : ${error}`));
        return;
      }

      if (!code) {
        res.writeHead(400);
        res.end('<h1>Code manquant</h1>');
        return;
      }

      // Échanger le code contre les tokens
      try {
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI_LOCAL,
            grant_type: 'authorization_code',
          }),
        });

        const tokens = await tokenRes.json();

        if (tokens.error) {
          res.writeHead(400);
          res.end(`<h1>Erreur token : ${tokens.error_description}</h1>`);
          server.close();
          reject(new Error(tokens.error_description));
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <html><body style="font-family:sans-serif;padding:2rem;background:#f0fdf4">
            <h1 style="color:#16a34a">✅ Refresh Token obtenu !</h1>
            <p>Vous pouvez fermer cet onglet et retourner dans votre terminal.</p>
          </body></html>
        `);

        server.close();
        resolve(tokens);
      } catch (err) {
        res.writeHead(500);
        res.end(`<h1>Erreur : ${err.message}</h1>`);
        server.close();
        reject(err);
      }
    });

    server.listen(3333, () => {
      console.log(`${c.green}Serveur en écoute sur http://localhost:3333/callback${c.reset}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`${c.yellow}Port 3333 occupé — utilisez la Méthode B ci-dessous${c.reset}`);
        server.close();
        reject(err);
      }
    });
  });
}

// ─── Méthode B : Manuel (copier-coller du code) ───────────────────────────────

async function methodManual() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI_PLAIN);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', SCOPES);
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');

  console.log(`\n${c.bold}${c.blue}━━━ Méthode B : Copier-coller manuel ━━━${c.reset}`);
  console.log(`\n${c.yellow}1. Ouvrez ce lien dans votre navigateur :${c.reset}`);
  console.log(`\n   ${c.cyan}${authUrl.toString()}${c.reset}\n`);
  console.log(`${c.yellow}2. Connectez-vous avec contact@ej-assurances.fr et autorisez l'accès${c.reset}`);
  console.log(`${c.yellow}3. Vous serez redirigé vers http://localhost/?code=XXXX...${c.reset}`);
  console.log(`${c.yellow}4. Copiez la valeur du paramètre "code" dans l'URL${c.reset}\n`);

  return new Promise((resolve, reject) => {
    rl.question(`${c.bold}Collez le code ici : ${c.reset}`, async (code) => {
      rl.close();
      code = code.trim();

      if (!code) {
        reject(new Error('Code vide'));
        return;
      }

      try {
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI_PLAIN,
            grant_type: 'authorization_code',
          }),
        });

        const tokens = await tokenRes.json();
        if (tokens.error) {
          reject(new Error(`${tokens.error}: ${tokens.error_description}`));
          return;
        }
        resolve(tokens);
      } catch (err) {
        reject(err);
      }
    });
  });
}

// ─── Affichage du résultat ────────────────────────────────────────────────────

function displayResult(tokens) {
  console.log(`\n${c.bold}${c.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);
  console.log(`${c.bold}${c.green}✅ REFRESH TOKEN OBTENU AVEC SUCCÈS${c.reset}`);
  console.log(`${c.bold}${c.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}\n`);

  if (tokens.refresh_token) {
    console.log(`${c.bold}REFRESH TOKEN :${c.reset}`);
    console.log(`${c.cyan}${tokens.refresh_token}${c.reset}\n`);
  } else {
    console.log(`${c.yellow}⚠️  Pas de refresh_token dans la réponse.${c.reset}`);
    console.log(`${c.yellow}   Cela arrive si le compte a déjà autorisé l'app. Révoquez l'accès sur${c.reset}`);
    console.log(`${c.yellow}   https://myaccount.google.com/permissions puis relancez le script.${c.reset}\n`);
  }

  console.log(`${c.bold}Prochaine étape — Configurer le secret Supabase :${c.reset}`);
  console.log(`${c.yellow}supabase secrets set GOOGLE_REFRESH_TOKEN="${tokens.refresh_token || 'VOTRE_TOKEN'}" \\${c.reset}`);
  console.log(`${c.yellow}  --project-ref huneukcmqaftwhidyegi${c.reset}\n`);

  console.log(`${c.bold}Ou via le Dashboard Supabase :${c.reset}`);
  console.log(`${c.cyan}https://supabase.com/dashboard/project/huneukcmqaftwhidyegi/settings/functions${c.reset}\n`);

  console.log(`${c.bold}Tous les tokens :${c.reset}`);
  console.log(JSON.stringify(tokens, null, 2));
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n${c.bold}${c.blue}╔══════════════════════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.bold}${c.blue}║  EJ Assurances — Générateur de Refresh Token Google OAuth   ║${c.reset}`);
  console.log(`${c.bold}${c.blue}╚══════════════════════════════════════════════════════════════╝${c.reset}\n`);

  console.log(`${c.bold}Client ID :${c.reset} ${CLIENT_ID}`);
  console.log(`${c.bold}Scopes    :${c.reset} ${SCOPES}\n`);

  // Essayer d'abord la méthode automatique (serveur local)
  try {
    const tokens = await methodAutoLocalServer();
    displayResult(tokens);
  } catch (err) {
    // Si le port est occupé ou autre erreur, passer en mode manuel
    console.log(`\n${c.yellow}Méthode automatique échouée (${err.message}).${c.reset}`);
    console.log(`${c.yellow}Basculement vers la méthode manuelle...${c.reset}\n`);

    try {
      const tokens = await methodManual();
      displayResult(tokens);
    } catch (err2) {
      console.error(`\n${c.red}❌ Erreur : ${err2.message}${c.reset}\n`);
      process.exit(1);
    }
  }
}

main();
