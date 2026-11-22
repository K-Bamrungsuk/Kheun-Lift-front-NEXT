import { Skeleton } from "@/components/ui/skeleton";
import { RankHeader } from "@/features/leaderboard/components/rank-header";

// Suspense fallback around this page; it must sit in the page's folder to cover page-only re-renders.
// It uses the same layout as page.tsx, so the layout does not shift when the data arrives.
export default function Loading() {
  return (
    <div role="status" aria-label="Loading rankings" className="space-y-6">
      <RankHeader />
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
