import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { RandomLeaderboard } from "@/features/leaderboard/types";
import { getPersonalRecords } from "@/features/lifts/personal-record";
import type { LiftRecord } from "@/features/lifts/types";
import type { User } from "@/features/user/types";

export function PersonalRecords({ lifts }: { lifts: LiftRecord[] }) {
  return (
    <section aria-labelledby="records-title" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="records-title" className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">Personal records</h2>
        <span className="text-xs text-muted">Squat / Bench / Deadlift</span>
      </div>
      <dl className="grid grid-cols-3 gap-2.5">
        {getPersonalRecords(lifts).map(({ name, best }) => (
          <div key={name} className="min-w-0 rounded-xl bg-surface p-3 md:p-5">
            <dt className="text-xs text-muted">{name}</dt>
            <dd className="mt-3 font-mono text-2xl font-semibold tabular-nums tracking-tight md:text-3xl">{best ? best.weight : "—"}{best && <span className="ml-1 text-xs font-normal text-muted">kg</span>}</dd>
            <dd className="mt-2 font-mono text-[11px] text-muted">{best ? `${best.reps} rep max` : "No verified lift"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function LiftHistory({ lifts }: { lifts: LiftRecord[] }) {
  return (
    <section id="recent-activity" aria-labelledby="activity-title" className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 id="activity-title" className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">Lift ledger</h2>
        <span className="font-mono text-xs text-muted">{lifts.length} entries</span>
      </div>
      {lifts.length === 0 && <p className="rounded-xl bg-surface p-5 text-sm text-muted">No lifts yet. Log your first one.</p>}
      <div className="divide-y divide-border overflow-hidden rounded-xl bg-surface">
        {lifts.map((lift) => (
          <article key={lift.id} className="flex flex-wrap items-center justify-between gap-3 p-4 md:p-5">
            <div>
              <h3 className="font-semibold">{lift.exercise.name}</h3>
              <p className="mt-1 font-mono text-xl tabular-nums">{lift.weight}<span className="ml-1 text-xs text-muted">kg</span><span className="mx-2 text-sm text-muted">×</span>{lift.reps}<span className="ml-1 text-xs text-muted">rep</span></p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-md bg-surface-high px-2 py-1 font-mono text-[11px] capitalize ${lift.status === "verified" ? "text-accent" : "text-muted"}`}>
                <span aria-hidden="true">{lift.status === "verified" ? "✓" : "◷"}</span>{lift.status}
              </span>
              <time dateTime={lift.createdAt} className="font-mono text-[10px] text-muted">{lift.createdAt.slice(0, 10)}</time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DashboardOverview({ user, lifts, leaderboard }: { user: User; lifts: LiftRecord[]; leaderboard: RandomLeaderboard | null }) {
  // Go returns null instead of an empty board, so a non-null board always has a first row.
  const board = leaderboard?.leaderboards;
  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">Your training space</p><h1 className="text-2xl font-semibold tracking-tight md:text-4xl">Welcome back, {user.username}</h1><p className="mt-2 text-sm text-muted">Build strength. Keep the record.</p></div>
        <Link href="/log-lift" className="hidden min-h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-background transition-colors hover:bg-accent/90 md:flex"><Icon name="plus" />Log a lift</Link>
      </header>
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <section aria-labelledby="training-title" className="flex items-center justify-between gap-4 rounded-xl border border-accent/15 bg-surface p-5 md:p-6">
            <div><p className="font-mono text-[11px] uppercase tracking-widest text-muted">The big three</p><h2 id="training-title" className="mt-2 text-xl font-semibold">Every lift has a story.</h2><p className="mt-2 text-sm leading-6 text-muted">Your personal bests and recent attempts, all in one place.</p></div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/5 text-accent"><Icon name="dumbbell" className="size-7" /></span>
          </section>
          <PersonalRecords lifts={lifts} />
          <LiftHistory lifts={lifts.slice(0, 5)} />
          <aside className="flex items-center gap-3 rounded-xl bg-surface-low p-4"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface text-accent"><Icon name="shieldCheck" /></span><div><p className="font-mono text-[10px] uppercase tracking-widest text-muted">Discipline over everything</p><p className="mt-1 text-sm">Small improvements. Stronger foundations.</p></div></aside>
        </div>
        <aside className="min-w-0 space-y-6">
          <section aria-labelledby="athlete-title" className="rounded-xl bg-surface p-5">
            <div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-full border border-accent/30 bg-surface-high text-xl font-semibold text-accent">{user.username[0].toUpperCase()}</span><div><p className="font-mono text-[10px] uppercase tracking-widest text-muted">Athlete overview</p><h2 id="athlete-title" className="mt-1 text-lg font-semibold">{user.username}</h2></div></div>
            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4"><div><dt className="text-xs text-muted">Body weight</dt><dd className="mt-1 font-mono text-sm">{user.bodyWeight != null ? `${user.bodyWeight} kg` : "—"}</dd></div><div><dt className="text-xs text-muted">Weight class</dt><dd className="mt-1 font-mono text-sm text-accent">{user.weightClass?.name ?? "—"}</dd></div></dl>
            <Link href="/profile" className="mt-4 flex min-h-11 items-center justify-between rounded-lg bg-surface-high px-3 text-sm transition-colors hover:bg-border">View profile<Icon name="arrowRight" className="size-4" /></Link>
          </section>
          <section aria-labelledby="leaderboard-title" className="rounded-xl bg-surface p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">The leaderboard</p>
            <div className="mt-2 flex items-center justify-between gap-3"><h2 id="leaderboard-title" className="text-lg font-semibold">{board ? board[0].exercise.name : "No rankings yet"}</h2><Icon name="trophy" className="size-5 text-accent" /></div>
            {board ? (
              <>
                <p className="mt-1 text-xs text-muted">{board[0].weightClass.name}</p>
                <ol className="mt-4 divide-y divide-border">
                  {board.slice(0, 3).map((entry) => (
                    <li key={entry.id} className="flex items-center gap-3 py-4"><span className="w-5 shrink-0 font-mono text-sm text-accent">{String(entry.rank).padStart(2, "0")}</span><span className="min-w-0 flex-1 truncate text-sm">{entry.user.username}</span><strong className="whitespace-nowrap font-mono text-sm font-medium tabular-nums">{entry.weight}<span className="ml-1 text-[10px] text-muted">kg</span></strong></li>
                  ))}
                </ol>
              </>
            ) : (
              <p className="mt-4 text-sm text-muted">No verified lifts yet.</p>
            )}
            <Link href="/leaderboard" className="mt-2 flex min-h-11 items-center justify-between rounded-lg bg-surface-high px-3 text-sm transition-colors hover:bg-border">View leaderboard<Icon name="arrowRight" className="size-4" /></Link>
          </section>
        </aside>
      </div>
    </>
  );
}
