import { Suspense } from "react";
import { getMe } from "../api-server";
import { ProfilePictureForm } from "./profile-picture-form";

// Shared by the /profile/picture page and its intercepted modal.
// getMe() sits inside Suspense so the heading shows at once; cacheComponents flags uncached fetches outside Suspense.
type After = "back" | "profile";

export function ProfilePicture({ after }: { after: After }) {
  return (
    <section
      aria-labelledby="picture-title"
      className="rounded-xl bg-surface p-5 md:p-7"
    >
      <h2 id="picture-title" className="mb-5 text-lg font-semibold">
        Profile picture
      </h2>
      <Suspense fallback={<p className="text-sm text-muted">Loading...</p>}>
        <ProfilePictureLoader after={after} />
      </Suspense>
    </section>
  );
}

async function ProfilePictureLoader({ after }: { after: After }) {
  const user = await getMe();
  return <ProfilePictureForm user={user} after={after} />;
}
