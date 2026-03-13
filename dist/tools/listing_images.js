"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_listing_images_list", "List all images for a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id }) => c.get(`/shops/${shop_id}/listings/${listing_id}/images`), { readOnlyHint: true });
    server.tool("etsy_listing_image_get", "Get a specific image for a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        listing_image_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id, listing_image_id }) => c.get(`/shops/${shop_id}/listings/${listing_id}/images/${listing_image_id}`), { readOnlyHint: true });
    server.tool("etsy_listing_image_delete", "Delete an image from a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        listing_image_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id, listing_image_id }) => c.delete(`/shops/${shop_id}/listings/${listing_id}/images/${listing_image_id}`), { destructiveHint: true });
    server.tool("etsy_listing_image_upload", "Upload an image to a listing via URL or base64. Rank 1 is the primary image.", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        image_url: zod_1.z.string().url().optional().describe("Publicly accessible image URL"),
        rank: zod_1.z.number().int().min(1).max(10).optional().describe("Image display rank (1 = primary)"),
        overwrite: zod_1.z.boolean().optional().describe("Overwrite existing image at this rank"),
        alt_text: zod_1.z.string().max(250).optional().describe("Alt text for accessibility"),
        is_watermarked: zod_1.z.boolean().optional(),
    }, async ({ shop_id, listing_id, ...body }) => c.post(`/shops/${shop_id}/listings/${listing_id}/images`, body));
    server.tool("etsy_listing_images_reorder", "Reorder images for a listing by providing an ordered array of listing_image_ids", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        listing_image_ids: zod_1.z.array(zod_1.z.number().int()).describe("Image IDs in desired display order"),
    }, async ({ shop_id, listing_id, listing_image_ids }) => c.post(`/shops/${shop_id}/listings/${listing_id}/images/reorder`, {
        listing_image_ids,
    }));
}
//# sourceMappingURL=listing_images.js.map