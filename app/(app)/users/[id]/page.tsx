import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getUserLifts } from "@/features/lifts/api-server";
import { LiftHistory } from "@/features/lifts/components/lift-history";
import { PersonalRecords } from "@/features/lifts/components/personal-records";
import { getMe, getUser } from "@/features/user/api-server";
import { AthleteCard } from "@/features/user/components/athlete-card";
import { isNotFound } from "@/lib/api";

export const metadata: Metadata = { title: "Athlete | Kheun Lift" };

export default async function UserPage({ params }: PageProps<"/users/[id]">) {
  const { id } = await params;
  const [me, user, lifts] = await Promise.all([getMe(), getUser(id), getUserLifts(id)]).catch(
    (error) => {
      if (isNotFound(error)) notFound();
      throw error;
    },
  );
  if (user.id === me.id) redirect("/profile");
  // shortcut: Go returns every status to any signed-in user, this only hides it; filter in Go (see PLAN.md).
  const verified = lifts.filter((lift) => lift.status === "verified");

  return (
    <div className="grid items-start gap-6 md:grid-cols-[300px_minmax(0,1fr)]">
      <AthleteCard user={user} label="Athlete profile" heading="h1" />
      <div className="min-w-0 space-y-6">
        <PersonalRecords lifts={verified} />
        <LiftHistory lifts={verified} isOwner={false} empty="No verified lifts yet." />
      </div>
    </div>
  );
}
