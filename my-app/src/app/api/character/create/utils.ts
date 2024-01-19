import { CHARACTER_ATTRIBUTES } from "@/data/character";

export const runtime = "edge";

import { OpenAIStream } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { BasicCharacterAttributes } from "../identify/utils";

const openaiOfficialSDK = new OpenAI({ apiKey: process.env.OAI_KEY });

export async function callOpenAIAPICreateCharacter(
  basicCharacterContext: BasicCharacterAttributes
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
            "You are a children's book writer creating amazing characters.",
        },
        {
          role: "user",
          content: `Based on this initial idea: ${JSON.stringify(
            basicCharacterContext
          )}
    Create a new character with the following unique attributes (keep the name the same):
    - Name
    - Age
    - Appearance
    - Personality Traits
    - Likes
    - Dislikes
    - Fears
    - Backstory
    - Motivations
    - Relationships
    - Role in Story
    - Special Abilities or Skills
    - Cultural Background
    - Language Spoken
    - Hobbies
    - Signature Items
    Format the response in the following JSON object: ${JSON.stringify(
      CHARACTER_ATTRIBUTES
    )}
    Note: All attributes in the JSON object must be strings (not arrays or numbers),
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

export function parseCharacterChatCompletion(
  characterChatCompletion: OpenAI.Chat.Completions.ChatCompletion
) {
  const characterJSON = JSON.parse(
    characterChatCompletion.choices[0].message.content as string
  );

  return characterJSON;
}
