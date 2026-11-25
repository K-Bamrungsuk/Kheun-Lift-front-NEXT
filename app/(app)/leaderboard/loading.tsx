import { Skeleton } from "@/components/ui/skeleton";
import { LeaderboardHeader } from "@/features/leaderboard/components/leaderboard-header";

// Suspense fallback around this page; it must sit in the page's folder to cover page-only re-renders.
// It uses the same layout as page.tsx, so the layout does not shift when the data arrives.
export default function Loading() {
  return (
    <div role="status" aria-label="Loading rankings" className="space-y-6">
      <LeaderboardHeader />
      <div className="space-y-5">
        <Skeleton className="h-13.5 sm:max-w-md" />
        <div className="flex gap-2">
          <Skeleton className="h-11 w-36 rounded-full" />
          <Skeleton className="h-11 w-32 rounded-full" />
        </div>
        <Skeleton className="h-96" />
      </div>
    </div>
  );
}
