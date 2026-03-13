"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_payment_ledger_entries_list", "List financial ledger entries for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
        min_created: zod_1.z.number().int().optional().describe("Unix timestamp"),
        max_created: zod_1.z.number().int().optional().describe("Unix timestamp"),
    }, async ({ shop_id, ...params }) => c.get(`/shops/${shop_id}/payment-account/ledger-entries`, params), { readOnlyHint: true });
    server.tool("etsy_payment_ledger_entry_get", "Get a specific ledger entry", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        ledger_entry_id: zod_1.z.number().int(),
    }, async ({ shop_id, ledger_entry_id }) => c.get(`/shops/${shop_id}/payment-account/ledger-entries/${ledger_entry_id}`), { readOnlyHint: true });
}
//# sourceMappingURL=payment_ledger.js.map