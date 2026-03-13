"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_listings_search", "Search all Etsy listings with full filter support", {
        keywords: zod_1.z.string().optional().describe("Search keywords"),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
        sort_on: zod_1.z.enum(["created", "price", "updated", "score"]).optional(),
        sort_order: zod_1.z.enum(["asc", "desc"]).optional(),
        min_price: zod_1.z.number().optional(),
        max_price: zod_1.z.number().optional(),
        taxonomy_id: zod_1.z.number().int().optional(),
        location: zod_1.z.string().optional().describe("Filter by seller location"),
        color: zod_1.z.string().optional().describe("Filter by color (hex or name)"),
        color_accuracy: zod_1.z.number().int().min(0).max(100).optional(),
        translate_keywords: zod_1.z.boolean().optional(),
        include_open_for_custom: zod_1.z.boolean().optional(),
        ship_to_location: zod_1.z.string().optional().describe("ISO country code"),
    }, async (params) => c.get("/listings/active", params), { readOnlyHint: true });
}
//# sourceMappingURL=listings_search.js.map