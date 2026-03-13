"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_listing_drafts_list", "List all draft listings for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
    }, async ({ shop_id, ...params }) => c.get(`/shops/${shop_id}/listings/draft`, params), { readOnlyHint: true });
    server.tool("etsy_listing_draft_create", "Create a new draft listing (state=draft)", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        quantity: zod_1.z.number().int().min(1),
        title: zod_1.z.string().max(140),
        description: zod_1.z.string(),
        price: zod_1.z.number().positive(),
        who_made: zod_1.z.enum(["i_did", "someone_else", "collective"]),
        when_made: zod_1.z.string(),
        taxonomy_id: zod_1.z.number().int(),
        shipping_profile_id: zod_1.z.number().int().optional(),
        return_policy_id: zod_1.z.number().int().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        materials: zod_1.z.array(zod_1.z.string()).optional(),
        skus: zod_1.z.array(zod_1.z.string()).optional(),
    }, async ({ shop_id, ...body }) => c.post(`/shops/${shop_id}/listings`, { ...body, state: "draft" }));
    server.tool("etsy_listing_draft_publish", "Publish a draft listing by setting its state to active", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id }) => c.patch(`/shops/${shop_id}/listings/${listing_id}`, { state: "active" }));
}
//# sourceMappingURL=listing_drafts.js.map