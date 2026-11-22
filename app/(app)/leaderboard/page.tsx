import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import {
  getLeaderboard,
  getWeightClasses,
} from "@/features/leaderboard/api-server";
import { MyRank } from "@/features/leaderboard/components/my-rank";
import { FilterPill, Pill } from "@/features/leaderboard/components/pill";
import { RankHeader } from "@/features/leaderboard/components/rank-header";
import {
  LiftValue,
  RankingTable,
} from "@/features/leaderboard/components/ranking-table";
import { getExercises } from "@/features/lifts/api-server";
import { getMe } from "@/features/user/api-server";
import { isNotFound } from "@/lib/api";

export const metadata: Metadata = { title: "Rank | Kheun Lift" };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const exerciseParam = first(params.exercise);
  // Go answers 400 or 404 for a bad gender, an unknown class, or a class of the other gender.
  const notFoundOnBadQuery = (error: unknown): never => {
    if (isNotFound(error)) notFound();
    throw error;
  };

  const [me, exercises] = await Promise.all([getMe(), getExercises()]);
  const exercise = exerciseParam
    ? exercises.find((item) => String(item.id) === exerciseParam)
    : exercises[0];
  if (!exercise) notFound();

  const gender = first(params.gender) ?? me.gender ?? "male";
  const classes = await getWeightClasses(gender).catch(notFoundOnBadQuery);
  const defaultClass =
    me.weightClass?.gender === gender ? me.weightClass : classes[0];
  const weightClass =
    first(params.weightClass) ??
    (defaultClass ? String(defaultClass.id) : undefined);

  const entries = await getLeaderboard({
    exerciseId: exercise.id,
    weightClassId: weightClass,
    gender,
  }).catch(notFoundOnBadQuery);

  const className = classes.find((item) => String(item.id) === weightClass)?.name;

  return (
    <>
      <RankHeader />
      <section aria-label="Rankings" className="space-y-5">
        <nav
          aria-label="Exercise"
          className="grid grid-cols-3 gap-1 rounded-xl border border-border bg-surface-low p-1 text-sm sm:max-w-md sm:text-base"
        >
          {exercises.map((item) => (
            <Pill
              key={item.id}
              segment
              query={{ exercise: item.id, gender, weightClass }}
              active={item.id === exercise.id}
            >
              {item.name}
            </Pill>
          ))}
        </nav>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <FilterPill
              key={gender}
              id="gender-title"
              title="Gender"
              value={gender === "male" ? "Male" : "Female"}
            >
              <nav aria-label="Gender" className="grid grid-cols-2 gap-2">
                <Pill
                  query={{ exercise: exercise.id, gender: "male" }}
                  active={gender === "male"}
                >
                  Male
                </Pill>
                <Pill
                  query={{ exercise: exercise.id, gender: "female" }}
                  active={gender === "female"}
                >
                  Female
                </Pill>
              </nav>
            </FilterPill>
            {className && (
              <FilterPill
                key={weightClass}
                id="class-title"
                title="Class"
                value={className}
              >
                <nav aria-label="Weight class" className="grid grid-cols-4 gap-2">
                  {classes.map((item) => (
                    <Pill
                      key={item.id}
                      query={{ exercise: exercise.id, gender, weightClass: item.id }}
                      active={String(item.id) === weightClass}
                    >
                      {item.name}
                    </Pill>
                  ))}
                </nav>
              </FilterPill>
            )}
          </div>
          {entries.length > 0 && (
            <dl className="flex gap-6 sm:text-right">
              <div>
                <dt className="text-xs text-muted">Record</dt>
                <dd className="text-lg font-semibold text-accent">
                  <LiftValue lift={entries[0]} />
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Athletes</dt>
                <dd className="text-lg font-semibold tabular-nums">
                  {entries.length}
                </dd>
              </div>
            </dl>
          )}
        </div>
        <MyRank entries={entries} meId={me.id} />
        {entries.length === 0 ? (
          <p className="rounded-xl bg-surface p-5 text-sm text-muted">
            No verified lifts yet for this exercise and class.
          </p>
        ) : (
          <RankingTable
            entries={entries}
            meId={me.id}
            caption={`${exercise.name} rankings, ${gender} ${className}`}
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
