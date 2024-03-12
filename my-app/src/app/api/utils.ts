// RATE LIMITING
import { kv } from "@vercel/kv";
import { Ratelimit /*Duration*/ } from "@upstash/ratelimit";
//Module '"@upstash/ratelimit"' declares 'Duration' locally, but it is not exported.ts(2459)
// index.d.ts(119, 6): 'Duration' is declared here.
type Unit = "ms" | "s" | "m" | "h" | "d";
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

import { checkSubscription } from "@/lib/subscription";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { dev } from "@/config";

type Options = {
  slidingWindowTokens: number;
  slidingWindowDuration: Duration;
  //   rateLimitKey: string | null;
  feature: string;
};

export const SLIDING_WINDOW_CONSTANT = dev ? "2 m" : "7 d";

export async function validatePaidSubscription(
  request: Request,
  options: Options = {
    slidingWindowTokens: 5,
    slidingWindowDuration: SLIDING_WINDOW_CONSTANT,
    // rateLimitKey: null,
    feature: "default",
  }
) {
  // Should put this check into a single function in all relevant routes!
  const isPro = await checkSubscription();
  // FIRST THING IN ROUTE IS TO SET RATE LIMIT
  if (
    isPro == false &&
    // process.env.NODE_ENV != "development" &&
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  ) {
    const ip = request.headers.get("x-forwarded-for");

    const ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(
        options.slidingWindowTokens,
        options.slidingWindowDuration
      ),
    });

    const session = await auth();
    const rateLimitKey = session?.user.email || ip;

    const rateLimitFormattedKey = `trc_ratelimit_${rateLimitKey}-${options.feature}`;

    const rateLimitResult = await ratelimit.limit(rateLimitFormattedKey);

    const { success, limit, reset, remaining } = rateLimitResult;

    kv.set(`${rateLimitFormattedKey}-remaining`, remaining);
    kv.set(`${rateLimitFormattedKey}-reset`, reset);

    console.log("RATE LIMIT KEY: ", rateLimitKey);
    console.log("RATE LIMIT FEATURE: ", options.feature);
    console.log("RATE LIMIT SUCCESS: ", success);
    console.log("RATE LIMIT LIMIT: ", limit);
    console.log("RATE LIMIT RESET: ", reset);
    console.log("RATE LIMIT REMAINING: ", remaining);

    if (!success) {
      return NextResponse.json(
        { msg: "Rate limit exceeded for the day", status: 429 },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }
  } else {
    console.log("No rate limit, User is a pro user");
    return null;
  }
}
