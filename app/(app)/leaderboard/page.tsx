import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import {
  getLeaderboard,
  getWeightClasses,
} from "@/features/leaderboard/api-server";
import { getExercises } from "@/features/lifts/api-server";
import { getMe } from "@/features/user/api-server";
import { ApiError } from "@/lib/api";

export const metadata: Metadata = { title: "Rank | Kheun Lift" };

type Query = { exercise?: string | number; gender?: string; weightClass?: string | number };

function href(query: Query) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query))
    if (value !== undefined) params.set(key, String(value));
  return `/leaderboard?${params}`;
}

function Pill({
  query,
  active,
  children,
}: {
  query: Query;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href(query)}
      aria-current={active ? "true" : undefined}
      className={`flex min-h-11 items-center rounded-lg border px-3 text-sm transition-colors ${
        active
          ? "border-accent/25 bg-accent/10 text-accent"
          : "border-border bg-surface text-muted hover:bg-surface-high"
      }`}
    >
      {children}
    </Link>
  );
}

// Ranks 1 to 3 get gold, silver and bronze. Ranks 4 and 5 get a gold ring. Lower ranks are plain.
const medals = [
  "bg-accent text-background",
  "bg-[#c3ccd9] text-background",
  "bg-[#c58f61] text-background",
];
const rankStyle = (rank: number) =>
  medals[rank - 1] ??
  (rank <= 5 ? "border border-accent text-accent" : "text-muted");

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
    if (error instanceof ApiError && [400, 404].includes(error.status))
      notFound();
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
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-accent">
            Strength, on the record
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Rank
          </h1>
          <p className="mt-2 text-sm text-muted">
            A benchmark for your next personal best.
          </p>
        </div>
        <span className="hidden size-14 place-items-center rounded-xl bg-surface text-accent sm:grid">
          <Icon name="trophy" className="size-7" />
        </span>
      </header>
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
          <div className="overflow-hidden rounded-xl border border-border/60 bg-surface">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                {exercise.name} rankings for {className}
              </caption>
              <thead className="border-b border-border bg-surface-low text-[10px] uppercase tracking-widest text-muted">
                <tr>
                  <th
                    scope="col"
                    className="w-16 px-3 py-4 font-medium md:px-5"
                  >
                    Rank
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium md:px-5">
                    Athlete
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4 text-right font-medium md:px-5"
                  >
                    Best lift
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {entries.map((entry) => (
                  <tr
                    key={entry.id}
                    className={entry.userId === me.id ? "bg-accent/10" : ""}
                  >
                    <td className="px-3 py-5 tabular-nums md:px-5">
                      <span
                        className={`grid size-8 place-items-center rounded-full text-xs font-semibold ${rankStyle(entry.rank)}`}
                      >
                        {String(entry.rank).padStart(2, "0")}
                      </span>
                    </td>
                    <th
                      scope="row"
                      className={`px-3 py-5 md:px-5 ${entry.rank <= 3 ? "font-bold" : "font-medium"}`}
                    >
                      <Link
                        href={entry.userId === me.id ? "/profile" : `/users/${entry.userId}`}
                        className="break-all underline-offset-4 hover:underline"
                      >
                        {entry.user.username}
                      </Link>
                      {entry.rank === 1 && (
                        <Icon
                          name="trophy"
                          className="ml-2 inline size-4 text-accent"
                        />
                      )}
                      {entry.userId === me.id && (
                        <span className="ml-2 rounded bg-surface-high px-1.5 py-1 text-[9px] uppercase text-accent">
                          You
                        </span>
                      )}
                    </th>
                    <td
                      className={`whitespace-nowrap px-3 py-5 text-right text-base tabular-nums md:px-5 ${entry.rank <= 3 ? "font-bold" : ""}`}
                    >
                      <Link
                        href={`/lifts/${entry.id}`}
                        aria-label={`${entry.weight} kg lift by ${entry.user.username}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {entry.weight}
                        <span className="ml-1 text-xs text-muted">kg</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
