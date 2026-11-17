import { Skeleton } from "@/components/ui/skeleton";

// Suspense fallback around this page; it must sit in the page's folder to cover page-only re-renders.
// It uses the same grid as page.tsx, so the layout does not shift when the data arrives.
export default function Loading() {
  return (
    <div role="status" aria-label="Loading profile" className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Profile
        </h1>
        <p className="mt-2 text-sm text-muted">
          Your identity. Your lifts. Your progress.
        </p>
      </header>
      <div className="grid items-start gap-6 md:grid-cols-[300px_minmax(0,1fr)]">
        <Skeleton className="h-80" />
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-2.5">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
          <Skeleton className="h-72" />
        </div>
      </div>
    </div>
  );
}
