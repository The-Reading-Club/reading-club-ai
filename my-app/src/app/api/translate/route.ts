import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { validatePaidSubscription } from "../utils";

export async function POST(request: NextRequest) {
  // Make a request to another microservice to request a translation and return it

  const validationResponse = await validatePaidSubscription(request, {
    slidingWindowTokens: 10,
    slidingWindowDuration: "1 d",
    feature: "generation",
  });

  if (validationResponse != null) {
    return validationResponse;
  }

  const { textsToTranslate, targetLocale } = await request.json();

  const response = await axios.post("http://127.0.0.1:8080/translatev2", {
    textsToTranslate,
    targetLocale,
  });

  const translatedObj = response.data;

  return NextResponse.json(translatedObj);
}

export async function GET() {
  const response = await axios.post("http://127.0.0.1:8080/translatev2", {
    textsToTranslate: ["Hello", "World"],
    targetLocale: "es",
  });

  const translatedObj = response.data;

  return NextResponse.json(translatedObj);
}
