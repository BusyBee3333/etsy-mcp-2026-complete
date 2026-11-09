# @mcpengine/etsy — The Most Comprehensive Etsy MCP Server

The most complete [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server for the **Etsy API v3**, featuring **50+ tool modules** covering virtually the entire Etsy API surface.

---

## Features

- **50+ tools** across every Etsy API domain
- Full **Etsy API v3** coverage
- **Zod-validated** input schemas on every tool
- `readOnlyHint` on all GET/list operations
- `destructiveHint` on all delete operations
- **Cursor/offset pagination** on all list tools
- Axios-based client with OAuth bearer token support
- TypeScript with 0 compilation errors

---

## Tools Index

### Listings (Core)
| Tool | Description |
|------|-------------|
| `etsy_listings_list` | List active listings with filters |
| `etsy_listing_get` | Get a single listing |
| `etsy_listings_get_by_ids` | Batch-fetch listings by IDs |
| `etsy_listings_list_by_shop` | List all listings in a shop |
| `etsy_listing_create` | Create a new listing |
| `etsy_listing_update` | Update a listing |
| `etsy_listing_delete` | Delete a listing |
| `etsy_listings_featured` | Get featured listings |

### Listing Images
| Tool | Description |
|------|-------------|
| `etsy_listing_images_list` | List images for a listing |
| `etsy_listing_image_get` | Get a specific image |
| `etsy_listing_image_upload` | Upload an image from a local file |
| `etsy_listing_image_delete` | Delete an image |
| `etsy_listing_images_reorder` | Reorder listing images |

### Listing Videos
| Tool | Description |
|------|-------------|
| `etsy_listing_videos_list` | List videos |
| `etsy_listing_video_get` | Get a specific video |
| `etsy_listing_video_upload` | Upload/attach a video |
| `etsy_listing_video_delete` | Remove a video |

### Listing Inventory
| Tool | Description |
|------|-------------|
| `etsy_listing_inventory_get` | Get inventory (variations, prices, quantities) |
| `etsy_listing_inventory_update` | Update inventory |

### Listing Properties
| Tool | Description |
|------|-------------|
| `etsy_listing_properties_list` | List properties |
| `etsy_listing_property_get` | Get a property |
| `etsy_listing_property_update` | Update a property |
| `etsy_listing_property_delete` | Delete a property |

### Digital Files
| Tool | Description |
|------|-------------|
| `etsy_listing_files_list` | List digital download files |
| `etsy_listing_file_get` | Get a file |
| `etsy_listing_file_upload` | Upload a digital file |
| `etsy_listing_file_delete` | Delete a file |

### Translations
| Tool | Description |
|------|-------------|
| `etsy_listing_translations_list` | List translations |
| `etsy_listing_translation_get` | Get a translation |
| `etsy_listing_translation_create` | Create translation |
| `etsy_listing_translation_update` | Update translation |

### Variation Images
| Tool | Description |
|------|-------------|
| `etsy_listing_variation_images_get` | Get variation images |
| `etsy_listing_variation_images_update` | Update variation images |

### Shops
| Tool | Description |
|------|-------------|
| `etsy_shop_get` | Get a shop |
| `etsy_shop_update` | Update a shop |
| `etsy_shops_by_owner` | Get shops by user |
| `etsy_shop_find` | Search shops by name |

### Shop Sections
| Tool | Description |
|------|-------------|
| `etsy_shop_sections_list` | List sections |
| `etsy_shop_section_get` | Get a section |
| `etsy_shop_section_create` | Create a section |
| `etsy_shop_section_update` | Update a section |
| `etsy_shop_section_delete` | Delete a section |

### Shop About, Production Partners, Return Policies
| Tool | Description |
|------|-------------|
| `etsy_shop_about_get` | Get shop About page |
| `etsy_shop_production_partners_list` | List production partners |
| `etsy_shop_production_partner_create` | Create partner |
| `etsy_shop_production_partner_update` | Update partner |
| `etsy_shop_production_partner_delete` | Delete partner |
| `etsy_shop_return_policies_list` | List return policies |
| `etsy_shop_return_policy_get` | Get a policy |
| `etsy_shop_return_policy_create` | Create policy |
| `etsy_shop_return_policy_update` | Update policy |
| `etsy_shop_return_policy_delete` | Delete policy |

### Shipping Profiles
| Tool | Description |
|------|-------------|
| `etsy_shop_shipping_profiles_list` | List profiles |
| `etsy_shop_shipping_profile_get` | Get a profile |
| `etsy_shop_shipping_profile_create` | Create profile |
| `etsy_shop_shipping_profile_update` | Update profile |
| `etsy_shop_shipping_profile_delete` | Delete profile |
| `etsy_shipping_profile_destinations_list` | List destinations |
| `etsy_shipping_profile_destination_create` | Create destination |
| `etsy_shipping_profile_destination_update` | Update destination |
| `etsy_shipping_profile_destination_delete` | Delete destination |
| `etsy_shipping_profile_upgrades_list` | List upgrades |
| `etsy_shipping_profile_upgrade_create` | Create upgrade |
| `etsy_shipping_profile_upgrade_update` | Update upgrade |
| `etsy_shipping_profile_upgrade_delete` | Delete upgrade |
| `etsy_shipping_carriers_list` | List shipping carriers |

### Orders & Receipts
| Tool | Description |
|------|-------------|
| `etsy_receipts_list` | List orders/receipts |
| `etsy_receipt_get` | Get a receipt |
| `etsy_receipt_update` | Update receipt (ship, note) |
| `etsy_receipt_transactions_list` | List transactions |
| `etsy_receipt_transaction_get` | Get a transaction |
| `etsy_receipt_transactions_by_receipt` | Transactions for a receipt |
| `etsy_receipt_shipments_list` | List shipments |
| `etsy_receipt_shipment_create` | Add tracking |
| `etsy_shop_receipt_transactions_list` | Receipt transactions in shop |
| `etsy_shop_listing_transactions_list` | Listing transactions |

### Payments & Finance
| Tool | Description |
|------|-------------|
| `etsy_payments_list` | List payments |
| `etsy_payment_get` | Get a payment |
| `etsy_payments_by_receipt` | Payments for a receipt |
| `etsy_payment_ledger_entries_list` | List ledger entries |
| `etsy_payment_ledger_entry_get` | Get a ledger entry |
| `etsy_payment_account_get` | Get payment account |
| `etsy_ledger_entries_list` | List ledger entries (alt) |
| `etsy_ledger_entry_get` | Get ledger entry |
| `etsy_ledger_entry_payment_get` | Payment for ledger entry |
| `etsy_payouts_list` | List payouts |
| `etsy_payout_get` | Get a payout |

### Reviews
| Tool | Description |
|------|-------------|
| `etsy_shop_reviews_list` | Shop reviews |
| `etsy_listing_reviews_list` | Listing reviews |

### Users & Addresses
| Tool | Description |
|------|-------------|
| `etsy_user_get` | Get a user |
| `etsy_user_me` | Get authenticated user |
| `etsy_user_addresses_list` | List addresses |
| `etsy_user_address_get` | Get an address |
| `etsy_user_address_delete` | Delete an address |

### Taxonomy & Discovery
| Tool | Description |
|------|-------------|
| `etsy_taxonomy_seller_list` | List seller taxonomy |
| `etsy_taxonomy_node_get` | Get a taxonomy node |
| `etsy_taxonomy_properties_list` | List taxonomy properties |
| `etsy_taxonomy_properties_get` | Get properties for node |
| `etsy_buyer_taxonomy_list` | List buyer taxonomy |
| `etsy_buyer_taxonomy_node_get` | Get buyer taxonomy node |
| `etsy_listings_search` | Global listing search |
| `etsy_shop_listings_search` | Search within a shop |
| `etsy_shop_listings_by_section` | Listings by section |

### Favorites
| Tool | Description |
|------|-------------|
| `etsy_user_favorite_listings_list` | List favorited listings |
| `etsy_user_favorite_listing_get` | Check if listing is favorited |
| `etsy_user_favorite_listing_add` | Favorite a listing |
| `etsy_user_favorite_listing_remove` | Unfavorite a listing |
| `etsy_user_favorite_shops_list` | List favorited shops |
| `etsy_user_favorite_shop_get` | Check if shop is favorited |
| `etsy_user_favorite_shop_add` | Favorite a shop |
| `etsy_user_favorite_shop_remove` | Unfavorite a shop |

### Images, Media & Icons
| Tool | Description |
|------|-------------|
| `etsy_listing_image_upload_file` | Upload image from a local file (rank, alt text) |
| `etsy_listing_image_set_rank` | Set image display rank |
| `etsy_listing_image_update_alt` | Update image alt text |
| `etsy_shop_icon_get` | Get shop icon |
| `etsy_shop_icon_delete` | Delete shop icon |
| `etsy_shop_banner_get` | Get shop banner |
| `etsy_shop_banner_delete` | Delete shop banner |

### Listing Lifecycle & Content
| Tool | Description |
|------|-------------|
| `etsy_listing_drafts_list` | List draft listings |
| `etsy_listing_draft_create` | Create a draft |
| `etsy_listing_draft_publish` | Publish a draft |
| `etsy_listing_renew` | Renew an expired listing |
| `etsy_listings_expired_list` | List expired listings |
| `etsy_listings_inactive_list` | List inactive listings |
| `etsy_listing_stats_get` | Get listing stats |
| `etsy_listing_views_get` | Get view count |
| `etsy_listings_stats_bulk` | Bulk listing stats |
| `etsy_featured_listings_list` | List featured listings |
| `etsy_listing_set_featured_rank` | Set featured rank |
| `etsy_listing_feature` | Feature a listing |
| `etsy_listing_unfeature` | Unfeature a listing |
| `etsy_listing_tags_get` | Get listing tags |
| `etsy_listing_tags_update` | Replace tags |
| `etsy_listing_tags_add` | Add tags |
| `etsy_listing_materials_get` | Get materials |
| `etsy_listing_materials_update` | Replace materials |
| `etsy_listing_materials_add` | Add materials |
| `etsy_listing_occasion_get` | Get occasion |
| `etsy_listing_occasion_set` | Set occasion |
| `etsy_listing_styles_update` | Update styles |

### Shop Analytics
| Tool | Description |
|------|-------------|
| `etsy_shop_stats_get` | Shop-level stats |
| `etsy_shop_receipt_summary` | Order summary |
| `etsy_shop_payment_summary` | Payment account summary |

### Products & Offerings
| Tool | Description |
|------|-------------|
| `etsy_listing_offering_get` | Get a product offering |
| `etsy_listing_product_get` | Get a product variant |

---

## Setup

### 1. Get an Etsy API Key

1. Visit [Etsy Developer Portal](https://www.etsy.com/developers/your-apps)
2. Click **Create a New App**
3. Note your **API Key (Keystring)**
4. For write operations, set up OAuth 2.0 and obtain an access token

### 2. Install

```bash
npm install
npm run build
```

### 3. Configure

```bash
cp .env.example .env
# Edit .env with your credentials
```

```env
ETSY_API_KEY=your_etsy_api_key_here
ETSY_ACCESS_TOKEN=your_oauth_access_token_here  # Optional: for write operations
```

### 4. Run

```bash
npm start
```

Or with `npx`:
```bash
ETSY_API_KEY=<key> node dist/main.js
```

---

## MCP Client Configuration

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "etsy": {
      "command": "node",
      "args": ["/path/to/etsy-mcp/dist/main.js"],
      "env": {
        "ETSY_API_KEY": "your_api_key_here",
        "ETSY_ACCESS_TOKEN": "your_access_token_here"
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "etsy": {
      "command": "node",
      "args": ["./dist/main.js"],
      "env": {
        "ETSY_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

---

## Authentication

The Etsy API uses two forms of authentication:

| Operation | Auth Required |
|-----------|---------------|
| Public listing search | API Key only |
| Read shop data | API Key only |
| Write/update operations | OAuth 2.0 Access Token |
| Financial data | OAuth 2.0 Access Token |

**API Key**: Pass as `ETSY_API_KEY` env var  
**OAuth Token**: Pass as `ETSY_ACCESS_TOKEN` env var

For OAuth setup, see [Etsy's OAuth 2.0 Guide](https://developers.etsy.com/documentation/essentials/authentication).

---

## Architecture

```
src/
├── main.ts          # Entry point, env validation
├── server.ts        # MCP server class, tool loader
├── client.ts        # Axios-based Etsy API v3 client
├── types.ts         # TypeScript interfaces
└── tools/           # One file per API domain (47 modules)
    ├── listings.ts
    ├── listing_images.ts
    ├── ...
    └── listing_occasion.ts
```

---

## Development

```bash
npm run dev     # ts-node (no build step)
npm run build   # TypeScript compile → dist/
npm run lint    # ESLint
```

---

## License

MIT — see [LICENSE](LICENSE)
