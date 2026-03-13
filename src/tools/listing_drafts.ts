import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_listing_drafts_list",
    "List all draft listings for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
    },
    async ({ shop_id, ...params }) =>
      c.get(`/shops/${shop_id}/listings/draft`, params),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_draft_create",
    "Create a new draft listing (state=draft)",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      quantity: z.number().int().min(1),
      title: z.string().max(140),
      description: z.string(),
      price: z.number().positive(),
      who_made: z.enum(["i_did", "someone_else", "collective"]),
      when_made: z.string(),
      taxonomy_id: z.number().int(),
      shipping_profile_id: z.number().int().optional(),
      return_policy_id: z.number().int().optional(),
      tags: z.array(z.string()).optional(),
      materials: z.array(z.string()).optional(),
      skus: z.array(z.string()).optional(),
    },
    async ({ shop_id, ...body }) =>
      c.post(`/shops/${shop_id}/listings`, { ...body, state: "draft" })
  );

  server.tool(
    "etsy_listing_draft_publish",
    "Publish a draft listing by setting its state to active",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
    },
    async ({ shop_id, listing_id }) =>
      c.patch(`/shops/${shop_id}/listings/${listing_id}`, { state: "active" })
  );
}
