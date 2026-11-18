"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Field } from "@/components/ui/field";
import { SpinnerIcon } from "@/components/ui/spinner";
import type { Variant } from "@/components/ui/modal";
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

// Starting form value of each field. The form sends only fields that differ from it.
const initial = (user: User) => ({
  username: user.username,
  gender: user.gender ?? "",
  bodyWeight: user.bodyWeight?.toString() ?? "",
  height: user.height?.toString() ?? "",
  dateOfBirth: user.dateOfBirth?.slice(0, 10) ?? "",
});

// variant: after a save, "modal" closes the edit modal, "page" goes to the profile, and "inline" keeps the onboarding card on the page.
export function ProfileForm({
  user,
  variant,
}: {
  user: User;
  variant: Variant | "inline";
}) {
  const router = useRouter();
  // Onboarding card and edit modal can be on the same page, so ids must be unique.
  const uid = useId();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const values = initial(user);

  function leave() {
    switch (variant) {
      case "modal":
        return router.back();
      case "page":
        return router.push("/profile");
      case "inline":
        return;
      default: {
        const _exhaustive: never = variant;
        return _exhaustive;
      }
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body: UpdateMeInput = {};
    for (const key of KEYS) {
      const value = String(form.get(key)).trim();
      // Go rejects null, so the form skips an emptied optional field and Go keeps the old value.
      if (value && value !== values[key])
        body[key] = NUMBER_KEYS.has(key) ? Number(value) : value;
    }
    if (Object.keys(body).length === 0) return leave();

    setPending(true);
    setError("");
    try {
      await updateMe(body);
      // cacheComponents keeps this form mounted and hidden after the user leaves, so reset it.
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
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 font-semibold text-background disabled:opacity-60 sm:col-span-2"
      >
        {pending ? <><SpinnerIcon /><span className="sr-only">Saving</span></> : "Save profile"}
      </button>
    </form>
  );
}
