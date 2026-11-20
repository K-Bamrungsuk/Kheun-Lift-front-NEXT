"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { errorMessage } from "@/lib/api";
import { login, register } from "../api";
import { Field } from "@/components/ui/field";
import { SpinnerIcon } from "@/components/ui/spinner";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    setError("");
    startTransition(async () => {
      try {
        await register({
          username: String(form.get("username")),
          email,
          password,
        });
      } catch (err) {
        setError(errorMessage(err));
        return;
      }

      // Go does not set a session on register, so log in right away.
      // The account exists now; if this login fails, send the user to log in by hand.
      const next = await login(email, password).then(
        () => "/dashboard",
        () => "/login",
      );
      startTransition(() => {
        router.replace(next);
        router.refresh();
      });
    });
  }

  return (
    <form method="post" onSubmit={handleSubmit} className="mt-6 space-y-5">
      <Field
        id="username"
        label="Username"
        autoComplete="username"
        maxLength={20}
      />
      <Field id="email" label="Email" type="email" autoComplete="email" />
      <Field
        id="password"
        label="Password (at least 6 characters)"
        type="password"
        autoComplete="new-password"
        minLength={6}
      />
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-4 font-semibold text-background disabled:opacity-60"
      >
        {pending ? <SpinnerIcon label="Creating account" /> : "Create account"}
      </button>
    </form>
  );
}
