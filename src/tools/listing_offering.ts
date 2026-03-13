import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_listing_offering_get",
    "Get a specific offering (price/quantity for a variation) on a listing",
    {
      listing_id: z.number().int(),
      product_id: z.number().int(),
      product_offering_id: z.number().int(),
    },
    async ({ listing_id, product_id, product_offering_id }) =>
      c.get(
        `/listings/${listing_id}/products/${product_id}/offerings/${product_offering_id}`
      ),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_product_get",
    "Get a specific product variant for a listing",
    {
      listing_id: z.number().int(),
      product_id: z.number().int(),
    },
    async ({ listing_id, product_id }) =>
      c.get(`/listings/${listing_id}/products/${product_id}`),
    { readOnlyHint: true }
  );
}
