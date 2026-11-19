import { cacheLife } from "next/cache";
import { z } from "zod";
import { request } from "@/lib/api";
import { serverFetch } from "@/lib/api-server";
import { exerciseSchema, liftRecordSchema } from "./types";

export const getMyLifts = () => serverFetch("/lifts/me", z.array(liftRecordSchema));

// id comes straight from the URL; Go answers 400 for a bad id and 404 for a missing lift.
export const getLift = (id: string) =>
  serverFetch(`/lifts/${encodeURIComponent(id)}`, liftRecordSchema);

export const getUserLifts = (userId: string) =>
  serverFetch(`/lifts/users/${encodeURIComponent(userId)}`, z.array(liftRecordSchema));

// Go serves exercises publicly and they rarely change, so the server caches them and sends no cookie.
export async function getExercises() {
  "use cache";
  cacheLife("hours");
  return request("/exercises", z.array(exerciseSchema));
}
