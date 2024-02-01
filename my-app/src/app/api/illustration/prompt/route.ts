import { NextResponse } from "next/server";
import { validatePaidSubscription } from "../../utils";
import { callDalleAPI } from "../utils";

export async function POST(request: Request) {
  await validatePaidSubscription(request, {
    slidingWindowTokens: 5,
    slidingWindowDuration: "1 d",
    feature: "illustration",
  });

  const reqJSON = await request.json();

  const { prompt } = reqJSON.body;

  const { image, storedImageUrl, imageBlobStored, dalleImageUrl } =
    await callDalleAPI(prompt, reqJSON);

  console.log({ image, storedImageUrl, imageBlobStored, dalleImageUrl });

  return NextResponse.json(
    {
      imageData: image.data[0],
      storedImageUrl: imageBlobStored == true ? storedImageUrl : dalleImageUrl,
      revisedPrompt: image.data[0].revised_prompt,
    },
    { status: 200 }
  );
}
