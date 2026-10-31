import type { Metadata } from "next";
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview";

export const metadata: Metadata = { title: "Dashboard | Kheun Lift" };

export default function DashboardPage() {
  return <DashboardOverview />;
}
