import type { Metadata } from "next";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { notFound, redirect } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { getUserLifts } from "@/features/lifts/api-server";
import { LiftHistory } from "@/features/lifts/components/lift-history";
import { PersonalRecords } from "@/features/lifts/components/personal-records";
import { getMe, getUser } from "@/features/user/api-server";
import { AthleteStats } from "@/features/user/components/athlete-stats";
import { ApiError } from "@/lib/api";

export const metadata: Metadata = { title: "Athlete | Kheun Lift" };

export default function UserPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<Spinner />}>
      {params.then(({ id }) => (
        <UserProfile id={id} />
      ))}
    </Suspense>
  );
}

async function UserProfile({ id }: { id: string }) {
  const [me, user, lifts] = await Promise.all([getMe(), getUser(id), getUserLifts(id)]).catch(
    (error) => {
      // Go answers 400 for a bad id and 404 for a missing user.
      if (error instanceof ApiError && [400, 404].includes(error.status)) notFound();
      throw error;
    },
  );
  if (user.id === me.id) redirect("/profile");
  // shortcut: Go returns every status to any signed-in user, this only hides it; filter in Go (see PLAN.md).
  const verified = lifts.filter((lift) => lift.status === "verified");

  return (
    <div className="grid items-start gap-6 md:grid-cols-[300px_minmax(0,1fr)]">
      <section aria-labelledby="athlete-title" className="rounded-xl bg-surface p-5 md:p-6">
        <div className="flex items-center gap-4">
          <Avatar src={user.profileImage} alt="" className="size-16 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-muted">
              Athlete profile
            </p>
            <h1 id="athlete-title" className="mt-1 truncate text-xl font-semibold">
              {user.username}
            </h1>
            {user.weightClass && (
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-accent/25 bg-accent/10 px-2.5 py-1 text-xs text-accent">
                <Icon name="trophy" className="size-3.5" />
                <span className="sr-only">Weight class: </span>
                {user.weightClass.name}
              </p>
            )}
          </div>
        </div>
        <div className="mt-6">
          <AthleteStats user={user} />
        </div>
      </section>
      <div className="min-w-0 space-y-6">
        <PersonalRecords lifts={verified} />
        <LiftHistory lifts={verified} empty="No verified lifts yet." />
      </div>
    </div>
  );
}
