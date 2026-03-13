import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_payouts_list",
    "List all payouts for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
      sort_order: z.enum(["asc", "desc"]).optional(),
      min_created: z.number().int().optional(),
      max_created: z.number().int().optional(),
    },
    async ({ shop_id, ...params }) =>
      c.get(`/shops/${shop_id}/payment-account/payouts`, params),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_payout_get",
    "Get a specific payout by ID",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      payout_id: z.number().int(),
    },
    async ({ shop_id, payout_id }) =>
      c.get(`/shops/${shop_id}/payment-account/payouts/${payout_id}`),
    { readOnlyHint: true }
  );
}
