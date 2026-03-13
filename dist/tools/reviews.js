"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_shop_reviews_list", "List reviews for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
        min_created: zod_1.z.number().int().optional().describe("Unix timestamp"),
        max_created: zod_1.z.number().int().optional().describe("Unix timestamp"),
    }, async ({ shop_id, ...params }) => c.get(`/shops/${shop_id}/reviews`, params), { readOnlyHint: true });
    server.tool("etsy_listing_reviews_list", "List reviews for a specific listing", {
        listing_id: zod_1.z.number().int(),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
    }, async ({ listing_id, ...params }) => c.get(`/listings/${listing_id}/reviews`, params), { readOnlyHint: true });
}
//# sourceMappingURL=reviews.js.map