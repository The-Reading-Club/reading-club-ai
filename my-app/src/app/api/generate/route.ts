// OPEN AI
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
// RATE LIMITING
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse } from "next/server";

// import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { auth } from "@/auth";

// https://github.com/prisma/prisma/issues/20560
// export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OAI_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  // FIRST THING IN ROUTE IS TO SET RATE LIMIT
  if (
    // process.env.NODE_ENV != "development" &&
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  ) {
    const ip = request.headers.get("x-forwarded-for");

    const ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.fixedWindow(5, "365 d"),
    });

    // Works for now, but at some point I could have the user
    // send the email as part of the req body to make this even faster
    // But honestly, it's not that slow
    const session = await auth();
    const rateLimitKey = session?.user.email || ip;

    console.log("RATE LIMIT KEY: ", rateLimitKey);

    const { success, limit, reset, remaining } = await ratelimit.limit(
      // `trc_ratelimit_${ip}`
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
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are a children's book AI writing assistant that continues existing text based on context from prior text. " +
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
