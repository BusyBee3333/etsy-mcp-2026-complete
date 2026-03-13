"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_shop_return_policies_list", "List all return policies for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
    }, async ({ shop_id }) => c.get(`/shops/${shop_id}/policies/return`), { readOnlyHint: true });
    server.tool("etsy_shop_return_policy_get", "Get a specific return policy for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        return_policy_id: zod_1.z.number().int(),
    }, async ({ shop_id, return_policy_id }) => c.get(`/shops/${shop_id}/policies/return/${return_policy_id}`), { readOnlyHint: true });
    server.tool("etsy_shop_return_policy_create", "Create a new return policy for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        accepts_returns: zod_1.z.boolean(),
        accepts_exchanges: zod_1.z.boolean(),
        return_deadline: zod_1.z.number().int().optional().describe("Number of days for returns"),
    }, async ({ shop_id, ...body }) => c.post(`/shops/${shop_id}/policies/return`, body));
    server.tool("etsy_shop_return_policy_update", "Update a return policy for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        return_policy_id: zod_1.z.number().int(),
        accepts_returns: zod_1.z.boolean().optional(),
        accepts_exchanges: zod_1.z.boolean().optional(),
        return_deadline: zod_1.z.number().int().optional(),
    }, async ({ shop_id, return_policy_id, ...body }) => c.put(`/shops/${shop_id}/policies/return/${return_policy_id}`, body));
    server.tool("etsy_shop_return_policy_delete", "Delete a return policy from a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        return_policy_id: zod_1.z.number().int(),
    }, async ({ shop_id, return_policy_id }) => c.delete(`/shops/${shop_id}/policies/return/${return_policy_id}`), { destructiveHint: true });
}
//# sourceMappingURL=shop_return_policies.js.map