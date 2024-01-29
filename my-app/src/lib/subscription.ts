import { getCurrentUser } from "@/actions/getCurrentUser";

import { db } from "@/lib/db";

// why is this in lib?

// I probably do want to give it a grace period in production after all
// const DAY_IN_MS = 0; // grace period after subscription ends date
const DAY_IN_MS = 86_400_000; // grace period after subscription ends date
// the webhook should be in charge of updating the subscription ends date on database

// I'd prefer to have a hook that is about checking subscription details from stripe...
// I think so too

export const checkSubscription = async () => {
  console.log("[CHECK SUBSCRIPTION] Start");
  const currentUser = await getCurrentUser();
  console.log("[CHECK SUBSCRIPTION] currentUser", currentUser?.email);
  const userId = currentUser?.id;
  console.log("[CHECK SUBSCRIPTION] userId", userId);

  if (!userId) {
    return false;
  }

  const userSubscription = await db.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  console.log(
    "[CHECK SUBSCRIPTION] userSubscription.stripeSubscriptionId",
    userSubscription?.stripeSubscriptionId
  );
  console.log(
    "[CHECK SUBSCRIPTION] userSubscription.stripeCurrentPeriodEnd",
    userSubscription?.stripeCurrentPeriodEnd
  );
  console.log(
    "[CHECK SUBSCRIPTION] userSubscription.stripeCustomerId",
    userSubscription?.stripeCustomerId
  );
  console.log(
    "[CHECK SUBSCRIPTION] userSubscription.stripePriceId",
    userSubscription?.stripePriceId
  );

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  console.log("[CHECK SUBSCRIPTION] isValid", isValid);

  return !!isValid;
};
