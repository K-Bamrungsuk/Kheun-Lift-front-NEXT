import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiError, request } from "./api";

export async function serverFetch<T>(path: string, init?: RequestInit) {
  const cookie = (await cookies()).toString();
  return request<T>(path, { ...init, cache: "no-store", headers: { ...init?.headers, cookie } }).catch(
    (error) => {
      // The proxy only checks that the cookie exists, so a revoked session shows up here as 401.
      if (error instanceof ApiError && error.status === 401) redirect("/login");
      throw error;
    },
  );
}
