"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
const ProductSchema = zod_1.z.object({
    product_id: zod_1.z.number().int().optional(),
    sku: zod_1.z.string().optional(),
    is_deleted: zod_1.z.boolean().optional(),
    offerings: zod_1.z.array(zod_1.z.object({
        offering_id: zod_1.z.number().int().optional(),
        quantity: zod_1.z.number().int().min(0),
        is_enabled: zod_1.z.boolean(),
        price: zod_1.z.object({
            amount: zod_1.z.number().int(),
            divisor: zod_1.z.number().int(),
            currency_code: zod_1.z.string(),
        }),
    })),
    property_values: zod_1.z.array(zod_1.z.object({
        property_id: zod_1.z.number().int(),
        property_name: zod_1.z.string().optional(),
        scale_id: zod_1.z.number().int().nullable().optional(),
        scale_name: zod_1.z.string().nullable().optional(),
        value_ids: zod_1.z.array(zod_1.z.number().int()),
        values: zod_1.z.array(zod_1.z.string()),
    })).optional(),
});
function register(server) {
    const c = server.client;
    server.tool("etsy_listing_inventory_get", "Get the inventory/products for a listing (variations, prices, quantities, SKUs)", {
        listing_id: zod_1.z.number().int(),
        shows_scaling: zod_1.z.boolean().optional(),
    }, async ({ listing_id, ...params }) => c.get(`/listings/${listing_id}/inventory`, params), { readOnlyHint: true });
    server.tool("etsy_listing_inventory_update", "Update the inventory for a listing — set products, prices, quantities and SKUs", {
        listing_id: zod_1.z.number().int(),
        products: zod_1.z.array(ProductSchema).describe("Array of product variation objects"),
        price_on_property: zod_1.z.array(zod_1.z.number().int()).optional().describe("Property IDs that drive price"),
        quantity_on_property: zod_1.z.array(zod_1.z.number().int()).optional().describe("Property IDs that drive quantity"),
        sku_on_property: zod_1.z.array(zod_1.z.number().int()).optional().describe("Property IDs that drive SKU"),
    }, async ({ listing_id, ...body }) => c.put(`/listings/${listing_id}/inventory`, body));
}
//# sourceMappingURL=listing_inventory.js.map