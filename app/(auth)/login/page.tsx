import type { Metadata } from "next";
import { AccountSwitchLink } from "@/features/auth/components/account-switch-link";
import { LoginForm } from "@/features/auth/forms/login-form";

export const metadata: Metadata = { title: "Log in | Kheun Lift" };

export default function LoginPage() {
  return (
    <>
      <h1 className="mt-2 text-lg font-semibold">Welcome back.</h1>
      <LoginForm />
      <AccountSwitchLink
        question="New to Kheun Lift?"
        label="Create an account"
        href="/register"
      />
    </>
  );
}
