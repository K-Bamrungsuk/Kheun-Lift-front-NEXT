import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import type { PublicUser, User } from "../types";
import { AthleteStats } from "./athlete-stats";

export function AthleteCard({
  user,
  label,
  avatar,
  action,
  heading: Heading = "h2",
}: {
  user: PublicUser & Partial<Pick<User, "dateOfBirth">>;
  label: string;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  heading?: "h1" | "h2";
}) {
  return (
    <section aria-labelledby="athlete-title" className="relative rounded-xl bg-surface p-5 md:p-6">
      {action}
      <div className={`flex items-center gap-4 ${action ? "pr-10" : ""}`}>
        {avatar ?? <Avatar src={user.profileImage} alt="" className="size-16" />}
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-muted">{label}</p>
          <Heading id="athlete-title" className="mt-1 truncate text-xl font-semibold">
            {user.username}
          </Heading>
          {user.weightClass && (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-accent/25 bg-accent/10 px-2.5 py-1 text-xs text-accent">
              <Icon name="trophy" className="size-3.5" />
              <span className="sr-only">Weight class: </span>
              {user.weightClass.name}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6">
        <AthleteStats user={user} />
      </div>
    </section>
  );
}
