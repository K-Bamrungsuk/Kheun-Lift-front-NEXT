import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { ModalButton } from "@/components/ui/modal";
import { formatLiftDate } from "../format-date";
import type { LiftRecord } from "../types";
import { LiftDetail, LiftStatusBadge } from "./lift-detail";

export function LiftHistory({
  lifts,
  isOwner,
  title = "Lift ledger",
  viewAllHref,
  empty = "No lifts yet. Log your first one.",
}: {
  lifts: LiftRecord[];
  isOwner: boolean;
  title?: string;
  viewAllHref?: string;
  empty?: string;
}) {
  return (
    <section
      id="recent-activity"
      aria-labelledby="activity-title"
      className="space-y-3"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="activity-title"
          className="text-xs font-semibold uppercase tracking-widest text-muted"
        >
          {title}
        </h2>
        {viewAllHref ? (
          <Link
            href={viewAllHref}
            className="-my-2 inline-flex items-center gap-1 py-2 text-xs text-accent transition-colors hover:text-foreground"
          >
            View all
            <Icon name="arrowRight" className="size-3.5" />
          </Link>
        ) : (
          <span className="text-xs text-muted tabular-nums">
            {lifts.length} {lifts.length === 1 ? "entry" : "entries"}
          </span>
        )}
      </div>
      {lifts.length === 0 ? (
        <p className="rounded-xl bg-surface p-5 text-sm text-muted">{empty}</p>
      ) : (
        <div className="grid gap-2">
          {lifts.map((lift) => (
            <div key={lift.id}>
              <ModalButton
                label={`${lift.exercise.name}, ${lift.weight} kg × ${lift.reps}, ${lift.status}`}
                labelledBy="lift-title"
                wide
                className="flex w-full flex-wrap items-center justify-between gap-3 rounded-xl bg-surface p-4 text-left transition-colors hover:bg-surface-high md:p-5"
                trigger={
                  <>
                    <span>
                      <span className="block font-semibold">
                        {lift.exercise.name}
                      </span>
                      <span className="mt-1 block text-xl tabular-nums">
                        {lift.weight}
                        <span className="ml-1 text-xs text-muted">kg</span>
                        <span className="mx-2 text-sm text-muted">×</span>
                        {lift.reps}
                        <span className="ml-1 text-xs text-muted">rep</span>
                      </span>
                    </span>
                    <span className="flex flex-col items-end gap-2">
                      <LiftStatusBadge status={lift.status} />
                      <time
                        dateTime={lift.createdAt}
                        className="text-[10px] text-muted"
                      >
                        {formatLiftDate(lift.createdAt)}
                      </time>
                    </span>
                  </>
                }
              >
                <LiftDetail lift={lift} isOwner={isOwner} />
              </ModalButton>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
