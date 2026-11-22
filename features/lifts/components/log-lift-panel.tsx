import { Panel } from "@/components/ui/panel";
import { getExercises } from "../api-server";
import { LogLiftForm } from "./log-lift-form";

export function LogLiftPanel() {
  return (
    <Panel id="attempt-title" title="Your lift details">
      <LogLiftFormLoader />
    </Panel>
  );
}

async function LogLiftFormLoader() {
  return <LogLiftForm exercises={await getExercises()} />;
}
