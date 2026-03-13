"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_shop_stats_get", "Get high-level stats for a shop (listing count, transaction count, review summary)", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
    }, async ({ shop_id }) => c.get(`/shops/${shop_id}`), { readOnlyHint: true });
    server.tool("etsy_shop_receipt_summary", "Get a summary of order/receipt counts by status for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        min_created: zod_1.z.number().int().optional().describe("Unix timestamp"),
        max_created: zod_1.z.number().int().optional().describe("Unix timestamp"),
    }, async ({ shop_id, ...params }) => c.get(`/shops/${shop_id}/receipts`, {
        ...params,
        limit: 1,
    }), { readOnlyHint: true });
    server.tool("etsy_shop_payment_summary", "Get payment account balance and summary for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
    }, async ({ shop_id }) => c.get(`/shops/${shop_id}/payment-account`), { readOnlyHint: true });
}
//# sourceMappingURL=shop_stats.js.map