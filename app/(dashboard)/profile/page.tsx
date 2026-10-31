import type { Metadata } from "next";

export const metadata: Metadata = { title: "Profile | Kheun Lift" };

export default function ProfilePage() {
  return (
    <>
      <h1 className="text-3xl font-black md:text-4xl">Profile</h1>
      <p className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-sm leading-6 text-zinc-400">Coming soon. Your athlete profile, personal records, and lift history will be available here.</p>
    </>
  );
}
