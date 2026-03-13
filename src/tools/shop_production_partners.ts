import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_shop_production_partners_list",
    "List all production partners for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
    },
    async ({ shop_id }) => c.get(`/shops/${shop_id}/production-partners`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_shop_production_partner_create",
    "Create a new production partner for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      partner_name: z.string().describe("Name of the production partner"),
      location: z.string().describe("City/region where partner is located"),
      is_unlisted: z.boolean().optional().describe("Whether the partner is unlisted"),
    },
    async ({ shop_id, ...body }) =>
      c.post(`/shops/${shop_id}/production-partners`, body)
  );

  server.tool(
    "etsy_shop_production_partner_update",
    "Update a production partner for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      production_partner_id: z.number().int(),
      partner_name: z.string().optional(),
      location: z.string().optional(),
      is_unlisted: z.boolean().optional(),
    },
    async ({ shop_id, production_partner_id, ...body }) =>
      c.patch(`/shops/${shop_id}/production-partners/${production_partner_id}`, body)
  );

  server.tool(
    "etsy_shop_production_partner_delete",
    "Delete a production partner from a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      production_partner_id: z.number().int(),
    },
    async ({ shop_id, production_partner_id }) =>
      c.delete(`/shops/${shop_id}/production-partners/${production_partner_id}`),
    { destructiveHint: true }
  );
}
