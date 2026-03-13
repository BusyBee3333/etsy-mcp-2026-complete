"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_receipt_shipments_list", "List all shipments for a receipt", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        receipt_id: zod_1.z.number().int(),
    }, async ({ shop_id, receipt_id }) => c.get(`/shops/${shop_id}/receipts/${receipt_id}/tracking`), { readOnlyHint: true });
    server.tool("etsy_receipt_shipment_create", "Create a shipment / add tracking to a receipt", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        receipt_id: zod_1.z.number().int(),
        tracking_code: zod_1.z.string().optional().describe("Carrier tracking code"),
        carrier_name: zod_1.z.string().optional().describe("Shipping carrier name"),
        send_bcc: zod_1.z.boolean().optional().describe("Send tracking to buyer"),
        note_to_buyer: zod_1.z.string().optional(),
    }, async ({ shop_id, receipt_id, ...body }) => c.post(`/shops/${shop_id}/receipts/${receipt_id}/tracking`, body));
}
//# sourceMappingURL=receipt_shipments.js.map