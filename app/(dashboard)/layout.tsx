import { Suspense } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { getMe } from "@/features/user/api-server";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // cookies() must sit inside Suspense when cacheComponents is on.
  return (
    <Suspense>
      <SignedInShell>{children}</SignedInShell>
    </Suspense>
  );
}

async function SignedInShell({ children }: { children: React.ReactNode }) {
  const user = await getMe();
  return <AppShell user={user}>{children}</AppShell>;
}
