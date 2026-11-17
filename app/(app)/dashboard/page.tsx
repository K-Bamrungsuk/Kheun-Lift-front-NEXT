import type { Metadata } from "next";
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview";
import { getRandomLeaderboard } from "@/features/leaderboard/api-server";
import { getMyLifts } from "@/features/lifts/api-server";
import { getMe } from "@/features/user/api-server";

export const metadata: Metadata = { title: "Dashboard | Kheun Lift" };

export default async function DashboardPage() {
  const [user, lifts, leaderboard] = await Promise.all([
    getMe(),
    getMyLifts(),
    getRandomLeaderboard(),
  ]);
  return <DashboardOverview user={user} lifts={lifts} leaderboard={leaderboard} />;
}
