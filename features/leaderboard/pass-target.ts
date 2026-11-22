// shortcut: assumes 2.5 kg is the smallest jump, change it if micro plates are used.
const PLATE_JUMP = 2.5;

type Lift = { weight: number; reps: number };

// Go ranks by weight, then reps, then the earlier lift, so a tie never passes.
export const passTarget = ({ weight, reps }: Lift): [Lift, Lift] => [
  { weight, reps: reps + 1 },
  { weight: weight + PLATE_JUMP, reps: 1 },
];
