import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { LogLiftForm } from "@/features/lifts/components/log-lift-form";

export const metadata: Metadata = { title: "Log Lift | Kheun Lift" };

export default function LogLiftPage() {
  return (
    <>
      <header>
        <p className="mb-2 text-xs uppercase tracking-widest text-accent">
          Make it count
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Log Lift
        </h1>
        <p className="mt-2 text-sm text-muted">
          Capture the effort behind the numbers.
        </p>
      </header>
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_280px]">
        <LogLiftForm variant="page" />
        <aside className="space-y-4 rounded-xl bg-surface-low p-5">
          <span className="grid size-11 place-items-center rounded-xl bg-surface text-accent">
            <Icon name="shieldCheck" className="size-6" />
          </span>
          <h2 className="text-lg font-semibold">
            A record you can stand behind.
          </h2>
          <p className="text-sm leading-6 text-muted">
            Clear video makes a lift easier to review. Keep the full movement
            and equipment in frame.
          </p>
        </aside>
      </div>
    </>
  );
}
