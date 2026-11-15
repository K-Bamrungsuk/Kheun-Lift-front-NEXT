import { serverFetch } from "@/lib/api-server";
import type { Exercise, LiftRecord } from "./types";

export const getMyLifts = () =>
  serverFetch<{ data: LiftRecord[] }>("/lifts/me").then((res) => res.data);

export const getExercises = () =>
  serverFetch<{ exercises: Exercise[] }>("/exercises").then(
    (res) => res.exercises,
  );
