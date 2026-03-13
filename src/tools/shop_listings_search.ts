import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_shop_listings_search",
    "Search listings within a specific shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      keywords: z.string().optional(),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
      sort_on: z.enum(["created", "price", "updated", "score"]).optional(),
      sort_order: z.enum(["asc", "desc"]).optional(),
      min_price: z.number().optional(),
      max_price: z.number().optional(),
      includes: z.array(z.string()).optional(),
    },
    async ({ shop_id, ...params }) =>
      c.get(`/shops/${shop_id}/listings/active`, params),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_shop_listings_by_section",
    "List listings within a specific shop section",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shop_section_id: z.number().int(),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
    },
    async ({ shop_id, ...params }) =>
      c.get(`/shops/${shop_id}/listings/active`, params),
    { readOnlyHint: true }
  );
}
