#!/usr/bin/env node
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { EtsyMCPServer } from "./server.js";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const ETSY_API_KEY = process.env.ETSY_API_KEY;
const ETSY_SHARED_SECRET = process.env.ETSY_SHARED_SECRET;

if (!ETSY_API_KEY) {
  console.error(
    "Error: ETSY_API_KEY environment variable is required.\n" +
      "Get your API key from https://www.etsy.com/developers/your-apps\n" +
      "Set it in .env or export ETSY_API_KEY=<your-key>"
  );
  process.exit(1);
}

// OAuth tokens live in a JSON file (written by get-token.cjs and refreshed at runtime).
// Falls back to ETSY_ACCESS_TOKEN from the environment if the file is absent.
const tokenPath =
  process.env.ETSY_TOKEN_FILE || path.join(__dirname, "..", ".etsy-tokens.json");

let accessToken = process.env.ETSY_ACCESS_TOKEN;
let refreshToken: string | undefined;

if (fs.existsSync(tokenPath)) {
  try {
    const t = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
    accessToken = t.access_token ?? accessToken;
    refreshToken = t.refresh_token;
  } catch (e) {
    console.error("Could not read token file:", (e as Error).message);
  }
}

const server = new EtsyMCPServer(ETSY_API_KEY, accessToken, {
  refreshToken,
  tokenPath,
  sharedSecret: ETSY_SHARED_SECRET,
});
server.start().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
