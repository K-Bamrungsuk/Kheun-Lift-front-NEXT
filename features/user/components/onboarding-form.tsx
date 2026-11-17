import type { User } from "../types";
import { ProfileForm } from "./profile-form";

export function OnboardingForm({ user }: { user: User }) {
  return (
    <section
      aria-labelledby="onboarding-title"
      className="rounded-xl border border-accent/30 bg-surface p-5 md:p-6"
    >
      <h2 id="onboarding-title" className="text-lg font-semibold">
        Complete your profile
      </h2>
      <p className="mt-1 mb-5 text-sm text-muted">
        Gender and body weight set your weight class. You need them before
        logging a lift.
      </p>
      <ProfileForm user={user} variant="inline" />
    </section>
  );
}
