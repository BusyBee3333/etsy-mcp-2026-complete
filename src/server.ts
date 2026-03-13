import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { EtsyClient } from "./client.js";
import { ZodRawShape } from "zod";

type ToolHints = { readOnlyHint?: boolean; destructiveHint?: boolean };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyHandler = (args: any) => Promise<any>;

export class EtsyMCPServer {
  public readonly mcp: McpServer;
  public readonly client: EtsyClient;

  constructor(apiKey: string, accessToken?: string) {
    this.client = new EtsyClient(apiKey, accessToken);
    this.mcp = new McpServer({
      name: "@mcpengine/etsy",
      version: "1.0.0",
    });
  }

  /**
   * Convenience wrapper — tool modules call this to register a tool.
   * The schema arg is typed as ZodRawShape; at runtime it's passed straight
   * through to mcp.tool(). We cast to `any` once here so that none of the
   * 46 tool files need their own casts.
   */
  tool(
    name: string,
    description: string,
    schema: ZodRawShape,
    handler: AnyHandler,
    hints?: ToolHints
  ): void {
    // Build optional annotations
    const annotations: Record<string, boolean> = {};
    if (hints?.readOnlyHint !== undefined) annotations["readOnlyHint"] = hints.readOnlyHint;
    if (hints?.destructiveHint !== undefined) annotations["destructiveHint"] = hints.destructiveHint;

    // Cast schema to any to sidestep the TS2589 deep-instantiation on mcp.tool<Args>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawSchema = schema as any;

    if (Object.keys(annotations).length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.mcp as any).tool(
        name,
        description,
        rawSchema,
        annotations,
        async (args: unknown) => {
          const result = await handler(args);
          return {
            content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
          };
        }
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.mcp as any).tool(
        name,
        description,
        rawSchema,
        async (args: unknown) => {
          const result = await handler(args);
          return {
            content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
          };
        }
      );
    }
  }

  /** Load all tool modules */
  async loadTools(): Promise<void> {
    const modules = [
      "./tools/listings",
      "./tools/listing_images",
      "./tools/listing_videos",
      "./tools/listing_inventory",
      "./tools/listing_properties",
      "./tools/listing_files",
      "./tools/listing_translations",
      "./tools/listing_variations",
      "./tools/shops",
      "./tools/shop_sections",
      "./tools/shop_about",
      "./tools/shop_production_partners",
      "./tools/shop_return_policies",
      "./tools/shop_shipping_profiles",
      "./tools/shop_shipping_profile_destinations",
      "./tools/shop_shipping_profile_upgrades",
      "./tools/receipts",
      "./tools/receipt_transactions",
      "./tools/receipt_shipments",
      "./tools/payments",
      "./tools/payment_ledger",
      "./tools/payment_account",
      "./tools/reviews",
      "./tools/users",
      "./tools/user_addresses",
      "./tools/taxonomy",
      "./tools/taxonomy_properties",
      "./tools/buyer_taxonomy",
      "./tools/listings_search",
      "./tools/shop_listings_search",
      "./tools/favorite_listings",
      "./tools/favorite_shops",
      "./tools/listing_image_upload",
      "./tools/shop_icon",
      "./tools/shipping_carriers",
      "./tools/listing_offering",
      "./tools/shop_receipt_transactions",
      "./tools/ledger_entries",
      "./tools/payout",
      "./tools/listing_drafts",
      "./tools/listing_renewal",
      "./tools/listing_stats",
      "./tools/shop_stats",
      "./tools/featured_listings",
      "./tools/listing_tags",
      "./tools/listing_materials",
      "./tools/listing_occasion",
    ];

    for (const mod of modules) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const m = require(mod) as { register: (s: EtsyMCPServer) => void };
        m.register(this);
      } catch (e) {
        console.error(`Failed to load tool module ${mod}:`, e);
      }
    }
  }

  async start(): Promise<void> {
    await this.loadTools();
    const transport = new StdioServerTransport();
    await this.mcp.connect(transport);
    console.error("Etsy MCP Server running (stdio)");
  }
}
