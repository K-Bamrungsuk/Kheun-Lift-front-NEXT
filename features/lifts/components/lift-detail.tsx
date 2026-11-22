"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { SpinnerIcon } from "@/components/ui/spinner";
import { useCloseModal } from "@/components/ui/modal";
import { errorMessage } from "@/lib/api";
import { youtubeEmbedUrl } from "@/lib/youtube";
import { updateLiftCaption } from "../api";
import { formatLiftDate } from "../format-date";
import type { LiftRecord } from "../types";
import { DeleteLiftDialog } from "./delete-lift-dialog";
import { LiftMenu } from "./lift-menu";
import { LiftStatusBadge } from "./lift-status-badge";

export function LiftDetail({ lift, isOwner }: { lift: LiftRecord; isOwner: boolean }) {
  const router = useRouter();
  const close = useCloseModal();
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [caption, setCaption] = useState(lift.caption);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const embed = lift.videoUrl && youtubeEmbedUrl(lift.videoUrl);

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
    close?.();
    router.refresh();
  }

  return (
    <section aria-labelledby="lift-title" className="space-y-5 rounded-xl bg-surface p-5 md:p-7">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar src={lift.user.profileImage} alt="" className="size-12" />
            <div className="min-w-0">
              <Link
                href={isOwner ? "/profile" : `/users/${lift.userId}`}
                className="block truncate text-base font-semibold underline-offset-4 hover:underline"
              >
                {lift.user.username}
              </Link>
              <time dateTime={lift.createdAt} className="block text-sm text-muted">
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
          <CaptionForm
            caption={caption}
            saving={saving}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditing(false);
              setError("");
            }}
          />
        ) : (
          caption && (
            <p className="whitespace-pre-line break-words text-base leading-6">{caption}</p>
          )
        )}
      </div>
      <div className="space-y-4 border-t border-border pt-5">
        <header className="flex items-start justify-between gap-3">
          <h2 id="lift-title" className="text-xs font-semibold uppercase tracking-widest text-muted">
            {lift.exercise.name} · {lift.weightClass.name} class
          </h2>
          <LiftStatusBadge status={lift.status} />
        </header>
        <p className="flex items-baseline gap-1.5 tabular-nums">
          <span className="text-5xl font-semibold text-accent">{lift.weight}</span>
          <span className="text-sm text-muted">kg</span>
          <span className="ml-2 text-2xl text-muted">×</span>
          <span className="text-3xl">{lift.reps}</span>
          <span className="text-sm text-muted">rep</span>
        </p>
        {embed ? (
          <iframe
            src={embed}
            title={`${lift.exercise.name} video`}
            loading="lazy"
            allow="encrypted-media; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full rounded-lg bg-background"
          />
        ) : (
          lift.videoUrl && (
            <a
              href={lift.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 px-4 text-sm text-accent"
            >
              Open video
            </a>
          )
        )}
      </div>
      {error && (
        <p role="alert" className="text-sm text-danger">
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
    </section>
  );
}

function CaptionForm({
  caption,
  saving,
  onSubmit,
  onCancel,
}: {
  caption: string | null;
  saving: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-3 text-sm">
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
          onClick={onCancel}
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
  );
}
