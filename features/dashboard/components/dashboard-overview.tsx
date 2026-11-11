import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { demoLeaderboard } from "@/features/leaderboard/data/demo";
import { demoAthlete, personalRecords, recentActivity } from "../data/demo";

export function PersonalRecords() {
  return (
    <section aria-labelledby="records-title" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="records-title" className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">Personal records</h2>
        <span className="text-xs text-muted">Squat / Bench / Deadlift</span>
      </div>
      <dl className="grid grid-cols-3 gap-2.5">
        {personalRecords.map((record) => (
          <div key={record.exercise} className="min-w-0 rounded-xl bg-surface p-3 md:p-5">
            <dt className="text-xs text-muted">{record.exercise}</dt>
            <dd className="mt-3 font-mono text-2xl font-semibold tabular-nums tracking-tight md:text-3xl">{record.weight}<span className="ml-1 text-xs font-normal text-muted">kg</span></dd>
            <dd className="mt-2 font-mono text-[11px] text-muted">{record.reps} rep max</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function LiftHistory() {
  return (
    <section id="recent-activity" aria-labelledby="activity-title" className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 id="activity-title" className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">Lift ledger</h2>
        <span className="font-mono text-xs text-muted">{recentActivity.length} entries</span>
      </div>
      <div className="divide-y divide-border overflow-hidden rounded-xl bg-surface">
        {recentActivity.map((lift) => (
          <article key={lift.id} className="flex flex-wrap items-center justify-between gap-3 p-4 md:p-5">
            <div>
              <h3 className="font-semibold">{lift.exercise}</h3>
              <p className="mt-1 font-mono text-xl tabular-nums">{lift.weight}<span className="ml-1 text-xs text-muted">kg</span><span className="mx-2 text-sm text-muted">×</span>{lift.reps}<span className="ml-1 text-xs text-muted">rep</span></p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-md bg-surface-high px-2 py-1 font-mono text-[11px] ${lift.status === "Verified" ? "text-accent" : "text-muted"}`}>
                <span aria-hidden="true">{lift.status === "Verified" ? "✓" : "◷"}</span>{lift.status}
              </span>
              <time dateTime={lift.date} className="font-mono text-[10px] text-muted">{lift.date}</time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DashboardOverview() {
  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">Your training space</p><h1 className="text-2xl font-semibold tracking-tight md:text-4xl">Welcome back, {demoAthlete.username}</h1><p className="mt-2 text-sm text-muted">Build strength. Keep the record.</p></div>
        <Link href="/log-lift" className="hidden min-h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-background transition-colors hover:bg-accent/90 md:flex"><Icon name="plus" />Log a lift</Link>
      </header>
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <section aria-labelledby="training-title" className="flex items-center justify-between gap-4 rounded-xl border border-accent/15 bg-surface p-5 md:p-6">
            <div><p className="font-mono text-[11px] uppercase tracking-widest text-muted">The big three</p><h2 id="training-title" className="mt-2 text-xl font-semibold">Every lift has a story.</h2><p className="mt-2 text-sm leading-6 text-muted">Your personal bests and recent attempts, all in one place.</p></div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/5 text-accent"><Icon name="dumbbell" className="size-7" /></span>
          </section>
          <PersonalRecords />
          <LiftHistory />
          <aside className="flex items-center gap-3 rounded-xl bg-surface-low p-4"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface text-accent"><Icon name="shieldCheck" /></span><div><p className="font-mono text-[10px] uppercase tracking-widest text-muted">Discipline over everything</p><p className="mt-1 text-sm">Small improvements. Stronger foundations.</p></div></aside>
        </div>
        <aside className="min-w-0 space-y-6">
          <section aria-labelledby="athlete-title" className="rounded-xl bg-surface p-5">
            <div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-full border border-accent/30 bg-surface-high text-xl font-semibold text-accent">K</span><div><p className="font-mono text-[10px] uppercase tracking-widest text-muted">Athlete overview</p><h2 id="athlete-title" className="mt-1 text-lg font-semibold">{demoAthlete.username}</h2></div></div>
            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4"><div><dt className="text-xs text-muted">Body weight</dt><dd className="mt-1 font-mono text-sm">{demoAthlete.bodyWeight}</dd></div><div><dt className="text-xs text-muted">Weight class</dt><dd className="mt-1 font-mono text-sm text-accent">{demoAthlete.weightClass}</dd></div></dl>
            <Link href="/profile" className="mt-4 flex min-h-11 items-center justify-between rounded-lg bg-surface-high px-3 text-sm transition-colors hover:bg-border">View profile<Icon name="arrowRight" className="size-4" /></Link>
          </section>
          <section aria-labelledby="leaderboard-title" className="rounded-xl bg-surface p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">The leaderboard</p>
            <div className="mt-2 flex items-center justify-between gap-3"><h2 id="leaderboard-title" className="text-lg font-semibold">{demoLeaderboard.exercise}</h2><Icon name="trophy" className="size-5 text-accent" /></div>
            <p className="mt-1 text-xs text-muted">{demoLeaderboard.weightClass}</p>
            <ol className="mt-4 divide-y divide-border">
              {demoLeaderboard.entries.slice(0, 3).map((entry) => (
                <li key={entry.rank} className="flex items-center gap-3 py-4"><span className="w-5 shrink-0 font-mono text-sm text-accent">0{entry.rank}</span><span className="min-w-0 flex-1 truncate text-sm">{entry.athlete}</span><strong className="whitespace-nowrap font-mono text-sm font-medium tabular-nums">{entry.weight}<span className="ml-1 text-[10px] text-muted">kg</span></strong></li>
              ))}
            </ol>
            <Link href="/leaderboard" className="mt-2 flex min-h-11 items-center justify-between rounded-lg bg-surface-high px-3 text-sm transition-colors hover:bg-border">View leaderboard<Icon name="arrowRight" className="size-4" /></Link>
          </section>
        </aside>
      </div>
    </>
  );
}
