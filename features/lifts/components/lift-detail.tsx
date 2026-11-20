import { youtubeEmbedUrl } from "@/lib/youtube";
import type { LiftRecord, LiftStatus } from "../types";
import { LiftOwnerActions } from "./lift-owner-actions";

const statusBadge = {
  verified: { glyph: "✓", color: "text-accent" },
  pending: { glyph: "◷", color: "text-muted" },
  rejected: { glyph: "⊘", color: "text-red-400" },
} satisfies Record<LiftStatus, { glyph: string; color: string }>;

export function LiftStatusBadge({ status }: { status: LiftStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-surface-high px-2 py-1 text-[11px] capitalize ${statusBadge[status].color}`}
    >
      <span aria-hidden="true">{statusBadge[status].glyph}</span>
      {status}
    </span>
  );
}

export function LiftDetail({ lift, isOwner }: { lift: LiftRecord; isOwner: boolean }) {
  const embed = lift.videoUrl && youtubeEmbedUrl(lift.videoUrl);

  return (
    <section aria-labelledby="lift-title" className="space-y-5 rounded-xl bg-surface p-5 md:p-7">
      <LiftOwnerActions lift={lift} isOwner={isOwner}>
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
      </LiftOwnerActions>
    </section>
  );
}
