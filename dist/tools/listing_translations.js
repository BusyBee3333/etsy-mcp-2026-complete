"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
function register(server) {
    const c = server.client;
    server.tool("etsy_listing_translations_list", "List all translations for a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id }) => c.get(`/shops/${shop_id}/listings/${listing_id}/translations`), { readOnlyHint: true });
    server.tool("etsy_listing_translation_get", "Get a translation for a listing by language", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        language: zod_1.z.string().describe("ISO 639-1 language code, e.g. 'fr', 'de'"),
    }, async ({ shop_id, listing_id, language }) => c.get(`/shops/${shop_id}/listings/${listing_id}/translations/${language}`), { readOnlyHint: true });
    server.tool("etsy_listing_translation_create", "Create a translation for a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        language: zod_1.z.string().describe("ISO 639-1 language code"),
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
    }, async ({ shop_id, listing_id, language, ...body }) => c.post(`/shops/${shop_id}/listings/${listing_id}/translations/${language}`, body));
    server.tool("etsy_listing_translation_update", "Update a translation for a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        language: zod_1.z.string(),
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
    }, async ({ shop_id, listing_id, language, ...body }) => c.patch(`/shops/${shop_id}/listings/${listing_id}/translations/${language}`, body));
}
//# sourceMappingURL=listing_translations.js.map