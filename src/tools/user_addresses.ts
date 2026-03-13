import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_user_addresses_list",
    "List all addresses for a user",
    {
      user_id: z.union([z.number().int(), z.string()]),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
    },
    async ({ user_id, ...params }) =>
      c.get(`/users/${user_id}/addresses`, params),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_user_address_get",
    "Get a specific address for a user",
    {
      user_id: z.union([z.number().int(), z.string()]),
      user_address_id: z.number().int(),
    },
    async ({ user_id, user_address_id }) =>
      c.get(`/users/${user_id}/addresses/${user_address_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_user_address_delete",
    "Delete a user address",
    {
      user_id: z.union([z.number().int(), z.string()]),
      user_address_id: z.number().int(),
    },
    async ({ user_id, user_address_id }) =>
      c.delete(`/users/${user_id}/addresses/${user_address_id}`),
    { destructiveHint: true }
  );
}
