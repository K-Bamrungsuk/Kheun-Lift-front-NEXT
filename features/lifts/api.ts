import { z } from "zod";
import { clientFetch } from "@/lib/api";
import { liftRecordSchema, type CreateLiftInput } from "./types";

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
