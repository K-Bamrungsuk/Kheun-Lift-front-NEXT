import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Iceberg, Noto_Sans } from "next/font/google";
import "./globals.css";

// Noto Sans has no Thai, so Plex draws Thai text.
const plex = IBM_Plex_Sans_Thai({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-plex",
});

const iceberg = Iceberg({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-iceberg",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "Kheun Lift",
  description:
    "Track your lifts, celebrate personal records, and find your place on the leaderboard.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased ${plex.variable} ${iceberg.variable} ${notoSans.variable}`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
