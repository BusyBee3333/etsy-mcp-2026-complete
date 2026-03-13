"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_buyer_taxonomy_list", "List all buyer taxonomy nodes (categories for browsing/discovery)", {}, async () => c.get("/buyer-taxonomy/nodes"), { readOnlyHint: true });
    server.tool("etsy_buyer_taxonomy_node_get", "Get a specific buyer taxonomy node by ID", {
        taxonomy_id: zod_1.z.number().int(),
    }, async ({ taxonomy_id }) => c.get(`/buyer-taxonomy/nodes/${taxonomy_id}`), { readOnlyHint: true });
}
//# sourceMappingURL=buyer_taxonomy.js.map