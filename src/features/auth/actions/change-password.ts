
'use server'

import { auth } from "@/lib/auth"
import { actionClient } from "@/lib/safe-action"
import { changePasswordSchema } from "../schemas/auth-change-password"
import { redirect } from "next/navigation"
import { loginPath } from "@/path"


export const changePassword = actionClient.inputSchema(changePasswordSchema).action(async ({ parsedInput: { newPassword, token} }) => {
    try {
        await auth.api.resetPassword({
          body: {
                newPassword,
                token
          },
        });
        
    }
    catch (error) {
        throw new Error("changePassword: " + error)
    }
    redirect(loginPath);

})