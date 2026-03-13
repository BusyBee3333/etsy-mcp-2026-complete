import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_shop_reviews_list",
    "List reviews for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
      min_created: z.number().int().optional().describe("Unix timestamp"),
      max_created: z.number().int().optional().describe("Unix timestamp"),
    },
    async ({ shop_id, ...params }) =>
      c.get(`/shops/${shop_id}/reviews`, params),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_reviews_list",
    "List reviews for a specific listing",
    {
      listing_id: z.number().int(),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
    },
    async ({ listing_id, ...params }) =>
      c.get(`/listings/${listing_id}/reviews`, params),
    { readOnlyHint: true }
  );
}
