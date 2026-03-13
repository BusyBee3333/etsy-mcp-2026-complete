"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_user_favorite_listings_list", "List a user's favorited listings", {
        user_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
    }, async ({ user_id, ...params }) => c.get(`/users/${user_id}/favorites/listings`, params), { readOnlyHint: true });
    server.tool("etsy_user_favorite_listing_get", "Check if a specific listing is in a user's favorites", {
        user_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ user_id, listing_id }) => c.get(`/users/${user_id}/favorites/listings/${listing_id}`), { readOnlyHint: true });
    server.tool("etsy_user_favorite_listing_add", "Add a listing to a user's favorites", {
        user_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ user_id, listing_id }) => c.post(`/users/${user_id}/favorites/listings/${listing_id}`));
    server.tool("etsy_user_favorite_listing_remove", "Remove a listing from a user's favorites", {
        user_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ user_id, listing_id }) => c.delete(`/users/${user_id}/favorites/listings/${listing_id}`), { destructiveHint: true });
}
//# sourceMappingURL=favorite_listings.js.map