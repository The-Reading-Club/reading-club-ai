import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("UPLOAD ROUTE START");
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // We will use this later
  return new NextResponse("OK", {
    status: 200,
  });

  // Add 5 seconds delay for testing

  return new NextResponse("WRONG WRONG WRONG", {
    status: 401,
  });
}
