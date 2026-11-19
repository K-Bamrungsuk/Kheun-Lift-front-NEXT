import { Panel } from "@/components/ui/panel";
import type { Variant } from "@/components/ui/modal";
import { getExercises } from "../api-server";
import { LogLiftFields } from "./log-lift-fields";

export function LogLiftForm({ variant }: { variant: Variant }) {
  return (
    <Panel id="attempt-title" title="Your lift details">
      <ExerciseFields variant={variant} />
    </Panel>
  );
}

async function ExerciseFields({ variant }: { variant: Variant }) {
  return <LogLiftFields exercises={await getExercises()} variant={variant} />;
}
