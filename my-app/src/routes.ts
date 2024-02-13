// js doc practice
/**
 * @description An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 * @param
 * @returns
 */
export const publicRoutes = ["/", "/api/stripe/webhook"];

/**
 * @description An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  // "/auth/register",
  "/auth/error",
];

/**
 * @description The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * @description The default redirect path after logging in
 * @type {string}
 */
// export const DEFAULT_LOGIN_REDIRECT_URL = "/settings";
// export const DEFAULT_LOGIN_REDIRECT_URL = "/editor";
export const DEFAULT_LOGIN_REDIRECT_URL = "/drafts";

// Beware of auth walls with stripe webhooks
// I don't know why I didn't have this issue with the generate route...
// Maybe because of the origin
// https://stackoverflow.com/questions/53213735/stripe-webhooks-return-302-on-laravel-application-using-spatie-webhook
