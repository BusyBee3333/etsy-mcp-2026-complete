"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_listing_variation_images_get", "Get variation images (images linked to specific product variations) for a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id }) => c.get(`/shops/${shop_id}/listings/${listing_id}/variation-images`), { readOnlyHint: true });
    server.tool("etsy_listing_variation_images_update", "Update (associate) variation images for a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        variation_images: zod_1.z.array(zod_1.z.object({
            property_id: zod_1.z.number().int(),
            value_id: zod_1.z.number().int(),
            image_id: zod_1.z.number().int(),
        })).describe("Array mapping property value IDs to image IDs"),
    }, async ({ shop_id, listing_id, variation_images }) => c.post(`/shops/${shop_id}/listings/${listing_id}/variation-images`, {
        variation_images,
    }));
}
//# sourceMappingURL=listing_variations.js.map