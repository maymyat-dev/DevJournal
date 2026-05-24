"use server";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { signUpSchema } from "../schemas";

export const signUp = actionClient
  .inputSchema(signUpSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    try {
      await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
      });
        
        return {
            success: true,
            error: null
        }
    } catch (error: unknown) {
        console.log(error)
        const errorMessage = error instanceof Error ? error.message : "Something went wrong";
        return {
            success: false,
            error: errorMessage
        }
    }
  });
