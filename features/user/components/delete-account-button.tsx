"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SpinnerIcon } from "@/components/ui/spinner";
import { errorMessage } from "@/lib/api";
import { deleteMe } from "../api";

export function DeleteAccountButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (!confirm("Delete your account? This cannot be undone.")) return;
    setPending(true);
    try {
      await deleteMe();
    } catch (error) {
      // Go answers 409 while the user still has lifts, until backend task B4.5. Go's message says to delete them first.
      alert(errorMessage(error));
      setPending(false);
      return;
    }
    // cacheComponents keeps this button mounted and hidden after the user leaves, so reset it.
    setPending(false);
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="flex min-h-11 w-full items-center justify-center rounded-xl px-4 text-sm text-red-400 transition-colors hover:bg-red-400/10 disabled:opacity-60"
    >
      {pending ? <SpinnerIcon label="Deleting" /> : "Delete account"}
    </button>
  );
}
