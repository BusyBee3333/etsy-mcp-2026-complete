import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_listing_stats_get",
    "Get stats (views, favorites) for a specific listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
    },
    async ({ shop_id, listing_id }) =>
      c.get(`/shops/${shop_id}/listings/${listing_id}`, {
        includes: ["Stats"],
      }),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_views_get",
    "Get view count for a listing",
    {
      listing_id: z.number().int(),
    },
    async ({ listing_id }) =>
      c.get(`/listings/${listing_id}`, { includes: ["Stats"] }),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listings_stats_bulk",
    "Get stats for multiple listings at once",
    {
      listing_ids: z.array(z.number().int()).describe("Listing IDs to fetch stats for"),
    },
    async ({ listing_ids }) =>
      c.get("/listings/batch", { listing_ids, includes: ["Stats"] }),
    { readOnlyHint: true }
  );
}
