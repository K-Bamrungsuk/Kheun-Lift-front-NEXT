"use client";

import { useId, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { SpinnerIcon } from "@/components/ui/spinner";
import { useCloseModal } from "@/components/ui/modal";
import { errorMessage } from "@/lib/api";
import { deleteProfileImage, uploadProfileImage } from "../api";
import type { User } from "../types";

// Same limit as Go; checked here too so the user sees the error at once.
const MAX_SIZE = 2 * 1024 * 1024;

const buttonClass =
  "flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-xl px-4 disabled:opacity-60";
const primaryClass = `${buttonClass} bg-accent font-semibold text-background`;
const secondaryClass = `${buttonClass} border border-border text-sm transition-colors`;

// Remove stays here to show the blank avatar.
export function ProfilePictureForm({ user }: { user: User }) {
  const router = useRouter();
  const close = useCloseModal();
  const hintId = useId();
  const [error, setError] = useState("");
  const [picked, setPicked] = useState<{ file: File; url: string } | null>(null);
  // Pending lasts until router.refresh() shows the result. With a pick it is an upload, otherwise a remove.
  const [pending, startTransition] = useTransition();

  function clearPick() {
    if (picked) URL.revokeObjectURL(picked.url);
    setPicked(null);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    // Clear it so picking the same file again still fires change.
    input.value = "";
    if (!file) return;
    if (file.size > MAX_SIZE) return setError("Image must be 2 MB or smaller.");
    setError("");
    if (picked) URL.revokeObjectURL(picked.url);
    setPicked({ file, url: URL.createObjectURL(file) });
  }

  function run(action: () => Promise<unknown>, done = false) {
    setError("");
    startTransition(async () => {
      try {
        await action();
        // Clear the pick in the same transition as the refresh, so the preview never flashes the old image.
        startTransition(() => {
          clearPick();
          if (done) close?.();
          router.refresh();
        });
      } catch (err) {
        setError(errorMessage(err));
      }
    });
  }

  function handleCancel() {
    setError("");
    clearPick();
  }

  return (
    <div className="text-center">
      <Avatar
        src={picked?.url ?? user.profileImage}
        alt={picked ? "Selected picture preview" : `${user.username} profile picture`}
        className={`mx-auto block size-28 transition-opacity ${pending ? "opacity-40" : ""}`}
      />
      <p id={hintId} className="mt-3 text-xs text-muted">
        JPEG, PNG or WebP, up to 2 MB
      </p>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}
      <div className="mt-5 flex gap-2">
        {picked ? (
          <>
            <button
              type="button"
              onClick={() => run(() => uploadProfileImage(picked.file), true)}
              disabled={pending}
              className={primaryClass}
            >
              {pending ? <SpinnerIcon label="Uploading" /> : "Apply"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={pending}
              className={`${secondaryClass} text-muted hover:text-foreground`}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <label
              className={`${primaryClass} cursor-pointer outline-offset-4 has-[input:disabled]:cursor-wait has-[input:disabled]:opacity-60 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-accent`}
            >
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleChange}
                disabled={pending}
                aria-describedby={hintId}
                className="sr-only"
              />
              Choose picture
            </label>
            {user.profileImage && (
              <button
                type="button"
                onClick={() => run(deleteProfileImage)}
                disabled={pending}
                className={`${secondaryClass} text-red-400 hover:bg-red-400/10`}
              >
                {pending ? <SpinnerIcon label="Removing" /> : "Remove picture"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
