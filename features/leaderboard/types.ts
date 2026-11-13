import type { LiftRecord } from "@/features/lifts/types";

// One row of GET /leaderboards/... : a lift plus its rank and the lifter.
export type LeaderboardEntry = Omit<LiftRecord, "user"> & {
  rank: number;
  user: { id: number; username: string; profileImage: string | null };
};

// GET /leaderboards/random → { data: RandomLeaderboard | null }
export type RandomLeaderboard = {
  exerciseId: number;
  weightClassId: number;
  leaderboards: LeaderboardEntry[];
};