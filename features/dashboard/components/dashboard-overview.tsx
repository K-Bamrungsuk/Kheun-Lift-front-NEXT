import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { RandomLeaderboard } from "@/features/leaderboard/types";
import { LiftHistory } from "@/features/lifts/components/lift-history";
import { LiftValue } from "@/features/lifts/components/lift-value";
import { PersonalRecords } from "@/features/lifts/components/personal-records";
import type { LiftRecord } from "@/features/lifts/types";
import { AthleteCard } from "@/features/user/components/athlete-card";
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
  const board = leaderboard?.leaderboards;
  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-accent">
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
          <p className="text-[10px] uppercase tracking-widest text-accent">
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
                    <span className="w-5 shrink-0 text-sm text-accent">
                      {String(entry.rank).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm">
                      {entry.user.username}
                    </span>
                    <strong className="text-sm font-medium">
                      <LiftValue lift={entry} />
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
        <AthleteCard user={user} label="Athlete overview" />
      </div>
      <PersonalRecords lifts={lifts} />
      <LiftHistory
        lifts={lifts.slice(0, 5)}
        title="Recent lifts"
        viewAllHref="/profile#recent-activity"
        isOwner
      />
    </>
  );
}
