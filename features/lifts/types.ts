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
  exercise: { id: number; name: string };
  weightClass: { id: number; name: string; gender: string };
};

export type Exercise = { id: number; name: string; description: string | null };
