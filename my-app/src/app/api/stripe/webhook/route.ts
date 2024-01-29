import Stripe from "stripe";

import { headers } from "next/headers";

import { NextResponse } from "next/server";

import { db } from "@/lib/db";

import { stripe } from "@/lib/stripe";

// Test with a GET
export async function GET() {
  return NextResponse.json({ test: "test" }, { status: 200 });
}

export async function POST(req: Request) {
  console.log("[WEBHOOK] POST");
  //   const body = await req.json(); // this little mistake was msesing up my StripeSignatureVerification
  //     which naturally was resulting in a 400 bad request error
  // https://stackoverflow.com/a/64671817
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  console.log("[WEBHOOK] body", body);

  try {
    // This must be to verify that stuff came from stripe
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("Constructed event: ", event);
  } catch (error: any) {
    console.log("[WEBHOOK] error", error);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    // this comes from stripe...
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // does this metadata is something I added to the process?
    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    await db.userSubscription.create({
      data: {
        userId: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id, // I wonder how I'll handle this if I have multiple prices/plans
        /**Multiplying the value subscription.current_period_end by 1000 is likely done to convert the value from seconds to milliseconds.

            In JavaScript and many other programming languages, timestamps are often represented in milliseconds since the Unix epoch (January 1, 1970, 00:00:00 UTC). However, some APIs or libraries may provide timestamps in seconds instead of milliseconds.

            By multiplying the value by 1000, it is being converted from seconds to milliseconds, which is a more common representation for timestamps in JavaScript. This allows for consistent handling and manipulation of the timestamp value in the code. */
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  // IF THEY JUST UPGRADED OR ALREADY HAD ONE BEFORE (LIKE EXPIRING)
  // THEN IT JUST HITS THIS EVENT, I THINK
  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    console.log("[WEBHOOK] invoice.payment_succeeded", subscription);
    console.log("[WEBHOOK] invoice.payment_succeeded", session);

    // Check if there's an existing subscription
    const userSubscription = await db.userSubscription.findUnique({
      where: {
        stripeSubscriptionId: subscription.id,
      },
    });

    if (!userSubscription) {
      //   return new NextResponse("Subscription doesn't exist yet in database", {
      //     status: 404,
      //   });
      console.log(
        "[WEBHOOK] invoice.payment_succeeded",
        "Subscription doesn't exist yet in database"
      );
      return new NextResponse("User subscription not found", { status: 404 });
      // ... but it should've been there if Stripe knew about it...
    }

    await db.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
