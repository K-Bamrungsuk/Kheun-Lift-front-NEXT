import { z } from "zod";
import { serverFetch } from "@/lib/api-server";
import { weightClassSchema } from "@/features/user/types";
import { leaderboardEntrySchema, randomLeaderboardSchema } from "./types";

// weightClassId and gender come straight from the URL, and Go validates them with a 400 or 404 answer.
export const getLeaderboard = ({
  exerciseId,
  weightClassId,
  gender,
}: {
  exerciseId: number;
  weightClassId?: string;
  gender?: string;
}) =>
  serverFetch(
    `/leaderboards/exercises/${exerciseId}` +
      (weightClassId
        ? `/weight-classes/${encodeURIComponent(weightClassId)}`
        : "") +
      (gender ? `?gender=${encodeURIComponent(gender)}` : ""),
    z.array(leaderboardEntrySchema),
  );

export const getRandomLeaderboard = () =>
  serverFetch("/leaderboards/random", randomLeaderboardSchema.nullable());

export const getWeightClasses = (gender: string) =>
  serverFetch(
    `/weight-classes?gender=${encodeURIComponent(gender)}`,
    z.array(weightClassSchema),
  );
