// https://www.youtube.com/watch?v=0qyKl73RMtc

import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

import OpenAI from "openai";
const openaiOfficialSDK = new OpenAI({ apiKey: process.env.OAI_KEY });

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OAI_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  const { messages } = await request.json();
  console.log(messages);

  /** GPT 4 system msg
   * system msg tells gpt 4 how to act
   * it should always be at  the front of the array
   */

  // createChatCompletion (get response from GPT-4)
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    stream: true,
    messages: [
      { role: "system", content: "You are a children's book coauthor." },
      ...messages,
    ],
  });

  const test = await openaiOfficialSDK.chat.completions.create({
    model: "gpt-4",
    stream: true,
    // https://medium.com/@vishalkalia.er/experimenting-with-gpt-4-turbos-json-mode-a-new-era-in-ai-data-structuring-58d38409f1c7
    response_format: { type: "json_object" },
    messages: [],
  });

  // create a stream of data from OpenAI (stream data to the frontend)
  const stream = await OpenAIStream(response);

  // send the stream as a response to our client / frontend
  return new StreamingTextResponse(stream);
}
