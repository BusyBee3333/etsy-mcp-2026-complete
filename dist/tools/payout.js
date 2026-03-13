"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_payouts_list", "List all payouts for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
        sort_order: zod_1.z.enum(["asc", "desc"]).optional(),
        min_created: zod_1.z.number().int().optional(),
        max_created: zod_1.z.number().int().optional(),
    }, async ({ shop_id, ...params }) => c.get(`/shops/${shop_id}/payment-account/payouts`, params), { readOnlyHint: true });
    server.tool("etsy_payout_get", "Get a specific payout by ID", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        payout_id: zod_1.z.number().int(),
    }, async ({ shop_id, payout_id }) => c.get(`/shops/${shop_id}/payment-account/payouts/${payout_id}`), { readOnlyHint: true });
}
//# sourceMappingURL=payout.js.map