export interface EtsyConfig {
    apiKey: string;
    accessToken?: string;
    shopId?: string;
}
export interface PaginationParams {
    limit?: number;
    offset?: number;
}
export interface EtsyListResponse<T> {
    count: number;
    results: T[];
}
export interface EtsyListing {
    listing_id: number;
    user_id: number;
    shop_id: number;
    title: string;
    description: string;
    state: string;
    creation_timestamp: number;
    created_timestamp: number;
    ending_timestamp: number;
    original_creation_timestamp: number;
    last_modified_timestamp: number;
    updated_timestamp: number;
    state_timestamp: number;
    quantity: number;
    shop_section_id: number | null;
    featured_rank: number;
    url: string;
    num_favorers: number;
    non_taxable: boolean;
    is_taxable: boolean;
    is_customizable: boolean;
    is_personalizable: boolean;
    personalization_is_required: boolean;
    personalization_char_count_max: number | null;
    personalization_instructions: string | null;
    listing_type: string;
    tags: string[];
    materials: string[];
    shipping_profile_id: number | null;
    return_policy_id: number | null;
    processing_min: number | null;
    processing_max: number | null;
    who_made: string;
    when_made: string;
    is_supply: boolean;
    item_weight: number | null;
    item_weight_unit: string | null;
    item_length: number | null;
    item_width: number | null;
    item_height: number | null;
    item_dimensions_unit: string | null;
    is_private: boolean;
    style: string[];
    file_data: string;
    has_variations: boolean;
    should_auto_renew: boolean;
    language: string;
    price: EtsyMoney;
    taxonomy_id: number;
    production_partners: unknown[];
    skus: string[];
    views: number;
}
export interface EtsyMoney {
    amount: number;
    divisor: number;
    currency_code: string;
}
export interface EtsyShop {
    shop_id: number;
    user_id: number;
    shop_name: string;
    create_date: number;
    created_timestamp: number;
    title: string | null;
    announcement: string | null;
    currency_code: string;
    is_vacation: boolean;
    vacation_message: string | null;
    sale_message: string | null;
    digital_sale_message: string | null;
    update_date: number;
    updated_timestamp: number;
    listing_active_count: number;
    digital_listing_count: number;
    login_name: string;
    accepts_custom_requests: boolean;
    policy_welcome: string | null;
    policy_payment: string | null;
    policy_shipping: string | null;
    policy_refunds: string | null;
    policy_additional: string | null;
    policy_seller_info: string | null;
    policy_update_date: number;
    policy_has_private_receipt_info: boolean;
    vacation_autoreply: string | null;
    url: string;
    image_url_760x100: string | null;
    num_favorers: number;
    languages: string[];
    icon_url_fullxfull: string | null;
    is_using_structured_policies: boolean;
    has_onboarded_structured_policies: boolean;
    include_dispute_form_link: boolean;
    is_direct_checkout_onboarded: boolean;
    is_etsy_payments_onboarded: boolean;
    is_opted_in_to_buyer_promise: boolean;
    is_calculated_eligible: boolean;
    is_shop_us_based: boolean;
    transaction_sold_count: number;
    shipping_from_country_iso: string | null;
    shop_location_country_iso: string | null;
    review_count: number | null;
    review_average: number | null;
}
export interface EtsyReceipt {
    receipt_id: number;
    receipt_type: number;
    seller_user_id: number;
    seller_email: string;
    buyer_user_id: number;
    buyer_email: string;
    name: string;
    first_line: string;
    second_line: string | null;
    city: string;
    state: string | null;
    zip: string;
    status: string;
    formatted_address: string;
    country_iso: string;
    payment_method: string;
    payment_email: string;
    message_from_seller: string | null;
    message_from_buyer: string | null;
    message_from_payment: string | null;
    is_paid: boolean;
    is_shipped: boolean;
    create_timestamp: number;
    created_timestamp: number;
    update_timestamp: number;
    updated_timestamp: number;
    is_gift: boolean;
    gift_message: string;
    grandtotal: EtsyMoney;
    subtotal: EtsyMoney;
    total_price: EtsyMoney;
    total_shipping_cost: EtsyMoney;
    total_tax_cost: EtsyMoney;
    total_vat_cost: EtsyMoney;
    discount_amt: EtsyMoney;
    gift_wrap_price: EtsyMoney;
    shipments: EtsyShipment[];
    transactions: EtsyTransaction[];
    refunds: unknown[];
}
export interface EtsyTransaction {
    transaction_id: number;
    title: string;
    description: string;
    seller_user_id: number;
    buyer_user_id: number;
    create_timestamp: number;
    created_timestamp: number;
    paid_timestamp: number | null;
    shipped_timestamp: number | null;
    quantity: number;
    listing_image_id: number | null;
    receipt_id: number;
    is_digital: boolean;
    file_data: string;
    listing_id: number;
    transaction_type: string;
    product_id: number | null;
    sku: string | null;
    price: EtsyMoney;
    shipping_cost: EtsyMoney;
    variations: unknown[];
    product_data: unknown[];
    shipping_profile_id: number | null;
    min_processing_days: number | null;
    max_processing_days: number | null;
    shipping_method: string | null;
    shipping_upgrade: string | null;
    expected_ship_date: number | null;
    buyer_coupon: number;
    shop_coupon: number;
}
export interface EtsyShipment {
    receipt_shipping_id: number;
    shipment_notification_timestamp: number;
    carrier_name: string;
    tracking_code: string;
}
export interface EtsyPayment {
    payment_id: number;
    buyer_user_id: number;
    shop_id: number;
    receipt_id: number;
    amount_gross: EtsyMoney;
    amount_fees: EtsyMoney;
    amount_net: EtsyMoney;
    posted_gross: EtsyMoney;
    posted_fees: EtsyMoney;
    posted_net: EtsyMoney;
    adjusted_gross: EtsyMoney;
    adjusted_fees: EtsyMoney;
    adjusted_net: EtsyMoney;
    currency: string;
    shop_currency: string | null;
    buyer_currency: string | null;
    shipping_user_id: number | null;
    shipping_address_id: number;
    billing_address_id: number;
    status: string;
    shipped_timestamp: number | null;
    create_timestamp: number;
    update_timestamp: number;
}
export interface EtsyUser {
    user_id: number;
    login_name: string;
    primary_email: string;
    create_timestamp: number;
    created_timestamp: number;
    referral_user_id: number | null;
    feedback_info: {
        count: number;
        score: number | null;
    };
    avatar_src: string | null;
}
export interface EtsyReview {
    shop_id: number;
    listing_id: number;
    rating: number;
    review: string | null;
    language: string;
    image_url_fullxfull: string | null;
    create_timestamp: number;
    created_timestamp: number;
    update_timestamp: number;
    updated_timestamp: number;
}
export interface EtsyTaxonomyNode {
    id: number;
    level: number;
    name: string;
    parent_id: number | null;
    children: EtsyTaxonomyNode[];
    full_path_taxonomy_ids: number[];
}
export interface ToolModule {
    register(server: import("./server").EtsyMCPServer): void;
}
//# sourceMappingURL=types.d.ts.map