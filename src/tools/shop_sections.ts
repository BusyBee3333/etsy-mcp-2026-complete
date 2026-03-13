import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_shop_sections_list",
    "List all sections in a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
    },
    async ({ shop_id }) => c.get(`/shops/${shop_id}/sections`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_shop_section_get",
    "Get a specific section in a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shop_section_id: z.number().int(),
    },
    async ({ shop_id, shop_section_id }) =>
      c.get(`/shops/${shop_id}/sections/${shop_section_id}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_shop_section_create",
    "Create a new section in a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      title: z.string().max(24).describe("Section title (max 24 chars)"),
    },
    async ({ shop_id, title }) =>
      c.post(`/shops/${shop_id}/sections`, { title })
  );

  server.tool(
    "etsy_shop_section_update",
    "Update a shop section",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shop_section_id: z.number().int(),
      title: z.string().max(24).optional(),
    },
    async ({ shop_id, shop_section_id, ...body }) =>
      c.put(`/shops/${shop_id}/sections/${shop_section_id}`, body)
  );

  server.tool(
    "etsy_shop_section_delete",
    "Delete a section from a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      shop_section_id: z.number().int(),
    },
    async ({ shop_id, shop_section_id }) =>
      c.delete(`/shops/${shop_id}/sections/${shop_section_id}`),
    { destructiveHint: true }
  );
}
