import type { LiftRecord } from "../types";

const statusBadge = {
  verified: { glyph: "✓", color: "text-accent" },
  pending: { glyph: "◷", color: "text-muted" },
  rejected: { glyph: "⊘", color: "text-red-400" },
};

export function LiftHistory({ lifts }: { lifts: LiftRecord[] }) {
  return (
    <section
      id="recent-activity"
      aria-labelledby="activity-title"
      className="space-y-3"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="activity-title"
          className="font-mono text-xs font-semibold uppercase tracking-widest text-muted"
        >
          Lift ledger
        </h2>
        <span className="font-mono text-xs text-muted">
          {lifts.length} entries
        </span>
      </div>
      {lifts.length === 0 && (
        <p className="rounded-xl bg-surface p-5 text-sm text-muted">
          No lifts yet. Log your first one.
        </p>
      )}
      <div className="divide-y divide-border overflow-hidden rounded-xl bg-surface">
        {lifts.map((lift) => (
          <article
            key={lift.id}
            className="flex flex-wrap items-center justify-between gap-3 p-4 md:p-5"
          >
            <div>
              <h3 className="font-semibold">{lift.exercise.name}</h3>
              <p className="mt-1 font-mono text-xl tabular-nums">
                {lift.weight}
                <span className="ml-1 text-xs text-muted">kg</span>
                <span className="mx-2 text-sm text-muted">×</span>
                {lift.reps}
                <span className="ml-1 text-xs text-muted">rep</span>
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-md bg-surface-high px-2 py-1 font-mono text-[11px] capitalize ${statusBadge[lift.status].color}`}
              >
                <span aria-hidden="true">
                  {statusBadge[lift.status].glyph}
                </span>
                {lift.status}
              </span>
              <time
                dateTime={lift.createdAt}
                className="font-mono text-[10px] text-muted"
              >
                {lift.createdAt.slice(0, 10)}
              </time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
