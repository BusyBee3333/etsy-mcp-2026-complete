import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_ledger_entries_list",
    "List all financial ledger entries for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
      min_created: z.number().int().optional().describe("Unix timestamp lower bound"),
      max_created: z.number().int().optional().describe("Unix timestamp upper bound"),
    },
    async ({ shop_id, ...params }) =>
      c.get(`/shops/${shop_id}/payment-account/ledger-entries`, params),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_ledger_entry_get",
    "Get a specific ledger entry",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      ledger_entry_id: z.number().int(),
    },
    async ({ shop_id, ledger_entry_id }) =>
      c.get(`/shops/${shop_id}/payment-account/ledger-entries/${ledger_entry_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_ledger_entry_payment_get",
    "Get the payment associated with a ledger entry",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      ledger_entry_id: z.number().int(),
    },
    async ({ shop_id, ledger_entry_id }) =>
      c.get(
        `/shops/${shop_id}/payment-account/ledger-entries/${ledger_entry_id}/payment`
      ),
    { readOnlyHint: true }
  );
}
