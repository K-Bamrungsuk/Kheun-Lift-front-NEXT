"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SpinnerIcon } from "@/components/ui/spinner";
import { ApiError, errorMessage } from "@/lib/api";
import { logout } from "../api";

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    try {
      await logout();
    } catch (error) {
      // 401 means the session is already gone; anything else means the user is still logged in.
      if (!(error instanceof ApiError && error.status === 401)) {
        alert(errorMessage(error));
        setPending(false);
        return;
      }
    }
    // cacheComponents keeps this button mounted and hidden after the user leaves, so reset it.
    setPending(false);
    router.replace("/login");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleClick} disabled={pending} className={`flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm text-muted transition-colors hover:bg-surface-high hover:text-foreground disabled:opacity-60 ${className}`}>
      {pending ? <><SpinnerIcon /><span className="sr-only">Logging out</span></> : "Log out"}
    </button>
  );
}
