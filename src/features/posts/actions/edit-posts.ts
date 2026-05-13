'use server'

import { POSTS } from "@/lib/path"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const updatePost = async (id: string, formData: FormData) => {
    const data = {
        title: formData.get('title') as string,
        body: formData.get('body') as string
    }
    await prisma.post.update({
        where: {
            id
        },
        data
    })
    revalidatePath(POSTS)
    redirect(POSTS)
}