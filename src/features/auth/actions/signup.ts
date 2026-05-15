'use server'

import { auth } from "@/lib/auth"
import { actionClient } from "@/lib/safe-action"
import { signUpSchema } from "../schemas"
import { loginPath } from "@/path"
import { revalidatePath } from "next/cache"

export const signUp = actionClient.inputSchema(signUpSchema).action(async ({ parsedInput: {name, email, password} }) => {
    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            }
        })
        revalidatePath(loginPath)
    }
    catch (error) {
        throw new Error("signUp: " + error)
    }
})