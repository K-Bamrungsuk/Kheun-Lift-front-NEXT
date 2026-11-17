import { Skeleton } from "@/components/ui/skeleton";

// Suspense fallback around this page; it must sit in the page's folder to cover page-only re-renders.
// It uses the same layout as page.tsx, so the layout does not shift when the data arrives.
export default function Loading() {
  return (
    <div role="status" aria-label="Loading rankings" className="space-y-6">
      <header>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
          Strength, on the record
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Rank
        </h1>
        <p className="mt-2 text-sm text-muted">
          A benchmark for your next personal best.
        </p>
      </header>
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-11 w-28" />
          <Skeleton className="h-11 w-20" />
          <Skeleton className="h-11 w-24" />
        </div>
        <Skeleton className="h-20" />
        <Skeleton className="h-96" />
      </div>
    </div>
  );
}
