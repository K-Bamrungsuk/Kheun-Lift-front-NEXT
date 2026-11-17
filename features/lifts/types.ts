import type { User, WeightClass } from "@/features/user/types";

export type LiftStatus = "pending" | "verified" | "rejected";

export type LiftRecord = {
  id: number;
  userId: number;
  exerciseId: number;
  weightClassId: number;
  weight: number;
  reps: number;
  caption: string | null;
  videoUrl: string | null;
  status: LiftStatus;
  createdAt: string;
  updatedAt: string;
  user: Pick<User, "username" | "profileImage">;
  exercise: { id: number; name: string };
  weightClass: Pick<WeightClass, "id" | "name" | "gender">;
};

export type Exercise = { id: number; name: string; description: string | null };
