import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_shop_receipt_transactions_list",
    "List all transactions for a specific receipt in a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      receipt_id: z.number().int(),
    },
    async ({ shop_id, receipt_id }) =>
      c.get(`/shops/${shop_id}/receipts/${receipt_id}/transactions`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_shop_listing_transactions_list",
    "List transactions for a specific listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
    },
    async ({ shop_id, listing_id }) =>
      c.get(`/shops/${shop_id}/listings/${listing_id}/transactions`),
    { readOnlyHint: true }
  );
}
