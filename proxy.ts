import { NextResponse, type NextRequest } from "next/server";

// Only checks that the cookie exists; the dashboard layout checks the session with Go.
export function proxy(request: NextRequest) {
  if (!request.cookies.has("kheun_session")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/log-lift/:path*", "/profile/:path*", "/leaderboard/:path*"],
};
