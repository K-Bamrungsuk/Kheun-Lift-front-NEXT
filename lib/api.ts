export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  // Without it every call goes to "undefined/..." and looks like a network failure.
  if (!process.env.NEXT_PUBLIC_API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set.");
  // Go answers 415 without this header on a JSON body; FormData sets its own multipart boundary.
  const headers = typeof init.body === "string" ?{ "Content-Type": "application/json", ...init.headers } : init.headers;
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
