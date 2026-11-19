import { z } from "zod";
import { liftRecordSchema } from "@/features/lifts/types";
import { userSchema } from "@/features/user/types";

export const leaderboardEntrySchema = liftRecordSchema.extend({
  rank: z.number(),
  user: userSchema.pick({ id: true, username: true, profileImage: true }),
});
export type LeaderboardEntry = z.infer<typeof leaderboardEntrySchema>;

// Go returns null instead of an empty board, so a board always has a first row.
export const randomLeaderboardSchema = z.object({
  exerciseId: z.number(),
  weightClassId: z.number(),
  leaderboards: z.tuple([leaderboardEntrySchema], leaderboardEntrySchema),
});
export type RandomLeaderboard = z.infer<typeof randomLeaderboardSchema>;
