import { z } from "zod";
import type { EtsyMCPServer } from "../server.js";

export function register(server: EtsyMCPServer): void {
  const c = server.client;

  // ── List featured/active listings ──────────────────────────────────────────
  server.tool(
    "etsy_listings_list",
    "List active Etsy listings with optional filters",
    {
      limit: z.number().int().min(1).max(100).optional().describe("Number of results (max 100)"),
      offset: z.number().int().min(0).optional().describe("Pagination offset"),
      keywords: z.string().optional().describe("Search keywords"),
      sort_on: z.enum(["created", "price", "updated", "score"]).optional(),
      sort_order: z.enum(["asc", "desc"]).optional(),
      min_price: z.number().optional(),
      max_price: z.number().optional(),
      taxonomy_id: z.number().int().optional(),
    },
    async (args) => c.get("/listings/active", args),
    { readOnlyHint: true }
  );

  // ── Get a single listing ────────────────────────────────────────────────────
  server.tool(
    "etsy_listing_get",
    "Get a single Etsy listing by ID",
    {
      listing_id: z.number().int().describe("The listing ID"),
      includes: z.array(z.string()).optional().describe("Additional fields to include (Images, Shop, User, etc.)"),
    },
    async ({ listing_id, includes }) =>
      c.get(`/listings/${listing_id}`, includes ? { includes } : undefined),
    { readOnlyHint: true }
  );

  // ── Get multiple listings by IDs ─────────────────────────────────────────
  server.tool(
    "etsy_listings_get_by_ids",
    "Get multiple Etsy listings by an array of listing IDs",
    {
      listing_ids: z.array(z.number().int()).describe("Array of listing IDs"),
      includes: z.array(z.string()).optional(),
    },
    async ({ listing_ids, includes }) =>
      c.get("/listings/batch", { listing_ids, includes }),
    { readOnlyHint: true }
  );

  // ── List by shop ────────────────────────────────────────────────────────────
  server.tool(
    "etsy_listings_list_by_shop",
    "List all listings belonging to a specific shop",
    {
      shop_id: z.union([z.number().int(), z.string()]).describe("Shop ID or shop name"),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
      state: z.enum(["active", "inactive", "sold_out", "draft", "expired"]).optional(),
      includes: z.array(z.string()).optional(),
      sort_on: z.enum(["created", "price", "updated", "score"]).optional(),
      sort_order: z.enum(["asc", "desc"]).optional(),
    },
    async ({ shop_id, ...params }) =>
      c.get(`/shops/${shop_id}/listings`, params),
    { readOnlyHint: true }
  );

  // ── Create listing ──────────────────────────────────────────────────────────
  server.tool(
    "etsy_listing_create",
    "Create a new listing in a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      quantity: z.number().int().min(1).describe("Available quantity"),
      title: z.string().max(140).describe("Listing title"),
      description: z.string().describe("Listing description"),
      price: z.number().positive().describe("Price in shop currency"),
      who_made: z.enum(["i_did", "someone_else", "collective"]),
      when_made: z.string().describe("e.g. 2020_2024, before_2000, etc."),
      taxonomy_id: z.number().int().describe("Etsy taxonomy/category ID"),
      shipping_profile_id: z.number().int().optional(),
      return_policy_id: z.number().int().optional(),
      materials: z.array(z.string()).optional(),
      shop_section_id: z.number().int().optional(),
      processing_min: z.number().int().optional(),
      processing_max: z.number().int().optional(),
      tags: z.array(z.string()).optional(),
      styles: z.array(z.string()).optional(),
      item_weight: z.number().optional(),
      item_weight_unit: z.enum(["oz", "lb", "g", "kg"]).optional(),
      item_length: z.number().optional(),
      item_width: z.number().optional(),
      item_height: z.number().optional(),
      item_dimensions_unit: z.enum(["in", "ft", "mm", "cm", "m", "yd", "inches"]).optional(),
      is_personalizable: z.boolean().optional(),
      personalization_is_required: z.boolean().optional(),
      personalization_char_count_max: z.number().int().optional(),
      personalization_instructions: z.string().optional(),
      production_partner_ids: z.array(z.number().int()).optional(),
      skus: z.array(z.string()).optional(),
      is_supply: z.boolean().optional(),
      is_customizable: z.boolean().optional(),
      should_auto_renew: z.boolean().optional(),
      is_taxable: z.boolean().optional(),
      listing_type: z.enum(["physical", "download", "both"]).optional(),
    },
    async ({ shop_id, ...body }) => c.post(`/shops/${shop_id}/listings`, body)
  );

  // ── Update listing ──────────────────────────────────────────────────────────
  server.tool(
    "etsy_listing_update",
    "Update an existing listing",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
      quantity: z.number().int().min(0).optional(),
      title: z.string().max(140).optional(),
      description: z.string().optional(),
      price: z.number().positive().optional(),
      who_made: z.enum(["i_did", "someone_else", "collective"]).optional(),
      when_made: z.string().optional(),
      taxonomy_id: z.number().int().optional(),
      shipping_profile_id: z.number().int().optional(),
      return_policy_id: z.number().int().optional(),
      materials: z.array(z.string()).optional(),
      shop_section_id: z.number().int().optional(),
      processing_min: z.number().int().optional(),
      processing_max: z.number().int().optional(),
      tags: z.array(z.string()).optional(),
      styles: z.array(z.string()).optional(),
      is_personalizable: z.boolean().optional(),
      should_auto_renew: z.boolean().optional(),
      is_taxable: z.boolean().optional(),
      featured_rank: z.number().int().optional(),
      state: z.enum(["active", "inactive"]).optional(),
    },
    async ({ shop_id, listing_id, ...body }) =>
      c.patch(`/shops/${shop_id}/listings/${listing_id}`, body)
  );

  // ── Delete listing ──────────────────────────────────────────────────────────
  server.tool(
    "etsy_listing_delete",
    "Delete a listing from a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      listing_id: z.number().int(),
    },
    async ({ shop_id, listing_id }) =>
      c.delete(`/shops/${shop_id}/listings/${listing_id}`),
    { destructiveHint: true }
  );

  // ── List featured listings ──────────────────────────────────────────────────
  server.tool(
    "etsy_listings_featured",
    "List featured listings for a shop",
    {
      shop_id: z.union([z.number().int(), z.string()]),
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
    },
    async ({ shop_id, ...params }) =>
      c.get(`/shops/${shop_id}/listings/featured`, params),
    { readOnlyHint: true }
  );
}
