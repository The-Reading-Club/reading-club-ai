import { NextResponse } from "next/server";

// SET UP OPEN AI
import OpenAI from "openai";

const config = {
  apiKey: process.env.OAI_KEY,
};

const openaiSDK = new OpenAI(config);

// export async function GET(request: Request) {
//   return NextResponse.json({ message: "Hello, world!" }, { status: 200 });
// }

// platform.openai.com/docs/api-reference/images/create
export async function POST(request: Request) {
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
