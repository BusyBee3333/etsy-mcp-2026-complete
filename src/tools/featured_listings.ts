import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_featured_listings_list",
    "List featured listings for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
    },
    async ({ shop_id, ...params }) =>
      c.get(`/shops/${shop_id}/listings/featured`, params),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_set_featured_rank",
    "Set the featured rank for a listing (0 removes from featured)",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      featured_rank: z.number().int().min(0).describe("0 = not featured, 1–4 = featured position"),
    },
    async ({ shop_id, listing_id, featured_rank }) =>
      c.patch(`/shops/${shop_id}/listings/${listing_id}`, { featured_rank })
  );

  server.tool(
    "etsy_listing_feature",
    "Feature a listing at a specific rank in the shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      rank: z.number().int().min(1).max(4).default(1),
    },
    async ({ shop_id, listing_id, rank }) =>
      c.patch(`/shops/${shop_id}/listings/${listing_id}`, { featured_rank: rank })
  );

  server.tool(
    "etsy_listing_unfeature",
    "Remove a listing from the shop's featured listings",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
    },
    async ({ shop_id, listing_id }) =>
      c.patch(`/shops/${shop_id}/listings/${listing_id}`, { featured_rank: 0 }),
    { destructiveHint: true }
  );
}
