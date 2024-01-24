import { CHARACTER_ATTRIBUTES } from "@/data/character";

export const runtime = "edge";

import { OpenAIStream } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { BasicCharacterAttributes } from "../identify/utils";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openaiOfficialSDK = new OpenAI({ apiKey: process.env.OAI_KEY });

export async function callOpenaiChooseCharacterStream(
  existingCharacters: BasicCharacterAttributes[],
  storyText: string,
  sceneText: string
) {
  const response = await openaiOfficialSDK.chat.completions.create(
    {
      model: "gpt-4-1106-preview",
      // model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
      messages: getMessagesParameter(existingCharacters, storyText, sceneText),
      stream: true,
    }
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
  );

  return response;
}

export async function callOpenaiChooseCharacter(
  existingCharacters: BasicCharacterAttributes[],
  storyText: string,
  sceneText: string
) {
  const results = await openaiOfficialSDK.chat.completions.create(
    {
      model: "gpt-4-1106-preview",
      // model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
      messages: getMessagesParameter(existingCharacters, storyText, sceneText),
    }
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
  );

  return results;
}

export function parseChosenCharactersJSON(
  newCharactersChatCompletion: OpenAI.Chat.Completions.ChatCompletion
) {
  const newCharactersJSON = JSON.parse(
    newCharactersChatCompletion.choices[0].message.content as string
  );

  return newCharactersJSON;
}

export interface ChosenCharacterFields {
  name: string;
  scene: string;
  background: string;
}

function getMessagesParameter(
  existingCharacters: BasicCharacterAttributes[],
  storyText: string,
  sceneText: string
) {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "You are choosing a character on a children's book scene. You are given an array of existing characters, and need to return an array of with the chosen one, if any. Otherwise, return an empty array. The objective is to choose the character that will best fit into the next illustration in the story that we will generate with the help of Dall-e-3 (plus an scene description for the illustration no longer than 100 chars).",
    },
    {
      role: "user",
      content: `These are the existing characters: ${JSON.stringify({
        existingCharacters: existingCharacters,
      })}

Please return an array with the chosen character for the scene illustration in the following JSON format: (${JSON.stringify(
        { chosenCharacter: [{ name: "", scene: "", background: "" }] }
      )}), if any. Otherwise, return an empty array.

Here's the scene text: ${sceneText}

Here's the background story: ${storyText}
`,
    },
  ];

  return messages;
}
