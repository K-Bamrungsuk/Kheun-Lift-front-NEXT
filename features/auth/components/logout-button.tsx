"use client";

import { useState } from "react";
import { SpinnerIcon } from "@/components/ui/spinner";
import { ApiError, errorMessage } from "@/lib/api";
import { logout } from "../api";

export function LogoutButton() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    setError("");
    try {
      await logout();
    } catch (err) {
      const alreadyLoggedOut = err instanceof ApiError && err.status === 401;
      if (!alreadyLoggedOut) {
        setError(errorMessage(err));
        setPending(false);
        return;
      }
    }
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- a full load drops the old user's state that Activity keeps
    window.location.href = "/login";
  }

  return (
    <>
      <button
        type="button"
        role="menuitem"
        onClick={handleClick}
        disabled={pending}
        className="flex min-h-11 w-full items-center justify-between px-4 text-left text-sm transition-colors hover:bg-surface-high disabled:opacity-60"
      >
        Log out
        {pending && <SpinnerIcon label="Logging out" />}
      </button>
      {error && (
        <p role="alert" className="px-4 pb-2 text-sm text-danger">
          {error}
        </p>
      )}
    </>
  );
}
