import { Suspense } from "react";
import type { Variant } from "@/components/ui/modal";
import { getMe } from "../api-server";
import { ProfileForm } from "./profile-form";

// The /profile/edit page and its intercepted modal both use this component.
// getMe() sits inside Suspense so the heading shows at once; cacheComponents flags uncached fetches outside Suspense.
export function EditProfile({ variant }: { variant: Variant }) {
  return (
    <section
      aria-labelledby="edit-profile-title"
      className="rounded-xl bg-surface p-5 md:p-7"
    >
      <h2 id="edit-profile-title" className="mb-5 text-lg font-semibold">
        Edit profile
      </h2>
      <Suspense fallback={<p className="text-sm text-muted">Loading...</p>}>
        <EditProfileForm variant={variant} />
      </Suspense>
    </section>
  );
}

async function EditProfileForm({ variant }: { variant: Variant }) {
  const user = await getMe();
  return <ProfileForm user={user} variant={variant} />;
}
