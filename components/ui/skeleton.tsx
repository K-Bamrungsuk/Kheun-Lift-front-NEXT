export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-xl bg-surface motion-safe:animate-pulse ${className}`}
    />
  );
}
