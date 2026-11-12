import { cookies } from "next/headers";
import { request } from "./api";

export async function serverFetch<T>(path: string, init?: RequestInit) {
  const cookie = (await cookies()).toString();
  return request<T>(path, { ...init, cache: "no-store", headers: { ...init?.headers, cookie } });
}
