import { auth } from "@/auth";
import { NextResponse } from "next/server";

// https://github.com/AntonioErdeljac/twitter-clone/blob/master/pages/api/current.ts
export async function GET() {
  try {
    const session = await auth();

    const currentUser = session?.user;

    return NextResponse.json(currentUser);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error", { status: 400 });
  }
}
