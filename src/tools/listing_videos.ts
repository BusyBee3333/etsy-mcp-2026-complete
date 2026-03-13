import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_listing_videos_list",
    "List all videos for a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
    },
    async ({ shop_id, listing_id }) =>
      c.get(`/shops/${shop_id}/listings/${listing_id}/videos`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_video_get",
    "Get a specific video for a listing",
    {
      listing_id: z.number().int(),
      video_id: z.number().int(),
    },
    async ({ listing_id, video_id }) =>
      c.get(`/listings/${listing_id}/videos/${video_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_video_upload",
    "Upload a video to a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      video_id: z.number().int().optional().describe("Existing shop video ID to attach"),
      name: z.string().optional().describe("Video file name"),
    },
    async ({ shop_id, listing_id, ...body }) =>
      c.post(`/shops/${shop_id}/listings/${listing_id}/videos`, body)
  );

  server.tool(
    "etsy_listing_video_delete",
    "Remove a video from a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      video_id: z.number().int(),
    },
    async ({ shop_id, listing_id, video_id }) =>
      c.delete(`/shops/${shop_id}/listings/${listing_id}/videos/${video_id}`),
    { destructiveHint: true }
  );
}
