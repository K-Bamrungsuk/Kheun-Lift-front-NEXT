import { passTarget } from "../pass-target";
import type { LeaderboardEntry } from "../types";
import { LiftValue } from "./ranking-table";

export function MyRank({
  entries,
  meId,
}: {
  entries: LeaderboardEntry[];
  meId: number;
}) {
  const index = entries.findIndex((entry) => entry.userId === meId);
  if (index === -1) return null;
  const mine = entries[index];
  const above = entries[index - 1];

  return (
    <div className="grid grid-cols-2 items-center gap-4 rounded-xl border border-accent/35 bg-surface p-4 sm:grid-cols-[auto_1fr_auto]">
      <div>
        <p className="text-xs text-muted">Your rank</p>
        <p className="text-xl font-semibold tabular-nums text-accent">
          {mine.rank}{" "}
          <span className="text-xs font-normal text-muted">
            of {entries.length}
          </span>
        </p>
      </div>
      <div className="text-right sm:order-last">
        <p className="text-xs text-muted">Your best</p>
        <p className="font-semibold">
          <LiftValue lift={mine} />
        </p>
      </div>
      <div className="col-span-2 border-t border-border pt-3 sm:col-span-1 sm:border-0 sm:pt-0">
        {above ? (
          <PassHint above={above} />
        ) : (
          <p className="font-semibold text-accent">You hold the record</p>
        )}
      </div>
    </div>
  );
}

function PassHint({ above }: { above: LeaderboardEntry }) {
  const [moreReps, moreWeight] = passTarget(above);
  return (
    <>
      <p className="text-xs text-muted">
        To pass {above.user.username} (<LiftValue lift={above} />)
      </p>
      <p className="font-semibold">
        <LiftValue lift={moreReps} />
        <span className="mx-1.5 font-normal text-muted">or</span>
        <LiftValue lift={moreWeight} />
      </p>
    </>
  );
}
