import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// https://github.com/AntonioErdeljac/twitter-clone/blob/master/pages/api/current.ts

export const revalidate = 60;

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
        intID: true,
        name: true,
        bio: true,
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
      // select: {
      //   // following: {
      //   //   select: {
      //   //     followingId: true,
      //   //   },
      //   // },
      //   followers: {
      //     select: {
      //       followingId: true,
      //     },
      //   },
      //   // following: {
      //   //   select: {
      //   //     followingUser: true, // Assuming 'followingUser' is the field in the 'UserFollowing' model that refers to the user being followed
      //   //   },
      //   // },
      //   // followers: {
      //   //   select: {
      //   //     followingId: true, // Assuming 'followerUser' is the field in the 'UserFollowing' model that refers to the user following
      //   //   },
      //   // },
      // },
      // followers: {
      //   select: {
      //     followerUser: true, // Assuming 'followerUser' is the field in the 'UserFollowing' model that refers to the user following
      //   }
      // },
    });
    console.log("dbUser CURRENT ROUTE", dbUser);

    if (!dbUser) {
      return new NextResponse("no user", { status: 400 });
    }

    const returnUserObj = {
      ...dbUser,
      following: dbUser.following.map((user) => user.followingId),
      followers: dbUser.followers.map((user) => user.userId),
      // followersCount: dbUser?.followers.length,
      // followingCount: dbUser?.following.length,
    };

    console.log("returnUserObj", returnUserObj);

    return NextResponse.json(returnUserObj);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error", { status: 400 });
  }
}
