import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { LeaderboardHeader } from "@/features/leaderboard/components/leaderboard-header";
import {
  ExerciseTabs,
  LeaderboardFilters,
} from "@/features/leaderboard/components/leaderboard-filters";
import { LeaderboardTable } from "@/features/leaderboard/components/leaderboard-table";
import { MyRank } from "@/features/leaderboard/components/my-rank";
import { loadLeaderboard } from "@/features/leaderboard/load-leaderboard";
import { getMe } from "@/features/user/api-server";
import { isNotFound } from "@/lib/api";

export const metadata: Metadata = { title: "Leaderboard | Kheun Lift" };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [params, me] = await Promise.all([searchParams, getMe()]);
  // Go answers 400 or 404 for a bad gender, an unknown class, or a class of the other gender.
  const { exercises, exercise, gender, classes, weightClass, entries } =
    await loadLeaderboard(
      {
        exercise: first(params.exercise),
        gender: first(params.gender),
        weightClass: first(params.weightClass),
      },
      me,
    ).catch((error: unknown) => {
      if (isNotFound(error)) notFound();
      throw error;
    });
  const classLabel = classes.find((item) => String(item.id) === weightClass)?.name;

  return (
    <>
      <LeaderboardHeader />
      <section aria-label="Rankings" className="space-y-5">
        <ExerciseTabs
          exercises={exercises}
          current={exercise.id}
          gender={gender}
          weightClass={weightClass}
        />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <LeaderboardFilters
            exerciseId={exercise.id}
            gender={gender}
            classes={classes}
            weightClass={weightClass}
            classLabel={classLabel}
          />
          {entries.length > 0 && (
            <p className="ml-auto flex items-center gap-2 text-sm text-muted">
              <Icon name="users" className="size-4 text-accent" />
              <span>
                <span className="font-semibold tabular-nums text-accent">
                  {entries.length}
                </span>{" "}
                lifters in this class
              </span>
            </p>
          )}
        </div>
        <MyRank entries={entries} meId={me.id} />
        {entries.length === 0 ? (
          <p className="rounded-xl bg-surface p-5 text-sm text-muted">
            No verified lifts yet for this exercise and class.
          </p>
        ) : (
          <LeaderboardTable
            entries={entries}
            meId={me.id}
            caption={`${exercise.name} rankings, ${gender} ${classLabel}`}
          />
        )}
        <aside className="flex items-start gap-3 rounded-xl bg-surface-low p-4 text-sm leading-6 text-muted">
          <Icon
            name="shieldCheck"
            className="mt-0.5 size-5 shrink-0 text-accent"
          />
          <p>
            Only verified lifts are ranked. Each athlete appears once, with
            their best lift.
          </p>
        </aside>
      </section>
    </>
  );
}
