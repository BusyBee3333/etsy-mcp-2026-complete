"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_shop_receipt_transactions_list", "List all transactions for a specific receipt in a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        receipt_id: zod_1.z.number().int(),
    }, async ({ shop_id, receipt_id }) => c.get(`/shops/${shop_id}/receipts/${receipt_id}/transactions`), { readOnlyHint: true });
    server.tool("etsy_shop_listing_transactions_list", "List transactions for a specific listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id }) => c.get(`/shops/${shop_id}/listings/${listing_id}/transactions`), { readOnlyHint: true });
}
//# sourceMappingURL=shop_receipt_transactions.js.map