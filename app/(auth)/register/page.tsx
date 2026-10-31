import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Register | Kheun Lift" };

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-3xl font-black">Create an account</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-400">Coming soon. Registration is not available yet.</p>
      <p className="mt-6 text-sm text-zinc-400">Already a member? <Link href="/login" className="font-semibold text-yellow-400 hover:underline">Log in</Link></p>
    </>
  );
}
