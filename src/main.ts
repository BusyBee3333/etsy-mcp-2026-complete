#!/usr/bin/env node
import * as dotenv from "dotenv";
dotenv.config();

import { EtsyMCPServer } from "./server.js";

const ETSY_API_KEY = process.env.ETSY_API_KEY;
const ETSY_ACCESS_TOKEN = process.env.ETSY_ACCESS_TOKEN;

if (!ETSY_API_KEY) {
  console.error(
    "Error: ETSY_API_KEY environment variable is required.\n" +
      "Get your API key from https://www.etsy.com/developers/your-apps\n" +
      "Set it in .env or export ETSY_API_KEY=<your-key>"
  );
  process.exit(1);
}

const server = new EtsyMCPServer(ETSY_API_KEY, ETSY_ACCESS_TOKEN);
server.start().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
