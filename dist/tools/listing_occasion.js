"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
const OCCASIONS = [
    "anniversary",
    "baptism",
    "bar_or_bat_mitzvah",
    "birthday",
    "canada_day",
    "chinese_new_year",
    "cinco_de_mayo",
    "confirmation",
    "christmas",
    "day_of_the_dead",
    "easter",
    "eid",
    "engagement",
    "fathers_day",
    "get_well",
    "graduation",
    "halloween",
    "hanukkah",
    "housewarming",
    "kwanzaa",
    "prom",
    "july_4th",
    "mothers_day",
    "new_baby",
    "new_years",
    "quinceanera",
    "retirement",
    "st_patricks_day",
    "sweet_16",
    "sympathy",
    "thanksgiving",
    "valentines",
    "wedding",
];
function register(server) {
    const c = server.client;
    server.tool("etsy_listing_occasion_get", "Get the occasion attribute for a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
    }, async ({ shop_id, listing_id }) => {
        const listing = await c.get(`/shops/${shop_id}/listings/${listing_id}`);
        return { occasion: listing.occasion ?? null };
    }, { readOnlyHint: true });
    server.tool("etsy_listing_occasion_set", "Set the occasion attribute for a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        occasion: zod_1.z.enum(OCCASIONS).describe("Occasion type for this listing"),
    }, async ({ shop_id, listing_id, occasion }) => c.patch(`/shops/${shop_id}/listings/${listing_id}`, { occasion }));
    server.tool("etsy_listing_styles_update", "Update the style attributes on a listing", {
        shop_id: zod_1.z.union([zod_1.z.number().int(), zod_1.z.string()]),
        listing_id: zod_1.z.number().int(),
        styles: zod_1.z.array(zod_1.z.string()).max(2).describe("Up to 2 style strings"),
    }, async ({ shop_id, listing_id, styles }) => c.patch(`/shops/${shop_id}/listings/${listing_id}`, { style: styles }));
}
//# sourceMappingURL=listing_occasion.js.map