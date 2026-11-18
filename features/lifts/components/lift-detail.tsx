import { notFound } from "next/navigation";
import type { Variant } from "@/components/ui/modal";
import { getMe } from "@/features/user/api-server";
import { isNotFound } from "@/lib/api";
import { youtubeEmbedUrl } from "@/lib/youtube";
import { getLift } from "../api-server";
import { LiftOwnerActions } from "./lift-owner-actions";

export async function LiftDetail({ id, variant }: { id: string; variant: Variant }) {
  const [me, lift] = await Promise.all([
    getMe(),
    getLift(id).catch((error) => {
      if (isNotFound(error)) notFound();
      throw error;
    }),
  ]);
  const isOwner = lift.userId === me.id;
  // shortcut: Go returns every status to any signed-in user, this only hides it; filter in Go (see PLAN.md).
  if (!isOwner && lift.status !== "verified") notFound();
  const embed = lift.videoUrl && youtubeEmbedUrl(lift.videoUrl);

  return (
    <section aria-labelledby="lift-title" className="space-y-5 rounded-xl bg-surface p-5 md:p-7">
      <LiftOwnerActions
        lift={lift}
        isOwner={isOwner}
        variant={variant}
      >
        <header>
          <h2 id="lift-title" className="text-xl font-semibold">
            {lift.exercise.name}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {lift.weightClass.name} · <span className="capitalize">{lift.status}</span>
          </p>
        </header>
        <p className="text-3xl tabular-nums">
          {lift.weight}
          <span className="ml-1 text-sm text-muted">kg</span>
          <span className="mx-2 text-lg text-muted">×</span>
          {lift.reps}
          <span className="ml-1 text-sm text-muted">rep</span>
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
