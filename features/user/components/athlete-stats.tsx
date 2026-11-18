import { Icon } from "@/components/ui/icon";
import type { PublicUser, User } from "../types";

export function AthleteStats({ user }: { user: PublicUser & Partial<Pick<User, "dateOfBirth">> }) {
  // UTC because Go stores birthdays at UTC midnight; local time would show the day before in some zones.
  const born = user.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
    : "—";

  return (
    <dl className="grid grid-cols-2 gap-2.5">
      <div className="rounded-lg bg-surface-high p-3">
        <dt className="flex items-center gap-1.5 text-xs text-muted">
          <Icon name="user" className="size-4" />
          Gender
        </dt>
        <dd className="mt-2 text-sm capitalize">{user.gender ?? "—"}</dd>
      </div>
      <div className="rounded-lg bg-surface-high p-3">
        <dt className="flex items-center gap-1.5 text-xs text-muted">
          <Icon name="weight" className="size-4" />
          Body weight
        </dt>
        <dd className="mt-2 text-sm">
          {user.bodyWeight != null ? `${user.bodyWeight} kg` : "—"}
        </dd>
      </div>
      <div className="rounded-lg bg-surface-high p-3">
        <dt className="text-xs text-muted">Height</dt>
        <dd className="mt-2 text-sm">
          {user.height != null ? `${user.height} cm` : "—"}
        </dd>
      </div>
      <div className="rounded-lg bg-surface-high p-3">
        <dt className="text-xs text-muted">Born</dt>
        <dd className="mt-2 text-sm">{born}</dd>
      </div>
    </dl>
  );
}
