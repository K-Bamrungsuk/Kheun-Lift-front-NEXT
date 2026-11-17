import { Suspense } from "react";
import { getMe } from "../api-server";
import { ProfileForm } from "./profile-form";

type After = "back" | "profile";

// The /profile/edit page and its intercepted modal both use this component.
// getMe() sits inside Suspense so the heading shows at once; cacheComponents flags uncached fetches outside Suspense.
export function EditProfile({ after }: { after: After }) {
  return (
    <section
      aria-labelledby="edit-profile-title"
      className="rounded-xl bg-surface p-5 md:p-7"
    >
      <h2 id="edit-profile-title" className="mb-5 text-lg font-semibold">
        Edit profile
      </h2>
      <Suspense fallback={<p className="text-sm text-muted">Loading...</p>}>
        <EditProfileForm after={after} />
      </Suspense>
    </section>
  );
}

async function EditProfileForm({ after }: { after: After }) {
  const user = await getMe();
  return <ProfileForm user={user} after={after} />;
}
