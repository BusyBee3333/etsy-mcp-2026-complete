import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  server.tool(
    "etsy_listing_translations_list",
    "List all translations for a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
    },
    async ({ shop_id, listing_id }) =>
      c.get(`/shops/${shop_id}/listings/${listing_id}/translations`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_translation_get",
    "Get a translation for a listing by language",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      language: z.string().describe("ISO 639-1 language code, e.g. 'fr', 'de'"),
    },
    async ({ shop_id, listing_id, language }) =>
      c.get(`/shops/${shop_id}/listings/${listing_id}/translations/${language}`),
    { readOnlyHint: true }
  );

  server.tool(
    "etsy_listing_translation_create",
    "Create a translation for a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      language: z.string().describe("ISO 639-1 language code"),
      title: z.string().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
    },
    async ({ shop_id, listing_id, language, ...body }) =>
      c.post(`/shops/${shop_id}/listings/${listing_id}/translations/${language}`, body)
  );

  server.tool(
    "etsy_listing_translation_update",
    "Update a translation for a listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      language: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
    },
    async ({ shop_id, listing_id, language, ...body }) =>
      c.patch(`/shops/${shop_id}/listings/${listing_id}/translations/${language}`, body)
  );
}
