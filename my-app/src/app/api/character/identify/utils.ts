import { CHARACTER_ATTRIBUTES } from "@/data/character";

export const runtime = "edge";

import { OpenAIStream } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openaiOfficialSDK = new OpenAI({ apiKey: process.env.OAI_KEY });

export interface BasicCharacterAttributes {
  name: string;
  description: string;
}

export async function callOpenaiIdentifyCharacter(
  existingCharacters: BasicCharacterAttributes[],
  storyText: string
) {
  const results = await openaiOfficialSDK.chat.completions.create(
    {
      model: "gpt-4-1106-preview",
      // model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are identifying new characters on a children's book story. You are given an array of existing characters, and need to return an array of new characters, if any. Otherwise, return an empty array.",
        },
        {
          role: "user",
          content: `These are the existing characters: ${JSON.stringify({
            existingCharacters: existingCharacters,
          })}
    
    Please return an array of new characters in the following JSON format: (${JSON.stringify(
      { newCharactersJSON: [{ name: "", description: "" }] }
    )}), if any. Otherwise, return an empty array.
    
    Here's the story: ${storyText}
    `,
        },
      ],
    }
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
  );

  return results;
}

export function parseNewCharactersJSON(
  newCharactersChatCompletion: OpenAI.Chat.Completions.ChatCompletion
) {
  const newCharactersJSON = JSON.parse(
    newCharactersChatCompletion.choices[0].message.content as string
  );

  return newCharactersJSON;
}
