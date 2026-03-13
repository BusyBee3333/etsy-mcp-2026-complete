import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_receipt_transactions_list",
    "List all transactions for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
    },
    async ({ shop_id, ...params }) =>
      c.get(`/shops/${shop_id}/transactions`, params),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_receipt_transaction_get",
    "Get a single transaction by ID",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      transaction_id: z.number().int(),
    },
    async ({ shop_id, transaction_id }) =>
      c.get(`/shops/${shop_id}/transactions/${transaction_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_receipt_transactions_by_receipt",
    "List all transactions for a specific receipt",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      receipt_id: z.number().int(),
    },
    async ({ shop_id, receipt_id }) =>
      c.get(`/shops/${shop_id}/receipts/${receipt_id}/transactions`),
    { readOnlyHint: true }
  );
}
