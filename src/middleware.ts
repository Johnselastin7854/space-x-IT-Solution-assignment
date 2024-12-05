import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = ["/sign-in", "/sign-up", "/verify-email"];
  const token = request.cookies.get("token")?.value ?? "";

  if (publicRoute.includes(path) && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!publicRoute.includes(path) && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/verify-email"],
};
