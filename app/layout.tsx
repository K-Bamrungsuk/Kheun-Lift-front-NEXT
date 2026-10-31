import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kheun Lift",
  description: "Track your lifts, celebrate personal records, and find your place on the leaderboard.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
