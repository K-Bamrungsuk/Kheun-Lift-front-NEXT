import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { demoAthlete } from "@/features/dashboard/data/demo";

export const metadata: Metadata = { title: "Log Lift | Kheun Lift" };

export default function LogLiftPage() {
  return (
    <>
      <header><p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">Make it count</p><h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Log Lift</h1><p className="mt-2 text-sm text-muted">Capture the effort behind the numbers.</p></header>
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_280px]">
        <section aria-labelledby="attempt-title" className="space-y-6 rounded-xl bg-surface p-5 md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5"><h2 id="attempt-title" className="text-lg font-semibold">Your lift details</h2><span className="rounded-md bg-surface-high px-2.5 py-1.5 font-mono text-[10px] text-accent">{demoAthlete.weightClass}</span></div>
          <fieldset><legend className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Discipline</legend><div className="grid grid-cols-3 gap-2">
            <label className="cursor-pointer"><input type="radio" name="exercise" value="squat" defaultChecked className="peer sr-only" /><span className="flex min-h-12 items-center justify-center rounded-lg border border-border bg-background px-2 text-sm text-muted peer-checked:border-accent/50 peer-checked:bg-accent/10 peer-checked:text-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent">Squat</span></label>
            <label className="cursor-pointer"><input type="radio" name="exercise" value="bench" className="peer sr-only" /><span className="flex min-h-12 items-center justify-center rounded-lg border border-border bg-background px-2 text-sm text-muted peer-checked:border-accent/50 peer-checked:bg-accent/10 peer-checked:text-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent">Bench</span></label>
            <label className="cursor-pointer"><input type="radio" name="exercise" value="deadlift" className="peer sr-only" /><span className="flex min-h-12 items-center justify-center rounded-lg border border-border bg-background px-2 text-sm text-muted peer-checked:border-accent/50 peer-checked:bg-accent/10 peer-checked:text-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent">Deadlift</span></label>
          </div></fieldset>
          <div className="grid grid-cols-2 gap-4">
            <div><label htmlFor="weight" className="font-mono text-xs uppercase tracking-widest text-muted">Load (kg)</label><input id="weight" name="weight" type="number" min="0.5" step="0.5" required defaultValue="100" className="mt-3 min-h-16 w-full min-w-0 rounded-lg border border-border bg-background px-4 font-mono text-2xl tabular-nums" /></div>
            <div><label htmlFor="reps" className="font-mono text-xs uppercase tracking-widest text-muted">Reps</label><input id="reps" name="reps" type="number" min="1" step="1" required defaultValue="1" className="mt-3 min-h-16 w-full min-w-0 rounded-lg border border-border bg-background px-4 font-mono text-2xl tabular-nums" /></div>
          </div>
          <div><label htmlFor="video" className="flex flex-wrap justify-between gap-1 text-sm text-muted"><span>Verification video URL</span><span className="text-xs">Optional</span></label><input id="video" name="video" type="url" placeholder="https://..." className="mt-3 min-h-12 w-full min-w-0 rounded-lg border border-border bg-background px-4 text-sm placeholder:text-muted/60" /></div>
          <div><label htmlFor="notes" className="flex justify-between gap-2 text-sm text-muted"><span>Notes &amp; context</span><span className="text-xs">Optional</span></label><textarea id="notes" name="notes" rows={3} placeholder="How did it feel? Technique, equipment, or a new personal best." className="mt-3 w-full resize-y rounded-lg border border-border bg-background p-4 text-sm leading-6 placeholder:text-muted/60" /></div>
          <div className="border-t border-border pt-5"><p id="save-notice" className="mb-4 text-sm leading-6 text-muted">This is a form preview. Your input is not saved or submitted, and will be lost when you leave this page.</p><button type="button" disabled aria-describedby="save-notice" className="flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-accent/40 px-4 font-semibold text-background"><Icon name="shieldCheck" />Submit lift - coming soon</button></div>
        </section>
        <aside className="space-y-4 rounded-xl bg-surface-low p-5"><span className="grid size-11 place-items-center rounded-xl bg-surface text-accent"><Icon name="shieldCheck" className="size-6" /></span><h2 className="text-lg font-semibold">A record you can stand behind.</h2><p className="text-sm leading-6 text-muted">Clear video makes a lift easier to review. Keep the full movement and equipment in frame.</p><p className="text-xs leading-5 text-muted">Lift verification and saving will be available once account services are connected.</p><Link href="/dashboard" className="flex min-h-11 items-center justify-between border-t border-border pt-3 text-sm text-accent">Back to Home<Icon name="arrowRight" className="size-4" /></Link></aside>
      </div>
    </>
  );
}
