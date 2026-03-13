import { AxiosRequestConfig } from "axios";
export declare class EtsyClient {
    private http;
    private apiKey;
    private accessToken?;
    constructor(apiKey: string, accessToken?: string);
    /** GET helper */
    get<T>(path: string, params?: Record<string, unknown>): Promise<T>;
    /** POST helper */
    post<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
    /** PUT helper */
    put<T>(path: string, data?: unknown): Promise<T>;
    /** PATCH helper */
    patch<T>(path: string, data?: unknown): Promise<T>;
    /** DELETE helper */
    delete<T>(path: string, data?: unknown): Promise<T>;
    /** Multipart POST (image/file upload) */
    postForm<T>(path: string, form: FormData): Promise<T>;
}
//# sourceMappingURL=client.d.ts.map