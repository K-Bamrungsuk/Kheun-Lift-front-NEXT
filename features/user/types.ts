import { z } from "zod";

export const weightClassSchema = z.object({
  id: z.number(),
  gender: z.enum(["male", "female"]),
  name: z.string(),
  minWeight: z.number(),
  maxWeight: z.number().nullable(),
});
export type WeightClass = z.infer<typeof weightClassSchema>;

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  profileImage: z.string().nullable(),
  bodyWeight: z.number().nullable(),
  height: z.number().nullable(),
  gender: z.enum(["male", "female"]).nullable(),
  dateOfBirth: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  weightClass: weightClassSchema.nullable(),
});
export type User = z.infer<typeof userSchema>;

// GET /users/:id leaves out email, birthday and timestamps.
export const publicUserSchema = userSchema.pick({
  id: true,
  username: true,
  profileImage: true,
  gender: true,
  bodyWeight: true,
  height: true,
  weightClass: true,
});
export type PublicUser = z.infer<typeof publicUserSchema>;

export type UpdateMeInput = Partial<
  Record<
    "username" | "gender" | "bodyWeight" | "height" | "dateOfBirth",
    string | number
  >
>;
