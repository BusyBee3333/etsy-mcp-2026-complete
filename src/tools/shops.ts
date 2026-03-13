import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_shop_get",
    "Get a shop by ID or shop name",
    {
      shop_id: z.union([z.number().int(), z.string()]).describe("Shop ID or shop name"),
    },
    async ({ shop_id }) => c.get(`/shops/${shop_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_shop_update",
    "Update a shop's profile information",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      title: z.string().optional().describe("Shop banner title"),
      announcement: z.string().optional(),
      sale_message: z.string().optional(),
      digital_sale_message: z.string().optional(),
      policy_welcome: z.string().optional(),
      policy_payment: z.string().optional(),
      policy_shipping: z.string().optional(),
      policy_refunds: z.string().optional(),
      policy_additional: z.string().optional(),
      policy_seller_info: z.string().optional(),
      vacation_is_on: z.boolean().optional(),
      vacation_message: z.string().optional(),
    },
    async ({ shop_id, ...body }) => c.put(`/shops/${shop_id}`, body)
  );

  server.tool(
    "etsy_shops_by_owner",
    "Get all shops owned by a specific user",
    {
      user_id: z.union([z.number().int(), z.string()]).describe("User ID or login name"),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
    },
    async ({ user_id, ...params }) =>
      c.get(`/users/${user_id}/shops`, params),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_shop_find",
    "Search for shops by name keyword",
    {
      shop_name: z.string().describe("Shop name keyword to search"),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
    },
    async (params) => c.get("/shops", params),
    { readOnlyHint: true }
  );
}
