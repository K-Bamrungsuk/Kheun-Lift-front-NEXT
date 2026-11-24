import { Icon } from "@/components/ui/icon";

export function CompleteProfileNotice() {
  return (
    <p className="flex items-center gap-3 rounded-xl border border-accent/30 bg-surface p-4 text-sm mx-auto w-fit">
      <Icon name="alert" className="size-5 shrink-0 text-accent" />
      Add your gender and body weight in your profile to log a lift.
    </p>
  );
}
