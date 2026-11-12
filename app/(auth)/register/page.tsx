import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = { title: "Register | Kheun Lift" };

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-3xl font-black">Create an account</h1>
      <RegisterForm />
      <p className="mt-6 text-sm text-muted">Already a member? <Link href="/login" className="font-semibold text-accent hover:underline">Log in</Link></p>
    </>
  );
}
