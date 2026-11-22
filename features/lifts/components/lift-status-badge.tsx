import type { LiftStatus } from "../types";

const statusBadge = {
  verified: { glyph: "✓", color: "text-accent" },
  pending: { glyph: "◷", color: "text-muted" },
  rejected: { glyph: "⊘", color: "text-danger" },
} satisfies Record<LiftStatus, { glyph: string; color: string }>;

export function LiftStatusBadge({ status }: { status: LiftStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-surface-high px-2 py-1 text-[11px] capitalize ${statusBadge[status].color}`}
    >
      <span aria-hidden="true">{statusBadge[status].glyph}</span>
      {status}
    </span>
  );
}
