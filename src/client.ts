import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import * as fs from "fs";

const BASE_URL = "https://api.etsy.com/v3/application";
const TOKEN_URL = "https://api.etsy.com/v3/public/oauth/token";

export interface EtsyClientOptions {
  /** OAuth refresh token, used to mint a new access token when the current one expires (Etsy access tokens last ~1h). */
  refreshToken?: string;
  /** Where to persist refreshed tokens as JSON so they survive restarts. */
  tokenPath?: string;
  /** Etsy shared secret. When set, the x-api-key header is sent as `keystring:secret`, which this app requires. */
  sharedSecret?: string;
}

export class EtsyClient {
  private http: AxiosInstance;
  private apiKey: string;
  private apiKeyHeader: string;
  private accessToken?: string;
  private refreshToken?: string;
  private tokenPath?: string;
  private refreshing?: Promise<void>;

  constructor(apiKey: string, accessToken?: string, opts: EtsyClientOptions = {}) {
    this.apiKey = apiKey;
    this.accessToken = accessToken;
    this.refreshToken = opts.refreshToken;
    this.tokenPath = opts.tokenPath;
    // Some Etsy apps require the shared secret in the header as `keystring:secret`.
    this.apiKeyHeader = opts.sharedSecret ? `${apiKey}:${opts.sharedSecret}` : apiKey;

    this.http = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
      headers: {
        "x-api-key": this.apiKeyHeader,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Attach OAuth bearer token when available. Read dynamically so a refresh takes effect immediately.
    this.http.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers = config.headers ?? {};
        config.headers["Authorization"] = `Bearer ${this.accessToken}`;
      }
      return config;
    });

    // On 401, try one silent token refresh and retry the request; otherwise normalise the error.
    this.http.interceptors.response.use(
      (res) => res,
      async (err) => {
        const status = err?.response?.status ?? 0;
        const original = err?.config as
          | (AxiosRequestConfig & { _retry?: boolean })
          | undefined;

        if (status === 401 && this.refreshToken && original && !original._retry) {
          original._retry = true;
          try {
            await this.ensureRefreshed();
            original.headers = original.headers ?? {};
            (original.headers as Record<string, string>)["Authorization"] =
              `Bearer ${this.accessToken}`;
            return this.http.request(original);
          } catch {
            // fall through to the normalised error below
          }
        }

        const msg =
          err?.response?.data?.error_description ??
          err?.response?.data?.error ??
          err?.message ??
          "Unknown Etsy API error";
        throw new Error(`[${status}] ${msg}`);
      }
    );
  }

  /** Refresh the access token (deduplicated so parallel 401s only refresh once). */
  private ensureRefreshed(): Promise<void> {
    if (!this.refreshing) {
      this.refreshing = this.doRefresh().finally(() => {
        this.refreshing = undefined;
      });
    }
    return this.refreshing;
  }

  private async doRefresh(): Promise<void> {
    if (!this.refreshToken) throw new Error("No refresh token available");
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: this.apiKey,
      refresh_token: this.refreshToken,
    }).toString();
    const res = await axios.post(TOKEN_URL, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-api-key": this.apiKeyHeader,
      },
    });
    this.accessToken = res.data.access_token;
    if (res.data.refresh_token) this.refreshToken = res.data.refresh_token;
    this.persistTokens(res.data.expires_in);
  }

  private persistTokens(expiresIn?: number): void {
    if (!this.tokenPath) return;
    try {
      const data = {
        access_token: this.accessToken,
        refresh_token: this.refreshToken,
        expires_at: expiresIn ? Date.now() + expiresIn * 1000 : undefined,
      };
      fs.writeFileSync(this.tokenPath, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error("Could not persist tokens:", (e as Error).message);
    }
  }

  /** GET helper */
  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    const res = await this.http.get<T>(path, { params });
    return res.data;
  }

  /** POST helper */
  async post<T>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const res = await this.http.post<T>(path, data, config);
    return res.data;
  }

  /** PUT helper */
  async put<T>(path: string, data?: unknown): Promise<T> {
    const res = await this.http.put<T>(path, data);
    return res.data;
  }

  /** PATCH helper */
  async patch<T>(path: string, data?: unknown): Promise<T> {
    const res = await this.http.patch<T>(path, data);
    return res.data;
  }

  /** DELETE helper */
  async delete<T>(path: string, data?: unknown): Promise<T> {
    const res = await this.http.delete<T>(path, { data });
    return res.data;
  }

  /** Multipart POST (image/file upload) */
  async postForm<T>(path: string, form: FormData): Promise<T> {
    const res = await this.http.post<T>(path, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
}
