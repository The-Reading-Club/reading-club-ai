import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const account = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    // console.log("Account found by email", account);
    console.log("Account found by email");
    return account;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const account = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    return account;
  } catch (error) {
    console.log(error);
    return null;
  }
};
