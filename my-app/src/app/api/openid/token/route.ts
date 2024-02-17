import { auth } from "@/auth";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET() {
  const session = (await auth()) as Session;

  //   https://github.com/webdevcody/next-auth-convex/blob/main/src/pages/api/openid/token.ts

  console.log("ABOUT TO LOG SESSION IN TOKEN ROUTE");
  console.log("session", session);

  const token = session?.token;

  if (token) {
    // return token;
    return NextResponse.json(token.id_token);
  } else {
    console.log("INITIATE SIGN OUT TOKEN ROUTE");
    await signOut();
    return NextResponse.json(null);
    // return NextResponse.json({ error: "No token" });
  }

  throw new Error("Not implemented — THIS WILL BLOW UP TOKEN ROUTE");
}
