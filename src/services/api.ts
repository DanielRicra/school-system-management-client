import { envs } from "@/config/envs";

type ApiRequestMethod = "put" | "post" | "delete" | "patch" | "get";

class HttpService {
  constructor(public baseUrl: string = envs.API_URL) {}

  get defaultHeaders() {
    return {
      Authorization: localStorage.getItem("__auth__") ?? "",
      "Content-Type": "application/json",
    };
  }

  request(
    url: string,
    method: ApiRequestMethod = "get",
    data: BodyInit | null = null,
    customHeaders: Record<string, string> = {},
    signal?: AbortSignal
  ) {
    const headers = new Headers({ ...this.defaultHeaders, ...customHeaders });

    const config: RequestInit = {
      method,
      headers,
      signal,
    };

    if (data) {
      config.body = data;
    }

    const request = new Request(`${this.baseUrl}${url}`, config);

    return this.fetchData(request);
  }

  get(
    url: string,
    customHeaders: Record<string, string> = {},
    signal?: AbortSignal
  ) {
    return this.request(url, "get", null, customHeaders, signal);
  }

  post(
    url: string,
    data: BodyInit,
    customHeaders: Record<string, string> = {},
    signal?: AbortSignal
  ) {
    return this.request(url, "post", data, customHeaders, signal);
  }

  put(
    url: string,
    data: BodyInit,
    customHeaders: Record<string, string> = {},
    signal?: AbortSignal
  ) {
    return this.request(url, "put", data, customHeaders, signal);
  }

  patch(
    url: string,
    data: BodyInit,
    customHeaders: Record<string, string> = {},
    signal?: AbortSignal
  ) {
    return this.request(url, "patch", data, customHeaders, signal);
  }

  delete(
    url: string,
    customHeaders: Record<string, string> = {},
    signal?: AbortSignal
  ) {
    return this.request(url, "delete", null, customHeaders, signal);
  }

  private async fetchData(request: Request) {
    try {
      const res = await fetch(request);

      if (!res.ok) {
        const data = await res.json();

        throw new HttpServiceError(
          res.status,
          data.message ?? "Something went wrong, Try again later.",
          data
        );
      }
      return await res.json();
    } catch (error) {
      if (error instanceof HttpServiceError) throw error;

      throw new HttpServiceError(
        500,
        "Something went wrong, try again later.",
        null
      );
    }
  }
}

export class HttpServiceError extends Error {
  constructor(
    public status: number,
    public message: string,
    public info: unknown
  ) {
    super();
  }
}

const apiService = new HttpService();
export default apiService;
