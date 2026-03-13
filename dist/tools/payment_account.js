"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_payment_account_get", "Get payment account info for a shop (balance, currency, etc.)", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
    }, async ({ shop_id }) => c.get(`/shops/${shop_id}/payment-account`), { readOnlyHint: true });
}
//# sourceMappingURL=payment_account.js.map