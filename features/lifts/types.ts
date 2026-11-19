import { z } from "zod";
import { userSchema, weightClassSchema } from "@/features/user/types";

export const liftStatusSchema = z.enum(["pending", "verified", "rejected"]);
export type LiftStatus = z.infer<typeof liftStatusSchema>;

export const liftRecordSchema = z.object({
  id: z.number(),
  userId: z.number(),
  exerciseId: z.number(),
  weightClassId: z.number(),
  weight: z.number(),
  reps: z.number(),
  caption: z.string().nullable(),
  videoUrl: z.string().nullable(),
  status: liftStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  user: userSchema.pick({ username: true, profileImage: true }),
  exercise: z.object({ id: z.number(), name: z.string() }),
  weightClass: weightClassSchema.pick({ id: true, name: true, gender: true }),
});
export type LiftRecord = z.infer<typeof liftRecordSchema>;

export const exerciseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
});
export type Exercise = z.infer<typeof exerciseSchema>;
