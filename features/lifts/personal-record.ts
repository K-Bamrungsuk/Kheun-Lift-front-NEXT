import type { LiftRecord } from "./types";

// Names must match the spelling in the Exercise table of the database.
const EXERCISES = ["Squat", "Bench Press", "Deadlift"];

export function getPersonalRecords(lifts: LiftRecord[]) {
  return EXERCISES.map((name) => ({
    name,
    best: lifts
      .filter((lift) => lift.status === "verified" && lift.exercise.name === name)
      .sort((a, b) => b.weight - a.weight || b.reps - a.reps)
      .at(0),
  }));
}