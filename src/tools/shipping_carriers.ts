import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_shipping_carriers_list",
    "List available shipping carriers for a given origin country",
    {
      origin_country_iso: z.string().describe("ISO 3166-1 alpha-2 country code, e.g. 'US', 'GB'"),
    },
    async (params) => c.get("/shipping-carriers", params),
    { readOnlyHint: true }
  );
}
