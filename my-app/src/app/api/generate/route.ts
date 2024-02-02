// OPEN AI
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
// RATE LIMITING
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse } from "next/server";

// import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { auth } from "@/auth";
import { checkSubscription } from "@/lib/subscription";

// https://github.com/prisma/prisma/issues/20560
// export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OAI_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  // We probably want to rate limit plus users a bit but for now it's fine
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
      limiter: Ratelimit.fixedWindow(5, "1d"),
    });

    // Works for now, but at some point I could have the user
    // send the email as part of the req body to make this even faster
    // But honestly, it's not that slow
    const session = await auth();
    const rateLimitKey = session?.user.email || ip;

    console.log("RATE LIMIT KEY: ", rateLimitKey);

    const { success, limit, reset, remaining } = await ratelimit.limit(
      // `trc_ratelimit_${ip}`
      // add "generation" after key later
      `trc_ratelimit_${rateLimitKey}`
    );

    if (!success) {
      return new NextResponse("Free trial has expired", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }
  }

  let { prompt } = await request.json();

  const respone = await openai.createChatCompletion({
    // https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo
    model: "gpt-4",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are an incredible children's book AI writing assistant (who never makes a generic story) that continues existing text based on context from prior text. " +
          "Limit your response to no more than one or two very short paragraphs of appropriate length for a children's book." +
          "It's very important that you don't write a whole story. You're just helping, so you should only write a little bit.",
        // I wonder if I can add the whole story as a context here
        // "For context, here's the whole draft of the story context: " + storyText,
        // maybe even the chat could be part of the context window
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const stream = await OpenAIStream(respone);

  return new StreamingTextResponse(stream);
}
