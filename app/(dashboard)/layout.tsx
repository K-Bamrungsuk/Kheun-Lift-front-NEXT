import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import type { User } from "@/features/user/types";
import { ApiError } from "@/lib/api";
import { serverFetch } from "@/lib/api-server";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // cookies() must sit inside Suspense when cacheComponents is on.
  return <Suspense><SignedInShell>{children}</SignedInShell></Suspense>;
}

async function SignedInShell({ children }: { children: React.ReactNode }) {
  const { user } = await serverFetch<{ user: User }>("/users/me").catch((error) => {
    // Cookie exists but the session expired or was revoked.
    if (error instanceof ApiError && error.status === 401) redirect("/login");
    throw error;
  });
  return <AppShell user={user}>{children}</AppShell>;
}
