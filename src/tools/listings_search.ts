import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_listings_search",
    "Search all Etsy listings with full filter support",
    {
      keywords: z.string().optional().describe("Search keywords"),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
      sort_on: z.enum(["created", "price", "updated", "score"]).optional(),
      sort_order: z.enum(["asc", "desc"]).optional(),
      min_price: z.number().optional(),
      max_price: z.number().optional(),
      taxonomy_id: z.number().int().optional(),
      location: z.string().optional().describe("Filter by seller location"),
      color: z.string().optional().describe("Filter by color (hex or name)"),
      color_accuracy: z.number().int().min(0).max(100).optional(),
      translate_keywords: z.boolean().optional(),
      include_open_for_custom: z.boolean().optional(),
      ship_to_location: z.string().optional().describe("ISO country code"),
    },
    async (params) => c.get("/listings/active", params),
    { readOnlyHint: true }
  );
}
