import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_payments_list",
    "List all payments for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
    },
    async ({ shop_id, ...params }) =>
      c.get(`/shops/${shop_id}/payments`, params),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_payment_get",
    "Get a specific payment by ID",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      payment_id: z.number().int(),
    },
    async ({ shop_id, payment_id }) =>
      c.get(`/shops/${shop_id}/payments/${payment_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_payments_by_receipt",
    "Get payments associated with a specific receipt",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      receipt_id: z.number().int(),
    },
    async ({ shop_id, receipt_id }) =>
      c.get(`/shops/${shop_id}/receipts/${receipt_id}/payments`),
    { readOnlyHint: true }
  );
}
