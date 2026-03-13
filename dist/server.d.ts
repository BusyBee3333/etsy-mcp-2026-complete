import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { EtsyClient } from "./client.js";
import { ZodRawShape } from "zod";
type ToolHints = {
    readOnlyHint?: boolean;
    destructiveHint?: boolean;
};
type AnyHandler = (args: any) => Promise<any>;
export declare class EtsyMCPServer {
    readonly mcp: McpServer;
    readonly client: EtsyClient;
    constructor(apiKey: string, accessToken?: string);
    /**
     * Convenience wrapper — tool modules call this to register a tool.
     * The schema arg is typed as ZodRawShape; at runtime it's passed straight
     * through to mcp.tool(). We cast to `any` once here so that none of the
     * 46 tool files need their own casts.
     */
    tool(name: string, description: string, schema: ZodRawShape, handler: AnyHandler, hints?: ToolHints): void;
    /** Load all tool modules */
    loadTools(): Promise<void>;
    start(): Promise<void>;
}
export {};
//# sourceMappingURL=server.d.ts.map