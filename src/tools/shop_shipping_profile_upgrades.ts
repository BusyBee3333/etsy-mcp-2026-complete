import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_shipping_profile_upgrades_list",
    "List all upgrades for a shipping profile",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shipping_profile_id: z.number().int(),
    },
    async ({ shop_id, shipping_profile_id }) =>
      c.get(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/upgrades`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_shipping_profile_upgrade_create",
    "Create a shipping upgrade for a profile",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shipping_profile_id: z.number().int(),
      type: z.enum(["0", "1"]).describe("0 = 'accept only one', 1 = 'let buyer pick'"),
      name: z.string().describe("Upgrade name shown to buyers"),
      price: z.number().nonnegative(),
      secondary_price: z.number().nonnegative(),
      shipping_carrier_id: z.number().int().optional(),
      mail_class: z.string().optional(),
      min_delivery_days: z.number().int().optional(),
      max_delivery_days: z.number().int().optional(),
    },
    async ({ shop_id, shipping_profile_id, ...body }) =>
      c.post(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/upgrades`, body)
  );

  server.tool(
    "etsy_shipping_profile_upgrade_update",
    "Update a shipping upgrade",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shipping_profile_id: z.number().int(),
      upgrade_id: z.number().int(),
      name: z.string().optional(),
      price: z.number().nonnegative().optional(),
      secondary_price: z.number().nonnegative().optional(),
      shipping_carrier_id: z.number().int().optional(),
      mail_class: z.string().optional(),
      min_delivery_days: z.number().int().optional(),
      max_delivery_days: z.number().int().optional(),
    },
    async ({ shop_id, shipping_profile_id, upgrade_id, ...body }) =>
      c.put(
        `/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/upgrades/${upgrade_id}`,
        body
      )
  );

  server.tool(
    "etsy_shipping_profile_upgrade_delete",
    "Delete a shipping upgrade from a profile",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shipping_profile_id: z.number().int(),
      upgrade_id: z.number().int(),
    },
    async ({ shop_id, shipping_profile_id, upgrade_id }) =>
      c.delete(
        `/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/upgrades/${upgrade_id}`
      ),
    { destructiveHint: true }
  );
}
