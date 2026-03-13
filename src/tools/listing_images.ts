import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_listing_images_list",
    "List all images for a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
    },
    async ({ shop_id, listing_id }) =>
      c.get(`/shops/${shop_id}/listings/${listing_id}/images`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_image_get",
    "Get a specific image for a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      listing_image_id: z.number().int(),
    },
    async ({ shop_id, listing_id, listing_image_id }) =>
      c.get(`/shops/${shop_id}/listings/${listing_id}/images/${listing_image_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_image_delete",
    "Delete an image from a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      listing_image_id: z.number().int(),
    },
    async ({ shop_id, listing_id, listing_image_id }) =>
      c.delete(`/shops/${shop_id}/listings/${listing_id}/images/${listing_image_id}`),
    { destructiveHint: true }
  );

  server.tool(
    "etsy_listing_image_upload",
    "Upload an image to a listing via URL or base64. Rank 1 is the primary image.",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      image_url: z.string().url().optional().describe("Publicly accessible image URL"),
      rank: z.number().int().min(1).max(10).optional().describe("Image display rank (1 = primary)"),
      overwrite: z.boolean().optional().describe("Overwrite existing image at this rank"),
      alt_text: z.string().max(250).optional().describe("Alt text for accessibility"),
      is_watermarked: z.boolean().optional(),
    },
    async ({ shop_id, listing_id, ...body }) =>
      c.post(`/shops/${shop_id}/listings/${listing_id}/images`, body)
  );

  server.tool(
    "etsy_listing_images_reorder",
    "Reorder images for a listing by providing an ordered array of listing_image_ids",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      listing_image_ids: z.array(z.number().int()).describe("Image IDs in desired display order"),
    },
    async ({ shop_id, listing_id, listing_image_ids }) =>
      c.post(`/shops/${shop_id}/listings/${listing_id}/images/reorder`, {
        listing_image_ids,
      })
  );
}
