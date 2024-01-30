import { getCurrentUser } from "@/actions/getCurrentUser";

import { NextResponse } from "next/server";

import { db } from "@/lib/db";

import { stripe } from "@/lib/stripe";

import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    const userId = currentUser?.id;

    if (!currentUser || !userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Need to create my table of stripe user subscriptions
    const userSubscription = await db.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    // If user has a stripeCustomerId, then they have a subscription
    if (userSubscription && userSubscription.stripeCustomerId) {
      // BILLING PORTAL STRIPE SESSION
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    // Idea for prices and plans
    // Plus - $20/mo
    // School - $500/mo

    // CHECKOUT STRIPE SESSION (for first timers)
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: currentUser.email,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Reading Club AI Plus",
              description: "Monthly subscription to Reading Club AI Plus",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: { userId },
      allow_promotion_codes: true,
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE ERROR] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
