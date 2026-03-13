import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_payment_account_get",
    "Get payment account info for a shop (balance, currency, etc.)",
    {
      shop_id: z.union([z.number().int(), z.string()]),
    },
    async ({ shop_id }) =>
      c.get(`/shops/${shop_id}/payment-account`),
    { readOnlyHint: true }
  );
}
