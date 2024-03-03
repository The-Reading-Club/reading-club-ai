import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// https://www.youtube.com/watch?v=TFsRd2Aw60Q
// https://github.com/gopinav/Next.js-14-Tutorials

// This is the example I was looking for to get the userId from the params
// https://github.com/gopinav/Next.js-14-Tutorials/blob/main/route-handlers-demo/src/app/comments/%5Bid%5D/route.ts

const revalidate = 60;

export async function GET(
  req: // https://www.youtube.com/watch?v=fuxSl-K0oI0
  //   NextRequest
  Request,
  { params }: { params: { userId: string } }
) {
  try {
    // No, I don't want query params
    // const query = req.nextUrl.searchParams;
    // const userId = query.get("userId");

    const userId = params.userId;

    if (!userId || typeof userId !== "string") {
      return new NextResponse("Not found", { status: 404 });
    }

    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        image: true,
        // email: true,
        register_date: true,
        //
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

    // TODO
    // const followersCount = await db.user.count({
    //   where: {
    //     followingIds: {
    //       has: userId,
    //     },
    //   },
    // });

    // return NextResponse.json({ ...existingUser, followersCount });

    const existingUserObj = {
      ...existingUser,
      following: existingUser?.following.map((user) => user.followingId),
      followers: existingUser?.followers.map((user) => user.userId),
      followersCount: existingUser?.followers.length,
      followingCount: existingUser?.following.length,
    };

    console.log("existingUserObj", existingUserObj.name);

    return NextResponse.json(existingUserObj);
  } catch (error) {
    console.error(error);
    return new NextResponse("Not found", { status: 404 });
  }
}
