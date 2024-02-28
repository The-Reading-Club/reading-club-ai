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
  const requestHeaders = new Headers(req.headers);

  requestHeaders.set("x-pathname", req.nextUrl.pathname);

  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // NextResponse.next({
  //   request: {
  //     headers: requestHeaders,
  //   },
  // });

  // req.auth
  //   console.log("ROUTE: ", req.nextUrl.pathname);
  //   const isLoggedIn = !!req.auth;
  //   console.log("IS LOGGEDIN: ", isLoggedIn);

  console.log("MIDDLEWARE, ROUTE: ", req.nextUrl.pathname);

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isPreviewRoute = nextUrl.pathname.startsWith(previewPrefix);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isPreviewRoute) {
    // do nothing (don't block preview routes)
    // return null;
    return response;
  }

  if (isApiAuthRoute) {
    // do nothing (don't block API auth routes)
    // return null;
    return response;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // already logged in so it doesn't make sense to keep them in auth routes
      response = NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl)
      );
      return response;
    }

    // do nothing (let them go to auth routes)
    // return null;
    return response;
  }

  if (!isLoggedIn && !isPublicRoute) {
    // not logged in and not public route so redirect to login
    response = NextResponse.redirect(new URL("/auth/login", nextUrl));
    return response;
  }

  console.log("MIDDLEWARE, ALLOW ROUTE: ", req.nextUrl.pathname);
  // return null;

  // It's working for now but please learn how to properly run many middlewares
  // This will make it so that you are not running the request headers middle ware on every route
  // per se
  // learn what NextResponse.next does
  // return requestHeadersMiddleware(req);
  return response;
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

// https://medium.com/@aididalam/approach-to-multiple-middleware-and-auth-guard-in-next-js-app-routing-bbb641401477
function requestHeadersMiddleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
