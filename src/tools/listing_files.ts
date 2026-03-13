import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_listing_files_list",
    "List all digital download files attached to a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
    },
    async ({ shop_id, listing_id }) =>
      c.get(`/shops/${shop_id}/listings/${listing_id}/files`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_file_get",
    "Get a specific digital file attached to a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      listing_file_id: z.number().int(),
    },
    async ({ shop_id, listing_id, listing_file_id }) =>
      c.get(`/shops/${shop_id}/listings/${listing_id}/files/${listing_file_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_file_upload",
    "Upload a digital download file to a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      listing_file_id: z.number().int().optional().describe("Existing file ID to attach instead of uploading"),
      name: z.string().optional().describe("File name"),
      rank: z.number().int().min(1).optional().describe("Display rank"),
    },
    async ({ shop_id, listing_id, ...body }) =>
      c.post(`/shops/${shop_id}/listings/${listing_id}/files`, body)
  );

  server.tool(
    "etsy_listing_file_delete",
    "Delete a digital file from a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      listing_file_id: z.number().int(),
    },
    async ({ shop_id, listing_id, listing_file_id }) =>
      c.delete(`/shops/${shop_id}/listings/${listing_id}/files/${listing_file_id}`),
    { destructiveHint: true }
  );
}
