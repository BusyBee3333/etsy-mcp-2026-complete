import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_listing_variation_images_get",
    "Get variation images (images linked to specific product variations) for a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
    },
    async ({ shop_id, listing_id }) =>
      c.get(`/shops/${shop_id}/listings/${listing_id}/variation-images`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_variation_images_update",
    "Update (associate) variation images for a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      variation_images: z.array(
        z.object({
          property_id: z.number().int(),
          value_id: z.number().int(),
          image_id: z.number().int(),
        })
      ).describe("Array mapping property value IDs to image IDs"),
    },
    async ({ shop_id, listing_id, variation_images }) =>
      c.post(`/shops/${shop_id}/listings/${listing_id}/variation-images`, {
        variation_images,
      })
  );
}
