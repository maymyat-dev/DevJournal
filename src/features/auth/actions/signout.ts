'use server'

import { auth } from "@/lib/auth";
import { postsPath } from "@/path";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signOut = async () => {
    try {
        await auth.api.signOut({
            headers: await headers()
        });
    }
    catch (error) {
        console.error("Sign out error:", error);
    }
    redirect(postsPath)
}