// Suspense fallback for each page below the shared layout, shown on client navigation.
export default function Loading() {
  return <p role="status" className="text-sm text-muted">Loading...</p>;
}
