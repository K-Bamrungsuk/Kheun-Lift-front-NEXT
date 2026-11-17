import { cacheLife } from "next/cache";
import { request } from "@/lib/api";
import { serverFetch } from "@/lib/api-server";
import type { Exercise, LiftRecord } from "./types";

export const getMyLifts = () =>
  serverFetch<{ data: LiftRecord[] }>("/lifts/me").then((res) => res.data);

// id comes straight from the URL; Go answers 400 for a bad id and 404 for a missing lift.
export const getLift = (id: string) =>
  serverFetch<{ data: LiftRecord }>(`/lifts/${encodeURIComponent(id)}`).then((res) => res.data);

export const getUserLifts = (userId: string) =>
  serverFetch<{ data: LiftRecord[] }>(`/lifts/users/${encodeURIComponent(userId)}`).then(
    (res) => res.data,
  );

// Go serves exercises publicly and they rarely change, so the server caches them and sends no cookie.
export async function getExercises() {
  "use cache";
  cacheLife("hours");
  const { exercises } = await request<{ exercises: Exercise[] }>("/exercises");
  return exercises;
}
