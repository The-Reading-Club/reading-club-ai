// import { auth } from "./auth";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
  DEFAULT_LOGIN_REDIRECT_URL,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  //   console.log("ROUTE: ", req.nextUrl.pathname);
  //   const isLoggedIn = !!req.auth;
  //   console.log("IS LOGGEDIN: ", isLoggedIn);

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    // do nothing (don't block API auth routes)
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // already logged in so it doesn't make sense to keep them in auth routes
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl));
    }

    // do nothing (let them go to auth routes)
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    // not logged in and not public route so redirect to login
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

// export const config = {
//   //   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
export const config = {
  //   matcher: ["/auth/login", "/auth/register"],
  //   https://clerk.com/docs/references/nextjs/auth-middleware
  // all routes except specific next static files and images
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
