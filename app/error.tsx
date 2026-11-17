"use client";

// This file sits at the app root, so it also catches getMe() failing in the (app) layout when Go is down.
export default function ErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="text-xs font-semibold tracking-widest text-accent">
        KHEUN LIFT / ERROR
      </p>
      <h1 className="text-3xl font-black">Something went wrong.</h1>
      <p className="text-sm text-muted">
        We could not reach the server. Please try again.
      </p>
      <button
        type="button"
        className="rounded-xl bg-accent px-5 py-3 font-bold text-background hover:bg-accent/90"
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </main>
  );
}
