"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_listing_tags_get", "Get all tags for a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id }) => {
        const listing = await c.get(`/shops/${shop_id}/listings/${listing_id}`);
        return { tags: listing.tags ?? [] };
    }, { readOnlyHint: true });
    server.tool("etsy_listing_tags_update", "Replace all tags on a listing (max 13 tags, each max 20 chars)", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        tags: zod_1.z.array(zod_1.z.string().max(20)).max(13).describe("Array of tags (max 13)"),
    }, async ({ shop_id, listing_id, tags }) => c.patch(`/shops/${shop_id}/listings/${listing_id}`, { tags }));
    server.tool("etsy_listing_tags_add", "Add tags to a listing (fetches current tags, merges, updates)", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        new_tags: zod_1.z.array(zod_1.z.string().max(20)).describe("Tags to add"),
    }, async ({ shop_id, listing_id, new_tags }) => {
        const listing = await c.get(`/shops/${shop_id}/listings/${listing_id}`);
        const existing = listing.tags ?? [];
        const merged = Array.from(new Set([...existing, ...new_tags])).slice(0, 13);
        return c.patch(`/shops/${shop_id}/listings/${listing_id}`, { tags: merged });
    });
}
//# sourceMappingURL=listing_tags.js.map