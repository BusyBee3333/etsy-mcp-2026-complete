"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_shop_sections_list", "List all sections in a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
    }, async ({ shop_id }) => c.get(`/shops/${shop_id}/sections`), { readOnlyHint: true });
    server.tool("etsy_shop_section_get", "Get a specific section in a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shop_section_id: zod_1.z.number().int(),
    }, async ({ shop_id, shop_section_id }) => c.get(`/shops/${shop_id}/sections/${shop_section_id}`), { readOnlyHint: true });
    server.tool("etsy_shop_section_create", "Create a new section in a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        title: zod_1.z.string().max(24).describe("Section title (max 24 chars)"),
    }, async ({ shop_id, title }) => c.post(`/shops/${shop_id}/sections`, { title }));
    server.tool("etsy_shop_section_update", "Update a shop section", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shop_section_id: zod_1.z.number().int(),
        title: zod_1.z.string().max(24).optional(),
    }, async ({ shop_id, shop_section_id, ...body }) => c.put(`/shops/${shop_id}/sections/${shop_section_id}`, body));
    server.tool("etsy_shop_section_delete", "Delete a section from a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        shop_section_id: zod_1.z.number().int(),
    }, async ({ shop_id, shop_section_id }) => c.delete(`/shops/${shop_id}/sections/${shop_section_id}`), { destructiveHint: true });
}
//# sourceMappingURL=shop_sections.js.map