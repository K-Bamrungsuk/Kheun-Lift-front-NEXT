import { NextResponse, type NextRequest } from "next/server";

// This only checks that the cookie exists. The (app) layout checks the session with Go.
export function proxy(request: NextRequest) {
  if (!request.cookies.has("kheun_session")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/leaderboard/:path*",
    "/lifts/:path*",
    "/users/:path*",
  ],
};
