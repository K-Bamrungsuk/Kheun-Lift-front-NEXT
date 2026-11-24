import type { Metadata } from "next";
import { AccountSwitchLink } from "@/features/auth/components/account-switch-link";
import { RegisterForm } from "@/features/auth/forms/register-form";

export const metadata: Metadata = { title: "Register | Kheun Lift" };

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-3xl font-black">Create an account</h1>
      <RegisterForm />
      <AccountSwitchLink
        question="Already a member?"
        label="Log in"
        href="/login"
      />
    </>
  );
}
