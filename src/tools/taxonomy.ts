import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_taxonomy_seller_list",
    "List all seller taxonomy nodes (categories for listings)",
    {},
    async () => c.get("/seller-taxonomy/nodes"),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_taxonomy_node_get",
    "Get a specific taxonomy node by ID",
    {
      taxonomy_id: z.number().int(),
    },
    async ({ taxonomy_id }) =>
      c.get(`/seller-taxonomy/nodes/${taxonomy_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_taxonomy_properties_list",
    "List all properties for a taxonomy node",
    {
      taxonomy_id: z.number().int(),
    },
    async ({ taxonomy_id }) =>
      c.get(`/seller-taxonomy/nodes/${taxonomy_id}/properties`),
    { readOnlyHint: true }
  );
}
