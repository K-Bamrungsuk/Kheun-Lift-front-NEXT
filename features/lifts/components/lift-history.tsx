import Link from "next/link";
import { formatLiftDate } from "../format-date";
import type { LiftRecord, LiftStatus } from "../types";

const statusBadge = {
  verified: { glyph: "✓", color: "text-accent" },
  pending: { glyph: "◷", color: "text-muted" },
  rejected: { glyph: "⊘", color: "text-red-400" },
} satisfies Record<LiftStatus, { glyph: string; color: string }>;

export function LiftHistory({
  lifts,
  empty = "No lifts yet. Log your first one.",
}: {
  lifts: LiftRecord[];
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
          {lifts.length} entries
        </span>
      </div>
      {lifts.length === 0 && (
        <p className="rounded-xl bg-surface p-5 text-sm text-muted">
          {empty}
        </p>
      )}
      <div className="divide-y divide-border overflow-hidden rounded-xl bg-surface">
        {lifts.map((lift) => (
          <Link
            key={lift.id}
            href={`/lifts/${lift.id}`}
            className="flex flex-wrap items-center justify-between gap-3 p-4 transition-colors hover:bg-surface-high md:p-5"
          >
            <div>
              <h3 className="font-semibold">{lift.exercise.name}</h3>
              <p className="mt-1 text-xl tabular-nums">
                {lift.weight}
                <span className="ml-1 text-xs text-muted">kg</span>
                <span className="mx-2 text-sm text-muted">×</span>
                {lift.reps}
                <span className="ml-1 text-xs text-muted">rep</span>
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
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
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
