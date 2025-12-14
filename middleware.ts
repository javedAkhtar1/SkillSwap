// import { NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   function middleware() {
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         const { pathname } = req.nextUrl;
//         if (
//           pathname.startsWith("/api/auth") ||
//           pathname === "/login" ||
//           pathname === "/signup"
//         ) {
//           return true;
//         }
//         if (pathname === "/" || pathname === "/browse") {
//           return true;
//         }
//         return !!token;
//       },
//     },
//   }
// );

// export const config = {
//   matcher: [
//     "/api/auth/:path*",
//     "/login",
//     "/signup",
//     "/",
//     "/browse",
//     "/api/user/change-password"
//   ],
// };
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // If authorized, just continue
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login", // 🔴 redirect here when unauthorized
    },
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/signup" ||
          pathname === "/" ||
          pathname === "/browse"
        ) {
          return true;
        }

        // 🔐 Protect all /profile routes
        if (pathname.startsWith("/profile")) {
          return !!token;
        }

        // Default: require auth
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/profile/:path*",           // 🔐 protected
    "/api/user/change-password", // 🔐 protected
  ],
};
