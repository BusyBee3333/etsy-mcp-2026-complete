"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_listing_videos_list", "List all videos for a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id }) => c.get(`/shops/${shop_id}/listings/${listing_id}/videos`), { readOnlyHint: true });
    server.tool("etsy_listing_video_get", "Get a specific video for a listing", {
        listing_id: zod_1.z.number().int(),
        video_id: zod_1.z.number().int(),
    }, async ({ listing_id, video_id }) => c.get(`/listings/${listing_id}/videos/${video_id}`), { readOnlyHint: true });
    server.tool("etsy_listing_video_upload", "Upload a video to a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        video_id: zod_1.z.number().int().optional().describe("Existing shop video ID to attach"),
        name: zod_1.z.string().optional().describe("Video file name"),
    }, async ({ shop_id, listing_id, ...body }) => c.post(`/shops/${shop_id}/listings/${listing_id}/videos`, body));
    server.tool("etsy_listing_video_delete", "Remove a video from a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        video_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id, video_id }) => c.delete(`/shops/${shop_id}/listings/${listing_id}/videos/${video_id}`), { destructiveHint: true });
}
//# sourceMappingURL=listing_videos.js.map