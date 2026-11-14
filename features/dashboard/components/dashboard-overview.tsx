import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { RandomLeaderboard } from "@/features/leaderboard/types";
import { LiftHistory } from "@/features/lifts/components/lift-history";
import { PersonalRecords } from "@/features/lifts/components/personal-records";
import type { LiftRecord } from "@/features/lifts/types";
import type { User } from "@/features/user/types";

export function DashboardOverview({
  user,
  lifts,
  leaderboard,
}: {
  user: User;
  lifts: LiftRecord[];
  leaderboard: RandomLeaderboard | null;
}) {
  // Go returns null instead of an empty board, so a non-null board always has a first row.
  const board = leaderboard?.leaderboards;
  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
            Your training space
          </p>
          <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
            Welcome back, {user.username}
          </h1>
          <p className="mt-2 text-sm text-muted">
            Build strength. Keep the record.
          </p>
        </div>
      </header>
      <div className="grid items-start gap-6 md:grid-cols-2">
        <section
          aria-labelledby="leaderboard-title"
          className="rounded-xl bg-surface p-5"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
            The leaderboard
          </p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <h2 id="leaderboard-title" className="text-lg font-semibold">
              {board ? board[0].exercise.name : "No rankings yet"}
            </h2>
            <Icon name="trophy" className="size-5 text-accent" />
          </div>
          {board ? (
            <>
              <p className="mt-1 text-xs text-muted">
                {board[0].weightClass.name}
              </p>
              <ol className="mt-4 divide-y divide-border">
                {board.slice(0, 3).map((entry) => (
                  <li key={entry.id} className="flex items-center gap-3 py-4">
                    <span className="w-5 shrink-0 font-mono text-sm text-accent">
                      {String(entry.rank).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm">
                      {entry.user.username}
                    </span>
                    <strong className="whitespace-nowrap font-mono text-sm font-medium tabular-nums">
                      {entry.weight}
                      <span className="ml-1 text-[10px] text-muted">kg</span>
                    </strong>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <p className="mt-4 text-sm text-muted">No verified lifts yet.</p>
          )}
          <Link
            href="/leaderboard"
            className="mt-2 flex min-h-11 items-center justify-between rounded-lg bg-surface-high px-3 text-sm transition-colors hover:bg-border"
          >
            View leaderboard
            <Icon name="arrowRight" className="size-4" />
          </Link>
        </section>
        <section
          aria-labelledby="athlete-title"
          className="rounded-xl bg-surface p-5"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-full border border-accent/30 bg-surface-high text-xl font-semibold text-accent">
              {user.username[0].toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Athlete overview
              </p>
              <h2
                id="athlete-title"
                className="mt-1 truncate text-lg font-semibold"
              >
                {user.username}
              </h2>
              {user.weightClass && (
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
                  <Icon name="trophy" className="size-3.5" />
                  <span className="sr-only">Weight class: </span>
                  {user.weightClass.name}
                </p>
              )}
            </div>
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-2.5">
            <div className="rounded-lg bg-surface-high p-3">
              <dt className="flex items-center gap-1.5 text-xs text-muted">
                <Icon name="user" className="size-4" />
                Gender
              </dt>
              <dd className="mt-2 text-sm capitalize">{user.gender ?? "—"}</dd>
            </div>
            <div className="rounded-lg bg-surface-high p-3">
              <dt className="flex items-center gap-1.5 text-xs text-muted">
                <Icon name="weight" className="size-4" />
                Body weight
              </dt>
              <dd className="mt-2 font-mono text-sm">
                {user.bodyWeight != null ? `${user.bodyWeight} kg` : "—"}
              </dd>
            </div>
          </dl>
        </section>
      </div>
      <PersonalRecords lifts={lifts} />
      <LiftHistory lifts={lifts.slice(0, 5)} />
    </>
  );
}
