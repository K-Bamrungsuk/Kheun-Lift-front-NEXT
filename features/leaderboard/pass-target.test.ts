import { expect, test } from "vitest";
import { passTarget } from "./pass-target";

// Go's order: more weight wins, then more reps; an exact tie keeps the earlier lift ahead.
const beats = (a: { weight: number; reps: number }, b: { weight: number; reps: number }) =>
  a.weight > b.weight || (a.weight === b.weight && a.reps > b.reps);

test.each([
  { weight: 100, reps: 1 },
  { weight: 142.5, reps: 5 },
])("both targets pass $weight kg × $reps", (above) => {
  for (const target of passTarget(above)) expect(beats(target, above)).toBe(true);
});

test("the targets are one more rep, or one plate jump at a single rep", () => {
  expect(passTarget({ weight: 100, reps: 3 })).toEqual([
    { weight: 100, reps: 4 },
    { weight: 102.5, reps: 1 },
  ]);
});
