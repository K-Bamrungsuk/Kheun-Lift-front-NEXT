import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

// One family covers Latin and Thai, so Thai captions do not fall back to a random system font.
const plex = IBM_Plex_Sans_Thai({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: "Kheun Lift",
  description:
    "Track your lifts, celebrate personal records, and find your place on the leaderboard.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased ${plex.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
