import { Icon } from "@/components/ui/icon";

export function RankHeader() {
  return (
    <header className="flex items-end justify-between gap-4">
      <div>
        <p className="mb-2 text-xs uppercase tracking-widest text-accent">
          Strength, on the record
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Rank
        </h1>
        <p className="mt-2 text-sm text-muted">
          A benchmark for your next personal best.
        </p>
      </div>
      <span className="hidden size-14 place-items-center rounded-xl bg-surface text-accent sm:grid">
        <Icon name="trophy" className="size-7" />
      </span>
    </header>
  );
}
