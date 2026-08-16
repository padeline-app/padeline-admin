import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "__session";
const PUBLIC_PATHS = ["/sign-in", "/denied"];

// Optimistic check only (cookie presence — no verification, no DB), per the
// Next.js auth guide: proxy is not the security boundary. Real enforcement is
// requireAdmin() in each gated page / Server Action (lib/auth.ts).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSessionCookie = request.cookies.has(SESSION_COOKIE_NAME);
  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  if (!hasSessionCookie && !isPublic) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  if (hasSessionCookie && pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
