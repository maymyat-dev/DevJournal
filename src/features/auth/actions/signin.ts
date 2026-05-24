'use server'

import { auth } from "@/lib/auth"
import { actionClient } from "@/lib/safe-action"
import { signInSchema } from "../schemas"

export const signIn = actionClient.inputSchema(signInSchema).action(async ({ parsedInput: { email, password} }) => {
    try {
      await auth.api.signInEmail({
        body: {
          email,
          password,
        },
      });
      return {
        success: true,
        error: null,
      };
    } catch (error: unknown) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      return {
        success: false,
        error: errorMessage,
      };
    }
})