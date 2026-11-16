import { cacheLife } from "next/cache";
import { request } from "@/lib/api";
import { serverFetch } from "@/lib/api-server";
import type { Exercise, LiftRecord } from "./types";

export const getMyLifts = () =>
  serverFetch<{ data: LiftRecord[] }>("/lifts/me").then((res) => res.data);

// Public in Go and rarely changes, so it is cached on the server and sent without the cookie.
export async function getExercises() {
  "use cache";
  cacheLife("hours");
  const { exercises } = await request<{ exercises: Exercise[] }>("/exercises");
  return exercises;
}
