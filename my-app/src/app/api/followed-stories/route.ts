// https://docs.convex.dev/client/react/nextjs-pages-router/nextjs-pages-router
// https://docs.convex.dev/client/react/nextjs/server-rendering

import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Id } from "../../../../convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const revalidate = 60;

// https://docs.convex.dev/client/react/nextjs/
export async function GET() {
  try {
    const session = await auth();

    const currentUser = session?.user;

    if (!currentUser?.id) {
      return new NextResponse("no user", { status: 400 });
    }

    const dbUser = await db.user.findUnique({
      where: {
        id: currentUser.id,
      },
      select: {
        following: {
          select: {
            followingId: true,
          },
        },
        followers: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!dbUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    const followingUsersIDs = dbUser.following.map((user) => user.followingId);

    const followersUsersIDs = dbUser.followers.map((user) => user.userId);

    const followingDocs = await convex.query(api.documents.getFollowed, {
      userOauthIds: ["107403167432202867640", ...followingUsersIDs],
    });

    // return new NextResponse(JSON.stringify(followedUsersDocs), {
    //   status: 200,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    return NextResponse.json({
      //   followedUsersIDs,
      //   followersUsersIDs,
      followingDocs,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Bad request", { status: 400 });
  }
}
