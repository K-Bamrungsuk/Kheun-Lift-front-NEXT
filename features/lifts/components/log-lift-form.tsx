import { Suspense } from "react";
import { getMe } from "@/features/user/api-server";
import { getExercises } from "../api-server";
import { LogLiftFields } from "./log-lift-fields";

type After = React.ComponentProps<typeof LogLiftFields>["after"];

export function LogLiftForm({ after }: { after: After }) {
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
        <ExerciseFields after={after} />
      </Suspense>
    </section>
  );
}

// serverFetch reads cookies, so this sits in its own Suspense.
async function ExerciseFields({ after }: { after: After }) {
  return <LogLiftFields exercises={await getExercises()} after={after} />;
}

// getMe() reads cookies, so it sits in its own Suspense; the layout already made this request.
async function WeightClassBadge() {
  const { weightClass } = await getMe();
  if (!weightClass) return null;
  return (
    <span className="rounded-md bg-surface-high px-2.5 py-1.5 font-mono text-[10px] text-accent">
      <span className="sr-only">Weight class: </span>
      {weightClass.name}
    </span>
  );
}
