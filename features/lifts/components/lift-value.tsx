export function LiftValue({ lift }: { lift: { weight: number; reps: number } }) {
  return (
    <span className="whitespace-nowrap tabular-nums">
      {lift.weight}
      <span className="ml-0.5 text-xs font-normal text-muted">kg</span>
      <span className="ml-1 font-normal text-muted">× {lift.reps}</span>
    </span>
  );
}
