import type { LiftRecord } from "@/features/lifts/types";
import type { User } from "@/features/user/types";

// Each row of GET /leaderboards/... is a lift with its rank and the lifter.
export type LeaderboardEntry = LiftRecord & {
  rank: number;
  user: Pick<User, "id" | "username" | "profileImage">;
};

// GET /leaderboards/random returns { data: RandomLeaderboard | null }.
// Go returns null instead of an empty board, so a board always has a first row.
export type RandomLeaderboard = {
  exerciseId: number;
  weightClassId: number;
  leaderboards: [LeaderboardEntry, ...LeaderboardEntry[]];
};
