import type { LiftRecord } from "./types";

const EXERCISES = ["Squat", "Bench Press", "Deadlift"];   // ต้องสะกดตรงกับในตาราง Exercise ของ DB

export function getPersonalRecords(lifts: LiftRecord[]) {
  return EXERCISES.map((name) => ({
    name,
    best: lifts
      .filter((lift) => lift.status === "verified" && lift.exercise.name === name)
      .sort((a, b) => b.weight - a.weight || b.reps - a.reps)[0],
  }));
}