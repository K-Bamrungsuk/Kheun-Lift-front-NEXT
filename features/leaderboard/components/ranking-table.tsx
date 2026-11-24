import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { ModalButton } from "@/components/ui/modal";
import { LiftDetail } from "@/features/lifts/components/lift-detail";
import { LiftValue } from "@/features/lifts/components/lift-value";
import { formatLiftDate } from "@/features/lifts/format-date";
import type { LeaderboardEntry } from "../types";

const medals = [
  "bg-accent text-background",
  "bg-[#c3ccd9] text-background",
  "bg-[#c58f61] text-background",
];
const rankStyle = (rank: number) =>
  medals[rank - 1] ??
  (rank <= 5 ? "border border-accent text-accent" : "text-muted");

export function RankingTable({
  entries,
  meId,
  caption,
}: {
  entries: LeaderboardEntry[];
  meId: number;
  caption: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-surface">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="border-b border-border bg-surface-low text-[10px] uppercase tracking-widest text-muted">
          <tr>
            <th scope="col" className="w-16 px-3 py-4 font-medium md:px-5">
              Rank
            </th>
            <th scope="col" className="px-3 py-4 font-medium md:px-5">
              Athlete
            </th>
            {/* The Date column shows on sm and wider, and hides on mobile */}
            <th scope="col" className="hidden px-3 py-4 text-right font-medium sm:table-cell md:px-5">
              Date
            </th>
            <th scope="col" className="px-3 py-4 text-right font-medium md:px-5">
              Best lift
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {entries.map((entry) => {
            const isMe = entry.userId === meId;
            const isTop3 = entry.rank <= 3;
            return (
              <tr key={entry.id} className={isMe ? "bg-accent/10" : ""}>
                <td className="px-3 py-5 tabular-nums md:px-5">
                  <span
                    className={`grid size-8 place-items-center rounded-full text-xs font-semibold ${rankStyle(entry.rank)}`}
                  >
                    {String(entry.rank).padStart(2, "0")}
                  </span>
                </td>
                <th scope="row" className={`px-3 py-5 md:px-5 ${isTop3 ? "font-bold" : "font-medium"}`}>
                  <Link
                    href={isMe ? "/profile" : `/users/${entry.userId}`}
                    className="break-all underline-offset-4 hover:underline"
                  >
                    {entry.user.username}
                  </Link>
                  {entry.rank === 1 && (
                    <Icon name="trophy" className="ml-2 inline size-4 text-accent" />
                  )}
                  {isMe && (
                    <span className="ml-2 rounded bg-surface-high px-1.5 py-1 text-[9px] uppercase text-accent">
                      You
                    </span>
                  )}
                </th>
                <td className="hidden whitespace-nowrap px-3 py-5 text-right text-xs text-muted sm:table-cell md:px-5">
                  <time dateTime={entry.createdAt}>{formatLiftDate(entry.createdAt)}</time>
                </td>
                <td
                  className={`whitespace-nowrap px-3 py-5 text-right text-base tabular-nums md:px-5 ${isTop3 ? "font-bold" : ""}`}
                >
                  <ModalButton
                    label={`${entry.weight} kg for ${entry.reps} reps by ${entry.user.username}`}
                    labelledBy="lift-title"
                    wide
                    className="underline-offset-4 hover:underline"
                    trigger={<LiftValue lift={entry} />}
                  >
                    <LiftDetail lift={entry} isOwner={isMe} />
                  </ModalButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
