import { auth } from "@/auth";
import { Ratelimit } from "@upstash/ratelimit";

import { kv } from "@vercel/kv";

// I just need to read the kv store
// import { Ratelimit } from "@upstash/ratelimit";

type Options = {
  feature: string;
};

export const getRateLimitCount = async (options: Options) => {
  const session = await auth();

  const user = session?.user;

  if (!user || !user.email) {
    console.log(user);
    console.log("rate-limit.ts No user found in session");
    return -10;
  }

  // It probably should be the user id but...
  // const rateLimitKey = `trc_ratelimit_${user.id}-${options.feature}`;
  const rateLimitFormattedKey = `trc_ratelimit_${user.email}-${options.feature}`;

  const count = await kv.get<string>(`${rateLimitFormattedKey}-remaining`);

  if (count === null || count === undefined) {
    console.log("rate-limit.ts No count found in kv store");
    console.log({ rateLimitKey: rateLimitFormattedKey });
    console.log({ count });
    return -1;
  }

  return count;
};

export const getRateLimitReset = async (options: Options) => {
  const session = await auth();

  const user = session?.user;

  if (!user || !user.email) {
    console.log(user);
    console.log("rate-limit.ts No user found in session");
    return -10;
  }

  // It probably should be the user id but...
  // const rateLimitKey = `trc_ratelimit_${user.id}-${options.feature}`;
  const rateLimitFormattedKey = `trc_ratelimit_${user.email}-${options.feature}`;

  const count = await kv.get<string>(`${rateLimitFormattedKey}-reset`);

  if (count === null || count === undefined) {
    console.log("rate-limit.ts No count found in kv store");
    console.log({ rateLimitKey: rateLimitFormattedKey });
    console.log({ count });
    return -1;
  }

  return count;
};
