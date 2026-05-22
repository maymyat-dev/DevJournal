'use server'

import { auth } from "@/lib/auth"
import { actionClient } from "@/lib/safe-action"
import { signInSchema } from "../schemas"
import { redirect } from "next/navigation"
import { postsPath } from "@/path"
import { revalidatePath } from "next/cache"

export const signIn = actionClient.inputSchema(signInSchema).action(async ({ parsedInput: { email, password} }) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password
            }
        })
        
    }
    catch (error) {
        throw new Error("signUp: " + error)
    }
    revalidatePath(postsPath);
    redirect(postsPath);
})