"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Dialog } from "@/components/ui/modal";
import { SpinnerIcon } from "@/components/ui/spinner";
import { errorMessage } from "@/lib/api";
import { deleteLift } from "../api";
import type { LiftRecord } from "../types";

export function DeleteLiftDialog({
  lift,
  onCancel,
  onDeleted,
}: {
  lift: LiftRecord;
  onCancel: () => void;
  onDeleted: () => void;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setPending(true);
    setError("");
    try {
      await deleteLift(lift.id);
      onDeleted();
    } catch (err) {
      setError(errorMessage(err));
      setPending(false);
    }
  }

  return (
    <Dialog labelledBy="delete-lift-title" onClose={pending ? () => {} : onCancel}>
      <div className="px-5 pb-6 text-center md:px-7">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-red-400/10 text-red-400">
          <Icon name="alert" className="size-7" />
        </span>
        <h2 id="delete-lift-title" className="mt-4 text-lg font-semibold">
          Delete this lift?
        </h2>
        <p className="mt-2 text-sm text-muted">
          {lift.status === "verified" &&
            "This verified lift counts toward the leaderboard, so your rank may change. "}
          This cannot be undone.
        </p>
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            autoFocus
            onClick={onCancel}
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
    </Dialog>
  );
}
