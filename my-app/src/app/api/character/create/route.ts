import { CHARACTER_ATTRIBUTES } from "@/data/character";

export const runtime = "edge";

import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { BasicCharacterAttributes } from "../identify/utils";
import {
  callOpenAIAPICreateCharacter,
  callOpenAIAPICreateCharacterStream,
} from "./utils";

const openaiOfficialSDK = new OpenAI({ apiKey: process.env.OAI_KEY });

export async function POST(request: Request) {
  const reqJSON = await request.json();
  const { basicCharacterContext } = reqJSON.body;

  try {
    console.log("basicCharacterContext", basicCharacterContext);
    const response = await callOpenAIAPICreateCharacterStream(
      basicCharacterContext
    );

    console.log("response", response);

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (e) {
    console.log(e);

    return new NextResponse("Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  const basicCharacterContext = {
    name: "Plato",
    description:
      "Plato is a young, curious bat with boundless energy, who discovers the wider world beyond the cave he's always known.",
  };

  try {
    const results = await callOpenAIAPICreateCharacter(basicCharacterContext);

    const characterJSON = JSON.parse(
      results.choices[0].message.content as string
    );

    return NextResponse.json(characterJSON, { status: 200 });
  } catch (e) {
    console.log(e);

    return new NextResponse("Error", { status: 500 });
  }
}
