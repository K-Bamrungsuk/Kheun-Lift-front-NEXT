import type { Metadata } from "next";
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview";
import type { RandomLeaderboard } from "@/features/leaderboard/types";
import type { LiftRecord } from "@/features/lifts/types";
import { getMe } from "@/features/user/api-server";
import { serverFetch } from "@/lib/api-server";

export const metadata: Metadata = { title: "Dashboard | Kheun Lift" };

export default async function DashboardPage() {
  const [user, lifts, leaderboard] = await Promise.all([
    getMe(),
    serverFetch<{ data: LiftRecord[] }>("/lifts/me").then((res) => res.data),
    serverFetch<{ data: RandomLeaderboard | null }>("/leaderboards/random").then((res) => res.data),
  ]);
  return <DashboardOverview user={user} lifts={lifts} leaderboard={leaderboard} />;
}