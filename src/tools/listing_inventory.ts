import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

const ProductSchema = z.object({
  product_id: z.number().int().optional(),
  sku: z.string().optional(),
  is_deleted: z.boolean().optional(),
  offerings: z.array(
    z.object({
      offering_id: z.number().int().optional(),
      quantity: z.number().int().min(0),
      is_enabled: z.boolean(),
      price: z.object({
        amount: z.number().int(),
        divisor: z.number().int(),
        currency_code: z.string(),
      }),
    })
  ),
  property_values: z.array(
    z.object({
      property_id: z.number().int(),
      property_name: z.string().optional(),
      scale_id: z.number().int().nullable().optional(),
      scale_name: z.string().nullable().optional(),
      value_ids: z.array(z.number().int()),
      values: z.array(z.string()),
    })
  ).optional(),
});

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_listing_inventory_get",
    "Get the inventory/products for a listing (variations, prices, quantities, SKUs)",
    {
      listing_id: z.number().int(),
      shows_scaling: z.boolean().optional(),
    },
    async ({ listing_id, ...params }) =>
      c.get(`/listings/${listing_id}/inventory`, params),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_inventory_update",
    "Update the inventory for a listing — set products, prices, quantities and SKUs",
    {
      listing_id: z.number().int(),
      products: z.array(ProductSchema).describe("Array of product variation objects"),
      price_on_property: z.array(z.number().int()).optional().describe("Property IDs that drive price"),
      quantity_on_property: z.array(z.number().int()).optional().describe("Property IDs that drive quantity"),
      sku_on_property: z.array(z.number().int()).optional().describe("Property IDs that drive SKU"),
    },
    async ({ listing_id, ...body }) =>
      c.put(`/listings/${listing_id}/inventory`, body)
  );
}
