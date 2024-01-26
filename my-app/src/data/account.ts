import { db } from "@/lib/db";

export const getAccountByEmail = async (email: string) => {
  try {
    const account = await db.account.findUnique({
      where: {
        email: email,
      },
    });

    console.log("Account found by email", account);
    return account;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAccountById = async (id: number) => {
  try {
    const account = await db.account.findUnique({
      where: {
        account: id,
      },
    });

    return account;
  } catch (error) {
    console.log(error);
    return null;
  }
};
