import { Icon } from "@/components/ui/icon";
import { Panel } from "@/components/ui/panel";
import { getMe } from "@/features/user/api-server";
import { getExercises } from "../api-server";
import { LogLiftForm } from "../forms/log-lift-form";

export async function LogLiftPanel() {
  const user = await getMe();
  if (!user.gender || user.bodyWeight == null) {
    return (
      <div className="px-5 pb-6 text-center md:px-7">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent/10 text-accent">
          <Icon name="alert" className="size-7" />
        </span>
        <h2 id="attempt-title" className="mt-4 text-lg font-semibold">
          Complete your profile
        </h2>
        <p className="mt-2 text-sm text-muted">
          Add your gender and body weight in your profile to log a lift.
        </p>
      </div>
    );
  }
  return (
    <Panel id="attempt-title" title="Your lift details">
      <LogLiftFormLoader />
    </Panel>
  );
}

async function LogLiftFormLoader() {
  return <LogLiftForm exercises={await getExercises()} />;
}
