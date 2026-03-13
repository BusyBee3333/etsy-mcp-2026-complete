"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_shop_listings_search", "Search listings within a specific shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        keywords: zod_1.z.string().optional(),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
        sort_on: zod_1.z.enum(["created", "price", "updated", "score"]).optional(),
        sort_order: zod_1.z.enum(["asc", "desc"]).optional(),
        min_price: zod_1.z.number().optional(),
        max_price: zod_1.z.number().optional(),
        includes: zod_1.z.array(zod_1.z.string()).optional(),
    }, async ({ shop_id, ...params }) => c.get(`/shops/${shop_id}/listings/active`, params), { readOnlyHint: true });
    server.tool("etsy_shop_listings_by_section", "List listings within a specific shop section", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shop_section_id: zod_1.z.number().int(),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
    }, async ({ shop_id, ...params }) => c.get(`/shops/${shop_id}/listings/active`, params), { readOnlyHint: true });
}
//# sourceMappingURL=shop_listings_search.js.map