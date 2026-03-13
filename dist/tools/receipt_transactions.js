"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_receipt_transactions_list", "List all transactions for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
    }, async ({ shop_id, ...params }) => c.get(`/shops/${shop_id}/transactions`, params), { readOnlyHint: true });
    server.tool("etsy_receipt_transaction_get", "Get a single transaction by ID", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        transaction_id: zod_1.z.number().int(),
    }, async ({ shop_id, transaction_id }) => c.get(`/shops/${shop_id}/transactions/${transaction_id}`), { readOnlyHint: true });
    server.tool("etsy_receipt_transactions_by_receipt", "List all transactions for a specific receipt", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        receipt_id: zod_1.z.number().int(),
    }, async ({ shop_id, receipt_id }) => c.get(`/shops/${shop_id}/receipts/${receipt_id}/transactions`), { readOnlyHint: true });
}
//# sourceMappingURL=receipt_transactions.js.map