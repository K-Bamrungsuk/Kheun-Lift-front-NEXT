import type { Metadata } from "next";
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview";
import type { RandomLeaderboard } from "@/features/leaderboard/types";
import { getMyLifts } from "@/features/lifts/api-server";
import { getMe } from "@/features/user/api-server";
import { serverFetch } from "@/lib/api-server";

export const metadata: Metadata = { title: "Dashboard | Kheun Lift" };

export default async function DashboardPage() {
  const [user, lifts, leaderboard] = await Promise.all([
    getMe(),
    getMyLifts(),
    serverFetch<{ data: RandomLeaderboard | null }>("/leaderboards/random").then((res) => res.data),
  ]);
  return <DashboardOverview user={user} lifts={lifts} leaderboard={leaderboard} />;
}
