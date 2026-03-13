"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_shop_icon_get", "Get the icon image for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
    }, async ({ shop_id }) => c.get(`/shops/${shop_id}/icon`), { readOnlyHint: true });
    server.tool("etsy_shop_icon_delete", "Delete the icon image for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
    }, async ({ shop_id }) => c.delete(`/shops/${shop_id}/icon`), { destructiveHint: true });
    server.tool("etsy_shop_banner_get", "Get banner image information for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
    }, async ({ shop_id }) => c.get(`/shops/${shop_id}/banner`), { readOnlyHint: true });
    server.tool("etsy_shop_banner_delete", "Delete the banner image for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
    }, async ({ shop_id }) => c.delete(`/shops/${shop_id}/banner`), { destructiveHint: true });
}
//# sourceMappingURL=shop_icon.js.map