import { z } from "zod";
import { clientFetch } from "@/lib/api";
import { liftRecordSchema } from "./types";

export type CreateLiftInput = {
  exerciseId: number;
  weight: number;
  reps: number;
  videoUrl: string;
  caption?: string;
};

export const createLift = (body: CreateLiftInput) =>
  clientFetch("/lifts", liftRecordSchema, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateLiftCaption = (id: number, caption: string) =>
  clientFetch(`/lifts/${id}`, liftRecordSchema, {
    method: "PATCH",
    body: JSON.stringify({ caption }),
  });

export const deleteLift = (id: number) =>
  clientFetch(`/lifts/${id}`, z.unknown(), { method: "DELETE" });
