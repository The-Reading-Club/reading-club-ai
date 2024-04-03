import { NextResponse } from "next/server";
import { SLIDING_WINDOW_CONSTANT, validatePaidSubscription } from "../../utils";
import { callDalleAPI } from "../utils";
import { GenerateIllustrationPromptResponse } from "./utils";
// import { MAX_FREE_COUNT_ILLUSTRATION } from "@/components/FreeCounter";
import { MAX_FREE_COUNT_ILLUSTRATION } from "@/lib/utils";

// https://stackoverflow.com/questions/77503770/how-to-increase-timeout-limit-on-vercel-serverless-functions
export const maxDuration = 300; // 5 seconds
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  console.log("About to validate paid subscription with illustration prompt");
  const validationResponse = await validatePaidSubscription(request, {
    slidingWindowTokens: 10, //MAX_FREE_COUNT_ILLUSTRATION,
    slidingWindowDuration: SLIDING_WINDOW_CONSTANT,
    feature: "illustration",
  });
  console.log("Finished validation of paid subscription");

  if (validationResponse != null) {
    return validationResponse;
  }

  const reqJSON = await request.json();

  const { prompt } = reqJSON.body;

  const {
    image,
    storedImageUrls,
    // imageBlobStored,
    dalleImageUrls,
  } = await callDalleAPI(prompt, reqJSON, 1);
  // Cannot do 10 yet :( https://help.openai.com/en/articles/8555480-dall-e-3-api

  console.log({
    image,
    storedImageUrls,
    // imageBlobStoreds,
    dalleImageUrls,
  });

  return NextResponse.json(
    {
      // imageData: image.data[0],
      imageData: image.data,
      // storedImageUrl: imageBlobStored == true ? storedImageUrl : dalleImageUrl,
      storedImageUrls: storedImageUrls,
      // revisedPrompt: image.data[0].revised_prompt,
      revisedPrompts: image.data.map((d) => d.revised_prompt),
    } as GenerateIllustrationPromptResponse,
    { status: 200 }
  );
}
