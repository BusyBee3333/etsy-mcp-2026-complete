import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_buyer_taxonomy_list",
    "List all buyer taxonomy nodes (categories for browsing/discovery)",
    {},
    async () => c.get("/buyer-taxonomy/nodes"),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_buyer_taxonomy_node_get",
    "Get a specific buyer taxonomy node by ID",
    {
      taxonomy_id: z.number().int(),
    },
    async ({ taxonomy_id }) =>
      c.get(`/buyer-taxonomy/nodes/${taxonomy_id}`),
    { readOnlyHint: true }
  );
}
