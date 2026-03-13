"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_user_favorite_shops_list", "List a user's favorited shops", {
        user_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
    }, async ({ user_id, ...params }) => c.get(`/users/${user_id}/favorites/shops`, params), { readOnlyHint: true });
    server.tool("etsy_user_favorite_shop_get", "Check if a specific shop is in a user's favorites", {
        user_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
    }, async ({ user_id, shop_id }) => c.get(`/users/${user_id}/favorites/shops/${shop_id}`), { readOnlyHint: true });
    server.tool("etsy_user_favorite_shop_add", "Add a shop to a user's favorites", {
        user_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
    }, async ({ user_id, shop_id }) => c.post(`/users/${user_id}/favorites/shops/${shop_id}`));
    server.tool("etsy_user_favorite_shop_remove", "Remove a shop from a user's favorites", {
        user_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
    }, async ({ user_id, shop_id }) => c.delete(`/users/${user_id}/favorites/shops/${shop_id}`), { destructiveHint: true });
}
//# sourceMappingURL=favorite_shops.js.map