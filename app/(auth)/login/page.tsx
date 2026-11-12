import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = { title: "Log in | Kheun Lift" };

export default function LoginPage() {
  return (
    <>
      <h1 className="text-3xl font-black">Log in</h1>
      <LoginForm />
      <p className="mt-6 text-sm text-muted">New to Kheun Lift? <Link href="/register" className="font-semibold text-accent hover:underline">Create an account</Link></p>
    </>
  );
}
