import { z } from "zod";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function request<S extends z.ZodType>(
  path: string,
  schema: S,
  init: RequestInit = {},
): Promise<z.output<S>> {
  // Without NEXT_PUBLIC_API_URL every call goes to "undefined/..." and looks like a network failure.
  if (!process.env.NEXT_PUBLIC_API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set.");
  // Go answers 415 without this header on a JSON body; FormData sets its own multipart boundary.
  const headers = typeof init.body === "string" ? { "Content-Type": "application/json", ...init.headers } : init.headers;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, { ...init, headers });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, data?.message ?? "Something went wrong.");
  const parsed = schema.safeParse(data?.data);
  if (!parsed.success) {
    console.error(path, z.prettifyError(parsed.error));
    throw new ApiError(502, "Unexpected response from the server.");
  }
  return parsed.data;
}

export function clientFetch<S extends z.ZodType>(path: string, schema: S, init?: RequestInit) {
  return request(path, schema, { ...init, credentials: "include" });
}

// Go answers 400 for a malformed id or query and 404 for a missing row; both mean the page does not exist.
export const isNotFound = (error: unknown) =>
  error instanceof ApiError && [400, 404].includes(error.status);

export function errorMessage(error: unknown) {
  return error instanceof ApiError ? error.message : "Cannot reach the server. Please try again.";
}
