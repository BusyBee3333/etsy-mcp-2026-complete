"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_listing_image_upload_url", "Upload a listing image from a public URL with rank and alt text management", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        image_url: zod_1.z.string().url().describe("Publicly accessible URL for the image"),
        rank: zod_1.z.number().int().min(1).max(10).default(1).describe("Display rank (1 = primary)"),
        overwrite: zod_1.z.boolean().optional().describe("Replace existing image at this rank"),
        alt_text: zod_1.z.string().max(250).optional().describe("Accessibility alt text"),
        is_watermarked: zod_1.z.boolean().optional(),
    }, async ({ shop_id, listing_id, ...body }) => c.post(`/shops/${shop_id}/listings/${listing_id}/images`, body));
    server.tool("etsy_listing_image_set_rank", "Change the rank (display order) of an existing listing image", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        listing_image_id: zod_1.z.number().int(),
        rank: zod_1.z.number().int().min(1).max(10),
    }, async ({ shop_id, listing_id, listing_image_id, rank }) => c.put(`/shops/${shop_id}/listings/${listing_id}/images/${listing_image_id}`, { rank }));
    server.tool("etsy_listing_image_update_alt", "Update the alt text for a listing image", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        listing_image_id: zod_1.z.number().int(),
        alt_text: zod_1.z.string().max(250),
    }, async ({ shop_id, listing_id, listing_image_id, alt_text }) => c.put(`/shops/${shop_id}/listings/${listing_id}/images/${listing_image_id}`, { alt_text }));
}
//# sourceMappingURL=listing_image_upload.js.map