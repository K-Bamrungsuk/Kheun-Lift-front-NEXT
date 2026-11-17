import type { LiftRecord } from "@/features/lifts/types";
import type { User } from "@/features/user/types";

// One row of GET /leaderboards/... : a lift plus its rank and the lifter.
export type LeaderboardEntry = LiftRecord & {
  rank: number;
  user: Pick<User, "id" | "username" | "profileImage">;
};

// GET /leaderboards/random → { data: RandomLeaderboard | null }
// Go returns null instead of an empty board, so a board always has a first row.
export type RandomLeaderboard = {
  exerciseId: number;
  weightClassId: number;
  leaderboards: [LeaderboardEntry, ...LeaderboardEntry[]];
};
