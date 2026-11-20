"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { ModalButton, useCloseModal } from "@/components/ui/modal";
import { SpinnerIcon } from "@/components/ui/spinner";
import { errorMessage } from "@/lib/api";
import { deleteMe } from "../api";

export function DeleteAccountButton() {
  return (
    <ModalButton
      label="Delete account"
      labelledBy="delete-account-title"
      className="flex min-h-11 w-full items-center justify-center rounded-xl px-4 text-sm text-red-400 transition-colors hover:bg-red-400/10"
      trigger="Delete account"
    >
      <DeleteAccountConfirm />
    </ModalButton>
  );
}

function DeleteAccountConfirm() {
  const router = useRouter();
  const close = useCloseModal();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    setError("");
    startTransition(async () => {
      try {
        await deleteMe();
      } catch (err) {
        // Go answers 409 while the user still has lifts, until backend task B4.5. Go's message says to delete them first.
        setError(errorMessage(err));
        return;
      }
      startTransition(() => {
        router.replace("/login");
        router.refresh();
      });
    });
  }

  return (
    <div className="px-5 pb-6 text-center md:px-7">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-red-400/10 text-red-400">
        <Icon name="alert" className="size-7" />
      </span>
      <h2 id="delete-account-title" className="mt-4 text-lg font-semibold">
        Delete your account?
      </h2>
      <p className="mt-2 text-sm text-muted">
        Your profile and lifts will be removed. This cannot be undone.
      </p>
      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}
      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={close ?? undefined}
          disabled={pending}
          className="min-h-12 flex-1 rounded-xl border border-border px-4 text-sm text-muted transition-colors hover:bg-surface-high hover:text-foreground disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={pending}
          className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-red-400 px-4 font-semibold text-background disabled:opacity-60"
        >
          {pending ? <SpinnerIcon label="Deleting" /> : "Delete"}
        </button>
      </div>
    </div>
  );
}
