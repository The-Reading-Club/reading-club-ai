// https://www.youtube.com/watch?v=0qyKl73RMtc

// import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

import OpenAI from "openai";
const openaiOfficialSDK = new OpenAI({ apiKey: process.env.OAI_KEY });

export const runtime = "edge";

// const config = new Configuration({
//   apiKey: process.env.OAI_KEY,
// });
// const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  // Right now we will disable this route
  if (process.env.NODE_ENV != "development")
    return new NextResponse("Rate limit exceeded for the day", { status: 429 });

  const { messages } = await request.json();
  console.log(messages);

  /** GPT 4 system msg
   * system msg tells gpt 4 how to act
   * it should always be at  the front of the array
   */

  // createChatCompletion (get response from GPT-4)
  // const response = await openai.createChatCompletion({
  //   model: "gpt-4",
  //   stream: true,
  //   messages: [
  //     { role: "system", content: "You are a children's book coauthor." },
  //     ...messages,
  //   ],
  // });

  const response = await openaiOfficialSDK.chat.completions.create({
    model: "gpt-4-1106-preview",
    stream: true,
    // https://medium.com/@vishalkalia.er/experimenting-with-gpt-4-turbos-json-mode-a-new-era-in-ai-data-structuring-58d38409f1c7
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: "You are a children's book coauthor. " + extraSystemContent,
      },
      ...messages,
    ],
  });

  // create a stream of data from OpenAI (stream data to the frontend)
  const stream = await OpenAIStream(response);

  // send the stream as a response to our client / frontend
  return new StreamingTextResponse(stream);
}

const extraSystemContent = `
You must output suggestions to the story in the following JSON format. In the correct format, every new sentence or phrase that you added to the story should be wrapped in a "marks" object with a "type" of "customSuggestion", along with attributes such as "color" and "uuid". This format visually distinguishes the new, suggested parts of the story from the original text, making it clear which parts are your additions.

[
  {
    "type": "paragraph",
    "content": [
      {
        "type": "text",
        "text": "Once upon a time, deep in a dark cave, there lived a large family of bats. I don't know how many bats. It was somewhere between 50 and 100 bats. It was a very big bat family."
      }
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "type": "text",
        "text": "This bat family never left their cave."
      }
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "type": "text",
        "text": "Why? Why did they never leave it?"
      }
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "type": "text",
        "text": "The strange truth is that all the bats had been born deep in the heart of the cave. Since none of them had ever left the cave, none even knew they were in a cave. The cave, for them, was the whole entire world."
      }
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "type": "text",
        "text": "And life in the cave was not too bad."
      }
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "type": "text",
        "text": "However, one day, a young bat named Echo became curious about the faint light that filtered in from a distant corner of their vast home. "
      },
      {
        "type": "text",
        "text": "Echo's curiosity",
        "marks": [
          {
            "type": "customSuggestion",
            "attrs": {
              "color": "yellow",
              "uuid": "2test"
            }
          }
        ]
      },
      {
        "type": "text",
        "text": " sparked a sense of adventure among the younger bats."
      }
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "type": "text",
        "text": "Together, they embarked on a journey towards the light, ",
        "marks": [
          {
            "type": "customSuggestion",
            "attrs": {
              "color": "yellow",
              "uuid": "3test"
            }
          }
        ]
      },
      {
        "type": "text",
        "text": "uncovering hidden paths and forgotten chambers within the cave."
      }
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "type": "text",
        "text": "Their adventure led them to the cave's entrance, where they saw the outside world for the first time. ",
        "marks": [
          {
            "type": "customSuggestion",
            "attrs": {
              "color": "yellow",
              "uuid": "4test"
            }
          }
        ]
      },
      {
        "type": "text",
        "text": "Amazed by the vastness and beauty, they realized that the world was much bigger than they had ever imagined."
      }
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "type": "text",
        "text": "This revelation changed the bat family forever, ",
        "marks": [
          {
            "type": "customSuggestion",
            "attrs": {
              "color": "yellow",
              "uuid": "5test"
            }
          }
        ]
      },
      {
        "type": "text",
        "text": "as they began to explore the world beyond the cave, learning and growing with each new discovery."
      }
    ]
  }
]

`;
