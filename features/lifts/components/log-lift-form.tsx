import { Suspense } from "react";
import type { Variant } from "@/components/ui/modal";
import { getExercises } from "../api-server";
import { LogLiftFields } from "./log-lift-fields";

export function LogLiftForm({ variant }: { variant: Variant }) {
  return (
    <section
      aria-labelledby="attempt-title"
      className="space-y-6 rounded-xl bg-surface p-5 md:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
        <h2 id="attempt-title" className="text-lg font-semibold">
          Your lift details
        </h2>
      </div>
      <Suspense>
        <ExerciseFields variant={variant} />
      </Suspense>
    </section>
  );
}

async function ExerciseFields({ variant }: { variant: Variant }) {
  return <LogLiftFields exercises={await getExercises()} variant={variant} />;
}
