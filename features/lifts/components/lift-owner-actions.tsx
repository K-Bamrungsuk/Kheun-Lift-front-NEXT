"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { SpinnerIcon } from "@/components/ui/spinner";
import { useCloseModal } from "@/components/ui/modal";
import { errorMessage } from "@/lib/api";
import { deleteLift, updateLiftCaption } from "../api";
import { formatLiftDate } from "../format-date";
import type { LiftRecord } from "../types";
import { LiftMenu } from "./lift-menu";

// The menu and the caption share the editing state, so the server passes the lift body in as children.
export function LiftOwnerActions({
  lift,
  isOwner,
  children,
}: {
  lift: LiftRecord;
  isOwner: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const close = useCloseModal();
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState(lift.caption);
  const [pending, setPending] = useState<"save" | "delete" | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get("caption")).trim();
    setPending("save");
    setError("");
    try {
      const updated = await updateLiftCaption(lift.id, value);
      setCaption(updated.caption);
      setEditing(false);
      router.refresh();
    } catch (err) {
      setError(errorMessage(err));
    }
    // cacheComponents keeps this component mounted and hidden after the user leaves, so reset it.
    setPending(null);
  }

  async function handleDelete() {
    if (!confirm("Delete this lift? This cannot be undone.")) return;
    setPending("delete");
    setError("");
    try {
      await deleteLift(lift.id);
      if (close) close();
      else router.replace("/profile");
      router.refresh();
    } catch (err) {
      setError(errorMessage(err));
    }
    setPending(null);
  }

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar src={lift.user.profileImage} alt="" className="size-10" />
            <div className="min-w-0">
              <Link
                href={isOwner ? "/profile" : `/users/${lift.userId}`}
                className="block truncate font-semibold underline-offset-4 hover:underline"
              >
                {lift.user.username}
              </Link>
              <time
                dateTime={lift.createdAt}
                className="block text-xs text-muted"
              >
                {formatLiftDate(lift.createdAt)}
              </time>
            </div>
          </div>
          {isOwner && (
            <LiftMenu
              disabled={pending !== null}
              onEdit={() => {
                setError("");
                setEditing(true);
              }}
              onDelete={handleDelete}
            />
          )}
        </div>
        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            <label htmlFor="lift-caption" className="block font-semibold">
              Caption
            </label>
            <textarea
              id="lift-caption"
              name="caption"
              rows={3}
              maxLength={300}
              autoFocus
              defaultValue={caption ?? ""}
              className="w-full min-w-0 rounded-lg border border-border bg-background px-4 py-3 text-base"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={pending !== null}
                className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-accent px-4 font-semibold text-background disabled:opacity-60"
              >
                {pending === "save" ? <SpinnerIcon label="Saving" /> : "Save"}
              </button>
              <button
                type="button"
                disabled={pending !== null}
                onClick={() => {
                  setEditing(false);
                  setError("");
                }}
                className="min-h-11 rounded-xl px-4 text-muted transition-colors hover:bg-surface-high disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          caption && (
            <p className="whitespace-pre-line break-words text-sm leading-6">
              {caption}
            </p>
          )
        )}
      </div>
      <div className="space-y-4 border-t border-border pt-5">{children}</div>
      {pending === "delete" && (
        <p role="status" className="flex justify-center text-muted">
          <SpinnerIcon className="size-5" label="Deleting" />
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </>
  );
}
