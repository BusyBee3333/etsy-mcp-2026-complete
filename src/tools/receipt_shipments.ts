import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_receipt_shipments_list",
    "List all shipments for a receipt",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      receipt_id: z.number().int(),
    },
    async ({ shop_id, receipt_id }) =>
      c.get(`/shops/${shop_id}/receipts/${receipt_id}/tracking`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_receipt_shipment_create",
    "Create a shipment / add tracking to a receipt",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      receipt_id: z.number().int(),
      tracking_code: z.string().optional().describe("Carrier tracking code"),
      carrier_name: z.string().optional().describe("Shipping carrier name"),
      send_bcc: z.boolean().optional().describe("Send tracking to buyer"),
      note_to_buyer: z.string().optional(),
    },
    async ({ shop_id, receipt_id, ...body }) =>
      c.post(`/shops/${shop_id}/receipts/${receipt_id}/tracking`, body)
  );
}
