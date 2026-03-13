import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_listing_tags_get",
    "Get all tags for a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
    },
    async ({ shop_id, listing_id }) => {
      const listing = await c.get<{ tags?: string[] }>(
        `/shops/${shop_id}/listings/${listing_id}`
      );
      return { tags: (listing as { tags?: string[] }).tags ?? [] };
    },
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_tags_update",
    "Replace all tags on a listing (max 13 tags, each max 20 chars)",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      tags: z.array(z.string().max(20)).max(13).describe("Array of tags (max 13)"),
    },
    async ({ shop_id, listing_id, tags }) =>
      c.patch(`/shops/${shop_id}/listings/${listing_id}`, { tags })
  );

  server.tool(
    "etsy_listing_tags_add",
    "Add tags to a listing (fetches current tags, merges, updates)",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      new_tags: z.array(z.string().max(20)).describe("Tags to add"),
    },
    async ({ shop_id, listing_id, new_tags }) => {
      const listing = await c.get<{ tags?: string[] }>(
        `/shops/${shop_id}/listings/${listing_id}`
      );
      const existing: string[] = (listing as { tags?: string[] }).tags ?? [];
      const merged = Array.from(new Set([...existing, ...new_tags])).slice(0, 13);
      return c.patch(`/shops/${shop_id}/listings/${listing_id}`, { tags: merged });
    }
  );
}
