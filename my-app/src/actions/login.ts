"use server";

import * as z from "zod";

import { AuthError } from "next-auth";

import { LoginSchema } from "../schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";

// What kind of black magic is this one?
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  // return { success: "Email sent!" };
  //   console.log(values);

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      // return { error: error.message };
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
