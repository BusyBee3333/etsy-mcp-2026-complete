"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_shipping_carriers_list", "List available shipping carriers for a given origin country", {
        origin_country_iso: zod_1.z.string().describe("ISO 3166-1 alpha-2 country code, e.g. 'US', 'GB'"),
    }, async (params) => c.get("/shipping-carriers", params), { readOnlyHint: true });
}
//# sourceMappingURL=shipping_carriers.js.map