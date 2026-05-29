"use server"

import { prisma } from "@/lib/prisma"

interface ProfileOverview {
    isPremium: boolean
    postsCount: number
    commentsCount: number
}

export const getProfileOverview = async (userId: string): Promise<ProfileOverview> => {
    const [ user, postsCount, commentsCount] =  await Promise.all([
        prisma.user.findUnique({
            where: { id: userId },
            select: {
                isPremium: true
            }
        }),
        prisma.post.count({ where: { userId } }),
        prisma.comment.count({ where: { userId } })
    ])

    return {
        isPremium: user?.isPremium || false,
        postsCount,
        commentsCount
    }
}