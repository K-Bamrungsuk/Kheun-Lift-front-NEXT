import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import type { Variant } from "@/components/ui/modal";
import { getMe } from "../api-server";
import { ProfilePictureForm } from "./profile-picture-form";

// getMe() sits inside Suspense so the heading shows at once; cacheComponents flags uncached fetches outside Suspense.

export function ProfilePicture({ variant }: { variant: Variant }) {
  return (
    <section
      aria-labelledby="picture-title"
      className="rounded-xl bg-surface p-5 md:p-7"
    >
      <h2 id="picture-title" className="mb-5 text-lg font-semibold">
        Profile picture
      </h2>
      <Suspense fallback={<Spinner />}>
        <ProfilePictureLoader variant={variant} />
      </Suspense>
    </section>
  );
}

async function ProfilePictureLoader({ variant }: { variant: Variant }) {
  const user = await getMe();
  return <ProfilePictureForm user={user} variant={variant} />;
}
