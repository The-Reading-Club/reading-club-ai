import { db } from "@/lib/db";

export const getProviderAccountByUserId = async (
  userId: string
  //   provider: string
) => {
  try {
    const providerAccount = await db.account.findFirst({
      where: {
        userId: userId,
        provider: "google",
      },
    });

    return providerAccount;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProviderAccountByIdToken = async (idToken: string) => {
  try {
    const providerAccount = await db.account.findFirst({
      where: {
        id_token: idToken,
        provider: "google",
      },
    });

    console.log("providerAccount FOUND WITH ID TOKEN", providerAccount);

    return providerAccount;
  } catch (error) {
    console.log("providerAccount NOT FOUND WITH ID TOKEN");
    console.log(error);
    return null;
  }
};
