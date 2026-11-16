import { Skeleton } from "@/components/ui/skeleton";

// Suspense fallback around this page; it must sit in the page's folder to cover page-only re-renders.
// Same grid as DashboardOverview so nothing jumps when the data arrives.
export default function Loading() {
  return (
    <div role="status" aria-label="Loading dashboard" className="space-y-6">
      <header>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
          Your training space
        </p>
        <Skeleton className="h-9 w-64 md:h-10" />
        <p className="mt-2 text-sm text-muted">
          Build strength. Keep the record.
        </p>
      </header>
      <div className="grid items-start gap-6 md:grid-cols-2">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
      <Skeleton className="h-72" />
    </div>
  );
}
