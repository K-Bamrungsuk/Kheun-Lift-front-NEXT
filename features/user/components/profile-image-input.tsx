"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { errorMessage } from "@/lib/api";
import { deleteProfileImage, uploadProfileImage } from "../api";

// Same limit as Go; checked here too so the user sees the error at once.
const MAX_SIZE = 2 * 1024 * 1024;

export function ProfileImageInput({ hasImage }: { hasImage: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  // Which action the shared pending state belongs to, for the button labels.
  const [removing, setRemoving] = useState(false);
  // Pending lasts until router.refresh() shows the new image.
  const [pending, startTransition] = useTransition();

  function handleRemove() {
    setError("");
    setRemoving(true);
    startTransition(async () => {
      try {
        await deleteProfileImage();
        router.refresh();
      } catch (err) {
        setError(errorMessage(err));
      }
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const file = new FormData(form).get("profileImage") as File;
    if (file.size > MAX_SIZE) return setError("Image must be 2 MB or smaller.");

    setError("");
    setRemoving(false);
    startTransition(async () => {
      try {
        await uploadProfileImage(file);
        form.reset();
        router.refresh();
      } catch (err) {
        setError(errorMessage(err));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label htmlFor="profileImage" className="text-sm text-muted">
        Profile picture (JPEG, PNG or WebP, max 2 MB)
      </label>
      <input
        id="profileImage"
        name="profileImage"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        required
        className="block w-full min-w-0 text-sm text-muted file:mr-3 file:min-h-11 file:rounded-lg file:border-0 file:bg-surface-high file:px-3 file:text-foreground"
      />
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-4 font-semibold text-background disabled:opacity-60"
      >
        {pending && !removing ? "Uploading..." : "Upload picture"}
      </button>
      {hasImage && (
        <button
          type="button"
          onClick={handleRemove}
          disabled={pending}
          className="flex min-h-11 w-full items-center justify-center rounded-xl border border-border px-4 text-sm text-muted transition-colors hover:text-foreground disabled:opacity-60"
        >
          {pending && removing ? "Removing..." : "Remove picture"}
        </button>
      )}
    </form>
  );
}
