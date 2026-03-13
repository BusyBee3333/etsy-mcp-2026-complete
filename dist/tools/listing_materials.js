"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_listing_materials_get", "Get all materials listed on a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id }) => {
        const listing = await c.get(`/shops/${shop_id}/listings/${listing_id}`);
        return { materials: listing.materials ?? [] };
    }, { readOnlyHint: true });
    server.tool("etsy_listing_materials_update", "Replace all materials on a listing (max 13)", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        materials: zod_1.z.array(zod_1.z.string().max(45)).max(13).describe("Array of material strings"),
    }, async ({ shop_id, listing_id, materials }) => c.patch(`/shops/${shop_id}/listings/${listing_id}`, { materials }));
    server.tool("etsy_listing_materials_add", "Add materials to a listing (merges with existing)", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        new_materials: zod_1.z.array(zod_1.z.string().max(45)).describe("Materials to add"),
    }, async ({ shop_id, listing_id, new_materials }) => {
        const listing = await c.get(`/shops/${shop_id}/listings/${listing_id}`);
        const existing = listing.materials ?? [];
        const merged = Array.from(new Set([...existing, ...new_materials])).slice(0, 13);
        return c.patch(`/shops/${shop_id}/listings/${listing_id}`, { materials: merged });
    });
}
//# sourceMappingURL=listing_materials.js.map