import type { Metadata } from "next";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { getMyLifts } from "@/features/lifts/api-server";
import { LiftHistory } from "@/features/lifts/components/lift-history";
import { PersonalRecords } from "@/features/lifts/components/personal-records";
import { getMe } from "@/features/user/api-server";
import { AthleteStats } from "@/features/user/components/athlete-stats";
import { DeleteAccountButton } from "@/features/user/components/delete-account-button";
import { ProfileImageInput } from "@/features/user/components/profile-image-input";

export const metadata: Metadata = { title: "Profile | Kheun Lift" };

export default async function ProfilePage() {
  const [user, lifts] = await Promise.all([getMe(), getMyLifts()]);
  return (
    <>
      <header>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
          The athlete
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Profile
        </h1>
        <p className="mt-2 text-sm text-muted">
          Your identity. Your lifts. Your progress.
        </p>
      </header>
      <div className="grid items-start gap-6 md:grid-cols-[300px_minmax(0,1fr)]">
        <section
          aria-labelledby="athlete-title"
          className="relative rounded-xl bg-surface p-5 md:p-6"
        >
          <Link
            href="/profile/edit"
            aria-label="Edit profile"
            className="absolute right-3 top-3 grid size-11 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-high hover:text-foreground"
          >
            <Icon name="pencil" className="size-5" />
          </Link>
          <div className="flex items-center gap-4 pr-10">
            <Avatar
              src={user.profileImage}
              alt={`${user.username} profile picture`}
              className="size-16"
            />
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Athlete profile
              </p>
              <h2
                id="athlete-title"
                className="mt-1 truncate text-xl font-semibold"
              >
                {user.username}
              </h2>
              {user.weightClass && (
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
                  <Icon name="trophy" className="size-3.5" />
                  <span className="sr-only">Weight class: </span>
                  {user.weightClass.name}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <ProfileImageInput hasImage={user.profileImage !== null} />
          </div>
          <div className="mt-6">
            <AthleteStats user={user} />
          </div>
        </section>
        <div className="min-w-0 space-y-6">
          <PersonalRecords lifts={lifts} />
          <LiftHistory lifts={lifts} />
        </div>
      </div>
      <LogoutButton className="w-full bg-surface" />
      <DeleteAccountButton />
    </>
  );
}
