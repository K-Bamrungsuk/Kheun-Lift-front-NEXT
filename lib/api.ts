export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  // Go answers 415 without this header when a body is sent.
  const headers = init.body ? { "Content-Type": "application/json", ...init.headers } : init.headers;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, { ...init, headers });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, data?.message ?? "Something went wrong.");
  return data as T;
}

export function clientFetch<T>(path: string, init?: RequestInit) {
  return request<T>(path, { ...init, credentials: "include" });
}

export function errorMessage(error: unknown) {
  return error instanceof ApiError ? error.message : "Cannot reach the server. Please try again.";
}
