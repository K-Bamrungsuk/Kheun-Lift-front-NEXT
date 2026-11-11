import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Log in | Kheun Lift" };

export default function LoginPage() {
  return (
    <>
      <h1 className="text-3xl font-black">Log in</h1>
      <p className="mt-3 text-sm leading-6 text-muted">Coming soon. Sign-in is not available yet.</p>
      <p className="mt-6 text-sm text-muted">New to Kheun Lift? <Link href="/register" className="font-semibold text-accent hover:underline">Create an account</Link></p>
    </>
  );
}
