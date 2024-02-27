import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json(); // Assuming userId is sent in the request body

    const session = await auth();
    const currentUser = session?.user;

    const _currentUser = await db.user.findUnique({
      where: { id: currentUser?.id },
    });
    const userToFollow = await db.user.findUnique({
      where: { id: userId },
    });

    if (!_currentUser || !userToFollow) {
      throw new Error("User not found");
    }

    const existingFollow = await db.userFollowing.findFirst({
      where: {
        userId: _currentUser.id,
        followingId: userToFollow.id,
      },
    });

    if (existingFollow) {
      throw new Error("Already following");
    }

    const result = await db.userFollowing.create({
      data: {
        userId: _currentUser.id,
        followingId: userToFollow.id,
        userDatabaseId: _currentUser.intID,
        followingUserDatabaseId: userToFollow.intID,
      },
    });

    if (!result) {
      throw new Error("Failed to follow user");
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Bad request", { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await request.json(); // Assuming userId is sent in the request body

    const session = await auth();
    const currentUser = session?.user;

    const _currentUser = await db.user.findUnique({
      where: { id: currentUser?.id },
    });
    const userToUnfollow = await db.user.findUnique({
      where: { id: userId },
    });

    if (!_currentUser || !userToUnfollow) {
      throw new Error("User not found");
    }

    const existingFollow = await db.userFollowing.findFirst({
      where: {
        userId: _currentUser.id,
        followingId: userToUnfollow.id,
      },
    });

    if (!existingFollow) {
      throw new Error("Follow relationship does not exist");
    }

    await db.userFollowing.delete({
      where: {
        intID: existingFollow.intID,
      },
    });

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Bad request", { status: 400 });
  }
}

// export async function GET(request: NextRequest) {
//   try {
//     // const { userId } = await request.json();
//     const userId = "118323104292199040681";

//     const session = await auth();
//     const currentUser = session?.user;

//     // if (!currentUser) {
//     //   throw new Error("No user found, invalid id");
//     // }

//     // may need to pass a parameter with desired fields
//     // but I kind of dont like not reading the prisma code here

//     // First, find the database IDs for both users

//     // the user from session doesn't have all fields
//     // I don't remember exactly why
//     const _currentUser = await db.user.findUnique({
//       where: { id: currentUser?.id },
//     });
//     const userToFollow = await db.user.findUnique({
//       where: { id: userId },
//     });

//     if (!_currentUser || !userToFollow) {
//       throw new Error("User not found");
//     }

//     // Verify follow doesnt exist first
//     // db has a unique constraint on userId and followingId
//     // but it's not a bad practice to habe app level checks
//     const existingFollow = await db.userFollowing.findFirst({
//       where: {
//         userId: _currentUser.id,
//         followingId: userToFollow.id,
//       },
//     });

//     if (existingFollow) {
//       throw new Error("Already following");
//     }

//     // Then, create the following relationship
//     // https://chat.openai.com/c/aec0e542-e147-4ec6-a0bf-a6055e32a45e
//     const result = await db.userFollowing.create({
//       data: {
//         userId: _currentUser.id,
//         followingId: userToFollow.id,
//         userDatabaseId: _currentUser.intID, // Now dynamically fetched
//         followingUserDatabaseId: userToFollow.intID, // Now dynamically fetched
//       },
//     });

//     if (!result) {
//       throw new Error("Failed to follow user");
//     }

//     return new NextResponse("Success", { status: 200 });

//     return NextResponse.json({
//       currentUser,
//       _currentUser,
//       userToFollow,
//       result,
//     });

//     // const userToFollow = await getUserById(userId);

//     // if (!userToFollow) {
//     //   throw new Error("User not found");
//     // }
//   } catch (error) {
//     console.log(error);
//     // return new NextResponse("Error", { status: 500 });
//     return new NextResponse("Bad request", { status: 400 });
//   }
// }
