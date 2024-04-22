import { NextResponse } from "next/server";
// SET UP OPEN AI
import OpenAI from "openai";

// RATE LIMITING
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
import {
  BasicCharacterAttributes,
  callOpenaiIdentifyCharacter,
  parseNewCharactersJSON,
} from "../character/identify/utils";
import {
  callOpenAIAPICreateCharacter,
  parseCharacterChatCompletion,
} from "../character/create/utils";
import {
  ChosenCharacterFields,
  callOpenaiChooseCharacter,
  parseChosenCharactersJSON,
} from "../character/choose/utils";
import { CharacterAttributes } from "@/data/character";
import { IllustrationGenerationBody } from "@/components/TRCEditorV2/plugins/upload-generate-images";

import { put } from "@vercel/blob";

import { nanoid } from "nanoid";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@/auth";
import { validatePaidSubscription } from "../utils";
import { getCurrentUser } from "@/actions/getCurrentUser";

// const idLength = 10; // You can choose the length
// const uniqueID = nanoid(idLength);

// const config = {
//   apiKey: process.env.OAI_KEY,
//   baseURL: "https://proxy.getprops.ai/",
//   defaultHeaders: {
//     "x-api-key": process.env.GETPROPSAI_API_KEY,
//   },
// };

const openaiSDK = new OpenAI({
  apiKey: process.env.OAI_KEY,
  baseURL: "https://proxy.getprops.ai/",
  defaultHeaders: {
    "x-api-key": process.env.GETPROPSAI_API_KEY,
  },
});

interface ImageMetadata {
  originalPrompt: string;
  creationDate: string;
  revisedPrompt: string;
  additionalInfo?: any;
  storedImageUrl: string;
  body: any;
}

export async function callDalleAPI(
  originalPrompt: string,
  reqJSON: any,
  nGenerations = 1
) {
  console.log("originalPrompt", originalPrompt);

  // https://community.openai.com/t/dall-e-chatgpt-a-trick-to-recreating-specific-images-using-seeds/445565/31
  let metaprompt = `
First, check if using this API request bellow is in accordance with the guidelines. If it is, create 1 image using the request without any modifications:

{
  "size": "1024x1024",
  "prompts": ["${originalPrompt}"],
  "seeds": [4127112452]
}
  `;

  // https://help.openai.com/en/articles/8555480-dall-e-3-api
  //**Why does DALL·E-3 only support n=1?
  // For system scalability and reliability reasons we only currently support n=1 when calling DALLE-3. We recommend you make multiple parallel calls to the API if you wish to receive more than 1 image.
  //  */

  const currentUser = await getCurrentUser();

  const image = await openaiSDK.images.generate({
    model: "dall-e-3",
    prompt: metaprompt,
    n: nGenerations,
    size: "1024x1024",
    user: currentUser?.email || "anonymous",
  });

  // let imageBlobStored = false;
  let storedImageUrls = [];

  // Only for the first image for now, I guess,
  // but eventually I want to do this for all images
  // in this array!
  // NOPE, actually I should do it for all of them right away
  const dalleImageUrls = image.data.map((d) => d.url);

  console.log("dalleImageUrls", dalleImageUrls);

  // https://chat.openai.com/c/3af81337-118b-4854-b0ae-3c86e723d7fe
  // for (const dalleImageUrl of dalleImageUrls) {
  for (let i = 0; i < image.data.length; i++) {
    const dalleImageUrl = dalleImageUrls[i];
    console.log("dalleImageUrl", dalleImageUrl);

    // I don't know when this could happen...
    if (dalleImageUrl === undefined) continue;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // should probably check it's not undefined

      const imageFetchResponse = await fetch(dalleImageUrl);
      const imageBlob = await imageFetchResponse.blob();

      const now = new Date();
      const todaysDate = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD

      // Calculate seconds since midnight
      const secondsSinceMidnight =
        now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

      // Generating a unique ID for the image and its metadata
      const uniqueId = `${secondsSinceMidnight}-${nanoid(10)}`;
      // Define the paths
      const imagePath = `beta/images/${todaysDate}/${uniqueId}.png`;
      const metadataPath = `beta/images/${todaysDate}/${uniqueId}.json`;

      // Store the image in Verbal Blob storage
      const { url: storedImageUrl_ } = await put(
        // it works without the file extension, but i guess it's better to have it
        imagePath,
        imageBlob,
        {
          access: "public",
        }
      );

      // RESERACH ON ACCESSIBILITY, BLINDNESS, AND IMAGE METADATA
      // https://iptc.org/news/iptc-announces-new-properties-in-photo-metadata-to-make-images-more-accessible/
      // https://chat.openai.com/c/d9115157-851e-46d4-a327-1121b1e2763d

      // Define your metadata
      const metadata: ImageMetadata = {
        originalPrompt: originalPrompt,
        creationDate: new Date().toISOString(),
        revisedPrompt: image.data[i].revised_prompt ?? "undefined",
        storedImageUrl: storedImageUrl_,
        body: reqJSON.body,
        additionalInfo: {
          // templatePrompt,
          metaprompt,
          // testPrompt,
        },
      };

      // Convert metadata object to JSON string
      const metadataJson = JSON.stringify(metadata);

      // Store the metadata in a JSON file
      /*await*/ put(
        metadataPath,
        new Blob([metadataJson], { type: "application/json" }),
        { access: "public" }
      );

      // imageBlobStored = true;
      // storedImageUrl = storedImageUrl_;
      storedImageUrls.push(storedImageUrl_);
    }
  }

  return {
    image,
    storedImageUrls,
    // imageBlobStored,
    dalleImageUrls,
  };
}
