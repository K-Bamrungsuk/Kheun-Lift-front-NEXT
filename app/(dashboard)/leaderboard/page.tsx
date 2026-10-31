import type { Metadata } from "next";

export const metadata: Metadata = { title: "Leaderboard | Kheun Lift" };

export default function LeaderboardPage() {
  return (
    <>
      <h1 className="text-3xl font-black md:text-4xl">Leaderboard</h1>
      <p className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-sm leading-6 text-zinc-400">Coming soon. Exercise rankings and weight class filters will be available here.</p>
    </>
  );
}
