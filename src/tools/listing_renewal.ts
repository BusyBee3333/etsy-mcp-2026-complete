import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_listing_renew",
    "Renew an expired or sold-out listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
    },
    async ({ shop_id, listing_id }) =>
      c.put(`/shops/${shop_id}/listings/${listing_id}/renew`)
  );

  server.tool(
    "etsy_listings_expired_list",
    "List all expired listings for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
    },
    async ({ shop_id, ...params }) =>
      c.get(`/shops/${shop_id}/listings`, { ...params, state: "expired" }),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listings_inactive_list",
    "List all inactive listings for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
    },
    async ({ shop_id, ...params }) =>
      c.get(`/shops/${shop_id}/listings`, { ...params, state: "inactive" }),
    { readOnlyHint: true }
  );
}
