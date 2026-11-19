import { Panel } from "@/components/ui/panel";
import { getExercises } from "../api-server";
import { LogLiftFields } from "./log-lift-fields";

export function LogLiftForm() {
  return (
    <Panel id="attempt-title" title="Your lift details">
      <ExerciseFields />
    </Panel>
  );
}

async function ExerciseFields() {
  return <LogLiftFields exercises={await getExercises()} />;
}
