import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import * as fs from "fs";

const BASE_URL = "https://api.etsy.com/v3/application";

export class EtsyClient {
  private http: AxiosInstance;
  private apiKey: string;
  private accessToken?: string;

  constructor(apiKey: string, accessToken?: string) {
    this.apiKey = apiKey;
    this.accessToken = accessToken;

    this.http = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Attach OAuth bearer token when available
    this.http.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers = config.headers ?? {};
        config.headers["Authorization"] = `Bearer ${this.accessToken}`;
      }
      return config;
    });

    // Response error normalisation
    this.http.interceptors.response.use(
      (res) => res,
      (err) => {
        const msg =
          err?.response?.data?.error_description ??
          err?.response?.data?.error ??
          err?.message ??
          "Unknown Etsy API error";
        const status = err?.response?.status ?? 0;
        throw new Error(`[${status}] ${msg}`);
      }
    );
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

  /**
   * Upload a local image file to a listing via multipart/form-data.
   * Etsy's uploadListingImage endpoint requires the actual file bytes in the `image`
   * field (it does not accept a remote URL), so we stream the file from disk.
   */
  async uploadImageFile<T>(
    path: string,
    filePath: string,
    fields: Record<string, unknown> = {}
  ): Promise<T> {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Image file not found: ${filePath}`);
    }
    // form-data ships without bundled TS types in some versions; load via require.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const FormData = require("form-data");
    const form = new FormData();
    form.append("image", fs.createReadStream(filePath));
    for (const [k, v] of Object.entries(fields)) {
      if (v !== undefined && v !== null) form.append(k, String(v));
    }
    // form.getHeaders() supplies the multipart Content-Type WITH boundary,
    // overriding the instance-level application/json default for this request.
    const res = await this.http.post<T>(path, form, {
      headers: form.getHeaders(),
    });
    return res.data;
  }
}
