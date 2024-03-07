import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    const currentUser = session?.user;

    const {
      bio,
      // username,
      // profilePicture,
      // coverImage
    } = await request.json();

    const updatedUser = await db.user.update({
      where: { id: currentUser?.id },
      data: {
        bio,
        // username,
        // profilePicture,
        // coverImage
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return new NextResponse("Bad request", { status: 400 });
  }
}
