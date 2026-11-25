import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import {
  getLeaderboard,
  getWeightClasses,
} from "@/features/leaderboard/api-server";
import { MyRank } from "@/features/leaderboard/components/my-rank";
import { FilterPill, Pill } from "@/features/leaderboard/components/filter-pill";
import { LeaderboardHeader } from "@/features/leaderboard/components/leaderboard-header";
import { LeaderboardTable } from "@/features/leaderboard/components/leaderboard-table";
import { getExercises } from "@/features/lifts/api-server";
import { getMe } from "@/features/user/api-server";
import { isNotFound } from "@/lib/api";

export const metadata: Metadata = { title: "Leaderboard | Kheun Lift" };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

type Query = { [key: string]: string | string[] | undefined };

// Private cache lets the exercise links prefetch this page per user; the result stays in that user's browser.
async function loadLeaderboard(params: Query) {
  "use cache: private";
  cacheLife({ stale: 30 });

  // Go answers 400 or 404 for a bad gender, an unknown class, or a class of the other gender.
  const notFoundOnBadQuery = (error: unknown): never => {
    if (isNotFound(error)) notFound();
    throw error;
  };

  const exercises = await getExercises();
  const exerciseParam = first(params.exercise);
  const exercise = exerciseParam
    ? exercises.find((item) => String(item.id) === exerciseParam)
    : exercises[0];
  if (!exercise) notFound();

  const mePromise = getMe();
  const gender = first(params.gender) ?? (await mePromise).gender ?? "male";
  const classesPromise = getWeightClasses(gender).catch(notFoundOnBadQuery);
  // Pill links carry the class, so only a first visit or a gender switch waits for the default.
  const weightClass =
    first(params.weightClass) ??
    (await Promise.all([mePromise, classesPromise]).then(([me, classes]) => {
      const fallback = me.weightClass?.gender === gender ? me.weightClass : classes[0];
      return fallback ? String(fallback.id) : undefined;
    }));

  const [me, classes, entries] = await Promise.all([
    mePromise,
    classesPromise,
    getLeaderboard({ exerciseId: exercise.id, weightClassId: weightClass, gender }).catch(
      notFoundOnBadQuery,
    ),
  ]);
  return { me, exercises, exercise, gender, classes, weightClass, entries };
}

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const { me, exercises, exercise, gender, classes, weightClass, entries } =
    await loadLeaderboard(await searchParams);
  const classLabel = classes.find((item) => String(item.id) === weightClass)?.name;

  return (
    <>
      <LeaderboardHeader />
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
            {/* A new key remounts the pill after a pick, which closes its modal. */}
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
            {classLabel && (
              <FilterPill
                key={weightClass}
                id="class-title"
                title="Class"
                value={classLabel}
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
