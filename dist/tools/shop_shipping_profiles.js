"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_shop_shipping_profiles_list", "List all shipping profiles for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
    }, async ({ shop_id }) => c.get(`/shops/${shop_id}/shipping-profiles`), { readOnlyHint: true });
    server.tool("etsy_shop_shipping_profile_get", "Get a specific shipping profile", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shipping_profile_id: zod_1.z.number().int(),
    }, async ({ shop_id, shipping_profile_id }) => c.get(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}`), { readOnlyHint: true });
    server.tool("etsy_shop_shipping_profile_create", "Create a shipping profile for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        title: zod_1.z.string().describe("Profile name"),
        origin_country_iso: zod_1.z.string().describe("ISO country code of ship-from location"),
        primary_cost: zod_1.z.number().nonnegative().describe("Primary shipping cost"),
        secondary_cost: zod_1.z.number().nonnegative().describe("Additional item shipping cost"),
        min_processing_time: zod_1.z.number().int().min(1),
        max_processing_time: zod_1.z.number().int().min(1),
        processing_time_unit: zod_1.z.enum(["business_days", "weeks"]).optional(),
        destination_country_iso: zod_1.z.string().optional(),
        destination_region: zod_1.z.enum(["eu", "non_eu", "none"]).optional(),
        origin_postal_code: zod_1.z.string().optional(),
        shipping_carrier_id: zod_1.z.number().int().optional(),
        mail_class: zod_1.z.string().optional(),
        min_delivery_days: zod_1.z.number().int().optional(),
        max_delivery_days: zod_1.z.number().int().optional(),
    }, async ({ shop_id, ...body }) => c.post(`/shops/${shop_id}/shipping-profiles`, body));
    server.tool("etsy_shop_shipping_profile_update", "Update a shipping profile", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shipping_profile_id: zod_1.z.number().int(),
        title: zod_1.z.string().optional(),
        origin_country_iso: zod_1.z.string().optional(),
        primary_cost: zod_1.z.number().nonnegative().optional(),
        secondary_cost: zod_1.z.number().nonnegative().optional(),
        min_processing_time: zod_1.z.number().int().optional(),
        max_processing_time: zod_1.z.number().int().optional(),
        processing_time_unit: zod_1.z.enum(["business_days", "weeks"]).optional(),
        destination_country_iso: zod_1.z.string().optional(),
        origin_postal_code: zod_1.z.string().optional(),
    }, async ({ shop_id, shipping_profile_id, ...body }) => c.put(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}`, body));
    server.tool("etsy_shop_shipping_profile_delete", "Delete a shipping profile from a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shipping_profile_id: zod_1.z.number().int(),
    }, async ({ shop_id, shipping_profile_id }) => c.delete(`/shops/${shop_id}/shipping-profiles/${shipping_profile_id}`), { destructiveHint: true });
}
//# sourceMappingURL=shop_shipping_profiles.js.map