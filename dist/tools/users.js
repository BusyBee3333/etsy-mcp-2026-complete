"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_user_get", "Get a user by ID", {
        user_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]).describe("User ID or login name"),
    }, async ({ user_id }) => c.get(`/users/${user_id}`), { readOnlyHint: true });
    server.tool("etsy_user_me", "Get the currently authenticated user", {}, async () => c.get("/users/me"), { readOnlyHint: true });
}
//# sourceMappingURL=users.js.map