import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("POST /api/play");
  return NextResponse.json({
    // audioSrc: "https://storage.googleapis.com/readingclub-audio/es_man.mp3",
    audioSrc: "https://storage.googleapis.com/readingclub-audio/es_boy.mp3",
  });
}
