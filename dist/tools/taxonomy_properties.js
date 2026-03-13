"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_taxonomy_properties_get", "Get all available properties (attributes) for a specific taxonomy node", {
        taxonomy_id: zod_1.z.number().int().describe("Taxonomy node ID"),
    }, async ({ taxonomy_id }) => c.get(`/seller-taxonomy/nodes/${taxonomy_id}/properties`), { readOnlyHint: true });
    server.tool("etsy_taxonomy_property_scales", "Get scales for a taxonomy property (e.g. weight units, dimension units)", {
        taxonomy_id: zod_1.z.number().int(),
        scale_id: zod_1.z.number().int().optional().describe("Filter to a specific scale"),
    }, async ({ taxonomy_id, ...params }) => c.get(`/seller-taxonomy/nodes/${taxonomy_id}/properties`, params), { readOnlyHint: true });
}
//# sourceMappingURL=taxonomy_properties.js.map