"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_shop_get", "Get a shop by ID or shop name", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]).describe("Shop ID or shop name"),
    }, async ({ shop_id }) => c.get(`/shops/${shop_id}`), { readOnlyHint: true });
    server.tool("etsy_shop_update", "Update a shop's profile information", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        title: zod_1.z.string().optional().describe("Shop banner title"),
        announcement: zod_1.z.string().optional(),
        sale_message: zod_1.z.string().optional(),
        digital_sale_message: zod_1.z.string().optional(),
        policy_welcome: zod_1.z.string().optional(),
        policy_payment: zod_1.z.string().optional(),
        policy_shipping: zod_1.z.string().optional(),
        policy_refunds: zod_1.z.string().optional(),
        policy_additional: zod_1.z.string().optional(),
        policy_seller_info: zod_1.z.string().optional(),
        vacation_is_on: zod_1.z.boolean().optional(),
        vacation_message: zod_1.z.string().optional(),
    }, async ({ shop_id, ...body }) => c.put(`/shops/${shop_id}`, body));
    server.tool("etsy_shops_by_owner", "Get all shops owned by a specific user", {
        user_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]).describe("User ID or login name"),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
    }, async ({ user_id, ...params }) => c.get(`/users/${user_id}/shops`, params), { readOnlyHint: true });
    server.tool("etsy_shop_find", "Search for shops by name keyword", {
        shop_name: zod_1.z.string().describe("Shop name keyword to search"),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
    }, async (params) => c.get("/shops", params), { readOnlyHint: true });
}
//# sourceMappingURL=shops.js.map