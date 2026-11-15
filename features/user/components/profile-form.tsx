"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Field } from "@/components/ui/field";
import { errorMessage } from "@/lib/api";
import { updateMe, type UpdateMeInput } from "../api";
import type { User } from "../types";

const KEYS = [
  "username",
  "gender",
  "bodyWeight",
  "height",
  "dateOfBirth",
] as const;
const NUMBER_KEYS = new Set(["bodyWeight", "height"]);

// Form value of each field, so unchanged fields are not sent.
const initial = (user: User) => ({
  username: user.username,
  gender: user.gender ?? "",
  bodyWeight: user.bodyWeight?.toString() ?? "",
  height: user.height?.toString() ?? "",
  dateOfBirth: user.dateOfBirth?.slice(0, 10) ?? "",
});

// after: "back" closes the edit modal, "profile" leaves the full edit page, none stays (onboarding).
export function ProfileForm({
  user,
  after,
}: {
  user: User;
  after?: "back" | "profile";
}) {
  const router = useRouter();
  // Onboarding card and edit modal can be on the same page, so ids must be unique.
  const uid = useId();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const values = initial(user);

  function leave() {
    if (after === "back") router.back();
    if (after === "profile") router.push("/profile");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body: UpdateMeInput = {};
    for (const key of KEYS) {
      const value = String(form.get(key)).trim();
      // Go rejects null, so an emptied optional field is left as it was.
      if (value && value !== values[key])
        body[key] = NUMBER_KEYS.has(key) ? Number(value) : value;
    }
    if (Object.keys(body).length === 0) return leave();

    setPending(true);
    setError("");
    try {
      await updateMe(body);
      // cacheComponents keeps this form mounted (hidden) after leaving, so reset it.
      setPending(false);
      leave();
      // Re-run server components so getMe() returns the new profile.
      router.refresh();
    } catch (err) {
      setError(errorMessage(err));
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field
        id={`${uid}username`}
        name="username"
        label="Username"
        maxLength={20}
        defaultValue={values.username}
      />
      <div>
        <label htmlFor={`${uid}gender`} className="text-sm text-muted">
          Gender
        </label>
        <select
          id={`${uid}gender`}
          name="gender"
          required
          defaultValue={values.gender}
          className="mt-2 min-h-12 w-full min-w-0 rounded-lg border border-border bg-background px-4 text-base appearance-none"
        >
          <option value="" disabled>
            Select
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <Field
        id={`${uid}bodyWeight`}
        name="bodyWeight"
        label="Body weight (kg)"
        type="number"
        inputMode="decimal"
        min={1}
        max={999}
        step={0.1}
        defaultValue={values.bodyWeight}
      />
      <Field
        id={`${uid}height`}
        name="height"
        label="Height (cm, optional)"
        type="number"
        inputMode="decimal"
        min={1}
        max={999}
        step={0.1}
        required={false}
        defaultValue={values.height}
      />
      <Field
        id={`${uid}dateOfBirth`}
        name="dateOfBirth"
        label="Date of birth (optional)"
        type="date"
        min="1900-01-01"
        required={false}
        defaultValue={values.dateOfBirth}
      />
      {error && (
        <p role="alert" className="text-sm text-red-400 sm:col-span-2">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-4 font-semibold text-background disabled:opacity-60 sm:col-span-2"
      >
        {pending ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
