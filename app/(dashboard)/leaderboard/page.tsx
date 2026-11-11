import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { demoLeaderboard } from "@/features/leaderboard/data/demo";
import { demoAthlete } from "@/features/dashboard/data/demo";

export const metadata: Metadata = { title: "Leaderboard | Kheun Lift" };

export default function LeaderboardPage() {
  return (
    <>
      <header className="flex items-end justify-between gap-4"><div><p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">Strength, on the record</p><h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Leaderboard</h1><p className="mt-2 text-sm text-muted">A benchmark for your next personal best.</p></div><span className="hidden size-14 place-items-center rounded-xl bg-surface text-accent sm:grid"><Icon name="trophy" className="size-7" /></span></header>
      <section aria-labelledby="ranking-title" className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface p-4 md:p-5"><div><p className="font-mono text-[10px] uppercase tracking-widest text-muted">Discipline</p><h2 id="ranking-title" className="mt-1 text-xl font-semibold">{demoLeaderboard.exercise}</h2></div><span className="rounded-lg border border-accent/25 bg-accent/10 px-3 py-2 font-mono text-xs text-accent">{demoLeaderboard.weightClass}</span></div>
        <p className="text-xs leading-5 text-muted">Sample standings for this exercise and class. Ranking filters will be available when live rankings are connected.</p>
        <div className="overflow-hidden rounded-xl border border-border/60 bg-surface">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Sample {demoLeaderboard.exercise} rankings for {demoLeaderboard.weightClass}</caption>
            <thead className="border-b border-border bg-surface-low font-mono text-[10px] uppercase tracking-widest text-muted"><tr><th scope="col" className="w-16 px-3 py-4 font-medium md:px-5">Rank</th><th scope="col" className="px-3 py-4 font-medium md:px-5">Athlete</th><th scope="col" className="px-3 py-4 text-right font-medium md:px-5">Best lift</th></tr></thead>
            <tbody className="divide-y divide-border">
              {demoLeaderboard.entries.map((entry) => (
                <tr key={entry.rank} className={entry.athlete === demoAthlete.username ? "bg-accent/10" : ""}>
                  <td className="px-3 py-5 font-mono tabular-nums text-accent md:px-5">{String(entry.rank).padStart(2, "0")}</td>
                  <th scope="row" className="px-3 py-5 font-medium md:px-5"><span className="break-all">{entry.athlete}</span>{entry.athlete === demoAthlete.username && <span className="ml-2 rounded bg-surface-high px-1.5 py-1 font-mono text-[9px] uppercase text-accent">You</span>}</th>
                  <td className="whitespace-nowrap px-3 py-5 text-right font-mono text-base tabular-nums md:px-5">{entry.weight}<span className="ml-1 text-xs text-muted">kg</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <aside className="flex items-start gap-3 rounded-xl bg-surface-low p-4 text-sm leading-6 text-muted"><Icon name="shieldCheck" className="mt-0.5 size-5 shrink-0 text-accent" /><p>This is a preview of the rankings. These sample results do not represent official competition records.</p></aside>
      </section>
    </>
  );
}
