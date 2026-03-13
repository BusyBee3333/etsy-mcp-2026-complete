import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_shop_shipping_profiles_list",
    "List all shipping profiles for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
    },
    async ({ shop_id }) => c.get(`/shops/${shop_id}/shipping-profiles`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_shop_shipping_profile_get",
    "Get a specific shipping profile",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shipping_profile_id: z.number().int(),
    },
    async ({ shop_id, shipping_profile_id }) =>
      c.get(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_shop_shipping_profile_create",
    "Create a shipping profile for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      title: z.string().describe("Profile name"),
      origin_country_iso: z.string().describe("ISO country code of ship-from location"),
      primary_cost: z.number().nonnegative().describe("Primary shipping cost"),
      secondary_cost: z.number().nonnegative().describe("Additional item shipping cost"),
      min_processing_time: z.number().int().min(1),
      max_processing_time: z.number().int().min(1),
      processing_time_unit: z.enum(["business_days", "weeks"]).optional(),
      destination_country_iso: z.string().optional(),
      destination_region: z.enum(["eu", "non_eu", "none"]).optional(),
      origin_postal_code: z.string().optional(),
      shipping_carrier_id: z.number().int().optional(),
      mail_class: z.string().optional(),
      min_delivery_days: z.number().int().optional(),
      max_delivery_days: z.number().int().optional(),
    },
    async ({ shop_id, ...body }) =>
      c.post(`/shops/${shop_id}/shipping-profiles`, body)
  );

  server.tool(
    "etsy_shop_shipping_profile_update",
    "Update a shipping profile",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shipping_profile_id: z.number().int(),
      title: z.string().optional(),
      origin_country_iso: z.string().optional(),
      primary_cost: z.number().nonnegative().optional(),
      secondary_cost: z.number().nonnegative().optional(),
      min_processing_time: z.number().int().optional(),
      max_processing_time: z.number().int().optional(),
      processing_time_unit: z.enum(["business_days", "weeks"]).optional(),
      destination_country_iso: z.string().optional(),
      origin_postal_code: z.string().optional(),
    },
    async ({ shop_id, shipping_profile_id, ...body }) =>
      c.put(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}`, body)
  );

  server.tool(
    "etsy_shop_shipping_profile_delete",
    "Delete a shipping profile from a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shipping_profile_id: z.number().int(),
    },
    async ({ shop_id, shipping_profile_id }) =>
      c.delete(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}`),
    { destructiveHint: true }
  );
}
