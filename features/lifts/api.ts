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

export const updateLiftCaption = (id: number, caption: string) =>
  clientFetch<{ data: LiftRecord }>(`/lifts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ caption }),
  });

export const deleteLift = (id: number) =>
  clientFetch(`/lifts/${id}`, { method: "DELETE" });
