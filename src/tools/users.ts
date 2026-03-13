import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_user_get",
    "Get a user by ID",
    {
      user_id: z.union([z.number().int(), z.string()]).describe("User ID or login name"),
    },
    async ({ user_id }) => c.get(`/users/${user_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_user_me",
    "Get the currently authenticated user",
    {},
    async () => c.get("/users/me"),
    { readOnlyHint: true }
  );
}
