"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_shipping_profile_upgrades_list", "List all upgrades for a shipping profile", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shipping_profile_id: zod_1.z.number().int(),
    }, async ({ shop_id, shipping_profile_id }) => c.get(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/upgrades`), { readOnlyHint: true });
    server.tool("etsy_shipping_profile_upgrade_create", "Create a shipping upgrade for a profile", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shipping_profile_id: zod_1.z.number().int(),
        type: zod_1.z.enum(["0", "1"]).describe("0 = 'accept only one', 1 = 'let buyer pick'"),
        name: zod_1.z.string().describe("Upgrade name shown to buyers"),
        price: zod_1.z.number().nonnegative(),
        secondary_price: zod_1.z.number().nonnegative(),
        shipping_carrier_id: zod_1.z.number().int().optional(),
        mail_class: zod_1.z.string().optional(),
        min_delivery_days: zod_1.z.number().int().optional(),
        max_delivery_days: zod_1.z.number().int().optional(),
    }, async ({ shop_id, shipping_profile_id, ...body }) => c.post(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/upgrades`, body));
    server.tool("etsy_shipping_profile_upgrade_update", "Update a shipping upgrade", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shipping_profile_id: zod_1.z.number().int(),
        upgrade_id: zod_1.z.number().int(),
        name: zod_1.z.string().optional(),
        price: zod_1.z.number().nonnegative().optional(),
        secondary_price: zod_1.z.number().nonnegative().optional(),
        shipping_carrier_id: zod_1.z.number().int().optional(),
        mail_class: zod_1.z.string().optional(),
        min_delivery_days: zod_1.z.number().int().optional(),
        max_delivery_days: zod_1.z.number().int().optional(),
    }, async ({ shop_id, shipping_profile_id, upgrade_id, ...body }) => c.put(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/upgrades/${upgrade_id}`, body));
    server.tool("etsy_shipping_profile_upgrade_delete", "Delete a shipping upgrade from a profile", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shipping_profile_id: zod_1.z.number().int(),
        upgrade_id: zod_1.z.number().int(),
    }, async ({ shop_id, shipping_profile_id, upgrade_id }) => c.delete(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/upgrades/${upgrade_id}`), { destructiveHint: true });
}
//# sourceMappingURL=shop_shipping_profile_upgrades.js.map