import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { demoLeaderboard } from "@/features/leaderboard/data/demo";
import { demoAthlete, personalRecords, recentActivity } from "../data/demo";

const rankColors = [
  "bg-yellow-400 text-black",
  "bg-slate-300 text-slate-950",
  "bg-orange-800 text-orange-100",
];

export function DashboardOverview() {
  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-black md:text-4xl">Home</h1>
        <span className="rounded-2xl bg-yellow-400 p-3 text-black md:hidden"><Icon name="dumbbell" className="size-[22px]" /></span>
      </header>
      <p role="note" className="text-xs leading-5 text-zinc-400"><span className="font-semibold text-yellow-400">Demo mode</span> · Preview with sample data. Lift submission is not connected yet.</p>

      <div className="grid gap-4 md:grid-cols-[320px_1fr]">
        <div className="min-w-0 space-y-4">
          <section id="profile" aria-labelledby="profile-title" className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
            <div className="flex items-center gap-4 p-5 md:p-6">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-yellow-400 text-xl font-black text-black shadow-lg shadow-yellow-400/10 md:size-16">K</div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-yellow-400">Profile</p>
                <h2 id="profile-title" className="mt-1 truncate text-xl font-black">{demoAthlete.username}</h2>
                <p className="mt-0.5 text-sm text-zinc-500">Sample profile</p>
              </div>
            </div>
            <dl className="border-t border-zinc-800 bg-black/30 px-5 md:px-6">
              <div className="flex items-center gap-3 border-b border-zinc-800 py-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-zinc-900 text-zinc-400"><Icon name="user" className="size-[17px]" /></span>
                <div><dt className="text-xs text-zinc-500">Gender</dt><dd className="mt-0.5 text-sm font-bold text-zinc-200">{demoAthlete.gender}</dd></div>
              </div>
              <div className="flex items-center gap-3 border-b border-zinc-800 py-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-zinc-900 text-zinc-400"><Icon name="weight" className="size-[17px]" /></span>
                <div><dt className="text-xs text-zinc-500">Body weight</dt><dd className="mt-0.5 text-sm font-bold text-zinc-200">{demoAthlete.bodyWeight}</dd></div>
              </div>
              <div className="flex items-center gap-3 py-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-yellow-400/10 text-yellow-400"><Icon name="trophy" className="size-[17px]" /></span>
                <div><dt className="text-xs text-zinc-500">Weight class</dt><dd className="mt-0.5 text-sm font-bold text-yellow-400">{demoAthlete.weightClass}</dd></div>
              </div>
            </dl>
          </section>

          <section id="recent-activity" aria-labelledby="activity-title" className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 id="activity-title" className="mb-3 font-bold">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((lift) => (
                <article key={lift.id} className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-800 bg-black p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${lift.status === "Verified" ? "bg-green-400" : "bg-yellow-400"}`} />
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold">{lift.exercise}</h3>
                      <p className="text-xs text-zinc-400">{lift.reps} rep · <time dateTime={lift.date}>{lift.date}</time></p>
                      <p className="mt-1 text-[11px] text-zinc-500">{lift.status}</p>
                    </div>
                  </div>
                  <strong className="whitespace-nowrap text-sm text-yellow-400">{lift.weight} kg</strong>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <section id="leaderboard" aria-labelledby="leaderboard-title" className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-8">
            <div className="mb-5 flex items-end justify-between border-b border-zinc-800 pb-5">
              <div><p className="text-xs uppercase tracking-widest text-zinc-500">Leaderboard</p><h2 id="leaderboard-title" className="mt-1 text-xl font-bold">{demoLeaderboard.exercise}</h2></div>
              <span className="rounded-xl bg-yellow-400/10 px-3 py-2 text-xs font-bold text-yellow-400">Top 3</span>
            </div>
            <ol className="space-y-3">
              {demoLeaderboard.entries.slice(0, 3).map((entry, index) => (
                <li key={entry.rank} className="grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-2xl border border-zinc-800 bg-black p-4">
                  <span className={`grid size-10 place-items-center rounded-xl font-black ${rankColors[index]}`}>#{entry.rank}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{entry.athlete}</p>
                    <p className="mt-1 text-xs text-yellow-400">Class: {demoLeaderboard.weightClass}</p>
                  </div>
                  <strong className="whitespace-nowrap text-sm text-yellow-400">{entry.weight} kg</strong>
                </li>
              ))}
            </ol>
          </section>

          <div className="order-first grid grid-cols-2 gap-3 md:order-none">
            <button type="button" disabled title="Lift submission is not connected yet" className="cursor-not-allowed rounded-2xl bg-yellow-400 py-4 font-bold text-black">Submit Lift</button>
            <Link href="/leaderboard" className="rounded-2xl border border-zinc-800 bg-zinc-950 py-4 text-center font-bold hover:border-zinc-400">Leaderboard</Link>
          </div>

          <section id="personal-records" aria-labelledby="records-title" className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-8">
            <h2 id="records-title" className="mb-4 font-bold">Personal records</h2>
            <dl className="grid grid-cols-3 gap-3">
              {personalRecords.map((record) => (
                <div key={record.exercise} className="rounded-2xl border border-zinc-800 bg-black p-3">
                  <dt className="text-xs text-zinc-400">{record.exercise}</dt>
                  <dd className="mt-2 text-lg font-black text-yellow-400">{record.weight} <span className="text-xs font-normal text-zinc-400">kg</span></dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </>
  );
}
