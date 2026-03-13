"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_listing_properties_list", "List all properties/attributes set on a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id }) => c.get(`/shops/${shop_id}/listings/${listing_id}/properties`), { readOnlyHint: true });
    server.tool("etsy_listing_property_get", "Get a specific property for a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        property_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id, property_id }) => c.get(`/shops/${shop_id}/listings/${listing_id}/properties/${property_id}`), { readOnlyHint: true });
    server.tool("etsy_listing_property_update", "Update a property/attribute on a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        property_id: zod_1.z.number().int(),
        value_ids: zod_1.z.array(zod_1.z.number().int()),
        values: zod_1.z.array(zod_1.z.string()),
        scale_id: zod_1.z.number().int().optional(),
    }, async ({ shop_id, listing_id, property_id, ...body }) => c.put(`/shops/${shop_id}/listings/${listing_id}/properties/${property_id}`, body));
    server.tool("etsy_listing_property_delete", "Delete a property from a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        property_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id, property_id }) => c.delete(`/shops/${shop_id}/listings/${listing_id}/properties/${property_id}`), { destructiveHint: true });
}
//# sourceMappingURL=listing_properties.js.map