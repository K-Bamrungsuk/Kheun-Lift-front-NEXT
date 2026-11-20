import { ModalButton } from "@/components/ui/modal";
import { formatLiftDate } from "../format-date";
import type { LiftRecord, LiftStatus } from "../types";
import { LiftDetail } from "./lift-detail";

const statusBadge = {
  verified: { glyph: "✓", color: "text-accent" },
  pending: { glyph: "◷", color: "text-muted" },
  rejected: { glyph: "⊘", color: "text-red-400" },
} satisfies Record<LiftStatus, { glyph: string; color: string }>;

export function LiftHistory({
  lifts,
  isOwner,
  empty = "No lifts yet. Log your first one.",
}: {
  lifts: LiftRecord[];
  isOwner: boolean;
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
          Lift ledger
        </h2>
        <span className="text-xs text-muted">
          {lifts.length} {lifts.length === 1 ? "entry" : "entries"}
        </span>
      </div>
      {lifts.length === 0 ? (
        <p className="rounded-xl bg-surface p-5 text-sm text-muted">{empty}</p>
      ) : (
        <div className="divide-y divide-border overflow-hidden rounded-xl bg-surface">
          {lifts.map((lift) => (
            <div key={lift.id}>
              <ModalButton
                label={`${lift.exercise.name}, ${lift.weight} kg × ${lift.reps}, ${lift.status}`}
                labelledBy="lift-title"
                wide
                className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-surface-high md:p-5"
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
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md bg-surface-high px-2 py-1 text-[11px] capitalize ${statusBadge[lift.status].color}`}
                      >
                        <span aria-hidden="true">
                          {statusBadge[lift.status].glyph}
                        </span>
                        {lift.status}
                      </span>
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
