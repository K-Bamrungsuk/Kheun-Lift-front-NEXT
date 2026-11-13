import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { LiftHistory, PersonalRecords } from "@/features/dashboard/components/dashboard-overview";
import { demoAthlete } from "@/features/dashboard/data/demo";
import { LogoutButton } from "@/features/auth/components/logout-button";
import type { LiftRecord } from "@/features/lifts/types";
import { serverFetch } from "@/lib/api-server";

export const metadata: Metadata = { title: "Profile | Kheun Lift" };

export default async function ProfilePage() {
  const lifts = await serverFetch<{ data: LiftRecord[] }>("/lifts/me").then((res) => res.data);
  return (
    <>
      <header><p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">The athlete</p><h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Profile</h1><p className="mt-2 text-sm text-muted">Your identity. Your lifts. Your progress.</p></header>
      <div className="grid items-start gap-6 md:grid-cols-[300px_minmax(0,1fr)]">
        <section aria-labelledby="athlete-title" className="rounded-xl bg-surface p-5 md:p-6">
          <div className="flex items-center gap-4"><span className="grid size-16 shrink-0 place-items-center rounded-full border border-accent/40 bg-surface-high text-2xl font-semibold text-accent">K</span><div className="min-w-0"><p className="font-mono text-[10px] uppercase tracking-widest text-muted">Athlete profile</p><h2 id="athlete-title" className="mt-1 truncate text-xl font-semibold">{demoAthlete.username}</h2><span className="mt-1 block text-xs text-muted">Sample athlete</span></div></div>
          <dl className="mt-6 divide-y divide-border border-y border-border">
            <div className="flex items-center justify-between gap-3 py-4"><dt className="text-sm text-muted">Gender</dt><dd className="text-sm">{demoAthlete.gender}</dd></div>
            <div className="flex items-center justify-between gap-3 py-4"><dt className="text-sm text-muted">Body weight</dt><dd className="font-mono text-sm">{demoAthlete.bodyWeight}</dd></div>
            <div className="flex items-center justify-between gap-3 py-4"><dt className="text-sm text-muted">Weight class</dt><dd className="font-mono text-sm text-accent">{demoAthlete.weightClass}</dd></div>
          </dl>
          <button type="button" disabled className="mt-5 min-h-11 w-full cursor-not-allowed rounded-lg border border-border px-4 text-sm text-muted/60" aria-describedby="edit-notice">Edit profile</button>
          <p id="edit-notice" className="mt-2 text-xs leading-5 text-muted">Profile editing is not connected yet.</p>
          <Link href="/log-lift" className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-background transition-colors hover:bg-accent/90"><Icon name="plus" className="size-4" />Log a lift</Link>
          <LogoutButton className="mt-3 w-full md:hidden" />
        </section>
        <div className="min-w-0 space-y-6"><PersonalRecords lifts={lifts} /><LiftHistory lifts={lifts} /></div>
      </div>
    </>
  );
}
