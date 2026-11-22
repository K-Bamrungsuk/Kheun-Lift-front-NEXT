import { expect, test } from "vitest";
import { getPersonalRecords } from "./personal-record";
import type { LiftRecord, LiftStatus } from "./types";

let nextId = 1;
const lift = (name: string, weight: number, reps: number, status: LiftStatus = "verified"): LiftRecord => ({
  id: nextId++,
  userId: 1,
  exerciseId: 1,
  weightClassId: 1,
  weight,
  reps,
  caption: null,
  videoUrl: null,
  status,
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
  user: { username: "a", profileImage: null },
  exercise: { id: 1, name },
  weightClass: { id: 1, name: "83", gender: "male" },
});

const best = (lifts: LiftRecord[], name: string) =>
  getPersonalRecords(lifts).find((record) => record.name === name)?.best;

test("skips lifts that are not verified", () => {
  const lifts = [lift("Squat", 100, 1), lift("Squat", 200, 1, "pending"), lift("Squat", 210, 1, "rejected")];
  expect(best(lifts, "Squat")?.weight).toBe(100);
});

test("picks the heaviest lift, then the most reps", () => {
  const lifts = [lift("Deadlift", 180, 5), lift("Deadlift", 200, 1), lift("Deadlift", 200, 3)];
  expect(best(lifts, "Deadlift")).toMatchObject({ weight: 200, reps: 3 });
});

test("an exercise without a verified lift has no record", () => {
  expect(best([lift("Squat", 100, 1)], "Bench Press")).toBeUndefined();
});
