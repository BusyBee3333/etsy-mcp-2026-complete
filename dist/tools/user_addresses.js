"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_user_addresses_list", "List all addresses for a user", {
        user_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
    }, async ({ user_id, ...params }) => c.get(`/users/${user_id}/addresses`, params), { readOnlyHint: true });
    server.tool("etsy_user_address_get", "Get a specific address for a user", {
        user_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        user_address_id: zod_1.z.number().int(),
    }, async ({ user_id, user_address_id }) => c.get(`/users/${user_id}/addresses/${user_address_id}`), { readOnlyHint: true });
    server.tool("etsy_user_address_delete", "Delete a user address", {
        user_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        user_address_id: zod_1.z.number().int(),
    }, async ({ user_id, user_address_id }) => c.delete(`/users/${user_id}/addresses/${user_address_id}`), { destructiveHint: true });
}
//# sourceMappingURL=user_addresses.js.map