// Suspense fallback around this page; it must sit in the page's folder to cover page-only re-renders.
export default function Loading() {
  return <p role="status" className="text-sm text-muted">Loading...</p>;
}
