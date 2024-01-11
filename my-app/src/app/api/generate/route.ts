import { Configuration, OpenAIApi } from "openai-edge";

import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OAI_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(request: Request) {
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
