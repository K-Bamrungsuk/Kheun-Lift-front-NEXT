import type { Metadata } from "next";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { ModalButton } from "@/components/ui/modal";
import { Panel } from "@/components/ui/panel";
import { getMyLifts } from "@/features/lifts/api-server";
import { LiftHistory } from "@/features/lifts/components/lift-history";
import { PersonalRecords } from "@/features/lifts/components/personal-records";
import { getMe } from "@/features/user/api-server";
import { AthleteCard } from "@/features/user/components/athlete-card";
import { DeleteAccountButton } from "@/features/user/components/delete-account-button";
import { ProfileForm } from "@/features/user/forms/profile-form";
import { ProfilePictureForm } from "@/features/user/forms/profile-picture-form";

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
        <AthleteCard
          user={user}
          label="Athlete profile"
          action={
            <ModalButton
              label="Edit profile"
              labelledBy="edit-profile-title"
              className="absolute right-3 top-3 grid size-11 place-items-center rounded-xl border-2 border-border text-muted transition-colors hover:bg-surface-high hover:text-foreground"
              trigger={<Icon name="pencil" className="size-5" />}
            >
              <Panel id="edit-profile-title" title="Edit profile">
                <ProfileForm user={user} />
              </Panel>
            </ModalButton>
          }
          avatar={
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
              <Panel id="picture-title" title="Profile picture">
                <ProfilePictureForm user={user} />
              </Panel>
            </ModalButton>
          }
        />
        <div className="min-w-0 space-y-6">
          <PersonalRecords lifts={lifts} />
          <LiftHistory lifts={lifts} isOwner />
        </div>
      </div>
      <section aria-labelledby="danger-title">
        <h2 id="danger-title" className="mb-2 text-sm font-semibold">
          Danger zone
        </h2>
        <div className="flex items-center justify-between gap-4 rounded-xl border border-danger/50 p-4">
          <div>
            <h3 className="text-sm font-semibold">Delete account</h3>
            <p className="mt-0.5 text-sm text-muted">This can&apos;t be undone.</p>
          </div>
          <DeleteAccountButton />
        </div>
      </section>
    </>
  );
}
