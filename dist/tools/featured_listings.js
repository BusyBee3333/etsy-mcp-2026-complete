"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_featured_listings_list", "List featured listings for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
    }, async ({ shop_id, ...params }) => c.get(`/shops/${shop_id}/listings/featured`, params), { readOnlyHint: true });
    server.tool("etsy_listing_set_featured_rank", "Set the featured rank for a listing (0 removes from featured)", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        featured_rank: zod_1.z.number().int().min(0).describe("0 = not featured, 1–4 = featured position"),
    }, async ({ shop_id, listing_id, featured_rank }) => c.patch(`/shops/${shop_id}/listings/${listing_id}`, { featured_rank }));
    server.tool("etsy_listing_feature", "Feature a listing at a specific rank in the shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        rank: zod_1.z.number().int().min(1).max(4).default(1),
    }, async ({ shop_id, listing_id, rank }) => c.patch(`/shops/${shop_id}/listings/${listing_id}`, { featured_rank: rank }));
    server.tool("etsy_listing_unfeature", "Remove a listing from the shop's featured listings", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id }) => c.patch(`/shops/${shop_id}/listings/${listing_id}`, { featured_rank: 0 }), { destructiveHint: true });
}
//# sourceMappingURL=featured_listings.js.map