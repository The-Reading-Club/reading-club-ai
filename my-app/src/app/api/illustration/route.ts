import { NextResponse } from "next/server";
// SET UP OPEN AI
import OpenAI from "openai";

// RATE LIMITING
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

const config = {
  apiKey: process.env.OAI_KEY,
};

const openaiSDK = new OpenAI(config);

// export async function GET(request: Request) {
//   return NextResponse.json({ message: "Hello, world!" }, { status: 200 });
// }

// platform.openai.com/docs/api-reference/images/create
export async function POST(request: Request) {
  // FIRST THING IN ROUTE IS TO SET RATE LIMIT
  if (
    process.env.NODE_ENV != "development" &&
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  ) {
    const ip = request.headers.get("x-forwarded-for");

    const ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(50, "1 d"),
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(
      `trc_ratelimit_${ip}-illustration`
    );

    if (!success) {
      return new NextResponse("Rate limit exceeded for the day", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }
  }

  const reqJSON = await request.json();
  console.log(reqJSON);
  const { prevContextText } = reqJSON.body;

  //   const response = await openai.createImage({
  //     prompt: "This is a photo of a dog named Bolt. The photo is very blurry. ",
  //     n: 1,
  //     size: "1024x1024",
  //   });

  const prompt = `
  Generate a children's book illustration based on the context of the story. (Pro-tip: Procure big eyes in characters, children's love that.)

  CONTEXT:

  """

  ${prevContextText}

  """
  `;
  console.log(prompt);

  const image = await openaiSDK.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  console.log("response", image.data);

  return NextResponse.json(image.data[0], { status: 200 });
}
