"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_shop_production_partners_list", "List all production partners for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
    }, async ({ shop_id }) => c.get(`/shops/${shop_id}/production-partners`), { readOnlyHint: true });
    server.tool("etsy_shop_production_partner_create", "Create a new production partner for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        partner_name: zod_1.z.string().describe("Name of the production partner"),
        location: zod_1.z.string().describe("City/region where partner is located"),
        is_unlisted: zod_1.z.boolean().optional().describe("Whether the partner is unlisted"),
    }, async ({ shop_id, ...body }) => c.post(`/shops/${shop_id}/production-partners`, body));
    server.tool("etsy_shop_production_partner_update", "Update a production partner for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        production_partner_id: zod_1.z.number().int(),
        partner_name: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        is_unlisted: zod_1.z.boolean().optional(),
    }, async ({ shop_id, production_partner_id, ...body }) => c.patch(`/shops/${shop_id}/production-partners/${production_partner_id}`, body));
    server.tool("etsy_shop_production_partner_delete", "Delete a production partner from a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        production_partner_id: zod_1.z.number().int(),
    }, async ({ shop_id, production_partner_id }) => c.delete(`/shops/${shop_id}/production-partners/${production_partner_id}`), { destructiveHint: true });
}
//# sourceMappingURL=shop_production_partners.js.map