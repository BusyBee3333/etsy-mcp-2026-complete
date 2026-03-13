import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_listing_properties_list",
    "List all properties/attributes set on a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
    },
    async ({ shop_id, listing_id }) =>
      c.get(`/shops/${shop_id}/listings/${listing_id}/properties`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_property_get",
    "Get a specific property for a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      property_id: z.number().int(),
    },
    async ({ shop_id, listing_id, property_id }) =>
      c.get(`/shops/${shop_id}/listings/${listing_id}/properties/${property_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_property_update",
    "Update a property/attribute on a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      property_id: z.number().int(),
      value_ids: z.array(z.number().int()),
      values: z.array(z.string()),
      scale_id: z.number().int().optional(),
    },
    async ({ shop_id, listing_id, property_id, ...body }) =>
      c.put(`/shops/${shop_id}/listings/${listing_id}/properties/${property_id}`, body)
  );

  server.tool(
    "etsy_listing_property_delete",
    "Delete a property from a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      property_id: z.number().int(),
    },
    async ({ shop_id, listing_id, property_id }) =>
      c.delete(`/shops/${shop_id}/listings/${listing_id}/properties/${property_id}`),
    { destructiveHint: true }
  );
}
