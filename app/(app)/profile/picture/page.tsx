import type { Metadata } from "next";
import { ProfilePicture } from "@/features/user/components/profile-picture";

export const metadata: Metadata = { title: "Profile Picture | Kheun Lift" };

export default function ProfilePicturePage() {
  // Same width as the picture modal, so a refresh keeps the same look.
  return (
    <div className="mx-auto w-full max-w-md">
      <ProfilePicture variant="page" />
    </div>
  );
}
