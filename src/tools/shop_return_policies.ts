import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_shop_return_policies_list",
    "List all return policies for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
    },
    async ({ shop_id }) => c.get(`/shops/${shop_id}/policies/return`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_shop_return_policy_get",
    "Get a specific return policy for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      return_policy_id: z.number().int(),
    },
    async ({ shop_id, return_policy_id }) =>
      c.get(`/shops/${shop_id}/policies/return/${return_policy_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_shop_return_policy_create",
    "Create a new return policy for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      accepts_returns: z.boolean(),
      accepts_exchanges: z.boolean(),
      return_deadline: z.number().int().optional().describe("Number of days for returns"),
    },
    async ({ shop_id, ...body }) =>
      c.post(`/shops/${shop_id}/policies/return`, body)
  );

  server.tool(
    "etsy_shop_return_policy_update",
    "Update a return policy for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      return_policy_id: z.number().int(),
      accepts_returns: z.boolean().optional(),
      accepts_exchanges: z.boolean().optional(),
      return_deadline: z.number().int().optional(),
    },
    async ({ shop_id, return_policy_id, ...body }) =>
      c.put(`/shops/${shop_id}/policies/return/${return_policy_id}`, body)
  );

  server.tool(
    "etsy_shop_return_policy_delete",
    "Delete a return policy from a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      return_policy_id: z.number().int(),
    },
    async ({ shop_id, return_policy_id }) =>
      c.delete(`/shops/${shop_id}/policies/return/${return_policy_id}`),
    { destructiveHint: true }
  );
}
