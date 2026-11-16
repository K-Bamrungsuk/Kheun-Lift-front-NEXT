import type { Metadata } from "next";
import { ProfilePicture } from "@/features/user/components/profile-picture";

export const metadata: Metadata = { title: "Profile Picture | Kheun Lift" };

export default function ProfilePicturePage() {
  return <ProfilePicture after="profile" />;
}
