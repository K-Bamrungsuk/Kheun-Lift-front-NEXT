import type { LiftRecord } from "@/features/lifts/types";
import type { User } from "@/features/user/types";

export type LeaderboardEntry = LiftRecord & {
  rank: number;
  user: Pick<User, "id" | "username" | "profileImage">;
};

// Go returns null instead of an empty board, so a board always has a first row.
export type RandomLeaderboard = {
  exerciseId: number;
  weightClassId: number;
  leaderboards: [LeaderboardEntry, ...LeaderboardEntry[]];
};
