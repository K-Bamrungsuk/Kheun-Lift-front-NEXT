import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="text-xs font-semibold tracking-widest text-accent">KHEUN LIFT / 404</p>
      <h1 className="text-3xl font-black">This page is out of reach.</h1>
      <p className="text-sm text-muted">Let’s get you back to your training space.</p>
      <Link className="rounded-xl bg-accent px-5 py-3 font-bold text-background hover:bg-accent/90" href="/dashboard">Back to dashboard <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
