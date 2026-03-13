"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtsyClient = void 0;
const axios_1 = __importDefault(require("axios"));
const BASE_URL = "https://api.etsy.com/v3/application";
class EtsyClient {
    http;
    apiKey;
    accessToken;
    constructor(apiKey, accessToken) {
        this.apiKey = apiKey;
        this.accessToken = accessToken;
        this.http = axios_1.default.create({
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
        this.http.interceptors.response.use((res) => res, (err) => {
            const msg = err?.response?.data?.error_description ??
                err?.response?.data?.error ??
                err?.message ??
                "Unknown Etsy API error";
            const status = err?.response?.status ?? 0;
            throw new Error(`[${status}] ${msg}`);
        });
    }
    /** GET helper */
    async get(path, params) {
        const res = await this.http.get(path, { params });
        return res.data;
    }
    /** POST helper */
    async post(path, data, config) {
        const res = await this.http.post(path, data, config);
        return res.data;
    }
    /** PUT helper */
    async put(path, data) {
        const res = await this.http.put(path, data);
        return res.data;
    }
    /** PATCH helper */
    async patch(path, data) {
        const res = await this.http.patch(path, data);
        return res.data;
    }
    /** DELETE helper */
    async delete(path, data) {
        const res = await this.http.delete(path, { data });
        return res.data;
    }
    /** Multipart POST (image/file upload) */
    async postForm(path, form) {
        const res = await this.http.post(path, form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    }
}
exports.EtsyClient = EtsyClient;
//# sourceMappingURL=client.js.map