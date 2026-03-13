import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_receipts_list",
    "List all receipts (orders) for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
      was_paid: z.boolean().optional(),
      was_shipped: z.boolean().optional(),
      was_delivered: z.boolean().optional(),
      was_canceled: z.boolean().optional(),
      sort_on: z.enum(["created", "updated", "receipt_id"]).optional(),
      sort_order: z.enum(["asc", "desc"]).optional(),
      min_created: z.number().int().optional().describe("Unix timestamp"),
      max_created: z.number().int().optional().describe("Unix timestamp"),
      min_last_modified: z.number().int().optional(),
      max_last_modified: z.number().int().optional(),
    },
    async ({ shop_id, ...params }) =>
      c.get(`/shops/${shop_id}/receipts`, params),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_receipt_get",
    "Get a single receipt by ID",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      receipt_id: z.number().int(),
    },
    async ({ shop_id, receipt_id }) =>
      c.get(`/shops/${shop_id}/receipts/${receipt_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_receipt_update",
    "Update a receipt — mark as shipped, add a seller note, etc.",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      receipt_id: z.number().int(),
      was_shipped: z.boolean().optional(),
      was_paid: z.boolean().optional(),
      message_from_seller: z.string().optional(),
    },
    async ({ shop_id, receipt_id, ...body }) =>
      c.put(`/shops/${shop_id}/receipts/${receipt_id}`, body)
  );
}
