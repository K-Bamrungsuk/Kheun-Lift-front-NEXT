import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import {
  getLeaderboard,
  getWeightClasses,
} from "@/features/leaderboard/api-server";
import { Pill } from "@/features/leaderboard/components/pill";
import { RankHeader } from "@/features/leaderboard/components/rank-header";
import { RankingTable } from "@/features/leaderboard/components/ranking-table";
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
  const gender = first(params.gender);
  // The class row only shows for a chosen gender, so a class without one is ignored.
  const weightClass = gender ? first(params.weightClass) : undefined;

  // Go answers 400 or 404 for a bad gender, an unknown class, or a class of the other gender.
  const notFoundOnBadQuery = (error: unknown): never => {
    if (isNotFound(error)) notFound();
    throw error;
  };

  // Weight classes need only the gender, so they load together with the user and exercises.
  const [me, exercises, classes] = await Promise.all([
    getMe(),
    getExercises(),
    gender ? getWeightClasses(gender) : [],
  ]).catch(notFoundOnBadQuery);
  const exercise = exerciseParam
    ? exercises.find((item) => String(item.id) === exerciseParam)
    : exercises[0];
  if (!exercise) notFound();

  const entries = await getLeaderboard({
    exerciseId: exercise.id,
    weightClassId: weightClass,
    gender,
  }).catch(notFoundOnBadQuery);

  const className =
    classes.find((item) => String(item.id) === weightClass)?.name ??
    (gender === "male"
      ? "All male classes"
      : gender === "female"
        ? "All female classes"
        : "All classes");

  return (
    <>
      <RankHeader />
      <section aria-labelledby="ranking-title" className="space-y-5">
        <div className="space-y-3">
          <nav aria-label="Exercise" className="flex flex-wrap gap-2">
            {exercises.map((item) => (
              <Pill
                key={item.id}
                query={{ exercise: item.id, gender, weightClass }}
                active={item.id === exercise.id}
              >
                {item.name}
              </Pill>
            ))}
          </nav>
          <nav aria-label="Gender" className="flex flex-wrap gap-2">
            <Pill query={{ exercise: exercise.id }} active={!gender}>
              All
            </Pill>
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
          {classes.length > 0 && (
            <nav aria-label="Weight class" className="flex flex-wrap gap-2">
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
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface p-4 md:p-5">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted">
              Discipline
            </p>
            <h2 id="ranking-title" className="mt-1 text-xl font-semibold">
              {exercise.name}
            </h2>
          </div>
          <span className="rounded-lg border border-accent/25 bg-accent/10 px-3 py-2 text-xs text-accent">
            {className}
          </span>
        </div>
        {entries.length === 0 ? (
          <p className="rounded-xl bg-surface p-5 text-sm text-muted">
            No verified lifts yet for this exercise and class.
          </p>
        ) : (
          <RankingTable
            entries={entries}
            meId={me.id}
            caption={`${exercise.name} rankings for ${className}`}
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
