import { redirect } from "next/navigation";

// This page only redirects, so there is nothing to validate as instant.
export const instant = false;

export default function Home() {
  redirect("/dashboard");
}
