import { Icon } from "@/components/ui/icon";

export function CompleteProfileNotice() {
  return (
    <p className="flex flex-col items-center gap-4 rounded-xl border border-accent/30 bg-surface p-6 text-center text-sm mx-auto w-fit">
      <span className="grid size-14 place-items-center rounded-full bg-accent/10 text-accent">
        <Icon name="alert" className="size-7" />
      </span>
      Add your gender and body weight in your profile to log a lift.
    </p>
  );
}
