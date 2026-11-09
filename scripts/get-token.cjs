#!/usr/bin/env node
/**
 * One-time Etsy OAuth 2.0 (PKCE) helper.
 * Starts a local server on :3003, prints an authorize URL, and after you click
 * "Allow" on Etsy it exchanges the code for tokens and writes .etsy-tokens.json.
 *
 * Usage:  npm run auth   (or: node scripts/get-token.cjs)
 * Needs:  ETSY_API_KEY in .env (your app keystring); ETSY_SHARED_SECRET if your app requires it.
 * Your Etsy app must list  http://localhost:3003/callback  as a callback URL
 * (override the port with ETSY_OAUTH_PORT and the scopes with ETSY_SCOPES).
 */
const ROOT = require("path").join(__dirname, "..");
require("dotenv").config({ path: require("path").join(ROOT, ".env") });
const http = require("http");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const CLIENT_ID = process.env.ETSY_API_KEY;
const SHARED_SECRET = process.env.ETSY_SHARED_SECRET;
const API_KEY_HEADER = SHARED_SECRET ? `${CLIENT_ID}:${SHARED_SECRET}` : CLIENT_ID;
const PORT = Number(process.env.ETSY_OAUTH_PORT) || 3003;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;
const SCOPES = (process.env.ETSY_SCOPES || "listings_r listings_w listings_d").split(/[\s,]+/).filter(Boolean);
const TOKEN_URL = "https://api.etsy.com/v3/public/oauth/token";
const TOKEN_FILE = process.env.ETSY_TOKEN_FILE || path.join(ROOT, ".etsy-tokens.json");

if (!CLIENT_ID) {
  console.error("Missing ETSY_API_KEY in .env");
  process.exit(1);
}

const b64url = (buf) =>
  buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const codeVerifier = b64url(crypto.randomBytes(32));
const codeChallenge = b64url(crypto.createHash("sha256").update(codeVerifier).digest());
const state = b64url(crypto.randomBytes(16));

const authUrl =
  "https://www.etsy.com/oauth/connect?" +
  new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(" "),
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  }).toString();

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith("/callback")) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<h2>Error de autorizacion: ${error}</h2>`);
    console.error("AUTH_ERROR:", error, url.searchParams.get("error_description"));
    return;
  }
  if (!code || returnedState !== state) {
    res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h2>Estado invalido o falta el codigo. Reintenta.</h2>");
    console.error("STATE_MISMATCH_OR_NO_CODE");
    return;
  }

  try {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code,
      code_verifier: codeVerifier,
    }).toString();
    const tokenRes = await axios.post(TOKEN_URL, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-api-key": API_KEY_HEADER,
      },
    });
    const { access_token, refresh_token, expires_in } = tokenRes.data;
    fs.writeFileSync(
      TOKEN_FILE,
      JSON.stringify(
        {
          access_token,
          refresh_token,
          expires_at: Date.now() + (expires_in || 3600) * 1000,
        },
        null,
        2
      )
    );
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h2>OK. Tokens guardados. Ya puedes cerrar esta pestana y volver a Claude.</h2>");
    console.log("Tokens saved to", TOKEN_FILE);
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 500);
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h2>Error intercambiando el codigo. Mira la consola de Claude.</h2>");
    console.error("TOKEN_EXCHANGE_FAILED:", JSON.stringify(e.response ? e.response.data : e.message));
  }
});

server.listen(PORT, () => {
  console.log("Waiting for the Etsy OAuth callback...");
  console.log("Callback URL:", REDIRECT_URI);
  console.log("Open this URL in your browser and click Allow:");
  console.log(authUrl);
});
