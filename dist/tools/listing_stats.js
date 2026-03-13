"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_listing_stats_get", "Get stats (views, favorites) for a specific listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id }) => c.get(`/shops/${shop_id}/listings/${listing_id}`, {
        includes: ["Stats"],
    }), { readOnlyHint: true });
    server.tool("etsy_listing_views_get", "Get view count for a listing", {
        listing_id: zod_1.z.number().int(),
    }, async ({ listing_id }) => c.get(`/listings/${listing_id}`, { includes: ["Stats"] }), { readOnlyHint: true });
    server.tool("etsy_listings_stats_bulk", "Get stats for multiple listings at once", {
        listing_ids: zod_1.z.array(zod_1.z.number().int()).describe("Listing IDs to fetch stats for"),
    }, async ({ listing_ids }) => c.get("/listings/batch", { listing_ids, includes: ["Stats"] }), { readOnlyHint: true });
}
//# sourceMappingURL=listing_stats.js.map