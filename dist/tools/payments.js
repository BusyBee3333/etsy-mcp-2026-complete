"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_payments_list", "List all payments for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
    }, async ({ shop_id, ...params }) => c.get(`/shops/${shop_id}/payments`, params), { readOnlyHint: true });
    server.tool("etsy_payment_get", "Get a specific payment by ID", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        payment_id: zod_1.z.number().int(),
    }, async ({ shop_id, payment_id }) => c.get(`/shops/${shop_id}/payments/${payment_id}`), { readOnlyHint: true });
    server.tool("etsy_payments_by_receipt", "Get payments associated with a specific receipt", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        receipt_id: zod_1.z.number().int(),
    }, async ({ shop_id, receipt_id }) => c.get(`/shops/${shop_id}/receipts/${receipt_id}/payments`), { readOnlyHint: true });
}
//# sourceMappingURL=payments.js.map