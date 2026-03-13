"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    // ── List featured/active listings ──────────────────────────────────────────
    server.tool("etsy_listings_list", "List active Etsy listings with optional filters", {
        limit: zod_1.z.number().int().min(1).max(100).optional().describe("Number of results (max 100)"),
        offset: zod_1.z.number().int().min(0).optional().describe("Pagination offset"),
        keywords: zod_1.z.string().optional().describe("Search keywords"),
        sort_on: zod_1.z.enum(["created", "price", "updated", "score"]).optional(),
        sort_order: zod_1.z.enum(["asc", "desc"]).optional(),
        min_price: zod_1.z.number().optional(),
        max_price: zod_1.z.number().optional(),
        taxonomy_id: zod_1.z.number().int().optional(),
    }, async (args) => c.get("/listings/active", args), { readOnlyHint: true });
    // ── Get a single listing ────────────────────────────────────────────────────
    server.tool("etsy_listing_get", "Get a single Etsy listing by ID", {
        listing_id: zod_1.z.number().int().describe("The listing ID"),
        includes: zod_1.z.array(zod_1.z.string()).optional().describe("Additional fields to include (Images, Shop, User, etc.)"),
    }, async ({ listing_id, includes }) => c.get(`/listings/${listing_id}`, includes ? { includes } : undefined), { readOnlyHint: true });
    // ── Get multiple listings by IDs ─────────────────────────────────────────
    server.tool("etsy_listings_get_by_ids", "Get multiple Etsy listings by an array of listing IDs", {
        listing_ids: zod_1.z.array(zod_1.z.number().int()).describe("Array of listing IDs"),
        includes: zod_1.z.array(zod_1.z.string()).optional(),
    }, async ({ listing_ids, includes }) => c.get("/listings/batch", { listing_ids, includes }), { readOnlyHint: true });
    // ── List by shop ────────────────────────────────────────────────────────────
    server.tool("etsy_listings_list_by_shop", "List all listings belonging to a specific shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]).describe("Shop ID or shop name"),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
        state: zod_1.z.enum(["active", "inactive", "sold_out", "draft", "expired"]).optional(),
        includes: zod_1.z.array(zod_1.z.string()).optional(),
        sort_on: zod_1.z.enum(["created", "price", "updated", "score"]).optional(),
        sort_order: zod_1.z.enum(["asc", "desc"]).optional(),
    }, async ({ shop_id, ...params }) => c.get(`/shops/${shop_id}/listings`, params), { readOnlyHint: true });
    // ── Create listing ──────────────────────────────────────────────────────────
    server.tool("etsy_listing_create", "Create a new listing in a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        quantity: zod_1.z.number().int().min(1).describe("Available quantity"),
        title: zod_1.z.string().max(140).describe("Listing title"),
        description: zod_1.z.string().describe("Listing description"),
        price: zod_1.z.number().positive().describe("Price in shop currency"),
        who_made: zod_1.z.enum(["i_did", "someone_else", "collective"]),
        when_made: zod_1.z.string().describe("e.g. 2020_2024, before_2000, etc."),
        taxonomy_id: zod_1.z.number().int().describe("Etsy taxonomy/category ID"),
        shipping_profile_id: zod_1.z.number().int().optional(),
        return_policy_id: zod_1.z.number().int().optional(),
        materials: zod_1.z.array(zod_1.z.string()).optional(),
        shop_section_id: zod_1.z.number().int().optional(),
        processing_min: zod_1.z.number().int().optional(),
        processing_max: zod_1.z.number().int().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        styles: zod_1.z.array(zod_1.z.string()).optional(),
        item_weight: zod_1.z.number().optional(),
        item_weight_unit: zod_1.z.enum(["oz", "lb", "g", "kg"]).optional(),
        item_length: zod_1.z.number().optional(),
        item_width: zod_1.z.number().optional(),
        item_height: zod_1.z.number().optional(),
        item_dimensions_unit: zod_1.z.enum(["in", "ft", "mm", "cm", "m", "yd", "inches"]).optional(),
        is_personalizable: zod_1.z.boolean().optional(),
        personalization_is_required: zod_1.z.boolean().optional(),
        personalization_char_count_max: zod_1.z.number().int().optional(),
        personalization_instructions: zod_1.z.string().optional(),
        production_partner_ids: zod_1.z.array(zod_1.z.number().int()).optional(),
        skus: zod_1.z.array(zod_1.z.string()).optional(),
        is_supply: zod_1.z.boolean().optional(),
        is_customizable: zod_1.z.boolean().optional(),
        should_auto_renew: zod_1.z.boolean().optional(),
        is_taxable: zod_1.z.boolean().optional(),
        listing_type: zod_1.z.enum(["physical", "download", "both"]).optional(),
    }, async ({ shop_id, ...body }) => c.post(`/shops/${shop_id}/listings`, body));
    // ── Update listing ──────────────────────────────────────────────────────────
    server.tool("etsy_listing_update", "Update an existing listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        quantity: zod_1.z.number().int().min(0).optional(),
        title: zod_1.z.string().max(140).optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().positive().optional(),
        who_made: zod_1.z.enum(["i_did", "someone_else", "collective"]).optional(),
        when_made: zod_1.z.string().optional(),
        taxonomy_id: zod_1.z.number().int().optional(),
        shipping_profile_id: zod_1.z.number().int().optional(),
        return_policy_id: zod_1.z.number().int().optional(),
        materials: zod_1.z.array(zod_1.z.string()).optional(),
        shop_section_id: zod_1.z.number().int().optional(),
        processing_min: zod_1.z.number().int().optional(),
        processing_max: zod_1.z.number().int().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        styles: zod_1.z.array(zod_1.z.string()).optional(),
        is_personalizable: zod_1.z.boolean().optional(),
        should_auto_renew: zod_1.z.boolean().optional(),
        is_taxable: zod_1.z.boolean().optional(),
        featured_rank: zod_1.z.number().int().optional(),
        state: zod_1.z.enum(["active", "inactive"]).optional(),
    }, async ({ shop_id, listing_id, ...body }) => c.patch(`/shops/${shop_id}/listings/${listing_id}`, body));
    // ── Delete listing ──────────────────────────────────────────────────────────
    server.tool("etsy_listing_delete", "Delete a listing from a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id }) => c.delete(`/shops/${shop_id}/listings/${listing_id}`), { destructiveHint: true });
    // ── List featured listings ──────────────────────────────────────────────────
    server.tool("etsy_listings_featured", "List featured listings for a shop", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        limit: zod_1.z.number().int().min(1).max(100).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
    }, async ({ shop_id, ...params }) => c.get(`/shops/${shop_id}/listings/featured`, params), { readOnlyHint: true });
}
//# sourceMappingURL=listings.js.map