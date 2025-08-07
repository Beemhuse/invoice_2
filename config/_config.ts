// api.ts
import Cookies from "universal-cookie";

export const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "";

type ApiResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
};

type ApiError = Error & {
  status: number;
  statusText: string;
  data?: any;
};

interface ApiRequestInit extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

class ApiClient {
  private baseUrl: string;
  private cookies: Cookies;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.cookies = new Cookies();
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>) {
    const url = new URL(endpoint, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    return url;
  }

  private buildHeaders(customHeaders: HeadersInit = {}) {
    const token = this.cookies.get("invoice_token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...customHeaders,
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get("content-type") || "";
    const headers: Record<string, string> = {};

    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    let data: any;
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else if (contentType.includes("text/")) {
      data = await response.text();
    } else {
      data = await response.blob();
    }

    if (!response.ok) {
      // if (response.status === 401 && typeof window !== "undefined") {
      //   window.location.href = "/login";
      // }

      const error: ApiError = new Error(data?.message || "Request failed") as ApiError;
      error.status = response.status;
      error.statusText = response.statusText;
      error.data = data;
      throw error;
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers,
    };
  }

  private async request<T>(endpoint: string, options: ApiRequestInit = {}): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint, options.params);
    const config: RequestInit = {
      ...options,
      headers: this.buildHeaders(options.headers),
      // Removed credentials: "include" entirely
    };

    const response = await fetch(url.toString(), config);
    return this.handleResponse<T>(response);
  }

  public get<T = any>(endpoint: string, options?: ApiRequestInit) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  public post<T = any>(endpoint: string, body?: any, options?: ApiRequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public put<T = any>(endpoint: string, body?: any, options?: ApiRequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public delete<T = any>(endpoint: string, options?: ApiRequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "DELETE",
    });
  }

  public patch<T = any>(endpoint: string, body?: any, options?: ApiRequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

export const api = new ApiClient(API_URL);