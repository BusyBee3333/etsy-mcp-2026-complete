import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_listing_materials_get",
    "Get all materials listed on a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
    },
    async ({ shop_id, listing_id }) => {
      const listing = await c.get<{ materials?: string[] }>(
        `/shops/${shop_id}/listings/${listing_id}`
      );
      return { materials: (listing as { materials?: string[] }).materials ?? [] };
    },
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_materials_update",
    "Replace all materials on a listing (max 13)",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      materials: z.array(z.string().max(45)).max(13).describe("Array of material strings"),
    },
    async ({ shop_id, listing_id, materials }) =>
      c.patch(`/shops/${shop_id}/listings/${listing_id}`, { materials })
  );

  server.tool(
    "etsy_listing_materials_add",
    "Add materials to a listing (merges with existing)",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      new_materials: z.array(z.string().max(45)).describe("Materials to add"),
    },
    async ({ shop_id, listing_id, new_materials }) => {
      const listing = await c.get<{ materials?: string[] }>(
        `/shops/${shop_id}/listings/${listing_id}`
      );
      const existing: string[] = (listing as { materials?: string[] }).materials ?? [];
      const merged = Array.from(new Set([...existing, ...new_materials])).slice(0, 13);
      return c.patch(`/shops/${shop_id}/listings/${listing_id}`, { materials: merged });
    }
  );
}
