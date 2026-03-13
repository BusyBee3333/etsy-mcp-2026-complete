"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_shipping_profile_destinations_list", "List all destinations for a shipping profile", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shipping_profile_id: zod_1.z.number().int(),
    }, async ({ shop_id, shipping_profile_id }) => c.get(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/destinations`), { readOnlyHint: true });
    server.tool("etsy_shipping_profile_destination_create", "Create a destination entry for a shipping profile", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shipping_profile_id: zod_1.z.number().int(),
        primary_cost: zod_1.z.number().nonnegative(),
        secondary_cost: zod_1.z.number().nonnegative(),
        destination_country_iso: zod_1.z.string().optional(),
        destination_region: zod_1.z.enum(["eu", "non_eu", "none"]).optional(),
        shipping_carrier_id: zod_1.z.number().int().optional(),
        mail_class: zod_1.z.string().optional(),
        min_delivery_days: zod_1.z.number().int().optional(),
        max_delivery_days: zod_1.z.number().int().optional(),
    }, async ({ shop_id, shipping_profile_id, ...body }) => c.post(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/destinations`, body));
    server.tool("etsy_shipping_profile_destination_update", "Update a destination for a shipping profile", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shipping_profile_id: zod_1.z.number().int(),
        shipping_profile_destination_id: zod_1.z.number().int(),
        primary_cost: zod_1.z.number().nonnegative().optional(),
        secondary_cost: zod_1.z.number().nonnegative().optional(),
        destination_country_iso: zod_1.z.string().optional(),
        destination_region: zod_1.z.enum(["eu", "non_eu", "none"]).optional(),
        shipping_carrier_id: zod_1.z.number().int().optional(),
        mail_class: zod_1.z.string().optional(),
        min_delivery_days: zod_1.z.number().int().optional(),
        max_delivery_days: zod_1.z.number().int().optional(),
    }, async ({ shop_id, shipping_profile_id, shipping_profile_destination_id, ...body }) => c.put(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/destinations/${shipping_profile_destination_id}`, body));
    server.tool("etsy_shipping_profile_destination_delete", "Delete a destination from a shipping profile", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shipping_profile_id: zod_1.z.number().int(),
        shipping_profile_destination_id: zod_1.z.number().int(),
    }, async ({ shop_id, shipping_profile_id, shipping_profile_destination_id }) => c.delete(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/destinations/${shipping_profile_destination_id}`), { destructiveHint: true });
}
//# sourceMappingURL=shop_shipping_profile_destinations.js.map