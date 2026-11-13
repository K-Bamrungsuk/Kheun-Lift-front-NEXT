import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import {
  LiftHistory,
  PersonalRecords,
} from "@/features/dashboard/components/dashboard-overview";
import { demoAthlete } from "@/features/dashboard/data/demo";
import { LogoutButton } from "@/features/auth/components/logout-button";
import type { LiftRecord } from "@/features/lifts/types";
import { serverFetch } from "@/lib/api-server";

export const metadata: Metadata = { title: "Profile | Kheun Lift" };

export default async function ProfilePage() {
  const lifts = await serverFetch<{ data: LiftRecord[] }>("/lifts/me").then(
    (res) => res.data,
  );
  return (
    <>
      <header>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
          The athlete
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Profile
        </h1>
        <p className="mt-2 text-sm text-muted">
          Your identity. Your lifts. Your progress.
        </p>
      </header>
      <div className="grid items-start gap-6 md:grid-cols-[300px_minmax(0,1fr)]">
        <section
          aria-labelledby="athlete-title"
          className="relative rounded-xl bg-surface p-5 md:p-6"
        >
          <button
            type="button"
            disabled
            aria-label="Edit profile (coming soon)"
            title="Profile editing is not connected yet"
            className="absolute right-3 top-3 grid size-11 cursor-not-allowed place-items-center rounded-lg text-muted/60"
          >
            <Icon name="pencil" className="size-5" />
          </button>
          <div className="flex items-center gap-4 pr-10">
            <span className="grid size-16 shrink-0 place-items-center rounded-full border border-accent/40 bg-surface-high text-2xl font-semibold text-accent">
              K
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Athlete profile
              </p>
              <h2
                id="athlete-title"
                className="mt-1 truncate text-xl font-semibold"
              >
                {demoAthlete.username}
              </h2>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
                <Icon name="trophy" className="size-3.5" />
                <span className="sr-only">Weight class: </span>
                {demoAthlete.weightClass}
              </p>
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-2.5">
            <div className="rounded-lg bg-surface-high p-3">
              <dt className="flex items-center gap-1.5 text-xs text-muted">
                <Icon name="user" className="size-4" />
                Gender
              </dt>
              <dd className="mt-2 text-sm">{demoAthlete.gender}</dd>
            </div>
            <div className="rounded-lg bg-surface-high p-3">
              <dt className="flex items-center gap-1.5 text-xs text-muted">
                <Icon name="weight" className="size-4" />
                Body weight
              </dt>
              <dd className="mt-2 font-mono text-sm">{demoAthlete.bodyWeight}</dd>
            </div>
          </dl>
        </section>
        <div className="min-w-0 space-y-6">
          <PersonalRecords lifts={lifts} />
          <LiftHistory lifts={lifts} />
        </div>
      </div>
      <LogoutButton className="w-full bg-surface" />
    </>
  );
}
