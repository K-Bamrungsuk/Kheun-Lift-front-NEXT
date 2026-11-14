"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field } from "@/components/ui/field";
import { errorMessage } from "@/lib/api";
import { updateMe, type UpdateMeInput } from "../api";

export function OnboardingForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body: UpdateMeInput = {
      gender: String(form.get("gender")),
      bodyWeight: Number(form.get("bodyWeight")),
    };
    const height = String(form.get("height"));
    const dateOfBirth = String(form.get("dateOfBirth"));
    if (height) body.height = Number(height);
    if (dateOfBirth) body.dateOfBirth = dateOfBirth;

    setPending(true);
    setError("");
    try {
      await updateMe(body);
      // Re-run the layout so getMe() returns the new profile and this card disappears.
      router.refresh();
    } catch (err) {
      setError(errorMessage(err));
      setPending(false);
    }
  }

  return (
    <section aria-labelledby="onboarding-title" className="rounded-xl border border-accent/30 bg-surface p-5 md:p-6">
      <h2 id="onboarding-title" className="text-lg font-semibold">Complete your profile</h2>
      <p className="mt-1 text-sm text-muted">Gender and body weight set your weight class. You need them before logging a lift.</p>
      <form onSubmit={handleSubmit} className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="gender" className="text-sm text-muted">Gender</label>
          <select id="gender" name="gender" required defaultValue="" className="mt-2 min-h-12 w-full min-w-0 rounded-lg border border-border bg-background px-4 text-base">
            <option value="" disabled>Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <Field id="bodyWeight" label="Body weight (kg)" type="number" inputMode="decimal" min={1} max={999} step={0.1} />
        <Field id="height" label="Height (cm, optional)" type="number" inputMode="decimal" min={1} max={999} step={0.1} required={false} />
        <Field id="dateOfBirth" label="Date of birth (optional)" type="date" min="1900-01-01" required={false} />
        {error && <p role="alert" className="text-sm text-red-400 sm:col-span-2">{error}</p>}
        <button type="submit" disabled={pending} className="flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-4 font-semibold text-background disabled:opacity-60 sm:col-span-2">
          {pending ? "Saving..." : "Save profile"}
        </button>
      </form>
    </section>
  );
}
