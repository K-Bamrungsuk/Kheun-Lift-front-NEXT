"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SpinnerIcon } from "@/components/ui/spinner";
import { ApiError, errorMessage } from "@/lib/api";
import { logout } from "../api";

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleClick() {
    setError("");
    startTransition(async () => {
      try {
        await logout();
      } catch (err) {
        const alreadyLoggedOut = err instanceof ApiError && err.status === 401;
        if (!alreadyLoggedOut) {
          setError(errorMessage(err));
          return;
        }
      }
      startTransition(() => {
        router.replace("/login");
        router.refresh();
      });
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className={`flex min-h-11 items-center justify-center rounded-xl border border-border px-4 text-sm text-muted transition-colors hover:bg-surface-high hover:text-foreground disabled:opacity-60 ${className}`}
      >
        {pending ? <SpinnerIcon label="Logging out" /> : "Log out"}
      </button>
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </>
  );
}
