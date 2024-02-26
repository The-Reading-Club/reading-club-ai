// import { auth } from "./auth";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
  DEFAULT_LOGIN_REDIRECT_URL,
  apiAuthPrefix,
  authRoutes,
  previewPrefix,
  publicRoutes,
} from "@/routes";
import { NextRequest, NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  //   console.log("ROUTE: ", req.nextUrl.pathname);
  //   const isLoggedIn = !!req.auth;
  //   console.log("IS LOGGEDIN: ", isLoggedIn);

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isPreviewRoute = nextUrl.pathname.startsWith(previewPrefix);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isPreviewRoute) {
    // do nothing (don't block preview routes)
    return null;
  }

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

  console.log("MIDDLEWARE, ALLOW ROUTE: ", req.nextUrl.pathname);
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

// https://stackoverflow.com/questions/75362636/how-can-i-get-the-url-pathname-on-a-server-component-next-js-13/75363135#75363135
// https://stackoverflow.com/questions/74584091/how-to-get-the-current-pathname-in-the-app-directory-of-next-js
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
