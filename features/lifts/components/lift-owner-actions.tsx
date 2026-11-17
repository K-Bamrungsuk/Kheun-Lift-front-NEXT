"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import type { Variant } from "@/components/ui/modal";
import { errorMessage } from "@/lib/api";
import { deleteLift, updateLiftCaption } from "../api";
import { formatLiftDate } from "../format-date";
import type { LiftRecord } from "../types";

// Lays out the lift like a post: the lifter, their caption and the ⋯ menu on top, then the lift itself.
// The menu and the caption share the editing state, so the server passes the lift body in as children.
// variant: after a delete, "modal" closes the lift modal and "page" goes to the profile.
export function LiftOwnerActions({
  lift,
  isOwner,
  variant,
  children,
}: {
  lift: LiftRecord;
  isOwner: boolean;
  variant: Variant;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState(lift.caption);
  const [pending, setPending] = useState<"save" | "delete" | null>(null);
  const [error, setError] = useState("");

  // Close the menu on a click outside it. Safari does not focus clicked buttons, so blur is not enough.
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!(event.target instanceof Node && menuRef.current?.contains(event.target))) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  async function run(action: "save" | "delete", call: () => Promise<unknown>) {
    setPending(action);
    setError("");
    try {
      await call();
    } catch (err) {
      setError(errorMessage(err));
      setPending(null);
      return false;
    }
    // cacheComponents keeps this component mounted and hidden after the user leaves, so reset it.
    setPending(null);
    return true;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = String(
      new FormData(event.currentTarget).get("caption"),
    ).trim();
    const saved = await run("save", async () => {
      const { data } = await updateLiftCaption(lift.id, value);
      setCaption(data.caption);
    });
    if (!saved) return;
    setEditing(false);
    router.refresh();
  }

  async function handleDelete() {
    setOpen(false);
    if (!confirm("Delete this lift? This cannot be undone.")) return;
    if (!(await run("delete", () => deleteLift(lift.id)))) return;
    switch (variant) {
      case "modal":
        router.back();
        break;
      case "page":
        router.replace("/profile");
        break;
      default: {
        const _exhaustive: never = variant;
        void _exhaustive;
      }
    }
    router.refresh();
  }

  const item =
    "flex min-h-11 w-full items-center px-4 text-left text-sm transition-colors hover:bg-surface-high";

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
            <div
              ref={menuRef}
              className="relative shrink-0"
              onKeyDown={(event) => {
                // Esc closes only the menu; without this the <dialog> would close the whole modal.
                if (open && event.key === "Escape") {
                  event.preventDefault();
                  event.stopPropagation();
                  setOpen(false);
                }
              }}
            >
              <button
                type="button"
                aria-label="Lift options"
                aria-haspopup="menu"
                aria-expanded={open}
                disabled={pending !== null}
                onClick={() => setOpen(!open)}
                className="grid size-11 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-high hover:text-foreground disabled:opacity-60"
              >
                <Icon name="more" />
              </button>
              {open && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-10 mt-1 w-40 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-xl"
                >
                  <button
                    type="button"
                    role="menuitem"
                    autoFocus
                    onClick={() => {
                      setOpen(false);
                      setError("");
                      setEditing(true);
                    }}
                    className={item}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleDelete}
                    className={`${item} text-red-400`}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
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
                {pending === "save" ? "Saving..." : "Save"}
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
        <p role="status" className="text-sm text-muted">
          Deleting...
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
