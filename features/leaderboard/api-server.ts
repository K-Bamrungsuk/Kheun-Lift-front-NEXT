import { serverFetch } from "@/lib/api-server";
import type { WeightClass } from "@/features/user/types";
import type { LeaderboardEntry, RandomLeaderboard } from "./types";

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
  serverFetch<{ data: LeaderboardEntry[] }>(
    `/leaderboards/exercises/${exerciseId}` +
      (weightClassId
        ? `/weight-classes/${encodeURIComponent(weightClassId)}`
        : "") +
      (gender ? `?gender=${encodeURIComponent(gender)}` : ""),
  ).then((res) => res.data);

export const getRandomLeaderboard = () =>
  serverFetch<{ data: RandomLeaderboard | null }>("/leaderboards/random").then(
    (res) => res.data,
  );

export const getWeightClasses = (gender: string) =>
  serverFetch<{ data: WeightClass[] }>(
    `/weight-classes?gender=${encodeURIComponent(gender)}`,
  ).then((res) => res.data);
