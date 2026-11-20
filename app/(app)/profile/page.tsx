import type { Metadata } from "next";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { ModalButton } from "@/components/ui/modal";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { getMyLifts } from "@/features/lifts/api-server";
import { LiftHistory } from "@/features/lifts/components/lift-history";
import { PersonalRecords } from "@/features/lifts/components/personal-records";
import { getMe } from "@/features/user/api-server";
import { AthleteStats } from "@/features/user/components/athlete-stats";
import { DeleteAccountButton } from "@/features/user/components/delete-account-button";
import { EditProfile } from "@/features/user/components/edit-profile";
import { ProfilePicture } from "@/features/user/components/profile-picture";

export const metadata: Metadata = { title: "Profile | Kheun Lift" };

export default async function ProfilePage() {
  const [user, lifts] = await Promise.all([getMe(), getMyLifts()]);
  return (
    <>
      <header>
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
          <ModalButton
            label="Edit profile"
            labelledBy="edit-profile-title"
            className="absolute right-3 top-3 grid size-11 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-high hover:text-foreground border-2 rounded-xl border-gray-600"
            trigger={<Icon name="pencil" className="size-5" />}
          >
            <EditProfile />
          </ModalButton>
          <div className="flex items-center gap-4 pr-10">
            <ModalButton
              label="Change profile picture"
              labelledBy="picture-title"
              className="relative shrink-0 rounded-full"
              trigger={
                <>
                  <Avatar src={user.profileImage} alt="" className="size-16" />
                  <span className="absolute -bottom-0.5 -right-0.5 grid size-6 place-items-center rounded-full border-2 border-surface bg-accent text-background">
                    <Icon name="camera" className="size-3.5" />
                  </span>
                </>
              }
            >
              <ProfilePicture />
            </ModalButton>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-muted">
                Athlete profile
              </p>
              <h2
                id="athlete-title"
                className="mt-1 truncate text-xl font-semibold"
              >
                {user.username}
              </h2>
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
        <div className="min-w-0 space-y-6">
          <PersonalRecords lifts={lifts} />
          <LiftHistory lifts={lifts} isOwner />
        </div>
      </div>
      <LogoutButton className="w-full bg-surface" />
      <DeleteAccountButton />
    </>
  );
}
