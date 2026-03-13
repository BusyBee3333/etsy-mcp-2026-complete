import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_user_favorite_shops_list",
    "List a user's favorited shops",
    {
      user_id: z.union([z.number().int(), z.string()]),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
    },
    async ({ user_id, ...params }) =>
      c.get(`/users/${user_id}/favorites/shops`, params),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_user_favorite_shop_get",
    "Check if a specific shop is in a user's favorites",
    {
      user_id: z.union([z.number().int(), z.string()]),
      shop_id: z.union([z.number().int(), z.string()]),
    },
    async ({ user_id, shop_id }) =>
      c.get(`/users/${user_id}/favorites/shops/${shop_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_user_favorite_shop_add",
    "Add a shop to a user's favorites",
    {
      user_id: z.union([z.number().int(), z.string()]),
      shop_id: z.union([z.number().int(), z.string()]),
    },
    async ({ user_id, shop_id }) =>
      c.post(`/users/${user_id}/favorites/shops/${shop_id}`)
  );

  server.tool(
    "etsy_user_favorite_shop_remove",
    "Remove a shop from a user's favorites",
    {
      user_id: z.union([z.number().int(), z.string()]),
      shop_id: z.union([z.number().int(), z.string()]),
    },
    async ({ user_id, shop_id }) =>
      c.delete(`/users/${user_id}/favorites/shops/${shop_id}`),
    { destructiveHint: true }
  );
}
