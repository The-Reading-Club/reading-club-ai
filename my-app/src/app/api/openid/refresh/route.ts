import { auth } from "@/auth";
import { NextResponse } from "next/server";

// que curiosa esta mierda
// https://authjs.dev/guides/basics/refresh-token-rotation
import { type TokenSet } from "@auth/core/types";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  //   const token = (await getToken({
  //     req,
  //     secret: process.env.NEXTAUTH_SECRET,
  //   })) as {
  //     refresh_token: string;
  //   };
  //   const session = await auth(req, res);

  // https://next-auth.js.org/getting-started/example#extensibility
  const session = await auth();

  console.log("session", session);
  throw new Error("not implemented — THIS WILL BLOW UP REFRESH ROUTE");

  if (token) {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      }),
      method: "POST",
    });

    const tokens = (await response.json()) as TokenSet;

    if (!response.ok) {
      return new NextResponse("error refreshing id token", {
        status: 500,
      });
    }

    return NextResponse.json(tokens.id_token);
  } else {
    return NextResponse.json(null);
  }
}
