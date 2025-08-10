import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/signup"
        ) {
          return true;
        }

        if (pathname === "/" || pathname === "/browse") {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/api/auth/:path*", "/login", "/signup", "/", "/browse"],
};
