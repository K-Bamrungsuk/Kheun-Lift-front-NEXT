import { clientFetch } from "@/lib/api";
import type { LiftRecord } from "./types";

export type CreateLiftInput = {
  exerciseId: number;
  weight: number;
  reps: number;
  videoUrl: string;
  caption?: string;
};

export const createLift = (body: CreateLiftInput) =>
  clientFetch<{ data: LiftRecord }>("/lifts", {
    method: "POST",
    body: JSON.stringify(body),
  });
