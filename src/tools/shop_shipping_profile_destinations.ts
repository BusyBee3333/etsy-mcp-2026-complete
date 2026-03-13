import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_shipping_profile_destinations_list",
    "List all destinations for a shipping profile",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shipping_profile_id: z.number().int(),
    },
    async ({ shop_id, shipping_profile_id }) =>
      c.get(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/destinations`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_shipping_profile_destination_create",
    "Create a destination entry for a shipping profile",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shipping_profile_id: z.number().int(),
      primary_cost: z.number().nonnegative(),
      secondary_cost: z.number().nonnegative(),
      destination_country_iso: z.string().optional(),
      destination_region: z.enum(["eu", "non_eu", "none"]).optional(),
      shipping_carrier_id: z.number().int().optional(),
      mail_class: z.string().optional(),
      min_delivery_days: z.number().int().optional(),
      max_delivery_days: z.number().int().optional(),
    },
    async ({ shop_id, shipping_profile_id, ...body }) =>
      c.post(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/destinations`, body)
  );

  server.tool(
    "etsy_shipping_profile_destination_update",
    "Update a destination for a shipping profile",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shipping_profile_id: z.number().int(),
      shipping_profile_destination_id: z.number().int(),
      primary_cost: z.number().nonnegative().optional(),
      secondary_cost: z.number().nonnegative().optional(),
      destination_country_iso: z.string().optional(),
      destination_region: z.enum(["eu", "non_eu", "none"]).optional(),
      shipping_carrier_id: z.number().int().optional(),
      mail_class: z.string().optional(),
      min_delivery_days: z.number().int().optional(),
      max_delivery_days: z.number().int().optional(),
    },
    async ({ shop_id, shipping_profile_id, shipping_profile_destination_id, ...body }) =>
      c.put(
        `/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/destinations/${shipping_profile_destination_id}`,
        body
      )
  );

  server.tool(
    "etsy_shipping_profile_destination_delete",
    "Delete a destination from a shipping profile",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shipping_profile_id: z.number().int(),
      shipping_profile_destination_id: z.number().int(),
    },
    async ({ shop_id, shipping_profile_id, shipping_profile_destination_id }) =>
      c.delete(
        `/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/destinations/${shipping_profile_destination_id}`
      ),
    { destructiveHint: true }
  );
}
