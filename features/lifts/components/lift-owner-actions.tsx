"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { SpinnerIcon } from "@/components/ui/spinner";
import { useCloseModal } from "@/components/ui/modal";
import { errorMessage } from "@/lib/api";
import { updateLiftCaption } from "../api";
import { formatLiftDate } from "../format-date";
import type { LiftRecord } from "../types";
import { DeleteLiftDialog } from "./delete-lift-dialog";
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
  const [confirming, setConfirming] = useState(false);
  const [caption, setCaption] = useState(lift.caption);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get("caption")).trim();
    setSaving(true);
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
    setSaving(false);
  }

  function handleDeleted() {
    setConfirming(false);
    if (close) close();
    else router.replace("/profile");
    router.refresh();
  }

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar src={lift.user.profileImage} alt="" className="size-12" />
            <div className="min-w-0">
              <Link
                href={isOwner ? "/profile" : `/users/${lift.userId}`}
                className="block truncate text-md font-semibold underline-offset-4 hover:underline"
              >
                {lift.user.username}
              </Link>
              <time
                dateTime={lift.createdAt}
                className="block text-sm text-muted"
              >
                {formatLiftDate(lift.createdAt)}
              </time>
            </div>
          </div>
          {isOwner && (
            <LiftMenu
              disabled={saving}
              onEdit={() => {
                setError("");
                setEditing(true);
              }}
              onDelete={() => setConfirming(true)}
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
            <div className="flex justify-end gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setEditing(false);
                  setError("");
                }}
                className="min-h-11 rounded-xl px-4 text-muted transition-colors hover:bg-surface-high disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex min-h-11 min-w-20 items-center justify-center rounded-xl bg-accent px-5 font-semibold text-background disabled:opacity-60"
              >
                {saving ? <SpinnerIcon label="Saving" /> : "Save"}
              </button>
            </div>
          </form>
        ) : (
          caption && (
            <p className="whitespace-pre-line break-words text-md leading-6">
              {caption}
            </p>
          )
        )}
      </div>
      <div className="space-y-4 border-t border-border pt-5">{children}</div>
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
      {confirming && (
        <DeleteLiftDialog
          lift={lift}
          onCancel={() => setConfirming(false)}
          onDeleted={handleDeleted}
        />
      )}
    </>
  );
}
