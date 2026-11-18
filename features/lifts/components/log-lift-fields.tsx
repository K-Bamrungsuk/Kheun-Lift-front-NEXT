"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { SpinnerIcon } from "@/components/ui/spinner";
import { leave, type Variant } from "@/components/ui/modal";
import { errorMessage } from "@/lib/api";
import { createLift } from "../api";
import type { Exercise } from "../types";

// variant: after a submit, "modal" closes the modal and "page" goes to the dashboard.
export function LogLiftFields({
  exercises,
  variant,
}: {
  exercises: Exercise[];
  variant: Variant;
}) {
  const router = useRouter();
  // Modal and full page can both stay mounted, so ids must be unique.
  const uid = useId();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const caption = String(form.get("caption")).trim();

    setPending(true);
    setError("");
    try {
      await createLift({
        exerciseId: Number(form.get("exerciseId")),
        weight: Number(form.get("weight")),
        reps: Number(form.get("reps")),
        videoUrl: String(form.get("videoUrl")).trim(),
        // Go stores what it gets, so the form does not send an empty caption.
        ...(caption && { caption }),
      });
      // cacheComponents keeps this form mounted and hidden after the user leaves, so reset it.
      setPending(false);
      formElement.reset();
      leave(router, variant, "/dashboard");
      // Re-run server components so the new lift shows up.
      router.refresh();
    } catch (err) {
      setError(errorMessage(err));
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset>
        <legend className="mb-3 text-xs uppercase tracking-widest text-muted">
          Discipline
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {exercises.map((exercise, index) => (
            <label key={exercise.id} className="cursor-pointer">
              <input
                type="radio"
                name="exerciseId"
                value={exercise.id}
                required
                defaultChecked={index === 0}
                className="peer sr-only"
              />
              <span className="flex min-h-12 items-center justify-center rounded-lg border border-border bg-background px-2 text-sm text-muted peer-checked:border-accent/50 peer-checked:bg-accent/10 peer-checked:text-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent">
                {exercise.name}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${uid}weight`}
            className="text-xs uppercase tracking-widest text-muted"
          >
            Load (kg)
          </label>
          <input
            id={`${uid}weight`}
            name="weight"
            type="number"
            min="0.5"
            step="0.5"
            required
            defaultValue="100"
            className="mt-3 min-h-16 w-full min-w-0 rounded-lg border border-border bg-background px-4 text-2xl tabular-nums"
          />
        </div>
        <div>
          <label
            htmlFor={`${uid}reps`}
            className="text-xs uppercase tracking-widest text-muted"
          >
            Reps
          </label>
          <input
            id={`${uid}reps`}
            name="reps"
            type="number"
            min="1"
            step="1"
            required
            defaultValue="1"
            className="mt-3 min-h-16 w-full min-w-0 rounded-lg border border-border bg-background px-4 text-2xl tabular-nums"
          />
        </div>
      </div>
      <div>
        <label htmlFor={`${uid}video`} className="text-sm text-muted">
          Verification video URL
        </label>
        <input
          id={`${uid}video`}
          name="videoUrl"
          type="url"
          required
          placeholder="https://..."
          className="mt-3 min-h-12 w-full min-w-0 rounded-lg border border-border bg-background px-4 text-sm placeholder:text-muted/60"
        />
      </div>
      <div>
        <label htmlFor={`${uid}caption`} className="text-sm text-muted">
          Notes &amp; context
        </label>
        <textarea
          id={`${uid}caption`}
          name="caption"
          rows={3}
          maxLength={300}
          placeholder="How did it feel? Technique, equipment, or a new personal best."
          className="mt-3 w-full resize-y rounded-lg border border-border bg-background p-4 text-sm leading-6 placeholder:text-muted/60"
        />
      </div>
      <div className="border-t border-border pt-5">
        {error && (
          <p role="alert" className="mb-4 text-sm text-red-400">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 font-semibold text-background disabled:opacity-60"
        >
          {pending ? <SpinnerIcon className="size-5" label="Submitting" /> : <><Icon name="shieldCheck" />Submit lift</>}
        </button>
      </div>
    </form>
  );
}
