// Faint ring with a short arc; `.spinner` in globals.css waits 150ms and fades in so fast loads never flash.
export function SpinnerIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={`spinner ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" opacity=".25" />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </svg>
  );
}

// Suspense fallback.
export function Spinner() {
  return (
    <div role="status" className="flex justify-center p-5 text-muted">
      <SpinnerIcon className="size-6" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
