"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_receipts_list", "List all receipts (orders) for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
        was_paid: zod_1.z.boolean().optional(),
        was_shipped: zod_1.z.boolean().optional(),
        was_delivered: zod_1.z.boolean().optional(),
        was_canceled: zod_1.z.boolean().optional(),
        sort_on: zod_1.z.enum(["created", "updated", "receipt_id"]).optional(),
        sort_order: zod_1.z.enum(["asc", "desc"]).optional(),
        min_created: zod_1.z.number().int().optional().describe("Unix timestamp"),
        max_created: zod_1.z.number().int().optional().describe("Unix timestamp"),
        min_last_modified: zod_1.z.number().int().optional(),
        max_last_modified: zod_1.z.number().int().optional(),
    }, async ({ shop_id, ...params }) => c.get(`/shops/${shop_id}/receipts`, params), { readOnlyHint: true });
    server.tool("etsy_receipt_get", "Get a single receipt by ID", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        receipt_id: zod_1.z.number().int(),
    }, async ({ shop_id, receipt_id }) => c.get(`/shops/${shop_id}/receipts/${receipt_id}`), { readOnlyHint: true });
    server.tool("etsy_receipt_update", "Update a receipt — mark as shipped, add a seller note, etc.", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        receipt_id: zod_1.z.number().int(),
        was_shipped: zod_1.z.boolean().optional(),
        was_paid: zod_1.z.boolean().optional(),
        message_from_seller: zod_1.z.string().optional(),
    }, async ({ shop_id, receipt_id, ...body }) => c.put(`/shops/${shop_id}/receipts/${receipt_id}`, body));
}
//# sourceMappingURL=receipts.js.map