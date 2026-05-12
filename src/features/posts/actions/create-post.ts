'use server'

import { POSTS } from "@/lib/path"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const createPost = async (formData: FormData) => {
    const data = {
        title: formData.get('title'),
        body: formData.get('body')
    }
    console.log(data)

    if (!data.title || !data.body) {
        throw new Error("Title and body are required.")
    }
    await prisma.post.create({
        data: {
            title: data.title as string,
            body: data.body as string
        }
    })
    revalidatePath(POSTS)
}